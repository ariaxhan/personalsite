// ============================================================================
// WALL ITEMS
// Adapter from the unified Project records to the WallItem shape the studio
// WorkshopWall renders. Shared by the Systems and Open Source rooms so both
// build their cards, evidence rows, and cross-project links the same way.
// ============================================================================

import type { WallItem } from "../components/WorkshopWall";
import { projectBySlug, THEME_LABELS, type Project } from "./projectsData";

const kindTag: Record<Project["kind"], string> = {
  product: "Product",
  company: "Company",
  "open-source": "Open Source",
  research: "Research",
};


export function projectToWallItem(p: Project): WallItem {
  return {
    slug: p.slug,
    title: p.name,
    tag: kindTag[p.kind],
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
    themes: p.themes.map((t) => THEME_LABELS[t]),
    connections: p.connections
      .map((slug) => projectBySlug(slug))
      .filter((c): c is Project => Boolean(c))
      .map((c) => ({ label: c.name, href: `/projects/${c.slug}/` })),
    closing: p.closing,
  };
}

export function projectsToWallItems(list: Project[]): WallItem[] {
  return list.map(projectToWallItem);
}
