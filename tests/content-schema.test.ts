import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { describe, expect, it } from "vitest";

const schema = readFileSync(
  new URL("../migrations-content/0001_content_cms.sql", import.meta.url),
  "utf8",
);

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
) {
  db.prepare(
    `INSERT INTO publish_operations (
      id, page_key, target_revision_id, expected_revision_id,
      previous_revision_id, idempotency_key, request_fingerprint,
      dependency_set_json, dependency_set_sha256, state, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, '[]', ?, 'pointer_moved', ?)`,
  ).run(
    id,
    pageKey,
    target,
    expected,
    expected,
    `idem-${id}`,
    "b".repeat(64),
    "c".repeat(64),
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

  it("rejects cross-page targets", () => {
    const db = new DatabaseSync(":memory:");
    db.exec(schema);
    revision(db, "other-revision", "other");
    expect(() => publish(db, "pub-cross", "other-revision", null)).toThrow(
      "target_revision_page_mismatch",
    );
  });

  it("fails against a seeded pointer-comparison defect", () => {
    const db = new DatabaseSync(":memory:");
    db.exec(schema.replace("IS NOT NEW.expected_revision_id", "IS NEW.expected_revision_id"));
    revision(db, "rev-a");
    expect(() => publish(db, "pub-a", "rev-a", null)).toThrow(
      "stale_published_pointer",
    );
  });
});
