---
type: chronicle
status: active
created: 2026-07-28
---

# Chronicle: discoverability, measured then fixed

Commission: `_meta/commissions/active/2026-07-28-discoverability.md`
Audit: `_meta/research/2026-07-28-discoverability-audit.md`

## The session started somewhere else entirely

Opened with "why hasn't Cloudflare deployed in 15 days". Answer, in one command: nothing
had merged to `main` since PR #15 on Jul 14. Four dependabot PRs and three commits sat
unmerged. Not a pipeline failure, an unpressed button.

That led to the motion ledger, which turned out to be a hand-run snapshot frozen at
2026-07-07. Made it regenerate weekly from the GitHub contribution API and commit to main,
which is what triggers the production build. First run moved 3,178 -> 3,450 commits,
33 -> 36 repos. The supplemental iOS repo lives in iCloud where CI cannot see it, so the
generator now snapshots its months to a committed file and reuses them. Without that,
every scheduled run would have quietly shaved 16 commits off the total. That pattern,
"the automation degrades silently rather than failing", showed up twice more today.

## The audit, and being wrong out loud

The brief was to find why the site was undiscoverable, with an explicit instruction: prove
every claim, use the instruments, do not construct a plausible explanation.

Good instruction. The stated premise did not survive it. Searching `ariaxhan` in a real
browser put ariaxhan.com at #1, above Instagram, Devpost, GitHub, Medium and LinkedIn.
`"aria han" ai` returned #1 with sitelinks. PyPI did not appear at all. The thing everyone
believed was happening was not happening.

What was actually wrong only showed up because the instruments were pointed at it:

- `ai implementation specialist los angeles` returns 20 of 20 job listings. The site's
  entire indexable identity was built on a phrase Google reads as hiring intent.
- No Search Console. `dig TXT ariaxhan.com` empty, no verification tag, and Google's own
  SERP was displaying the "do you own this domain" promo.
- 3 of 11 pages missing from the index, including `/open-source/`.
- Zero commercial schema. `/about/` had no structured data at all.
- Roughly 15 project narratives rendered inside click-to-open modals, so the best writing
  on the site had no URLs and could not rank.
- Mobile LCP 4.1s, in the poor band, caused by 326ms of render-blocking CSS totalling 10KB.
- CSP with no `img-src`, so `default-src 'self'` was blocking the site's own grain texture
  and logging a security error on every single page load.

Structured data validated clean, canonicals were correct, redirects were correct, and the
agent layer (llms.txt, markdown negotiation, the .well-known cards) was genuinely ahead of
anything comparable. Wrote those down as "do not touch" so a later pass does not helpfully
break them.

## The fixes, and the one that lied

Repositioned to "AI consultant". New `/projects/<slug>/` route: 15 narratives that only
existed behind a modal became real pages, sitemap 11 -> 26 URLs. Added ProfessionalService
with an OfferCatalog, ProfilePage, BreadcrumbList, per-project SoftwareApplication,
`alternateName: ariaxhan` (which appeared zero times as visible text on a site competing
against five profiles that all rank for exactly that string). Email and profiles moved to
the homepage, large. CSP, robots.txt, preview noindex, referrer policy, inlineCss.

Merged, waited for the rollout, and checked production rather than the commit. Two things
came back wrong.

The first was a phantom: the sitemap briefly served 11 URLs while the HTML already served
the new build. Cloudflare's rollout is not atomic across assets. Spent several steps
building a theory about a circular import before re-fetching and finding 26. Re-poll
before diagnosing.

The second was real, and it is the one worth keeping. `app/sitemap.ts` derived `lastmod`
from `git log` per route. Locally: three distinct dates, exactly right. On Cloudflare: one
identical timestamp on all 26 URLs, because the build clone has no usable history, so
every lookup fell through the `catch` to `new Date()`. The build was green. The XML was
well-formed. The fix for "lastmod carries no information" had shipped still carrying no
information, and it looked correct from every angle except the deployed artifact.

Moved the computation to `scripts/content-dates.mjs`, run where history exists, committed
as JSON, read by the build. The generator now **refuses to write** when every route
collapses to a single date and tells you the clone is shallow. The failure class was not
"git was unavailable", it was "the fallback was silent". A fallback that produces
plausible output is worse than a crash.

## Codex

Dispatched the agentmailkit plate illustration to `codex exec --full-auto` with a full
art-direction spec. Killed it at 23 minutes: no file, no output, no progress signal
because stdout was buffered behind a pipe. Drew the SVG inline in under five minutes.
For one self-contained artifact with a tight spec, the dispatch overhead is the whole cost.

## Where it stands

Live and verified on production: title, project pages, schema, headers, `x-robots-tag` on
`.pages.dev`, `img-src`, content-signal header, Elsewhere block. GSC is verified by DNS
TXT. Outstanding items all need a human at a login: submit the sitemap, request indexing
for the three missing pages, unify six profile bios onto one title, point PyPI
`project_urls` at the site, add the `www` DNS record.

## The lesson, stated plainly

Two of today's three real defects were things that looked fine. The stale motion ledger
looked fine because the page rendered. The broken `lastmod` looked fine because the build
was green. The discoverability problem itself had a confident explanation that was simply
false. Everything here was found by pointing an instrument at the running system, and
nothing was found by reasoning about the code.
