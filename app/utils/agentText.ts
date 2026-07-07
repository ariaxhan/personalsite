// ============================================================================
// AGENT TEXT
// One rendering layer for every machine-readable surface. llms.txt, the full
// markdown mirror, the per-page markdown variants, and the JSON endpoints all
// generate from the same data files the human pages read, so nothing can drift.
// Pure TypeScript, no React, so functions/mcp.ts can import it too. No em dashes.
// ============================================================================

import { SITE, proofStats } from "./siteMeta";
import {
  projects,
  productProjects,
  openSourceProjects,
  THEME_LABELS,
  type Project,
} from "./projectsData";
import {
  WRITING_THEMES,
  articlesByTheme,
  articles,
  type Article,
} from "./writingData";
import { engagements, goodFit, notAFit, workingStyle } from "./workWithMeData";
import { moments, hackathons } from "./studioData";
import {
  motionData,
  buildBands,
  ERAS,
  monthLabel,
} from "../components/motion/motionShared";

// ---------------------------------------------------------------------------
// Canonical route map. The single list every surface cites.
// ---------------------------------------------------------------------------
export const CANONICAL_ROUTES: { path: string; purpose: string }[] = [
  { path: "/", purpose: "Home. The ten-second introduction to Aria and the work." },
  { path: "/about/", purpose: "Who Aria is, the working pattern, and the verified numbers." },
  { path: "/systems/", purpose: "Shipped products and companies, each with proof." },
  { path: "/open-source/", purpose: "Public repositories and research, each with proof." },
  { path: "/writing/", purpose: "Essays grouped by theme, links stay on Medium." },
  { path: "/proof/", purpose: "Proof of motion, an archaeological build record." },
  { path: "/timeline/", purpose: "Roles and milestones by year." },
  { path: "/hackathons/", purpose: "Builds under pressure and hackathon wins." },
  { path: "/contact/", purpose: "Engagement types, fit filter, and booking." },
  { path: "/project-review/", purpose: "Structured intake for a paid project review." },
];

export const AGENT_ENDPOINTS: { path: string; purpose: string }[] = [
  { path: "/llms.txt", purpose: "Concise agent guide to this site." },
  { path: "/llms-full.txt", purpose: "Complete markdown mirror of the whole site." },
  { path: "/api/site-index.json", purpose: "Site identity, route map, and endpoint list." },
  { path: "/api/projects.json", purpose: "Structured records for every project." },
  { path: "/api/writing.json", purpose: "Articles grouped by theme." },
  { path: "/api/work-with-me.json", purpose: "Engagement types, fit filter, and booking." },
  { path: "/.well-known/agent-card.json", purpose: "A2A agent card." },
  { path: "/.well-known/mcp/server-card.json", purpose: "MCP server card." },
  { path: "/.well-known/api-catalog", purpose: "Linkset of machine endpoints." },
  { path: "/.well-known/agent-skills/index.json", purpose: "Agent skills index." },
  { path: "/mcp", purpose: "MCP endpoint, JSON-RPC over streamable HTTP." },
];

export const AGENT_PREFERENCES = {
  aiTrain: "no",
  aiInput: `yes, cite ${SITE.url}`,
  search: "yes",
} as const;

// ---------------------------------------------------------------------------
// Small shared fragments.
// ---------------------------------------------------------------------------
function identityLines(): string[] {
  return [
    `- Name: ${SITE.name}`,
    `- Role: ${SITE.role}`,
    `- Location: ${SITE.location}`,
    `- Site: ${SITE.url}`,
    `- Email: ${SITE.email}`,
  ];
}

function socialLines(): string[] {
  return [
    `- GitHub: ${SITE.socials.github}`,
    `- Medium: ${SITE.socials.medium}`,
    `- LinkedIn: ${SITE.socials.linkedin}`,
    `- X: ${SITE.socials.x}`,
  ];
}

function proofLines(): string[] {
  return proofStats.map(
    (s) => `- ${s.value} ${s.label} (source: ${s.source}, verified ${s.verified})`,
  );
}

function linkList(links: Project["links"]): string {
  if (links.length === 0) return "none public";
  return links.map((l) => `[${l.label}](${l.href})`).join(", ");
}

function themeList(themes: Project["themes"]): string {
  return themes.map((t) => THEME_LABELS[t]).join(", ");
}

