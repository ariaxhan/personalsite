import type { Metadata } from "next";
import * as ko from "./siteCopy.ko";
import { pageMeta } from "./pageMeta";

type MetaKey = Exclude<keyof typeof ko.PAGE_COPY.metadata, "home">;

/** Korean <head> for a /ko/ route: Korean title and description, ko canonical, hreflang pair. */
export function koPageMeta(key: MetaKey | "home"): Metadata {
  if (key === "home") {
    return pageMeta(
      { title: `${ko.SITE.role} | ${ko.SITE.name}`, ogTitle: `${ko.SITE.name}, ${ko.SITE.role}`, description: ko.SITE.tldr, path: "/" },
      undefined,
      "ko",
    );
  }
  return pageMeta({ ...ko.PAGE_COPY.metadata[key] }, undefined, "ko");
}

export function koProjectMeta(slug: string): Metadata {
  const project = ko.projects.find((entry) => entry.slug === slug);
  if (!project) return {};
  return pageMeta(
    {
      title: `${project.name} | ${ko.SITE.name}`,
      description: `${project.thesis} ${project.stack}`.slice(0, 300),
      path: `/projects/${slug}/`,
      type: "article",
    },
    undefined,
    "ko",
  );
}
