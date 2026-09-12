import type { DerivedSiteContent } from "./defaultContent";
import {
  contentDiagnosticHeaders,
  type ResolvedSiteContent,
} from "./repository";

const lines = (...parts: Array<string | false | null | undefined>) =>
  parts.filter((part): part is string => typeof part === "string" && part.length > 0).join("\n\n");

const projectMarkdown = (content: DerivedSiteContent, kind?: "systems" | "open-source") => {
  const projects =
    kind === "systems"
      ? content.productProjects
      : kind === "open-source"
        ? content.openSourceProjects
        : content.projects;
  return projects
    .map(
      (project) =>
        `## ${project.name}\n\n${project.thesis}\n\n${project.problem}\n\n${project.built.join(
          "\n\n",
        )}\n\nProof: ${project.proof}\n\nStack: ${project.stack}`,
    )
    .join("\n\n");
};

export function renderHomeMd(content: DerivedSiteContent): string {
  return lines(
    `# ${content.SITE.oneLiner}`,
    content.SITE.strangeLine,
    content.SITE.tldr,
    `## What I build\n\n${content.engagements
      .map((engagement) => `- **${engagement.title}:** ${engagement.detail}`)
      .join("\n")}`,
    `## Selected work\n\n${projectMarkdown(content)}`,
  );
}

export function renderAboutMd(content: DerivedSiteContent): string {
  const copy = content.PAGE_COPY.about;
  return lines(
    `# ${copy.title}`,
    copy.subtitle,
    ...copy.narrative,
    ...copy.pulls,
    ...copy.narrative2,
    `## ${copy.focusLabel}\n\n${copy.focus
      .map((item) => `- **${item.name}:** ${item.text}`)
      .join("\n")}`,
  );
}

export function renderSystemsMd(content: DerivedSiteContent): string {
  return `# ${content.PAGE_COPY.sections.systems.title}\n\n${projectMarkdown(content, "systems")}`;
}

export function renderOpenSourceMd(content: DerivedSiteContent): string {
  return `# ${content.PAGE_COPY.sections.openSource.title}\n\n${projectMarkdown(
    content,
    "open-source",
  )}`;
}

export function renderWritingMd(content: DerivedSiteContent): string {
  return lines(
    `# ${content.PAGE_COPY.sections.writing.title}`,
    content.articles
      .map(
        (article) =>
          `## [${article.title}](${article.href})\n\n${article.excerpt}\n\n${article.read}`,
      )
      .join("\n\n"),
  );
}

export function renderContactMd(content: DerivedSiteContent): string {
  return lines(
    `# ${content.PAGE_COPY.contact.title}`,
    content.PAGE_COPY.contact.intro,
    content.engagements
      .map((engagement) => `## ${engagement.title}\n\n${engagement.detail}`)
      .join("\n\n"),
    `Email: ${content.SITE.email}`,
    `Book: ${content.SITE.booking.url}`,
  );
}

export function renderTimelineMd(content: DerivedSiteContent): string {
  return lines(
    `# ${content.PAGE_COPY.sections.timeline.title}`,
    content.moments
      .map((moment) => `## ${moment.year}: ${moment.title}\n\n${moment.body}`)
      .join("\n\n"),
  );
}

export function renderHackathonsMd(content: DerivedSiteContent): string {
  return lines(
    `# ${content.PAGE_COPY.sections.hackathons.title}`,
    content.hackathons
      .map(
        (entry) =>
          `## [${entry.name}](${entry.link})\n\n${entry.metric}. ${entry.description}\n\n${entry.technologies.join(", ")}`,
      )
      .join("\n\n"),
  );
}

export function renderProofMd(content: DerivedSiteContent): string {
  return lines(
    `# ${content.PAGE_COPY.proof.header.title}`,
    content.PAGE_COPY.proof.paragraph1Start,
    content.proofStats
      .map((stat) => `- ${stat.label}: ${stat.value}. Source: ${stat.source}`)
      .join("\n"),
  );
}

export function renderLlmsTxt(content: DerivedSiteContent): string {
  return lines(
    `# ${content.SITE.name}`,
    content.SITE.tldr,
    `Canonical site: ${content.SITE.url}`,
    `Projects: ${content.SITE.url}/api/projects.json`,
    `Writing: ${content.SITE.url}/api/writing.json`,
    `Full context: ${content.SITE.url}/llms-full.txt`,
  );
}

export function renderLlmsFullTxt(content: DerivedSiteContent): string {
  return lines(
    renderLlmsTxt(content),
    renderHomeMd(content),
    renderAboutMd(content),
    renderWritingMd(content),
    renderContactMd(content),
  );
}

export function siteIndexJson(content: DerivedSiteContent) {
  return {
    person: content.SITE,
    routes: content.PAGE_COPY.agentText.canonicalRoutes,
    endpoints: content.PAGE_COPY.agentText.endpoints,
  };
}

export function projectsJson(content: DerivedSiteContent) {
  return content.projects;
}

export function writingJson(content: DerivedSiteContent) {
  return { themes: content.WRITING_THEMES, articles: content.articles };
}

export function workWithMeJson(content: DerivedSiteContent) {
  return {
    engagements: content.engagements,
    goodFit: content.goodFit,
    notAFit: content.notAFit,
    workingStyle: content.workingStyle,
    booking: content.SITE.booking,
    email: content.SITE.email,
  };
}

export function jsonResponse(
  data: unknown,
  resolved: Pick<ResolvedSiteContent, "revisionId" | "publicationId" | "source">,
): Response {
  return Response.json(data, {
    headers: {
      "cache-control": "public, max-age=0, must-revalidate",
      ...contentDiagnosticHeaders(resolved),
    },
  });
}

export function markdownResponse(
  markdown: string,
  resolved: Pick<ResolvedSiteContent, "revisionId" | "publicationId" | "source">,
): Response {
  return new Response(markdown, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
      ...contentDiagnosticHeaders(resolved),
    },
  });
}
