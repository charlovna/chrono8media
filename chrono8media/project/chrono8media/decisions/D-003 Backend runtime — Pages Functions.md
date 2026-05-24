# D-003 — Backend runtime: Astro API routes on Cloudflare Pages Functions

**Status:** Locked · **Last updated:** 2026-05-16

## What

The site is built with Astro 6 in hybrid mode and deployed to Cloudflare Pages. Any file under `src/pages/api/*.ts` automatically becomes a Cloudflare Pages Function at the corresponding URL (e.g. `src/pages/api/lead.ts` → `https://chrono8media.com/api/lead`). No separate Worker project, no separate deploy step.

## Why

- **One repo, one deploy, one log stream.** Best ergonomics for a solo junior dev. The whole site (static pages + API routes + bindings) ships with a single `git push`.
- **Direct binding access.** Pages Functions can bind D1, Turnstile, and environment variables in `wrangler.toml` or the Pages dashboard. The lead handler reaches the DB via `Astro.locals.runtime.env.DB` — no fetch, no auth, no network hop.
- **Astro-native.** Astro 6 has first-class Cloudflare adapter support (`@astrojs/cloudflare`). Endpoints are typed; `prerender = false` on API routes only, leaving the marketing pages fully static.
- **Cost: free.** Pages Functions on the free plan: 100k requests/day. Trivially within budget.

## Tradeoffs considered

- **Standalone Cloudflare Worker (rejected):** more flexibility for future non-website APIs (mobile app backend, etc.) but doubles the operational surface — two deploys, two log dashboards, two `wrangler.toml` files. Overkill for v1. Can be peeled out later if needed.
- **Third-party (Vercel functions, AWS Lambda) (rejected):** splits hosting across vendors. Higher latency from the Cloudflare-hosted site to a non-Cloudflare backend. Pointless given Cloudflare covers everything.

## Implementation notes (for when build begins)

- Astro config: `output: 'hybrid'`, `adapter: cloudflare()`.
- Per-route opt-in: `export const prerender = false` on `src/pages/api/*.ts` only. All other pages remain static.
- Bindings in `wrangler.toml`:
  ```toml
  [[d1_databases]]
  binding = "DB"
  database_name = "chrono8-leads"
  database_id = "<filled after D1 create>"
  ```
- Env vars set via Pages dashboard (encrypted): `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `NOTIFY_TO_EMAIL`.

## Related

[[D-002 Lead delivery — D1 + Resend]] · [[D-004 CMS — Tina]] · [[D-005 Spam — Turnstile]]
