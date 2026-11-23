import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cx } from '../../lib/cx';

function daftar(current, count) {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const pages = [...new Set([1, count, current - 1, current, current + 1])]
    .filter((p) => p >= 1 && p <= count)
    .sort((a, b) => a - b);
  const out = [];
  pages.forEach((p, i) => {
    if (i && p - pages[i - 1] > 1) out.push('…');
    out.push(p);
  });
  return out;
}

export default function Pagination({ page, pageCount, onChange }) {
  const btn = 'grid size-8 place-items-center rounded-md text-body transition-colors';
  return (
    <nav aria-label="Halaman" className="flex items-center gap-1">
      <button
        onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Halaman sebelumnya"
        className={cx(btn, 'text-ink-700 hover:bg-primary-50 disabled:opacity-40')}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </button>
      {daftar(page, pageCount).map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="px-1 text-ink-500" aria-hidden="true">…</span>
        ) : (
          <button
            key={p} onClick={() => onChange(p)} aria-label={`Halaman ${p}`} aria-current={p === page ? 'page' : undefined}
            className={cx(btn, p === page ? 'bg-primary-600 font-semibold text-white shadow-e1' : 'text-ink-700 hover:bg-primary-50')}
          >
            {p}
          </button>
        ),
      )}
      <button
        onClick={() => onChange(page + 1)} disabled={page >= pageCount} aria-label="Halaman berikutnya"
        className={cx(btn, 'text-ink-700 hover:bg-primary-50 disabled:opacity-40')}
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
