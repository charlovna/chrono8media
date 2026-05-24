# D-006 — Domain: deferred until pre-launch

**Status:** Open (pending purchase) · **Last updated:** 2026-05-16

## What

The production domain has not been purchased. Until then:

- **Site URL during dev:** Cloudflare Pages preview URL (e.g. `chrono8media.pages.dev`)
- **Email sender during dev:** Resend sandbox sender (`onboarding@resend.dev`) — only deliverable to addresses you've verified on the Resend account
- **Tina Cloud:** can be set up against the preview URL; reconfigure to the prod domain when bought

## Why deferred

The user is finishing the frontend first via Claude Code. Domain purchase is best done close to launch so the year of registration aligns with the live site.

## What changes when the domain is bought

1. Add the domain to Cloudflare (transfer or change nameservers).
2. Add the domain to Cloudflare Pages → custom domain.
3. In Resend: add domain, verify the DNS records (SPF, DKIM, DMARC). DNS lives at Cloudflare so verification is one-click.
4. Update sender address in code from `onboarding@resend.dev` → `no-reply@<domain>`.
5. Update Tina Cloud config to the prod domain.
6. Test the lead form end-to-end on the real domain before announcing.

## Naming candidates (placeholder — user to confirm)

- chrono8media.com
- chrono8.media
- chrono8.studio

No decision yet.

## Related

[[D-002 Lead delivery — D1 + Resend]]
