import { useEffect, useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const titleContainerRef = useRef(null);

  // Setup Lenis Smooth Scroll + GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-login-title',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleContainerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, titleContainerRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  function submit(event) {
    event.preventDefault();
    post('/login');
  }

  return (
    <>
      <Head title="Masuk - Learvia" />

      {/* Style khusus agar browser autofill tidak mengubah background input menjadi biru */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 40px #ffffff inset !important;
          -webkit-text-fill-color: #111827 !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      {/* Full Page Layout */}
      <main className="relative flex min-h-screen w-full overflow-hidden bg-white text-[#111827]">
        {/* Brand Logo Kiri Atas (Diperbesar) */}
        <a
          href="/"
          className="group absolute left-6 top-6 z-20 flex items-center gap-3.5 sm:left-12 sm:top-9"
        >
          <div className="grid size-12 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm transition group-hover:border-[#297799]">
            <span className="text-xl font-extrabold text-[#1e3a8a]">L</span>
          </div>
          <div className="leading-tight">
            <span className="block text-xl font-extrabold tracking-tight text-[#1e3a8a]">
              Learvia
            </span>
            <span className="block text-[11px] font-bold tracking-[0.16em] text-[#297799]">
              AI EXAMINATION
            </span>
          </div>
        </a>

        {/* ==============================================================
            AREA KIRI: FORM LOGIN (Lebih Besar & Proporsional)
        =============================================================== */}
        <div className="relative z-10 flex w-full flex-col justify-center px-6 py-28 sm:px-14 lg:w-[58%] lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[460px]"
          >
            {/* Judul Utama (GSAP ScrollTrigger) */}
            <div ref={titleContainerRef} className="mb-9">
              <h1 className="gsap-login-title text-[30px] font-normal leading-snug tracking-tight text-[#111827] sm:text-[36px]">
                Selamat datang,
              </h1>
              <h2 className="gsap-login-title text-[32px] font-extrabold leading-tight tracking-tight text-[#1e3a8a] sm:text-[38px]">
                masuk ke <span className="text-[#297799]">Learvia</span>
              </h2>
              <div className="mt-3 h-[3px] w-20 rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#297799]" />
            </div>

            <form onSubmit={submit} className="space-y-6">
              {/* Input Username Pill */}
              <div>
                <div className="flex items-center rounded-full border border-slate-100 bg-white px-5 py-3.5 shadow-[0_10px_28px_rgba(15,23,42,0.07)] transition-shadow focus-within:shadow-[0_10px_32px_rgba(30,58,138,0.12)] sm:py-4">
                  <span className="mr-3.5 grid size-9 shrink-0 place-items-center rounded-full border border-[#297799]/30 text-[#297799]">
                    <svg
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </span>
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Username"
                    value={data.username}
                    onChange={(e) => setData('username', e.target.value)}
                    className="w-full bg-white text-base font-medium text-[#111827] placeholder-slate-400 outline-none"
                    required
                  />
                </div>
                {errors.username && (
                  <p className="mt-2 pl-5 text-xs font-medium text-red-600">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Input Password Pill */}
              <div>
                <div className="flex items-center rounded-full border border-slate-100 bg-white px-5 py-3.5 shadow-[0_10px_28px_rgba(15,23,42,0.07)] transition-shadow focus-within:shadow-[0_10px_32px_rgba(30,58,138,0.12)] sm:py-4">
                  <span className="mr-3.5 grid size-9 shrink-0 place-items-center rounded-full border border-[#297799]/30 text-[#297799]">
                    <svg
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="w-full bg-white text-base font-medium text-[#111827] placeholder-slate-400 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Tampilkan atau sembunyikan password"
                    className="ml-2.5 text-slate-400 transition hover:text-[#1e3a8a]"
                  >
                    {showPassword ? (
                      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 pl-5 text-xs font-medium text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Baris Terpisah: Lupa password? (Tidak sejajar tombol Login) */}
              <div className="flex justify-end pt-0.5">
                <a
                  href="/forgot-password"
                  className="text-sm font-semibold text-[#1e3a8a] transition hover:text-[#297799]"
                >
                  Lupa password?
                </a>
              </div>

              {/* Tombol Login Berdiri Sendiri di Bagian Bawah */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={processing}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                  className="w-full rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#297799] px-10 py-3.5 text-base font-bold text-white shadow-[0_12px_26px_rgba(30,58,138,0.28)] transition-shadow hover:shadow-[0_14px_30px_rgba(41,119,153,0.38)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[180px]"
                >
                  {processing ? 'Memproses...' : 'Login'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* ==============================================================
            AREA KANAN: LENGKUNGAN GELOMBANG BIRU LEARVIA (TANPA IMG)
        =============================================================== */}
        <div className="pointer-events-none relative hidden lg:block lg:w-[42%]">
          <svg
            viewBox="0 0 600 900"
            fill="none"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="learviaWaveMain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#297799" />
              </linearGradient>
            </defs>

            {/* Layer 1 (Paling luar - biru sangat lembut) */}
            <path
              d="M210 0 C50 260 50 640 210 900 H600 V0 Z"
              fill="#d9edf4"
            />

            {/* Layer 2 (Tengah - biru medium transparan) */}
            <path
              d="M295 0 C145 270 145 630 295 900 H600 V0 Z"
              fill="#84bed1"
              fillOpacity="0.55"
            />

            {/* Layer 3 (Utama - gradasi biru Learvia) */}
            <path
              d="M380 0 C245 280 245 620 380 900 H600 V0 Z"
              fill="url(#learviaWaveMain)"
            />
          </svg>
        </div>
      </main>
    </>
  );
}
