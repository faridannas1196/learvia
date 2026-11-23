import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cx } from '../../lib/cx';

const HARI = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const pad = (n) => String(n).padStart(2, '0');

/** events: [{ tanggal: 'YYYY-MM-DD', judul }]. Hari ini biru solid, hari ada ujian bertitik. */
export default function MiniCalendar({ events = [] }) {
  const [offset, setOffset] = useState(0);
  const today = new Date();
  const base = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const year = base.getFullYear();
  const month = base.getMonth();
  const lead = (base.getDay() + 6) % 7; // Senin = 0
  const total = new Date(year, month + 1, 0).getDate();

  const cells = [...Array(lead).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));
  const eventOf = new Map(events.map((e) => [e.tanggal, e.judul]));

  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <p className="font-display text-sm font-bold text-slate-800 capitalize">
          {base.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
        </p>
        <div className="flex gap-1">
          <button
            onClick={() => setOffset((o) => o - 1)}
            aria-label="Bulan sebelumnya"
            className="grid size-7 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => setOffset((o) => o + 1)}
            aria-label="Bulan berikutnya"
            className="grid size-7 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <table className="w-full text-center text-xs">
        <caption className="sr-only">Kalender {base.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</caption>
        <thead>
          <tr>
            {HARI.map((h, i) => (
              <th key={h} scope="col" className={cx('pb-2 font-semibold', i === 6 ? 'text-rose-500' : 'text-slate-400')}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-transparent">
          {weeks.map((w, wi) => (
            <tr key={wi}>
              {w.map((d, di) => {
                if (!d) return <td key={di} className="p-1" />;
                const key = `${year}-${pad(month + 1)}-${pad(d)}`;
                const judul = eventOf.get(key);
                const isToday = offset === 0 && d === today.getDate();
                return (
                  <td key={di} className="p-0.5">
                    <span
                      title={judul}
                      className={cx(
                        'relative mx-auto grid size-7 place-items-center rounded-full text-xs transition-all',
                        isToday
                          ? 'bg-blue-600 font-bold text-white shadow-xs shadow-blue-500/30'
                          : di === 6
                            ? 'text-rose-500 font-medium hover:bg-rose-50'
                            : 'text-slate-700 font-medium hover:bg-slate-100'
                      )}
                    >
                      {d}
                      {judul && (
                        <span
                          className={cx(
                            'absolute bottom-0.5 size-1 rounded-full',
                            isToday ? 'bg-white' : 'bg-amber-500'
                          )}
                          aria-hidden="true"
                        />
                      )}
                      {judul && <span className="sr-only">, {judul}</span>}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
