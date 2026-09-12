import { createHash, randomUUID } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { CONTENT_PAGE_KEY, CONTENT_SCHEMA_VERSION, type SiteContent } from "./defaultContent";
import { getContentDb } from "./repository";
import { canonicalizeContent } from "./validation";
import { CONTENT_PUBLIC_PATHS } from "./publicRoutes";

export const PUBLIC_DEPENDENCIES = {
  version: 1,
  tags: ["content:site"],
  paths: CONTENT_PUBLIC_PATHS,
} as const;

type RevisionRow = {
  id: string;
  page_key: string;
  parent_revision_id: string | null;
  base_published_revision_id: string | null;
  content_json: string;
  content_sha256: string;
  save_idempotency_key: string | null;
  created_at: string;
  author_id: string;
};

export type RevisionSummary = Omit<
  RevisionRow,
  "content_json" | "save_idempotency_key"
>;

type OperationRow = {
  id: string;
  page_key: string;
  target_revision_id: string;
  expected_revision_id: string | null;
  expected_publish_operation_id: string | null;
  previous_revision_id: string | null;
  idempotency_key: string;
  request_fingerprint: string;
  dependency_set_json: string;
  dependency_set_sha256: string;
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

export async function currentPublishedPointer(): Promise<{
  revisionId: string;
  publicationId: string;
} | null> {
  const db = await getContentDb();
  const row = await db
    .prepare(
      `SELECT revision_id, publish_operation_id
       FROM published_content
       WHERE page_key = ?1`,
    )
    .bind(CONTENT_PAGE_KEY)
    .first<{ revision_id: string; publish_operation_id: string }>();
  return row
    ? { revisionId: row.revision_id, publicationId: row.publish_operation_id }
    : null;
}

export async function currentPublishedRevisionId(): Promise<string | null> {
  return (await currentPublishedPointer())?.revisionId ?? null;
}

export async function createRevision(input: {
  content: unknown;
  authorId: string;
  basePublishedRevisionId: string | null;
  parentRevisionId?: string | null;
  idempotencyKey: string;
}): Promise<RevisionRow> {
  const db = await getContentDb();
  const canonical = canonicalizeContent(input.content);
  const parentRevisionId = input.parentRevisionId ?? null;
  const replay = await revisionBySaveKey(db, input.idempotencyKey);
  if (replay) {
    assertRevisionReplay(replay, {
      contentSha256: canonical.sha256,
      authorId: input.authorId,
      basePublishedRevisionId: input.basePublishedRevisionId,
      parentRevisionId,
    });
    return replay;
  }
  const id = `rev_${randomUUID()}`;
  const createdAt = new Date().toISOString();
  try {
    await db
      .prepare(
        `INSERT INTO content_revisions (
          id, page_key, parent_revision_id, base_published_revision_id,
          content_json, content_schema_version, content_sha256,
          save_idempotency_key, created_at, author_id
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`,
      )
      .bind(
        id,
        CONTENT_PAGE_KEY,
        parentRevisionId,
        input.basePublishedRevisionId,
        canonical.json,
        CONTENT_SCHEMA_VERSION,
        canonical.sha256,
        input.idempotencyKey,
        createdAt,
        input.authorId,
      )
      .run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (
      message.includes(
        "UNIQUE constraint failed: content_revisions.save_idempotency_key",
      )
    ) {
      const concurrentReplay = await revisionBySaveKey(
        db,
        input.idempotencyKey,
      );
      if (concurrentReplay) {
        assertRevisionReplay(concurrentReplay, {
          contentSha256: canonical.sha256,
          authorId: input.authorId,
          basePublishedRevisionId: input.basePublishedRevisionId,
          parentRevisionId,
        });
        return concurrentReplay;
      }
    }
    throw error;
  }

  return {
    id,
    page_key: CONTENT_PAGE_KEY,
    parent_revision_id: parentRevisionId,
    base_published_revision_id: input.basePublishedRevisionId,
    content_json: canonical.json,
    content_sha256: canonical.sha256,
    save_idempotency_key: input.idempotencyKey,
    created_at: createdAt,
    author_id: input.authorId,
  };
}

async function revisionBySaveKey(
  db: D1Database,
  idempotencyKey: string,
): Promise<RevisionRow | null> {
  return db
    .prepare(
      `SELECT id, page_key, parent_revision_id, base_published_revision_id,
              content_json, content_sha256, save_idempotency_key,
              created_at, author_id
       FROM content_revisions
       WHERE save_idempotency_key = ?1`,
    )
    .bind(idempotencyKey)
    .first<RevisionRow>();
}

function assertRevisionReplay(
  revision: RevisionRow,
  request: {
    contentSha256: string;
    authorId: string;
    basePublishedRevisionId: string | null;
    parentRevisionId: string | null;
  },
): void {
  if (
    revision.page_key !== CONTENT_PAGE_KEY ||
    revision.content_sha256 !== request.contentSha256 ||
    revision.author_id !== request.authorId ||
    revision.base_published_revision_id !==
      request.basePublishedRevisionId ||
    revision.parent_revision_id !== request.parentRevisionId
  ) {
    throw new PublicationConflictError(
      "draft idempotency key was already used for another request",
    );
  }
}

export async function publishRevision(input: {
  targetRevisionId: string;
  expectedRevisionId: string | null;
  expectedPublicationId: string | null;
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
      expectedPublicationId: input.expectedPublicationId,
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
          expected_publish_operation_id, previous_revision_id,
          idempotency_key, request_fingerprint,
          dependency_set_json, dependency_set_sha256, state, created_at
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?4, ?6, ?7, ?8, ?9, 'pointer_moved', ?10)`,
      )
      .bind(
        id,
        CONTENT_PAGE_KEY,
        input.targetRevisionId,
        input.expectedRevisionId,
        input.expectedPublicationId,
        input.idempotencyKey,
        fingerprint,
        dependencies,
        sha256(dependencies),
        createdAt,
      )
      .run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("UNIQUE constraint failed: publish_operations.idempotency_key")) {
      const concurrentReplay = await db
        .prepare("SELECT * FROM publish_operations WHERE idempotency_key = ?1")
        .bind(input.idempotencyKey)
        .first<OperationRow>();
      if (concurrentReplay?.request_fingerprint === fingerprint) return concurrentReplay;
      throw new PublicationConflictError(
        "idempotency key was already used for another request",
      );
    }
    if (
      message.includes("stale_published_pointer") ||
      message.includes("stale_published_operation") ||
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
    for (const tag of PUBLIC_DEPENDENCIES.tags) revalidateTag(tag);
    for (const path of PUBLIC_DEPENDENCIES.paths) revalidatePath(path);
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

  const pointer = await currentPublishedPointer();
  if (
    pointer?.revisionId !== operation.target_revision_id ||
    pointer.publicationId !== operation.id
  ) {
    throw new PublicationConflictError("publish operation target is no longer canonical");
  }
  if (operation.state === "invalidations_complete") {
    throw new PublicationConflictError("publish operation has already converged");
  }

  const dependenciesJson = operation.dependency_set_json;
  if (sha256(dependenciesJson) !== operation.dependency_set_sha256) {
    throw new PublicationConflictError("publish dependency set failed integrity validation");
  }
  const dependencies = JSON.parse(dependenciesJson) as {
    version?: unknown;
    tags?: unknown;
    paths?: unknown;
  };
  if (
    dependencies.version !== 1 ||
    !Array.isArray(dependencies.tags) ||
    !dependencies.tags.every((tag) => typeof tag === "string") ||
    !Array.isArray(dependencies.paths) ||
    !dependencies.paths.every((path) => typeof path === "string")
  ) {
    throw new PublicationConflictError("publish dependency set is invalid");
  }
  for (const tag of dependencies.tags) revalidateTag(tag);
  for (const path of dependencies.paths) revalidatePath(path);
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

export async function getRevision(revisionId: string): Promise<{
  revision: RevisionSummary;
  content: SiteContent;
}> {
  const db = await getContentDb();
  const row = await db
    .prepare(
      `SELECT id, page_key, parent_revision_id, base_published_revision_id,
              content_json, content_sha256, save_idempotency_key,
              created_at, author_id
       FROM content_revisions
       WHERE id = ?1 AND page_key = ?2`,
    )
    .bind(revisionId, CONTENT_PAGE_KEY)
    .first<RevisionRow>();
  if (!row) throw new PublicationConflictError("revision not found");
  const canonical = canonicalizeContent(JSON.parse(row.content_json));
  if (canonical.sha256 !== row.content_sha256) {
    throw new PublicationConflictError("revision failed integrity validation");
  }
  const revision: RevisionSummary = {
    id: row.id,
    page_key: row.page_key,
    parent_revision_id: row.parent_revision_id,
    base_published_revision_id: row.base_published_revision_id,
    content_sha256: row.content_sha256,
    created_at: row.created_at,
    author_id: row.author_id,
  };
  return { revision, content: canonical.content };
}

export async function cmsState(): Promise<{
  publishedRevisionId: string | null;
  publishedOperationId: string | null;
  publishedContent: SiteContent | null;
  revisions: RevisionSummary[];
  operations: OperationRow[];
}> {
  const db = await getContentDb();
  const [pointer, revisions, operations] = await db.batch([
    db
      .prepare(
        `SELECT p.revision_id, p.publish_operation_id, r.content_json
         FROM published_content p
         JOIN content_revisions r
           ON r.id = p.revision_id AND r.page_key = p.page_key
         WHERE p.page_key = ?1`,
      )
      .bind(CONTENT_PAGE_KEY),
    db
      .prepare(
        `SELECT id, page_key, parent_revision_id, base_published_revision_id,
                content_sha256, created_at, author_id
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
    | { revision_id: string; publish_operation_id: string; content_json: string }
    | undefined;
  return {
    publishedRevisionId: pointerRow?.revision_id ?? null,
    publishedOperationId: pointerRow?.publish_operation_id ?? null,
    publishedContent: pointerRow
      ? canonicalizeContent(JSON.parse(pointerRow.content_json)).content
      : null,
    revisions: revisions.results as RevisionSummary[],
    operations: operations.results as OperationRow[],
  };
}
