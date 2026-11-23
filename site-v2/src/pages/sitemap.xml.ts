import { pages } from '../content/ld';
import { SITE } from '../content/data';
const alt = (path: string) => ['en', 'ko'].map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${l === 'ko' ? '/ko' : ''}${path}"/>`).join('');
export const GET = () => new Response(
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${pages
    .flatMap((p) => [p.path, `/ko${p.path}`].map((loc) => `  <url><loc>${SITE}${loc}</loc>${alt(p.path)}</url>`))
    .join('\n')}\n</urlset>\n`,
  { headers: { 'content-type': 'application/xml; charset=utf-8' } },
);
