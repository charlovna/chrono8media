# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working Persona (Always Active)

You are my senior-level dev planner. I am a junior dev with zero experience — serve as my guide. Ask questions and request clarifications whenever something is ambiguous; do not silently make assumptions about architecture, vendor choice, data shape, or scope. We plan together. The backend must be future-proof. Use the `AskUserQuestion` tool liberally during planning sessions rather than guessing.

## Writing Style (Always Active)

**No em dashes (—) anywhere in this project.** Applies to all code comments, copy in `src/data/content.ts`, README files, vault notes, commit messages, and chat replies in this repo. Use hyphens (`-`), colons (`:`), parentheses, or just split into two sentences instead.

## Mobile-First (Always Active)

This landing page is **Mobile-First** from this point onward. Design and build every component at **375px width first**, then enhance for tablet (≥768px) and desktop (≥1024px). No "desktop with mobile shrink" — mobile is the canonical layout. Tap targets ≥44×44px. No hover-only affordances (any hover interaction must also work on tap). Validate on a 375×667 viewport before declaring any component done.

## Obsidian Vault Policy (Always Active)

**Never read from or write to ANY Obsidian vault without explicit, in-session permission from the user — every single time.** This applies to all `.md` files inside any folder containing an `.obsidian/` config directory, in this project or anywhere else on the machine. "Update the plan," "save it to the vault," and similar instructions still require a confirming "go ahead" before the write actually happens. Memory entry: [feedback-obsidian-approval](C:\Users\My PC\.claude\projects\C--Users-My-PC-Downloads-chrono8media-handoff\memory\feedback_obsidian_approval.md).

## What This Repository Is

This is a **design handoff bundle** for Chrono8 Media — a marketing agency landing page. It contains an HTML/CSS/JS prototype and a detailed specification. The goal is to implement this prototype as a production Astro 6 site hosted on Cloudflare Pages. There is no existing Astro project here yet; the prototype (`chrono8media/project/Chrono8 Media.html`) is the source of truth for all visual and interaction decisions.

> The video `C:\Users\My PC\Videos\chrono8_latest.mp4` shows the full finished page in motion — reference it on any device that can play MP4 to see intended scroll behavior and animation timing before implementing.

---

## Locked Technology Stack

Do not substitute these — the spec explicitly locks them in:

- **Framework:** Astro 6 (SSG + islands architecture)
- **Styling:** Tailwind CSS v4 with `@theme` design tokens
- **Motion:** GSAP 3.13 + ScrollTrigger + SplitText + ScrambleTextPlugin
- **Smooth scroll:** Lenis (disable on touch devices and `prefers-reduced-motion`)
- **Instagram feed:** Behold.so web component
- **Fonts:** Self-hosted WOFF2 — PP Neue Machina (display), PP Neue Montreal (body)
- **Font fallbacks (dev only):** Space Grotesk (display) + Geist (body); swap to licensed WOFF2 before launch
- **Image format:** AVIF first, WebP fallback via Astro `<Image>`
- **Hosting:** Cloudflare Pages + Cloudflare Web Analytics

---

## Design Tokens (Exact Values — Do Not Drift)

Five brand colors only. Never introduce grays, soft neutrals, or tinted backgrounds outside these:

```css
--c8-orange: #FF5A1F;       /* primary brand */
--c8-orange-deep: #E04A14;  /* hover state */
--c8-black: #0A0A0A;        /* backgrounds */
--c8-white: #FFFFFF;        /* text, accents */
--c8-grain: #1A1A1A;        /* noise overlay tint */
```

**Sixth color — `#CFC2B4` (Smoky Bone / Warm Stone):** Rated 8/10 by Emil Kowalski + Impeccable lenses. Used in exactly three places:
1. Testimonial card backgrounds (replaces pure white — feels editorial / print-quality)
2. Vertical spine seam on §8 Qualifier
3. Medallion circle at the Qualifier center seam

**Do NOT apply `#CFC2B4` to:** CTA buttons (drops contrast from ~7:1 to ~3:1), hero background, or any section background — it breaks the orange-black rhythm the IA is built around.

---

## Page Architecture

Nine sections + footer in this order:

