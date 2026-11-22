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

## Approved content hotfix: nexus-office#1209

This authorization covers the content purge and factual corrections only. The #1199 redesign hold stays in force. `npm run build:hotfix-1209` exports the last production layout (`13724d9`) into a temporary directory, overlays the corrected award/project copy, and corrects the Independent timeline in both languages. It prints `HOTFIX_DIR`; it never edits the shared checkout or releases the redesign.

```sh
npm run build:hotfix-1209
npx wrangler pages deploy <HOTFIX_DIR>/dist --project-name ariaxhan-site-v2 --branch main --commit-dirty=true
npm run shot:content -- https://ariaxhan.com /tmp/nexus-1209/live-shots
```

`shot:content` verifies the hotfix's three routes in both languages at 375/768/1440px, including five wins, the unlinked fifth award, project counts, timeline copy, overflow, focus and console errors. It writes full-page PNGs and a receipt. See `../docs/hotfix-1209.md` for delivery evidence.
