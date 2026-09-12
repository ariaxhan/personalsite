---
name: ariaxhan-site
description: Work on ariaxhan.com (personalsite-inline-cms: Next.js 15 on OpenNext + Cloudflare Workers, content in D1 behind an inline CMS). Load for any change to projects, essays, the constellation, publication, or a deploy. Trigger on "add a project to my site", "update my portfolio", "publish the site", "cms preview", "ariaxhan.com is wrong", "deploy personalsite".
---

# ariaxhan.com

Content is not copy. It is a versioned catalog in D1 with a content hash and an immutable
publication history; the source of truth is `app/content/defaultContent.ts`, and production
serves whatever was last published from it.

## Orient (every time)

```bash
git status -sb                      # production has run an UNMERGED feature branch before; check which
curl -sI https://ariaxhan.com | grep -iE 'x-content-revision|x-publication'
npm test                            # vitest: schema, guards, sitemap history, public routes
```

## Rules that came from breakage

- **A project addition is a schema migration, not a copy edit.** Live D1 content must match the
  exact source-defined project array shape (`canonicalizeContent`, `editablePaths`). Ship it as
  `migrations-content*/NNNN_*.sql` plus the source change, never by editing D1 by hand.
- **Catalog migrations accept the exact current slug sequence and the exact previous one.**
  That is what lets the old snapshot stay valid during an atomic publish. Do not widen it.
- **Publication history must accept every historical catalog shape**, removed templates
  included; `tests/sitemap-history.test.ts` revalidates old snapshots against current code. Two
  catalog migrations in a row without this turned valid old revisions into 503s.
- **Assert the canonical content hash immediately before the D1 write.** Another agent editing
  the shared tree between check and write (a Medium refresh did) leaves a transient revision
  that fails closed across routes.
- **Constellation:** every slug needs a position; missing ones silently shrink both the map and
  its text index. Clamp x so a 120px label fits at 390px (x=91% clips). Verify DOM node count
  against source count separately; a filtered map advertised 21 and rendered 19.
- **Deploy:** stop `wrangler dev` first; its watcher races `opennextjs-cloudflare build` on
  `.next` and `.open-next` and deletes the routes manifest. Deploy from a tree with real
  `node_modules`, never a worktree with symlinked ones.
- **Scope:** portfolio refreshes are projects only unless Aria says otherwise; founder
  positioning copy stays untouched (2026-08-28).

## Commands

```bash
npm run cf:local:prepare            # local D1 + CMS
npm run cms:seed-sql                # content seed from source
npm run cf:preview                  # cms-preview.ariaxhan.com shape, locally
npm run verify:publication          # publication flow end to end
npm run verify:preview              # public output
npm run cf:deploy                   # OpenNext build + wrangler deploy (routes: ariaxhan.com, cms-preview.ariaxhan.com)
```

## Done means

`npm test` green, `verify:publication` green, deployed, and `curl -sI https://ariaxhan.com`
shows the new revision header. Say which of those you actually ran.
