import { motion } from 'motion/react';
import { cx } from '../../lib/cx';

/** Cincin persen kecil + label. `tone` = kelas warna teks Tailwind (stroke mengikuti currentColor). */
export default function MiniRing({ value, label, tone = 'text-primary-600' }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative size-12 shrink-0">
        <svg viewBox="0 0 36 36" className="size-full -rotate-90" aria-hidden="true">
          <circle cx="18" cy="18" r="15" fill="none" strokeWidth="3.5" className="stroke-line" />
          <motion.circle
            cx="18" cy="18" r="15" fill="none" strokeWidth="3.5" strokeLinecap="round"
            className={cx('stroke-current', tone)}
            initial={{ pathLength: 0 }} whileInView={{ pathLength: value / 100 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-caption font-bold text-ink-900">{value}%</span>
      </div>
      <p className="max-w-[8rem] text-body text-ink-700">{label}</p>
    </div>
  );
}
