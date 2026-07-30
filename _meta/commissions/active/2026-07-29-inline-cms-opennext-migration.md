---
type: commission
status: superseded
created: 2026-07-29
supersedes:
  - _meta/plans/d1-copy-editor.md
superseded_by:
  - _meta/commissions/active/2026-07-29-inline-cms-portfolio-v1.md
  - _meta/plans/editable-site-commercial-roadmap.md
---

# Commission: inline CMS and OpenNext migration for ariaxhan.com

> Superseded after three independent reviews found that this contract mixed a
> portfolio migration with future commercial-platform scope. It remains the
> detailed review and failure-analysis record. Execution authority now lives in
> `2026-07-29-inline-cms-portfolio-v1.md`; commercial possibilities are separated
> into the non-authoritative product roadmap.

## Telos

Aria must be able to edit the words on ariaxhan.com in place, preview changes privately,
save drafts, publish, and roll back without editing source code or initiating a deployment.

The public site must remain fast, indexable, internally consistent, and truthful. Published
body copy, metadata, structured data, listings, machine-readable routes, and sitemap state
must resolve from one immutable published revision. Ordinary visitors must receive that
published state in the initial HTML response. Editor code and draft state must never enter
the public rendering path.

This is a small embedded CMS whose public output is aggressively cached. It is not a static
portfolio with browser-applied overrides.

## Authority granted

After Aria approves execution of this commission, the runner may:

- replace the current Next.js static export and Cloudflare Pages runtime with the supported
  OpenNext adapter on Cloudflare Workers;
- add new content, cache, authentication, revision, publication, rollback, and editor modules;
- add D1 migrations and configure separate content and tag-cache bindings;
- configure the R2 incremental cache and the OpenNext revalidation resources;
- refactor the centralized copy layer and every human or machine rendering consumer;
- add production-adapter integration tests, Playwright tests, a crawl verifier, structured-data
  contracts, and Lighthouse CI;
- create a migration preview deployment and isolated test resources;
- seed the content database from checked-in defaults after the seed is reviewed;
- commit and push an implementation branch and open a pull request.

Changing the production custom-domain route remains behind the cutover gate in this commission.
Do not cut over merely because a build, preview deploy, or happy-path test passes.

## Hard boundaries

- No implementation begins from this commission-writing pass.
- No public content may read the newest revision, a draft revision, or an uncommitted editor state.
  Public resolution is always `published_content → immutable content_revisions`.
- No public visitor downloads editor code, draft data, or a client-side published-content patch.
- No crawler-only representation. Humans, crawlers, raw HTTP clients, mobile user agents, JSON-LD,
  metadata, and machine endpoints resolve from the same published revision.
- No automatic build on publish. Publication writes D1 and invalidates cache only.
- Git defaults are recovery input, never the canonical published state after migration.
- Rendered HTML and R2 objects are disposable cache artifacts, never sources of truth.
- Content D1, OpenNext tag-cache state, and R2 rendered output stay separate.
- The tag-cache interface must be swappable. D1 suitability for this low-traffic portfolio must
  not leak into the content domain or publication model.
- Do not hardcode secrets, Cloudflare account identifiers, author emails, Access audience values,
  cache-purge tokens, or machine-specific absolute paths.
- Do not merge, delete the existing Pages project, or reroute the custom domain before the
  production-adapter migration gate and independent review pass.
- Do not break or silently absorb the existing project-review intake. Its current production
  Worker, route, D1 data, notification behavior, and recovery path need explicit compatibility
  proof before cutover.
- Do not inherit the provisional uncommitted copy-catalog scaffolding as approved architecture.
  Inspect it, keep only what satisfies this commission, and delete the rest.
- Preserve current voice rules and facts. This commission changes where copy lives and how it is
  published; it does not authorize autonomous copy rewriting.

## Confirmed current reality

Observed from the repository and remote state on 2026-07-29:

- The public app is Next.js 15.5.21 with App Router and `output: "export"`.
- Cloudflare Pages serves the static export. Pages Functions currently provide middleware and MCP.
- `wrangler.toml` names the Pages project `personalsite` and points at `out`.
- The existing production D1 declaration is named `personalsite-project-review`. Treat its name
  and prior intake purpose as evidence against casually making it the canonical content store.
- `app/utils/siteCopy.ts` already centralizes the human-facing prose, metadata copy, projects,
  writing, contact language, and many machine-readable descriptions.
