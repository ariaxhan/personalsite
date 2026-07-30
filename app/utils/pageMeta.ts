// ============================================================================
// PAGE META
// One builder for every route's <head>. Next merges metadata shallowly, so a
// page that redefines openGraph loses the layout's images unless it restates
// them. This helper restates the shared bits (canonical, OG image, twitter
// card) so every page inherits a complete, non-drifting head from the data
// layer. Paths must be absolute and end with a trailing slash ("/" for home).
// No em dashes.
// ============================================================================

import type { Metadata } from "next";
import { SITE as DEFAULT_SITE } from "./siteMeta";

/** Shared Open Graph image. Rasterized to /og.png at build by scripts/generate-og.mjs. */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${DEFAULT_SITE.name}, ${DEFAULT_SITE.role}`,
};

export function pageMeta(opts: {
  /** Full <title> string. */
  title: string;
  /** Open Graph and Twitter title. Defaults to title. */
  ogTitle?: string;
  description: string;
  /** Canonical path, trailing slash required ("/" for home). */
  path: string;
  type?: "website" | "article" | "profile";
}, site: typeof DEFAULT_SITE = DEFAULT_SITE): Metadata {
  const ogTitle = opts.ogTitle ?? opts.title;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: ogTitle,
      description: opts.description,
      url: opts.path,
      type: opts.type ?? "website",
      siteName: site.name,
      locale: "en_US",
      images: [{ ...OG_IMAGE, alt: `${site.name}, ${site.role}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: opts.description,
      images: ["/og.png"],
    },
  };
}
