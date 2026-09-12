PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS content_revisions (
  id TEXT PRIMARY KEY,
  page_key TEXT NOT NULL,
  parent_revision_id TEXT,
  base_published_revision_id TEXT,
  content_json TEXT NOT NULL CHECK (json_valid(content_json)),
  content_schema_version INTEGER NOT NULL CHECK (content_schema_version = 1),
  content_sha256 TEXT NOT NULL CHECK (length(content_sha256) = 64),
  created_at TEXT NOT NULL,
  author_id TEXT NOT NULL,
  UNIQUE (id, page_key),
  FOREIGN KEY (parent_revision_id, page_key)
    REFERENCES content_revisions(id, page_key),
  FOREIGN KEY (base_published_revision_id, page_key)
    REFERENCES content_revisions(id, page_key)
);

CREATE TABLE IF NOT EXISTS publish_operations (
  id TEXT PRIMARY KEY,
  page_key TEXT NOT NULL,
  target_revision_id TEXT NOT NULL,
  expected_revision_id TEXT,
  previous_revision_id TEXT,
  idempotency_key TEXT NOT NULL UNIQUE,
  request_fingerprint TEXT NOT NULL,
  dependency_set_json TEXT NOT NULL CHECK (json_valid(dependency_set_json)),
  dependency_set_sha256 TEXT NOT NULL CHECK (length(dependency_set_sha256) = 64),
  state TEXT NOT NULL CHECK (
    state IN (
      'pointer_moved',
      'published_with_stale_cache',
      'invalidations_complete'
    )
  ),
  created_at TEXT NOT NULL,
  pointer_moved_at TEXT,
  invalidation_dispatched_at TEXT,
  convergence_observed_at TEXT,
  last_error TEXT,
  FOREIGN KEY (target_revision_id, page_key)
    REFERENCES content_revisions(id, page_key),
  FOREIGN KEY (expected_revision_id, page_key)
    REFERENCES content_revisions(id, page_key),
  FOREIGN KEY (previous_revision_id, page_key)
    REFERENCES content_revisions(id, page_key)
);

CREATE TABLE IF NOT EXISTS published_content (
  page_key TEXT PRIMARY KEY,
  revision_id TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  publish_operation_id TEXT NOT NULL,
  FOREIGN KEY (revision_id, page_key)
    REFERENCES content_revisions(id, page_key),
  FOREIGN KEY (publish_operation_id)
    REFERENCES publish_operations(id)
);

CREATE INDEX IF NOT EXISTS content_revisions_page_created
  ON content_revisions(page_key, created_at DESC);

CREATE INDEX IF NOT EXISTS publish_operations_page_created
  ON publish_operations(page_key, created_at DESC);

CREATE TRIGGER IF NOT EXISTS publish_validate_pointer
BEFORE INSERT ON publish_operations
BEGIN
  SELECT CASE
    WHEN NOT EXISTS (
      SELECT 1
      FROM content_revisions
      WHERE id = NEW.target_revision_id
        AND page_key = NEW.page_key
    )
    THEN RAISE(ABORT, 'target_revision_page_mismatch')
  END;

  SELECT CASE
    WHEN (
      SELECT revision_id
      FROM published_content
      WHERE page_key = NEW.page_key
    ) IS NOT NEW.expected_revision_id
    THEN RAISE(ABORT, 'stale_published_pointer')
  END;
END;

CREATE TRIGGER IF NOT EXISTS publish_move_pointer
AFTER INSERT ON publish_operations
BEGIN
  INSERT INTO published_content (
    page_key,
    revision_id,
    updated_at,
    publish_operation_id
  ) VALUES (
    NEW.page_key,
    NEW.target_revision_id,
    NEW.created_at,
    NEW.id
  )
  ON CONFLICT(page_key) DO UPDATE SET
    revision_id = excluded.revision_id,
    updated_at = excluded.updated_at,
    publish_operation_id = excluded.publish_operation_id;

  UPDATE publish_operations
  SET pointer_moved_at = NEW.created_at
  WHERE id = NEW.id;
END;
