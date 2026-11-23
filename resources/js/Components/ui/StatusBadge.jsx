import { Check, CircleDashed, X, Thermometer, FileText, Pencil, Send, Play, CheckCheck, Ban, Lock, Eye } from 'lucide-react';
import { cx } from '../../lib/cx';

const tone = {
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200/60',
  danger: 'bg-rose-50 text-rose-700 border border-rose-200/60',
  info: 'bg-blue-50 text-blue-700 border border-blue-200/60',
  neutral: 'bg-slate-100 text-slate-700 border border-slate-200/60',
  excuse: 'bg-purple-50 text-purple-700 border border-purple-200/60',
  sick: 'bg-sky-50 text-sky-700 border border-sky-200/60',
};

// [label, tone, ikon] — status selalu ikon + teks, tidak pernah warna saja.
const MAP = {
  kehadiran: {
    hadir: ['Hadir', 'success', Check],
    sakit: ['Sakit', 'sick', Thermometer],
    izin: ['Izin', 'excuse', FileText],
    alpa: ['Alpa', 'danger', X],
    belum: ['Belum dicatat', 'neutral', CircleDashed],
  },
  ujian: {
    draft: ['Draft', 'neutral', Pencil],
    published: ['Terbit', 'info', Send],
    ongoing: ['Berlangsung', 'success', Play],
    completed: ['Selesai', 'info', CheckCheck],
    cancelled: ['Dibatalkan', 'danger', Ban],
  },
  nilai: {
    unpublished: ['Belum diumumkan', 'neutral', Lock],
    published: ['Terbit', 'success', Eye],
  },
};

export default function StatusBadge({ kind, value, className }) {
  const [label, t, Icon] = MAP[kind]?.[value] ?? [value, 'neutral', CircleDashed];
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', tone[t], className)}>
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}
