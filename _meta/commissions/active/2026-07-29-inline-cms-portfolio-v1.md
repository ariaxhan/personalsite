---
type: commission
status: active
created: 2026-07-29
supersedes:
  - _meta/commissions/active/2026-07-29-inline-cms-opennext-migration.md
related:
  - _meta/plans/editable-site-commercial-roadmap.md
---

# Commission: inline CMS for ariaxhan.com, portfolio v1

## Outcome

Aria can edit the existing words on ariaxhan.com, preview privately, save a
draft, publish, and restore a prior version without editing code or starting a
deployment.

Visitors receive current published content in the initial HTML. Body,
metadata, structured data, listings, and machine surfaces use one consistent
content snapshot. Drafts and editor code never enter ordinary public requests.

This is the smallest reliable portfolio implementation. It may become the
first reference implementation of the commercial product described in the
related roadmap, but product-platform features have no authority here.

## Authority and boundaries

After Aria explicitly approves execution, the runner may migrate the site from
static Pages export to the supported OpenNext Workers runtime; add content D1
and required cache resources; refactor content consumers; add publication,
rollback, recovery, verification, and an Aria-only editor; and deploy an
isolated `noindex` preview.

Production custom-domain cutover requires separate approval after every gate
passes.

Hard boundaries:

- This documentation pass does not authorize implementation.
- Preserve approved copy, design, public routes, headers, and machine surfaces.
- Preserve the project-review Worker, D1 data, notification behavior, and
  recovery path.
- Do not modify external profiles or services outside the migration preview.
- Keep secrets and account identifiers in Cloudflare bindings or secrets.
- Do not add teams, billing, multiple sites, generalized adapters, or customer
  onboarding.

## Portfolio scope

Editable:

- prose and records currently centralized through `siteCopy.ts`;
- current page and project metadata;
- current structured-data text and social-image selection;
- navigation, calls to action, service framing, and contact copy;
- existing project and article records.

Fixed in code:

- routes, slugs, canonicals, redirects, and removed-page behavior;
- components, layouts, and visual design;
- schemas, field identifiers, and dependency declarations;
- authentication policy and infrastructure configuration.

Deferred to the commercial roadmap:

- multiple users, roles, workspaces, and sites;
- repository scanning and automatic installation;
- other frameworks, databases, hosts, and authentication providers;
- rich-text or layout builders;
- editable routes, arbitrary pages, localization, scheduling, billing, and a
  public SDK.

## Truth model

```text
checked-in defaults
        ↓ seed and recovery presentation

content D1
        ↓
published_content pointer
        ↓
immutable content revision
        ↓
request-level revision manifest
        ↓
server-rendered response
        ↓
OpenNext / Cloudflare cache
```

- Content D1 is canonical after cutover.
- Checked-in defaults are seed input and recovery presentation, never a second
  successful published state.
- `published_content` is the only public publication authority.
- Revision rows never mutate.
- An unpointed revision is a draft. A pointed revision is currently published.
- Publication history belongs to publish operations.
- Public rendering never queries by newest revision or draft state.
- Cache objects are disposable and warm public hits do not query content D1.

## Identity and response consistency

Stable page keys include `global`, `home`, current page names, and fixed
`project:<slug>` or `article:<slug>` identities. Slugs are not editable in v1.

Field IDs describe meaning, not layout:

```text
home.hero.title
project:agentmailkit.thesis
project:agentmailkit.body.automation-origin
```

A response may consume several page keys. Resolve every required pointer once
per request and memoize the complete manifest:

```json
{
  "global": "rev_global_01",
  "home": "rev_home_03",
  "project:agentmailkit": "rev_project_07"
}
```

Body, metadata, JSON-LD, listings, sitemap state, markdown, JSON, MCP, and agent
surfaces use that same manifest. A deterministic hash of sorted
`page_key → revision_id` pairs identifies the response snapshot in tests and
diagnostics.

Expose the snapshot through a header or cached HTML marker only if the adapter
preserves it without an extra request-time D1 read.

## Data model

```sql
content_revisions
- id TEXT PRIMARY KEY
- page_key TEXT NOT NULL
- parent_revision_id TEXT NULL
- base_published_revision_id TEXT NULL
- content_json TEXT NOT NULL
- content_schema_version INTEGER NOT NULL
- content_sha256 TEXT NOT NULL
- created_at TEXT NOT NULL
- author_id TEXT NOT NULL

published_content
- page_key TEXT PRIMARY KEY
- revision_id TEXT NOT NULL
- updated_at TEXT NOT NULL
- publish_operation_id TEXT NOT NULL

publish_operations
- id TEXT PRIMARY KEY
- page_key TEXT NOT NULL
- target_revision_id TEXT NOT NULL
- expected_revision_id TEXT NULL
- previous_revision_id TEXT NULL
- idempotency_key TEXT NOT NULL UNIQUE
- request_fingerprint TEXT NOT NULL
- dependency_set_json TEXT NOT NULL
- dependency_set_sha256 TEXT NOT NULL
- state TEXT NOT NULL
- created_at TEXT NOT NULL
- pointer_moved_at TEXT NULL
- invalidation_dispatched_at TEXT NULL
- convergence_observed_at TEXT NULL
- last_error TEXT NULL
```

