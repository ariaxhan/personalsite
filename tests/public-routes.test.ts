import { describe, expect, it } from "vitest";
import { DEFAULT_SITE_CONTENT } from "../app/content/defaultContent";
import {
  CONTENT_PUBLIC_PATHS,
  HUMAN_PUBLIC_PATHS,
  MACHINE_PUBLIC_PATHS,
} from "../app/content/publicRoutes";

describe("public content dependency catalog", () => {
  it("covers every project and machine surface without private editor routes", () => {
    for (const project of DEFAULT_SITE_CONTENT.projects) {
      expect(HUMAN_PUBLIC_PATHS).toContain(`/projects/${project.slug}/`);
    }
    expect(MACHINE_PUBLIC_PATHS).toContain("/sitemap.xml");
    expect(MACHINE_PUBLIC_PATHS).toContain("/mcp/");
    expect(MACHINE_PUBLIC_PATHS).toContain("/.well-known/agent-card.json");
    expect(CONTENT_PUBLIC_PATHS.some((path) => path.startsWith("/edit"))).toBe(false);
    expect(new Set(CONTENT_PUBLIC_PATHS).size).toBe(CONTENT_PUBLIC_PATHS.length);
  });
});

