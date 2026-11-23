import SectionTitle from './SectionTitle';

export default function PageHeader({ title, subtitle, action }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 pb-6">
      <div className="min-w-0">
        <SectionTitle as="h1" className="font-display text-h1 text-ink-900">{title}</SectionTitle>
        {subtitle && <p className="mt-1 text-body text-ink-700">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}
