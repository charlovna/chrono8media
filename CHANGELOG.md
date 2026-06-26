# Changelog

All notable changes to the Chrono8 Media frontend build are recorded here.

---

## 2026-06-19

### -1. Work Showcase section (bento media grid, TinaCMS-wired)

**Files:** `src/components/Showcase.astro` (new), `src/data/content.ts`, `src/pages/index.astro`, `src/components/SectionNav.astro`, `tina/config.ts`, `content/showcase.json` (new), `public/images/showcase/.gitkeep` (new), `CONTENT-GUIDE.md` (new)

New "Our Work" section placed directly below the testimonial marquee. This pass is layout, formatting, and full CMS wiring only: the team populates both testimonials and showcase media through the TinaCMS dashboard (no code).

- **Layout - editorial bento grid:** `Showcase.astro` renders an editorial bento grid (varied tile spans) to contrast with the horizontal marquee directly above it. Mobile-first: 1 column (375px) -> 2 columns (768px) -> 3 columns with `grid-auto-flow: dense` (1024px+). The per-item `span` field maps to desktop placement: `wide` -> `col-span-2`, `tall` -> `row-span-2`, `normal` -> 1x1, each with a fixed `aspect-ratio` so the grid stays tidy. Black canvas so the uploaded media supplies all the color. Verified across 375/768/1024/1440 via Playwright (temp placeholders, removed before commit).
- **Mixed media, no editor friction:** the component branches on file extension - `.mp4/.webm/.mov` render as `<video muted loop playsinline preload="none">`, everything else (`jpg/png/webp/avif/gif`) as `<img loading="lazy" decoding="async">`. Editors just upload a file in Tina; no "type" field to pick.
- **Motion + performance guards:** an IntersectionObserver fade-up reveal stagger (unobserves after firing); a second IO plays videos only while on-screen and pauses them off-screen so off-screen clips never decode (keeps Lighthouse Perf / TBT in range). Both gated on `prefers-reduced-motion: reduce` (reveal off, videos never autoplay). Verified reduced-motion shows all tiles statically with no console errors.
- **Heading + reveal reuse existing systems:** the `<h2 class="section-heading h-display" data-fit>` auto-receives the scroll typewriter (`initHeadingTypewriter`) and fitLine 2-line sizing already in place; no new motion wiring. Eyebrow "Our Work", heading `WORK THAT` / `SPEAKS FOR ITSELF.`
- **Robust empty/variable state:** ships with `content/showcase.json` = `{ "items": [] }` and renders a tasteful "work on the way" placeholder until the team adds tiles. The grid holds at any item count or media mix.
- **TinaCMS:** new `showcase` collection in `tina/config.ts` (singleton, `create/delete` disabled, like testimonials) with fields `media` (image, required), `alt` (string, required), `span` (normal/wide/tall). `media.tina.mediaRoot` widened from `images/brand-logos` to `images` so the media manager can browse/upload across `public/images/**` (low-risk: no logos uploaded yet). `tina-lock.json` regenerated.
- **SectionNav:** added a "Work" tab between "Brands" and "Process".
- **`CONTENT-GUIDE.md`:** plain-language handoff doc for the team - step-by-step for adding testimonials and showcase media through `/admin`, supported file types, media tips, and "you cannot break the layout" reassurance.

### 0. Hero/testimonials UI polish pass

**Files:** `src/components/Hero.astro`, `src/components/Testimonials.astro`, `src/motion/fit.ts`, `src/motion/hero.ts`, `content/testimonials.json`

