import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { fitAll, setFitSuppressed } from './fit';

gsap.registerPlugin(TextPlugin);

/**
 * Hero entrance choreography.
 * Five mechanically distinct motions. No two share a mechanic.
 *
 *   1. .hero-brand        letter-spacing expansion (tight to wide) + opacity
 *   2. .line[data-tw="1"] GSAP TextPlugin typewriter with blinking caret
 *   3. .line[data-tw="2"] GSAP TextPlugin typewriter, caret continues
 *   4. .hero-sub          clip-path mask wipe (left to right curtain reveal)
 *   5. .hero-cta-wrap     smooth slide-up + scale settle on expo.out
 */
export function initHero() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const headline = document.querySelector<HTMLElement>('.hero-headline');
  if (!headline) return;

  const lines = headline.querySelectorAll<HTMLElement>('.line[data-tw]');
  if (lines.length < 2) return;

  // Capture final state (HTML + plain text) from SSR, then empty the lines
  // so the typewriter has a clean canvas. innerHTML is restored on complete.
  const lineData = [...lines].map((line) => ({
    line,
    finalHTML: line.innerHTML,
    finalText: (line.textContent ?? '').trim(),
  }));

  if (reduced) {
    // Skip the whole timeline. Show final state immediately.
    lineData.forEach(({ line }) => { line.style.opacity = '1'; });
    return;
  }

  // Lock the --fit-scale computed against the SSR'd final text (initFit()
  // already ran this measurement). Suppress further passes until typing
  // finishes, otherwise a font-load/resize fitAll() mid-type would measure
  // partial/empty text and unlock an unscaled, overlap-prone size.
  setFitSuppressed(true);

  // Wipe line content, make lines visible so the caret + typing show up
  lineData.forEach(({ line }) => {
    line.textContent = '';
    line.style.opacity = '1';
  });

  // Build a single caret that travels between line 1 and line 2
  const caret = document.createElement('span');
  caret.className = 'tw-caret';
  caret.setAttribute('aria-hidden', 'true');
  lineData[0].line.appendChild(caret);

  const tl = gsap.timeline();

  // 1. Brand: letter-spacing expansion + fade
  tl.to('.hero-brand', {
    opacity: 1,
    letterSpacing: '0.18em',
    duration: 1.1,
    ease: 'power2.out',
  });

  // Ghost logo settles in behind
  tl.to('.hero-logo-ghost', {
    opacity: 0.08,
    duration: 1.6,
    ease: 'sine.out',
  }, 0.1);

  // 2. Line 1 typewriter
  const dur1 = Math.max(0.55, lineData[0].finalText.length * 0.045);
  tl.to(lineData[0].line, {
    duration: dur1,
    ease: 'none',
    text: { value: lineData[0].finalText, delimiter: '' },
    onUpdate: () => {
      // TextPlugin replaces innerHTML each tick; re-append the caret
      if (!lineData[0].line.contains(caret)) lineData[0].line.appendChild(caret);
    },
    onComplete: () => {
      // Move the caret to line 2 for its turn
      caret.remove();
      lineData[1].line.appendChild(caret);
    },
  }, '-=0.3');

  // 3. Line 2 typewriter
  const dur2 = Math.max(0.55, lineData[1].finalText.length * 0.045);
  tl.to(lineData[1].line, {
    duration: dur2,
    ease: 'none',
    text: { value: lineData[1].finalText, delimiter: '' },
    onUpdate: () => {
      if (!lineData[1].line.contains(caret)) lineData[1].line.appendChild(caret);
    },
    onComplete: () => {
      lineData[1].line.innerHTML = lineData[1].finalHTML;
      // Fade caret out a beat after typing completes
      gsap.delayedCall(0.5, () => caret.remove());
      // Re-enable and re-measure now that both lines have final content
      // (font may have finished loading during the typewriter sequence)
      setFitSuppressed(false);
      fitAll();
    },
  }, '+=0.18');

  // 4. Sub paragraph: clip-path mask wipe (left to right)
  tl.to('.hero-sub', {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.0,
    ease: 'expo.inOut',
  }, '-=0.25');

  // 5. CTA: smooth slide-up + scale settle
  tl.to('.hero-cta-wrap', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.85,
    ease: 'expo.out',
  }, '-=0.45');
}
