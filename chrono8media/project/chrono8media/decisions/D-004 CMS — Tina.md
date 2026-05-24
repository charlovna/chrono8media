# D-004 — CMS: Tina (free tier)

**Status:** Locked · **Last updated:** 2026-05-16

## What

Tina CMS provides an admin UI at `/admin` for editing case studies, testimonials, hero copy, pillars, team bios, and site settings. The content itself lives as markdown files in `src/content/` inside the Astro repo. Tina commits edits to GitHub via OAuth (Tina Cloud handles the auth handshake).

Editor experience: visit `https://chrono8media.com/admin`, log in, see the page rendered live, edit text/images inline, hit save — Tina commits to `main`, Cloudflare Pages rebuilds, change goes live in ~60 seconds.

## Why

- **Live preview** is decisive for a visual landing page. Editors see the headline render with the actual font/animation as they type. Decap CMS does not have this.
- **Git-backed.** No proprietary database lock-in. The content is markdown in our repo; if Tina disappears tomorrow, we still have everything and can edit files directly.
- **Free tier fits.** 2 editors, 1k documents/mo — the user mentioned "me + maybe 1–2 non-technical people later" so this is sized correctly.
- **Plays well with Astro Content Collections.** Tina schemas map cleanly to Astro's typed content collections.

## Tradeoffs considered

- **Decap CMS (rejected, narrowly):** pure open source, zero third-party dependency. But no live preview, slower-moving maintenance, and the YAML config is less ergonomic. If user changes their mind about Tina Cloud later, Decap is a clean migration — same git-backed markdown.
- **Headless CMS (Sanity / Contentful / Storyblok) (rejected):** powerful but overkill for one landing page. Real vendor cost ($0–99/mo), separate auth, content lives in their cloud not your repo.
- **Author in main Obsidian vault → sync script (rejected):** cute but fragile. Adds a custom sync layer with no UX win over Tina's editor.
- **Hardcode content for v1, defer CMS (rejected):** user wants future-proofing now, not later. Setting up Tina costs ~2 hours; deferring means re-doing every content reference in components later.

## Implementation notes (for when build begins)

- Install: `@tinacms/cli`, `tinacms`. Init with `npx @tinacms/cli init`.
- Config at `tina/config.ts`. Schemas defined per collection; mirror the structure in [[CMS collections]].
- Tina Cloud account: free tier. Connect to the GitHub repo. Grant write access.
- Admin route: Tina generates `/admin/index.html` at build time. Cloudflare Pages serves it.
- Astro reads markdown via `getCollection('case-studies')` etc. — content collections are typed via `src/content/config.ts`.

## Related

[[D-003 Backend runtime — Pages Functions]] · [[CMS collections]]
