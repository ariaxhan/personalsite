import { DEFAULT_SITE_CONTENT } from "./defaultContent";

export const HUMAN_PUBLIC_PATHS = [
  "/",
  "/about/",
  "/books/",
  "/contact/",
  "/hackathons/",
  "/open-source/",
  "/project-review/",
  "/proof/",
  "/reading/",
  "/systems/",
  "/timeline/",
  "/writing/",
  ...DEFAULT_SITE_CONTENT.projects.map((project) => `/projects/${project.slug}/`),
] as const;

export const MACHINE_PUBLIC_PATHS = [
  "/.well-known/agent-card.json",
  "/.well-known/agent-skills/aria-bio/SKILL.md",
  "/.well-known/agent-skills/aria-projects/SKILL.md",
  "/.well-known/agent-skills/aria-writing/SKILL.md",
  "/.well-known/agent-skills/index.json",
  "/.well-known/api-catalog",
  "/.well-known/mcp/server-card.json",
  "/about/index.md",
  "/api/projects.json",
  "/api/site-index.json",
  "/api/stats.json",
  "/api/work-with-me.json",
  "/api/writing.json",
  "/contact/index.md",
  "/hackathons/index.md",
  "/index.md",
  "/llms-full.txt",
  "/llms.txt",
  "/mcp/",
  "/open-source/index.md",
  "/proof/index.md",
  "/sitemap.xml",
  "/systems/index.md",
  "/timeline/index.md",
  "/writing/index.md",
] as const;

export const CONTENT_PUBLIC_PATHS = [
  ...new Set([...HUMAN_PUBLIC_PATHS, ...MACHINE_PUBLIC_PATHS]),
] as const;

export const CONVERGENCE_PATHS = CONTENT_PUBLIC_PATHS;
