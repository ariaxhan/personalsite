import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { describe, expect, it } from "vitest";

const baseSchema = readFileSync(
  new URL("../migrations-content/0001_content_cms.sql", import.meta.url),
  "utf8",
);
const hardeningSchema = readFileSync(
  new URL("../migrations-content/0002_content_hardening.sql", import.meta.url),
  "utf8",
);
const operationGuardSchema = readFileSync(
  new URL("../migrations-content/0003_publish_operation_guard.sql", import.meta.url),
  "utf8",
);
const strictOperationGuardSchema = readFileSync(
  new URL(
    "../migrations-content-phase-b/0004_strict_publish_operation_guard.sql",
    import.meta.url,
  ),
  "utf8",
);
const compatibilitySchema = `${baseSchema}\n${hardeningSchema}\n${operationGuardSchema}`;
const schema = `${compatibilitySchema}\n${strictOperationGuardSchema}`;

function revision(db: DatabaseSync, id: string, pageKey = "site") {
  db.prepare(
    `INSERT INTO content_revisions (
      id, page_key, content_json, content_schema_version,
      content_sha256, created_at, author_id
    ) VALUES (?, ?, '{}', 1, ?, ?, 'test@example.com')`,
  ).run(id, pageKey, "a".repeat(64), new Date().toISOString());
}

function publish(
  db: DatabaseSync,
  id: string,
  target: string,
  expected: string | null,
  pageKey = "site",
  expectedOperation?: string | null,
) {
  const expectedPublishOperation =
    expectedOperation === undefined
      ? (
          db
            .prepare(
              "SELECT publish_operation_id FROM published_content WHERE page_key = ?",
            )
            .get(pageKey) as { publish_operation_id?: string } | undefined
        )?.publish_operation_id ?? null
      : expectedOperation;
  db.prepare(
    `INSERT INTO publish_operations (
      id, page_key, target_revision_id, expected_revision_id,
      expected_publish_operation_id, previous_revision_id,
      idempotency_key, request_fingerprint,
      dependency_set_json, dependency_set_sha256, state, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, '[]', ?, 'pointer_moved', ?)`,
  ).run(
    id,
    pageKey,
    target,
    expected,
    expectedPublishOperation,
    expected,
    `idem-${id}`,
    "b".repeat(64),
    "c".repeat(64),
    new Date().toISOString(),
  );
}

function legacyPublish(
  db: DatabaseSync,
  id: string,
  target: string,
  expected: string | null,
) {
  db.prepare(
    `INSERT INTO publish_operations (
      id, page_key, target_revision_id, expected_revision_id,
      previous_revision_id, idempotency_key, request_fingerprint,
      dependency_set_json, dependency_set_sha256, state, created_at
    ) VALUES (?, 'site', ?, ?, ?, ?, ?, '[]', ?, 'pointer_moved', ?)`,
  ).run(
    id,
    target,
    expected,
    expected,
    `idem-${id}`,
    "b".repeat(64),
    "a".repeat(64),
    new Date().toISOString(),
  );
}

