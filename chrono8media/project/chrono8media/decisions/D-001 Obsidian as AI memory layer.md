# D-001 — Obsidian as AI memory layer

**Status:** Locked · **Last updated:** 2026-05-16

## What

The Obsidian vault at `chrono8media/project/chrono8media/` is the **persistent context library for AI agents working on this project**. Every architectural decision, schema, runbook, and plan revision lives here as markdown. Any future agent (any Claude session, any other tool) can read the vault and instantly understand the current state of the project.

The vault is **documentation memory only**. It does not store runtime data, leads, or CMS content. The website never reads from or writes to this vault.

## Why

The user is a junior dev working with AI agents over many sessions. Without a persistent plan store, every new conversation re-derives architectural decisions from scratch — wasteful, and decisions drift. A markdown vault solves this:

- Human-readable and AI-readable in the same format
- Backlinks + graph view help agents navigate decisions and see dependencies
- Git-versionable; future decisions don't overwrite history
- Zero vendor dependency

## Tradeoffs considered

- **Vault as runtime database (rejected):** considered using markdown files as the leads/CMS store. Rejected because writing to the vault from a live Cloudflare Worker is fragile and adds sync complexity for zero benefit over D1.
- **Vault as CMS mirror only (rejected):** considered keeping the vault purely for site copy. Rejected because the user's real need was AI-context persistence, not authoring surface — see [[D-004 CMS — Tina]] for content editing.
- **No vault, plan lives in CLAUDE.md (rejected):** CLAUDE.md is for operating rules. Architecture decisions need their own searchable, linkable surface.

## Operating rules

- Every Obsidian read/write requires explicit in-session user approval. See the `feedback-obsidian-approval` memory and the "Obsidian Vault Policy" section in [CLAUDE.md](../../../../CLAUDE.md).
- Plan changes get a new dated entry at the top of the relevant note, not silent overwrites.

## Related

[[D-002 Lead delivery — D1 + Resend]] · [[D-004 CMS — Tina]]