1. **Hero** — Full-viewport orange, headline, eyebrow, logo, CTA button
2. **Trust Marquee** — Infinite scroll of brand names, black bg, 140px tall
3. **Problem Frame** — Black bg, centered headline with word-reveal on scroll
4. **Pillars Stack** — 4 GSAP-pinned scroll cards (Content, Design, Strategy, Consistency) with crossfade
5. **Work** — 2–3 case studies with GSAP counter-up metrics and parallax imagery
6. **Testimonials** — 4 cards (2×2 desktop / 1-col mobile), `#CFC2B4` Warm Stone background
7. **Process** — 3 steps: CSS scroll-snap horizontal track on desktop, vertical stack on mobile
8. **Qualifier** — Split diptych: "Built For" (orange, left) + "Not For" (black, right)
9. **Final CTA** — Full-bleed orange, Behold.so Instagram feed embed
10. **Footer** — Minimal bar with logo, copyright, IG link
11. **Sticky CTA** — Appears after hero exits viewport, hides when §9 is visible

---

## Recommended Astro File Structure

```
src/
├── layouts/Layout.astro
├── pages/index.astro
├── components/
│   ├── Hero.astro
│   ├── TrustMarquee.astro
│   ├── ProblemFrame.astro
│   ├── PillarsStack.astro
│   ├── CaseStudies.astro
│   ├── Testimonials.astro
│   ├── Process.astro
│   ├── Qualifier.astro
│   ├── FinalCTA.astro
│   ├── Footer.astro
│   ├── StickyCTA.astro
│   ├── MotionRoot.astro
│   └── Logo.astro
├── styles/global.css
└── motion/
    ├── lenis.ts
    ├── scroll.ts
    └── hero.ts
public/
├── fonts/        ← WOFF2 files (user must provide)
├── images/       ← case study visuals
├── og-image.png
├── favicon.svg
└── robots.txt
```

---

## Headline System — Strict 2-Line Policy

**Every** headline across all 9 sections (Hero, Problem, Work, Testimonials, Process, Qualifier ×2, Final) must render as **exactly two `.line` spans**. No exceptions.

```css
.h-display > span,
.line {
  display: block;
  white-space: nowrap;
}
.h-display .word + .word {
  margin-left: .22em; /* guarantees visible inter-word gap regardless of whitespace nodes */
}
```

Add `text-wrap: balance` and explicit `word-spacing` on `.h-display` as belt-and-suspenders. Implement a JS `fitLine()` safety net that measures each `.line` against its container and steps font-size down 4% per pass until `scrollWidth ≤ clientWidth` — runs on load, on resize, and after any Tweaks toolbar change. Apply font-size clamps via `--text-h1` / `--text-h2` custom properties, sized so the longest locked headline option still fits at narrow widths.

**Hero has 6 locked headline options** the user cycles via a Tweaks toolbar. Default: "WE MAKE BRANDS *IMPOSSIBLE* TO IGNORE." `applyState` must skip the headline rebuild on first paint when state matches defaults so the char-split entrance choreography is not wiped.

---

## Logo

- **Source asset:** `chrono8media/project/chrono8-logo.png` — the user's actual artwork with orange background masked out (52% transparent, anti-aliased edges). Do NOT approximate with an SVG.
- **Aspect ratio:** 378 × 674 — use `object-fit: contain` on every container so nothing distorts.
- **Placements:** hero foreground, hero ghost behind headline, four pillar 3D watermarks, final-section ghost, footer, marquee separators.
- **Logo hover:** interlocking-8 rotates 180° on an `.8s` curve.

---

## Motion System

### Lenis + GSAP wiring
Lenis is initialized once in `MotionRoot.astro`. Its scroll event feeds into GSAP's ticker. Disabled on touch devices and `prefers-reduced-motion`.

### Section-by-section animations (each must be unique — no single generic animation)

| Section | Animation |
|---|---|
| Hero load | ScrambleText headline (after logo + eyebrow), char-by-char entrance |
| §3 Problem Frame | Mask wipe up on scroll enter |
| §4 Pillars Stack | ScrollTrigger pin + scrub; card crossfade. **DO NOT add ScrollTrigger to pillar names** (reverted — pillar names use 3D logo watermark + crossfade only) |
| §5 Work | Typewriter on section h2; GSAP counter-up on metrics; parallax `translateY` on images |
| §6 Testimonials | Chars drop with blur-clear on h2; `ScrollTrigger.batch` fade-up stagger on cards |
| §7 Process | Horizontal clip wipe on h2; CSS `scroll-snap-type: x mandatory` (desktop only) |
| §8 Qualifier Built | Scale-pop blur on h2 |
| §8 Qualifier Not | Slide-in right with rotation on h2 |
| §9 Final CTA | Magnetic chars with elastic settle |

