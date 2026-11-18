# ariaxhan.com

Static Astro site: homepage, projects, about. Served by the Cloudflare Pages project `ariaxhan-site-v2`.

```sh
npm ci
npm run build   # outputs dist/
npx wrangler pages deploy dist --project-name ariaxhan-site-v2 --branch main
```

`scripts/refresh-proof.sh` runs every five minutes as `com.aria.personalsite-proof-refresh` and republishes when the GitHub commit count or this directory changes on main.

The previous Next.js site remains deployed at https://cms-preview.ariaxhan.com as the rollback target.
