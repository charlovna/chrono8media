# Chrono8 Media — Landing Page Build Prompt (v2 — FINAL)

> **For:** Claude Code (or equivalent downstream Claude instance)
> **From:** Senior dev assistant — planning phase complete, audit passed
> **Project:** Single long-scroll marketing landing page for Chrono8 Media
> **Status:** All foundational decisions locked. Build to spec. Where multiple options exist, the ⭐ default is locked in unless the user overrides.

---

## 1. Project Brief

Chrono8 Media is a marketing agency for brands that want to grow. Service pillars: **Content, Design, Strategy, Consistency**. The conversion mechanic is mobile-first and single-channel: every CTA on the site routes the user to DM **"GROW"** on Instagram (`@chrono8media`). There is intentionally no on-site form, no Calendly, no email capture, no chatbot.

The page exists to:
1. Telegraph brand confidence within 1.5 seconds of scroll
2. Prove credibility through testimonials, case studies, and live IG output
3. Drive Instagram DMs

**Target audience:** founders, e-commerce operators, and small business owners ready to invest in growth marketing.
**Tone:** direct, confident, no fluff, no marketing-bingo.

---

## 2. Tech Stack (LOCKED)

| Layer | Choice |
|---|---|
| Framework | **Astro 6** (SSG, islands architecture) |
| Hosting | **Cloudflare Pages** |
| Styling | **Tailwind CSS v4** with `@theme` design tokens |
| Smooth scroll | **Lenis** (latest stable) |
| Motion | **GSAP** + ScrollTrigger + SplitText + Flip plugins |
| IG embed | **Behold.so** web component |
| Type hosting | **Self-hosted** WOFF2 in `/public/fonts/` |
| Analytics | **Cloudflare Web Analytics** |
| Image optimization | **Astro `<Image>`** (AVIF first, WebP fallback) |
| Sitemap | **@astrojs/sitemap** integration |

**Explicitly NOT in scope:** React (unless wrapped as a single island; native `.astro` preferred), Next.js / Remix / SvelteKit, a CMS, a backend or database, auth, email forms, Calendly, chatbots, cookie banners.

---

## 3. Brand Source of Truth

### 3.1 Color Tokens

```css
@theme {
  --color-c8-orange:        #FF5A1F;
  --color-c8-orange-deep:   #E04A14;  /* hover / active */
  --color-c8-black:         #0A0A0A;
  --color-c8-white:         #FFFFFF;
  --color-c8-grain:         #1A1A1A;  /* noise overlay tint */
}
```

**Rule:** Only these five colors. No grays, no soft neutrals, no tinted backgrounds.

### 3.2 Typography

- **Display:** PP Neue Machina (Pangram Pangram) — Regular, Ultrabold, Ultrabold Italic
- **Body:** PP Neue Montreal — Regular, Medium, Bold, Italic

