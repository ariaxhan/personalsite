#!/usr/bin/env node
// content-dates.mjs
//
// Writes app/utils/contentDates.json: the last commit date of the files that
// produce each route, used as sitemap lastmod.
//
// Why this is a committed file rather than a git call at build time: the
// Cloudflare Pages build clone has no usable history, so `git log -- <path>`
// returns empty there and every route silently fell back to the build
// timestamp. That is exactly the failure the lastmod fix existed to remove,
// and it shipped looking correct: the build was green and the sitemap was
// well-formed, it just carried one identical date on all 26 URLs.
//
// Verified 2026-07-29 against the deployed sitemap, which showed a single
// distinct lastmod. Run this where history exists (a dev machine, or CI with
// fetch-depth: 0), commit the result, and the build only has to read JSON.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const outPath = resolve(repoRoot, "app", "utils", "contentDates.json");

// Route to the source files that actually change what the page says.
const ROUTE_SOURCES = {
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
  // Every project detail page is generated from the same record file.
  "projects": ["app/utils/siteCopy.ts", "app/projects/[slug]/page.tsx"],
};

function lastCommit(paths) {
  const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
    cwd: repoRoot,
    encoding: "utf8",
  }).trim();
  if (!iso) throw new Error(`no commit history for: ${paths.join(", ")}`);
  return iso;
}

const dates = {};
for (const [route, sources] of Object.entries(ROUTE_SOURCES)) {
  dates[route] = lastCommit(sources);
}

// A single distinct date across every route is the exact bug this file exists
// to prevent, so refuse to write one.
const distinct = new Set(Object.values(dates));
if (distinct.size < 2) {
  console.error(
    `refusing to write: all ${Object.keys(dates).length} routes resolved to the ` +
      `same date (${[...distinct][0]}). This clone has no usable history. ` +
      `Run with a full checkout (git fetch --unshallow, or fetch-depth: 0).`
  );
  process.exit(1);
}

let previous = "";
try {
  previous = readFileSync(outPath, "utf8");
} catch {
  previous = "";
}
const next = JSON.stringify(dates, null, 2) + "\n";
if (previous === next) {
  console.log("content dates unchanged");
} else {
  writeFileSync(outPath, next);
  console.log(`wrote ${outPath}`);
}
for (const [route, iso] of Object.entries(dates)) {
  console.log(`  ${route.padEnd(18)} ${iso}`);
}