- Human pages, JSON-LD, markdown variants, JSON endpoints, `llms.txt`, MCP, and well-known agent
  surfaces were deliberately converged during the proof-engine work. The CMS cannot migrate the
  visible pages while leaving those consumers on Git defaults.
- Discoverability work verified branded search, canonicals, crawlability, raw HTML, structured
  data, sitemap behavior, and preview-host `noindex`. Those are regression baselines.
- Mobile hardening established 375, 768, and 1440 widths as the visual verification floor and
  requires primary content to be visible without animation or hydration.
- PR 26 merged the founder and operations positioning into `main` at merge commit
  `98101f316b18d46cef6d738be150aed06dc1eed3`.
- The current local branch contains two later hero-copy commits. The final selected hero is
  `AI for work, AI for humans.` with its approved subtitle. These commits are not evidence that
  the CMS migration branch is correctly based. Execution must fetch remote state and create a
  clean migration branch without losing the approved copy.
- Uncommitted provisional files currently include `_meta/plans/d1-copy-editor.md`,
  `app/utils/editableContent.ts`, and `app/api/copy-catalog.json/route.ts`. They were created
  before the architecture was locked and carry no authority.

## Locked invariants

```text
content truth      → content D1
published lookup   → published_content → immutable revision
cache bookkeeping  → swappable OpenNext tag-cache adapter
rendered output    → disposable R2/cache artifacts
recovery input     → checked-in Git defaults
draft behavior     → authenticated edit mode only
```

The strongest public invariant is:

```text
public render → published_content pointer → immutable content_revisions row
```

Nothing public may query by `created_at DESC`, `MAX(id)`, draft status, or “latest”.

## Architectural decision

### Public rendering

1. Resolve the requested page key.
2. Read the published pointer through the content repository interface.
3. Load the immutable revision referenced by that pointer.
4. Parse and validate the revision into the page-specific content schema.
5. If the pointer, revision, database, or validation fails, render checked-in defaults and emit
   a structured recovery signal. Never substitute a draft or newer unpointed revision.
6. Render body, metadata, Open Graph, Twitter cards, JSON-LD, navigation/listing references,
   markdown, JSON, MCP, sitemap state, and internal previews from that effective content.
7. Cache the resulting public artifact through OpenNext.
8. Emit a non-content diagnostic header such as `x-content-revision: rev_...` on dynamic HTML
   and machine responses. Fallback responses must identify fallback state without exposing drafts.

Warm public requests should be cache hits and must not query content D1. A cold request after
invalidation may query D1 once to regenerate the affected artifact.

### Private editing

- Authenticated Aria enables edit mode through a private control or protected query entry.
- Draft mode sets a private cookie and forces dynamic draft rendering for Aria only.
- The same page components render the editor overlay around stable field identifiers.
- Short fields may use direct inline editing. Long prose, lists, links, and structured records
  use a side panel or structured controls; do not build an accidental rich-text editor.
- Keystrokes update local React state only.
- `Save draft` writes a new immutable draft revision.
- `Publish` operates on an existing immutable revision and a caller-supplied idempotency key.
- `Discard` removes only local state. Deleting a saved draft requires an explicit separate action.
- Every edit and draft route is authenticated and emits `noindex, nofollow`; editor resources are
  absent from ordinary public bundles.

### Stable field identity

Field IDs are contracts, not display labels or array positions.

Good:

```text
global.identity.role
home.hero.title
home.hero.subtitle
project:agentmailkit.thesis
project:agentmailkit.body.automation-origin
writing:article-slug.excerpt
```

Rejected:

```text
projects.7.built.1
page.sections.3.text
```

Reordering arrays must not change identity. Structural properties such as slug, canonical URL,
visibility, publish state, redirects, and sitemap inclusion belong in a page-settings surface
with stronger validation and broader dependency invalidation.

## Content domains and page keys

The first implementation must inventory every current `siteCopy.ts` consumer and assign it to a
stable domain before moving data:

