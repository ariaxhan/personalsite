---
type: chronicle
status: active
created: 2026-08-28
---

# Three new Medium essays shipped without changing other live content

**Attempted:** Refresh the Medium section from the live feed. **Changed:** Added three essays, preserved 20 projects, supported the exact prior 18-article revision, merged `d96ded3` to `main`, deployed Worker `75620428-f9db-4868-ba33-67a280e6d6ed`, and published `rev_medium_b75ac51259db411b9c96`.

**Live verification:** `npm run verify:preview -- 'https://ariaxhan.com'` passed 31 HTML routes, 25 machine routes, Markdown negotiation, MCP, and private isolation. An independent verifier ran three direct public probe rounds: all seven surfaces returned 200 with the canonical revision/publication, 21 articles, and 20 projects.

**Failed:** Historical 18-article revisions initially broke sitemap validation; an isolated-worktree deploy failed before upload because symlinked `node_modules` broke OpenNext bundling; one cache-tag write hit transient Cloudflare error 7403. All were corrected and reverified.

**Deferred:** None. **Disagreement:** None.
