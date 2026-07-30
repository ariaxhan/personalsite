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
  buildEras,
  monthLabel,
} from "../components/motion/motionShared";
import { PAGE_COPY } from "./siteCopy";

// ---------------------------------------------------------------------------
// Canonical route map. The single list every surface cites.
// ---------------------------------------------------------------------------
export const CANONICAL_ROUTES: { path: string; purpose: string }[] = [...PAGE_COPY.agentText.canonicalRoutes];

export const AGENT_ENDPOINTS: { path: string; purpose: string }[] = [...PAGE_COPY.agentText.endpoints];

export const AGENT_PREFERENCES = {
  aiTrain: PAGE_COPY.agentText.preferences.aiTrain,
  aiInput: `yes, cite ${SITE.url}`,
  search: PAGE_COPY.agentText.preferences.search,
} as const;

const T = PAGE_COPY.agentText.labels;
const NOTES = PAGE_COPY.agentText.notes;
const ERAS = buildEras(PAGE_COPY.motion);

// ---------------------------------------------------------------------------
// Small shared fragments.
// ---------------------------------------------------------------------------
function identityLines(): string[] {
  return [
    `- ${T.name}: ${SITE.name}`,
    `- ${T.role}: ${SITE.role}`,
    `- ${T.location}: ${SITE.location}`,
    `- ${T.site}: ${SITE.url}`,
    `- ${T.email}: ${SITE.email}`,
  ];
}

function socialLines(): string[] {
  return [
    `- ${T.github}: ${SITE.socials.github}`,
    `- ${T.medium}: ${SITE.socials.medium}`,
    `- ${T.linkedIn}: ${SITE.socials.linkedin}`,
    `- ${T.x}: ${SITE.socials.x}`,
  ];
}

function proofLines(): string[] {
  return proofStats.map(
    (s) => `- ${s.value} ${s.label} (${T.source}: ${s.source}, ${T.verified} ${s.verified})`,
  );
}

function linkList(links: Project["links"]): string {
  if (links.length === 0) return T.nonePublic;
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
    `- ${T.status}: ${p.status}`,
    `- ${T.proof}: ${p.proof}`,
    `- ${T.stack}: ${p.stack}`,
    `- ${T.links}: ${linkList(p.links)}`,
    ``,
  ];
}