- `global`: identity, navigation, footer, booking, shared service framing, social labels.
- `home`: hero, proof labels, homepage section prose, homepage cards and references.
- `about`: biography, positioning, values, and page metadata.
- `contact`: engagement copy, fit filters, form labels, page metadata.
- `project-review`: explanatory and form copy, excluding submitted user data.
- `project:<slug>`: each project narrative, metadata, structured data, links, and visibility.
- `systems`: listing-page prose and settings.
- `open-source`: listing-page prose and settings.
- `writing`: listing-page prose and settings.
- `article:<slug>`: article metadata and excerpts represented on this site.
- `reading`, `timeline`, `proof`, `hackathons`: their page prose, records, and metadata.
- `machine`: agent directives and descriptions only where they are not derived from the domains
  above. Prefer derivation; duplicated prose must be justified.

Do not copy the current TypeScript object wholesale into one giant revision. Page-scoped
revisions provide bounded invalidation, reviewable diffs, and independent rollback.

## Data model

Use migrations with foreign keys and explicit uniqueness constraints. IDs are opaque,
collision-resistant strings. Timestamps are UTC.

```sql
content_revisions
- id TEXT PRIMARY KEY
- page_key TEXT NOT NULL
- parent_revision_id TEXT NULL
- content_json TEXT NOT NULL
- content_schema_version INTEGER NOT NULL
- content_sha256 TEXT NOT NULL
- lifecycle TEXT NOT NULL          -- draft | published | archived
- created_at TEXT NOT NULL
- published_at TEXT NULL
- author_id TEXT NOT NULL
- UNIQUE(page_key, id)

published_content
- page_key TEXT PRIMARY KEY
- revision_id TEXT NOT NULL UNIQUE
- updated_at TEXT NOT NULL
- publish_operation_id TEXT NOT NULL
- FOREIGN KEY(page_key, revision_id) REFERENCES content_revisions(page_key, id)

publish_operations
- id TEXT PRIMARY KEY
- page_key TEXT NOT NULL
- revision_id TEXT NOT NULL
- previous_revision_id TEXT NULL
- idempotency_key TEXT NOT NULL UNIQUE
- state TEXT NOT NULL
- created_at TEXT NOT NULL
- pointer_moved_at TEXT NULL
- invalidations_completed_at TEXT NULL
- completed_at TEXT NULL
- last_error TEXT NULL

publish_invalidations
- id TEXT PRIMARY KEY
- publish_operation_id TEXT NOT NULL
- dependency_kind TEXT NOT NULL    -- path | tag
- dependency_key TEXT NOT NULL
- state TEXT NOT NULL              -- pending | complete | failed
- attempts INTEGER NOT NULL DEFAULT 0
- last_attempt_at TEXT NULL
- completed_at TEXT NULL
- last_error TEXT NULL
- UNIQUE(publish_operation_id, dependency_kind, dependency_key)
```

A revision belongs to one page key and may be the pointer target for that page key only. Shared
content receives its own page key rather than allowing unrelated page pointers to share a row.

Indexes must follow observed queries: page-key pointer lookup, revisions by page and creation time
for history, operations by idempotency key/state, and failed/pending invalidations. Verify index
use with `EXPLAIN QUERY PLAN`; do not add speculative indexes.

## Publication state machine

```text
draft
→ revision_validated
→ revision_created
→ pointer_moved
→ invalidations_queued
→ invalidations_complete
```

Recoverable delivery state:

```text
published_with_stale_cache
```

Publication integrity and cache freshness are separate:

- The D1 batch that validates the revision transition, moves the pointer, creates the publish
  operation, and records every required invalidation must succeed or roll back as one transaction.
- D1 `batch()` is the allowed transaction mechanism. Do not issue manual `BEGIN`/`COMMIT`, and do
  not use an ORM transaction abstraction that emits unsupported SQL.
- Cache invalidation happens after the pointer transaction.
- If invalidation fails, canonical D1 state remains published. Mark the operation
  `published_with_stale_cache`, record the exact failed dependency, and expose a retry control.
- Retrying invalidation uses the same publish operation. It must not create a revision, move a
  pointer, or alter publication time.
- Replaying the same idempotency key returns the original operation result.
- Reusing an idempotency key with different page/revision input is a conflict.
- Concurrent publishes for the same page must have an explicit winner rule and must preserve both
  immutable revisions. Test the pointer and `previous_revision_id` result; do not rely on timing.

Rollback is a new publish operation that moves the pointer to an existing prior revision and
queues the same dependency invalidations. It does not mutate or copy the target revision.

## Cache boundary

Define application interfaces that do not mention D1 tag-cache tables or R2 object layout:

