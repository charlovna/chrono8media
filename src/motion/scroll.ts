import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initScrollAnimations() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  // ── §3 Problem Frame — word-by-word reveal on scroll ──────
  const problemHeadline = document.querySelector('.problem-headline') as HTMLElement | null;
  if (problemHeadline) {
    const split = new SplitText(problemHeadline, { type: 'words' });
    gsap.from(split.words, {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: problemHeadline, start: 'top 60%' },
    });
  }

  // ── §4 Pillars — pinned stack, crossfade between cards ────
  const pillarsSection = document.getElementById('pillars-stack');
  const pillarCards = document.querySelectorAll<HTMLElement>('.pillar-card');
  if (pillarsSection && pillarCards.length) {
    gsap.set(pillarCards, { opacity: 0 });
    gsap.set(pillarCards[0], { opacity: 1 });

    ScrollTrigger.create({
      trigger: pillarsSection,
      pin: true,
      scrub: 1,
      end: '+=400%',
      onUpdate(self) {
        const idx = Math.min(Math.floor(self.progress * 4), 3);
        pillarCards.forEach((card, i) => {
          gsap.to(card, { opacity: i === idx ? 1 : 0, duration: 0.3, overwrite: 'auto' });
        });
      },
    });
  }

  // ── §5 Work — counter-up animation on metrics ─────────────
  document.querySelectorAll<HTMLElement>('.case-metric').forEach((el) => {
    const target = Number(el.dataset.target ?? 0);
    const prefix = el.dataset.prefix ?? '';
    const suffix = el.dataset.suffix ?? '';

    if (target) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter() {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: 'power3.out',
            snap: { val: 1 },
            onUpdate() {
              el.textContent = prefix + Math.round((this as any).targets()[0].val) + suffix;
            },
          });
        },
      });
    }
  });

  // ── §5 Work — parallax on case study images ───────────────
  document.querySelectorAll<HTMLElement>('.case-study-image img').forEach((img) => {
    gsap.to(img, {
      y: '-10%',
      ease: 'none',
      scrollTrigger: {
        trigger: img.closest('.case-study-card'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // ── §6 Testimonials — fade-up stagger ─────────────────────
  ScrollTrigger.batch('.testimonial-card', {
    onEnter: (els) => gsap.from(els, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
    }),
    start: 'top 80%',
  });

  // ── §8 Qualifier — diptych slide in from opposite sides ───
  const qualifier = document.getElementById('qualifier');
  if (qualifier) {
    gsap.from('.qualifier-built', {
      x: -50, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: qualifier, start: 'top 70%' },
    });
    gsap.from('.qualifier-not', {
      x: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: qualifier, start: 'top 70%' },
    });
    gsap.from('.qualifier-medallion', {
      scale: 0, rotation: -90, opacity: 0, duration: 0.8, ease: 'expo.out',
      scrollTrigger: { trigger: qualifier, start: 'top 70%' },
    });
  }

  // ── Custom cursor (pointer/mouse devices only) ─────────────
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'none' });
    });
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', () =>
        gsap.to(cursor, { width: 24, height: 24, background: '#FF5A1F', duration: 0.2 }));
      el.addEventListener('mouseleave', () =>
        gsap.to(cursor, { width: 8, height: 8, background: '#FFFFFF', duration: 0.2 }));
    });
  }
}
