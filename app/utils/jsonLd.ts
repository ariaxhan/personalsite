// ============================================================================
// JSON-LD
// Structured data generated from the same data layer the pages read, so the
// schema.org graph can never drift from what a human sees. Every builder
// returns a plain object; the JsonLd server component serializes it. No em
// dashes.
// ============================================================================

import type { Project } from "./projectsData";
import type { DerivedSiteContent } from "../content/defaultContent";

/** Aria as a schema.org Person. Reused across home and contact. */
export function personSchema(content: DerivedSiteContent) {
  const { SITE } = content;
  const personId = `${SITE.url}/#person`;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
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
export function professionalServiceSchema(content: DerivedSiteContent) {
  const { SITE } = content;
  const personId = `${SITE.url}/#person`;
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
    // ProfessionalService inherits from LocalBusiness, not Service, so
    // `provider` and `availableChannel` are not valid here. Google's validator
    // flagged both as UNKNOWN_FIELD on 2026-07-29. founder/email/address are.
    founder: { "@id": personId },
    email: `mailto:${SITE.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Los Angeles" },
      { "@type": "Country", name: "United States" },
    ],
    potentialAction: {
      "@type": "ScheduleAction",
      name: "Book a short call",
      target: SITE.booking.url,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engagements",
      itemListElement: SITE.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s, provider: { "@id": personId } },
      })),
    },
  };
}

/** /about/ carried no structured data at all. This types it as a profile page. */
export function profilePageSchema(content: DerivedSiteContent) {
  const { SITE } = content;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE.url}/about/`,
    name: `About ${SITE.name}`,
    mainEntity: { "@id": `${SITE.url}/#person` },
  };
}

/** Breadcrumbs for any non-home page. */
export function breadcrumbSchema(
  content: DerivedSiteContent,
  trail: { name: string; path: string }[],
) {
  const { SITE } = content;
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
export function webSiteSchema(content: DerivedSiteContent) {
  const { SITE } = content;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    author: { "@id": `${SITE.url}/#person` },
  };
}

/** Contact-page Person: adds a ContactPoint and the booking action. */
export function contactSchema(content: DerivedSiteContent) {
  const { SITE } = content;
  return {
    ...personSchema(content),
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
export function projectSchema(content: DerivedSiteContent, p: Project) {
  const { SITE } = content;
  const isSoftware = p.kind === "open-source" || p.kind === "product";
  return {
    "@context": "https://schema.org",
    "@type": isSoftware ? "SoftwareApplication" : "CreativeWork",
    name: p.name,
    url: `${SITE.url}/projects/${p.slug}/`,
    description: p.thesis,
    abstract: p.problem,
    author: { "@id": `${SITE.url}/#person` },
    creator: { "@id": `${SITE.url}/#person` },
    ...(isSoftware
      ? { applicationCategory: "DeveloperApplication", operatingSystem: "Any" }
      : {}),
    ...(p.meta.license ? { license: p.meta.license } : {}),
    sameAs: p.links.map((l) => l.href),
  };
}

/** An ItemList of projects. url falls back to the on-site anchor. */
export function projectListSchema(content: DerivedSiteContent, projects: Project[]) {
  const { SITE } = content;
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
export function articleListSchema(content: DerivedSiteContent) {
  const { SITE, articles } = content;
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
