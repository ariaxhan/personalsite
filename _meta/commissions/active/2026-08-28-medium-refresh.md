---
type: commission
status: complete
created: 2026-08-28
---

# Commission: refresh Medium writing

## Outcome

The three Medium essays published since the last sync appear in the site’s writing archive, homepage highlights, checked-in recovery content, and canonical D1 publication.

## Acceptance

- Titles, links, themes, excerpts, and read times match the live Medium feed.
- Existing published content changes only under `articles`.
- Historical revisions remain valid for sitemap date calculation.
- Public HTML and machine surfaces resolve one new revision and publication.
- The update reaches `main`; unrelated working-tree edits remain untouched.

## Evidence

- `d96ded3` merged to `main`; Worker version `75620428-f9db-4868-ba33-67a280e6d6ed`.
- Live revision `rev_medium_b75ac51259db411b9c96`; publication `pub_medium_b75ac51259db411b9c96`.
- 37 tests, lint, build, 31 HTML routes, 25 machine routes, and independent live verification passed.
