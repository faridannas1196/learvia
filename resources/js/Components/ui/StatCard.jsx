import Card from './Card';
import CountUp from './CountUp';

/**
 * Tone warna badge dan teks caption diselaraskan dengan palet resmi Learvia:
 * - Blue: Biru-Navy / Teal resmi Learvia (#233371 / #307997)
 * - Green: Emerald segar untuk total siswa
 * - Purple: Royal violet untuk ujian
 * - Orange: Amber hangat untuk esai
 * - Pink: Rose cerah untuk kehadiran
 * - Cyan: Ocean teal segar untuk kelas
 */
const tones = {
  blue: {
    badge: 'bg-[#EDF5FA] text-[#233371] border border-[#D3E5F0]',
    caption: 'text-[#233371]',
  },
  green: {
    badge: 'bg-emerald-50 text-emerald-600 border border-emerald-100/70',
    caption: 'text-emerald-600',
  },
  purple: {
    badge: 'bg-purple-50 text-purple-600 border border-purple-100/70',
    caption: 'text-purple-600',
  },
  orange: {
    badge: 'bg-amber-50 text-amber-600 border border-amber-100/70',
    caption: 'text-amber-600',
  },
  pink: {
    badge: 'bg-rose-50 text-rose-600 border border-rose-100/70',
    caption: 'text-rose-600',
  },
  cyan: {
    badge: 'bg-[#E6F6F8] text-[#207C91] border border-[#C8EEF3]',
    caption: 'text-[#207C91]',
  },
};

export default function StatCard({ label, value, suffix, icon: Icon, tone = 'blue', caption, delay = 0, className }) {
  const config = tones[tone] ?? tones.blue;

  return (
    <Card as="div" lift delay={delay} className={`flex items-center gap-3.5 !p-4 md:!p-5 ${className ?? ''}`}>
      {Icon && (
        <span className={`grid size-12 shrink-0 place-items-center rounded-2xl shadow-2xs ${config.badge}`}>
          <Icon className="size-6" aria-hidden="true" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-slate-500 mb-0.5 leading-tight">{label}</p>
        <p className="font-display text-2xl font-bold text-slate-900 tracking-tight leading-none my-1">
          {typeof value === 'number' ? <CountUp value={value} suffix={suffix} /> : value ?? '—'}
        </p>
        {caption && <p className={`text-[11px] font-semibold leading-tight ${config.caption}`}>{caption}</p>}
      </div>
    </Card>
  );
}