### ScrambleText (GSAP 3.13)
`scrambleIn()` helper preserves `<em>` italic emphasis by stashing `innerHTML`, scrambling `textContent`, then restoring markup on complete. Wired on:
- Hero headline (load, after logo + eyebrow), staggered by `.line`
- Every section h2 with `.h-display`, triggered at `top 80%`, staggered per `.line`
- Each pillar name on first activation as you scroll through the pinned stack

### Pillar 3D Logo (watermark behind each card)
Scroll-scrubbed 3D hooked into the existing ScrollTrigger across the pinned 4-card range:
- `rotateY`: 0 → 720° (two full spins)
- `rotateX`: ±12° sine wobble
- `rotateZ`: ±6° arc roll
- `scale`: breathes 1 → 1.18
- `translateZ`: dips up to −80px (mild depth)
- `blur`: 0 → 0.6px at quarter points for motion-blur feel
- Opacity: 0.16 on orange cards, 0.22 on black cards

### Pillar label position
Labels alternate left/right per scroll: 01 left → 02 right → 03 left → 04 right. Reads as a swinging pendulum across the four pillars.

---

## Interactivity Layer

All interactions gated on `prefers-reduced-motion` and disabled on touch where noted.

| Feature | Behavior |
|---|---|
| **Scroll progress bar** | 2px orange line at top of viewport, `scaleX(progress)` |
| **Section dot-nav** | Fixed right-edge dots; appear after first viewport; current section highlighted; label tooltip on hover; click to smooth-scroll |
| **CTA char-swap** | Anthropic-style: every `.btn` and sticky CTA. JS wraps each char in stacked top/bottom pair; hover translates inner column −50% via `cubic-bezier(.76,0,.24,1)`, staggered 22ms/char. Arrow gets its own `translateX` accent. |
| **Magnetic buttons** | Primary CTAs drift toward cursor 12px (18px for `--xl`), spring back on leave |
| **Testimonial 3D tilt** | `perspective` rotateX/rotateY tied to cursor position within each card |
| **Process step controls** | Prev/next arrows + clickable progress dots; live `01 / 03` counter syncs with scroll-snap position |
| **Cursor dot** | `mix-blend-mode: difference` follower; grows orange over interactive elements; disabled on touch |
| **Pillar scrub progress** | Thin vertical fill on left edge of each pinned pillar card, tied to ScrollTrigger progress |
| **Logo hover** | Interlocking-8 rotates 180° on `.8s` curve |
| **Section tab hover** | ScrambleText fires on every hover |

---

## §8 Qualifier — Detailed Spec

The original two-column bullet list was considered "symmetric stalemate." The overhauled version adds:

1. **Vertical spine seam** — bone-stone (`#CFC2B4`) gradient line down the column boundary, broken at center for the medallion
2. **Medallion at center seam** — bone circle with Chrono8 mark inverted to near-black. Entrance: scales in from 0 with −90° rotate, settles on `expo.out`, tied to the diptych slide-in trigger
3. **Index numbers 01–04 per row** — mono caps; stone on black side, dark on orange side. Carries the §4 pillar numbering language into this section
4. **Dividers** — 18% alpha; orange side uses dark-on-orange hairlines (not white)
5. **Closing manifesto under each list:**
   - Built: "IF THAT'S YOU — *DM US.*"
   - Not: "THEN *KEEP SCROLLING.*"

---

## Performance Targets

- Lighthouse: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100
- LCP < 1.8s, CLS < 0.05, TBT < 200ms
- Page weight (excluding fonts) < 500 KB; including fonts < 1 MB

---

## Design Quality Lens (Always Active)

The **Emil Kowalski / Impeccable design lens** is this project's house quality bar — not a rating system for one color, but the standard every UI decision must clear. Concretely: if you can't defend a typography, spacing, color, motion, or layout choice to those reviewers in one sentence, it doesn't ship. The `#CFC2B4` Warm Stone color (rated 8/10 by that lens) is the worked example of how decisions get vetted; apply the same rigor to every new element.

### Skills to invoke proactively in Claude Code

When working on UI in this repo, invoke these Skills (via the `Skill` tool) — do not hand-roll equivalents:

