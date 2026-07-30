---
type: product-roadmap
status: proposed
authority: none
created: 2026-07-29
related:
  - _meta/commissions/active/2026-07-29-inline-cms-portfolio-v1.md
---

# Product roadmap: an editable layer for coded websites

## Status

This is a product hypothesis and sequencing document, not execution authority.
The portfolio commission may preserve compatible boundaries, but it must not
implement commercial features merely because they appear here.

Progression requires evidence from the prior stage. Plans do not manufacture
market demand.

## Product angle

### The problem

Founders and independent builders increasingly have websites produced through
custom code, AI-assisted development, templates, or a mixture of all three.
The site may look right and perform well, but changing a sentence often means
reopening a repository, finding the correct component, running a build, and
redeploying.

Moving the site into a conventional page builder can destroy the design,
replace the technical stack, weaken source ownership, or create a second
representation that drifts from the real website.

### The product

> Make any coded or AI-built website directly editable without sacrificing its
> design, SEO, performance, or source ownership.

The shorter wedge:

> Your site is already built. Now make it editable.

The product is not "a D1 CMS." Storage and hosting are implementation choices.
The customer buys an editable layer for the website they already have.

### Initial audience

The first audience hypothesis is:

- founders with an AI-assisted or custom-coded marketing site;
- independent builders who can deploy code but do not want every copy edit to
  become a coding task;
- small studios or technical agencies that maintain custom sites for clients;
- teams whose existing site design does not fit a generic page builder.

This audience is not validated by the portfolio alone. Aria is the first
dogfood user, not proof of a market.

### Initial job

```text
connect or install into existing site
→ identify editable content without changing the design
→ edit inside the real page
→ preview privately
→ publish current content into first-response HTML
→ restore any prior version
```

### Product promise

- Keep the existing website and component design.
- Keep content present in server-rendered or pre-rendered HTML.
- Keep code and recovery defaults in the customer's repository.
- Make editing visual and immediate.
- Make publication explicit, reversible, and observable.
- Avoid a full rebuild for ordinary content changes where the host supports
  cached server rendering.
- Never make public visitors apply canonical content in the browser.

## What could become defensible

The revision database and inline controls are reproducible. The harder,
potentially defensible capability is safe onboarding:

```text
inspect an existing repository
→ find human-facing content and its consumers
→ propose stable editable fields
→ generate typed schemas and reviewed defaults
→ install the resolver and editor integration
→ prove visual and machine-output equivalence
```

The product becomes valuable when it can add editing without requiring a
customer to rebuild the site or manually remodel every field.

The likely long-term advantage is the combination of:

- repository understanding;
- safe content extraction;
- design-preserving inline editing;
- initial-HTML and metadata consistency;
- provider-aware publication and rollback;
- machine-verifiable migration evidence.

This is a hypothesis. It needs successful external installations before being
described as a moat.

## Portfolio versus commercial product

| Portfolio v1 | Commercial possibility |
| --- | --- |
| One authenticated editor | Teams, roles, invitations, approvals |
| One site | Organizations and multiple sites |
| Current Next.js repository | Framework and host adapters |
| D1 content storage | Managed or customer-owned storage options |
| OpenNext cache invalidation | Hosting-specific publication adapters |
| Fixed routes and slugs | Route registry, redirects, retirement |
| Typed page JSON | Schema authoring and reusable content types |
| Plain text and structured fields | Rich text and custom field plugins |
| Manual field inventory | Repository scanner and migration compiler |
| Revision history and restore | Review, diff, audit, scheduled publishing |
| Cloudflare Access | Product accounts, SSO, workspace permissions |
| Hand-run preview and cutover | Guided installation and automated checks |
| Site-specific verification | Cross-framework conformance suite |

The right column is not a portfolio backlog.

## Product principles

1. **Preserve before improving.** Installation must not redesign the site.
2. **The first response is real.** Public content, metadata, and structured data
   are never browser-applied canonical overrides.
3. **Source stays useful.** Checked-in schemas and defaults remain readable,
   reviewable, and suitable for recovery.
4. **Publication is reversible.** Every successful publish has an observable
   state and a restoration path.
5. **Private editing is a separate path.** Drafts and editor behavior do not
   leak into ordinary navigation.
