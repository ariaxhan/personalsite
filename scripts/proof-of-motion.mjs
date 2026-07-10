#!/usr/bin/env node
// proof-of-motion.mjs
//
// Reads Aria's GitHub contribution history plus explicit supplemental GitHub
// repos available on disk, then writes an archaeological record of build
// activity to app/utils/motionData.json. Deterministic, zero npm dependencies.
// Never emits commit messages, author identities, or the private names of
// aggregated work. Only labels, months, counts, and configured public GitHub
// links reach the output.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const GITHUB_LOGIN = process.env.PROOF_GITHUB_LOGIN || "ariaxhan";
const FROM = process.env.PROOF_FROM || "2024-11-01";
const TO = process.env.PROOF_TO || new Date().toISOString().slice(0, 10);
const MAX_REPOSITORIES = Number(process.env.PROOF_MAX_REPOSITORIES || 100);

// GitHub contribution windows cannot exceed one year. Keep the site's public
// window here, then split it before querying.
const WINDOW_START = `${FROM}T00:00:00Z`;
const WINDOW_END = `${TO}T23:59:59Z`;

// ---------------------------------------------------------------------------
// Configuration. Named series carry a public label and optional public link.
// Aggregate groups collapse many repositories into one series and never expose
// the underlying private/client repo names.
// ---------------------------------------------------------------------------

const NAMED = [
  { label: "ModelMind", repos: ["ariaxhan/modelmind", "ariaxhan/modelmind-site"], constellation: "products" },
  { label: "Paper Rooms", repos: ["ariaxhan/paper-rooms"], constellation: "products" },
  { label: "our4cuts", repos: ["ariaxhan/our4cuts"], constellation: "products" },
  { label: "Brink Mind", repos: ["ariaxhan/brink-mind", "brink-labs/ios-app"], github: "https://github.com/ariaxhan/brink-mind", constellation: "products" },
  { label: "HeyContent", repos: ["persist-os/heycontent-web"], constellation: "companies" },
  { label: "KERNEL", repos: ["ariaxhan/kernel-claude"], github: "https://github.com/ariaxhan/kernel-claude", constellation: "agents" },
  { label: "Armature", repos: ["ariaxhan/armature-ai"], github: "https://github.com/ariaxhan/armature-ai", constellation: "agents" },
  { label: "the-agent-library", repos: ["ariaxhan/the-agent-library"], github: "https://github.com/ariaxhan/the-agent-library", constellation: "agents" },
  { label: "llm-bench", repos: ["ariaxhan/llm-bench"], github: "https://github.com/ariaxhan/llm-bench", constellation: "evals" },
  { label: "model-familiarity-engine", repos: ["ariaxhan/model-familiarity-engine"], github: "https://github.com/ariaxhan/model-familiarity-engine", constellation: "evals" },
  { label: "latent-diagnostics", repos: ["ariaxhan/latent-diagnostics"], github: "https://github.com/ariaxhan/latent-diagnostics", constellation: "evals" },
  { label: "metabrain", repos: ["ariaxhan/metabrain"], github: "https://github.com/ariaxhan/metabrain", constellation: "memory" },
  { label: "memory-pool", repos: ["ariaxhan/memory-pool"], github: "https://github.com/ariaxhan/memory-pool", constellation: "memory" },
  { label: "vector-native", repos: ["ariaxhan/vector-native", "persist-os/vector-native"], github: "https://github.com/ariaxhan/vector-native", constellation: "memory" },
  { label: "This site", repos: ["ariaxhan/personalsite", "ariaxhan/aria-portfolio"], github: "https://github.com/ariaxhan/personalsite", constellation: "meta" },
];

const COMPANY_SYSTEMS = {
  label: "Company systems",
  constellation: "companies",
  repos: ["persist-os/backend", "persist-os/plansandschemes"],
};

const IMPLEMENTATION = {
  label: "Client & internal implementation",
  constellation: "implementation",
  repos: [
    "ariaxhan/lhcr",
    "ariaxhan/hotel-quote-parser",
    "ariaxhan/vor-technical",
    "ariaxhan/dify-meta",
    "ariaxhan/hearth",
    "ariaxhan/augur",
    "ariaxhan/company-site",
  ],
};

const EXPERIMENTS = {
  label: "Private experiments",
  constellation: "experiments",
  repos: [
    "ariaxhan/agent-playground",
    "ariaxhan/ariacam",
    "ariaxhan/cognitive-substrate",
    "ariaxhan/crystal-os",
    "ariaxhan/experiments",
    "ariaxhan/neural-polygraph",
    "ariaxhan/poetrytracker",
    "ariaxhan/project-atlas",
    "ariaxhan/site-spec",
    "ariaxhan/the-tradition-harness",
    "ariaxhan/urban-atlas",
    "ariaxhan/wrong-convergence",
    "ariaxhan/universal-spectroscopy-engine",
    "persist-os/agent-playground",
    "persist-os/aws-hackathon",
    "persist-os/Dialectic",
    "persist-os/the-convergence",
  ],
};

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

