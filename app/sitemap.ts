import type { MetadataRoute } from "next";
import { projects } from "./utils/projectsData";
import contentDates from "./utils/contentDates.json";

export const dynamic = "force-static";

const BASE = "https://ariaxhan.com";

// lastmod comes from app/utils/contentDates.json, written by
// scripts/content-dates.mjs where git history exists and committed. Calling git
// from here looked correct locally and silently degraded on Cloudflare, whose
// build clone has no usable history: every route fell back to the build
// timestamp, so all 26 URLs shipped with one identical date. Verified against
// the deployed sitemap on 2026-07-29.
//
// `priority` and `changeFrequency` are deliberately absent. Google has stated
// publicly that it ignores both.
const dates = contentDates as Record<string, string>;

const ROUTES = [
  "/",
  "/about/",
  "/reading/",
  "/contact/",
  "/hackathons/",
  "/open-source/",
  "/project-review/",
  "/proof/",
  "/systems/",
  "/timeline/",
  "/writing/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ROUTES.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(dates[route]),
  }));

  const projectDate = new Date(dates.projects);
  const projectPages = projects.map((p) => ({
    url: `${BASE}/projects/${p.slug}/`,
    lastModified: projectDate,
  }));

  return [...pages, ...projectPages];
}
