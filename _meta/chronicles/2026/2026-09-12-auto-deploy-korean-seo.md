# 2026-09-12 · auto-deploy, Korean locale, SEO

**Attempted:** make the weekly GitHub stats reach production, then ship the Korean copy and new masthead, then fix SEO for Google and Naver.

**Changed (all on main, all live):**
- `deploy.yml`: build, upload Worker version at 0%, probe with version override, promote or keep current, verify stats. Called after the weekly `proof-of-motion` refresh. Repo secret `CLOUDFLARE_API_TOKEN`, variable `CLOUDFLARE_ACCOUNT_ID`.
- D1 content published from source twice: `rev_git_c2caecaa` (stats + timeline copy), `rev_git_96b32d9c` (masthead groups, Korean-era copy).
- Korean port of the uncommitted feat/founder-positioning tree onto the CMS (`923f674`): `useSiteCopy` returns published CMS content for EN and `siteCopy.ko.ts` for KO; 5 projects and 3 articles missing from the Korean file fall back to English.
- SEO (`04bdd2c`, `7c965ea`, `f364de5`): sitemap no longer 503s on old revisions; `/projects/` 301s to `/systems/`; server-rendered `/ko/` routes with ko canonicals, hreflang, `lang="ko"`, bilingual sitemap (62 URLs).

**Failed:** two production 503 windows (about 2 min each). First CI deploy ran main against a D1 revision that no longer matched fixed-in-code copy. Later a rollback restored the old Worker but not the D1 pointer. Both resolved; canary now blocks the first class.

**Deferred:** Naver Search Advisor verification token (needs Aria's account). Korean timeline entry still names Blink Build Studios, and 8 entries lack Korean copy (copy authoring is not Claude's). Internal links inside Korean page bodies still point at English URLs.
