import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/motion';

/** segments: [{ label, value (total 100), color (hex) }]. Legenda teks menyertai warna. */
export default function DonutChart({ segments, centerValue, centerLabel, summary }) {
  const ref = useRef(null);
  let acc = 0;
  const arcs = segments.map((s) => {
    const arc = { ...s, offset: -acc };
    acc += s.value;
    return arc;
  });

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-arc]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { attr: { 'stroke-dasharray': '0 100' } },
          {
            attr: { 'stroke-dasharray': el.dataset.dash }, duration: 0.9, delay: i * 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="flex flex-wrap items-center justify-center gap-6 py-1">
      <div className="relative size-36 shrink-0">
        <svg viewBox="0 0 36 36" className="size-full -rotate-90" role="img" aria-label={summary}>
          <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#F1F5F9" strokeWidth="3.8" />
          {arcs.map((a) => (
            <circle
              key={a.label} data-arc data-dash={`${a.value} ${100 - a.value}`}
              cx="18" cy="18" r="15.9155" fill="none" stroke={a.color} strokeWidth="3.8"
              strokeDasharray={`${a.value} ${100 - a.value}`} strokeDashoffset={a.offset}
              strokeLinecap="round"
            />
          ))}
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="font-display text-2xl font-bold text-slate-900 leading-tight">{centerValue}</p>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{centerLabel}</p>
          </div>
        </div>
      </div>
      <ul className="space-y-2">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5 text-xs text-slate-600">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: s.color }} aria-hidden="true" />
            <span className="w-16 font-medium text-slate-700">{s.label}</span>
            <span className="font-bold text-slate-900 ml-auto">{s.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
