// ================================================================
//  CHRONO8 MEDIA - PAGE CONTENT
//  Edit this file to change any visible text on the site.
//  Each export below maps directly to one section of the page.
// ================================================================


// ── SEO & browser tab ───────────────────────────────────────────
export const META = {
  title:       'Chrono8 Media: Your Partner in Digital Marketing',
  description: 'We help brands grow through strategic content, high-performing creative, and seamless social media systems designed for attention, engagement, and results.',
  url:         'https://chrono8media.com',
  ogImage:     '/og-image.png',
};


// ── §1 · HERO (first screen, left text / right floating logo) ───
// STRICT 2-line policy per CLAUDE.md: every headline = exactly two `.line` spans.
//   headline.line1     → first line, plain weight
//   headline.line2Pre  → plain words before the italic emphasis (may be empty)
//   headline.italic    → the italic emphasis phrase
//   headline.line2Post → trailing punctuation/words after italic (e.g. ".")
// sub keeps the {{...}} keyword wrapping for orange highlights.
export const HERO = {
  brand: 'CHRONO8 Media',
  headline: {
    line1:     'YOUR PARTNER IN',
    line2Pre:  '',
    italic:    'DIGITAL MARKETING',
    line2Post: '.',
  },
  sub: 'We help brands grow through {{strategic content}}, {{high-performing creative}}, and {{seamless social media systems}} designed for attention, engagement, and results.',
  cta: {
    label: 'Get Started',
    targetId: '#complete-cta',
  },
};


// ── §2 · EXPERTISE - "What We'll Do For You" ────────────────────
// Each row expands on click/tap to reveal sample works.
export const EXPERTISE = {
  eyebrow: 'What We Do',
  heading: { line1: "WHAT WE'LL DO", line2: 'FOR YOU.' },
  intro:   'Our team consists of media professionals who work closely with businesses and creators to retain digital presence that captures attention and drives results.',
  items: [
    {
      title: 'Video Editing',
      summary: 'Short-form reels, long-form cuts, podcast post-production, motion graphics.',
      works: ['Reel edits: sub-60s', 'Long-form YouTube cuts', 'Podcast post-production', 'Motion graphics overlays'],
    },
    {
      title: 'Graphic Design',
      summary: 'Brand identity systems, content templates, ad creative, presentation decks.',
      works: ['Brand identity systems', 'Instagram content templates', 'Paid-ad creative sets', 'Pitch & sales decks'],
    },
    {
      title: 'Content Strategy',
      summary: 'Channel positioning, content pillars, weekly editorial cadence, performance review.',
      works: ['Channel positioning audit', 'Content-pillar mapping', '90-day editorial calendars', 'Monthly performance review'],
    },
    {
      title: 'Social Media Growth',
      summary: 'Audience research, hook testing, engagement loops, paid amplification.',
      works: ['Audience & competitor research', 'Hook A/B testing', 'Engagement loops', 'Paid amplification setup'],
    },
    {
      title: 'Content Ideation',
      summary: 'Hook libraries, trend integration, format playbooks, creator collaboration briefs.',
      works: ['Hook & angle libraries', 'Trend-integration playbooks', 'Repeatable format templates', 'Creator collab briefs'],
    },
    {
      title: 'Social Media Management',
      summary: 'Daily posting, community engagement, DM triage, performance reporting.',
      works: ['Daily posting & scheduling', 'Community management', 'DM triage & qualification', 'Weekly performance reports'],
    },
  ],
};


// ── §3 · PILLARS (unchanged - signature 4-card pinned scroll) ───
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
    body:    "Visuals that don't just look good. They make your brand impossible to ignore.",
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


// ── §4 · TESTIMONIALS - Brand-logo grid, click-to-reveal quote ──
// brandLogo: place file in /public/images/brand-logos/ then reference here.
// brandName: shown as text fallback if image fails / for screen readers.
export const TESTIMONIALS = {
  eyebrow: 'Results',
  heading: { line1: 'BRANDS WE', line2: 'WORK WITH.' },
  items: [
    {
      name:      'Josh King Madrid',
      title:     'Entrepreneur / Internet Personality',
      quote:     'Chris and the team just get it. The visuals, videos, and website all turned out better than we expected!',
      brandName: 'Josh King Madrid',
      brandLogo: '/images/brand-logos/josh-king-madrid.svg',
    },
    {
      name:      'Geoffrey Hurth',
      title:     'Founder of RYZE Performance',
      quote:     'Fast, smooth, and super easy to work with. Every deliverable turned out great, I would definitely recommend them!',
      brandName: 'RYZE Performance',
      brandLogo: '/images/brand-logos/ryze.svg',
    },
    {
      name:      'Louise Mendez',
      title:     'Founder & Director, Cold Digital Agency',
      quote:     'We started with graphics but ended up trusting them with everything. Super happy with how our social media looks right now!',
      brandName: 'Cold Digital',
      brandLogo: '/images/brand-logos/cold-digital.svg',
    },
    {
      name:      'Cristina Miguez',
      title:     'CEO, DiR Marketing',
      quote:     "We've worked with Chrono8 Media on multiple projects already, and they never disappoint. It's rare to find a team this reliable long-term.",
      brandName: 'DiR Marketing',
      brandLogo: '/images/brand-logos/dir-marketing.svg',
    },
  ],
};


