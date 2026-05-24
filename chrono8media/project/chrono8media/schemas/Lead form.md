# Lead form

**Status:** Locked · **Last updated:** 2026-05-16

Public-facing contact form. Ingrid-style minimalism: only ask what's necessary.

## Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | text | yes | Trim whitespace. Max 100 chars. |
| `email` | text | yes | RFC 5322 basic validation. Lowercased before storage. Max 200 chars. |
| `company` | text | no | Trim whitespace. Max 150 chars. |
| `message` | textarea | no | Max 2000 chars. |
| `cf-turnstile-response` | hidden | yes | Token from Turnstile widget. Validated server-side, never stored. |

## Validation rules

- All required fields present and non-empty after trim.
- Email matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` (loose check; Resend handles the strict bounce).
- Turnstile token verifies via siteverify. If not, reject with HTTP 400 before any DB write.
- Reject if `Content-Type` is not `application/x-www-form-urlencoded` or `application/json`.

## UX notes (for the frontend implementation)

- Submit button uses the same CTA char-swap and magnetic-button treatment as the rest of the site (see CLAUDE.md "Interactivity Layer").
- On success: replace form with a short "Thanks — we'll be in touch within 48h." message. No alert popup.
- On error: inline message above the submit button, never a popup. Specific message for Turnstile failure ("Could not verify you're human — please try again or refresh") vs validation failure ("Please check your email address").
- Honor `prefers-reduced-motion` — skip the magnetic/char-swap effects.

## Related

[[D-002 Lead delivery — D1 + Resend]] · [[D-005 Spam — Turnstile]] · [[D1 leads table]]