describe("D1 publication schema", () => {
  it("moves a pointer, rejects a stale writer, and rolls back without false success", () => {
    const db = new DatabaseSync(":memory:");
    db.exec(schema);
    revision(db, "rev-a");
    revision(db, "rev-b");

    publish(db, "pub-a", "rev-a", null);
    expect(
      db.prepare("SELECT revision_id FROM published_content WHERE page_key='site'").get(),
    ).toEqual({ revision_id: "rev-a" });

    expect(() => publish(db, "pub-stale", "rev-b", null)).toThrow(
      "stale_published_pointer",
    );
    expect(
      db.prepare("SELECT count(*) AS count FROM publish_operations WHERE id='pub-stale'").get(),
    ).toEqual({ count: 0 });

    publish(db, "pub-b", "rev-b", "rev-a");
    publish(db, "pub-rollback", "rev-a", "rev-b");
    expect(
      db.prepare("SELECT revision_id FROM published_content WHERE page_key='site'").get(),
    ).toEqual({ revision_id: "rev-a" });
  });

  it("serializes same-revision cache rebuilds by publication operation", () => {
    const db = new DatabaseSync(":memory:");
    db.exec(schema);
    revision(db, "rev-a");

    publish(db, "pub-a", "rev-a", null);
    publish(db, "pub-rebuild", "rev-a", "rev-a");
    expect(() =>
      publish(db, "pub-stale-rebuild", "rev-a", "rev-a", "site", "pub-a"),
    ).toThrow("stale_published_operation");
    expect(
      db
        .prepare(
          "SELECT publish_operation_id FROM published_content WHERE page_key='site'",
        )
        .get(),
    ).toEqual({ publish_operation_id: "pub-rebuild" });
  });

  it("keeps the compatibility migration usable by the previous Worker", () => {
    const db = new DatabaseSync(":memory:");
    db.exec(compatibilitySchema);
    revision(db, "rev-a");

    legacyPublish(db, "pub-a", "rev-a", null);
    legacyPublish(db, "pub-old-worker-rollback", "rev-a", "rev-a");

    expect(
      db
        .prepare(
          "SELECT publish_operation_id FROM published_content WHERE page_key='site'",
        )
        .get(),
    ).toEqual({ publish_operation_id: "pub-old-worker-rollback" });
  });

  it("rejects the previous Worker after the strict migration", () => {
    const db = new DatabaseSync(":memory:");
    db.exec(schema);
    revision(db, "rev-a");

    publish(db, "pub-a", "rev-a", null);
    expect(() =>
      legacyPublish(db, "pub-old-worker-rollback", "rev-a", "rev-a"),
    ).toThrow("stale_published_operation");
    expect(
      db
        .prepare(
          "SELECT publish_operation_id FROM published_content WHERE page_key='site'",
        )
        .get(),
    ).toEqual({ publish_operation_id: "pub-a" });
  });

  it("deduplicates draft saves by idempotency key", () => {
    const db = new DatabaseSync(":memory:");
    db.exec(schema);
    db.prepare(
      `INSERT INTO content_revisions (
        id, page_key, content_json, content_schema_version, content_sha256,
        save_idempotency_key, created_at, author_id
      ) VALUES (?, 'site', '{}', 1, ?, ?, ?, 'test')`,
    ).run(
      "rev-a",
      "a".repeat(64),
      "save-key",
      new Date().toISOString(),
    );

    expect(() =>
      db
        .prepare(
          `INSERT INTO content_revisions (
            id, page_key, content_json, content_schema_version, content_sha256,
            save_idempotency_key, created_at, author_id
          ) VALUES (?, 'site', '{}', 1, ?, ?, ?, 'test')`,
        )
        .run(
          "rev-b",
          "b".repeat(64),
          "save-key",
          new Date().toISOString(),
        ),
    ).toThrow("content_revisions.save_idempotency_key");
  });

  it("rejects cross-page targets", () => {
    const db = new DatabaseSync(":memory:");
    db.exec(schema);
    revision(db, "other-revision", "other");
    expect(() => publish(db, "pub-cross", "other-revision", null)).toThrow(
      "target_revision_page_mismatch",
    );
  });

  it("enforces immutable revisions and same-page publication ownership", () => {
    const db = new DatabaseSync(":memory:");
    db.exec(schema);
    revision(db, "rev-site");
    revision(db, "rev-other", "other");
    publish(db, "pub-site", "rev-site", null);
    publish(db, "pub-other", "rev-other", null, "other");

    expect(() =>
      db.prepare("UPDATE content_revisions SET content_json='{\"changed\":true}' WHERE id='rev-site'").run(),
    ).toThrow("content_revision_immutable");
    expect(() =>
      db.prepare("DELETE FROM content_revisions WHERE id='rev-site'").run(),
    ).toThrow("content_revision_immutable");
    expect(() =>
      db.prepare(
        "UPDATE published_content SET publish_operation_id='pub-other' WHERE page_key='site'",
      ).run(),
    ).toThrow("published_operation_page_mismatch");
  });

  it("fails against a seeded pointer-comparison defect", () => {
    const db = new DatabaseSync(":memory:");
    db.exec(
      schema.replaceAll(
        "IS NOT NEW.expected_revision_id",
        "IS NEW.expected_revision_id",
      ),
    );
    revision(db, "rev-a");
    expect(() => publish(db, "pub-a", "rev-a", null)).toThrow(
      "stale_published_pointer",
    );
  });
});
