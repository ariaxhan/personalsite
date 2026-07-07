#!/usr/bin/env node
// proof-of-motion.mjs
//
// Reads local git history from this machine and writes an archaeological record
// of build activity to app/utils/motionData.json. Deterministic, zero
// dependencies. Never emits commit messages, author identities, or the private
// directory names of aggregated groups. Only labels, months, counts, and the
// GitHub links configured below reach the output.
//
// Repos live as siblings of the site repo (personalsite/) inside CodingVault.
// Paths are derived from this script's own location, never hardcoded, so the
// script runs the same from a git worktree or the merged checkout, and skips
// missing repos without crashing on other machines.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Configuration. Three groups. Named series carry their own label + optional
// GitHub link. Aggregate groups collapse many directories into one series and
// NEVER expose the underlying directory names.
// ---------------------------------------------------------------------------

// a) Named series: one label per product/tool.
const NAMED = [
  { label: "ModelMind", dirs: ["modelmind", "modelmind-site"], constellation: "products" },
  { label: "Paper Rooms", dirs: ["paper-rooms"], constellation: "products" },
  { label: "our4cuts", dirs: ["our4cuts"], constellation: "products" },
  { label: "Brink Mind", dirs: ["brink-mind"], github: "https://github.com/ariaxhan/brink-mind", constellation: "products" },
  { label: "HeyContent", dirs: ["heycontent-web"], constellation: "companies" },
  { label: "KERNEL", dirs: ["kernel-claude"], github: "https://github.com/ariaxhan/kernel-claude", constellation: "agents" },
  { label: "Armature", dirs: ["armature"], github: "https://github.com/ariaxhan/armature-ai", constellation: "agents" },
  { label: "the-agent-library", dirs: ["the-agent-library"], github: "https://github.com/ariaxhan/the-agent-library", constellation: "agents" },
  { label: "llm-bench", dirs: ["llm-bench"], github: "https://github.com/ariaxhan/llm-bench", constellation: "evals" },
  { label: "model-familiarity-engine", dirs: ["model-familiarity-engine"], github: "https://github.com/ariaxhan/model-familiarity-engine", constellation: "evals" },
  { label: "latent-diagnostics", dirs: ["latent-diagnostics"], github: "https://github.com/ariaxhan/latent-diagnostics", constellation: "evals" },
  { label: "metabrain", dirs: ["metabrain"], github: "https://github.com/ariaxhan/metabrain", constellation: "memory" },
  { label: "memory-pool", dirs: ["memory-pool"], github: "https://github.com/ariaxhan/memory-pool", constellation: "memory" },
  { label: "vector-native", dirs: ["vector-native"], github: "https://github.com/ariaxhan/vector-native", constellation: "memory" },
  { label: "This site", dirs: ["personalsite"], github: "https://github.com/ariaxhan/personalsite", constellation: "meta" },
];

// b) Aggregate: client & internal implementation. Directory names are used only
//    to read git logs; they are never written to the output.
const IMPLEMENTATION = {
  label: "Client & internal implementation",
  constellation: "implementation",
  dirs: ["lhcr", "hotel-quote-parser", "vor-technical", "dify-meta", "hearth", "augur", "company-site"],
};

// c) Aggregate: private experiments. Same rule, no names ever emitted.
const EXPERIMENTS = {
  label: "Private experiments",
  constellation: "experiments",
  dirs: ["ariacam", "cognitive-substrate", "crystal-os", "poetrytracker", "project-atlas", "site-spec", "the-tradition-harness", "urban-atlas", "matra", "wrong-convergence", "neural-polygraph", "experiments"],
};

// Constellation metadata, in visualization band order.
const CONSTELLATIONS = [
  { key: "memory", label: "Memory & context", note: "What an agent keeps across sessions: memory stores, context engines, retrieval." },
  { key: "evals", label: "Evals & diagnostics", note: "Measuring model behavior: benchmarks, verifiers, familiarity and diagnostic probes." },
  { key: "agents", label: "Agents & harnesses", note: "The scaffolding around agents: coordination frameworks, skill libraries, coding harnesses." },
  { key: "products", label: "Products", note: "Shipped apps and their companion sites, from first commit to store." },
  { key: "companies", label: "Companies", note: "Company platforms and the web systems behind them." },
  { key: "implementation", label: "Client & internal", note: "Client and internal implementation work. Counted as activity, never named." },
  { key: "experiments", label: "Experiments", note: "Private research spikes and prototypes. Themes and counts only, no names." },
  { key: "meta", label: "Meta", note: "This site and the record of its own construction." },
];

