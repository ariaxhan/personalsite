import { describe, expect, it } from "vitest";
import { DEFAULT_SITE_CONTENT } from "../app/content/defaultContent";
import {
  ContentValidationError,
  HISTORICAL_PROJECT_SLUGS,
  PREVIOUS_PROJECT_SLUGS,
  PREVIOUS_REMOVED_PROJECT_TEMPLATE,
  canonicalizeContent,
  isEditableContentPath,
} from "../app/content/validation";

describe("content validation", () => {
  function mutableClone() {
    return JSON.parse(JSON.stringify(DEFAULT_SITE_CONTENT)) as {
      SITE: { oneLiner: string };
      PAGE_COPY: { metadata: { about: { path: string } } };
      surprise?: string;
    };
  }

  it("accepts and canonicalizes the checked-in catalog", () => {
    const result = canonicalizeContent(structuredClone(DEFAULT_SITE_CONTENT));
    expect(result.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(result.content.SITE.oneLiner).toBe("AI for work, AI for humans.");
  });

  it("keeps the previous 21-project snapshot valid during the catalog migration", () => {
    const previous = structuredClone(DEFAULT_SITE_CONTENT);
    previous.projects.splice(6, 0, structuredClone(PREVIOUS_REMOVED_PROJECT_TEMPLATE));
    expect(previous.projects.map((project) => project.slug)).toEqual(PREVIOUS_PROJECT_SLUGS);
    expect(canonicalizeContent(previous).content.projects).toHaveLength(21);
  });

  it("keeps the historical 15-project snapshot valid for sitemap history", () => {
    const historical = structuredClone(DEFAULT_SITE_CONTENT);
    const slugs = new Set(HISTORICAL_PROJECT_SLUGS);
    historical.projects = historical.projects.filter((project) => slugs.has(project.slug));
    expect(historical.projects.map((project) => project.slug)).toEqual(HISTORICAL_PROJECT_SLUGS);
    expect(canonicalizeContent(historical).content.projects).toHaveLength(15);
  });

  it("rejects arbitrary project removal during the catalog migration", () => {
    const incomplete = structuredClone(DEFAULT_SITE_CONTENT);
    incomplete.projects = incomplete.projects.slice(0, -1);
    expect(() => canonicalizeContent(incomplete)).toThrow(
      "current or immediately previous project catalog",
    );
  });

  it("accepts prose edits and normalizes Unicode", () => {
    const edited = mutableClone();
    edited.SITE.oneLiner = "Cafe\u0301 for humans.";
    const result = canonicalizeContent(edited);
    expect(result.content.SITE.oneLiner).toBe("Café for humans.");
  });

  it("rejects unknown fields, raw HTML, and route changes", () => {
    const unknown = mutableClone();
    unknown.surprise = "nope";
    expect(() => canonicalizeContent(unknown)).toThrow(ContentValidationError);

    const html = mutableClone();
    html.SITE.oneLiner = "<script>alert(1)</script>";
    expect(() => canonicalizeContent(html)).toThrow("raw HTML");

    const route = mutableClone();
    route.PAGE_COPY.metadata.about.path = "/moved/";
    expect(() => canonicalizeContent(route)).toThrow("fixed in code");
  });

  it("keeps metrics and infrastructure fields out of the editor", () => {
    expect(isEditableContentPath("SITE.tldr")).toBe(true);
    expect(isEditableContentPath("projects.0.thesis")).toBe(true);
    expect(isEditableContentPath("projects.0.slug")).toBe(false);
    expect(isEditableContentPath("SITE.proof.publicRepos.value")).toBe(false);
    expect(isEditableContentPath("books.0.color")).toBe(false);
  });
});
