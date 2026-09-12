export type Locale = "en" | "ko";

export const KO_PREFIX = "/ko";

export function localeFromPath(pathname: string): Locale {
  return pathname === KO_PREFIX || pathname.startsWith(`${KO_PREFIX}/`) ? "ko" : "en";
}

/** The same page in the other language. Paths keep their trailing slash. */
export function localizedPath(pathname: string, locale: Locale): string {
  const base = localeFromPath(pathname) === "ko" ? pathname.slice(KO_PREFIX.length) || "/" : pathname;
  return locale === "ko" ? `${KO_PREFIX}${base}` : base;
}