```text
PublishedContentRepository
DraftRevisionRepository
PublishOperationRepository
PublicationDependencyResolver
ContentCacheInvalidator
ContentRevisionObserver
```

OpenNext provides the current `ContentCacheInvalidator` implementation. The content domain only
supplies paths and tags.

For this low-traffic portfolio, a D1-backed OpenNext tag cache is acceptable. Keep it in its own
binding/database. If traffic or invalidation volume outgrows it, a Durable Object tag cache must
be swappable without a content migration.

R2 stores the OpenNext incremental/render cache only. It is safe to empty. Content D1 must be
sufficient to regenerate every published page.

## Publication dependency graph

Dependencies are declared, versioned, and tested. They are not inferred ad hoc inside the editor.

Minimum examples:

```text
home.hero.title
→ path /
→ tag page:home
→ tag metadata:home

global.identity
→ path /
→ path /about
→ path /contact
→ tag global
→ tag metadata:all
→ tag structured-data:person
→ tag machine:identity

project:agentmailkit
→ path /projects/agentmailkit
→ path /systems
→ path /open-source
→ path /
→ tag project:agentmailkit
→ tag listing:projects
→ tag metadata:project:agentmailkit
→ tag structured-data:project:agentmailkit
→ tag machine:projects
→ sitemap only if URL, visibility, or publication state changed

article:<slug>
→ path /writing
→ tag article:<slug>
→ tag listing:writing
→ tag metadata:article:<slug>
→ tag structured-data:article:<slug>
→ tag machine:writing
→ sitemap only if URL, visibility, or publication state changed
```

The resolver returns the complete dependency set before the pointer transaction so the
invalidation jobs can be recorded atomically with publication.

## SEO and machine-surface contract

The architecture is SEO-safe only if implementation preserves these guarantees:

- `generateMetadata()` resolves the same published revision as the body.
- Title, description, canonical, Open Graph, Twitter data, social image selection, and page-level
  indexing controls are present in the initial HTML.
- JSON-LD is server-rendered from the same effective content and contains no draft fields,
  contradictory entities, or unsupported claims.
- Exactly one meaningful `h1` remains on every indexable page.
- Stable public URLs and descriptive ordinary `<a href>` links remain crawlable.
- `sitemap.xml` includes published visible pages only; `lastModified` reflects publication time.
- `robots.txt`, sitemap, canonicals, and redirects agree.
- Removed pages leave the sitemap and return an intentional `404`, `410`, or redirect.
- Mobile and desktop responses contain equivalent primary content.
- Markdown variants, JSON endpoints, MCP tools, `llms.txt`, agent cards, server cards, and the API
  catalog resolve through the same published pointers as human pages.
- Draft and editor paths are authenticated and `noindex`; preview hosts remain `noindex`.

There is no separate SEO copy and no post-hydration canonical mutation.

## Authentication and authorization

- Cloudflare Access is the outer gate for editor and mutation routes.
- Server code validates Access identity and audience; it does not trust a user-supplied email
  header merely because the string matches.
- Author identity is recorded from the validated Access principal.
- Public content reads require no authentication.
- Draft reads, revision history, content diffs, publish, rollback, invalidation retry, and editor
  bundles require authenticated Aria access.
- Mutation endpoints require same-origin protections and explicit method/content-type validation.
- Unauthorized editor URLs return no private state and remain `noindex`.
- Secrets live in Cloudflare secrets/bindings only.

## Migration sequence

### Phase 0: state reconstruction

- Fetch remote `main`; resolve local divergence and preserve the approved hero copy.
- Inventory every consumer of `siteCopy.ts` and every current route/output.
- Record the current production route map, Pages Functions, custom-domain behavior, project-review
  Worker route, D1 bindings, headers, redirects, Search Console baseline, and deployment process.
- Decide the disposition of provisional uncommitted CMS scaffolding from evidence.
- Capture raw HTML and machine responses for representative current routes as regression fixtures.

### Phase 1: stable content contracts

- Define page keys, stable field IDs, schemas, defaults, and dependency declarations.
- Replace array-position identifiers with semantic entity IDs.
- Make every current content consumer resolve through one typed effective-content interface while
  still returning Git defaults.
- Prove no rendered or machine surface drift before introducing D1.

### Phase 2: revision and publication core

- Add isolated local content D1 and migrations.
- Implement immutable revisions, published pointers, operations, invalidation jobs, idempotency,
  rollback, conflict behavior, and fallback resolution.
