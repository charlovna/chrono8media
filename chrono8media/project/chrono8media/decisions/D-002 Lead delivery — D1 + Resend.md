# D-002 — Lead delivery via Cloudflare D1 + Resend

**Status:** Locked · **Last updated:** 2026-05-16

## What

When a visitor submits the contact form, the handler at `src/pages/api/lead.ts` does three things in order:

1. Verify Cloudflare Turnstile token (server-side). Reject if invalid. See [[D-005 Spam — Turnstile]].
2. Insert a row into the D1 `leads` table. See [[D1 leads table]].
3. Send a formatted notification email via Resend to the user's inbox.

If step 2 fails, the request errors out (no email sent — DB is the source of truth). If step 3 fails, the row is still saved and a warning is logged; the user gets the lead next time they check the dashboard, even if email delivery hiccupped.

## Why

- **Resilience:** the DB row is permanent. Email rules, inbox filters, and Resend outages cannot lose a lead.
- **Future dashboard:** with rows in D1, a small admin page can list/filter leads later without any data backfill.
- **Single vendor for hosting + DB:** Cloudflare account already needed for Pages. D1 sits in the same dashboard, same auth, same `wrangler` CLI.
- **Free at expected volume:** D1 free tier is 5GB + 5M reads/day. Resend free tier is 3k emails/mo. A landing page will not approach either.
- **Scope envelope:** this design fits the scope assumptions in the [[Chrono8media Backend plan|index]] — up to ~3,000 leads/mo before Resend's free tier ($20/mo) is the first paid surface to kick in. D1 has effectively no ceiling at this use case (~10M lead rows would fit in the 5 GB free quota).
- **CRM-ready:** when the user picks a CRM later (Notion, HubSpot, etc.), the handler grows a fourth step — push to CRM — without restructuring.

## Tradeoffs considered

- **Email only (rejected):** simplest, but loses leads to inbox noise and provides no analytics. User explicitly chose the "future-proof" path.
- **Cloudflare Email Routing instead of Resend (rejected for now):** free, but no programmatic send — only address forwarding. Resend gives templated HTML emails and webhook delivery reports.
- **External DB (Supabase, Neon) (rejected):** would split the stack across vendors for no functional gain. D1 covers this use case completely.

## Implementation notes (for when build begins)

- D1 binding name: `DB` in `wrangler.toml`. Astro accesses it via `Astro.locals.runtime.env.DB`.
- Resend API key: stored as Cloudflare Pages encrypted environment variable `RESEND_API_KEY`. Never committed.
- Sender address: `no-reply@<chosen-domain>` once domain is purchased. Dev uses Resend sandbox sender. See [[D-006 Domain deferred]].
- Notification email goes to `austinberon2169@gmail.com` until a business address is set up.
- Use Resend's React Email or plain HTML template. Subject: `New Chrono8 lead — {{name}} from {{company || 'no company'}}`.

## Related

[[D-003 Backend runtime — Pages Functions]] · [[D-005 Spam — Turnstile]] · [[Lead form]] · [[D1 leads table]]