**⚠️ Font licensing is user responsibility.** PP Neue Machina and PP Neue Montreal are commercial fonts from Pangram Pangram. The user must legally purchase or confirm free-tier coverage at [pangrampangram.com](https://pangrampangram.com) before the build agent commits any font files to the repo. Do not download from unlicensed sources.

**REJECTED fonts:** Anton, Bebas Neue, Oswald, Roboto Condensed, or any free condensed display sans. Generic slop. Hard reject.

```css
@font-face {
  font-family: 'PP Neue Machina';
  src: url('/fonts/PPNeueMachina-Ultrabold.woff2') format('woff2');
  font-weight: 800;
  font-display: swap;
}
/* Repeat for every weight/style of both families */
```

### 3.3 Type Scale (Fluid)

```css
@theme {
  --font-display: 'PP Neue Machina', system-ui, sans-serif;
  --font-body:    'PP Neue Montreal', system-ui, sans-serif;

  --text-h1:      clamp(4rem, 12vw, 10rem);      /* 64–160px */
  --text-h2:      clamp(3rem, 8vw, 6rem);        /* 48–96px */
  --text-h3:      clamp(1.5rem, 3vw, 2.5rem);    /* 24–40px */
  --text-body:    clamp(1rem, 1.2vw, 1.125rem);  /* 16–18px */
  --text-eyebrow: 0.75rem;
}
```

**Headline rules:** uppercase, `letter-spacing: -0.02em`, `line-height: 0.95`. **Italic accents ONLY on emphasis words.** Never full-italic headlines, never script fonts.

**Body rules:** sentence case, `line-height: 1.6`, `max-width: 60ch`.

### 3.4 Voice / Copy Rules

- Direct. No "we believe" / "we leverage" / "synergize"
- Short sentences. Punchy verbs.
- Headlines in caps. Body in sentence case.
- **CTA copy locked:** `DM US "GROW"` everywhere — no variants
- IG handle: `@chrono8media`

### 3.5 Logo

User-supplied SVG: interlocking white "8" / infinity loops. Expected viewBox: `0 0 400 400` (square), white path on transparent background. Place in `src/components/Logo.astro` as inline SVG (allows CSS animation via GSAP).

**Usage rules:**
- White on orange (orange backgrounds)
- White on black (black backgrounds)
- Never on white, never recolored, never on photography

### 3.6 Design Principles (Non-Negotiable)

1. **NO GENERIC SLOP.** Reject templated patterns.
2. **Type does the work.** Photography and 3D are supporting cast.
3. **High contrast or nothing.** Orange-black-white only.
4. **Mobile-first.** Build portrait first.
5. **Motion reinforces meaning.** Never decorative.

---

## 4. Information Architecture — 9 Sections + Footer

URL: `/` only. No internal routing. Anchor links permitted for sticky CTA.

### §1 — Hero

**Layout:**
- Full viewport, orange background (`--color-c8-orange`)
- Subtle noise: SVG `feTurbulence` filter at 4% opacity OR static `/noise.png` overlay

**Headline copy options** — six locked, build default is option 1 (⭐) unless user overrides:

1. ⭐ **`STOP POSTING. START *COMPOUNDING*.`** — operator voice, ties to Consistency pillar
2. `GROWTH ISN'T A STRATEGY. *CONSISTENCY* IS.` — contrarian reframe
3. `WE MAKE BRANDS *IMPOSSIBLE* TO IGNORE.` — capability claim
4. `DAILY CONTENT. COMPOUND *RETURNS*.` — mechanical, founder-speak
5. `BUILT FOR BRANDS THAT WANT TO *GROW*.` — safe, mirrors existing IG creative
6. `MOST BRANDS DON'T DIE. THEY *FADE*.` — provocative, names the fear

Italic word in each is set in Neue Machina Ultrabold Italic. Other words in Neue Machina Ultrabold.

**Other elements:**
- **Eyebrow** (above headline): `CONTENT • DESIGN • STRATEGY • CONSISTENCY` — Neue Montreal Medium, white, 12px, `tracking: 0.12em`
- **Logo:** TWO instances —
  - Foreground: SVG interlocking-8 at top-left, 60px × 60px, fully opaque white
  - Background ghost: same SVG scaled to 80vw, centered behind text, 8% opacity, white
- **CTA button** (locked styling):
  - Background: `--color-c8-black`
  - Text: `--color-c8-white`
  - Padding: 18px 32px
  - Border-radius: 999px (full pill)
  - Font: Neue Montreal Bold, 16px, letter-spacing 0.02em
  - Label: `DM US "GROW" →`
  - Href: `https://instagram.com/chrono8media`, `target="_blank"`, `rel="noopener noreferrer"`
  - Hover: `translateY(-2px)`, background → `--color-c8-orange-deep`, 200ms ease

### §2 — Trust Marquee

- Full-width band, 140px tall, black background
- Infinite horizontal marquee — **DOM-duplicate the list 2x** for seamless loop (CSS animation translates `-50%` over the doubled track)
- Loop duration: **60s** (one full pass)
- Pause-on-hover: **OFF** (keep momentum, don't let user stop the proof)
- Names in Neue Machina Bold, white, 48px
- Separators: small interlocking-8 logo glyph (24px, white) between each name
- Initial roster: `JOSH KING MADRID · GEOFFREY HURTH · LOUISE MENDEZ · CRISTINA MIGUEZ`

### §3 — Problem Frame

- Black background, 100vh
- Content vertically centered (`flex items-center justify-center`)
- **Headline:** `MOST MARKETING DIES IN THE SCROLL.` — H2 scale, white
- **Sub-copy** (Neue Montreal Regular, 20px, max-width 480px, centered, white): *"Forgettable content. Templated design. Zero strategy. No consistency. That's why your brand isn't growing."*
- **Motion:** SplitText word-by-word reveal triggered when section is 40% into viewport (`start: 'top 60%'`). Each word: `opacity 0 → 1`, `y: 20 → 0`, stagger 0.08s, ease `power3.out`

### §4 — The 4 Pillars (Pinned Scroll Stack)

- Four full-viewport cards, pinned via GSAP ScrollTrigger
- ScrollTrigger config: `pin: true`, `scrub: 1`, `end: '+=400%'` (4 cards × 100vh scroll each)
- Card transition: **crossfade** between cards as scroll progresses (no slide, no cut)
- Card backgrounds alternate: Orange → Black → Orange → Black
- Each card layout:
  - Pillar number (`01`, `02`, `03`, `04`) — Neue Machina Ultrabold, 30vw, opacity 12%, positioned top-left
  - Pillar name — Neue Machina Ultrabold, 12vw, centered
  - Sub-copy — Neue Montreal Regular, 18px, max-width 600px, centered below name
  - Interlocking-8 logo mark — bottom-right, 80px, 14% opacity

**Pillar copy:**

1. **CONTENT** — *That gets attention.* Stop-the-scroll posts, reels, and short-form built for algorithms, not for awards.
2. **DESIGN** — *That builds authority.* Visuals that don't just look good — they make your brand impossible to ignore.
3. **STRATEGY** — *That drives growth.* Every post earns its place. Every campaign maps to a number.
4. **CONSISTENCY** — *That delivers results.* Daily output. Compound returns. The only thing that actually moves the needle.

### §5 — The Work (2–3 Hero Case Studies)

- Black background
- Eyebrow: `SELECTED WORK` — top of section, white, Neue Montreal Medium
- 2–3 case study cards, vertically stacked, ~80vh each, 8vh gap between

**Each card structure:**
- Industry tag (eyebrow): `[INDUSTRY] · [TIMEFRAME]`
- Hero metric (huge Neue Machina Ultrabold, 18vw, orange): e.g. `+340%`
- Metric label (Neue Montreal Medium, 24px, white): e.g. `engagement in 90 days`
- Outcome line (Neue Montreal Regular, 18px, white at 70% opacity, max-width 500px)
- 3 capability bullets (Neue Montreal Regular, 14px, eyebrow-style with `•` separator)
- Parallax background image: `transform: translateY()` from `+10%` to `-10%` across scroll range (50% relative speed, Y-axis only)
- Metric counter animation: GSAP `to(element, { textContent: targetValue, duration: 2, snap: { textContent: 1 }, ease: 'power3.out' })` triggered when card enters viewport

**Case Study Template (for user to populate):**

```
CLIENT NAME: [Brand or person name]
INDUSTRY: [E-commerce / SaaS / Personal brand / Service / Coaching]
TIMEFRAME: [e.g. 90 days, 6 months, Q3 2025]

HERO METRIC: [The single biggest number — e.g. +340% / 12x / $1.2M / 100K]
METRIC LABEL: [What the number measures — e.g. engagement / followers / pipeline / revenue]
METRIC TIMEFRAME: [Time context for the metric — e.g. in 90 days / since launch]

OUTCOME (1 sentence): [What changed for the client in plain English]

WHAT WE DID (3 bullets, ≤8 words each, each tied to a pillar):
- [Content action]
- [Design action]
- [Strategy or Consistency action]

VISUAL: [Path to hero image — actual work screenshot, not stock]
ALT TEXT: [Accessibility description of the visual]

OPTIONAL: Extended case link (Notion / IG carousel / dedicated subpage URL)
```

**Worked Example 1 (use as reference for tone/structure):**

```
CLIENT NAME: Geoffrey Hurth — RYZE Performance
INDUSTRY: Personal brand / Performance coaching
TIMEFRAME: 6 months

HERO METRIC: 12x
METRIC LABEL: inbound DMs per week
METRIC TIMEFRAME: in 6 months

OUTCOME: Geoffrey went from a barely-active Instagram presence to a daily content engine — RYZE waitlist consistently full, lead quality up across every inbound channel.

WHAT WE DID:
- Built short-form video system
- Redesigned brand visual identity
- Locked daily posting + weekly review

VISUAL: /images/case-studies/ryze-feed.webp
ALT TEXT: Geoffrey Hurth Instagram profile showing recent reel performance metrics.

OPTIONAL: —
```

**Worked Example 2:**

```
CLIENT NAME: BARE Skin Co.
INDUSTRY: E-commerce (DTC skincare)
TIMEFRAME: 90 days

HERO METRIC: +340%
METRIC LABEL: engagement
METRIC TIMEFRAME: in 90 days

OUTCOME: Founder went from posting weekly to a daily content engine that converted scroll into sales — DMs up 5x, store sessions up 220%.

WHAT WE DID:
- Built 30-day content sprint
- Redesigned grid + reel covers
- Locked daily posting cadence

VISUAL: /images/case-studies/bare-skin-grid.webp
ALT TEXT: BARE Skin Co. Instagram grid showing 9 cohesive product posts.

OPTIONAL: https://instagram.com/p/[example]
```

The build agent should scaffold §5 with these two examples as placeholder content. User replaces with real cases before launch.

### §6 — Testimonials

- Orange background
- Eyebrow: `WHAT CLIENTS SAY` — Neue Montreal Medium, 12px, white at 80% opacity
- Grid: 1 column mobile, 2 columns desktop (`md:grid-cols-2` — 768px breakpoint)
- Card style: **white background**, 32px padding, 16px border-radius, `shadow-2xl` (large soft shadow)
- Each card contains:
  - Headshot: circle, 80px, top of card
  - Quote: Neue Montreal Regular, 22px, black, leading 1.5
  - Name: Neue Machina Bold, 18px, black, top margin 24px
  - Title: Neue Montreal Regular, 14px, black at 60% opacity
- Motion: `ScrollTrigger.batch` — fade-up + stagger 0.1s when cards enter viewport

**Testimonial copy (verbatim from existing brand creative):**

1. **Josh King Madrid** — *Entrepreneur / Internet Personality*
   > "Chris and the team just get it. The visuals, videos, and website all turned out better than we expected!"

2. **Geoffrey Hurth** — *Founder of RYZE Performance*
   > "Fast, smooth, and super easy to work with. Every deliverable turned out great, I would definitely recommend them!"

3. **Louise Mendez** — *Founder & Director at Cold Digital Agency*
   > "We started with graphics but ended up trusting them with everything. Super happy with how our social media looks right now!"

4. **Cristina Miguez** — *CEO of DiR Marketing*
   > "We've worked with Chrono8 Media on multiple projects already, and they never disappoint. It's rare to find a team this reliable long-term."

### §7 — Process (How We Work)

- Black background, 100vh
- Eyebrow: `HOW WE WORK` — top
- **Desktop layout:** horizontal scroll-snap — 3 full-viewport-wide steps, swipe/scroll horizontally
- **Mobile layout:** vertical stack — each step ~70vh
- Each step:
  - Numeral (`01`, `02`, `03`) — Neue Machina Ultrabold, 25vw, orange
  - Step title (Neue Machina Ultrabold, 6vw, white, uppercase)
  - Step description (Neue Montreal Regular, 18px, white at 80%, max-width 480px)

**Step copy:**

1. **DISCOVERY DM** — You DM us "GROW." We learn your business, audience, current state.
2. **STRATEGY + BUILD** — We map the content engine, design the system, ship the assets.
3. **SHIP + ITERATE** — We post, you grow. Daily output, weekly review, monthly compounding.

### §8 — Qualifier (Built For / Not For)

- Desktop: split diptych, 50/50 width — **left = orange, right = black** (locked)
- Mobile: vertically stacked, orange block first, black block second
- Each block 100vh on desktop, 70vh on mobile

**Left block (orange) — `BUILT FOR`:**
- Header: Neue Machina Ultrabold, 80px, white
- List items (Neue Montreal Medium, 24px, white) with **Lucide `check` icon** (24px, white):
  - Brands ready to scale
  - Founders who get that marketing compounds
  - Teams that value consistency over flash
  - Operators who think in metrics

**Right block (black) — `NOT FOR`:**
- Header: Neue Machina Ultrabold, 80px, orange
- List items (Neue Montreal Medium, 24px, white) with **Lucide `x` icon** (24px, orange):
  - Anyone looking for cheap deliverables
  - One-off graphic requests
  - Brands chasing hype without strategy
  - Anyone who wants results without showing up daily

Motion: ScrollTrigger `fromTo` — left block slides in from left (`x: -50 → 0`, opacity 0 → 1), right block slides in from right simultaneously. 800ms ease `power3.out`.

### §9 — Final CTA + Live Instagram Feed

- Full-bleed orange, ~120vh
- Interlocking-8 logo at 40vw scale, centered, 10% opacity, slight parallax (`y: 0 → -10%` across section scroll)

**Top half (~50vh):**
- Headline: `READY TO *GROW* YOUR BRAND?` — H1 scale, "GROW" italic Ultrabold, rest Ultrabold
- Sub: `DM US "GROW" TO GET STARTED` — Neue Montreal Bold, 24px, white at 80%
- Oversized CTA button: same style as hero CTA, scaled 1.5x (height 84px, padding 24px 48px, font 20px)

**Bottom half (~50vh):**
- **Behold.so Instagram feed embed** — 6 most recent posts from `@chrono8media`
- Grid: 3 columns desktop, 2 columns mobile
- Aspect ratio: 1:1 square
- Hover: scale 1.04, 200ms ease
- Gap color: white, 8px gap size
- **Loading strategy:** lazy-load the Behold widget script via `IntersectionObserver` when §8 enters viewport. This avoids LCP/TBT impact on initial load.
- **Fallback:** if Behold widget fails to load (network error, account issue), show a static link in its place:
  ```html
  <a href="https://instagram.com/chrono8media" target="_blank" rel="noopener noreferrer">
    View our work on Instagram →
  </a>
  ```
  Style: white text, Neue Montreal Medium, 18px, underline on hover.

**Behold embed code:**

```html
<div class="behold-wrapper">
  <behold-widget feed-id="YOUR_FEED_ID_HERE"></behold-widget>
</div>
<!-- Script lazy-injected via IntersectionObserver in §9 component -->
```

### Footer

- Black, ~80px tall, minimal
- Logo (small, 32px) on left
- IG handle on right: `@chrono8media →` linking to profile (with `target="_blank" rel="noopener noreferrer"`)
- Center: `© 2026 Chrono8 Media`
- No nav links. No menu. No sitemap link visible (sitemap exists for crawlers only).

### Sticky Floating CTA

- Appears bottom-right when `window.scrollY > window.innerHeight` (i.e. user has scrolled past §1)
- Hides during §9 (which has its own oversized CTA) — detect via ScrollTrigger or intersection with the §9 element
- Pill button: `DM "GROW" →` — black pill, white text, Neue Montreal Bold 14px, 14px x-padding 24px y-padding, 999px radius
- Position: `fixed bottom-6 right-6`, z-index above all content
- Animation in: `opacity 0 → 1`, `translateY 20 → 0`, 300ms ease
- Same href + target/rel as hero CTA

---

## 5. Motion System

### 5.1 Lenis Init

```ts
// src/motion/lenis.ts
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const isTouch = /iPhone|iPad|Android/i.test(navigator.userAgent);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!isTouch && !reducedMotion) {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
```

### 5.2 GSAP Plugins (Register Once)

- **ScrollTrigger** — viewport-cued animations
- **SplitText** — char/word headline reveals (free via Club GSAP since 2024)
- **Flip** — hero logo positional transitions

### 5.3 Motion Inventory

| Section | Effect | GSAP Tool | Key Parameters |
|---|---|---|---|
| §1 Hero | Char-by-char headline entrance on load | `SplitText` + timeline | stagger 0.03s, ease `expo.out` |
| §1 Hero | Logo rotate+scale on load, settle to top-left | `Flip` + timeline | duration 1.2s, ease `expo.out` |
| §2 Trust | Infinite horizontal marquee | `gsap.to` `repeat: -1` | duration 60s, linear |
| §3 Problem | Word-by-word reveal | `ScrollTrigger` + `SplitText` | start `top 60%`, stagger 0.08s |
| §4 Pillars | Pinned card stack with crossfade | `ScrollTrigger pin + scrub` | `end '+=400%'`, scrub 1 |
| §5 Work | Metric counter-up | `gsap.to` with `snap: 1` | duration 2s, ease `power3.out` |
| §5 Work | Parallax case study imagery | `ScrollTrigger scrub` on Y | `y: 10% → -10%` |
| §6 Testimonials | Stagger fade-up cards | `ScrollTrigger.batch` | stagger 0.1s, duration 600ms |
| §7 Process | Horizontal scroll-snap (desktop) | CSS `scroll-snap-type` + ScrollTrigger pin (optional) | snap to step on scroll |
| §8 Qualifier | Diptych slide-in left + right | `ScrollTrigger fromTo` | duration 800ms, ease `power3.out` |
| §9 Final | Logo parallax + button micro-pulse | `ScrollTrigger scrub` + `gsap.to` infinite | button scale 1 ↔ 1.02 every 2s |

### 5.4 Hero Logo Choreography (Exact)

```ts
// On page load:
const tl = gsap.timeline();

tl.from('.hero-logo', {
  scale: 0,
  rotation: -180,
  opacity: 0,
  duration: 1.2,
  ease: 'expo.out',
})
.from('.hero-headline .char', {
  opacity: 0,
  y: 40,
  stagger: 0.03,
  ease: 'expo.out',
}, '-=0.8')
.from('.hero-eyebrow', {
  opacity: 0,
  y: 10,
  duration: 0.6,
  ease: 'power2.out',
}, '-=0.4')
.from('.hero-cta', {
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: 'power2.out',
}, '-=0.4');
```

Note: there is no nav element. Logo settles to its locked position (top-left, 60px) and stays there. The "Flip" plugin is included for completeness in case nav is added later but is **not used in v1**.

### 5.5 Performance Guardrails

- All motion JS in a single Astro client island (`<MotionRoot client:visible />` mounted at root)
- Budget: ~80KB total motion JS gzipped (GSAP core + ScrollTrigger + SplitText + Lenis)
- **`prefers-reduced-motion: reduce`:** disable Lenis, skip ScrollTrigger animations, fall back to Tailwind `motion-safe:` utilities (basic CSS fade-ins only)
- Verify GSAP loads only once, deferred
- Lazy-load Behold widget script when §8 enters viewport

---

## 6. Instagram Embed (Behold.so) — Setup

1. Sign up at [behold.so](https://behold.so)
2. Connect `@chrono8media` Instagram account (requires Business or Creator account on Meta side)
3. Create feed widget:
   - Layout: grid
   - Posts: 6 most recent
   - Aspect ratio: 1:1
   - Hover: scale 1.04, 200ms ease
   - Background: `#FF5A1F`
   - Gap color: `#FFFFFF`, gap size 8px
   - Captions: hidden
4. Copy `feed-id` from Behold dashboard
5. Replace `YOUR_FEED_ID_HERE` placeholder in §9 component

**Pricing:** Free tier (1 feed, unlimited views) is sufficient for launch. Upgrade to Pro ($5/mo) only if refresh-rate becomes an issue.

**Fallback:** if widget fails, the static link defined in §9 displays instead. See §9 spec.

---

## 7. SEO & Meta

### 7.1 `<head>` Meta Tags

```html
<title>Chrono8 Media — Built for brands that want to grow</title>
<meta name="description" content="Content, design, and strategy for brands ready to scale. DM @chrono8media 'GROW' on Instagram to get started.">
<meta name="theme-color" content="#FF5A1F">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="Chrono8 Media — Built for brands that want to grow">
<meta property="og:description" content="Content. Design. Strategy. Consistency. Built for brands ready to scale.">
<meta property="og:image" content="https://chrono8media.com/og-image.png">
<meta property="og:url" content="https://chrono8media.com">

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Chrono8 Media — Built for brands that want to grow">
<meta name="twitter:description" content="Content. Design. Strategy. Consistency.">
<meta name="twitter:image" content="https://chrono8media.com/og-image.png">

<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

### 7.2 OG Image Spec

- Dimensions: 1200 × 630 px
- Format: PNG
- Background: `--color-c8-orange` (`#FF5A1F`) with subtle noise
- Foreground: interlocking-8 logo (white, 200px), positioned center-left
- Right side: headline `STOP POSTING. START COMPOUNDING.` in Neue Machina Ultrabold, white, with "COMPOUNDING" in italic
- Bottom: `DM US "GROW" → @chrono8media` in Neue Montreal Bold, 32px, white

Save as `/public/og-image.png`.

### 7.3 Favicon

- `/public/favicon.svg` — interlocking-8 logo, white on orange, 32×32 viewBox-scaled
- `/public/apple-touch-icon.png` — 180×180 PNG version of the same

### 7.4 robots.txt + Sitemap

`/public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://chrono8media.com/sitemap-index.xml
```

In `astro.config.mjs`, add `@astrojs/sitemap` integration. It auto-generates `sitemap-index.xml` at build time.

---

## 8. File Structure

```
chrono8media/
├── public/
│   ├── fonts/
│   │   ├── PPNeueMachina-Regular.woff2
│   │   ├── PPNeueMachina-Ultrabold.woff2
│   │   ├── PPNeueMachina-UltraboldItalic.woff2
│   │   ├── PPNeueMontreal-Regular.woff2
│   │   ├── PPNeueMontreal-Medium.woff2
│   │   ├── PPNeueMontreal-Bold.woff2
│   │   └── PPNeueMontreal-Italic.woff2
│   ├── images/                  # case study visuals (AVIF/WebP optimized)
│   ├── noise.png                # 4% opacity grain texture
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── og-image.png
│   └── robots.txt
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── TrustMarquee.astro
│   │   ├── ProblemFrame.astro
│   │   ├── PillarsStack.astro
│   │   ├── CaseStudies.astro
│   │   ├── Testimonials.astro
│   │   ├── Process.astro
│   │   ├── Qualifier.astro
│   │   ├── FinalCTA.astro
│   │   ├── Footer.astro
│   │   ├── StickyCTA.astro
│   │   ├── MotionRoot.astro
│   │   └── Logo.astro
│   ├── styles/
│   │   └── global.css
│   └── motion/
│       ├── lenis.ts
│       ├── scroll.ts
│       └── hero.ts
├── astro.config.mjs             # @astrojs/sitemap registered here
├── tailwind.config.ts           # mostly empty in v4
└── package.json
```

---

## 9. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | 100 |
| LCP | < 1.8s |
| CLS | < 0.05 |
| TBT | < 200ms |
| Page weight (excl. fonts) | < 500KB |
| Page weight (incl. fonts) | < 1MB |

**Verification:** `astro build` → `astro preview` → Lighthouse mobile, throttled 4G. Re-run post-deploy.

---

## 10. Accessibility (Non-Negotiable)

- Color contrast: white-on-orange and white-on-black both pass WCAG AA — verify with tooling
- One `<h1>` per page (hero only)
- Focus states visible on every interactive element (`focus-visible:ring-2 ring-white` on orange, `ring-c8-orange` on black)
- Alt text on every `<img>` and `<Image>`
- `prefers-reduced-motion: reduce` fully respected
- Full keyboard navigation to IG CTA
- Semantic HTML: `<section>`, `<article>`, `<button>`, `<nav>`, `<figure>`
- ARIA labels on icon-only buttons (e.g. sticky CTA gets `aria-label="DM @chrono8media on Instagram"`)

---

## 11. Anti-Slop Checklist (Verify Before Merging Any PR)

- [ ] No Anton, Bebas Neue, Oswald, or any free condensed display sans anywhere
- [ ] No stock illustrations (Storyset / Undraw / Humaaans / Iconscout)
- [ ] No generic gradient blobs in backgrounds
- [ ] No Lottie animations of rockets, growth charts, or "AI" abstractions
- [ ] No "Trusted by 1000+ brands" without real proof
- [ ] No limp copy ("Let's transform your business together")
- [ ] No contact forms — IG DM is the only conversion path
- [ ] No chatbot widget
- [ ] No auto-play video with sound
- [ ] No cookie banner (Cloudflare Web Analytics doesn't need one)
- [ ] No tinted neutral grays — only `--c8-orange`, `--c8-black`, `--c8-white`
- [ ] Headlines use italics ONLY on emphasis words
- [ ] All Lucide icons (no random icon-pack mixing)
- [ ] No "buy now" / "limited time" / urgency-marketing copy

---

## 12. Deliverables Checklist

- [ ] Astro 6 project initialized with Tailwind v4 + @astrojs/sitemap
- [ ] PP Neue Machina + Neue Montreal WOFF2 self-hosted, licensed
- [ ] Color tokens, type scale, design tokens in `global.css`
- [ ] All 9 sections + footer built per spec
- [ ] Lenis + GSAP + ScrollTrigger + SplitText integrated
- [ ] Hero load choreography working
- [ ] §4 Pillars pinned-scroll with crossfade working
- [ ] §5 Work counter-up + parallax working
- [ ] §6 Testimonials with verbatim copy + headshots
- [ ] §7 Process horizontal scroll-snap on desktop
- [ ] §8 Qualifier diptych slide-in
- [ ] §9 Behold IG feed lazy-loaded
- [ ] §9 Behold fallback link in place
- [ ] Sticky CTA appearing/hiding per scroll position
- [ ] `prefers-reduced-motion` fallbacks working
- [ ] OG image, favicon, apple-touch-icon, meta tags, sitemap, robots.txt
- [ ] Lighthouse scores meet all targets on mobile + desktop
- [ ] Deployed to Cloudflare Pages with custom domain
- [ ] Cloudflare Web Analytics enabled
- [ ] All anti-slop checklist items verified

---

## 13. Open Items (User Must Resolve Before Final Ship)

1. **PP Neue Machina + Neue Montreal license** — purchase / confirm coverage from Pangram Pangram
2. **Logo SVG file** — supply `logo.svg` to `/src/components/Logo.astro` (expected: viewBox `0 0 400 400`, white path on transparent)
3. **Hero headline choice** — confirm or override the ⭐ default (`STOP POSTING. START COMPOUNDING.`)
4. **Case study content** — populate §5 with 2–3 real cases using the template; replace worked examples
5. **Headshots** for §6 testimonials — collect from each named client or use existing IG photos
6. **Behold.so account** — set up, connect IG, supply `feed-id`
7. **Domain name** — purchase + DNS to Cloudflare
8. **OG image** — create per §7.2 spec
9. **Founder name confirmation** — Josh King Madrid testimonial references "Chris" — verify before any About/Footer attribution
10. **Real client list for trust marquee** — currently uses 4 named testimonial-givers; expand if more proof is available

---

## 14. Build Sequence (Suggested Order)

1. **Scaffold** — Astro init, Tailwind v4, font self-hosting, color tokens, type scale, sitemap integration
2. **Layout shell** — `Layout.astro`, `MotionRoot` island, Lenis + GSAP init, meta tags
3. **Static sections first** — §3, §6, §7, §8, Footer (less complex motion)
4. **Hero + logo animation** — §1 + `Logo.astro` + `hero.ts` choreography
5. **Pinned scroll section** — §4 Pillars (most complex motion — debug here)
6. **Trust marquee** — §2
7. **Case studies** — §5 with parallax + counter
8. **Final CTA + Behold lazy-load** — §9
9. **Sticky CTA** — overlay component with scroll-trigger
10. **OG image + favicon + apple-touch-icon assets** — generate per §7
11. **Performance pass** — Lighthouse, lazy-loading, image optimization, font preload
12. **Accessibility pass** — keyboard nav, focus states, ARIA, reduced-motion
13. **Anti-slop pass** — checklist verification
14. **Deploy** — Cloudflare Pages, custom domain, analytics

---

**End of brief.** If anything in this spec conflicts with a user instruction during build, the user instruction wins — flag the conflict and ask. Otherwise, build to spec.