const scriptDir = dirname(fileURLToPath(import.meta.url));
const homeDir = process.env.HOME || "";

const SUPPLEMENTAL_REPOS = [
  {
    key: "brink-labs/ios-app",
    path: resolve(homeDir, "Library/Mobile Documents/com~apple~CloudDocs/Documents/brink/brinkapp/brink"),
  },
];

function addDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function isoDay(date) {
  return date.toISOString().slice(0, 10);
}

function splitContributionWindows(fromDate, toDate) {
  const windows = [];
  let start = new Date(fromDate);
  const final = new Date(toDate);

  while (start <= final) {
    const nextYear = new Date(start);
    nextYear.setUTCFullYear(nextYear.getUTCFullYear() + 1);
    const end = new Date(Math.min(addDays(nextYear, -1).getTime(), final.getTime()));
    windows.push({
      from: `${isoDay(start)}T00:00:00Z`,
      to: `${isoDay(end)}T23:59:59Z`,
    });
    start = addDays(end, 1);
  }

  return windows;
}

function ghGraphql(query, variables) {
  const args = ["api", "graphql", "-f", `query=${query}`];
  for (const [key, value] of Object.entries(variables)) {
    if (value === null || value === undefined) continue;
    args.push(typeof value === "number" ? "-F" : "-f", `${key}=${value}`);
  }

  const out = execFileSync("gh", args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  const parsed = JSON.parse(out);
  if (parsed.errors?.length) {
    throw new Error(parsed.errors.map((e) => e.message).join("; "));
  }
  return parsed.data;
}

const CONTRIBUTIONS_QUERY = `
query($login:String!, $from:DateTime!, $to:DateTime!, $after:String, $maxRepositories:Int!) {
  user(login:$login) {
    contributionsCollection(from:$from, to:$to) {
      totalCommitContributions
      totalRepositoriesWithContributedCommits
      commitContributionsByRepository(maxRepositories:$maxRepositories) {
        repository {
          nameWithOwner
          url
          isPrivate
        }
        contributions(first:100, after:$after) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            occurredAt
            commitCount
          }
        }
      }
    }
  }
}`;

function emptyRepoRecord(repo) {
  return {
    nameWithOwner: repo.nameWithOwner,
    url: repo.url,
    isPrivate: repo.isPrivate,
    months: {},
    total: 0,
  };
}

function readLocalRepoMonths(repoPath) {
  if (!existsSync(resolve(repoPath, ".git"))) return null;

  let out;
  try {
    out = execFileSync("git", ["log", `--since=${FROM}`, `--until=${TO} 23:59:59`, "--format=%as"], {
      cwd: repoPath,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch {
    return null;
  }

  const months = {};
  let total = 0;
  for (const line of out.split("\n")) {
    const date = line.trim();
    if (date.length < 7) continue;
    const month = date.slice(0, 7);
    months[month] = (months[month] || 0) + 1;
    total += 1;
  }
  if (total === 0) return null;
  return { months, total };
}

function addSupplementalRepos(repoRecords) {
  const added = [];

  for (const repo of SUPPLEMENTAL_REPOS) {
    const record = readLocalRepoMonths(repo.path);
    if (!record) continue;

    if (!repoRecords.has(repo.key)) {
      repoRecords.set(repo.key, {
        nameWithOwner: repo.key,
        url: `https://github.com/${repo.key}`,
        isPrivate: true,
        months: {},
        total: 0,
      });
    }

    const target = repoRecords.get(repo.key);
    mergeMonths(target.months, record.months);
    target.total += record.total;
    added.push({ key: repo.key, total: record.total });
  }

  return added;
}

function readGithubContributions() {
  const repos = new Map();
  let totalCommitContributions = 0;
  let maxWindowRepoCount = 0;

  for (const window of splitContributionWindows(WINDOW_START, WINDOW_END)) {
    let after = null;

    for (;;) {
      const data = ghGraphql(CONTRIBUTIONS_QUERY, {
        login: GITHUB_LOGIN,
        from: window.from,
        to: window.to,
        after,
        maxRepositories: MAX_REPOSITORIES,
      });

      const collection = data.user?.contributionsCollection;
      if (!collection) {
        throw new Error(`GitHub user not found: ${GITHUB_LOGIN}`);
      }

      if (!after) {
        totalCommitContributions += collection.totalCommitContributions;
        maxWindowRepoCount = Math.max(maxWindowRepoCount, collection.totalRepositoriesWithContributedCommits);
      }

      let nextCursor = null;
      let hasNextPage = false;

      for (const item of collection.commitContributionsByRepository) {
        const key = item.repository.nameWithOwner;
        if (!repos.has(key)) repos.set(key, emptyRepoRecord(item.repository));
        const record = repos.get(key);

        for (const node of item.contributions.nodes) {
          const month = node.occurredAt.slice(0, 7);
          record.months[month] = (record.months[month] || 0) + node.commitCount;
          record.total += node.commitCount;
        }

        if (item.contributions.pageInfo.hasNextPage) {
          hasNextPage = true;
          nextCursor = item.contributions.pageInfo.endCursor;
        }
      }

      if (!hasNextPage) break;
      after = nextCursor;
    }
  }

  return { repos, totalCommitContributions, repoCount: repos.size, maxWindowRepoCount };
}

function mergeMonths(target, source) {
  for (const [month, count] of Object.entries(source)) {
    target[month] = (target[month] || 0) + count;
  }
}

function buildSeries(group, repoRecords) {
  const months = {};
  let total = 0;

  for (const repo of group.repos) {
    const record = repoRecords.get(repo);
    if (!record) continue;
    mergeMonths(months, record.months);
    total += record.total;
  }

  if (total === 0) return null;
  const keys = Object.keys(months).sort();
  const series = {
    label: group.label,
    constellation: group.constellation,
    months,
    total,
    first: keys[0],
    last: keys[keys.length - 1],
  };
  if (group.github) series.github = group.github;
  return series;
}

function buildUnclassifiedSeries(repoRecords, claimedRepos) {
  const months = {};
  let total = 0;

  for (const [repo, record] of repoRecords) {
    if (claimedRepos.has(repo)) continue;
    mergeMonths(months, record.months);
    total += record.total;
  }

  if (total === 0) return null;
  const keys = Object.keys(months).sort();
  return {
    label: "Other GitHub work",
    constellation: "experiments",
    months,
    total,
    first: keys[0],
    last: keys[keys.length - 1],
  };
}

const github = readGithubContributions();
const supplemental = addSupplementalRepos(github.repos);
const groups = [...NAMED, COMPANY_SYSTEMS, IMPLEMENTATION, EXPERIMENTS];
const claimedRepos = new Set(groups.flatMap((g) => g.repos));

const series = groups.map((group) => buildSeries(group, github.repos)).filter(Boolean);
const unclassified = buildUnclassifiedSeries(github.repos, claimedRepos);
if (unclassified) series.push(unclassified);

const grandTotal = series.reduce((sum, s) => sum + s.total, 0);
const present = new Set(series.map((s) => s.constellation));
const constellations = CONSTELLATIONS.filter((c) => present.has(c.key));

let lastMonth = null;
let firstMonth = null;
for (const s of series) {
  if (!lastMonth || s.last > lastMonth) lastMonth = s.last;
  if (!firstMonth || s.first < firstMonth) firstMonth = s.first;
}

const generated = new Date().toISOString().slice(0, 10);

const data = {
  generated,
  source: "github-contributions-plus-supplemental-git",
  githubLogin: GITHUB_LOGIN,
  githubWindow: {
    from: FROM,
    to: TO,
  },
  grandTotal,
  githubTotalCommitContributions: github.totalCommitContributions,
  supplementalCommitContributions: supplemental.reduce((sum, repo) => sum + repo.total, 0),
  repoCount: github.repos.size,
  firstMonth,
  lastMonth,
  series,
  constellations,
};

const outPath = resolve(scriptDir, "..", "app", "utils", "motionData.json");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(data, null, 2) + "\n");

const biggest = series
  .flatMap((s) => Object.entries(s.months).map(([m, c]) => ({ series: s.label, m, c })))
  .sort((a, b) => b.c - a.c)[0];
const missingFromConfig = [...claimedRepos].filter((repo) => !github.repos.has(repo));
const unclassifiedRepos = [...github.repos.keys()].filter((repo) => !claimedRepos.has(repo));

console.log(`GitHub login: ${GITHUB_LOGIN}`);
console.log(`wrote: ${outPath}`);
console.log(`grand total commits in rendered series: ${grandTotal} across ${github.repos.size} repositories`);
console.log(`GitHub contribution API total: ${github.totalCommitContributions}`);
if (supplemental.length) {
  console.log(`supplemental git repos: ${supplemental.map((repo) => `${repo.key} (${repo.total})`).join(", ")}`);
}
console.log(`span: ${data.firstMonth} to ${data.lastMonth}`);
if (biggest) console.log(`biggest month: ${biggest.m} (${biggest.series}, ${biggest.c} commits)`);
if (unclassifiedRepos.length) console.log(`unclassified repos collapsed into Other GitHub work: ${unclassifiedRepos.join(", ")}`);
if (missingFromConfig.length) console.log(`configured repos with no GitHub contributions in window: ${missingFromConfig.join(", ")}`);
if (github.maxWindowRepoCount >= MAX_REPOSITORIES) {
  console.log(`warning: GitHub returned ${github.maxWindowRepoCount} repos in at least one window; raise PROOF_MAX_REPOSITORIES if GitHub allows it`);
}
