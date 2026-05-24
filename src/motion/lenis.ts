import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initLenis() {
  const isTouch = /iPhone|iPad|Android/i.test(navigator.userAgent);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouch || reducedMotion) return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Drive the 2px orange scroll progress bar at the top of the page
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    lenis.on('scroll', ({ progress }: { progress: number }) => {
      gsap.set(progressBar, { scaleX: progress });
    });
  }

  return lenis;
}
