import { Link } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { cx } from '../../lib/cx';

const variants = {
  primary: 'bg-gradient-to-r from-[#233371] to-[#307997] hover:from-[#1C2A5E] hover:to-[#27647E] text-white shadow-sm shadow-indigo-950/20 active:opacity-95',
  secondary: 'bg-white text-[#233371] border border-[#CBDDE8] hover:bg-[#F3F8FB] hover:border-[#96C7DB] active:bg-[#EAF3F8] shadow-2xs',
  ghost: 'text-slate-700 hover:bg-[#EEF5F9] hover:text-[#233371]',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
};

const sizes = {
  sm: 'h-8 px-3 text-xs font-semibold rounded-lg',
  md: 'h-10 px-4 text-sm font-semibold rounded-xl',
  lg: 'h-12 px-6 text-sm font-semibold rounded-xl',
};

export default function Button({
  href, variant = 'primary', size = 'md', loading = false, disabled = false,
  icon: Icon, className, children, ...props
}) {
  const cls = cx(
    'inline-flex shrink-0 items-center justify-center gap-2 font-medium transition-all duration-150 select-none cursor-pointer',
    'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:border-transparent disabled:shadow-none',
    variants[variant], sizes[size], className,
  );

  const content = (
    <>
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : Icon && <Icon className="size-4" aria-hidden="true" />}
      {children}
    </>
  );

  if (href && !disabled) return <Link href={href} className={cls} {...props}>{content}</Link>;

  return (
    <button type="button" className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
      {content}
    </button>
  );
}
