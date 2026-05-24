// ================================================================
//  CHRONO8 MEDIA — PAGE CONTENT
//  This is the ONE file you edit to change any text on the site.
//  Each section below maps directly to a visible part of the page.
// ================================================================


// ── SEO & browser tab ───────────────────────────────────────────
// Controls: browser tab title, Google snippet, link-preview cards
export const META = {
  title:       'Chrono8 Media — Built for brands that want to grow',
  description: 'Content, design, and strategy for brands ready to scale. DM @chrono8media "GROW" on Instagram to get started.',
  url:         'https://chrono8media.com',   // your live domain (no trailing slash)
  ogImage:     '/og-image.png',              // 1200×630px image in /public/
};


// ── §1 · HERO (first screen, orange background) ─────────────────
// eyebrow  = small text above the headline
// line1    = first line of the big headline
// line2    = plain words before the italic word
// italicWord = the word shown in italic Ultrabold
// cta.label  = button text  |  cta.href = Instagram link
export const HERO = {
  eyebrow: 'CONTENT • DESIGN • STRATEGY • CONSISTENCY',
  headline: {
    line1:      'STOP POSTING.',
    line2:      'START',
    italicWord: 'COMPOUNDING',
  },
  cta: {
    label: 'DM US "GROW"',
    href:  'https://instagram.com/chrono8media',
  },
};


// ── §2 · TRUST MARQUEE (scrolling band of client names) ─────────
// Add or remove names here. They loop forever left-to-right.
export const TRUST_MARQUEE = {
  brands: [
    'JOSH KING MADRID',
    'GEOFFREY HURTH',
    'LOUISE MENDEZ',
    'CRISTINA MIGUEZ',
  ],
};


// ── §3 · PROBLEM FRAME (black section, centered statement) ──────
// headline: two lines of the big white headline
// body:     the paragraph below it
export const PROBLEM_FRAME = {
  headline: {
    line1: 'MOST MARKETING',
    line2: 'DIES IN THE SCROLL.',
  },
  body: "Forgettable content. Templated design. Zero strategy. No consistency. That's why your brand isn't growing.",
};


// ── §4 · PILLARS (4 full-screen pinned cards, alternating orange/black) ──
// Each pillar has: a number, a name (huge), a tagline (italic), and body copy.
// bg: 'orange' or 'black' — controls the card background color.
export const PILLARS = [
  {
    number:  '01',
    name:    'CONTENT',
    tagline: 'That gets attention.',
    body:    'Stop-the-scroll posts, reels, and short-form built for algorithms, not for awards.',
    bg:      'orange' as const,
  },
  {
    number:  '02',
    name:    'DESIGN',
    tagline: 'That builds authority.',
    body:    "Visuals that don't just look good — they make your brand impossible to ignore.",
    bg:      'black' as const,
  },
  {
    number:  '03',
    name:    'STRATEGY',
    tagline: 'That drives growth.',
    body:    'Every post earns its place. Every campaign maps to a number.',
    bg:      'orange' as const,
  },
  {
    number:  '04',
    name:    'CONSISTENCY',
    tagline: 'That delivers results.',
    body:    'Daily output. Compound returns. The only thing that actually moves the needle.',
    bg:      'black' as const,
  },
];


// ── §5 · CASE STUDIES (work results, dark cards with big metrics) ─────
// metric, metricPrefix, metricSuffix → combined display: e.g. "+" + "340" + "%" = "+340%"
// image: put your file in /public/images/case-studies/ then reference it here
// Replace the two placeholder entries below with your real client results.
export const CASE_STUDIES = [
  {
    client:        'Geoffrey Hurth — RYZE Performance',
    industry:      'PERSONAL BRAND',
    timeframe:     '6 MONTHS',
    metricPrefix:  '',
    metric:        '12',
    metricSuffix:  'x',
    metricLabel:   'inbound DMs per week',
    outcome:       'Geoffrey went from a barely-active Instagram presence to a daily content engine — RYZE waitlist consistently full, lead quality up across every inbound channel.',
    bullets: [
      'Built short-form video system',
      'Redesigned brand visual identity',
      'Locked daily posting + weekly review',
    ],
    image:         '/images/case-studies/ryze-feed.webp',
    imageAlt:      'Geoffrey Hurth Instagram profile showing recent reel performance metrics.',
  },
  {
    client:        'BARE Skin Co.',
    industry:      'E-COMMERCE',
    timeframe:     '90 DAYS',
    metricPrefix:  '+',
    metric:        '340',
    metricSuffix:  '%',
    metricLabel:   'engagement in 90 days',
    outcome:       "Founder went from posting weekly to a daily content engine that converted scroll into sales — DMs up 5x, store sessions up 220%.",
    bullets: [
      'Built 30-day content sprint',
      'Redesigned grid + reel covers',
      'Locked daily posting cadence',
    ],
    image:         '/images/case-studies/bare-skin-grid.webp',
    imageAlt:      'BARE Skin Co. Instagram grid showing 9 cohesive product posts.',
  },
];


