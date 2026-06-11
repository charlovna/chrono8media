# Changelog

All notable changes to the Chrono8 Media frontend build are recorded here.

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