- Test with direct repository contracts before UI work.
- Seed local content from reviewed Git defaults and prove a round-trip produces identical output.

### Phase 3: OpenNext production-adapter migration

- Remove static-export-only assumptions.
- Add the supported `@opennextjs/cloudflare` adapter and current Wrangler configuration.
- Configure separate content D1, tag-cache D1, R2 incremental cache, queue/service bindings, and
  observability using generated Cloudflare environment types.
- Preserve the project-review route and all existing response headers, content negotiation,
  preview `noindex`, and well-known routes.
- Build through OpenNext and run under Wrangler's Workers runtime. `next dev` is not migration
  evidence.

### Phase 4: public content rendering

- Resolve published revisions in Server Components and route handlers.
- Use the same resolver in `generateMetadata`, JSON-LD, sitemap, markdown, JSON, MCP, and listings.
- Add revision diagnostic headers without leaking drafts.
- Configure path/tag caching and dependency invalidation.
- Verify warm cache hits do not query content D1.

### Phase 5: private inline editor

- Add authenticated draft mode and edit-mode entry/exit.
- Add stable field wrappers, structured side panels, local draft state, save draft, publish,
  rollback, history, diff, and invalidation retry.
- Load editor code only for authenticated edit mode.
- Add page settings for invisible metadata and structural fields.
- Make dirty, saving, saved, published, stale-cache, retrying, failure, and offline states explicit.

### Phase 6: migration verification

- Run the full production-adapter gate below against isolated local D1/R2/tag-cache resources.
- Seed representative failures outside the verifier's own output store and prove each instrument
  detects them before accepting its green result.
- Run an independent context-blind review against the commission, not the builder's summary.

### Phase 7: preview and cutover

- Deploy a non-indexable migration preview with isolated production-like bindings.
- Re-run the full gate against the preview.
- Export/backup content and record current Pages rollback instructions.
- Cut over the custom domain only after every gate passes and Aria approves the cutover.
- Keep the old Pages deployment recoverable until post-deployment verification closes.

## Verification gate before hosting change

### Production-adapter runtime

- `@opennextjs/cloudflare` build succeeds.
- Wrangler preview runs the generated Worker with real local D1, R2, tag-cache, queue, and service
  bindings.
- Generated Cloudflare environment types match code usage.
- No verification claim comes from `next dev`.

### Raw HTML contracts

For every public route:

- status is `200` or the intentional redirect/error;
- published body copy appears in raw HTML;
- draft copy is absent;
- title and description match the published revision;
- canonical is singular, stable, and correct;
- Open Graph and Twitter metadata agree;
- JSON-LD parses and resolves from the same revision;
- exactly one meaningful `h1` exists;
- internal links have real descriptive `href` values;
- no editor controls or editor bundle appear;
- no accidental `noindex`;
- mobile user agent receives equivalent primary content;
- `x-content-revision` matches the pointer used by body, metadata, and machine outputs.

### Publication and cache-state contracts

Required failure drill:

```text
publish revision A
→ pointer commits
→ invalidate
→ raw HTML contains A

publish revision B
→ pointer commits
→ force invalidation failure
→ operation is published_with_stale_cache
→ old cached HTML remains temporarily visible
→ published pointer resolves to B
→ retry the same operation
→ invalidation succeeds
→ raw HTML contains B
→ no second revision exists
→ no second pointer movement exists

rollback to A
→ new publish operation moves pointer to existing A
→ invalidate
→ raw HTML, metadata, JSON-LD, listings, sitemap, and mobile response resolve to A
```

Also cover:

- duplicate idempotency keys with same and conflicting payloads;
- concurrent publishes for one page;
- missing, malformed, or cross-page revisions;
- draft deletion and stale editor sessions;
- D1 read failure with Git fallback;
- content-schema version mismatch;
- partial listing, sitemap, metadata, MCP, markdown, or JSON invalidation;
- failed invalidation retry after worker restart;
- empty R2 cache regeneration;
- tag-cache loss and reconstruction;
- unavailable project-review intake dependency;
- removed/unpublished routes and intentional status behavior.

### Browser contracts

Playwright against Wrangler preview:

