// ============================================================================
// WALL ITEMS
// Adapter from the unified Project records to the WallItem shape the studio
// WorkshopWall renders. Shared by the Systems and Open Source rooms so both
// build their cards, evidence rows, and cross-project links the same way.
// ============================================================================

import type { WallItem } from "../components/WorkshopWall";
import { copyFor, type Locale } from "./locale";
import type { Project } from "./projectsData";

const kindTag: Record<Locale, Record<Project["kind"], string>> = {
  en: {
    product: "Product",
    company: "Company",
    "open-source": "Open Source",
    research: "Research",
  },
  ko: {
    product: "프로덕트",
    company: "회사",
    "open-source": "오픈소스",
    research: "연구",
  },
};

export function projectToWallItem(
  p: Project,
  locale: Locale,
  themeLabels: Record<string, string>,
  find: (slug: string) => Project | undefined
): WallItem {
  return {
    slug: p.slug,
    title: p.name,
    tag: kindTag[locale][p.kind],
    accent: p.accent,
    thesis: p.thesis,
    status: p.status,
    body: p.built,
    meta: p.meta,
    links: p.links,
    image: p.plate,
    imageFit: p.plateFit,
    images: p.gallery,
    logo: p.logo,
    video: p.video,
    poster: p.poster,
    problem: p.problem,
    proofLine: p.proof,
    learned: p.learned,
    proves: p.proves,
    stackLine: p.stack,
    themes: p.themes.map((t) => themeLabels[t]),
    connections: p.connections
      .map((slug) => find(slug))
      .filter((c): c is Project => Boolean(c))
      .map((c) => ({ label: c.name, href: `/projects/${c.slug}/` })),
    closing: p.closing,
  };
}

export function projectsToWallItems(list: Project[], locale: Locale): WallItem[] {
  const { THEME_LABELS, projectBySlug } = copyFor(locale);
  return list.map((p) => projectToWallItem(p, locale, THEME_LABELS, projectBySlug));
}