Database rules:

- enforce foreign keys and same-page ownership in D1;
- hash canonical JSON with stable key order and documented Unicode
  normalization;
- prohibit stored raw HTML;
- bound payload size, nesting depth, and array lengths;
- prove the final schema and constraints in the real D1 runtime.

No invalidation-job table is required initially. Store the frozen dependency
set on the publish operation so retry uses the exact original work. Add
per-dependency jobs only if observed partial failures require them.

## Draft, publish, retry, and rollback

Saving creates an immutable revision and records the published revision on
which the edit began. It does not change public output.

Publishing includes:

```text
page_key
target_revision_id
expected_current_revision_id
idempotency_key
request_fingerprint
```

Publishing must:

1. validate the target revision and same-page ownership;
2. freeze the affected dependency set;
3. succeed only if the pointer still matches the editor's expected revision;
4. move the pointer and record one truthful operation;
5. dispatch invalidation after canonical publication;
6. observe representative output before declaring convergence.

A zero-row conditional update followed by post-batch inspection is not
acceptance evidence. A stale expected pointer must fail without leaving a
successful operation or misleading pointer metadata. Prove the mechanism in
actual D1 before relying on it.

Replaying the same idempotency key and fingerprint returns the original result.
The same key with a different fingerprint is a conflict. A stale editor keeps
its draft and must refresh before publishing.

If invalidation fails after publication:

```text
published_with_stale_cache
```

The pointer remains canonical. Retry uses the same operation and frozen
dependencies. It does not create a revision or move the pointer again.
Invalidation dispatched and convergence observed are distinct states.

Rollback is a new publish operation targeting an existing prior revision. It
uses the same conflict, invalidation, retry, and convergence rules.

## Recovery

```text
warm valid cache
→ serve last known-good output

cold regeneration + temporary D1 failure
→ render checked-in recovery presentation
→ 503 + Retry-After + no-store
→ never write recovery into incremental cache

missing, cross-page, malformed, or schema-invalid canonical revision
→ controlled non-cacheable failure/recovery response
→ alert

unseeded page before cutover
→ reviewed Git default may return 200 in migration preview only
```

The custom domain cannot cut over while any known page depends on the
pre-cutover exception.

## Runtime and cache

Logical boundaries are fixed:

```text
content truth       → content D1
published lookup    → published_content
cache bookkeeping   → supported OpenNext tag cache
rendered output     → disposable incremental cache
draft behavior      → authenticated mode only
```

Select exact D1, R2, queue, and service bindings from the installed supported
OpenNext adapter. A queue is not a domain requirement when the selected
revalidation mode does not require one.

A separate D1 tag cache is acceptable for this portfolio if supported by the
pinned adapter. Keep it outside content D1. Do not build a general adapter
framework before another real integration exists.

Dependency declarations remain versioned code. Store their resolved set and
hash with each publish operation.

## Authentication and editor

- Enter through a protected route such as
  `/__editor/enter?return=/about`, not a public `?edit=true` cache variant.
- Validate the Cloudflare Access assertion's signature, issuer, audience,
  expiry, and principal.
- Draft mode is private and always `noindex, nofollow`.
- Mutations require same-origin, method, and content-type checks.
- Keystrokes update local state only.
- Short plain text may edit in place; prose, lists, links, and records use typed
  side controls.
- Ordinary navigation never references, preloads, requests, or executes editor
  code.

The editor needs draft save, discard, history, restore, publish, conflict, and
invalidation retry. It does not need teams, comments, approvals, arbitrary
HTML, or page-layout editing.

## SEO and public-output contract

- Current published content is present in the first HTML response.
- Body, metadata, JSON-LD, listings, sitemap, and machine routes use the same
  request-level manifest.
- Canonicals remain stable and never change after hydration.
- Existing routes and descriptive links remain crawlable.
- Draft and editor paths expose nothing and remain `noindex`.
- Mobile and desktop contain equivalent primary content.
- Sitemap membership follows fixed routes and published visibility.
- `lastModified` reflects the latest significant public change to that URL,
  not every shared label edit.
- One meaningful `h1` remains a site house rule.

