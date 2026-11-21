# ariaxhan.com

Static Astro site: English and Korean homepages, projects, about. Cloudflare Pages project `ariaxhan-site-v2`.

## Preview and verify

```sh
npm ci
npm run build
npx wrangler pages deploy dist --project-name ariaxhan-site-v2 --branch review-1199 --commit-dirty=true
npm run shot -- https://<deployment>.ariaxhan-site-v2.pages.dev /tmp/nexus-1199/shots
```

`shot` uses installed Google Chrome through Playwright. It opens the supplied live URL, checks both languages at 375/768/1440px, checks hierarchy, overflow, keyboard focus, console errors and reduced motion, and writes PNGs plus a JSON receipt. Open the PNGs to review layout. Run the legacy repository tests with `npm test` from the parent directory.

## Production approval hold

For nexus-office#1199, **production is held until Aria explicitly approves the preview**. Landing on main is not production approval. `scripts/refresh-proof.sh` exits before fetching, building, reading credentials or deploying; the scheduled `com.aria.personalsite-proof-refresh` job therefore cannot publish this change. GitHub Pages source integration is absent; the old Worker workflow is manual only.

After explicit approval, remove the hold in `scripts/refresh-proof.sh`, then build and deploy the approved source with `npx wrangler pages deploy dist --project-name ariaxhan-site-v2 --branch main`. Never run that production command for a preview task.

The previous Next.js site remains at https://cms-preview.ariaxhan.com as the rollback target.
