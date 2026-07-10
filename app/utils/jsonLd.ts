// ============================================================================
// JSON-LD
// Structured data generated from the same data layer the pages read, so the
// schema.org graph can never drift from what a human sees. Every builder
// returns a plain object; the JsonLd server component serializes it. No em
// dashes.
// ============================================================================

import { SITE } from "./siteMeta";
import type { Project } from "./projectsData";
import { articles } from "./writingData";

const PERSON_ID = `${SITE.url}/#person`;

/** Aria as a schema.org Person. Reused across home and contact. */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.name,
    jobTitle: SITE.role,
    description: SITE.tldr,
    url: SITE.url,
    email: `mailto:${SITE.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      addressCountry: "US",
    },
    sameAs: [
      SITE.socials.github,
      SITE.socials.medium,
      SITE.socials.linkedin,
      SITE.socials.x,
    ],
  };
}

/** The site itself. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    author: { "@id": PERSON_ID },
  };
}

/** Contact-page Person: adds a ContactPoint and the booking action. */
export function contactSchema() {
  return {
    ...personSchema(),
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE.email,
      contactType: "business inquiries",
      url: `${SITE.url}/contact/`,
    },
    potentialAction: {
      "@type": "ScheduleAction",
      name: "Book a short call",
      target: SITE.booking.url,
    },
  };
}

/** An ItemList of projects. url falls back to the on-site anchor. */
export function projectListSchema(projects: Project[], basePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.name,
        url: p.links[0]?.href ?? `${SITE.url}${basePath}#${p.slug}`,
        description: p.thesis,
      },
    })),
  };
}

/** An ItemList of Articles, authored by Aria, linked on Medium. */
export function articleListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: articles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Article",
        headline: a.title,
        description: a.excerpt,
        url: a.href,
        author: { "@type": "Person", name: SITE.name, url: SITE.url },
      },
    })),
  };
}
