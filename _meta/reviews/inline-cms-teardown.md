---
type: adversarial-review
status: fixed-with-production-blocker
created: 2026-07-29
scope:
  - inline CMS content integrity
  - editor behavior
  - public SEO and machine surfaces
---

# Inline CMS adversarial teardown

Three independent reviews examined the implementation before the final
verification pass. Their findings were treated as failure hypotheses and
reproduced against code or the live preview before being accepted.

## Findings that changed the implementation

### Canonical content and publication

- Runtime fallback could return a cacheable `200` from Git defaults when D1
  was unavailable. Runtime fallback now returns a non-cacheable recovery
  response at the Worker boundary. Git defaults remain build input and
  recovery presentation only.
- Revision immutability and cross-table ownership depended on application
  code. D1 now rejects revision updates and deletes, and rejects published
  pointers whose operation, page, and target revision do not agree.
- Concurrent same-key publication could race. Publication now rereads the
  winning idempotent operation and returns it to both callers.
- Retry could act on incomplete or current-state dependencies. Every operation
  stores a frozen path and tag set plus its hash; retry validates and reuses
  that exact set.
- Convergence originally accepted a caller's observation. The server now
  fetches every canonical public path and compares both revision and
  publication IDs.

During verification, two additional convergence defects were found. Query
parameters bypassed canonical cache entries, then `cache: reload` bypassed the
normal visitor cache. Both produced false green results. Convergence now
fetches exact public URLs with normal cache behavior.

### Editor

- Editing after saving could leave an older saved revision publishable. Any
  subsequent edit clears the saved target and disables publish until the new
  draft is saved.
- Failed invalidation had no recovery control. The editor now persists the
  exact pending operation and exposes retry without creating another
  revision.
- History rows could not reload their full content. Revision history is now a
  compact list; authenticated loading fetches one selected revision.
- Stale tabs could lose work or receive a vague result. A stale publish
  conflicts, leaves the local draft intact, and requires refresh before a new
  publish.
- Full revision bodies were included in general editor state. They are now
  fetched only when the authenticated editor explicitly loads a revision.

### SEO and public output

- The isolated Worker preview was crawlable. Workers and Pages preview hosts
  now emit `X-Robots-Tag: noindex, nofollow`.
- The previous Pages MCP function was not part of the OpenNext Worker. MCP is
  now an App Router endpoint backed by the same published revision.
- Markdown content negotiation was lost in migration. The Worker restores
  `Accept: text/markdown` behavior and exposes the same snapshot diagnostics.
- Sitemap modification dates were identical. The sitemap now computes
  route-level dates from the fields relevant to each route.
- Machine responses did not expose publication identity consistently. HTML,
  JSON, Markdown, MCP, sitemap, and agent surfaces now expose the same revision
  and publication pair.
- The API catalog's media type drifted. It is restored to
  `application/linkset+json`.

## Accepted constraints

- The D1 tag cache is appropriate for this personal portfolio's traffic. Its
  adapter remains separate from the content model so it can be replaced by a
  Durable Object backend if traffic justifies it.
- Publication convergence fetches the full fixed route catalog. That is
  intentionally heavier than a partial probe, but publication is rare and a
  false green result is more expensive.
- External email delivery was not exercised. The valid project-review path was
  tested with Wrangler's local email simulator; live validation was tested
  without creating a row.

## Remaining blocker

Cloudflare Access is not configured for the editor. The preview's temporary
token is sufficient for isolated testing only. Production cutover remains
blocked until the Access application, audience, team, and allow policy are
configured for `tiredlillies@gmail.com`, preview-token authentication is
removed, and Aria explicitly approves the custom-domain cutover.

## Verdict

The portfolio implementation is ready for review on the isolated preview. The
content model, editor flows, recovery behavior, and public snapshot
consistency pass the defined gates. Production is not approved because the
authentication and explicit cutover gates remain open.
