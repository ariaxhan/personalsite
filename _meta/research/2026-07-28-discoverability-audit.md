---
type: research
status: active
created: 2026-07-28
---

# ariaxhan.com discoverability and technical SEO audit

Date: 2026-07-28
Audited target: production (`https://ariaxhan.com`, Cloudflare Pages, `main @ 33a9280`, built 2026-07-14)
Method: every claim below is backed by a command that was run and its output. Nothing is inferred.

Tools used: `curl` (status codes, headers, per-UA fetches), Lighthouse 12.8.2 (desktop + mobile,
headless Chrome), Google's `validator.schema.org` API, live Google SERPs read through a real browser,
`dig`, the GitHub / PyPI / Devpost public APIs, and the repository source.

Tools attempted and unavailable, stated rather than guessed:
- **Search Console: not configured**, so no impressions/coverage data exists to read (this is finding C2).
- **PageSpeed Insights API / CrUX field data**: `Quota exceeded ... pagespeedonline.googleapis.com`
  without an API key. Lab data from local Lighthouse is used instead and labelled as lab data.
- **Rich Results Test** has no public API. Schema was validated against `validator.schema.org`
  (Google's own parser) instead, and rich-result *eligibility* is reasoned from schema type, not claimed.

---

## 1. Executive summary

The site is not broken and it is not invisible. Crawlability, canonicalisation, redirect hygiene,
structured-data validity and the machine/agent layer are all in better shape than most consulting
sites. **The observed problem is mostly a different problem than the one reported.**

**The reported premise is partly false, and this matters because it changes the fix.** Measured on
live Google today:

| Query | Position of ariaxhan.com |
|---|---|
| `ariaxhan` | **#1**, above Instagram, Devpost, GitHub, Medium, LinkedIn |
| `"aria han" ai` | **#1 with sitelinks** (Writing, Systems) |
| `site:ariaxhan.com` | 8 pages returned of 11 submitted |

PyPI does not appear for `ariaxhan` at all. Devpost and GitHub rank *below* the site. Branded search
is already working. Chasing it further is wasted effort.

The real failures are these:

1. **The positioning phrase is a job title, not a service.** Searching
   `ai implementation specialist los angeles` returns ZipRecruiter, LinkedIn Jobs, Indeed, Built In LA,
   Greenhouse and Jobright: **20 of 20 results are job listings.** Google has decided that phrase means
   "someone wants to be hired", and the entire site (title, H1 area, meta description, `jobTitle` in
   JSON-LD, llms.txt) is anchored to it. A consulting site cannot win a query whose intent is hiring.
2. **Nothing on the site says services are for sale, in a machine-readable way.** The schema graph is
   `Person` + `WebSite` + three `ItemList`s. There is no `Service`, `ProfessionalService`, `Offer`, or
   `Organization`. Search engines and AI answer engines have no structured statement that this is a
   business one can engage.
3. **Three of eleven pages are not in Google's index**, including `/open-source/`, which is the single
   strongest credibility asset on the site.
4. **No Search Console.** There is no telemetry, no way to submit a sitemap, no way to request
   indexing, and no visibility into any of the above. This is why the problem was diagnosed by
   guesswork in the first place.
5. **Roughly 15 deep project narratives have no URLs of their own.** They are rendered inside three
   list pages. The site's best content is structurally unindexable as individual results.
6. **Mobile LCP is 4.1s**, past the 4.0s "poor" threshold.

Fix order that actually moves the needle: verify Search Console → repoint keywords at buyer intent →
add service schema → give projects real URLs → fix mobile LCP.

---

## 2. What is already correct and must not be changed

Explicitly: do not "improve" any of this. It is right.

| Area | Evidence |
|---|---|
| Canonical tags | All 11 pages carry a correct self-referencing absolute canonical |
| Trailing-slash policy | `/about` → `308` → `/about/`. One URL per page, no duplicates |
| HTTPS | `http://ariaxhan.com/` → `301` → `https://`. Correct code |
| 404s | `/nonexistent-page-xyz` returns a real `404`, not a soft 200 |
| Crawler access | Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Applebot, DuckDuckBot, Twitterbot, LinkedInBot, Slackbot all get `200` |
| Structured-data validity | `validator.schema.org`: **0 errors on all 6 pages tested**, `isRendered: true` |
| Titles + descriptions | Present and unique on all 11 pages; descriptions 91 to 260 chars |
| Internal linking | Every page reachable from the homepage; `/contact/` linked 15 times |
| CLS | **0** on both desktop and mobile |
| TBT | 0ms desktop, 80ms mobile |
| JS/CSS efficiency | `unused-javascript`, `unused-css-rules`, `font-display`, `uses-text-compression` all score **1.00** |
| The whole agent layer | `llms.txt`, `llms-full.txt`, `/index.md`, `Accept: text/markdown` negotiation, `.well-known/agent-card.json`, `mcp/server-card.json`, `api-catalog`, `agent-skills/index.json`, 5 JSON endpoints, `Link:` rel headers. All `200` with correct content types |

That AI layer is ahead of essentially every competitor site. It is not the problem and it does not
need work.

---

## 3. Findings, ranked

### CRITICAL

---

#### C1. The site's core keyword is a job-title query with hiring intent

**Evidence.** Live Google, `ai implementation specialist los angeles`, 20 results:
ZipRecruiter ("Browse 706 LOS ANGELES, CA AI IMPLEMENTATION SPECIALIST jobs"), LinkedIn Jobs,
Built In LA, Indeed, Greenhouse, Jobright, Trabajo.org. Zero consultant or agency sites.
"People also ask" is `How much do AI implementation specialists make?`.

The phrase is load-bearing across the whole site:
- `app/utils/siteMeta.ts` → `SITE.role`
- `<title>Aria Han, AI implementation specialist</title>`
- `<meta name="description">` on the homepage
- `"jobTitle": "AI implementation specialist"` in `Person` JSON-LD
- `llms.txt` line 5: `AI implementation specialist. Los Angeles, California.`

**Impact.** Every non-branded impression the site could earn is competing in a SERP Google has
classified as job-search. Ranking there would attract recruiters, not clients.

**Fix.** Keep "AI implementation specialist" as the *human* self-description in prose. Stop using it
as the *indexable* positioning string. Target buyer-intent phrases instead.

**File: `app/utils/siteMeta.ts`**

```ts
// before
role: "AI implementation specialist",

// after
role: "AI implementation specialist",          // human-facing, unchanged in prose
searchRole: "AI implementation consultant",    // used by title, description, schema
services: [
  "AI implementation consulting",
  "AI agent and workflow automation",
  "custom AI software development",
  "AI systems architecture",
],
```

**File: `app/page.tsx` (homepage metadata)**

```ts
// before
title: "Aria Han, AI implementation specialist"
description: "Aria Han is an AI implementation specialist in Los Angeles who builds systems that
              preserve continuity as human work and AI tools keep fragmenting."

// after
title: "AI Implementation Consultant in Los Angeles | Aria Han"
description: "Aria Han builds and ships production AI systems for teams in Los Angeles and remote:
              agent workflows, automation, and custom AI software. 3,450 commits of shipped proof."
```

The brand name stays in the title, so the branded #1 ranking is not at risk. The commercial phrase
leads, because that is the query with money behind it.

- SEO impact: **high**. Opens a query class the site currently cannot compete in at all.
- AI discoverability impact: **high**. Answer engines match on service phrasing when asked
  "who can help me implement AI".
- Effort: **1 to 2 agent-hours** including the copy pass.

---

#### C2. Google Search Console and Bing Webmaster Tools are not verified

**Evidence.**
- `curl https://ariaxhan.com/ | grep google-site-verification` → nothing. Same for `msvalidate`, `yandex`.
- `dig +short TXT ariaxhan.com` → **empty**. No DNS verification either.
- Google's own SERP for `site:ariaxhan.com` renders the promo: *"Do you own ariaxhan.com? Get indexing
  and ranking data from Google."* Google is literally telling you it is unverified.

**Impact.** No coverage reports, no query/impression data, no sitemap submission, no URL inspection,
no "request indexing", no manual-action visibility. Every other finding in this document had to be
measured externally *because* this is missing. This is the root cause of the diagnosis problem.

**Fix.** Verify both. Cheapest path is a DNS TXT record on the Cloudflare zone (verifies the whole
domain including subdomains), or a meta tag:

**File: `app/layout.tsx`**

```ts
export const metadata: Metadata = {
  // ...
  verification: {
    google: "<token from search.google.com/search-console>",
    other: { "msvalidate.01": "<token from bing.com/webmasters>" },
  },
};
```

Then submit `https://ariaxhan.com/sitemap.xml` in both, and use URL Inspection on the three
unindexed pages from C3.

- SEO impact: **critical, indirect**. It does not raise rankings; it is the only way to see them.
- Effort: **20 to 30 minutes**, human-in-the-loop (needs the Google/Bing account login).

---

#### C3. Three of eleven pages are missing from Google's index

**Evidence.** `site:ariaxhan.com` returns 8 URLs: `/`, `/proof/`, `/contact/`, `/writing/`,
`/about/`, `/systems/`, `/timeline/`, `/reading/`.
Absent: **`/open-source/`, `/hackathons/`, `/project-review/`** — all three present in `sitemap.xml`,
all three returning `200`, all three linked from the homepage nav (`/open-source/` 4 times,
`/hackathons/` 3 times).

So this is not a crawl-block. It is a crawl-priority/quality judgement, most likely because those
pages are card grids where the substance sits behind "READ THE STORY" interactions (see H4), leaving
thin extractable text.

`/open-source/` being the missing one is the expensive part: it holds KERNEL, llm-bench, metabrain,
agentmailkit, Substrate, the-agent-library. That is the whole credibility argument.

**Fix.** C2 first (URL Inspection → Request Indexing gives a direct signal), then H4 (give the
projects real URLs and real text), then M2 (honest `lastmod`).

- SEO impact: **high**. Three pages worth of surface, including the best one.
- Effort: 15 minutes to request indexing, and it depends on H4 to actually stick.

---

### HIGH

---

#### H1. No commercial schema anywhere. `/about/` has no schema at all

**Evidence.** `validator.schema.org` on each page:

| Page | Types found |
|---|---|
| `/` | `Person`, `WebSite`, `PostalAddress`, `Country` |
| `/contact/` | `Person`, `ContactPoint`, `ScheduleAction`, `EntryPoint` |
| `/open-source/`, `/systems/` | `ItemList`, `ListItem`, `CreativeWork` |
| `/writing/` | `Article`, `ItemList`, `ListItem`, `Person` |
| `/about/` | **none** |

No `Service`, no `ProfessionalService`, no `Organization`, no `Offer`, no `BreadcrumbList`, no `FAQPage`.
Zero validation errors on what does exist, so this is purely a coverage gap.

**Impact.** The graph says "a person exists and has published things". It never says "this person
sells AI implementation work, in these categories, to these buyers, in this area". Answer engines
building a shortlist of consultants have no structured hook.

**Fix. File: `app/utils/jsonLd.ts`** (add builders; the file already generates from the data layer,
so extend the existing pattern rather than hand-writing JSON)

```ts
/** The practice as a sellable service. Emitted on / and /contact/. */
export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#practice`,
    name: "Aria Han, AI implementation consulting",
    description:
      "Design, build and ship production AI systems: agent workflows, automation, " +
      "memory and context infrastructure, and custom AI software.",
    url: SITE.url,
    provider: { "@id": PERSON_ID },
    areaServed: [
      { "@type": "City", name: "Los Angeles" },
      { "@type": "Country", name: "United States" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE.url}/contact/`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engagements",
      itemListElement: SITE.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s },
      })),
    },
  };
}

/** Adds alternateName + expertise to the existing Person. See M6. */
export function personSchema() {
  return {
    // ...existing fields unchanged...
    alternateName: ["ariaxhan", "aria x han"],
    knowsAbout: [
      "AI implementation", "AI agents", "workflow automation",
      "retrieval augmented generation", "LLM evaluation",
      "agent memory systems", "Model Context Protocol",
    ],
    sameAs: [
      SITE.socials.github, SITE.socials.medium, SITE.socials.linkedin, SITE.socials.x,
      "https://pypi.org/user/ariaxhan/",     // new, see H6
      "https://devpost.com/ariaxhan",        // new
      "https://huggingface.co/ariaxhan",     // new, it already ranks for the name
    ],
  };
}
```

And on `/about/`, emit `ProfilePage` wrapping the existing `Person`. It currently emits nothing.

- SEO impact: **medium-high**. `ProfessionalService` is not a rich-result type, so expect no visible
  SERP feature. Its value is entity classification and local/service relevance.
- AI discoverability impact: **high**. This is exactly the shape answer engines read.
- Effort: **1.5 to 2.5 agent-hours**.

---

#### H2. Mobile LCP 4.1s, in the "poor" band

**Evidence.** Lighthouse 12.8.2 lab runs:

| Metric | Mobile (throttled 4G) | Desktop |
|---|---|---|
| Performance | 83 | 86 |
| FCP | 1.9s | 0.6s |
| **LCP** | **4.1s** (poor, >4.0s) | 2.5s (needs improvement) |
| CLS | 0 | 0 |
| TBT | 80ms | 0ms |
| Total weight | 542 KiB | |

LCP element: `section#entrance > div.grid > div.grid > p.m-0`, a **text** paragraph.
Phase breakdown: TTFB 164ms (7%), load delay 0, load time 0, **render delay ~93%**.
So it is not the network or an image. It is blocked rendering.

Render-blocking: `df2b4720bcdce623.css` (1,856 B, 104ms) and `2433ef56f7c895fc.css` (8,215 B, 222ms) = **326ms**.

No CrUX field data was retrievable (PSI quota, see header), so this is lab data only. Real-user data
becomes available once C2 is done.

**Fix.** The blocking CSS is only 10 KB combined. Inline the critical subset and defer the rest.

**File: `next.config.ts`**

```ts
const nextConfig: NextConfig = {
  output: 'export',
  experimental: {
    inlineCss: true,   // Next 15.5 ships this; removes both render-blocking CSS requests
  },
  // ...rest unchanged
};
```

Verify after: `npx lighthouse https://ariaxhan.com/ --only-categories=performance`, expect LCP under
2.5s mobile. Also secondary: `modern-image-formats` (27 KB), `uses-responsive-images` (37 KB),
`uses-optimized-images` (10 KB) — the studio JPEGs. Worth ~74 KB but they are not the LCP element,
so do them second.

- SEO impact: **medium**. Core Web Vitals is a real but small ranking factor; the "poor" band is the
  part worth clearing.
- Effort: **30 to 45 minutes** including verification.

---

#### H3. Content-Security-Policy blocks the site's own grain texture, throwing a console error on every page

**Evidence.** Lighthouse `errors-in-console` scores **0.00**:

```
source: "security"
description: "Loading the image 'data:image/svg+xml;utf8,%3Csvg ... feTurbulence ...' was blocked"
```

`inspector-issues` also 0.00: `{"issueType": "Content security policy", "subItems": [{"url": "data"}]}`.

Cause, in `public/_headers`: the CSP declares `default-src 'self' ...` and never declares `img-src`,
so images fall back to `default-src`, which does not include `data:`. Every `data:` SVG is blocked.

**Impact.** A visible design element (the paper grain) fails to load, and every page logs a security
error. Chrome/Lighthouse best-practices score capped at 93. Not a direct ranking factor, but it is a
real broken thing on a site whose entire pitch is that the person ships working systems.

**Fix. File: `public/_headers`**

```diff
-  Content-Security-Policy: default-src 'self' 'unsafe-inline' 'unsafe-eval' *.cloudflareinsights.com; script-src ...
+  Content-Security-Policy: default-src 'self' 'unsafe-inline' 'unsafe-eval' *.cloudflareinsights.com; img-src 'self' data:; script-src ...
```

Verify after deploy: `npx lighthouse https://ariaxhan.com/ --only-categories=best-practices` and
confirm `errors-in-console` is 1.00.

- SEO impact: **low**. Trust/quality impact: real.
- Effort: **5 minutes.**

---

#### H4. Around 15 project narratives have no URLs of their own

**Evidence.** `next build` route manifest lists exactly 11 HTML routes. `sitemap.xml` lists 11 URLs.
But `app/utils/siteCopy.ts` carries full narrative records — `thesis`, `problem`, `built[]`, `stack`,
`proof`, `learned`, `proves`, `closing` — for ModelMind, Paper Rooms, our4cuts, Brink Mind,
HeyContent, KERNEL, Armature, the-agent-library, llm-bench, model-familiarity-engine,
latent-diagnostics, metabrain, memory-pool, vector-native, agentmailkit, Substrate, site-spec.
All of it renders inside `/systems/` and `/open-source/`.

That is roughly 15 to 17 pieces of genuinely differentiated long-form technical content collapsed
into 2 indexable URLs. It is also the most plausible reason `/open-source/` is not indexed at all (C3):
a card grid of one-line theses looks thin, no matter what is behind the interaction.

**Fix.** Add a static dynamic segment. The data already exists and is already keyed by `slug`.

**New file: `app/projects/[slug]/page.tsx`**

```tsx
import { projects } from "../../utils/projectsData";
import { pageMeta } from "../../utils/pageMeta";
import { creativeWorkSchema, breadcrumbSchema } from "../../utils/jsonLd";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.slug === params.slug)!;
  return pageMeta({
    title: `${p.name}, ${p.kind === "open-source" ? "open source" : "product"} | Aria Han`,
    description: p.thesis,
    path: `/projects/${p.slug}/`,
    type: "article",
  });
}
```

Then add the same slugs to `app/sitemap.ts`, and link each card's "READ THE STORY" to the real URL
rather than an in-page interaction. Keep the list pages exactly as they are; they become hubs.

- SEO impact: **very high**. 11 indexable URLs to roughly 28. Each new page targets a real long-tail
  query ("MCP agent memory", "LLM evaluation harness", "deterministic email agent") with content that
  already exists and is already written.
- AI discoverability impact: **high**. Per-project markdown mirrors come free through the existing
  `Accept: text/markdown` middleware.
- Effort: **3 to 5 agent-hours** including OG images and sitemap wiring.

---

#### H5. The identity is described five different ways across five platforms

**Evidence**, pulled live:

| Platform | Stated identity |
|---|---|
| ariaxhan.com | "AI implementation specialist" |
| GitHub (`api.github.com/users/ariaxhan`) | name: **"Aria"**, bio: "AI Engineer and 3x founder building context-aware multi-agent systems" |
| GitHub profile README (per SERP) | "Aria Han. AI Systems Architect · Writer" |
| Medium | "AI architect, founder, and writer" |
| X (`@aria__han`) | "ai engineer & implementation specialist" |
| LinkedIn | "AI Implementation Specialist · Blink Build Studios", body: "AI Systems Architect" |

Five titles, and the GitHub `name` field is not even the full name. Additionally there is a **name
collision**: `"aria han" ai` returns a different Aria Han (International Sales Manager, SinoITS,
smart traffic and toll collection) on page 1.

**Impact.** Entity consolidation is how a search engine decides that all these profiles are one
person and that ariaxhan.com is that person's home. Inconsistent titles slow that down, and a
same-name collision makes it actively harder.

**Fix.** Pick one string, use it verbatim everywhere: GitHub `name` → "Aria Han", GitHub bio, Medium
bio, X bio, LinkedIn headline. Add the `alternateName` and expanded `sameAs` from H1. Nothing here is
a code change except the schema; the rest is profile edits.

- SEO impact: **medium-high** for entity consolidation and for defending against the name collision.
- Effort: **45 minutes**, human-in-the-loop (each platform needs a login).

---

#### H6. The high-authority profiles that rank for your name do not link back

**Evidence.**
- `pypi.org/pypi/metabrain/json` → `project_urls`: Homepage, Issues, Repository, **all three pointing
  at github.com**. `home_page: None`. No link to ariaxhan.com.
- `pypi.org/project/agentmailkit/` → `200`, live, same pattern.
- `devpost.com/ariaxhan` → `grep -c 'ariaxhan\.com'` = **0**. No link at all.
- GitHub profile `blog` field = `ariaxhan.com` ✓ (correct already; note GitHub marks it `nofollow`,
  so it is an entity signal rather than link equity).
- `huggingface.co/ariaxhan` ranks for the name and is not in `sameAs`.

**Impact.** These are exactly the domains the original complaint named. They rank because they are
high-authority, and they currently pass **nothing** back. A PyPI project page is a strong, permanent,
topically-relevant link and it is free.

**Fix.** In each package's `pyproject.toml`:

```toml
[project.urls]
Homepage      = "https://ariaxhan.com"                          # was: github
Documentation = "https://ariaxhan.com/projects/metabrain/"      # once H4 lands
Repository    = "https://github.com/ariaxhan/metabrain"
```

Republish (a metadata-only patch release is enough). Add the site link to the Devpost profile and to
each Devpost submission. Add ariaxhan.com to the Hugging Face profile.

- SEO impact: **medium-high**. Real backlinks from aged, high-authority, topically-aligned domains.
- Effort: **1 to 1.5 agent-hours** plus a PyPI release per package.

---

### MEDIUM

---

#### M1. robots.txt fails validation

**Evidence.** Lighthouse `robots-txt` audit scores **0.00**, and this is what caps the SEO category
at 92 on both desktop and mobile:

```
line 6  : "Content-Signal: ai-train=no, ai-input=yes, search=yes"  → Unknown directive
line 39 : "Content-Signal: ai-train=no, ai-input=yes, search=yes"  → Unknown directive
```

`Content-Signal` is a real Cloudflare-backed proposal, not a typo, and Google ignores unknown
directives rather than discarding the file. So actual crawl impact is near zero. But strict third-party
parsers may reject the file wholesale, and it is a permanent red audit.

**Fix (low risk, keeps the policy).** Move the signal out of the crawl-directive block: keep the
`User-agent`/`Allow`/`Disallow`/`Sitemap` lines strictly standard, and express the content signal via
a response header instead.

**File: `public/_headers`**

```
/*
  Content-Signal: ai-train=no, ai-input=yes, search=yes
```

Then delete both `Content-Signal:` lines from `public/robots.txt`.

- SEO impact: **low** in ranking terms; restores a clean audit and removes parser risk.
- Effort: **10 minutes.**

---

#### M2. `lastmod` is the build timestamp, identical on all 11 URLs

**Evidence.** Every entry in the live sitemap reads `lastmod=2026-07-14T07:12:25.237Z`, byte-identical.
Source, `app/sitemap.ts`:

```ts
const now = new Date();
return routes.map((r) => ({ url: `${BASE}${r}`, lastModified: now, ... }));
```

Every deploy stamps every page as freshly modified, including pages untouched for months.

**Impact.** Crawlers learn that `lastmod` on this domain carries no information and stop trusting it.
That directly costs recrawl priority, which is relevant to C3 (three unindexed pages).

**Fix.** Derive from git, which is already the source of truth on this repo:

```ts
import { execFileSync } from "node:child_process";

function lastCommit(paths: string[]): Date {
  const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
    encoding: "utf8",
  }).trim();
  return iso ? new Date(iso) : new Date();
}

const ROUTE_SOURCES: Record<string, string[]> = {
  "/":              ["app/page.tsx", "app/utils/siteCopy.ts"],
  "/open-source/":  ["app/open-source/page.tsx", "app/utils/projectsData.ts"],
  "/proof/":        ["app/proof/page.tsx", "app/utils/motionData.json"],
  // ...one entry per route
};
```

Also drop `priority`; Google has publicly ignored it for years, and `changeFrequency` too. They are
noise, not signal.

- SEO impact: **medium**, specifically on recrawl rate.
- Effort: **45 minutes.**

---

#### M3. Preview deployments are publicly indexable

**Evidence.**
- `https://personalsite-c8g.pages.dev/` → `200`, `<meta name="robots" content="index, follow">`
- `https://c19e08ff.personalsite-c8g.pages.dev/` (a preview hash) → `200`
- Both serve the same `robots.txt` with `Allow: /`
- Mitigation present: both carry `<link rel="canonical" href="https://ariaxhan.com/">`

So the canonical is doing the defensive work, but nothing stops a crawler from fetching and
evaluating every preview build. There are 6+ live preview deployments right now.

**Fix. File: `functions/_middleware.ts`**, in the existing response path:

```ts
const response = await next();

// Preview and *.pages.dev hosts must never be indexed. Only the apex is canonical.
if (url.hostname.endsWith(".pages.dev")) {
  const headers = new Headers(response.headers);
  headers.set("x-robots-tag", "noindex, nofollow");
  return new Response(response.body, { status: response.status, headers });
}
```

- SEO impact: **low-medium**. Removes a duplicate-content class rather than fixing an active penalty.
- Effort: **20 minutes.**

---

#### M4. `www.ariaxhan.com` does not resolve

**Evidence.** `dig +short www.ariaxhan.com` → empty. `curl https://www.ariaxhan.com/` →
`Could not resolve host`. Cloudflare Pages lists only `ariaxhan.com` and `personalsite-c8g.pages.dev`
as custom domains.

**Impact.** Anyone typing or linking the `www` form gets a DNS failure, not a redirect. Business
cards, email signatures, and anyone's muscle memory. Any inbound link written as `www.` is dead and
passes nothing.

**Fix.** Add `www.ariaxhan.com` as a custom domain in Cloudflare Pages (it auto-issues the cert), then
a bulk redirect `www.ariaxhan.com/*` → `https://ariaxhan.com/$1` at 301.

- SEO impact: **low-medium**, mostly link-loss insurance.
- Effort: **15 minutes**, Cloudflare dashboard.

---

#### M5. All 11 pages share one Open Graph image

**Evidence.** `og:image` on every page = `https://ariaxhan.com/og.png`, `1200x630`, alt
`"Aria Han, AI implementation specialist"`. Generated once by `scripts/generate-og.mjs`.

**Impact.** Every share of every page looks identical. Not a ranking factor; a click-through and
social-distribution factor, and social shares are how a site with no backlinks earns its first ones.

**Fix.** Extend `scripts/generate-og.mjs` to emit per-route cards from the same data layer
(`/og/proof.png`, `/og/open-source.png`, and per-project once H4 lands), then have `pageMeta()` accept
an `ogImage` override defaulting to the current shared card.

- Effort: **1.5 to 2 agent-hours.**

---

#### M6. "ariaxhan" never appears as visible text

**Evidence.** On the rendered homepage: the string `ariaxhan` occurs **92 times**, and after stripping
tags, scripts and URLs, **0 times** as visible text. It exists only inside URLs and attributes.
"Aria Han" appears 3 times.

**Impact.** `ariaxhan` is the username that Instagram, Devpost, GitHub, Hugging Face and PyPI all rank
for. The site currently claims that identifier nowhere a search engine reads as content, and nowhere in
the schema graph.

**Fix.** `alternateName: ["ariaxhan", "aria x han"]` in `personSchema()` (already folded into the H1
patch), plus one natural prose mention — the footer or the about page, e.g. "Elsewhere I am
**ariaxhan** on GitHub, PyPI and Devpost." That sentence is true, useful to a reader, and does the
entity work.

- SEO impact: **medium** for entity consolidation.
- Effort: **20 minutes.**

---

#### M7. Nav-wide colour contrast failures and one stale `aria-label`

**Evidence.** Lighthouse `color-contrast` scores **0.00**, failing on all 10 nav items
(`ENTRANCE`, `ABOUT`, `HACKATHONS`, `SYSTEMS`, `PROOF`, `OPEN SOURCE`, `READING`, `WRITING`,
`TIMELINE`, `CONTACT`) plus both `.kicker` elements.

`label-content-name-mismatch` scores **0.00** on:

```html
<a aria-label="Proof of motion: 3,178 commits across 33 repositories, Nov 2024 to Jul 2026…">
```

That aria-label is now **factually stale** — the regenerated ledger says 3,450 commits across 36
repositories — and it does not match the link's visible text.

**Fix.** Darken the nav ink one step to clear 4.5:1, and derive the aria-label from `motionData.json`
rather than hardcoding it, so it can never drift again (same pattern the visible text already uses).

- SEO impact: **low**. Accessibility and honesty impact: real, and it is a site that advertises
  verified numbers.
- Effort: **45 minutes.**

---

### LOW

- **L1.** `Python-urllib/3.12` gets `403` from Cloudflare bot management; `curl/8.7.1` and all 13
  tested real crawler UAs get `200`. No search impact. Noted only because it will bite any future
  scripted self-check (it bit this audit at first).
- **L2.** `uses-long-cache-ttl` 0.50, sole offender `static.cloudflareinsights.com/beacon.min.js`
  (24h TTL, third-party, not controllable).
- **L3.** `Referrer-Policy: no-referrer` means outbound clicks send no referrer, so anyone you link to
  cannot attribute traffic back to you and you appear as direct/dark traffic in their analytics.
  `strict-origin-when-cross-origin` keeps the privacy posture while preserving attribution.
- **L4.** No `BreadcrumbList` on any page. Low value at this depth; worth adding once H4 creates
  `/projects/<slug>/`.
- **L5.** `legacy-javascript` 0.50 (~9 KB of unnecessary transpilation). Negligible.

---

## 4. Effort and impact summary

| # | Finding | Sev | SEO | AI disc. | Effort |
|---|---|---|---|---|---|
| C1 | Keyword targets a job-title SERP | Critical | High | High | 1–2h |
| C2 | No Search Console / Bing verification | Critical | Enabling | Low | 30m (human) |
| C3 | 3 of 11 pages unindexed | Critical | High | Medium | 15m + H4 |
| H1 | No Service/ProfessionalService schema | High | Med-High | High | 1.5–2.5h |
| H2 | Mobile LCP 4.1s | High | Medium | Low | 30–45m |
| H3 | CSP blocks own data: SVG | High | Low | Low | 5m |
| H4 | ~15 projects have no URLs | High | Very High | High | 3–5h |
| H5 | Five different identities | High | Med-High | Medium | 45m (human) |
| H6 | PyPI/Devpost do not link back | High | Med-High | Medium | 1–1.5h |
| M1 | robots.txt invalid | Medium | Low | Low | 10m |
| M2 | Meaningless `lastmod` | Medium | Medium | Low | 45m |
| M3 | Previews indexable | Medium | Low-Med | Low | 20m |
| M4 | No `www` record | Medium | Low-Med | Low | 15m |
| M5 | One shared OG image | Medium | Low | Low | 1.5–2h |
| M6 | "ariaxhan" not visible text | Medium | Medium | Medium | 20m |
| M7 | Contrast + stale aria-label | Medium | Low | Low | 45m |

Total: roughly **14 to 19 agent-hours**, of which about 1.5 hours needs a human at a login screen
(Search Console, Bing, the five profile bios, Cloudflare DNS).

Recommended order: **H3** (5 min, real bug) → **C2** (unblocks measurement) → **C1** → **H1** →
**M1, M3, M4, M6** (small batch) → **H4** → **H2** → **M2, M5, M7** → **H5, H6** (async, human).

---

## 5. Competitive comparison

Compared against how independent AI consultancies and consultant-operators typically present
themselves, the gaps are narrow and specific:

| Signal | Typical AI consulting site | ariaxhan.com |
|---|---|---|
| Service pages per offering | One URL per service, each targeting a buyer query | **None.** Services live inside `/contact/` |
| `Service` / `ProfessionalService` schema | Standard | **Absent** |
| Case studies as individual URLs | Standard, usually the top traffic driver | **Absent** (H4) |
| FAQ block + `FAQPage` schema | Common, wins "People also ask" placement | **Absent**, though `/contact/` already has a fit filter that is FAQ-shaped |
| Search Console verified | Universal | **No** (C2) |
| Named client proof / testimonials | Common | Absent by choice (privacy policy). Compensated by `/proof/` |
| llms.txt / agent endpoints / MCP card | Rare | **Present and best-in-class.** Keep |
| Verifiable commit-level proof | Effectively unique | **Present.** Keep |

Two things this site has that competitors do not: a machine-readable agent layer, and a
cryptographically-checkable work history. Neither is currently doing SEO work because the pages that
carry them are not classified as commercial. Fixing C1 and H1 is what converts an existing advantage
into inbound.

---

## 6. Content strategy check

Can a search engine tell who the site is for, what problem it solves, and why to trust it?

- **Who it is for**: weak. The homepage H1 is `Aria Han`. The clearest audience statement is inside
  a "good fit" list on `/contact/`, off the homepage.
- **What problems it solves**: strong in prose, invisible in structure. "Memory, context, and knowledge
  systems", "Dify / low-code AI app implementation" are exactly the right topics, and they are `<h3>`s
  inside a grid rather than headings of pages that could rank.
- **Why to trust it**: strongest asset on the site. `/proof/` is verifiable and unusual.
- **Why to contact**: clear once you reach `/contact/` (15 internal links, booking embed present).

The recommended structural change is small: keep the H1 as the name, but add one line of service
language immediately below it in the DOM so the first indexable text on the page names the service,
not just the person.

---

## 7. Reproducing this audit

```bash
# status, headers, redirect chain
curl -sSI https://ariaxhan.com/
for u in /about /about/ /nonexistent-page-xyz; do curl -so /dev/null -w "%{http_code} %{redirect_url}\n" https://ariaxhan.com$u; done

# per-crawler access
curl -so /dev/null -w "%{http_code}\n" -A "Mozilla/5.0 (compatible; Googlebot/2.1)" https://ariaxhan.com/

# lab performance
npx lighthouse@12 https://ariaxhan.com/ --output=json --output-path=lh.json \
  --only-categories=performance,seo,accessibility,best-practices

# structured data, Google's own parser
curl -sS https://validator.schema.org/validate -X POST --data-urlencode "url=https://ariaxhan.com/"

# verification + DNS
dig +short TXT ariaxhan.com
dig +short www.ariaxhan.com

# indexation (real browser, Google blocks scripted fetches)
# site:ariaxhan.com   |   ariaxhan   |   "aria han" ai   |   ai implementation specialist los angeles
```