// ---------------------------------------------------------------------------
// Project rendering.
// ---------------------------------------------------------------------------
function projectCompactMd(p: Project): string[] {
  return [
    `### ${p.name}`,
    `${p.thesis}`,
    ``,
    `- Status: ${p.status}`,
    `- Proof: ${p.proof}`,
    `- Stack: ${p.stack}`,
    `- Links: ${linkList(p.links)}`,
    ``,
  ];
}

function projectFullMd(p: Project): string[] {
  return [
    `### ${p.name}`,
    `Thesis: ${p.thesis}`,
    ``,
    `- Kind: ${p.kind}`,
    `- Status: ${p.status}`,
    `- Problem: ${p.problem}`,
    `- What I built: ${p.built.join(" ")}`,
    `- Stack: ${p.stack}`,
    `- Proof: ${p.proof}`,
    `- Learned: ${p.learned}`,
    `- Proves: ${p.proves}`,
    `- Themes: ${themeList(p.themes)}`,
    `- Connects to: ${p.connections.join(", ") || "none"}`,
    `- Links: ${linkList(p.links)}`,
    `- Closing: ${p.closing}`,
    ``,
  ];
}

// ---------------------------------------------------------------------------
// Writing rendering.
// ---------------------------------------------------------------------------
function writingThemedMd(): string[] {
  const out: string[] = [];
  for (const theme of WRITING_THEMES) {
    out.push(`### ${theme.label}`);
    out.push(theme.note);
    out.push(``);
    for (const a of articlesByTheme(theme.key)) {
      out.push(`- [${a.title}](${a.href}) (${a.read}): ${a.excerpt}`);
    }
    out.push(``);
  }
  return out;
}

// ===========================================================================
// llms.txt, the concise agent guide.
// ===========================================================================
export function renderLlmsTxt(): string {
  const lines: string[] = [
    `# ${SITE.name}`,
    ``,
    `> ${SITE.tldr}`,
    ``,
    `${SITE.role}. ${SITE.location}.`,
    ``,
    `## Pages`,
    ...CANONICAL_ROUTES.map((r) => `- ${r.path} : ${r.purpose}`),
    ``,
    `## Agent resources`,
    ...AGENT_ENDPOINTS.map((e) => `- ${e.path} : ${e.purpose}`),
    ``,
    `## Preferences`,
    `- ai-train: ${AGENT_PREFERENCES.aiTrain}`,
    `- ai-input: ${AGENT_PREFERENCES.aiInput}`,
    `- search: ${AGENT_PREFERENCES.search}`,
    ``,
  ];
  return lines.join("\n");
}

// ===========================================================================
// llms-full.txt, the complete markdown mirror.
// An agent can reconstruct the whole site from this without touching HTML.
// ===========================================================================
export function renderLlmsFullTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${SITE.name}, Full Site Mirror`);
  lines.push(``);
  lines.push(`> ${SITE.tldr}`);
  lines.push(``);

  lines.push(`## Identity`);
  lines.push(...identityLines());
  lines.push(``);
  lines.push(`## Elsewhere`);
  lines.push(...socialLines());
  lines.push(`- Booking: ${SITE.booking.url}`);
  lines.push(``);

  lines.push(`## Bio`);
  for (const para of SITE.bio) {
    lines.push(para);
    lines.push(``);
  }

  lines.push(`## Verified numbers`);
  lines.push(`Each number traces to a source and is re-verified before it changes.`);
  lines.push(...proofLines());
  lines.push(``);

  lines.push(`## Products and companies`);
  lines.push(``);
  for (const p of productProjects) {
    lines.push(...projectFullMd(p));
  }

  lines.push(`## Open source and research`);
  lines.push(``);
  for (const p of openSourceProjects) {
    lines.push(...projectFullMd(p));
  }

  lines.push(`## Writing`);
  lines.push(``);
  lines.push(...writingThemedMd());

  lines.push(`## Timeline`);
  lines.push(``);
  for (const m of moments) {
    lines.push(`### ${m.title} (${m.period})`);
    lines.push(m.body);
    lines.push(``);
  }

  lines.push(`## Hackathons`);
  lines.push(``);
  for (const h of hackathons) {
    const award = h.award ? `${h.award}, ${h.metric}` : h.metric;
    lines.push(`### ${h.name}, ${h.hackathon} (${h.year})`);
    lines.push(`${h.description}`);
    lines.push(`- Result: ${award}`);
    lines.push(`- Tech: ${h.technologies.join(", ")}`);
    lines.push(`- Link: ${h.link}`);
    lines.push(``);
  }

  lines.push(`## Work with me`);
  lines.push(``);
  lines.push(workingStyle);
  lines.push(``);
  lines.push(`### Engagement types`);
  for (const e of engagements) {
    lines.push(`- ${e.title}: ${e.detail}`);
  }
  lines.push(``);
  lines.push(`### A good fit`);
  for (const g of goodFit) lines.push(`- ${g}`);
  lines.push(``);
  lines.push(`### Not a fit`);
  for (const n of notAFit) lines.push(`- ${n}`);
  lines.push(``);
  lines.push(`### Booking`);
  lines.push(`${SITE.booking.line} ${SITE.booking.url}`);
  lines.push(`Structured project review intake: ${SITE.url}/project-review/`);
  lines.push(``);

  lines.push(`## Contact`);
  lines.push(...identityLines());
  lines.push(...socialLines());
  lines.push(``);

  lines.push(`## Agent preferences`);
  lines.push(`- Training: ${AGENT_PREFERENCES.aiTrain === "no" ? "disallowed" : "allowed"}`);
  lines.push(`- Inference and grounding with citation: allowed`);
  lines.push(`- Search indexing: allowed`);
  lines.push(``);
  lines.push(`---`);
  lines.push(`Machine-readable endpoints:`);
  for (const e of AGENT_ENDPOINTS) {
    lines.push(`- ${SITE.url}${e.path}`);
  }
  lines.push(``);

  return lines.join("\n");
}

