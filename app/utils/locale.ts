import * as en from "./siteCopy";
import * as ko from "./siteCopy.ko";

export type Locale = "en" | "ko";

export const LOCALE_KEY = "site-locale";

export function copyFor(locale: Locale) {
  return locale === "ko" ? ko : en;
}
