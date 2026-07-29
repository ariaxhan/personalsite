import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";
import { projects } from "./utils/projectsData";

export const dynamic = "force-static";

const BASE = "https://ariaxhan.com";

// Every route used to be stamped with a single `new Date()`, so all 11 URLs
// claimed the identical modification time on every deploy. lastmod that always
// changes carries no information, and crawlers learn to ignore it, which costs
// recrawl priority. Each route now reports the commit date of the files that
// actually produce it. `priority` and `changeFrequency` are dropped: Google has
// stated publicly that it ignores both.
// Measured 2026-07-28, see _meta/research/2026-07-28-discoverability-audit.md.
const ROUTE_SOURCES: Record<string, string[]> = {
  "/": ["app/page.tsx", "app/components/Hero.tsx", "app/utils/siteCopy.ts"],
  "/about/": ["app/about/page.tsx", "app/components/About.tsx"],
  "/reading/": ["app/reading/page.tsx"],
  "/contact/": ["app/contact/page.tsx", "app/utils/workWithMeData.ts"],
  "/hackathons/": ["app/hackathons/page.tsx"],
  "/open-source/": ["app/open-source/page.tsx", "app/utils/projectsData.ts"],
  "/project-review/": ["app/project-review/page.tsx"],
  "/proof/": ["app/proof/page.tsx", "app/utils/motionData.json"],
  "/systems/": ["app/systems/page.tsx", "app/utils/projectsData.ts"],
  "/timeline/": ["app/timeline/page.tsx"],
  "/writing/": ["app/writing/page.tsx", "app/utils/writingData.ts"],
};

/** Commit date of the most recent change to any of `paths`. */
function lastCommit(paths: string[]): Date {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return iso ? new Date(iso) : new Date();
  } catch {
    // Not a git tree (a bare CI checkout, a tarball). Fall back rather than fail the build.
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.entries(ROUTE_SOURCES).map(([route, sources]) => ({
    url: `${BASE}${route}`,
    lastModified: lastCommit(sources),
  }));

  // Project detail pages are real URLs now, so they belong in the sitemap.
  const projectDate = lastCommit(["app/utils/siteCopy.ts"]);
  const projectPages = projects.map((p) => ({
    url: `${BASE}/projects/${p.slug}/`,
    lastModified: projectDate,
  }));

  return [...pages, ...projectPages];
}