// ===========================================================================
// Per-page markdown variants. Compact renditions served for Accept: text/markdown
// and at the /<page>/index.md paths the middleware probes.
// ===========================================================================
export function renderHomeMd(): string {
  const lines: string[] = [
    `# ${SITE.name}`,
    ``,
    `${SITE.oneLiner} ${SITE.strangeLine}`,
    ``,
    `> ${SITE.tldr}`,
    ``,
    `${SITE.role}. ${SITE.location}.`,
    ``,
    `## Pages`,
    ...CANONICAL_ROUTES.map((r) => `- [${r.path}](${r.path}): ${r.purpose}`),
    ``,
    `## Agent resources`,
    ...AGENT_ENDPOINTS.map((e) => `- ${e.path}: ${e.purpose}`),
    ``,
  ];
  return lines.join("\n");
}

export function renderAboutMd(): string {
  const lines: string[] = [`# About ${SITE.name}`, ``];
  for (const para of SITE.bio) {
    lines.push(para);
    lines.push(``);
  }
  lines.push(`## Verified numbers`);
  lines.push(...proofLines());
  lines.push(``);
  lines.push(`## Links`);
  lines.push(...identityLines());
  lines.push(...socialLines());
  lines.push(``);
  return lines.join("\n");
}

function projectsPageMd(title: string, list: Project[]): string {
  const lines: string[] = [`# ${title}`, ``];
  for (const p of list) {
    lines.push(...projectCompactMd(p));
  }
  return lines.join("\n");
}

export function renderSystemsMd(): string {
  return projectsPageMd(`Systems, ${SITE.name}`, productProjects);
}

export function renderOpenSourceMd(): string {
  return projectsPageMd(`Open Source, ${SITE.name}`, openSourceProjects);
}

export function renderWritingMd(): string {
  const lines: string[] = [
    `# Writing, ${SITE.name}`,
    ``,
    `Essays on agents, memory, evals, AI coding workflows, and the questions underneath.`,
    ``,
    ...writingThemedMd(),
  ];
  return lines.join("\n");
}

export function renderContactMd(): string {
  const lines: string[] = [
    `# Work with ${SITE.name}`,
    ``,
    workingStyle,
    ``,
    `## Engagement types`,
  ];
  for (const e of engagements) {
    lines.push(`- ${e.title}: ${e.detail}`);
  }
  lines.push(``);
  lines.push(`## A good fit`);
  for (const g of goodFit) lines.push(`- ${g}`);
  lines.push(``);
  lines.push(`## Not a fit`);
  for (const n of notAFit) lines.push(`- ${n}`);
  lines.push(``);
  lines.push(`## Booking`);
  lines.push(`${SITE.booking.line}`);
  lines.push(`- Call: ${SITE.booking.url}`);
  lines.push(`- Project review intake: ${SITE.url}/project-review/`);
  lines.push(``);
  lines.push(`## Links`);
  lines.push(...identityLines());
  lines.push(...socialLines());
  lines.push(``);
  return lines.join("\n");
}

