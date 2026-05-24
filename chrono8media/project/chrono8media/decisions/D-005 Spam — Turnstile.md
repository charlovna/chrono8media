# D-005 — Spam protection: Cloudflare Turnstile

**Status:** Locked · **Last updated:** 2026-05-16

## What

The lead form embeds a Cloudflare Turnstile widget (invisible to most visitors). On submit, the client passes the Turnstile token alongside the form fields. The server handler at `src/pages/api/lead.ts` verifies the token against Turnstile's siteverify endpoint **before** inserting into D1 or sending email. Failed verification = HTTP 400, no DB write, no email.

## Why

- **Invisible 99% of the time.** Most legit users see no checkbox, no puzzle. Turnstile uses behavioral signals instead of "click the traffic lights."
- **Free.** Unlimited. Cloudflare's pitch is to displace reCAPTCHA at no cost.
- **Same vendor.** Already in the Cloudflare dashboard. One fewer account.
- **Server-side enforcement.** The token is verified on our backend — bots can't bypass by skipping the client widget.

## Tradeoffs considered

- **Honeypot only (rejected as primary):** a hidden form field that bots fill but humans don't. Catches naïve scrapers, useless against modern spam bots. Fine as a *supplement* but not a replacement.
- **reCAPTCHA / hCaptcha (rejected):** reCAPTCHA sends data to Google (privacy + cookie-banner risk). hCaptcha is closer to Turnstile but worse UX. No reason to pick either over the in-vendor option.
- **Nothing for v1 (rejected):** a public marketing form will get sprayed within a week. Cleanup pain not worth the 30 minutes saved.

## Implementation notes (for when build begins)

- Cloudflare Turnstile widget script: `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>` on the form page only.
- Widget element: `<div class="cf-turnstile" data-sitekey="{PUBLIC_KEY}"></div>` — public key is safe to inline.
- Secret key: stored as Pages env var `TURNSTILE_SECRET_KEY`. Server POSTs `{ secret, response, remoteip }` to `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
- Optional: add a honeypot text input as belt-and-suspenders. Free.

## Related

[[D-002 Lead delivery — D1 + Resend]] · [[Lead form]]
