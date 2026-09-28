"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSiteContent } from "../content/SiteContentProvider";
import { deriveSiteContent, type SiteContent } from "../content/defaultContent";
import * as ko from "../utils/siteCopy.ko";
import {
  hasKoreanPage,
  localeFromPath,
  localizeHref,
  localizedPath,
  parseLocaleCookie,
  type Locale,
} from "../utils/locale";

type LocaleContextValue = {
  locale: Locale;
  /** Keep an internal href in the current language. */
  href: (href: string) => string;
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
// visitors get the same HTML. The EN/KR toggle also stores the choice in a
// cookie; the worker redirects full page loads to match it, and this provider
// catches any client-side navigation that lands on the other language.
export function LocaleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPath(pathname);
  const router = useRouter();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const preferred = parseLocaleCookie(document.cookie);
    if (!preferred || preferred === locale || !hasKoreanPage(pathname)) return;
    const target = localizedPath(pathname, preferred);
    router.replace(`${target}${window.location.search}${window.location.hash}`);
  }, [locale, pathname, router]);

  const href = useCallback((target: string) => localizeHref(target, locale), [locale]);
  const value = useMemo(() => ({ locale, href }), [locale, href]);

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
