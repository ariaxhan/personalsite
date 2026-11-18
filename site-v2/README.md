# ariaxhan.com v2

Static Astro site: homepage, projects, about. The Next.js app at the repo root is untouched.

```sh
npm ci
npm run build   # outputs dist/
npx wrangler pages deploy dist --project-name ariaxhan-site-v2 --branch site-v2-astro
```

This is a preview. `public/_headers` and the layout's robots meta keep it out of search engines.
Remove both at production cutover, which is a separate approved step.
