export default function EmptyState({ icon: Icon, title, children, action }) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
      {Icon && (
        <span className="grid size-12 place-items-center rounded-full bg-primary-50 text-primary-700">
          <Icon className="size-6" aria-hidden="true" />
        </span>
      )}
      <h3 className="font-display text-h3 text-ink-900">{title}</h3>
      {children && <p className="max-w-sm text-body text-ink-700">{children}</p>}
      {action}
    </div>
  );
}
