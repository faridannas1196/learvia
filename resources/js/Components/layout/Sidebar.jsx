import { Link, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { isActive } from '../../config/nav';
import { cx } from '../../lib/cx';

/**
 * Sidebar dengan identitas visual resmi Learvia:
 * - Header gradasi Navy Indigo ke Ocean Teal sesuai logo Learvia
 * - Logo resmi Learvia di dalam kontainer squircle putih elegan
 * - Item menu aktif dengan gradasi brand Learvia
 * - Tombol Keluar di dasar dengan aksen merah lembut
 */
export default function Sidebar({ nav, expanded = true, onNavigate }) {
  const { url } = usePage();

  return (
    <div className="flex h-full flex-col bg-white border-r border-slate-100 shadow-[2px_0_12px_rgba(0,0,0,0.02)]">
      {/* Header Gradasi Resmi Learvia (Navy-Indigo -> Ocean Teal) */}
      <div className={cx(
        'bg-gradient-to-br from-[#1E2565] via-[#263777] to-[#3B9CAE] text-white transition-[padding] duration-200 select-none shadow-xs',
        expanded ? 'px-5 py-6 text-center' : 'px-2 py-5 text-center'
      )}>
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white shadow-md p-1.5 ring-2 ring-white/25 backdrop-blur-sm transition-transform duration-200 hover:scale-105">
          <img
            src="/images/learvia-logo-clean.png"
            alt="Learvia Logo"
            width="44"
            height="44"
            className="size-full object-contain"
          />
        </span>
        {expanded && (
          <div className="mt-3">
            <h1 className="font-display text-xl font-bold tracking-wide text-white drop-shadow-xs">Learvia</h1>
            <p className="mt-0.5 text-[11px] text-cyan-100/90 font-medium tracking-wide">
              School Management &amp; AI Examination
            </p>
          </div>
        )}
      </div>

      {/* Navigasi Menu */}
      <nav aria-label="Menu utama" data-lenis-prevent className="flex-1 space-y-1.5 overflow-y-auto p-3">
        {nav.map((item) => {
          const active = isActive(url, item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              title={item.label}
              aria-current={active ? 'page' : undefined}
              className={cx(
                'group flex h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium transition-all duration-150',
                !expanded && 'justify-center px-0',
                active
                  ? 'bg-gradient-to-r from-[#243373] to-[#317793] text-white font-semibold shadow-md shadow-indigo-950/20'
                  : 'text-slate-600 hover:bg-[#EEF5F9] hover:text-[#243373]'
              )}
            >
              <item.icon
                className={cx(
                  'size-5 shrink-0 transition-colors',
                  active ? 'text-white' : 'text-slate-400 group-hover:text-[#317793]'
                )}
                aria-hidden="true"
              />
              {expanded ? <span>{item.label}</span> : <span className="sr-only">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Tombol Keluar */}
      <div className="border-t border-slate-100 p-3">
        <Link
          href="/logout"
          method="post"
          as="button"
          title="Keluar"
          className={cx(
            'group flex h-11 w-full items-center gap-3 rounded-xl px-3.5 text-sm font-medium text-rose-500 transition-colors hover:bg-rose-50 hover:text-rose-600',
            !expanded && 'justify-center px-0'
          )}
        >
          <LogOut className="size-5 shrink-0 text-rose-400 group-hover:text-rose-500" aria-hidden="true" />
          {expanded ? <span>Keluar</span> : <span className="sr-only">Keluar</span>}
        </Link>
      </div>
    </div>
  );
}