function projectFullMd(p: Project): string[] {
  return [
    `### ${p.name}`,
    `${T.thesis}: ${p.thesis}`,
    ``,
    `- ${T.kind}: ${p.kind}`,
    `- ${T.status}: ${p.status}`,
    `- ${T.problem}: ${p.problem}`,
    `- ${T.built}: ${p.built.join(" ")}`,
    `- ${T.stack}: ${p.stack}`,
    `- ${T.proof}: ${p.proof}`,
    `- ${T.learned}: ${p.learned}`,
    `- ${T.proves}: ${p.proves}`,
    `- ${T.themes}: ${themeList(p.themes)}`,
    `- ${T.connectsTo}: ${p.connections.join(", ") || T.none}`,
    `- ${T.links}: ${linkList(p.links)}`,
    `- ${T.closing}: ${p.closing}`,
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
    `## ${T.pages}`,
    ...CANONICAL_ROUTES.map((r) => `- ${r.path} : ${r.purpose}`),
    ``,
    `## ${T.agentResources}`,
    ...AGENT_ENDPOINTS.map((e) => `- ${e.path} : ${e.purpose}`),
    ``,
    `## ${T.preferences}`,
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

  lines.push(`# ${SITE.name}, ${T.fullSiteMirror}`);
  lines.push(``);
  lines.push(`> ${SITE.tldr}`);
  lines.push(``);

  lines.push(`## ${T.identity}`);
  lines.push(...identityLines());
  lines.push(``);
  lines.push(`## ${T.elsewhere}`);
  lines.push(...socialLines());
  lines.push(`- ${T.booking}: ${SITE.booking.url}`);
  lines.push(``);

  lines.push(`## ${T.bio}`);
  for (const para of SITE.bio) {
    lines.push(para);
    lines.push(``);
  }

  lines.push(`## ${T.verifiedNumbers}`);
  lines.push(NOTES.verifiedNumbers);
  lines.push(...proofLines());
  lines.push(``);

  lines.push(`## ${T.products}`);
  lines.push(``);
  for (const p of productProjects) {
    lines.push(...projectFullMd(p));
  }

  lines.push(`## ${T.openSource}`);
  lines.push(``);
  for (const p of openSourceProjects) {
    lines.push(...projectFullMd(p));
  }

  lines.push(`## ${T.writing}`);
  lines.push(``);
  lines.push(...writingThemedMd());

  lines.push(`## ${T.timeline}`);
  lines.push(``);
  for (const m of moments) {
    lines.push(`### ${m.title} (${m.period})`);
    lines.push(m.body);
    lines.push(``);
  }

  lines.push(`## ${T.hackathons}`);
  lines.push(``);
  for (const h of hackathons) {
    const award = h.award ? `${h.award}, ${h.metric}` : h.metric;
    lines.push(`### ${h.name}, ${h.hackathon} (${h.year})`);
    lines.push(`${h.description}`);
    lines.push(`- ${T.result}: ${award}`);
    lines.push(`- ${T.tech}: ${h.technologies.join(", ")}`);
    lines.push(`- ${T.link}: ${h.link}`);
    lines.push(``);
  }

  lines.push(`## ${T.workWithMe}`);
  lines.push(``);
  lines.push(workingStyle);
  lines.push(``);
  lines.push(`### ${T.engagementTypes}`);
  for (const e of engagements) {
    lines.push(`- ${e.title}: ${e.detail}`);
  }
  lines.push(``);
  lines.push(`### ${T.goodFit}`);
  for (const g of goodFit) lines.push(`- ${g}`);
  lines.push(``);
  lines.push(`### ${T.notFit}`);
  for (const n of notAFit) lines.push(`- ${n}`);
  lines.push(``);
  lines.push(`### ${T.booking}`);
  lines.push(`${SITE.booking.line} ${SITE.booking.url}`);
  lines.push(`${NOTES.projectReviewIntake}: ${SITE.url}/project-review/`);
  lines.push(``);

  lines.push(`## ${T.contact}`);
  lines.push(...identityLines());
  lines.push(...socialLines());
  lines.push(``);

  lines.push(`## ${T.agentPreferences}`);
  lines.push(`- ${T.training}: ${AGENT_PREFERENCES.aiTrain === "no" ? T.disallowed : T.allowed}`);
  lines.push(`- ${T.inference}: ${T.allowed}`);
  lines.push(`- ${T.searchIndexing}: ${T.allowed}`);
  lines.push(``);
  lines.push(`---`);
  lines.push(T.machineEndpoints);
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
    `## ${T.pages}`,
    ...CANONICAL_ROUTES.map((r) => `- [${r.path}](${r.path}): ${r.purpose}`),
    ``,
    `## ${T.agentResources}`,
    ...AGENT_ENDPOINTS.map((e) => `- ${e.path}: ${e.purpose}`),
    ``,
  ];
  return lines.join("\n");
}

export function renderAboutMd(): string {
  const lines: string[] = [`# ${T.aboutPrefix} ${SITE.name}`, ``];
  for (const para of SITE.bio) {
    lines.push(para);
    lines.push(``);
  }
  lines.push(`## ${T.verifiedNumbers}`);
  lines.push(...proofLines());
  lines.push(``);
  lines.push(`## ${T.links}`);
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
  return projectsPageMd(`${T.systemsPrefix}, ${SITE.name}`, productProjects);
}

export function renderOpenSourceMd(): string {
  return projectsPageMd(`${T.openSourcePrefix}, ${SITE.name}`, openSourceProjects);
}