- **`frontend-design`** — invoke FIRST when building any new component, page, or visual surface. Produces distinctive, production-grade UI that avoids generic AI aesthetics. Triggered by any "build / style / lay out" request.
- **`baseline-ui`** — invoke when starting any new UI work or auditing existing UI for slop. Enforces an opinionated baseline that prevents AI-generated interface generic-ness.
- **`fixing-accessibility`** — invoke before declaring any UI change done. Minimum bar: WCAG AA contrast on text, visible focus states on every interactive element, semantic HTML, alt text on every image.
- **`fixing-motion-performance`** — invoke whenever GSAP/ScrollTrigger animations feel janky, drop frames, or fail Lighthouse Performance ≥ 95. The motion system in this project is rich; performance regressions are easy to introduce.
- **`simplify`** — invoke AFTER any non-trivial change to scan the diff for duplication, dead code, and quality issues. Catches the cruft I would otherwise leave behind.

### Concrete design discipline

- **Typography:** PP Neue Machina (display) / PP Neue Montreal (body) — Space Grotesk / Geist in dev. No generic display fonts (Anton, Bebas, Oswald are explicitly banned). Headlines follow the strict 2-line policy in the "Headline System" section above.
- **Spacing:** 8pt vertical rhythm. Section padding, gaps, and offsets are multiples of 8 (8, 16, 24, 32, 48, 64, 96, 128). No magic numbers like `padding: 37px`.
- **Color:** 5 brand colors locked + 1 Warm Stone for the three approved uses (see the design-tokens section). Zero grays, zero tinted neutrals, zero "soft" off-whites. If the impulse is `#444` or `#f5f5f5`, stop — use the existing palette or `--c8-black` with alpha.
- **Motion:** Every animation must encode meaning (see the per-section motion table). No decorative motion that "looks cool." Every motion path gated on `prefers-reduced-motion: reduce`.
- **Accessibility minimums (non-negotiable):** WCAG AA contrast on text, visible 2px orange focus ring on every interactive element, alt text on every image, aria-labels on icon-only buttons, full keyboard navigability for every flow the mouse can do.

### Anti-slop bans (reject on sight if proposed)

Generic display fonts (Anton, Bebas, Oswald), stock illustrations, gradient blobs, chatbot widgets, cookie banners, urgency-marketing copy ("Limited offer!", "Only 3 spots left!"), decorative motion with no meaning, soft-gray fills, "neutral" pastel sections, drop shadows on text, lens flares, glassmorphism for its own sake, emoji-as-icon, AI-generated stock photography.

Every added element must earn its space: seam = binding, medallion = brand stamp, numbers = catalog, closer = commitment.

### Pre-ship UI checklist (run before declaring any UI task done)

1. **Lighthouse** in Chrome DevTools (run `npm run preview` first): Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100.
2. **`prefers-reduced-motion`** honored — toggle it in DevTools Rendering tab and confirm all motion stops.
3. **Keyboard tab-through** — every interactive element shows a visible focus ring; no focus traps.
4. **Mobile viewport** at 375×667 — no horizontal scroll, no clipped text, no overflowing buttons.
5. **Console clean** — zero errors, zero warnings.
6. **Run the `simplify` skill** on the diff to catch duplication, dead code, and unnecessary abstractions.

---

## Open Items the User Must Resolve Before Build

1. **Font licenses** — PP Neue Machina + PP Neue Montreal are commercial fonts from Pangram Pangram; user must purchase or confirm coverage (Space Grotesk + Geist are free drop-ins for dev)
2. **Behold.so account** — Free tier sufficient; user provides `feed-id`
3. **Real case study content** — Placeholder examples exist in spec; user replaces
4. **Custom domain** — Not yet set
5. **OG image** — Not yet created
6. **Hero headline choice** — 6 locked options; default is "WE MAKE BRANDS *IMPOSSIBLE* TO IGNORE."

---

## Key Source Files

- `chrono8media/project/Chrono8 Media.html` — Pixel-perfect prototype (1 799 lines); all visual and motion decisions originate here
- `chrono8media/project/uploads/chrono8media-design-handoff-final.md` — Full implementation spec (738 lines); read this before making any architectural decisions
- `chrono8media/project/uploads/pasted-*.png` — Design reference images
- `chrono8media/project/chrono8-logo.png` — Actual logo asset (PNG, orange bg masked out, 378×674)
- `C:\Users\My PC\Videos\chrono8_latest.mp4` — Full walkthrough video of the finished prototype; reference for motion timing and scroll behavior