// ---------------------------------------------------------------------------
// Locate the directory that holds the sibling repos. Walk up from this script,
// scoring each ancestor by how many configured directories live directly under
// it, and pick the best. Deterministic and username-agnostic; on a machine
// where none of the repos exist, it simply finds nothing and writes an empty
// record rather than crashing.
// ---------------------------------------------------------------------------

const scriptDir = dirname(fileURLToPath(import.meta.url));

const allDirs = [
  ...NAMED.flatMap((s) => s.dirs),
  ...IMPLEMENTATION.dirs,
  ...EXPERIMENTS.dirs,
];

function findReposParent(start) {
  let best = null;
  let bestScore = 0;
  let cur = resolve(start);
  // Walk to filesystem root.
  for (;;) {
    let score = 0;
    for (const d of allDirs) {
      if (existsSync(join(cur, d))) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = cur;
    }
    const parent = dirname(cur);
    if (parent === cur) break;
    cur = parent;
  }
  return best;
}

const reposParent = findReposParent(scriptDir);

// ---------------------------------------------------------------------------
// Git reading. One process per repo: `git log --format=%as` yields authorship
// dates as YYYY-MM-DD. We bucket by month and count. No message, author, or
// path text is ever requested.
// ---------------------------------------------------------------------------

const missing = [];
let repoCount = 0;

function readRepoMonths(dir) {
  if (!reposParent) {
    missing.push(dir);
    return null;
  }
  const path = join(reposParent, dir);
  if (!existsSync(join(path, ".git"))) {
    missing.push(dir);
    return null;
  }
  let out;
  try {
    out = execFileSync("git", ["log", "--format=%as"], {
      cwd: path,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch {
    missing.push(dir);
    return null;
  }
  const months = {};
  let total = 0;
  for (const line of out.split("\n")) {
    const date = line.trim();
    if (date.length < 7) continue;
    const month = date.slice(0, 7); // YYYY-MM
    months[month] = (months[month] || 0) + 1;
    total += 1;
  }
  if (total === 0) return null;
  repoCount += 1;
  return { months, total };
}

// Build one output series from a set of directories, merging their month
// buckets. `github` is optional and only present on published repos.
function buildSeries({ label, constellation, github, dirs }) {
  const months = {};
  let total = 0;
  for (const dir of dirs) {
    const r = readRepoMonths(dir);
    if (!r) continue;
    for (const [m, c] of Object.entries(r.months)) {
      months[m] = (months[m] || 0) + c;
    }
    total += r.total;
  }
  if (total === 0) return null;
  const keys = Object.keys(months).sort();
  const series = {
    label,
    constellation,
    months,
    total,
    first: keys[0],
    last: keys[keys.length - 1],
  };
  if (github) series.github = github;
  return series;
}

const series = [];
for (const s of NAMED) {
  const built = buildSeries(s);
  if (built) series.push(built);
}
for (const g of [IMPLEMENTATION, EXPERIMENTS]) {
  const built = buildSeries(g);
  if (built) series.push(built);
}

const grandTotal = series.reduce((sum, s) => sum + s.total, 0);

// Only ship constellation metadata for bands that actually have data.
const present = new Set(series.map((s) => s.constellation));
const constellations = CONSTELLATIONS.filter((c) => present.has(c.key));

// Earliest and latest month across all series, for the visualization time axis.
let lastMonth = null;
let firstMonth = null;
for (const s of series) {
  if (!lastMonth || s.last > lastMonth) lastMonth = s.last;
  if (!firstMonth || s.first < firstMonth) firstMonth = s.first;
}

const generated = new Date().toISOString().slice(0, 10);

const data = {
  generated,
  grandTotal,
  repoCount,
  firstMonth,
  lastMonth,
  series,
  constellations,
};

const outPath = resolve(scriptDir, "..", "app", "utils", "motionData.json");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(data, null, 2) + "\n");

// Console summary, for the human running the script. Not written to any file.
const biggest = series
  .flatMap((s) => Object.entries(s.months).map(([m, c]) => ({ series: s.label, m, c })))
  .sort((a, b) => b.c - a.c)[0];

console.log(`repos parent: ${reposParent}`);
console.log(`wrote: ${outPath}`);
console.log(`grand total commits: ${grandTotal} across ${repoCount} repositories`);
console.log(`span: ${data.firstMonth} to ${data.lastMonth}`);
if (biggest) console.log(`biggest month: ${biggest.m} (${biggest.series}, ${biggest.c} commits)`);
if (missing.length) console.log(`missing (skipped): ${missing.join(", ")}`);
