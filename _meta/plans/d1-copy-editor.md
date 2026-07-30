---
type: plan
status: superseded
created: 2026-07-29
superseded_by:
  - _meta/commissions/active/2026-07-29-inline-cms-portfolio-v1.md
---

# D1 copy editor

> Superseded. This early sketch predates the reviewed recovery, publication,
> and product-scope split. It is preserved only as design history.

## Contract

- Goal: edit site prose in place and publish without a code deploy.
- Keep: committed copy as the emergency fallback.
- Runtime: published D1 revisions are canonical; cached rendered HTML is disposable.
- Safety: cached pages do not query D1, and a failed D1 read falls back to Git defaults.
- Access: writes require Cloudflare Access identity `tiredlillies@gmail.com`.
- Done when: publish invalidates affected paths, the next request renders current D1 copy into
  indexable HTML, subsequent requests hit cache, and failed D1 reads use Git defaults.

## Chosen approach

Cached server rendering plus private inline editing:

1. A server component combines Git defaults with the published D1 revision.
2. Next and Cloudflare cache the rendered HTML.
3. Ordinary visitors receive finished HTML and no editor bundle.
4. Authenticated edit mode adds local draft controls to that same page.
5. Publish promotes one revision and invalidates its affected paths.

This keeps warm page loads independent of D1 while keeping current content directly indexable.

## Rejected

- Background snapshot builds: two publishing systems and a temporary canonical-content split.
- Public browser overrides: content flash, extra JavaScript, and indexing ambiguity.
- Query D1 on every request: unnecessary because published pages change infrequently.

## Required production configuration

- Cloudflare Workers deployment through the OpenNext adapter.
- Existing content D1 binding `DB`.
- R2 incremental cache and the OpenNext tag-cache bindings required for on-demand revalidation.
- Cloudflare Access protection on `/copy-editor*` and write requests.