export function renderTimelineMd(): string {
  const lines: string[] = [`# Timeline, ${SITE.name}`, ``];
  for (const m of moments) {
    lines.push(`## ${m.title}`);
    lines.push(`${m.period}`);
    lines.push(``);
    lines.push(m.body);
    lines.push(``);
  }
  return lines.join("\n");
}

export function renderHackathonsMd(): string {
  const lines: string[] = [`# Hackathons, ${SITE.name}`, ``];
  for (const h of hackathons) {
    const award = h.award ? `${h.award}, ${h.metric}` : h.metric;
    lines.push(`## ${h.name}, ${h.hackathon} (${h.year})`);
    lines.push(h.description);
    lines.push(``);
    lines.push(`- Result: ${award}`);
    lines.push(`- Tech: ${h.technologies.join(", ")}`);
    lines.push(`- Link: ${h.link}`);
    lines.push(``);
  }
  return lines.join("\n");
}

// ===========================================================================
// Proof of motion. Compact markdown of the git-history motion record, generated
// from app/utils/motionData.json so it cannot drift from the visualization.
// ===========================================================================
export function renderProofMd(): string {
  const bands = buildBands();
  const total = motionData.grandTotal.toLocaleString();
  const span = `${monthLabel(motionData.firstMonth)} to ${monthLabel(motionData.lastMonth)}`;
  const lines: string[] = [
    `# Proof of Motion, ${SITE.name}`,
    ``,
    `> Real commit history from the machine this site is built on, grouped into constellations. Client work and private experiments appear as activity, never as names.`,
    ``,
    `- Total commits: ${total}`,
    `- Repositories on this machine: ${motionData.repoCount}`,
    `- Span: ${span}`,
    `- Generated: ${motionData.generated}`,
    ``,
    `## Constellations`,
    ...bands.map(
      (b) => `- ${b.label}: ${b.total.toLocaleString()} commits, ${monthLabel(b.first)} to ${monthLabel(b.last)}. ${b.note}`,
    ),
    ``,
    `## Eras`,
    ...ERAS.map((e) => `- ${e.name} (${e.range}): ${e.caption}`),
    ``,
    `Full history: ${SITE.socials.github}`,
    ``,
  ];
  return lines.join("\n");
}

// ===========================================================================
// JSON endpoint payloads.
// ===========================================================================
export function siteIndexJson() {
  return {
    site: {
      name: SITE.name,
      role: SITE.role,
      location: SITE.location,
      url: SITE.url,
      tldr: SITE.tldr,
    },
    routes: CANONICAL_ROUTES,
    endpoints: AGENT_ENDPOINTS,
    socials: SITE.socials,
    booking: SITE.booking,
  };
}

export function projectsJson() {
  return { projects };
}

export function writingJson() {
  return { themes: WRITING_THEMES, articles };
}

export function workWithMeJson() {
  return {
    engagements,
    goodFit,
    notAFit,
    workingStyle,
    booking: SITE.booking,
    email: SITE.email,
  };
}

// ===========================================================================
// MCP tool bodies. Shared with functions/mcp.ts so the MCP server and the site
// tell the same story. Returns markdown strings.
// ===========================================================================
export function mcpBioMd(): string {
  const lines: string[] = [`# ${SITE.name}`, ``, `${SITE.role}. ${SITE.location}.`, ``];
  for (const para of SITE.bio) {
    lines.push(para);
    lines.push(``);
  }
  lines.push(`## Verified numbers`);
  lines.push(...proofLines());
  lines.push(``);
  lines.push(`Full bio and links: ${SITE.url}/about/`);
  return lines.join("\n");
}

export function mcpProjectsMd(): string {
  const lines: string[] = [`# Projects, ${SITE.name}`, ``];
  for (const p of projects) {
    lines.push(`- ${p.name} (${p.status}): ${p.thesis} ${linkList(p.links)}`);
  }
  lines.push(``);
  lines.push(`Full records: ${SITE.url}/api/projects.json`);
  return lines.join("\n");
}

export function mcpWritingMd(): string {
  const lines: string[] = [`# Writing, ${SITE.name}`, ``];
  for (const a of articles as Article[]) {
    lines.push(`- [${a.title}](${a.href}) (${a.read})`);
  }
  lines.push(``);
  lines.push(`Grouped by theme: ${SITE.url}/writing/  Structured: ${SITE.url}/api/writing.json`);
  return lines.join("\n");
}
