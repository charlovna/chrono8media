/**
 * fitLine — strict 2-line safety net (per CLAUDE.md "Headline System").
 * Walks every element with `data-fit` (or every `.h-display` that has
 * `--fit-scale` set), measures each `.line` child against its container,
 * and steps font-size down 4% per pass until both lines fit without wrap.
 *
 * Mounts to:
 *   - any element with class `.hero-headline` or `.whyus-heading`
 *   - any element with `[data-fit]` attribute (escape hatch for future sections)
 *
 * Runs:
 *   - once after boot
 *   - on resize (RAF-debounced)
 *   - again after `document.fonts.ready` so we measure with real glyphs
 */

// Targets every headline that has the strict 2-line structure (.line children).
// .section-heading is added by all section h2s; [data-fit] is the escape hatch.
const TARGET_SELECTOR = '.hero-headline, .whyus-heading, .section-heading, [data-fit]';
const MAX_PASSES = 18;
const STEP = 0.96;

function fitOne(h: HTMLElement) {
  const lines = h.querySelectorAll<HTMLElement>('.line');
  if (!lines.length) return;

  h.style.setProperty('--fit-scale', '1');
  void h.offsetWidth;

  let scale = 1;
  for (let pass = 0; pass < MAX_PASSES; pass++) {
    let overflows = false;
    lines.forEach((ln) => {
      if (ln.scrollWidth > ln.clientWidth + 1) overflows = true;
    });
    if (!overflows) break;
    scale *= STEP;
    h.style.setProperty('--fit-scale', String(scale));
    void h.offsetWidth;
  }
}

function fitAll() {
  document.querySelectorAll<HTMLElement>(TARGET_SELECTOR).forEach(fitOne);
}

export function initFit() {
  fitAll();
  let raf = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(fitAll);
  });
  if ('fonts' in document) (document as any).fonts.ready.then(fitAll);
}