- JavaScript disabled still shows current published content and usable navigation.
- Normal public JavaScript causes no replacement, hydration flash, or mismatch.
- 375, 768, and 1440 widths show equivalent primary content without horizontal overflow.
- Keyboard and touch operation meet existing accessibility bars.
- Unauthenticated edit mode exposes nothing.
- Authenticated edit mode loads editor code and no public tab receives it.
- Typing changes local preview only.
- Save draft does not alter public responses.
- Publish updates the public response after invalidation.
- Rollback restores the prior revision.
- Draft/editor routes are authenticated and `noindex`.
- Retrying asynchronous invalidation uses web assertions, not arbitrary sleeps.

### Crawl and search contracts

A complete local graph crawl fails on:

- broken internal links or redirect chains;
- orphaned published pages;
- duplicate titles/descriptions where not intentional;
- missing/multiple canonicals;
- canonicals resolving to redirects/errors;
- sitemap omissions or non-indexable sitemap URLs;
- draft or editor URLs;
- query-parameter duplicates;
- missing image dimensions or useful alt text;
- inconsistent status codes;
- machine endpoints advertising absent resources.

Robots and sitemap assertions:

- drafts/editor routes are inaccessible and excluded;
- every sitemap URL follows a published pointer;
- unpublished revisions never appear;
- `lastModified` equals publication time;
- canonical and sitemap URLs agree;
- visibility/slug/publication changes invalidate listings and sitemap.

### Structured data

- Parse every JSON-LD block and validate schema-specific local contracts.
- Reject invalid JSON, contradictory entities, wrong canonical IDs, missing required fields,
  draft leakage, date mismatches, and unsupported facts.
- Test representative deployed URLs with Google's Rich Results Test after preview/production.

### Performance

Measure Wrangler preview before fixing thresholds. Starting release targets:

```text
SEO                         1.00
Accessibility               >= 0.95
Best practices              >= 0.95
Performance                 >= 0.90
Largest Contentful Paint    < 2.5s
Cumulative Layout Shift     < 0.1
Total Blocking Time         < 200ms
```

The gate must also prove:

- warm cached HTML does not query content D1;
- no editor JavaScript ships publicly;
- public HTML contains current canonical content;
- cache invalidation updates only declared dependencies;
- Lighthouse thresholds are calibrated from repeated production-runtime measurements rather than
  one lucky run.

Representative Lighthouse routes: `/`, `/about`, `/systems`, one project route, `/writing`,
and `/contact`.

### Instrument self-tests

Before trusting each verifier, seed an isolated failure and observe the expected red result:

- replace a fixture canonical with a wrong URL;
- leak a draft marker into raw HTML;
- omit one dependency invalidation;
- create an orphan fixture page;
- add contradictory JSON-LD;
- make mobile primary copy differ;
- expose the editor bundle publicly;
- force cache invalidation failure;
- corrupt a local revision payload.

Seeds must run against disposable fixtures or isolated databases, never inside the verifier's
own result directory and never against production.

## Post-deployment continuous verification

Run a smaller recurring set after cutover:

- raw HTML contracts for representative pages;
- pointer/revision/header consistency;
- sitemap, robots, canonical, and structured-data checks;
- one publish/invalidate/rollback canary in an isolated non-public page key;
- cache-hit and cache-invalidation telemetry;
- project-review intake smoke check;
- mobile-equivalence smoke check;
- Search Console inspection and sitemap coverage monitoring;
- Rich Results checks after structured-data changes.

Search Console URL Inspection reports Google's indexed state, not a live fetch. Use it as
post-deployment monitoring, never as the pre-cutover runtime gate.

## Cutover gate

The hosting change may proceed only when:

1. Remote state and approved copy are reconciled on a clean migration branch.
2. All migrations apply to isolated local resources.
3. OpenNext build and Wrangler production-runtime preview pass.
4. Content seed round-trip is output-equivalent.
5. Publication state-machine and required failure drill pass.
6. Raw HTML, metadata, JSON-LD, listings, sitemap, markdown, JSON, MCP, and mobile contracts pass.
7. Complete crawl passes.
8. Public bundle contains no editor code.
9. Lighthouse gates pass without hiding variance.
10. Project-review routing and submission behavior are preserved.
11. Rollback and invalidation retry work after process restart.
12. A context-blind independent verifier approves the evidence.
13. A preview deployment passes the same externally observable checks.
14. Aria explicitly approves custom-domain cutover.

A green GitHub/Cloudflare build is not sufficient.

