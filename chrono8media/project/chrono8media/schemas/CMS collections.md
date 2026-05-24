# CMS collections (Tina + Astro Content Collections)

**Status:** Locked · **Last updated:** 2026-05-16

All collections live in `src/content/` as markdown with frontmatter. Tina edits them; Astro reads them via `getCollection()` with typed schemas defined in `src/content/config.ts`.

---

## `case-studies/`

```yaml
title:        string   # "Acme Rebrand"
client:       string   # "Acme Co."
year:         number   # 2025
summary:      string   # one-line tagline
metrics:                # array of { label, value }
  - label:    "Engagement lift"
    value:    "+340%"
hero_image:   image    # AVIF/WebP via Astro <Image>
order:        number   # for manual sorting; lower = first
body:         markdown # long-form case content
```

## `testimonials/`

```yaml
quote:           string
author_name:     string
author_role:     string
author_company:  string
headshot:        image (optional)
order:           number
```

## `pillars/`

The four pillars in §4 Pillars Stack. Order locked by `number`.

```yaml
number:          string   # "01" | "02" | "03" | "04"
name:            string   # "Content" | "Design" | "Strategy" | "Consistency"
body:            markdown
supporting_copy: string   # the smaller line under the pillar name
```

## `hero_options/`

The 6 locked headline variants the user cycles via the Tweaks toolbar.

```yaml
id:              string   # "default" | "alt-1" | ... | "alt-5"
headline:        string   # may include *emphasis* markers parsed to <em>
is_default:      boolean
```

## `site_settings/` (singleton — one file)

```yaml
eyebrow:         string   # "MARKETING AGENCY" etc.
ig_handle:       string   # "@chrono8media"
ig_behold_feed_id: string # for Behold.so embed in §9
footer_copy:     string
notify_to_email: string   # where lead notifications go (mirrored as env var)
```

## `team/` (added for a future About page)

```yaml
name:            string
role:            string
bio:             markdown
headshot:        image
order:           number
```

---

## Editor notes

- Each collection has its own Tina schema mirroring the above. Required vs optional fields are enforced in both Tina (UI) and Astro (build-time type check).
- Images are managed by Tina's media library, stored in `public/images/cms/`, served with Astro `<Image>` for AVIF/WebP fallbacks.
- Editor cannot break the site: invalid markdown won't ship because the Astro build fails fast and Cloudflare Pages keeps the last green deploy live.

## Related

[[D-004 CMS — Tina]]
