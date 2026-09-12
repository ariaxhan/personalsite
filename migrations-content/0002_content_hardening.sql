PRAGMA foreign_keys = ON;

CREATE TRIGGER IF NOT EXISTS content_revisions_immutable_update
BEFORE UPDATE ON content_revisions
BEGIN
  SELECT RAISE(ABORT, 'content_revision_immutable');
END;

CREATE TRIGGER IF NOT EXISTS content_revisions_immutable_delete
BEFORE DELETE ON content_revisions
BEGIN
  SELECT RAISE(ABORT, 'content_revision_immutable');
END;

CREATE TRIGGER IF NOT EXISTS published_content_validate_operation_insert
BEFORE INSERT ON published_content
BEGIN
  SELECT RAISE(ABORT, 'published_operation_page_mismatch')
  WHERE NOT EXISTS (
    SELECT 1
    FROM publish_operations
    WHERE id = NEW.publish_operation_id
      AND page_key = NEW.page_key
      AND target_revision_id = NEW.revision_id
  );
END;

CREATE TRIGGER IF NOT EXISTS published_content_validate_operation_update
BEFORE UPDATE ON published_content
BEGIN
  SELECT RAISE(ABORT, 'published_operation_page_mismatch')
  WHERE NOT EXISTS (
    SELECT 1
    FROM publish_operations
    WHERE id = NEW.publish_operation_id
      AND page_key = NEW.page_key
      AND target_revision_id = NEW.revision_id
  );
END;
