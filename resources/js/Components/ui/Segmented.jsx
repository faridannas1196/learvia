import { cx } from '../../lib/cx';

export default function Segmented({ label, options, value, onChange }) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full bg-surface p-0.5 ring-1 ring-line-strong">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={cx(
            'h-8 rounded-full px-4 text-label transition-colors',
            value === o.value ? 'bg-primary-600 text-white shadow-e1' : 'text-ink-700 hover:text-ink-900',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
