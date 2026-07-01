import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export function initScrollAnimations() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  initHeadingTypewriter(reducedMotion);
}

/**
 * Every section h2 with .section-heading types in on scroll entry.
 * Each .line is typewritten sequentially via GSAP TextPlugin.
 * Skips: hero (has its own load timeline).
 */
function initHeadingTypewriter(reduced: boolean) {
  if (reduced) return;

  const headings = document.querySelectorAll<HTMLElement>('.section-heading');
  headings.forEach((h) => {
    if (h.closest('#hero')) return;

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