## Milestone A: canonical public platform

Accept this before building the editor:

1. Reconstruct current remote, deployment, route, header, copy, and
   project-review state.
2. Inventory every content consumer and assign stable page and field keys.
3. Put human and machine consumers behind one typed content interface while
   still returning Git defaults.
4. Add revisions, pointers, publish operations, rollback, conflict, and
   recovery.
5. Seed isolated D1 and prove output-equivalent round trips.
6. Migrate to pinned OpenNext and configure only proven resources.
7. Render every public consumer from one request-level manifest.
8. Implement deterministic invalidation, retry, and convergence observation.
9. Pass the public verification gate in Wrangler and on a protected
   Cloudflare-zone preview hostname.

A protected test route or command may exercise publication. No editor UI is
required for Milestone A acceptance.

## Milestone B: Aria-only editor

After independent Milestone A acceptance:

1. add protected editor entry and Draft Mode;
2. add field wrappers, typed controls, and local unsaved state;
3. add save, discard, history, restore, publish, and retry;
4. make conflict, stale-cache, convergence, retry, and failure visible;
5. prove public requests contain no editor behavior;
6. pass editor verification on the same preview.

## Verification

Production-runtime proof:

- build through pinned `@opennextjs/cloudflare`;
- run under Wrangler's Workers runtime with isolated real bindings;
- exercise first render, warm hit, invalidation, regeneration, and restart;
- prove response diagnostics survive caching or use cached HTML markers;
- prove zone-level purge on a protected `noindex` hostname.

Public proof:

- published copy in raw HTML and draft copy absent;
- one response manifest across body, metadata, JSON-LD, listings, and machine
  output;
- correct status, canonical, indexing state, and crawlable links;
- no editor request during ordinary navigation;
- equivalent primary content at 375, 768, and 1440 widths;
- no material accessibility, performance, or mobile regression;
- complete fixed-route crawl;
- preserved project-review submission and notification behavior.

Required failure drills:

1. Publish A and observe A.
2. Publish B, force invalidation failure, retry the same operation, and observe
   B with no duplicate revision or pointer movement.
3. Roll back to A across every public consumer.
4. Race two stale publishes and prove the loser leaves no false success state.
5. Exercise same and conflicting idempotency fingerprints.
6. Corrupt or cross-wire a revision and prove it cannot become a cacheable 200.
7. Force a cold D1 failure and prove recovery is `503`, `no-store`, and absent
   from incremental cache.
8. Restart between invalidation failure and retry.
9. Empty disposable cache and regenerate from canonical D1.
10. Preserve project-review behavior.

Editor proof:

- unauthenticated entry exposes nothing;
- authenticated entry validates Access and enables private draft mode;
- typing is local and draft save does not change public output;
- stale tabs retain drafts and receive a conflict;
- publish, restore, and retry survive Worker restart;
- ordinary public navigation never requests editor code.

Before trusting each critical verifier, seed an isolated defect and observe the
expected failure. Use disposable fixtures or databases outside the verifier's
own output store.

`next dev`, a green build, and aggregate Lighthouse scores are supporting
signals, not substitutes for production-runtime, raw-HTML, cache, and
publication evidence.

## Cutover and rollback

Cutover requires:

1. clean branch reconciled with remote `main` and approved copy;
2. independent acceptance of both milestones;
3. output-equivalent seed round trip;
4. every failure drill passing;
5. public HTML, metadata, machine, crawl, mobile, cache, and editor-isolation
   contracts passing;
6. preserved project-review intake;
7. protected zone preview passing external invalidation checks;
8. exported D1 content and pointer manifest;
9. exercised Worker rollback, editor-disable, and cache rebuild;
10. context-blind evidence review;
11. Aria's explicit custom-domain approval.

Rollback order:

1. freeze publishing and export current pointers and revisions;
2. roll back Worker code while preserving current content D1;
3. disable editor mutations independently if needed;
4. regenerate disposable cache from current D1;
5. restore old Pages hosting only if content loss to its static snapshot is
   accepted or after creating an emergency static snapshot from current D1.

Infrastructure rollback must not silently discard content published after
cutover.

## Product-compatible seams

Keep typed schemas, resolution, revision persistence, publication, dependency
calculation, cache invalidation, authentication, and editor presentation as
separate modules.

Do not turn those modules into public plugin systems yet. Another real site or
provider must expose the actual differences before abstraction.

## Done

Aria can edit, save, publish, verify, and restore portfolio content without a
deployment. Visitors and crawlers receive consistent published content in the
first response. The current site and project-review intake are preserved.
Recovery cannot replace canonical content with a cached lie. Production has
passed the explicit cutover gate.
