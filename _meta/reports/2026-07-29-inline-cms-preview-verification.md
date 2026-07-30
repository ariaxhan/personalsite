---
type: verification-report
status: preview-authenticated-verified-production-blocked
created: 2026-07-29
commission:
  - _meta/commissions/active/2026-07-29-inline-cms-portfolio-v1.md
---

# Inline CMS preview verification

## 2026-07-30 inline editor update

The preview now uses the portfolio itself as the editor. An authenticated
request to `https://cms-preview.ariaxhan.com/?edit=true` renders the existing
page layout and loads the editor overlay only on that private route.
Double-clicking matching visible copy edits it in place.

Saving is deliberately manual:

- typing, blur, and idle time update browser memory only;
- **Save draft** is the only action that writes an immutable revision;
- **Publish** is a separate explicit action and is disabled after any newer
  unsaved edit;
- no autosave, debounce, timer, or background draft write exists.

Cloudflare Access now protects `/edit/start/*` with an exact-email allow policy
for `tiredlillies@gmail.com` and `ariaxhan@gmail.com`. Unauthenticated requests
reach the Access login, and the Worker validates the resulting assertion
against the same two-address allowlist before serving editor state or accepting
mutations.

Preview Worker version:
`d19b46f9-83e0-428c-a475-790cb1993024`.

Current local and live proof:

- 30 Vitest checks, ESLint, TypeScript, generated binding types, OpenNext
  production build, and Worker startup analysis pass;
- the live verifier passes 26 HTML routes, 25 machine routes, Markdown
  negotiation, MCP, preview noindex, and unauthenticated private-route
  isolation;
- the verifier's seeded self-test detects heading, canonical, JSON-LD,
  sitemap, media-type, preview-indexing, and mixed-snapshot defects;
- a browser edit followed by an idle wait left the revision count and
  published pointer unchanged;
- attempting to publish a newly active edit over an older saved draft was
  rejected until the new copy was explicitly saved;
- all three adversarial re-reviews returned `PROCEED`.

The authenticated remote mutation drill completed through Cloudflare Access
with `ariaxhan@gmail.com`. Typing and waiting left the database at 14
revisions. **Save draft** created revision
`rev_d8f5b3bf-eae1-478b-8f01-be532525c55c` while the published pointer remained
on the seed. **Publish** moved the pointer once, and the full live verifier
passed at
`rev_d8f5b3bf-eae1-478b-8f01-be532525c55c:pub_fc6c5ad6-9c24-4fe7-93fe-61d0d643e0fc`.
The exact original copy was then saved and published again. Desktop and mobile
initial HTML both resolve the restored snapshot
`rev_99b651c0-5e71-4b61-8c7a-c6d7eb52c390:pub_35d41b73-0ea5-466b-830a-c86b751d93b8`,
and neither contains the temporary test marker.

The Safari redirect loop was traced to the Worker handoff cookie using
`SameSite=Strict` after Cloudflare Access returned from a different site. The
cookie now uses `SameSite=Lax`, which permits the top-level login return while
remaining `HttpOnly` and `Secure`. A fresh emailed code completed the full
redirect into the inline editor.

Production remains untouched, and Phase-B migration `0004` remains outside the
active migration directory.

## Current deployment

- Preview Worker:
  `https://personalsite-cms-preview.ariaxhan.workers.dev`
- Content store: `personalsite-cms-content-preview`
- OpenNext tag cache: `personalsite-cms-tags-preview`
- Incremental cache: `personalsite-cms-cache-preview`
- Project-review store: `personalsite-cms-review-preview`
- Canonical page key: `site`
- Canonical published revision at final verification:
  `rev_99b651c0-5e71-4b61-8c7a-c6d7eb52c390`
- Canonical publication at final verification:
  `pub_35d41b73-0ea5-466b-830a-c86b751d93b8`
- Preview Worker version used for the authenticated editor drill:
  `d19b46f9-83e0-428c-a475-790cb1993024`

Production `https://ariaxhan.com` remains on the pre-migration deployment.

## Deployment path

