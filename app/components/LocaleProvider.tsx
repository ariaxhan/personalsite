"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useSiteContent } from "../content/SiteContentProvider";
import { deriveSiteContent, type SiteContent } from "../content/defaultContent";
import * as ko from "../utils/siteCopy.ko";
import { LOCALE_KEY, type Locale } from "../utils/locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
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

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored: Locale = localStorage.getItem(LOCALE_KEY) === "ko" ? "ko" : "en";
    setLocaleState(stored);
    document.documentElement.lang = stored;
  }, []);

  const setLocale = (next: Locale) => {
    localStorage.setItem(LOCALE_KEY, next);
    document.documentElement.lang = next;
    setLocaleState(next);
  };

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

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
