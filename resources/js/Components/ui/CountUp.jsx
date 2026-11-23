import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/motion';

/** Angka naik dari 0 saat masuk layar. Pembaca layar langsung mendapat nilai akhir. */
export default function CountUp({ value, suffix = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(value);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || typeof value !== 'number' || !ref.current) return undefined;
    setShown(0);
    const state = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(state, {
        n: value, duration: 1.1, ease: 'power2.out',
        onUpdate: () => setShown(Math.round(state.n)),
        scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">{shown}{suffix}</span>
      <span className="sr-only">{value}{suffix}</span>
    </span>
  );
}
