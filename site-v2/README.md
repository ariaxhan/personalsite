# ariaxhan.com v2

Static Astro site: homepage, projects, about. The Next.js app at the repo root is untouched.

```sh
npm ci
npm run build   # outputs dist/
npx wrangler pages deploy dist --project-name ariaxhan-site-v2 --branch site-v2-astro
```

This is a preview. `public/_headers` and the layout's robots meta keep it out of search engines.
Remove both at production cutover, which is a separate approved step.

## Review receipt: nexus-office #1170

- Preview: https://site-v2-astro.ariaxhan-site-v2.pages.dev
- Review branch: `site-v2-astro` (original commit `4f8a8ee`).
- Homepage, fresh rendered body text: 786 words; current production homepage: 1499 words (52.4%, a 47.6% reduction). Previous attempt counted HTML-extracted text as 787 / 1644; rendered text is the consistent measure used here.
- Featured: Nexus Office, KERNEL, llm-bench, metabrain, latent-diagnostics, ModelMind, Paper Rooms, renderstate. All 20 real projects remain reachable.
- Delivery recovery: the previous attempt passed preview delivery but failed the runner's main-ancestry requirement. Current task instructions authorize landing the isolated subdirectory; production cutover remains unapproved.
- Production Next.js source and routing remain unchanged. `site-v2/**` pushes do not trigger production deployment. The recovery commit skips CI to avoid deploying production when introducing this filter.

Visual capture (Playwright installed in the existing verification workspace):

```sh
node /tmp/site-v2-build/tools/shoot.mjs https://site-v2-astro.ariaxhan-site-v2.pages.dev /tmp/site-v2-recovery-live
```

Verification: `npm run build` (four static pages); root `npm test` (47 passed); runner unittest discovery (60 passed). Preview captured at 375/768/1440 with zero horizontal overflow and zero console errors. Existing Astro 5 dependency audit reports 12 advisories in build/dev dependencies; static output runs no Astro server. Production source remains untouched.
