export default function Logo({ onDark = false, size = 'md' }) {
  const sizeMap = {
    sm: 'size-7',
    md: 'size-9',
    lg: 'size-12',
  };

  return (
    <div className="flex items-center gap-2.5">
      <div className={`grid ${sizeMap[size] ?? 'size-9'} shrink-0 place-items-center rounded-xl bg-white shadow-xs p-1 ring-1 ring-slate-100`}>
        <img
          src="/images/learvia-logo-clean.png"
          alt="Learvia Logo"
          className="size-full object-contain"
        />
      </div>
      <span className={`font-display font-bold tracking-tight text-lg ${onDark ? 'text-white' : 'text-[#233371]'}`}>
        Learvia
      </span>
    </div>
  );
}