6. **Adapters stay at the edge.** Content meaning does not depend on one cache,
   database, host, or authentication provider.
7. **No false automation.** Generated field mappings require review before they
   become content contracts.
8. **Evidence beats compatibility claims.** A framework or host is supported
   only after install, publish, recovery, and upgrade behavior pass there.

## Product architecture, only when earned

Likely future boundaries:

```text
content core
├── schema and field identity
├── immutable revisions
├── published snapshots
└── publication history

site integration
├── framework resolver
├── metadata and machine-surface integration
├── editable field wrappers
└── route dependency discovery

publication adapters
├── cache invalidation
├── regeneration
├── deployment and preview hooks
└── convergence verification

editor product
├── workspace and identity
├── drafts and collaboration
├── visual editing
├── history and approval
└── failure recovery

onboarding compiler
├── repository inventory
├── content extraction proposals
├── schema generation
├── installation patch
└── equivalence verification
```

Portfolio v1 should keep these responsibilities readable, but it should not
create public plugin APIs or generalized interfaces before at least three
concrete integrations expose their real differences.

## Roadmap

### Stage 0: dogfood on ariaxhan.com

Build only the portfolio commission.

Evidence required:

- Aria can make ordinary copy changes without opening the repository.
- Published HTML, metadata, structured data, listings, and machine routes remain
  consistent.
- Editing is faster than a code-and-deploy change in repeated real use.
- Recovery and rollback are understandable without developer intervention.
- The system survives actual weekly use, stale tabs, failed invalidation, and
  schema changes.
- Maintenance does not cost more time than it saves.

Do not begin product extraction immediately after launch. Record at least one
month of real editing behavior and every point where Aria still reaches for the
codebase.

### Stage 1: extraction feasibility

Use a disposable second site to answer whether the implementation is portable.
Do not start with a customer production site.

Build only enough to:

- identify the portfolio-specific code that must be separated;
- install the content resolver and editor into a second existing Next.js site;
- map a small set of text, metadata, list, and link fields;
- preserve the second site's visual output;
- publish and restore without copying portfolio assumptions;
- measure manual integration work.

Exit evidence:

- the second integration does not require rewriting the content core;
- site-specific code is isolated to an integration layer;
- installation and field mapping take a bounded, recorded amount of time;
- public output remains equivalent before the first content edit;
- removal returns the site to its prior behavior without content loss.

If the second site requires pervasive custom surgery, improve the onboarding
model before adding product features.

### Stage 2: design-partner pilot

Recruit three to five founders or small studios with existing coded sites. Do
not promise general framework support.

Offer a narrowly supported configuration and perform onboarding manually while
recording:

- why they want editing;
- who edits and how often;
- which content structures fail automatic mapping;
- installation time and custom-code volume;
- publish and rollback confidence;
- support burden;
- whether they continue using it after the novelty passes;
- whether they would pay, how much, and for which outcome.

Pilot product:

- one owner and optional invited editor;
- one site per workspace;
- typed fields and limited rich text only if repeatedly required;
- draft, publish, restore, and basic history;
- installation report and equivalence proof;
- managed updates for the supported stack.

Exit evidence:

- at least three external sites reach production;
- customers publish repeatedly without developer help;
- a common installation path covers most work;
- support and maintenance remain economically plausible;
- willingness to pay is observed through a paid pilot or equivalent commitment.

### Stage 3: private product beta

Only after the pilot identifies repeatable needs:

- product accounts and workspace isolation;
- repeatable installer for the proven framework/host pair;
- reviewed repository-scanning suggestions;
- onboarding status and migration report;
- editor permissions required by observed teams;
- managed publication diagnostics;
- safe upgrades and uninstall;
- billing for the validated buying unit.

Keep the support matrix intentionally small. "Works with custom websites" is
not an acceptable claim until the compatibility suite proves it.

Exit evidence:

- onboarding succeeds without founder involvement on a meaningful share of
  supported sites;
- publication failures are diagnosable without database access;
- upgrades preserve customer content and code changes;
- retention shows continued editing after initial setup;
- gross support cost fits the observed price.

### Stage 4: commercial v1

Commercial v1 should sell the outcome, not the infrastructure:

```text
make this existing website safely editable
```

Likely requirements, subject to pilot evidence:

