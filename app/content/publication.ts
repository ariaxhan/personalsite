import { createHash, randomUUID } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { CONTENT_PAGE_KEY, CONTENT_SCHEMA_VERSION, type SiteContent } from "./defaultContent";
import { getContentDb } from "./repository";
import { canonicalizeContent } from "./validation";

export const PUBLIC_DEPENDENCIES = [
  "/",
  "/about/",
  "/contact/",
  "/hackathons/",
  "/open-source/",
  "/project-review/",
  "/proof/",
  "/reading/",
  "/systems/",
  "/timeline/",
  "/writing/",
  "/edit/",
  "/edit/login/",
  "/sitemap.xml",
  "/llms.txt",
  "/llms-full.txt",
  "/index.md",
  "/api/projects.json",
  "/api/site-index.json",
  "/api/stats.json",
  "/api/work-with-me.json",
  "/api/writing.json",
] as const;

type RevisionRow = {
  id: string;
  page_key: string;
  parent_revision_id: string | null;
  base_published_revision_id: string | null;
  content_json: string;
  content_sha256: string;
  created_at: string;
  author_id: string;
};

type OperationRow = {
  id: string;
  page_key: string;
  target_revision_id: string;
  expected_revision_id: string | null;
  previous_revision_id: string | null;
  idempotency_key: string;
  request_fingerprint: string;
  dependency_set_json: string;
  state: string;
  created_at: string;
  pointer_moved_at: string | null;
  invalidation_dispatched_at: string | null;
  convergence_observed_at: string | null;
  last_error: string | null;
};

export class PublicationConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PublicationConflictError";
  }
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export async function currentPublishedRevisionId(): Promise<string | null> {
  const db = await getContentDb();
  const row = await db
    .prepare("SELECT revision_id FROM published_content WHERE page_key = ?1")
    .bind(CONTENT_PAGE_KEY)
    .first<{ revision_id: string }>();
  return row?.revision_id ?? null;
}

