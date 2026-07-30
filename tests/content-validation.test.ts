import { describe, expect, it } from "vitest";
import { DEFAULT_SITE_CONTENT } from "../app/content/defaultContent";
import {
  ContentValidationError,
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
