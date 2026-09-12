"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteContent } from "./defaultContent";

const SiteContentContext = createContext<SiteContent | null>(null);

export function SiteContentProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: ReactNode;
}) {
  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent(): SiteContent {
  const content = useContext(SiteContentContext);
  if (!content) throw new Error("SiteContentProvider is missing");
  return content;
}
