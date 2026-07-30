import { createHash } from "node:crypto";
import { DEFAULT_SITE_CONTENT } from "../app/content/defaultContent";
import { canonicalizeContent } from "../app/content/validation";
import { PUBLIC_DEPENDENCIES } from "../app/content/publication";

const canonical = canonicalizeContent(structuredClone(DEFAULT_SITE_CONTENT));
const revisionId = `rev_seed_${canonical.sha256.slice(0, 20)}`;
const operationId = `pub_seed_${canonical.sha256.slice(0, 20)}`;
const createdAt = new Date().toISOString();
const dependencies = JSON.stringify(PUBLIC_DEPENDENCIES);
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const fingerprint = hash(
  JSON.stringify({
    pageKey: "site",
    targetRevisionId: revisionId,
    expectedRevisionId: null,
    dependencies: PUBLIC_DEPENDENCIES,
  }),
);
const sqlString = (value: string) => `'${value.replaceAll("'", "''")}'`;

process.stdout.write(`
PRAGMA foreign_keys = ON;
INSERT OR IGNORE INTO content_revisions (
  id, page_key, parent_revision_id, base_published_revision_id,
  content_json, content_schema_version, content_sha256, created_at, author_id
) VALUES (
  ${sqlString(revisionId)}, 'site', NULL, NULL,
  ${sqlString(canonical.json)}, 1, ${sqlString(canonical.sha256)},
  ${sqlString(createdAt)}, 'git-seed'
);
INSERT INTO publish_operations (
  id, page_key, target_revision_id, expected_revision_id,
  previous_revision_id, idempotency_key, request_fingerprint,
  dependency_set_json, dependency_set_sha256, state, created_at
) SELECT
  ${sqlString(operationId)}, 'site', ${sqlString(revisionId)}, NULL,
  NULL, ${sqlString(`seed-${canonical.sha256}`)}, ${sqlString(fingerprint)},
  ${sqlString(dependencies)}, ${sqlString(hash(dependencies))},
  'pointer_moved', ${sqlString(createdAt)}
WHERE NOT EXISTS (
  SELECT 1 FROM published_content WHERE page_key = 'site'
);
`);
