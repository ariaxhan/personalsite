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
    // "ariaxhan" is the identifier Instagram, Devpost, GitHub, Hugging Face and
    // PyPI all rank for, and it appeared nowhere a search engine reads as
    // content. Claiming it here is what consolidates those profiles onto this
    // domain. Measured 2026-07-28, see the discoverability audit.
    alternateName: [SITE.handle, "aria x han"],
    knowsAbout: [
      "AI implementation",
      "AI agents",
      "workflow automation",
      "retrieval augmented generation",
      "LLM evaluation",
      "agent memory systems",
      "Model Context Protocol",
    ],
    sameAs: [
      SITE.socials.github,
      SITE.socials.medium,
      SITE.socials.linkedin,
      SITE.socials.x,
      SITE.socials.pypi,
      SITE.socials.devpost,
      SITE.socials.huggingface,
    ],
  };
}

/**
 * The practice as something a buyer can engage. The graph previously said only
 * that a person exists and has published things, never that services are for
 * sale, which is the statement search and answer engines look for when building
 * a shortlist of consultants. Emitted on / and /contact/.
 */
export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#practice`,
    name: `${SITE.name}, AI consulting`,
    description:
      "Design, build and ship production AI systems: agent workflows, automation, " +
      "memory and context infrastructure, and custom AI software.",
    url: SITE.url,
    image: `${SITE.url}/og.png`,
    provider: { "@id": PERSON_ID },
    founder: { "@id": PERSON_ID },
    areaServed: [
      { "@type": "City", name: "Los Angeles" },
      { "@type": "Country", name: "United States" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE.url}/contact/`,
      availableLanguage: "en",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engagements",
      itemListElement: SITE.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s, provider: { "@id": PERSON_ID } },
      })),
    },
  };
}

/** /about/ carried no structured data at all. This types it as a profile page. */
export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE.url}/about/`,
    name: `About ${SITE.name}`,
    mainEntity: { "@id": PERSON_ID },
  };
}

/** Breadcrumbs for any non-home page. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.path}`,
    })),
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

/** One project as a CreativeWork, for its own detail page. */
export function projectSchema(p: Project) {
  const isSoftware = p.kind === "open-source" || p.kind === "product";
  return {
    "@context": "https://schema.org",
    "@type": isSoftware ? "SoftwareApplication" : "CreativeWork",
    name: p.name,
    url: `${SITE.url}/projects/${p.slug}/`,
    description: p.thesis,
    abstract: p.problem,
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    ...(isSoftware
      ? { applicationCategory: "DeveloperApplication", operatingSystem: "Any" }
      : {}),
    ...(p.meta.license ? { license: p.meta.license } : {}),
    sameAs: p.links.map((l) => l.href),
  };
}

/** An ItemList of projects. url falls back to the on-site anchor. */
export function projectListSchema(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.name,
        // Point at the on-site detail page, not the external repo. The list
        // used to hand its authority straight to github.com.
        url: `${SITE.url}/projects/${p.slug}/`,
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
