# D1 `leads` table

**Status:** Locked · **Last updated:** 2026-05-16

Single table. No joins needed for v1.

## DDL

```sql
CREATE TABLE leads (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL,
  email         TEXT    NOT NULL,
  company       TEXT,
  message       TEXT,
  source_path   TEXT,
  user_agent    TEXT,
  ip_country    TEXT,            -- country code only, not full IP (privacy)
  submitted_at  TEXT    NOT NULL  -- ISO 8601, UTC
);

CREATE INDEX idx_leads_submitted_at ON leads(submitted_at DESC);
CREATE INDEX idx_leads_email ON leads(email);
```

## Field semantics

- `source_path`: which page the form was submitted from (e.g. `/`, `/case-studies/acme`). Helps attribute leads.
- `user_agent`: raw UA string; useful for debugging mobile-vs-desktop submission issues.
- `ip_country`: derived from Cloudflare's `request.cf.country` header. **Full IP is never stored** — keeps us out of GDPR full-PII territory while still giving rough geo signal.
- `submitted_at`: ISO 8601 UTC string (`new Date().toISOString()`). SQLite stores as TEXT; sortable lexicographically.

## Privacy posture

We do not store: full IP address, fingerprinting hashes, cookies, referrer chains. Only what the user typed plus minimal request metadata. No cookie banner required because no tracking cookies are set.

## Future evolution

- A `notes` TEXT column for hand-written follow-up notes (when an admin dashboard exists).
- A `status` column (`new` / `contacted` / `qualified` / `closed`) once the CRM-style workflow is wanted.
- A `crm_synced_at` column when a CRM push integration is added.

Add these as `ALTER TABLE` migrations. Do not redesign the table.

## Related

[[D-002 Lead delivery — D1 + Resend]] · [[Lead form]]
