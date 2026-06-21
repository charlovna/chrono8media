-- Run once after creating the D1 database:
-- npx wrangler d1 execute chrono8-leads --remote --file=./migrations/001_leads.sql

CREATE TABLE IF NOT EXISTS leads (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL,
  email         TEXT    NOT NULL,
  company       TEXT,
  message       TEXT,
  source_path   TEXT,
  user_agent    TEXT,
  ip_country    TEXT,
  submitted_at  TEXT    NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_submitted_at ON leads (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email        ON leads (email);
