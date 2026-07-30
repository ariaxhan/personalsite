import {
  SITE,
  THEME_LABELS,
  projects,
  deskObjects,
  books,
  obsessions,
  topics,
  topicEdges,
  mapDefaultBlurb,
  moments,
  timelineTerminus,
  hackathons,
  CONTACT_EMAIL,
  contactLinks,
  projectReviewBullets,
  reviewDeliverables,
  reviewAudience,
  notForAudience,
  engagements,
  goodFit,
  notAFit,
  workingStyle,
  WRITING_THEMES,
  articles,
  MEDIUM_PROFILE,
  PAGE_COPY,
} from "../utils/siteCopy";

export const CONTENT_PAGE_KEY = "site";
export const CONTENT_SCHEMA_VERSION = 1;

export const DEFAULT_SITE_CONTENT = {
  SITE,
  THEME_LABELS,
  projects,
  deskObjects,
  books,
  obsessions,
  topics,
  topicEdges,
  mapDefaultBlurb,
  moments,
  timelineTerminus,
  hackathons,
  CONTACT_EMAIL,
  contactLinks,
  projectReviewBullets,
  reviewDeliverables,
  reviewAudience,
  notForAudience,
  engagements,
  goodFit,
  notAFit,
  workingStyle,
  WRITING_THEMES,
  articles,
  MEDIUM_PROFILE,
  PAGE_COPY,
};

export type SiteContent = typeof DEFAULT_SITE_CONTENT;

export function deriveSiteContent(content: SiteContent) {
  const projectBySlug = (slug: string) => content.projects.find((project) => project.slug === slug);
  return {
    ...content,
    proofStats: Object.values(content.SITE.proof),
    productProjects: content.projects.filter(
      (project) => project.kind === "product" || project.kind === "company",
    ),
    openSourceProjects: content.projects.filter(
      (project) => project.kind === "open-source" || project.kind === "research",
    ),
    projectBySlug,
    articlesByTheme: (theme: (typeof content.articles)[number]["theme"]) =>
      content.articles.filter((article) => article.theme === theme),
  };
}

export type DerivedSiteContent = ReturnType<typeof deriveSiteContent>;
