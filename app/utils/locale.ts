export type Locale = "en" | "ko";

export const KO_PREFIX = "/ko";

/** Cookie holding the visitor's explicit language choice (set by the EN/KR toggle). */
export const LOCALE_COOKIE = "locale";
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// English sections that have a /ko mirror under app/ko. Anything else
// (editor, api, machine files) exists in English only.
const KO_SECTIONS = [
  "about",
  "ai-consulting-korean-companies",
  "contact",
  "hackathons",
  "open-source",
  "project-review",
  "projects",
  "proof",
  "reading",
  "systems",
  "timeline",
  "writing",
];

export function localeFromPath(pathname: string): Locale {
  return pathname === KO_PREFIX || pathname.startsWith(`${KO_PREFIX}/`) ? "ko" : "en";
}

/** The same page in the other language. Paths keep their trailing slash. */
export function localizedPath(pathname: string, locale: Locale): string {
  const base = localeFromPath(pathname) === "ko" ? pathname.slice(KO_PREFIX.length) || "/" : pathname;
  return locale === "ko" ? `${KO_PREFIX}${base}` : base;
}

/** True when an English site path has a Korean page. */
export function hasKoreanPage(pathname: string): boolean {
  const base = localizedPath(pathname, "en");
  if (base === "/" || base === "") return true;
  const section = base.split("/")[1] ?? "";
  return KO_SECTIONS.includes(section);
}

/**
 * Localize an href for the current locale. External URLs, anchors, and
 * English-only paths pass through untouched.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const match = /^([^?#]*)(.*)$/.exec(href);
  const path = match?.[1] ?? href;
  const rest = match?.[2] ?? "";
  if (!hasKoreanPage(path)) return href;
  return `${localizedPath(path, locale)}${rest}`;
}

export function parseLocaleCookie(cookieHeader: string | null | undefined): Locale | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const [name, value] = part.trim().split("=");
    if (name === LOCALE_COOKIE && (value === "en" || value === "ko")) return value;
  }
  return null;
}

export function writeLocaleCookie(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}

/**
 * Where a full page load should go to honor the saved language, or null.
 * Only browser document navigations are redirected: RSC fetches, prefetches,
 * and crawlers (no cookie) always get the URL they asked for.
 */
export function preferredLocaleRedirect(request: Request, url: URL): string | null {
  if (request.method !== "GET") return null;
  if (!(request.headers.get("accept") ?? "").includes("text/html")) return null;
  if (request.headers.has("rsc") || request.headers.has("next-router-prefetch")) return null;
  if (url.searchParams.has("edit")) return null;
  const preferred = parseLocaleCookie(request.headers.get("cookie"));
  if (!preferred || preferred === localeFromPath(url.pathname)) return null;
  if (!hasKoreanPage(url.pathname)) return null;
  return `${localizedPath(url.pathname, preferred)}${url.search}`;
}
