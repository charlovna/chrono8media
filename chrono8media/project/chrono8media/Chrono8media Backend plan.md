# Chrono8media Backend Plan — Index

> **Implementation status:** Deferred until the frontend ships via Claude Code. This vault is the future-proofing spec and the persistent context library for AI agents. Nothing here is being built yet; everything here will be built later.

> **Last reviewed:** 2026-05-16
> **Stack at a glance:** Astro 6 (SSG) on Cloudflare Pages · API routes as Pages Functions · D1 (database) · Resend (email) · Tina CMS · Cloudflare Turnstile (spam)

---

## Scope assumptions (the design envelope)

This plan is sized for a **single-brand marketing landing page**, not a multi-tenant SaaS or a high-traffic publisher. The design target — at which everything still runs on free tiers and the architecture stays unchanged — is:

- **Page views:** up to ~50,000/month (~1,700/day peak)
- **Lead submissions:** up to ~3,000/month (~100/day peak)
- **CMS editors:** up to 2 humans editing content
- **Realistic year-one numbers:** 500–5,000 visitors/mo, 5–150 leads/mo — well inside the envelope

### Where it breaks first

If volume grows past these numbers, vendors hit their free ceilings in this order:

1. **Resend** — 3,000 emails/mo (one notification per lead). First to hit. Upgrade is $20/mo for 50k emails. See [[D-002 Lead delivery — D1 + Resend]].
2. **Tina Cloud** — 1,000 doc edits/mo or a third editor. Upgrade is $29/mo. Unlikely to bind unless content changes daily.
3. **Cloudflare Pages Functions** — 100,000 requests/day (~3M/mo). Effectively unbindable for a marketing site.
4. **Cloudflare D1** — 5 GB storage / 5M reads/day. Storage = ~10M lead rows. Unbindable at this use case.

The site itself (static HTML/CSS/JS on Pages) has no meaningful free-tier ceiling — bandwidth and request volume are unlimited.

### When to revisit this envelope

Revisit this plan if any of: (a) Chrono8 picks up a second brand needing its own admin/leads bucket, (b) leads exceed 1,500/mo for two consecutive months, (c) a third editor needs Tina access, (d) the use case shifts from marketing landing → product/SaaS surface.

---

## How to read this vault

This is a split-note plan. Start here, follow links into `decisions/`, `schemas/`, and `runbooks/`. Every decision note follows the same shape: **What · Why · Tradeoffs · Status · Last updated**. Backlinks are wired up — Obsidian's graph view shows how decisions depend on each other.

If you're an AI agent picking this up cold: read this index top-to-bottom first, then open whichever decision is relevant to the task you've been handed. The frontend prototype is at `chrono8media/project/Chrono8 Media.html`; the project spec is at `chrono8media/project/uploads/chrono8media-design-handoff-final.md`.

---

## Decisions

| # | Decision | Note |
|---|---|---|
| D-001 | Obsidian role: AI-readable plan/context library (not runtime storage) | [[D-001 Obsidian as AI memory layer]] |
| D-002 | Lead delivery via Cloudflare D1 + Resend email | [[D-002 Lead delivery — D1 + Resend]] |
| D-003 | Backend runtime: Astro API routes on Cloudflare Pages Functions | [[D-003 Backend runtime — Pages Functions]] |
| D-004 | CMS: Tina (free tier, admin at /admin) | [[D-004 CMS — Tina]] |
| D-005 | Spam protection: Cloudflare Turnstile | [[D-005 Spam — Turnstile]] |
| D-006 | Domain: TBD before launch; dev uses Pages preview + Resend sandbox | [[D-006 Domain deferred]] |

## Schemas

- [[Lead form]] — public-facing form fields and validation
- [[D1 leads table]] — the database row
- [[CMS collections]] — case-studies, testimonials, pillars, hero_options, site_settings, team

## Runbooks

- [[runbooks/README]] — stub; filled in as we actually build

---

## Open items (still on the user to resolve)

These echo the front-end spec's open items plus the new backend ones:

- [ ] Buy production domain (chrono8media.com or chosen alternative)
- [ ] Create Cloudflare account + add Pages, D1, Turnstile
- [ ] Create Resend account; verify sender domain once domain exists
- [ ] Create Tina Cloud account; connect to GitHub repo
- [ ] Decide hero headline default (6 locked options exist in the prototype)
- [ ] Provide Behold.so feed-id for Instagram embed in §9
- [ ] Provide real case study content (currently placeholders)
- [ ] Confirm PP Neue Machina + PP Neue Montreal font license OR ship with Space Grotesk + Geist fallbacks

## Cost expectation (all monthly, USD)

At expected launch volume (a marketing landing page), this entire backend fits in free tiers:

- Cloudflare Pages, Functions, D1, Turnstile, Web Analytics — **$0**
- Resend (3,000 emails/mo free) — **$0**
- Tina Cloud (2 editors, 1,000 docs/mo free) — **$0**
- Domain — **~$10–15/year**

If volume grows past free tiers, the first paid surface is usually Resend at $20/mo. Everything else stays free well past the level a single landing page generates.
