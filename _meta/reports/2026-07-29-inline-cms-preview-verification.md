---
type: verification-report
status: preview-passed-production-blocked
created: 2026-07-29
commission:
  - _meta/commissions/active/2026-07-29-inline-cms-portfolio-v1.md
---

# Inline CMS preview verification

## Current deployment

- Preview Worker:
  `https://personalsite-cms-preview.ariaxhan.workers.dev`
- Content store: `personalsite-cms-content-preview`
- OpenNext tag cache: `personalsite-cms-tags-preview`
- Incremental cache: `personalsite-cms-cache-preview`
- Project-review store: `personalsite-cms-review-preview`
- Canonical page key: `site`
- Canonical published revision at final verification:
  `rev_seed_fabe3e2ea184c102a6c9`

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

- TypeScript, ESLint, nine Vitest checks, and the pinned OpenNext production
  adapter build pass.
- Wrangler startup analysis succeeds with the custom Worker entrypoint and
  the OpenNext Durable Object export.
- A 38-route remote crawl returns no failure.
- Raw homepage HTML contains the approved hero, subtitle, canonical, JSON-LD,
  D1 revision marker, and existing security and discovery headers.
- Mobile and desktop responses contain equivalent primary content.
- Public HTML contains no editor chunk reference.
- Unauthenticated `/edit/` returns `404`.
- `/edit/login/` is `noindex`, `nofollow`, and `private, no-store`.
- The authenticated editor exposes 1,114 editable text controls plus search,
  immutable draft save, publish, discard, history, and restore.
- Project-review validation returns the expected `400` without writing or
  sending email. A prior local Workers-runtime submission exercised D1 and
  the local Email binding without sending external email.
- At 375, 1280, and 1440 pixel viewports, measured document width stays
  within the viewport and the hero heading fits.

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

Cold content failure was exercised in a fresh Wrangler Workers runtime with an
empty D1 state. The first recovery implementation failed the verifier by
returning a plain `500`; it was replaced at the Worker response boundary.
Two consecutive requests then returned:

```text
503 Service Unavailable
Cache-Control: private, no-store
Retry-After: 60
X-Content-Source: git-recovery
X-Robots-Tag: noindex, nofollow
```

Both requests re-entered the failing render path, so the recovery response was
not served as an incremental-cache hit.

## Remaining cutover blocker

Cloudflare Access is not configured. The Workers account is reachable, but
Cloudflare One rejects the browser's current dashboard identity for that
account. Production needs:

- an Access application for the editor path;
- the application audience in `CMS_ACCESS_AUD`;
- the account team name in `CMS_ACCESS_TEAM`;
- an allow policy for `tiredlillies@gmail.com`;
- removal of preview-token authentication;
- the explicit production custom-domain approval required by the commission.

No production route, external profile, or email delivery was changed during
this preview pass.
