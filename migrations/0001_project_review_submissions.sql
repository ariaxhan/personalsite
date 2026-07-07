CREATE TABLE IF NOT EXISTS project_review_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_name TEXT,
  project_stage TEXT NOT NULL,
  project_types_json TEXT NOT NULL,
  origin TEXT NOT NULL,
  unique_contribution TEXT NOT NULL,
  artifact_intent TEXT NOT NULL,
  architecture TEXT,
  links TEXT,
  question TEXT NOT NULL,
  timeline TEXT,
  payload_json TEXT NOT NULL,
  email_status TEXT NOT NULL DEFAULT 'not_attempted',
  email_message_id TEXT,
  email_error TEXT
);

CREATE INDEX IF NOT EXISTS idx_project_review_submissions_created_at
  ON project_review_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_project_review_submissions_email
  ON project_review_submissions(email);
