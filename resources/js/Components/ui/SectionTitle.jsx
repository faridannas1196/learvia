import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/motion';

/** Judul yang muncul (naik dari balik masker) saat bagian datanya masuk ke layar lewat scroll. */
export default function SectionTitle({ as: Tag = 'h2', className = '', children, ...props }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-title]',
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={`overflow-hidden pb-1 ${className}`} {...props}>
      <span data-title className="inline-block">{children}</span>
    </Tag>
  );
}
