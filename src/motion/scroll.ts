import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export function initScrollAnimations() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  initPillars(reducedMotion);
  initHeadingTypewriter(reducedMotion);
}

/**
 * §4 Pillars - pinned crossfade + 3D logo watermark scrub.
 * Ported faithfully from prototype Chrono8 Media.html lines 1388-1450.
 */
function initPillars(reduced: boolean) {
  const section = document.getElementById('sectionPillars');
  if (!section) return;

  const cards = section.querySelectorAll<HTMLElement>('.pillar-card');
  const count = cards.length;
  if (!count) return;

  if (reduced) {
    cards.forEach((c) => { c.style.opacity = '1'; });
    return;
  }

  gsap.set(cards, { opacity: 0 });
  gsap.set(cards[0], { opacity: 1 });

  // CROSSFADE_START: fraction of each card's scroll window where fade begins.
  // 0.5 gives a 50% overlap window - much smoother than 0.7 (30%).
  const CROSSFADE_START = 0.5;

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: `+=${count * 100}%`,
    pin: '#pillarsPin',
    anticipatePin: 1,
    scrub: 1.2,
    onUpdate: (self) => {
      const p = self.progress * count;
      const idx = Math.min(count - 1, Math.floor(p));
      const localT = p - idx;
      const fadeWindow = 1 - CROSSFADE_START;

      cards.forEach((c, i) => {
        let op = 0;
        if (i === idx) op = 1 - Math.max(0, (localT - CROSSFADE_START) / fadeWindow);
        else if (i === idx + 1) op = Math.max(0, (localT - CROSSFADE_START) / fadeWindow);
        if (i === idx && idx === count - 1) op = 1;
        c.style.opacity = String(op);
      });

      cards.forEach((c, i) => {
        const body = c.querySelector<HTMLElement>('.pillar-body');
        if (!body) return;
        const dist = Math.abs(i - p);
        body.style.transform = `translateY(${dist * 30}px) scale(${1 - dist * 0.04})`;
      });

      // 3D logo watermark scrub
      const prog = self.progress;
      const rotY  = prog * 720;
      const rotX  = Math.sin(prog * Math.PI * 2) * 12;
      const rotZ  = Math.sin(prog * Math.PI) * 6;
      const scale = 1 + Math.sin(prog * Math.PI) * 0.18;
      const tZ    = -Math.abs(Math.cos(prog * Math.PI)) * 80;
      const blur  = Math.abs(Math.sin(prog * Math.PI * 2)) * 0.6;
      const transform = `translateZ(${tZ}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`;
      cards.forEach((c) => {
        const w = c.querySelector<HTMLElement>('.pillar-watermark > div');
        if (!w) return;
        w.style.transform = transform;
        w.style.filter = `blur(${blur}px)`;
      });
    },
  });
}

/**
 * Every section h2 with .section-heading types in on scroll entry.
 * Each .line is typewritten sequentially via GSAP TextPlugin.
 * Skips: hero (has its own load timeline) + pillar cards (use crossfade).
 */
function initHeadingTypewriter(reduced: boolean) {
  if (reduced) return;

  const headings = document.querySelectorAll<HTMLElement>('.section-heading');
  headings.forEach((h) => {
    if (h.closest('#hero') || h.closest('#sectionPillars')) return;

    const lines = h.querySelectorAll<HTMLElement>('.line');
    if (!lines.length) return;

    // Stash each line's final state (HTML + plain text) then hide
    const lineData = [...lines].map((line) => ({
      line,
      finalHTML: line.innerHTML,
      finalText: (line.textContent ?? '').trim(),
    }));

    // Pre-hide lines so they don't flash before the trigger fires
    lineData.forEach(({ line }) => {
      line.textContent = '';
      line.style.opacity = '0';
    });

    ScrollTrigger.create({
      trigger: h,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        // Show lines (blank) before typing starts so layout is stable
        lineData.forEach(({ line }) => { line.style.opacity = '1'; });

        // Build a sequential typewriter timeline across all lines
        const tl = gsap.timeline();
        lineData.forEach(({ line, finalText, finalHTML }, i) => {
          const duration = Math.max(0.4, finalText.length * 0.04);
          tl.to(line, {
            duration,
            ease: 'none',
            text: { value: finalText, delimiter: '' },
            onComplete: () => {
              line.innerHTML = finalHTML;
            },
          }, i === 0 ? 0 : '+=0.08');
        });
      },
    });
  });
}