// ── §4.5 · SHOWCASE - "Our Work" bento media grid ──────────────
// Layout/format only lives in Showcase.astro. The team adds the actual
// tiles (photos, GIFs, short muted videos) through the TinaCMS dashboard;
// each tile is stored in content/showcase.json. This export is just the
// section copy (eyebrow + strict 2-line heading per CLAUDE.md).
export const SHOWCASE = {
  eyebrow: 'Our Work',
  heading: { line1: 'WORK THAT', line2: 'SPEAKS FOR ITSELF.' },
};


// ── §5 · PROCESS - Vertical 4-step timeline ─────────────────────
export const PROCESS = {
  eyebrow: 'How It Works',
  heading: { line1: 'HOW OUR', line2: 'SYSTEM WORKS.' },
  steps: [
    {
      number: '01',
      title:  'Strategy',
      body:   'Understand the brand, audience, and direction.',
    },
    {
      number: '02',
      title:  'Creation',
      body:   'Produce content designed to capture attention.',
    },
    {
      number: '03',
      title:  'Execution',
      body:   'Deliver consistently across platforms.',
    },
    {
      number: '04',
      title:  'Optimization',
      body:   'Analyze performance and improve results.',
    },
  ],
};


// ── §6 · WHY US - 3 cards with vector icons ─────────────────────
// icon: name of an inline SVG component rendered in WhyUs.astro.
//   'network'  → connected nodes
//   'infinity' → infinity loop
//   'trending' → growth graph
export const WHY_US = {
  // STRICT 2-line policy (CLAUDE.md). No eyebrow per agency revision.
  heading: {
    line1: 'WHY CHRONO8 MEDIA',
    line2: 'STANDS ABOVE THE REST.',
  },
  cards: [
    {
      icon:  'network',
      title: 'We Build Systems, Not Random Content',
      body:  'We create structured content strategies designed to keep your brand consistent, recognizable, and growth-focused, not just active.',
    },
    {
      icon:  'infinity',
      title: 'We Make Content Seamless',
      body:  "From planning to execution, we handle the entire process so clients don't have to stress over ideas, editing, design, or consistency.",
    },
    {
      icon:  'trending',
      title: 'Creative Backed By Performance',
      body:  'Every piece of content is created with purpose, built to capture attention, improve engagement, and help brands grow online.',
    },
  ],
};


// ── §7 · COMPLETE CTA - split contact form + info ───────────────
export const COMPLETE_CTA = {
  heading: { line1: 'READY TO SCALE WITH', line2: 'A REAL CONTENT SYSTEM.' },
  sub:     "We'll help you create strategic content designed to grow your brand and drive results.",
  form: {
    submitLabel: 'Send Message',
    successText: "Thanks. We'll reply within 24 hours.",
    fields: {
      name:    { label: 'Full Name',       placeholder: 'Jane Doe' },
      email:   { label: 'Email Address',   placeholder: 'jane@brand.com' },
      company: { label: 'Company Name',    placeholder: 'Brand Co.' },
      details: { label: 'Project Details', placeholder: 'Tell us what you want to grow: current channels, goals, anything we should know.' },
    },
  },
  info: {
    heading: "Let's Talk Growth",
    sub:     "Tell us where you are now and where you want to be. We'll come back with a path.",
    email:        'hello@chrono8media.com',
    location:     'Remote · Philippines',
    responseTime: 'Reply within 24 hours',
    socials: [
      { label: 'Instagram', href: 'https://instagram.com/chrono8media', icon: 'instagram' },
      { label: 'TikTok',    href: 'https://tiktok.com/@chrono8media',  icon: 'tiktok' },
    ],
  },
};


// ── §8 · FOOTER - multi-column ──────────────────────────────────
export const FOOTER = {
  brand:       'Chrono8 Media',
  description: 'Strategic content, high-performing creative, and social media systems for brands ready to grow.',
  columns: [
    {
      title: 'Quick Links',
      links: [
        { label: 'About',         href: '#expertise' },
        { label: 'Our Process',   href: '#process' },
        { label: 'Why Chrono8',   href: '#why-us' },
        { label: 'Contact',       href: '#complete-cta' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Video Editing',           href: '#expertise' },
        { label: 'Graphic Design',          href: '#expertise' },
        { label: 'Content Strategy',        href: '#expertise' },
        { label: 'Social Media Management', href: '#expertise' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Use',   href: '/terms' },
      ],
    },
  ],
  year: '2026',
};