// ── §6 · TESTIMONIALS (2×2 card grid, warm stone background) ────
// headshot: put each photo in /public/images/testimonials/ and link it here
// quote: use straight quotes — the component adds the curly ones
export const TESTIMONIALS = [
  {
    name:     'Josh King Madrid',
    title:    'Entrepreneur / Internet Personality',
    quote:    'Chris and the team just get it. The visuals, videos, and website all turned out better than we expected!',
    headshot: '/images/testimonials/josh-king-madrid.jpg',
  },
  {
    name:     'Geoffrey Hurth',
    title:    'Founder of RYZE Performance',
    quote:    'Fast, smooth, and super easy to work with. Every deliverable turned out great, I would definitely recommend them!',
    headshot: '/images/testimonials/geoffrey-hurth.jpg',
  },
  {
    name:     'Louise Mendez',
    title:    'Founder & Director at Cold Digital Agency',
    quote:    'We started with graphics but ended up trusting them with everything. Super happy with how our social media looks right now!',
    headshot: '/images/testimonials/louise-mendez.jpg',
  },
  {
    name:     'Cristina Miguez',
    title:    'CEO of DiR Marketing',
    quote:    "We've worked with Chrono8 Media on multiple projects already, and they never disappoint. It's rare to find a team this reliable long-term.",
    headshot: '/images/testimonials/cristina-miguez.jpg',
  },
];


// ── §7 · PROCESS (3 horizontal steps) ───────────────────────────
// Desktop: swipe left/right  |  Mobile: scroll down
export const PROCESS = [
  {
    number: '01',
    title:  'DISCOVERY DM',
    body:   'You DM us "GROW." We learn your business, audience, current state.',
  },
  {
    number: '02',
    title:  'STRATEGY + BUILD',
    body:   'We map the content engine, design the system, ship the assets.',
  },
  {
    number: '03',
    title:  'SHIP + ITERATE',
    body:   'We post, you grow. Daily output, weekly review, monthly compounding.',
  },
];


// ── §8 · QUALIFIER (left = orange "Built For" / right = black "Not For") ──
// closing.preText  = plain words before the emphasis line
// closing.emphasis = the italic line shown beneath the list
export const QUALIFIER = {
  built: {
    heading: 'BUILT FOR',
    items: [
      'Brands ready to scale',
      'Founders who get that marketing compounds',
      'Teams that value consistency over flash',
      'Operators who think in metrics',
    ],
    closing: {
      preText:  "IF THAT'S YOU —",
      emphasis: 'DM US.',
    },
  },
  not: {
    heading: 'NOT FOR',
    items: [
      'Anyone looking for cheap deliverables',
      'One-off graphic requests',
      'Brands chasing hype without strategy',
      'Anyone who wants results without showing up daily',
    ],
    closing: {
      preText:  'THEN',
      emphasis: 'KEEP SCROLLING.',
    },
  },
};


// ── §9 · FINAL CTA (orange, big button + Instagram feed) ────────
// italicWord is placed before line2: "GROW YOUR BRAND?"
// behold.feedId: get this from your behold.so dashboard after connecting @chrono8media
export const FINAL_CTA = {
  headline: {
    line1:      'READY TO',
    italicWord: 'GROW',
    line2:      'YOUR BRAND?',
  },
  sub: 'DM US "GROW" TO GET STARTED',
  cta: {
    label: 'DM US "GROW"',
    href:  'https://instagram.com/chrono8media',
  },
  behold: {
    feedId: 'YOUR_FEED_ID_HERE',   // ← replace with your Behold.so feed ID
  },
};


// ── FOOTER ──────────────────────────────────────────────────────
export const FOOTER = {
  handle: '@chrono8media',
  href:   'https://instagram.com/chrono8media',
  year:   '2026',
  brand:  'Chrono8 Media',
};
