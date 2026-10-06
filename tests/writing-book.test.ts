import { describe, expect, it } from "vitest";
import {
  DEFAULT_SITE_CONTENT,
  deriveSiteContent,
} from "../app/content/defaultContent";
import { renderWritingMd, writingJson } from "../app/content/machine";
import { canonicalizeContent } from "../app/content/validation";
import { projectSchema } from "../app/utils/jsonLd";

describe("The Correction in Writing", () => {
  const content = deriveSiteContent(structuredClone(DEFAULT_SITE_CONTENT));
  const book = content.projectBySlug("the-correction");

  it("is classified as writing and kept out of Systems", () => {
    expect(book?.kind).toBe("writing");
    expect(content.productProjects.map((project) => project.slug)).not.toContain(
      "the-correction",
    );
  });

  it("carries its cover into the Writing surfaces", () => {
    expect(book?.plate).toBe("/studio/the-correction-cover.jpg");
    expect(writingJson(content).featuredBook?.slug).toBe("the-correction");
    expect(renderWritingMd(content)).toContain(
      "https://ariaxhan.com/studio/the-correction-cover.jpg",
    );
  });

  it("still validates the outgoing published shape (product kind, no cover)", () => {
    const outgoing = structuredClone(DEFAULT_SITE_CONTENT);
    const oldBook = outgoing.projects.find(
      (project) => project.slug === "the-correction",
    ) as unknown as Record<string, unknown>;
    oldBook.kind = "product";
    delete oldBook.plate;
    delete oldBook.plateFit;
    delete oldBook.gallery;
    const canonical = canonicalizeContent(outgoing);
    const validated = canonical.content.projects.find(
      (project) => project.slug === "the-correction",
    );
    expect(validated?.kind).toBe("product");
  });

  it("uses Book structured data with the cover image", () => {
    expect(book).toBeDefined();
    const schema = projectSchema(content, book!);
    expect(schema["@type"]).toBe("Book");
    expect(schema.image).toBe(
      "https://ariaxhan.com/studio/the-correction-cover.jpg",
    );
  });
});
