import {
  DEFAULT_SITE_CONTENT,
  type SiteContent,
} from "./defaultContent";
import { canonicalizeContent } from "./validation";

export const SITEMAP_STATIC_ROUTES = [
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
] as const;

const DEFAULT_CANONICAL_CONTENT =
  canonicalizeContent(DEFAULT_SITE_CONTENT).content;

export type PublicationSnapshot = {
  publicationId: string;
  publishedAt: string;
  content: SiteContent;
};

export function sitemapRoutes(content: SiteContent): string[] {
  return [
    ...SITEMAP_STATIC_ROUTES,
    ...content.projects.map((project) => `/projects/${project.slug}/`),
  ];
}

export function calculateSignificantChangeDates(
  snapshots: PublicationSnapshot[],
  currentPublicationId: string,
  currentContent: SiteContent,
  baselineDates: Record<string, string>,
): Map<string, string> {
  const routes = sitemapRoutes(currentContent);
  const result = new Map(
    routes.map((route) => [route, baselineDate(route, baselineDates)]),
  );
  let previous = DEFAULT_CANONICAL_CONTENT;
  let foundCurrent = false;

  for (const snapshot of snapshots) {
    for (const route of routes) {
      if (routeSignature(route, previous) !== routeSignature(route, snapshot.content)) {
        result.set(route, snapshot.publishedAt);
      }
    }
    previous = snapshot.content;
    if (snapshot.publicationId === currentPublicationId) {
      foundCurrent = true;
      break;
    }
  }

  if (!foundCurrent) {
    throw new Error("canonical publication is absent from sitemap history");
  }
  return result;
}

function baselineDate(
  route: string,
  baselineDates: Record<string, string>,
): string {
  if (route.startsWith("/projects/")) return baselineDates.projects;
  const date = baselineDates[route];
  if (!date) throw new Error(`missing baseline sitemap date for ${route}`);
  return date;
}

function routeSignature(route: string, content: SiteContent): string {
  const pageCopy = content.PAGE_COPY;
  const productProjects = content.projects.filter(
    (project) => project.kind === "product" || project.kind === "company",
  );
  const openSourceProjects = content.projects.filter(
    (project) =>
      project.kind === "open-source" || project.kind === "research",
  );
  const projectReferenceLabels = content.projects.map((project) => ({
    slug: project.slug,
    name: project.name,
  }));
  if (route.startsWith("/projects/")) {
    const slug = route.split("/").filter(Boolean).at(-1);
    return JSON.stringify(
      content.projects.find((project) => project.slug === slug) ?? null,
    );
  }

  const dependencies: Record<string, unknown[]> = {
    "/": [
      content.SITE,
      content.engagements,
      content.projects,
      content.articles,
      content.moments,
      pageCopy.hero,
      pageCopy.manifesto,
      pageCopy.thesis,
      pageCopy.sections.whatIBuild,
      pageCopy.sections.projectMap,
      pageCopy.sections.writingHighlights,
      pageCopy.sections.workWithMeDoor,
      pageCopy.now,
      pageCopy.metadata.home,
    ],
    "/about/": [
      content.SITE,
      content.topics,
      content.topicEdges,
      content.mapDefaultBlurb,
      content.obsessions,
      pageCopy.about,
      pageCopy.sections.curiosityMap,
      pageCopy.sections.obsessions,
      pageCopy.metadata.about,
      pageCopy.footer,
    ],
    "/reading/": [
      content.books,
      pageCopy.sections.bookshelf,
      pageCopy.metadata.reading,
    ],
    "/contact/": [
      content.SITE.booking,
      content.contactLinks,
      content.engagements,
      content.goodFit,
      content.notAFit,
      content.workingStyle,
      pageCopy.contact,
      pageCopy.metadata.contact,
    ],
    "/hackathons/": [
      content.hackathons,
      pageCopy.sections.hackathons,
      pageCopy.metadata.hackathons,
    ],
    "/open-source/": [
      content.SITE,
      openSourceProjects,
      projectReferenceLabels,
      content.THEME_LABELS,
      pageCopy.sections.openSource,
      pageCopy.metadata.openSource,
      pageCopy.workshopWall,
      pageCopy.modal,
      pageCopy.footer,
    ],
    "/project-review/": [
      content.projectReviewBullets,
      content.reviewDeliverables,
      content.reviewAudience,
      content.notForAudience,
      pageCopy.projectReview,
      pageCopy.projectReviewForm,
      pageCopy.metadata.projectReview,
    ],
    "/proof/": [
      content.SITE.proof,
      pageCopy.proof,
      pageCopy.metadata.proof,
    ],
    "/systems/": [
      content.SITE,
      productProjects,
      projectReferenceLabels,
      content.THEME_LABELS,
      pageCopy.sections.systems,
      pageCopy.metadata.systems,
      pageCopy.workshopWall,
      pageCopy.modal,
      pageCopy.footer,
    ],
    "/timeline/": [
      content.moments,
      content.timelineTerminus,
      pageCopy.sections.timeline,
      pageCopy.metadata.timeline,
    ],
    "/writing/": [
      content.articles,
      content.WRITING_THEMES,
      pageCopy.sections.writing,
      pageCopy.metadata.writing,
    ],
  };
  return JSON.stringify(dependencies[route] ?? []);
}
