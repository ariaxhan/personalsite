# ariaxhan.com

Static Astro site, the redesign from nexus-office#1211: the ZIP design ported in, V1 content restored, full Korean twins under `/ko/`, and machine-readable surfaces. Cloudflare Pages project `ariaxhan-site-v2`.

## Where things are

- `src/content/data.ts`: language-neutral facts (links, dates, tech, projects, hackathons).
- `src/content/en.ts`, `ko.ts`: all page copy; `en-cases.ts`, `ko-cases.ts`: the eight case studies. `ko` is typed against `en`, so a missing key fails the build.
- `src/content/ld.ts`, `machine.ts`: JSON-LD, `/api/*.json`, `/llms.txt`, `/llms-full.txt`, `/.well-known/agent-skills/`, `/sitemap.xml`, all generated from the same record.
- `src/views/`: one view per page, shared by both locales; `src/pages/` only routes.
- The project-review form posts to `/api/project-review`, served on the production domain by the `personalsite-project-review` Worker (`../wrangler.project-review.toml`).

## Preview and verify

```sh
npm ci
npm run build
npx wrangler pages deploy dist --project-name ariaxhan-site-v2 --branch review-1211 --commit-dirty=true
npm run shot -- https://review-1211.ariaxhan-site-v2.pages.dev /tmp/nexus-1211/shots
```

`shot` uses installed Google Chrome through Playwright. It opens every page in both languages at 375/768/1440px, checks banned claims and em dashes, the hackathon count, JSON-LD, overflow, skip-link focus and console errors, fetches the machine-readable routes, and writes full-page PNGs plus a receipt. Open the PNGs.

## Production approval hold

**Production is held until Aria explicitly approves the preview** (nexus-office#1211). Landing on main is not production approval. `scripts/refresh-proof.sh` exits before fetching, building, reading credentials or deploying, so the scheduled `com.aria.personalsite-proof-refresh` job cannot publish this change.

After explicit approval, remove the hold in `scripts/refresh-proof.sh`, then build and deploy with `npx wrangler pages deploy dist --project-name ariaxhan-site-v2 --branch main`. Never run that production command for a preview task.

The previous Next.js site remains at https://cms-preview.ariaxhan.com as the rollback target.
