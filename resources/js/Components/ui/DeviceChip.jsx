import { cx } from '../../lib/cx';

const states = {
  aktif: ['Aktif', 'bg-success-bg text-success-fg'],
  mati: ['Tidak aktif', 'bg-neutral-bg text-neutral-fg'],
  memeriksa: ['Memeriksa…', 'bg-neutral-bg text-neutral-fg'],
  masalah: ['Bermasalah', 'bg-danger-bg text-danger-fg'],
  // Tidak diketahui BUKAN aktif: garis putus, bukan warna sukses.
  unknown: ['Tidak diketahui', 'bg-surface text-neutral-fg border border-dashed border-line-strong'],
};

export default function DeviceChip({ label, state = 'unknown', icon: Icon, className }) {
  const [text, cls] = states[state] ?? states.unknown;
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-label', cls, className)}>
      {Icon && <Icon className="size-3.5" aria-hidden="true" />}
      <span>{label}: {text}</span>
    </span>
  );
}
