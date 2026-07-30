import contentDates from "../utils/contentDates.json";
import {
  contentDiagnosticHeaders,
  getSiteContent,
} from "../content/repository";
import {
  DEFAULT_SITE_CONTENT,
  type SiteContent,
} from "../content/defaultContent";
import { canonicalizeContent } from "../content/validation";

export const dynamic = "force-static";

const BASE = "https://ariaxhan.com";
const dates = contentDates as Record<string, string>;
const DEFAULT_CANONICAL_CONTENT = canonicalizeContent(DEFAULT_SITE_CONTENT).content;
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

export async function GET() {
  const resolved = await getSiteContent();
  const pages = ROUTES.map((route) => ({
    url: `${BASE}${route}`,
    lastModified:
      routeChanged(route, resolved.siteContent) && resolved.updatedAt
        ? new Date(resolved.updatedAt)
        : new Date(dates[route]),
  }));
  const projectPages = resolved.content.projects.map((project) => ({
    url: `${BASE}/projects/${project.slug}/`,
    lastModified:
      projectChanged(project.slug, resolved.siteContent) && resolved.updatedAt
        ? new Date(resolved.updatedAt)
        : new Date(dates.projects),
  }));
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...[...pages, ...projectPages].map(
      (entry) =>
        `<url><loc>${escapeXml(entry.url)}</loc><lastmod>${entry.lastModified.toISOString()}</lastmod></url>`,
    ),
    "</urlset>",
  ].join("\n");
  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
      ...contentDiagnosticHeaders(resolved),
    },
  });
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function differs(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) !== JSON.stringify(right);
}

function routeChanged(route: string, content: SiteContent): boolean {
  const defaults = DEFAULT_CANONICAL_CONTENT;
  const pageCopy = content.PAGE_COPY;
  const defaultCopy = defaults.PAGE_COPY;
  const dependencies: Record<string, [unknown, unknown][]> = {
    "/": [
      [content.SITE, defaults.SITE],
      [content.engagements, defaults.engagements],
      [content.projects, defaults.projects],
      [content.articles, defaults.articles],
      [content.moments, defaults.moments],
      [pageCopy.hero, defaultCopy.hero],
      [pageCopy.manifesto, defaultCopy.manifesto],
      [pageCopy.thesis, defaultCopy.thesis],
      [pageCopy.sections.whatIBuild, defaultCopy.sections.whatIBuild],
      [pageCopy.sections.projectMap, defaultCopy.sections.projectMap],
      [pageCopy.sections.writingHighlights, defaultCopy.sections.writingHighlights],
      [pageCopy.sections.workWithMeDoor, defaultCopy.sections.workWithMeDoor],
      [pageCopy.now, defaultCopy.now],
      [pageCopy.metadata.home, defaultCopy.metadata.home],
    ],
    "/about/": [
      [pageCopy.about, defaultCopy.about],
      [pageCopy.metadata.about, defaultCopy.metadata.about],
    ],
    "/reading/": [
      [content.books, defaults.books],
      [pageCopy.sections.bookshelf, defaultCopy.sections.bookshelf],
      [pageCopy.metadata.reading, defaultCopy.metadata.reading],
    ],
    "/contact/": [
      [content.SITE.booking, defaults.SITE.booking],
      [content.contactLinks, defaults.contactLinks],
      [content.engagements, defaults.engagements],
      [content.goodFit, defaults.goodFit],
      [content.notAFit, defaults.notAFit],
      [content.workingStyle, defaults.workingStyle],
      [pageCopy.contact, defaultCopy.contact],
      [pageCopy.metadata.contact, defaultCopy.metadata.contact],
    ],
    "/hackathons/": [
      [content.hackathons, defaults.hackathons],
      [pageCopy.sections.hackathons, defaultCopy.sections.hackathons],
      [pageCopy.metadata.hackathons, defaultCopy.metadata.hackathons],
    ],
    "/open-source/": [
      [content.projects, defaults.projects],
      [pageCopy.sections.openSource, defaultCopy.sections.openSource],
      [pageCopy.metadata.openSource, defaultCopy.metadata.openSource],
    ],
    "/project-review/": [
      [content.projectReviewBullets, defaults.projectReviewBullets],
      [content.reviewDeliverables, defaults.reviewDeliverables],
      [content.reviewAudience, defaults.reviewAudience],
      [content.notForAudience, defaults.notForAudience],
      [pageCopy.projectReview, defaultCopy.projectReview],
      [pageCopy.projectReviewForm, defaultCopy.projectReviewForm],
      [pageCopy.metadata.projectReview, defaultCopy.metadata.projectReview],
    ],
    "/proof/": [
      [content.SITE.proof, defaults.SITE.proof],
      [pageCopy.proof, defaultCopy.proof],
      [pageCopy.metadata.proof, defaultCopy.metadata.proof],
    ],
    "/systems/": [
      [content.projects, defaults.projects],
      [pageCopy.sections.systems, defaultCopy.sections.systems],
      [pageCopy.metadata.systems, defaultCopy.metadata.systems],
    ],
    "/timeline/": [
      [content.moments, defaults.moments],
      [content.timelineTerminus, defaults.timelineTerminus],
      [pageCopy.sections.timeline, defaultCopy.sections.timeline],
      [pageCopy.metadata.timeline, defaultCopy.metadata.timeline],
    ],
    "/writing/": [
      [content.articles, defaults.articles],
      [content.WRITING_THEMES, defaults.WRITING_THEMES],
      [pageCopy.sections.writing, defaultCopy.sections.writing],
      [pageCopy.metadata.writing, defaultCopy.metadata.writing],
    ],
  };
  return (dependencies[route] ?? []).some(([current, baseline]) =>
    differs(current, baseline),
  );
}

function projectChanged(slug: string, content: SiteContent): boolean {
  return differs(
    content.projects.find((project) => project.slug === slug),
    DEFAULT_CANONICAL_CONTENT.projects.find((project) => project.slug === slug),
  );
}