```text
npm run cf:build
OPEN_NEXT_DEPLOY=true wrangler deploy
authenticated same-revision invalidation
poll public HTML revision marker
mark publish operation converged
```

`OPEN_NEXT_DEPLOY=true` is intentional. Wrangler otherwise delegates back to
the OpenNext deploy command, which repopulates R2 with build-time Git-default
pages. A deploy must not replace canonical D1 output with those recovery
artifacts.

## Verified behavior

- TypeScript, ESLint, 13 Vitest checks, and the pinned OpenNext production
  adapter build pass.
- Wrangler startup analysis succeeds with the custom Worker entrypoint and
  the OpenNext Durable Object export.
- A remote verifier passes 26 HTML routes, 25 machine routes, Markdown
  negotiation, MCP, and private-route isolation. Its seeded-failure self-test
  catches both a missing `h1` and a missing snapshot marker.
- Raw homepage HTML contains the approved hero, subtitle, canonical, JSON-LD,
  D1 revision marker, and existing security and discovery headers.
- Every public route resolves the same revision and publication ID across
  HTML, metadata, JSON-LD, sitemap, Markdown, JSON, MCP, and agent surfaces.
- Worker preview routes emit `X-Robots-Tag: noindex, nofollow`; production
  canonicals remain in the initial HTML.
- Public HTML contains no editor chunk reference.
- Unauthenticated `/edit/` returns `404`.
- `/edit/login/` is `noindex`, `nofollow`, and `private, no-store`.
- The authenticated editor exposes 1,114 editable text controls plus search,
  immutable draft save, publish, retry, discard, history, load, and restore.
- A browser drill proved that saving a draft leaves public output unchanged,
  loading that draft restores the edit, publishing exposes it, and restoring
  the seed removes it.
- Two authenticated editor tabs proved optimistic concurrency: the first
  publish succeeded, the stale second publish conflicted, and the losing tab
  retained its draft.
- Project-review validation returns the expected `400` without writing or
  sending email. Submission count remained zero before and after the live
  invalid request. A valid local Workers-runtime submission wrote one D1 row
  and was captured by Wrangler's local email simulator; no external email was
  sent.
- At 375, 768, and 1440 pixel viewports, measured document width stays within
  the viewport, no visible element crosses the horizontal boundary, and the
  headline fits.

## Failure drills

Remote preview publication exercised:

```text
publish A
publish B with seeded invalidation failure
observe stale A
replay same idempotency key
reject changed fingerprint
reject stale writer
retry original operation
observe B
restore seed revision
observe seed revision
```

The drill created no duplicate revision and left the seed revision canonical.

The same publication flow also passed:

- two concurrent requests with one idempotency key returned one operation;
- a changed request fingerprint conflicted;
- two stale writers produced exactly one winner;
- retry reused the original operation and frozen dependency set;
- a Worker restart between invalidation failure and retry did not create a
  second revision or operation;
- rollback moved the pointer through a new publish operation and converged.

Remote D1 contains immutable revision triggers plus insert and update guards
that require the published pointer's operation, page, and target revision to
agree. A real remote revision update was rejected with
`content_revision_immutable`.

Cache recovery was exercised through the production OpenNext adapter under
Wrangler's Workers runtime. A warm cached page continued returning the last
valid D1 snapshot after the canonical pointer was replaced by an invalid
revision. With both the packaged cache and local R2 state empty, two
consecutive cold requests then returned:

```text
503 Service Unavailable
Cache-Control: private, no-store
Retry-After: 60
X-Content-Source: git-recovery
X-Robots-Tag: noindex, nofollow
```

Both requests re-entered the failing render path, so the recovery response was
not served as an incremental-cache hit. A separate empty-cache run with valid
D1 regenerated the published page and populated local R2.

## Remaining cutover blocker

Cloudflare Access and the authenticated remote mutation drill are complete on
the isolated preview. Production still requires the explicit custom-domain
approval defined by the commission. The temporary preview-token path remains
enabled only on the isolated Worker and is not an acceptable production
authentication mode.

No production route, custom domain, external profile, or external email
delivery was changed during this preview pass.
