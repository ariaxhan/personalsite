"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { copyFor, LOCALE_KEY, type Locale } from "../utils/locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

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
  return { ...copyFor(ctx.locale), ...ctx };
}
