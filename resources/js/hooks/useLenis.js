import { useEffect } from 'react';
import Lenis from 'lenis';
import { router } from '@inertiajs/react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';

/**
 * Smooth scroll Lenis yang disinkronkan dengan ScrollTrigger lewat ticker GSAP.
 * Panggil sekali di layout (layout persisten, jadi tidak dibuat ulang tiap pindah halaman).
 * Area scroll di dalam halaman (daftar, dialog) wajib diberi atribut data-lenis-prevent.
 */
export default function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const offNavigate = router.on('navigate', () => {
      lenis.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      offNavigate();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
