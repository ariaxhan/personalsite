import { getCloudflareContext } from "@opennextjs/cloudflare";
import { unstable_cache } from "next/cache";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import {
  CONTENT_PAGE_KEY,
  DEFAULT_SITE_CONTENT,
  deriveSiteContent,
  type DerivedSiteContent,
  type SiteContent,
} from "./defaultContent";
import { canonicalizeContent } from "./validation";

type PublishedRow = {
  revision_id: string;
  content_json: string;
  updated_at: string;
};

export type ResolvedSiteContent = {
  siteContent: SiteContent;
  content: DerivedSiteContent;
  revisionId: string | null;
  updatedAt: string | null;
  source: "d1" | "git-default";
};

type CachedSiteContent = Omit<ResolvedSiteContent, "content">;

export class ContentUnavailableError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "ContentUnavailableError";
  }
}

async function contentDatabase(): Promise<D1Database | null> {
  // Build output is a disposable recovery artifact. Canonical content is read
  // only by the deployed Worker, after the route cache is invalidated.
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) return null;
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env.CONTENT_DB ?? null;
  } catch {
    return null;
  }
}

async function readPublishedSiteContent(): Promise<CachedSiteContent> {
  const db = await contentDatabase();
  if (!db) {
    return {
      siteContent: DEFAULT_SITE_CONTENT,
      revisionId: null,
      updatedAt: null,
      source: "git-default",
    };
  }

  let row: PublishedRow | null;
  try {
    row = await db
      .prepare(
        `SELECT p.revision_id, r.content_json, p.updated_at
         FROM published_content p
         JOIN content_revisions r
           ON r.id = p.revision_id AND r.page_key = p.page_key
         WHERE p.page_key = ?1`,
      )
      .bind(CONTENT_PAGE_KEY)
      .first<PublishedRow>();
  } catch (error) {
    throw new ContentUnavailableError("canonical content database is unavailable", { cause: error });
  }

  if (!row) {
    return {
      siteContent: DEFAULT_SITE_CONTENT,
      revisionId: null,
      updatedAt: null,
      source: "git-default",
    };
  }

  try {
    const parsed = JSON.parse(row.content_json) as unknown;
    const { content } = canonicalizeContent(parsed);
    return {
      siteContent: content,
      revisionId: row.revision_id,
      updatedAt: row.updated_at,
      source: "d1",
    };
  } catch (error) {
    throw new ContentUnavailableError("canonical content revision is invalid", { cause: error });
  }
}

const readCachedSiteContent = unstable_cache(
  readPublishedSiteContent,
  ["published-site-content-v1"],
  { tags: ["content:site"], revalidate: false },
);

export async function getSiteContent(): Promise<ResolvedSiteContent> {
  const resolved = await readCachedSiteContent();
  return {
    ...resolved,
    content: deriveSiteContent(resolved.siteContent),
  };
}

export async function getContentDb(): Promise<D1Database> {
  const db = await contentDatabase();
  if (!db) throw new ContentUnavailableError("CONTENT_DB binding is unavailable");
  return db;
}

export type { SiteContent };
