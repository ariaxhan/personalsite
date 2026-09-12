"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useSiteContent } from "../content/SiteContentProvider";
import { deriveSiteContent, type SiteContent } from "../content/defaultContent";
import * as ko from "../utils/siteCopy.ko";
import { localeFromPath, type Locale } from "../utils/locale";

type LocaleContextValue = {
  locale: Locale;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const KO = ko as unknown as SiteContent;

// English is the published CMS content. Korean is the static parallel copy;
// projects and articles added after it was drafted fall back to English.
function koreanContent(published: SiteContent) {
  const koProjects = new Map(KO.projects.map((project) => [project.slug, project]));
  const koArticles = new Map(KO.articles.map((article) => [article.href, article]));
  return deriveSiteContent({
    ...KO,
    projects: published.projects.map((project) => koProjects.get(project.slug) ?? project),
    articles: published.articles.map((article) => koArticles.get(article.href) ?? article),
  } as SiteContent);
}

// The URL is the locale: /ko/... renders Korean on the server, so crawlers and
// visitors get the same HTML.
export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = localeFromPath(usePathname() ?? "/");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useSiteCopy() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useSiteCopy requires LocaleProvider");
  }
  const published = useSiteContent();
  const content = useMemo(
    () => (ctx.locale === "ko" ? koreanContent(published) : deriveSiteContent(published)),
    [ctx.locale, published],
  );
  return { ...content, ...ctx };
}
