# Runbooks — stub

**Status:** Not started · **Last updated:** 2026-05-16

This folder is intentionally empty for now. Runbooks describe **how to do** operational tasks (local dev setup, deploy, rotate keys, restore D1 from backup, etc.). They get written **as we actually do each thing for the first time** — that way they reflect the real commands the user ran, not guesses.

## Planned runbooks (write when needed, not before)

- `Local dev setup.md` — clone repo, install deps, wrangler login, run `astro dev` against local D1
- `Deploy to Cloudflare Pages.md` — first-time deploy, env var configuration, custom domain wiring
- `Initialize D1 and run migrations.md` — `wrangler d1 create`, apply DDL from [[D1 leads table]], local vs production
- `Set up Tina Cloud.md` — create Tina account, connect GitHub, configure `/admin` access
- `Set up Resend.md` — account, sender domain verification, API key as Pages env var
- `Set up Turnstile.md` — create widget, sitekey + secret, embed and verify
- `Rotate a secret.md` — when an API key leaks or rotates
- `Restore D1 from export.md` — backup/restore drill

Order roughly matches the build sequence once frontend ships and backend work begins.