export function renderWritingMd(): string {
  const lines: string[] = [
    `# ${T.writingPrefix}, ${SITE.name}`,
    ``,
    NOTES.writingIntro,
    ``,
    ...writingThemedMd(),
  ];
  return lines.join("\n");
}

export function renderContactMd(): string {
  const lines: string[] = [
    `# ${T.workWithMe} ${SITE.name}`,
    ``,
    workingStyle,
    ``,
    `## ${T.engagementTypes}`,
  ];
  for (const e of engagements) {
    lines.push(`- ${e.title}: ${e.detail}`);
  }
  lines.push(``);
  lines.push(`## ${T.goodFit}`);
  for (const g of goodFit) lines.push(`- ${g}`);
  lines.push(``);
  lines.push(`## ${T.notFit}`);
  for (const n of notAFit) lines.push(`- ${n}`);
  lines.push(``);
  lines.push(`## ${T.booking}`);
  lines.push(`${SITE.booking.line}`);
  lines.push(`- ${T.call}: ${SITE.booking.url}`);
  lines.push(`- ${T.projectReviewIntake}: ${SITE.url}/project-review/`);
  lines.push(``);
  lines.push(`## ${T.links}`);
  lines.push(...identityLines());
  lines.push(...socialLines());
  lines.push(``);
  return lines.join("\n");
}

export function renderTimelineMd(): string {
  const lines: string[] = [`# ${T.timelinePrefix}, ${SITE.name}`, ``];
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
  const lines: string[] = [`# ${T.hackathonsPrefix}, ${SITE.name}`, ``];
  for (const h of hackathons) {
    const award = h.award ? `${h.award}, ${h.metric}` : h.metric;
    lines.push(`## ${h.name}, ${h.hackathon} (${h.year})`);
    lines.push(h.description);
    lines.push(``);
    lines.push(`- ${T.result}: ${award}`);
    lines.push(`- ${T.tech}: ${h.technologies.join(", ")}`);
    lines.push(`- ${T.link}: ${h.link}`);
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
    `# ${T.proofPrefix}, ${SITE.name}`,
    ``,
    `> ${NOTES.proofIntro}`,
    ``,
    `- ${T.totalCommits}: ${total}`,
    `- ${T.repositoriesOnMachine}: ${motionData.repoCount}`,
    `- ${T.span}: ${span}`,
    `- ${T.generated}: ${motionData.generated}`,
    ``,
    `## ${T.constellations}`,
    ...bands.map(
      (b) => `- ${b.label}: ${b.total.toLocaleString()} ${PAGE_COPY.motion.commits}, ${monthLabel(b.first)} to ${monthLabel(b.last)}. ${b.note}`,
    ),
    ``,
    `## ${T.eras}`,
    ...ERAS.map((e) => `- ${e.name} (${e.range}): ${e.caption}`),
    ``,
    `${T.fullHistory}: ${SITE.socials.github}`,
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
  lines.push(`## ${T.verifiedNumbers}`);
  lines.push(...proofLines());
  lines.push(``);
  lines.push(`${T.fullBioLinks}: ${SITE.url}/about/`);
  return lines.join("\n");
}

export function mcpProjectsMd(): string {
  const lines: string[] = [`# ${T.projectsPrefix}, ${SITE.name}`, ``];
  for (const p of projects) {
    lines.push(`- ${p.name} (${p.status}): ${p.thesis} ${linkList(p.links)}`);
  }
  lines.push(``);
  lines.push(`${T.fullRecords}: ${SITE.url}/api/projects.json`);
  return lines.join("\n");
}

export function mcpWritingMd(): string {
  const lines: string[] = [`# ${T.writingPrefix}, ${SITE.name}`, ``];
  for (const a of articles as Article[]) {
    lines.push(`- [${a.title}](${a.href}) (${a.read})`);
  }
  lines.push(``);
  lines.push(`${T.groupedByTheme}: ${SITE.url}/writing/  ${T.structured}: ${SITE.url}/api/writing.json`);
  return lines.join("\n");
}
