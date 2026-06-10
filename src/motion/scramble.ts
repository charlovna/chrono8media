/**
 * Vanilla ScrambleText — same API shape as GSAP ScrambleTextPlugin but with
 * no Club GreenSock dependency. Preserves inner HTML (incl. `<em>`) by
 * stashing innerHTML, scrambling textContent, and restoring on complete.
 *
 * If you ever buy Club GreenSock, this can be swapped for the official
 * plugin with no caller-site changes.
 */
type ScrambleOpts = {
  duration?: number;       // seconds
  delay?: number;          // seconds
  chars?: 'upperCase' | 'lowerCase' | 'mixed';
  speed?: number;          // 0..1 — visual churn rate (higher = busier)
  revealDelay?: number;    // 0..1 — fraction of duration spent scrambling before reveal starts
};

const POOLS = {
  upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*?',
  lowerCase: 'abcdefghijklmnopqrstuvwxyz!@#$%&*?',
  mixed:     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%',
} as const;

export function scrambleIn(el: HTMLElement | null, opts: ScrambleOpts = {}) {
  if (!el) return;
  const final = el.textContent ?? '';
  if (!final) return;

  const originalHTML = el.innerHTML;
  const pool = POOLS[opts.chars ?? 'upperCase'];
  const duration = (opts.duration ?? 1.0) * 1000;
  const delay = (opts.delay ?? 0) * 1000;
  const revealAt = opts.revealDelay ?? 0.15; // 0..1
  const churnHz = 1 / Math.max(0.05, opts.speed ?? 0.6) * 16; // ms between churns

  el.textContent = final;             // strip inner markup; restored on complete
  el.style.opacity = '1';

  const start = performance.now() + delay;
  let lastChurn = 0;
  let raf = 0;

  const step = (now: number) => {
    const elapsed = now - start;
    if (elapsed < 0) { raf = requestAnimationFrame(step); return; }

    const t = Math.min(1, elapsed / duration);
    const revealStart = revealAt;
    const revealT = t < revealStart ? 0 : (t - revealStart) / (1 - revealStart);
    const revealCount = Math.floor(revealT * final.length);

    // Throttle the random churn so it feels deliberate, not noisy
    if (now - lastChurn >= churnHz) {
      let out = '';
      for (let i = 0; i < final.length; i++) {
        const ch = final[i];
        if (i < revealCount) out += ch;
        else if (ch === ' ' || ch === ' ') out += ch;
        else if (/[.,!?:;'"\-—]/.test(ch)) out += ch;
        else out += pool[Math.floor(Math.random() * pool.length)];
      }
      el.textContent = out;
      lastChurn = now;
    }

    if (t < 1) raf = requestAnimationFrame(step);
    else {
      el.innerHTML = originalHTML;   // restore <em> etc.
    }
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}
