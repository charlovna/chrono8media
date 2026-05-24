import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export function initHero() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const headline = document.querySelector('.hero-headline') as HTMLElement | null;
  if (!headline) return;

  const split = new SplitText(headline, { type: 'chars,lines', linesClass: 'line' });

  gsap.timeline()
    .from('.hero-logo', {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
    })
    .from(split.chars, {
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
}