export async function createRevision(input: {
  content: unknown;
  authorId: string;
  basePublishedRevisionId: string | null;
  parentRevisionId?: string | null;
}): Promise<RevisionRow> {
  const db = await getContentDb();
  const canonical = canonicalizeContent(input.content);
  const id = `rev_${randomUUID()}`;
  const createdAt = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO content_revisions (
        id, page_key, parent_revision_id, base_published_revision_id,
        content_json, content_schema_version, content_sha256, created_at, author_id
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`,
    )
    .bind(
      id,
      CONTENT_PAGE_KEY,
      input.parentRevisionId ?? null,
      input.basePublishedRevisionId,
      canonical.json,
      CONTENT_SCHEMA_VERSION,
      canonical.sha256,
      createdAt,
      input.authorId,
    )
    .run();

  return {
    id,
    page_key: CONTENT_PAGE_KEY,
    parent_revision_id: input.parentRevisionId ?? null,
    base_published_revision_id: input.basePublishedRevisionId,
    content_json: canonical.json,
    content_sha256: canonical.sha256,
    created_at: createdAt,
    author_id: input.authorId,
  };
}

export async function publishRevision(input: {
  targetRevisionId: string;
  expectedRevisionId: string | null;
  idempotencyKey: string;
  forceInvalidationFailure?: boolean;
}): Promise<OperationRow> {
  const db = await getContentDb();
  const dependencies = JSON.stringify(PUBLIC_DEPENDENCIES);
  const fingerprint = sha256(
    JSON.stringify({
      pageKey: CONTENT_PAGE_KEY,
      targetRevisionId: input.targetRevisionId,
      expectedRevisionId: input.expectedRevisionId,
      dependencies: PUBLIC_DEPENDENCIES,
    }),
  );

  const replay = await db
    .prepare("SELECT * FROM publish_operations WHERE idempotency_key = ?1")
    .bind(input.idempotencyKey)
    .first<OperationRow>();
  if (replay) {
    if (replay.request_fingerprint !== fingerprint) {
      throw new PublicationConflictError("idempotency key was already used for another request");
    }
    return replay;
  }

  const id = `pub_${randomUUID()}`;
  const createdAt = new Date().toISOString();
  try {
    await db
      .prepare(
        `INSERT INTO publish_operations (
          id, page_key, target_revision_id, expected_revision_id,
          previous_revision_id, idempotency_key, request_fingerprint,
          dependency_set_json, dependency_set_sha256, state, created_at
        ) VALUES (?1, ?2, ?3, ?4, ?4, ?5, ?6, ?7, ?8, 'pointer_moved', ?9)`,
      )
      .bind(
        id,
        CONTENT_PAGE_KEY,
        input.targetRevisionId,
        input.expectedRevisionId,
        input.idempotencyKey,
        fingerprint,
        dependencies,
        sha256(dependencies),
        createdAt,
      )
      .run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (
      message.includes("stale_published_pointer") ||
      message.includes("target_revision_page_mismatch") ||
      message.includes("UNIQUE")
    ) {
      throw new PublicationConflictError(message);
    }
    throw error;
  }

  try {
    if (input.forceInvalidationFailure) {
      throw new Error("seeded preview invalidation failure");
    }
    revalidateTag("content:site");
    for (const path of PUBLIC_DEPENDENCIES) revalidatePath(path);
    const dispatchedAt = new Date().toISOString();
    await db
      .prepare(
        `UPDATE publish_operations
         SET invalidation_dispatched_at = ?2, last_error = NULL
         WHERE id = ?1`,
      )
      .bind(id, dispatchedAt)
      .run();
  } catch (error) {
    await db
      .prepare(
        `UPDATE publish_operations
         SET state = 'published_with_stale_cache', last_error = ?2
         WHERE id = ?1`,
      )
      .bind(id, error instanceof Error ? error.message : String(error))
      .run();
  }

  const operation = await db
    .prepare("SELECT * FROM publish_operations WHERE id = ?1")
    .bind(id)
    .first<OperationRow>();
  if (!operation) throw new Error("publish operation disappeared after pointer move");
  return operation;
}

export async function retryInvalidation(operationId: string): Promise<OperationRow> {
  const db = await getContentDb();
  const operation = await db
    .prepare("SELECT * FROM publish_operations WHERE id = ?1")
    .bind(operationId)
    .first<OperationRow>();
  if (!operation) throw new PublicationConflictError("publish operation not found");

  revalidateTag("content:site");
  const dependencies = JSON.parse(operation.dependency_set_json) as string[];
  for (const path of dependencies) revalidatePath(path);
  const dispatchedAt = new Date().toISOString();
  await db
    .prepare(
      `UPDATE publish_operations
       SET state = 'pointer_moved', invalidation_dispatched_at = ?2, last_error = NULL
       WHERE id = ?1`,
    )
    .bind(operationId, dispatchedAt)
    .run();

  return {
    ...operation,
    state: "pointer_moved",
    invalidation_dispatched_at: dispatchedAt,
    last_error: null,
  };
}

export async function markConverged(operationId: string): Promise<void> {
  const db = await getContentDb();
  await db
    .prepare(
      `UPDATE publish_operations
       SET state = 'invalidations_complete', convergence_observed_at = ?2, last_error = NULL
       WHERE id = ?1`,
    )
    .bind(operationId, new Date().toISOString())
    .run();
}

export async function cmsState(): Promise<{
  publishedRevisionId: string | null;
  publishedContent: SiteContent | null;
  revisions: RevisionRow[];
  operations: OperationRow[];
}> {
  const db = await getContentDb();
  const [pointer, revisions, operations] = await db.batch([
    db
      .prepare(
        `SELECT p.revision_id, r.content_json
         FROM published_content p
         JOIN content_revisions r
           ON r.id = p.revision_id AND r.page_key = p.page_key
         WHERE p.page_key = ?1`,
      )
      .bind(CONTENT_PAGE_KEY),
    db
      .prepare(
        `SELECT id, page_key, parent_revision_id, base_published_revision_id,
                content_json, content_sha256, created_at, author_id
         FROM content_revisions
         WHERE page_key = ?1
         ORDER BY created_at DESC
         LIMIT 50`,
      )
      .bind(CONTENT_PAGE_KEY),
    db
      .prepare(
        `SELECT *
         FROM publish_operations
         WHERE page_key = ?1
         ORDER BY created_at DESC
         LIMIT 50`,
      )
      .bind(CONTENT_PAGE_KEY),
  ]);

  const pointerRow = pointer.results[0] as
    | { revision_id: string; content_json: string }
    | undefined;
  return {
    publishedRevisionId: pointerRow?.revision_id ?? null,
    publishedContent: pointerRow
      ? canonicalizeContent(JSON.parse(pointerRow.content_json)).content
      : null,
    revisions: revisions.results as RevisionRow[],
    operations: operations.results as OperationRow[],
  };
}
