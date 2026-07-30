import contentDates from "../utils/contentDates.json";
import {
  contentDiagnosticHeaders,
  getContentDb,
  getSiteContent,
} from "../content/repository";
import {
  CONTENT_PAGE_KEY,
  CONTENT_SCHEMA_VERSION,
  type SiteContent,
} from "../content/defaultContent";
import { canonicalizeContent } from "../content/validation";
import {
  calculateSignificantChangeDates,
  sitemapRoutes,
  type PublicationSnapshot,
} from "../content/sitemapHistory";

export const dynamic = "force-static";

const BASE = "https://ariaxhan.com";
const dates = contentDates as Record<string, string>;
export async function GET() {
  const resolved = await getSiteContent();
  const historyDates = resolved.publicationId
    ? await significantChangeDates(
        resolved.publicationId,
        resolved.siteContent,
      )
    : new Map(
        sitemapRoutes(resolved.siteContent).map((route) => [
          route,
          route.startsWith("/projects/") ? dates.projects : dates[route],
        ]),
      );
  const pages = sitemapRoutes(resolved.siteContent).map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(historyDates.get(route)!),
  }));
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pages.map(
      (entry) =>
        `<url><loc>${escapeXml(entry.url)}</loc><lastmod>${entry.lastModified.toISOString()}</lastmod></url>`,
    ),
    "</urlset>",
  ].join("\n");
  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
      ...contentDiagnosticHeaders(resolved),
    },
  });
}

type HistoryRow = {
  id: string;
  pointer_moved_at: string | null;
  created_at: string;
  content_json: string;
  content_schema_version: number;
  content_sha256: string;
};

async function significantChangeDates(
  currentPublicationId: string,
  currentContent: SiteContent,
): Promise<Map<string, string>> {
  const db = await getContentDb();
  const history = await db
    .prepare(
      `SELECT o.id, o.pointer_moved_at, o.created_at,
              r.content_json, r.content_schema_version, r.content_sha256
       FROM publish_operations o
       JOIN content_revisions r
         ON r.id = o.target_revision_id AND r.page_key = o.page_key
       WHERE o.page_key = ?1
       ORDER BY o.created_at ASC, o.id ASC`,
    )
    .bind(CONTENT_PAGE_KEY)
    .all<HistoryRow>();
  const snapshots: PublicationSnapshot[] = history.results.map((row) => {
    if (row.content_schema_version !== CONTENT_SCHEMA_VERSION) {
      throw new Error("sitemap history contains an unsupported revision");
    }
    const canonical = canonicalizeContent(JSON.parse(row.content_json));
    if (canonical.sha256 !== row.content_sha256) {
      throw new Error("sitemap history contains a corrupt revision");
    }
    return {
      publicationId: row.id,
      publishedAt: row.pointer_moved_at ?? row.created_at,
      content: canonical.content,
    };
  });
  return calculateSignificantChangeDates(
    snapshots,
    currentPublicationId,
    currentContent,
    dates,
  );
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

