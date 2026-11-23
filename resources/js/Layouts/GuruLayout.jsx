import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Menu, Search, Bell, X } from 'lucide-react';
import Sidebar from '../Components/layout/Sidebar';
import { guruNav, isActive } from '../config/nav';
import useLenis from '../hooks/useLenis';
import useMediaQuery from '../hooks/useMediaQuery';

const W_FULL = 256;
const W_ICON = 76;

export default function GuruLayout({ children }) {
  const { props, url: pageUrl } = usePage();
  const { auth, notifikasiBelumDibaca = 0, flash } = props;
  const isMd = useMediaQuery('(min-width: 768px)');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const [expanded, setExpanded] = useState(true);
  const [drawer, setDrawer] = useState(false);
  useLenis();

  const sidebarExpanded = isLg && expanded;
  const sidebarWidth = isMd ? (sidebarExpanded ? W_FULL : W_ICON) : 0;
  const current = guruNav.find((i) => isActive(pageUrl, i));

  useEffect(() => {
    if (!drawer) return undefined;
    const onKey = (e) => e.key === 'Escape' && setDrawer(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawer]);

  const onMenu = () => (isLg ? setExpanded((v) => !v) : setDrawer(true));

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F4F7FC]">
        <a href="#konten" className="sr-only z-50 rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#233371] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 shadow-md">
          Lewati ke konten
        </a>

        {/* Sidebar Desktop */}
        <aside
          className="fixed inset-y-0 left-0 z-30 hidden overflow-hidden transition-[width] duration-200 md:block"
          style={{ width: sidebarWidth }}
        >
          <Sidebar nav={guruNav} expanded={sidebarExpanded} />
        </aside>

        {/* Drawer Mobile */}
        <AnimatePresence>
          {drawer && (
            <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label="Menu">
              <motion.button
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" aria-label="Tutup menu" tabIndex={-1}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setDrawer(false)}
              />
              <motion.div
                className="absolute inset-y-0 left-0 w-[min(288px,calc(100%-3rem))] shadow-2xl"
                initial={{ x: -48, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -48, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sidebar nav={guruNav} expanded onNavigate={() => setDrawer(false)} />
                <button
                  autoFocus onClick={() => setDrawer(false)} aria-label="Tutup menu"
                  className="absolute right-3 top-3 grid size-9 place-items-center rounded-xl text-white/80 hover:bg-white/20 transition-colors"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="transition-[padding] duration-200" style={{ paddingLeft: sidebarWidth }}>
          {/* Header Bar */}
          <header className="sticky top-0 z-20 flex min-h-16 items-center gap-3 border-b border-slate-100 bg-white/95 px-4 pt-[env(safe-area-inset-top)] backdrop-blur-md md:px-8">
            <button
              onClick={onMenu}
              aria-label={isLg ? (expanded ? 'Lipat menu' : 'Lebarkan menu') : 'Buka menu'}
              className="grid size-10 shrink-0 place-items-center rounded-xl text-slate-600 hover:bg-[#EEF5F9] hover:text-[#233371] transition-colors"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
            <p className="font-display text-lg font-bold text-slate-800">{current?.label ?? 'Dashboard'}</p>

            <form role="search" className="relative ml-auto hidden w-full max-w-xs sm:block" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="cari-global" className="sr-only">Cari kelas, siswa, atau ujian</label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                id="cari-global" type="search" placeholder="Cari apa saja..."
                className="h-10 w-full rounded-full border border-slate-200/80 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-[#307997] focus:outline-none focus:ring-2 focus:ring-[#307997]/20 transition-all"
              />
            </form>

            <button
              aria-label={notifikasiBelumDibaca ? `Notifikasi, ${notifikasiBelumDibaca} belum dibaca` : 'Notifikasi'}
              className="relative ml-auto grid size-10 shrink-0 place-items-center rounded-xl text-slate-600 hover:bg-slate-100 transition-colors sm:ml-0"
            >
              <Bell className="size-5" aria-hidden="true" />
              {notifikasiBelumDibaca > 0 && (
                <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-gradient-to-r from-[#233371] to-[#307997] text-[10px] font-bold text-white shadow-xs" aria-hidden="true">
                  {notifikasiBelumDibaca}
                </span>
              )}
            </button>

            {/* Profil Pengguna */}
            <div className="flex items-center gap-3 pl-2">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#EDF5FA] to-[#E2EEF6] border border-[#CBDDE8] font-display text-sm font-bold text-[#233371] shadow-2xs" aria-hidden="true">
                {auth?.user?.name?.[0] ?? 'G'}
              </span>
              <div className="hidden leading-tight md:block">
                <p className="text-xs font-semibold text-slate-800">{auth?.user?.name ?? 'Guru Pengampu'}</p>
                <p className="text-[11px] text-slate-500 capitalize">{auth?.user?.role ?? 'Guru'}</p>
              </div>
            </div>
          </header>

          {flash?.status && (
            <div role="status" className="mx-4 mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 md:mx-8">
              {flash.status}
            </div>
          )}

          <main id="konten" className="px-4 pb-12 pt-6 md:px-8">
            <div className="mx-auto max-w-[1320px]">{children}</div>
          </main>

          <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/60 px-4 py-4 text-xs text-slate-500 md:px-8">
            <p>© {new Date().getFullYear()} Learvia. Student Result Management System.</p>
            <p>Dibuat untuk kemudahan pengelolaan sekolah &amp; ujian.</p>
          </footer>
        </div>
      </div>
    </MotionConfig>
  );
}