- stable supported-stack installer;
- workspace and site management;
- owner/editor roles;
- revision history, diff, restore, and publication status;
- backups and export;
- monitored publishing and recovery;
- documented source ownership and uninstall;
- support and billing;
- security and tenant-isolation review;
- service-level expectations grounded in measured operation.

Do not add route editing, arbitrary page creation, scheduled publishing, or
many framework adapters unless the pilot makes them purchase blockers.

### Stage 5: expansion

Possible later directions:

- additional Next.js hosting providers;
- other component frameworks;
- customer-owned storage and self-hosting;
- route and page lifecycle management;
- reusable structured content;
- localization;
- scheduled and approval-based publication;
- agency portfolios and white-label management;
- agent-assisted content inventory and migration;
- an SDK for custom field types.

Each expansion needs three concrete customer cases before abstraction. A matrix
of logos is not support evidence.

## Commercial questions that remain open

- Is the buyer the founder, developer, agency, or marketing owner?
- Is the main value editing speed, developer independence, design preservation,
  SEO confidence, or safer AI-generated-site maintenance?
- Do customers want a managed service, a source-installed product, or both?
- Who owns the content database and operational recovery?
- What installation time is acceptable?
- Which framework/host pair produces the strongest first market?
- How much structured content can be inferred safely?
- Does inline editing matter more than a faithful side-panel editor?
- What level of rich text is actually necessary?
- Will customers pay recurring revenue after onboarding?
- How much support does arbitrary customer code create?

No pricing or market-size claim is authoritative until customer research and
paid behavior answer these.

## Risks

### Integration variability

Custom sites encode copy in components, data files, markdown, APIs, and build
steps. A scanner that appears magical but generates unsafe mappings will
destroy trust.

Response: propose mappings, show evidence, require review, and keep the first
support matrix narrow.

### Split ownership

Customers may edit both source defaults and published database content.

Response: define import, override, reset, export, and conflict behavior before
supporting two-way source synchronization. Portfolio v1 has one-way seed plus
explicit recovery only.

### Hosting coupling

Publication and cache behavior differ by host.

Response: isolate delivery integrations after the second real host proves the
boundary. Do not claim provider neutrality from interface names alone.

### Security and tenant isolation

An editor stores publishable content and may patch customer code during
installation.

Response: treat repository access, stored content, authentication, output
safety, audit, and tenant separation as core product security work before beta.

### Support burden

Arbitrary codebases can turn every onboarding into consulting.

Response: measure custom work, restrict supported stacks, and price or reject
outliers rather than pretending they are productized.

### Category confusion

The product can sound like another headless CMS, page builder, or hosting
platform.

Response: lead with preserving and editing the existing site. Keep databases,
cache adapters, and framework language underneath the promise.

## Measures that matter

Dogfood:

- time from opening edit mode to a verified publish;
- percentage of edits completed without repository access;
- rollback success;
- maintenance time;
- public performance and indexability regression.

External pilots:

- time to first editable field;
- time to first production publish;
- visual and output equivalence after installation;
- custom integration code per site;
- publishes per active site;
- editors who publish without developer help;
- failed publication and recovery rates;
- support time per site;
- continued usage and paid commitment.

Commercial beta:

- supported-site installation success rate;
- onboarding completion;
- activation through first publish;
- retained editing activity;
- upgrade and uninstall safety;
- gross support cost;
- revenue retention.

Vanity metrics such as detected field count, repository count, or generated
patch size do not prove customer value.

## Decision gates

```text
portfolio launch
→ one month of real dogfood evidence
→ decide whether extraction beats continued portfolio-specific improvement

second-site installation
→ decide whether a reusable integration boundary actually exists

three to five design partners
→ decide whether repeated use and willingness to pay exist

paid private beta
→ decide whether onboarding and support are economically productizable

commercial v1
→ expand only from observed blocked sales or retention needs
```

At every gate, stopping or remaining a useful internal tool is a valid outcome.

## Current product thesis

The strongest current thesis is:

> AI-assisted development made custom websites easier to create, but not
> necessarily easier to operate. An editable layer that preserves the existing
> site can close that gap.

The portfolio implementation tests the first half of that thesis: whether the
editing and publishing model is genuinely useful in sustained daily life. It
does not validate the market, automatic onboarding, multi-site operation, or a
commercial business.