## Production rollback

Before cutover, record and verify:

- the last known-good Pages deployment and custom-domain route;
- the command/dashboard path to restore it;
- exports/backups of content D1 and migration metadata;
- the previous published pointer for every migrated page;
- how to disable editor mutation routes independently;
- how to empty disposable R2 cache and rebuild from content D1;
- how to restore custom-domain routing without deleting the Worker or database.

Rollback triggers include:

- public content or metadata reading drafts/newest revisions;
- missing canonical content in raw HTML;
- editor assets or controls appearing publicly;
- project-review intake regression;
- persistent D1 reads on warm cache hits;
- unresolved pointer/body/metadata revision mismatch;
- cache invalidation unable to converge;
- custom-domain errors or materially worse mobile performance.

## Escalate if

- OpenNext's current supported configuration cannot preserve a required existing route or header.
- Cache purge requires an unapproved secret, paid resource, or account-wide permission.
- Existing project-review routing conflicts with the Worker custom-domain route.
- The current centralized copy cannot be assigned stable semantic IDs without changing public
  content or route structure.
- A content field is simultaneously shared and independently editable in ways the page-scoped
  revision model cannot represent.
- A production resource cannot be created or inspected through the connected Cloudflare account.
- Cutover would require deleting or irreversibly replacing the existing Pages project.
- Verification shows the architecture adds meaningful cold-path latency or search regressions.

## Deliverables

- Architecture decision record with final resource and dependency diagrams.
- Stable content schemas and field registry.
- D1 migrations for revisions, published pointers, operations, and invalidations.
- Content repository and swappable cache invalidation interfaces.
- OpenNext/Workers configuration with generated environment types.
- Server-rendered effective-content integration across every human and machine surface.
- Authenticated inline editor, page settings, draft mode, history, diff, publish, retry, rollback.
- Seed and rollback tooling.
- Raw HTML contract suite.
- Publication/cache-state integration suite.
- Playwright visitor/editor suite.
- Crawl and structured-data verifier.
- Lighthouse CI configuration and calibrated thresholds.
- Preview and production verification receipts.
- Migration and emergency rollback runbooks.
- Chronicle at `_meta/chronicles/2026/2026-07-29-inline-cms-opennext-migration.md`.

## Expected evidence record

The chronicle and final handoff must distinguish:

- committed;
- pushed;
- preview deployed;
- migrations applied;
- content seeded;
- custom domain cut over;
- production verified;
- post-deployment monitoring active.

Every correctness claim cites a command, response, database query, browser capture, or external
inspection with observation time. Builder self-assessment is not acceptance evidence.

## Research basis

- Cloudflare's current Next.js guide confirms OpenNext support for App Router, SSR, ISR, Server
  Actions, and streaming on Workers:
  `https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/`
- OpenNext's current caching guide defines R2 incremental cache, queues, tag-cache backends, and
  on-demand path/tag invalidation:
  `https://opennext.js.org/cloudflare/caching`
- OpenNext's performance guidance treats D1 tag cache as appropriate for small/low-traffic sites
  and keeps Durable Objects as the higher-traffic alternative:
  `https://opennext.js.org/cloudflare/perf`
- OpenNext's D1 guidance requires request-scoped binding access and the asynchronous Cloudflare
  context path for static/ISR rendering:
  `https://opennext.js.org/cloudflare/howtos/db`
- Cloudflare documents `D1Database.batch()` as a transactional sequence that rolls back the whole
  batch on statement failure:
  `https://developers.cloudflare.com/d1/worker-api/d1-database/#batch`
- Next.js documents server-side path invalidation and Draft Mode:
  `https://nextjs.org/docs/app/api-reference/functions/revalidatePath`
  and `https://nextjs.org/docs/app/api-reference/functions/draft-mode`
- The user-supplied verification brief is preserved at:
  `/Users/slowember/.codex/attachments/fcd9aee4-a3b3-4f6b-aea8-1bc82e922589/pasted-text.txt`

## Canon and learning extraction

If this succeeds, preserve:

> Editable public content needs one canonical published pointer. Drafts, caches, metadata,
> structured data, machine surfaces, and recovery defaults are consumers or delivery state,
> never competing truths.

If the migration fails, classify the failure as assumption, missing information, coordination,
prompt, planning, implementation, or verification failure, then record the smallest architectural
change that prevents recurrence.
