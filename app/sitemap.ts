import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://ariaxhan.com";

const routes = [
  "",
  "/about",
  "/contact",
  "/hackathons",
  "/open-source",
  "/project-review",
  "/systems",
  "/timeline",
  "/writing",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1.0 : 0.7,
  }));
}
