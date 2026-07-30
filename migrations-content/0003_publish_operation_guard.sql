PRAGMA foreign_keys = ON;

ALTER TABLE publish_operations
ADD COLUMN expected_publish_operation_id TEXT
REFERENCES publish_operations(id);

ALTER TABLE content_revisions
ADD COLUMN save_idempotency_key TEXT;

CREATE UNIQUE INDEX content_revisions_save_idempotency
ON content_revisions(save_idempotency_key)
WHERE save_idempotency_key IS NOT NULL;

DROP TRIGGER IF EXISTS publish_validate_pointer;

CREATE TRIGGER publish_validate_pointer
BEFORE INSERT ON publish_operations
BEGIN
  SELECT RAISE(ABORT, 'target_revision_page_mismatch')
  WHERE NOT EXISTS (
    SELECT 1
    FROM content_revisions
    WHERE id = NEW.target_revision_id
      AND page_key = NEW.page_key
  );

  SELECT RAISE(ABORT, 'stale_published_pointer')
  WHERE (
    SELECT revision_id
    FROM published_content
    WHERE page_key = NEW.page_key
  ) IS NOT NEW.expected_revision_id;

  SELECT RAISE(ABORT, 'stale_published_operation')
  WHERE EXISTS (
    SELECT 1
    FROM published_content
    WHERE page_key = NEW.page_key
  )
  AND NEW.expected_publish_operation_id IS NOT NULL
  AND (
    SELECT publish_operation_id
    FROM published_content
    WHERE page_key = NEW.page_key
  ) IS NOT NEW.expected_publish_operation_id;
END;