- **Hero logo blur:** the source asset `chrono8-logo.png` is only 378x674px - too low-res to render sharply at its previous display size (`clamp(220px, 26vw, 360px)`) on Retina/2x displays. Reduced to `clamp(170px, 19vw, 260px)` on desktop (and proportionally on mobile/tablet) to bring it closer to native resolution. True sharpness still requires a higher-resolution export of the same artwork - flagged as an open item.
- **Hero headline/logo overlap on load (race condition):** `fitAll()` (the 2-line headline auto-shrink safety net) is triggered by multiple independent async events - `document.fonts.ready`, `window.load`, resize. If one of those fired while the hero typewriter animation was mid-type (partial text in line 1, line 2 still empty), it would measure the short/incomplete text, find no overflow, and lock `--fit-scale` back to `1` (full size). The typewriter then kept typing the rest of the headline at that unscaled size, overlapping the hero logo. Fixed by adding `setFitSuppressed()` to `fit.ts`: the typewriter now suppresses all external `fitAll()` calls for its duration and only allows the authoritative re-measurement once the full final text is back in the DOM (`hero.ts` `onComplete`). Verified via a one-off Playwright screenshot check (mid-animation and settled states), not committed to the repo.
- **Testimonial card sizing:** cards were too small to read at desktop sizes (240px/268px). Resized to 280px (mobile) -> 340px (tablet, 768px+) -> 400px (desktop, 1024px+), with proportionally larger padding, font sizes, and quote icon at each breakpoint.
- **Marquee pause/resume bug:** pausing the testimonial marquee on hover/long-press was driven entirely by CSS `:hover`/`:focus-within` on `.marquee-viewport`. The hover tooltip bubble renders as a `position: fixed` overlay outside that viewport in the DOM, so the moment the cursor traveled from a card onto the open bubble, `:hover` went false and the marquee resumed scrolling mid-read. Replaced with a JS-driven `.is-paused` class on `.marquee-track`, toggled directly by the bubble's own show/hide lifecycle (`showBubble`/`hideBubble`) instead of raw `:hover`, so the pause now persists for the entire time the bubble is open regardless of cursor position, across mouse, keyboard focus, and mobile long-press.
- **Marquee loop copies (4 -> 8):** the loop rendered exactly 4 copies of the testimonials array and animated by a fixed `-25%` (one set's width) per cycle. That math only stays gapless if `items.length x cardWidth` is wide enough to fully cover the viewport at the animation's widest point - which gets tight on ultra-wide monitors (2560px+) once item count drops to 1-2 (as it will during TinaCMS content testing) combined with the larger card sizes above. Bumped to 8 copies (`-12.5%` per cycle) so the loop stays seamless regardless of how many real testimonials TinaCMS ends up serving, from 1 up to ~20+.
- **Testimonials trimmed to 2 items** in `content/testimonials.json` for TinaCMS testing; the remaining 2 (Josh King Madrid, RYZE Performance) will be replaced with real content once it's entered through the TinaCloud admin.
- **Queued, not fixed yet:** dedupe testimonial brands so the same brand never appears twice while scrolling - revisit once real TinaCMS content is in.

### 1. Cloudflare deployment fixed - TinaCMS build chain

**Files:** `package-lock.json`, `tina/tina-lock.json`, `.gitignore`

The first production deploy to Cloudflare failed for four separate reasons, fixed in sequence:

- **Lock file out of sync:** `@tinacms/cli` and `tinacms` were added to `package.json` without running `npm install` afterward, so `package-lock.json` was missing their entire dependency tree. `npm ci` (used by Cloudflare) refuses to install when the lock file and `package.json` disagree. Fixed by running `npm install` locally and committing the regenerated lock file.
- **Missing `tina-lock.json`:** TinaCloud requires a schema fingerprint file generated by running `tinacms dev` (or `build`) at least once locally. Added `tina/tina-lock.json` to the repo so the schema is available at build time.
- **Build artifacts excluded:** `tina/__generated__/` and `public/admin/` are regenerated on every build and were added to `.gitignore` rather than committed.
- **Wrong environment-variable scope:** Cloudflare's unified Workers & Pages UI has two separate "Variables and secrets" panels for the same project - one under **Runtime** (used when the deployed Worker serves live requests) and one under **Build** (used while `npm run build` executes). `TINA_PUBLIC_CLIENT_ID` and `TINA_TOKEN` were initially set only under Runtime, so `tinacms build` still failed with "Client not configured properly." Re-added both variables under the **Build** section, which Cloudflare actually reads during the build step.
- **Unindexed branch:** even with correct credentials, TinaCloud rejected the build with "Branch 'main' is not on TinaCloud" until the `main` branch was manually added and indexed in the TinaCloud project's Configuration > Branches screen.

Site is now live and building successfully on every push to `main`.

---

## 2026-06-18

### 1. Testimonials section - RTL marquee with hover/longpress bubble

**Files:** `src/components/Testimonials.astro`, `content/testimonials.json`

Replaced the static brand-logo grid and single swappable quote panel with a continuous right-to-left CSS marquee. Key rules applied:

- **Animation:** `@keyframes c8-marquee-rtl` translates the track from `0` to `-25%`. Four copies of the items are rendered so the total track width is always wider than any viewport (4 items x ~276px x 4 = ~4416px), preventing gaps at 1920px+. Duration: 36s linear infinite.
- **Pause on interaction:** `.marquee-viewport:hover` and `:focus-within` set `animation-play-state: paused` so the card stays in place while the user reads.
- **Hover bubble (desktop):** `mouseenter` on any card pauses the marquee, populates a fixed-position `#testimonial-bubble` overlay with the full quote, name, and title, then positions it below the card via `getBoundingClientRect()`. A 180ms `hideTimer` grace period lets the cursor travel from card to bubble without the bubble closing. `mouseleave` on either the card or bubble triggers the hide.
- **Long-press bubble (mobile):** `touchstart` starts a 500ms timer. `touchend`, `touchmove`, and `touchcancel` cancel it. If the timer fires, the bubble appears and auto-dismisses after 5s. Tap outside to dismiss early. Hover styles are suppressed on `(hover: none)` devices so cards do not lift on touch.
- **Bubble positioning:** fixed to viewport, centered horizontally on the card, clamped 16px from screen edges. Flips above the card if insufficient room below. Arrow caret repositions to match. Reposition fires on `scroll` and `resize` via `requestAnimationFrame`.
- **Accessibility:** every card has `tabindex="0"`, `aria-label` with brand name and quote excerpt, `role="listitem"`. Focus shows bubble; blur hides it. Visible 2px orange `outline` on `:focus-visible`. `prefers-reduced-motion: reduce` disables the animation and falls back to a wrapped flex grid.
- **Mobile-first card sizing:** 240px wide at base, 268px at `768px+`. Tap targets exceed 44x44px.

### 2. Tina CMS - testimonials collection wired

**Files:** `tina/config.ts`, `content/testimonials.json`, `package.json`, `.env.example`

Tina CMS added so non-technical team members can manage testimonials without touching code.

- **Schema:** singleton collection at `content/testimonials.json` with an `items` array. Each item has five fields: Brand Name, Person Name, Person Title, Quote (textarea), Brand Logo (image upload). `itemProps` surfaces the brand name as the list row label in the admin UI.
- **Content source:** `Testimonials.astro` imports directly from `content/testimonials.json` at build time. The `TESTIMONIALS` export in `content.ts` is still used for `eyebrow` and `heading`; items come from the JSON file.
- **Scripts:** `dev` changed to `tinacms dev -c "astro dev"` (Tina wraps Astro). `build` changed to `tinacms build && astro build`. `astro` script added as a no-Tina fallback for local preview before TinaCloud credentials are configured.
- **Credentials:** `TINA_PUBLIC_CLIENT_ID` and `TINA_TOKEN` are read from environment variables. Both `null` in local mode (admin works on localhost only). Once set in Cloudflare Pages env vars, `/admin` becomes accessible at the live domain for the team.
- **`.env.example`** added to document required variables for future contributors.

---

## 2026-06-12

### 1. Em dash purge

**Scope:** `src/data/content.ts`, `src/motion/scramble.ts`, all code comments.

Em dashes (`--`) were banned site-wide per project style rules. All instances were replaced with colons, hyphens, or split sentences. The `scramble.ts` character-allowlist regex had `--` removed so the typewriter effect never re-introduces them. Confirmed zero em dashes remain via full source scan.

### 2. Pillar scroll animation snap fix

**File:** `src/components/PillarsStack.astro`

Root cause: `.pillars-pin` had both CSS `position: sticky; top: 0` and GSAP `pin: '#pillarsPin'` active at the same time. CSS sticky keeps an element in place continuously throughout the scroll range; GSAP pin applies `position: fixed` only at trigger entry. The two mechanisms competed at the trigger boundary, producing a hard visual snap.

Fix: removed `position: sticky; top: 0` from `.pillars-pin`, giving GSAP exclusive control. The prior-session additions (`anticipatePin: 1`, `scrub: 1.2`, `CROSSFADE_START: 0.5` in `src/motion/scroll.ts`) were already correct and remain.

### 3. Hero desktop headline positioning

**Files:** `src/components/Hero.astro`, `src/motion/fit.ts`

Root cause: the hero used a `md:grid-cols-[1.1fr_1fr]` two-column grid (768px breakpoint), which gave the headline only about 50% of viewport width. The font size was `vw`-based, so `fitLine` had to compress the text down to roughly 51px at 1440px - visually broken compared to the full-bleed prototype.

Fix: restructured to a full-width flex-column layout matching the prototype. Key changes:

- `hero-inner`: `flex-direction: column; justify-content: space-between; min-height: 100svh`
- `hero-headline-wrap`: full width on mobile/tablet
- `hero-logo-wrap`: `position: absolute; right: 0; top: 50%; transform: translateY(-50%)` at `1024px+`; matching `padding-right` on the headline wrapper so `fitLine` measures the correct available width
- Font size upgraded from `clamp(1.7rem, 6.5vw, 7rem)` to `calc(clamp(2.5rem, 11vw, 9rem) * var(--fit-scale))`

`fit.ts` also received a `window.load` backup listener. Google Fonts loaded via CSS `@import` can resolve after `document.fonts.ready`, causing `fitLine` to measure with the wrong font metrics. The `load` event fires after all resources are fetched, guaranteeing a second measurement pass with real glyphs.

### 4. Hero logo hover removal

**File:** `src/components/Hero.astro`

The `.hero-logo-3d` had a `mousemove` handler on `.hero-logo-wrap` that cancelled the idle ambient float and replaced it with a cursor-tilt (`rotateX`/`rotateY` tied to mouse position). The `mouseleave` handler restarted the ambient float.

Removed the `mousemove` and `mouseleave` block entirely. The idle ambient float (`tick()` function - sine/cosine waves driving `translateY`, `rotateX`, `rotateY`) is untouched and continues running.
