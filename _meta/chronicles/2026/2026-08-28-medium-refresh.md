---
type: chronicle
status: active
created: 2026-08-28
---

# Three new Medium essays shipped without changing other live content

**What mattered:** The live site now serves 21 articles and preserves all 20 projects from one canonical D1 publication.

**Shipped**
- `d96ded3` on `main`; Worker `75620428-f9db-4868-ba33-67a280e6d6ed`; revision `rev_medium_b75ac51259db411b9c96`.

**Verified how:** Tests 37/37, lint, build, 31 HTML routes, 25 machine routes, and three independent public probe rounds passed on `ariaxhan.com`; production working.

**Wrong or surprising**
- Historical 18-article revisions broke sitemap validation until the validator accepted the exact previous catalog.
- First deploy failed before upload because symlinked `node_modules` broke OpenNext bundling; canonical worktree deploy succeeded.
- One cache-tag write hit Cloudflare auth error 7403; authenticated retry succeeded.

**Open:** None.
