/**
 * Interaction layer - char-swap CTAs, magnetic buttons, custom cursor.
 * All gated on `prefers-reduced-motion` and pointer type.
 * Ported from prototype Chrono8 Media.html lines 1554-1745.
 */
export function initInteractions() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  initCharSwap();                                  // works on touch + reduced (CSS handles hover only)
  if (!isTouch && !reduced) {
    initMagneticButtons();
    initCursor();
  }
}

/* ── Char-swap CTA: each char becomes a stacked top/bottom pair.
   On hover, the inner column translateY(-50%) → bottom char appears.
   Staggered 22ms per char. Arrow stays separate.
   Applies to: .hero-cta, .cta-submit, [data-charswap], a.btn. */
function initCharSwap() {
  document.querySelectorAll<HTMLElement>('.hero-cta, .cta-submit, [data-charswap], a.btn').forEach((el) => {
    if (el.dataset.swapBuilt) return;

    const arrow = el.querySelector('span[aria-hidden="true"], .arrow');

    // Collect label text from text nodes + non-arrow child elements
    let label = '';
    el.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) label += n.textContent ?? '';
      else if (n.nodeType === Node.ELEMENT_NODE && n !== arrow) label += (n as HTMLElement).textContent ?? '';
    });
    label = label.trim();
    if (!label) return;

    const wrap = document.createElement('span');
    wrap.className = 'btn-label';

    [...label].forEach((ch, i) => {
      const c = document.createElement('span');
      c.className = 'char-swap';
      c.style.setProperty('--d', i * 22 + 'ms');

      const inner = document.createElement('span');
      inner.className = 'char-swap-inner';

      const top = document.createElement('span');
      top.textContent = ch === ' ' ? ' ' : ch;
      const bot = document.createElement('span');
      bot.textContent = ch === ' ' ? ' ' : ch;
      bot.setAttribute('aria-hidden', 'true');

      inner.appendChild(top);
      inner.appendChild(bot);
      c.appendChild(inner);
      wrap.appendChild(c);
    });

    // Remove old text nodes / non-arrow children; insert built label before arrow
    [...el.childNodes].forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) el.removeChild(n);
      else if (n.nodeType === Node.ELEMENT_NODE && n !== arrow) el.removeChild(n);
    });
    el.insertBefore(wrap, arrow ?? null);
    el.dataset.swapBuilt = '1';
  });
}

/* ── Magnetic buttons: cursor pulls the button toward it by up to N px. */
function initMagneticButtons() {
  document.querySelectorAll<HTMLElement>('.hero-cta, .cta-submit, [data-magnetic]').forEach((btn) => {
    const strength = btn.dataset.magneticStrength
      ? Number(btn.dataset.magneticStrength)
      : 12;

    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      btn.style.transform = `translate(${dx * strength}px, ${dy * strength - 2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ── Custom cursor - dot follower with mix-blend-mode difference.
   Grows + turns orange over interactive elements. */
function initCursor() {
  const el = document.getElementById('cursor');
  if (!el) return;
  const dot = el;                                  // narrow once for nested closures

  let tx = 0, ty = 0, x = 0, y = 0;

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    dot.style.opacity = '1';
  });
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; });

  function tick() {
    x += (tx - x) * 0.22;
    y += (ty - y) * 0.22;
    dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  }
  tick();

  const interactive = 'a, button, [role="button"], input, textarea, summary, .brand-tile, .pillar-card';
  document.querySelectorAll(interactive).forEach((el) => {
    el.addEventListener('mouseenter', () => dot.classList.add('is-hot'));
    el.addEventListener('mouseleave', () => dot.classList.remove('is-hot'));
  });
}
