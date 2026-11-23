import { useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import {
  Sparkles, BrainCircuit, ShieldCheck, CheckCircle2, ArrowRight,
  GraduationCap, Users, FileText, BarChart3, Clock, Zap, Check,
  ChevronRight, Laptop, Award, Lock, Search
} from 'lucide-react';
import useLenis from '../hooks/useLenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';

/**
 * Komponen Judul dengan Efek GSAP + ScrollTrigger Reveal
 */
function GsapRevealTitle({ children, className = '', as: Tag = 'h2' }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current || !textRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 88%',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden pb-1.5">
      <Tag ref={textRef} className={`inline-block ${className}`}>
        {children}
      </Tag>
    </div>
  );
}

export default function Welcome() {
  // Smooth Scroll Lenis
  useLenis();

  /**
   * Fungsi slow/smooth scroll saat menu navbar diklik.
   * Mendukung offset sticky header setinggi 80px dan durasi transisi yang halus.
   */
  const scrollToSection = (e, targetId) => {
    e.preventDefault();

    if (targetId === '#home' || targetId === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    const element = document.querySelector(targetId);
    if (!element) return;

    const navOffset = 80; // tinggi sticky header
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <div id="home" className="min-h-screen bg-[#F4F7FC] text-slate-800 antialiased selection:bg-[#307997] selection:text-white">
      <Head title="Learvia - Platform Manajemen Sekolah & Ujian AI Modern" />

     

      {/* Sticky Header / Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo Brand -> Klik balik ke paling atas */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="grid size-11 place-items-center rounded-2xl bg-white shadow-xs p-1.5 ring-1 ring-slate-200/80 transition-transform group-hover:scale-105">
              <img
                src="/images/learvia-logo-clean.png"
                alt="Learvia Logo"
                className="size-full object-contain"
              />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-[#1E2565]">Learvia</span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#307997] -mt-0.5">
                AI Examination
              </span>
            </div>
          </a>

          {/* Navigation Links dengan Slow Smooth Scroll */}
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="hover:text-[#233371] transition-colors cursor-pointer"
            >
              Home
            </a>
            <a
              href="#fitur-unggulan"
              onClick={(e) => scrollToSection(e, '#fitur-unggulan')}
              className="hover:text-[#233371] transition-colors cursor-pointer"
            >
              Fitur Unggulan
            </a>
            <a
              href="#keunggulan"
              onClick={(e) => scrollToSection(e, '#keunggulan')}
              className="hover:text-[#233371] transition-colors cursor-pointer"
            >
              Keunggulan
            </a>
            <a
              href="#tentang"
              onClick={(e) => scrollToSection(e, '#tentang')}
              className="hover:text-[#233371] transition-colors cursor-pointer"
            >
              Tentang Kami
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-[#233371] px-3.5 py-2 transition-colors hidden sm:inline-block"
            >
              Masuk
            </Link>
            <Link
              href="/guru"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#233371] to-[#307997] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-950/20 hover:from-[#1C2A5E] hover:to-[#27647E] transition-all hover:shadow-md"
            >
              <span>Portal Guru</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ========================================================
            BAGIAN 1: HERO SECTION
            ======================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#E6F3F7] via-[#EFF7FA] to-[#F4F7FC] px-6 pt-16 pb-24 md:pt-24 md:pb-32 lg:px-8 border-b border-[#D4E5F0]">
          {/* Subtle Ambient Orbs */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#307997]/15 to-[#4AAABF]/20 blur-3xl" />

          <div className="mx-auto max-w-4xl text-center">

            {/* GSAP Reveal Headline */}
            <GsapRevealTitle as="h1" className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.15]">
              Membuka Potensi Belajar dengan <span className="bg-gradient-to-r from-[#233371] via-[#2F4E8D] to-[#307997] bg-clip-text text-transparent">Kecerdasan Buatan</span>
            </GsapRevealTitle>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-slate-600"
            >
              Learvia menghadirkan koreksi esai instan berbasis rubrik kontekstual, verifikasi presensi kamera cerdas, serta pelacakan performa akademik siswa yang akurat dan transparan.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/guru"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#233371] to-[#307997] px-7 py-3.5 text-base font-semibold text-white shadow-md shadow-indigo-950/20 hover:from-[#1C2A5E] hover:to-[#27647E] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Mulai Akses Guru</span>
                <ArrowRight className="size-5" />
              </Link>
              <a
                href="#fitur-unggulan"
                onClick={(e) => scrollToSection(e, '#fitur-unggulan')}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-base font-semibold text-[#233371] border border-slate-200/90 shadow-2xs hover:bg-[#F3F8FB] hover:border-[#307997]/40 transition-all cursor-pointer"
              >
                <span>Eksplorasi Fitur Unggulan</span>
              </a>
            </motion.div>
          </div>

          {/* Hero Visual Card Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-14 max-w-5xl"
          >
            <div className="relative rounded-3xl bg-white p-4 sm:p-7 shadow-[0_12px_40px_rgba(27,35,88,0.08)] border border-[#D5E5F0]">

              {/* Grid 3 Kartu Mini di Hero */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-[#F6FAFD] p-4 border border-[#E0EEF5]">
                  <p className="text-xs font-semibold text-slate-500">Akurasi Penilaian Esai</p>
                  <p className="mt-1 font-display text-3xl font-bold text-[#233371]">99.4%</p>
                  <p className="mt-1 text-xs font-medium text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="size-3.5" /> Kalibrasi Rubrik Nasional
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F6FAFD] p-4 border border-[#E0EEF5]">
                  <p className="text-xs font-semibold text-slate-500">Waktu Koreksi Per Siswa</p>
                  <p className="mt-1 font-display text-3xl font-bold text-[#307997]">&lt; 3 Detik</p>
                  <p className="mt-1 text-xs font-medium text-[#307997] flex items-center gap-1">
                    <Zap className="size-3.5" /> Otomatis & Komprehensif
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F6FAFD] p-4 border border-[#E0EEF5]">
                  <p className="text-xs font-semibold text-slate-500">Integritas Kehadiran & Ujian</p>
                  <p className="mt-1 font-display text-3xl font-bold text-[#1E2565]">Bebas Joki</p>
                  <p className="mt-1 text-xs font-medium text-blue-600 flex items-center gap-1">
                    <ShieldCheck className="size-3.5" /> Biometrik & Deteksi Layar
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================
            BAGIAN 2: FITUR UNGGULAN (Gabungan AI Essay Grading & Presensi Cerdas)
            Tata letak Zig-zag bergantian sesuai referensi
            ======================================================== */}
        <div id="fitur-unggulan">
          {/* Sub-fitur 1: AI Essay Grading (Kiri Teks, Kanan Visual) */}
          <section className="px-6 py-20 md:py-28 lg:px-8 bg-white border-b border-slate-100">
            <div className="mx-auto max-w-7xl">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                {/* Kolom Kiri: Teks & Informasi */}
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDF5FA] px-3.5 py-1 text-xs font-semibold text-[#233371] border border-[#D3E5F0] mb-4">
                    <BrainCircuit className="size-3.5 text-[#307997]" />
                    <span>Fitur Unggulan #1: AI Grading</span>
                  </span>

                  <GsapRevealTitle as="h2" className="font-display text-3xl font-bold text-slate-900 sm:text-4xl leading-tight">
                    Koreksi Jawaban Esai Ratusan Siswa dalam Hitungan Detik
                  </GsapRevealTitle>

                  <p className="mt-5 text-base md:text-lg leading-relaxed text-slate-600">
                    Guru tidak perlu lagi lembur berhari-hari mengoreksi tumpukan kertas ujian. Mesin AI Learvia membaca penalaran siswa, membandingkannya dengan rubrik penilaian yang ditentukan guru, dan memberikan skor objektif dengan catatan evaluasi personal.
                  </p>

                  {/* Poin-poin Keunggulan */}
                  <ul className="mt-7 space-y-3.5">
                    {[
                      'Analisis semantik mendalam terhadap argumen siswa, bukan sekadar mencocokkan kata kunci.',
                      'Rubrik penilaian kustom yang fleksibel (bobot materi, logika, dan kelengkapan).',
                      'Umpan balik langsung kepada siswa untuk memahami letak kesalahan dan perbaikan.',
                    ].map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: idx * 0.1 }}
                        className="flex items-start gap-3 text-sm text-slate-700"
                      >
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600 mt-0.5 border border-emerald-200/60">
                          <Check className="size-3.5" />
                        </span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-8 flex items-center gap-4">
                    <Link
                      href="/guru/bank-soal"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#233371] to-[#307997] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-950/20 hover:from-[#1C2A5E] hover:to-[#27647E] transition-all"
                    >
                      <span>Jelajahi Bank Soal</span>
                      <ArrowRight className="size-4" />
                    </Link>
                    <Link
                      href="/guru/ujian"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#233371] hover:text-[#307997] transition-colors"
                    >
                      <span>Lihat Contoh Hasil Ujian</span>
                      <ChevronRight className="size-4" />
                    </Link>
                  </div>
                </div>

                {/* Kolom Kanan: Visual Card Mockup (Motion Card + Hover) */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="relative rounded-3xl bg-gradient-to-br from-[#F6FAFD] to-[#EDF6FA] p-6 sm:p-8 border border-[#D5E5F0] shadow-[0_8px_30px_rgba(35,51,113,0.06)]"
                >
                  {/* Header Kartu Mockup */}
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-9 place-items-center rounded-xl bg-[#233371] text-white font-bold text-xs">
                        AI
                      </span>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Evaluasi Esai: Biologi Sel</p>
                        <p className="text-[11px] text-slate-500">Siswa: Ahmad Fauzan (Kelas XI IPA 2)</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                      Nilai: 94 / 100
                    </span>
                  </div>

                  {/* Konten Jawaban & Analisis */}
                  <div className="mt-5 space-y-4">
                    <div className="rounded-xl bg-white p-4 border border-slate-100 shadow-2xs">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Soal #3 (Bobot 25)</p>
                      <p className="mt-1 text-xs font-medium text-slate-700 leading-relaxed">
                        Jelaskan perbedaan fungsi antara mitokondria dan kloroplas dalam proses konversi energi sel!
                      </p>
                    </div>

                    <div className="rounded-xl bg-white p-4 border border-slate-100 shadow-2xs">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Jawaban Siswa</p>
                      <p className="mt-1 text-xs text-slate-700 leading-relaxed">
                        "Mitokondria berfungsi dalam respirasi seluler untuk menghasilkan ATP dari glukosa, sedangkan kloroplas berperan dalam fotosintesis yang mengubah energi cahaya menjadi energi kimia..."
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700">
                          ✓ Respirasi Seluler
                        </span>
                        <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700">
                          ✓ Konversi ATP
                        </span>
                        <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700">
                          ✓ Fotosintesis
                        </span>
                      </div>
                    </div>

                    {/* AI Feedback Box */}
                    <div className="rounded-xl bg-gradient-to-r from-[#EDF5FA] to-[#E3EFF7] p-3.5 border border-[#CDE1EE]">
                      <p className="text-xs font-bold text-[#233371] flex items-center gap-1.5">
                        <Sparkles className="size-3.5 text-[#307997]" />
                        Catatan Penilaian AI
                      </p>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                        Siswa memahami konsep metabolisme dengan sangat jelas. Hubungan antara pembentukan ATP dan proses anabolisme/katabolisme dipaparkan dengan runtut sesuai rubrik guru.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Sub-fitur 2: Presensi Cerdas & Pengawasan (Kiri Visual, Kanan Teks - Pola Zig-Zag) */}
          <section className="px-6 py-20 md:py-28 lg:px-8 bg-[#F8FBFC] border-b border-slate-100">
            <div className="mx-auto max-w-7xl">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                {/* Kolom Kiri: Visual Card Mockup (Pola Zig-zag seperti gambar referensi) */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="order-2 lg:order-1 relative rounded-3xl bg-white p-6 sm:p-8 border border-slate-100 shadow-[0_8px_30px_rgba(27,35,88,0.06)]"
                >
                  {/* Header Simulator Kamera */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-emerald-500 animate-ping" />
                      <p className="text-sm font-bold text-slate-800">Simulasi Pemindaian Kamera Kelas</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">Kamera 1 - HD 1080p</span>
                  </div>

                  {/* Frame Kamera Simulasi */}
                  <div className="mt-4 relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {/* Grid Deteksi Wajah */}
                    <div className="relative z-10 text-center">
                      <div className="mx-auto size-28 rounded-2xl border-2 border-dashed border-teal-400 p-2 flex items-center justify-center relative">
                        <div className="size-20 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl">
                          🧑🏻‍🎓
                        </div>
                        <span className="absolute -bottom-3 bg-teal-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                          99.2% Terverifikasi
                        </span>
                      </div>
                    </div>

                    {/* Overlay Status Kamera */}
                    <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-white text-xs">
                      <div>
                        <p className="font-semibold">Nadia Larasati (Siswa)</p>
                        <p className="text-[10px] text-teal-300">Presensi Berhasil Dicatat • 07:14 WIB</p>
                      </div>
                      <span className="rounded-md bg-emerald-500/80 px-2 py-1 text-[11px] font-bold">
                        Hadir
                      </span>
                    </div>
                  </div>

                  {/* Rekap Real-time Bawah */}
                  <div className="mt-5 grid grid-cols-3 gap-2.5 text-center">
                    <div className="rounded-xl bg-[#F6FAFD] p-2.5 border border-[#E0EEF5]">
                      <p className="text-[11px] font-semibold text-slate-500">Total Hadir</p>
                      <p className="font-display text-lg font-bold text-emerald-600">35 Siswa</p>
                    </div>
                    <div className="rounded-xl bg-[#F6FAFD] p-2.5 border border-[#E0EEF5]">
                      <p className="text-[11px] font-semibold text-slate-500">Izin / Sakit</p>
                      <p className="font-display text-lg font-bold text-[#307997]">1 Siswa</p>
                    </div>
                    <div className="rounded-xl bg-[#F6FAFD] p-2.5 border border-[#E0EEF5]">
                      <p className="text-[11px] font-semibold text-slate-500">Status Integritas</p>
                      <p className="font-display text-lg font-bold text-[#233371]">100% Valid</p>
                    </div>
                  </div>
                </motion.div>

                {/* Kolom Kanan: Teks & Penjelasan */}
                <div className="order-1 lg:order-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDF5FA] px-3.5 py-1 text-xs font-semibold text-[#233371] border border-[#D3E5F0] mb-4">
                    <ShieldCheck className="size-3.5 text-[#307997]" />
                    <span>Fitur Unggulan #2: Presensi Cerdas</span>
                  </span>

                  <GsapRevealTitle as="h2" className="font-display text-3xl font-bold text-slate-900 sm:text-4xl leading-tight">
                    Presensi Wajah Seketika & Ujian Bersih Tanpa Kecurangan
                  </GsapRevealTitle>

                  <p className="mt-5 text-base md:text-lg leading-relaxed text-slate-600">
                    Ucapkan selamat tinggal pada absensi manual satu per satu yang menyita waktu belajar. Siswa terdata secara otomatis lewat deteksi visual pintar. Saat ujian berlangsung, sistem proctoring aktif mengawasi integritas pengerjaan soal secara real-time.
                  </p>

                  {/* Poin-poin Fitur */}
                  <ul className="mt-7 space-y-3.5">
                    {[
                      'Deteksi multi-wajah instan via webcam laptop atau smartphone guru.',
                      'Pencatatan waktu kehadiran otomatis lengkap dengan rekapitulasi harian/bulanan.',
                      'Pelindung ujian: deteksi perpindahan tab, kecurangan layar, dan pengawasan gerak.',
                    ].map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: idx * 0.1 }}
                        className="flex items-start gap-3 text-sm text-slate-700"
                      >
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-600 mt-0.5 border border-teal-200/60">
                          <Check className="size-3.5" />
                        </span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-8 flex items-center gap-4">
                    <Link
                      href="/guru/absensi/mulai"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#233371] to-[#307997] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-950/20 hover:from-[#1C2A5E] hover:to-[#27647E] transition-all"
                    >
                      <span>Mulai Sesi Presensi</span>
                      <ArrowRight className="size-4" />
                    </Link>
                    <Link
                      href="/guru/absensi/rekap"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#233371] hover:text-[#307997] transition-colors"
                    >
                      <span>Lihat Rekap Absensi</span>
                      <ChevronRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ========================================================
            BAGIAN 3: CALLOUT BANNER (KEUNGGULAN)
            ======================================================== */}
        <section id="keunggulan" className="px-6 py-16 md:py-24 lg:px-8 bg-white">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E2565] via-[#243777] to-[#307997] px-8 py-16 text-center text-white shadow-[0_16px_50px_rgba(30,37,101,0.22)] md:px-16 md:py-20"
            >
              {/* Ornamen Latar */}
              <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full bg-indigo-500/20 blur-3xl" />

              <div className="relative z-10 max-w-2xl mx-auto">

                <GsapRevealTitle as="h2" className="font-display text-3xl font-extrabold text-white sm:text-4xl md:text-5xl leading-tight">
                  Tingkatkan Kualitas Akademik & Efisiensi Sekolah Anda
                </GsapRevealTitle>

                <p className="mt-5 text-sm md:text-base text-cyan-100/90 leading-relaxed">
                  Bergabunglah dengan ratusan pengajar yang telah menghemat hingga 70% waktu administrasi, memberikan evaluasi lebih berkualitas kepada setiap siswa.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/guru"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-base font-bold text-[#1E2565] shadow-lg shadow-black/15 hover:bg-cyan-50 transition-all hover:scale-105 active:scale-95"
                  >
                    <span>Masuk ke Portal Sekarang</span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white/15 px-6 py-3.5 text-base font-semibold text-white border border-white/25 hover:bg-white/25 transition-all backdrop-blur-xs"
                  >
                    <span>Login Akun</span>
                  </Link>
                </div>

                {/* Quick Highlights Bar */}
                <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/15 pt-8 sm:grid-cols-4 text-center">
                  <div>
                    <p className="font-display text-2xl font-bold text-white">50k+</p>
                    <p className="text-xs text-cyan-200 mt-0.5">Ujian Terselenggara</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-white">99.4%</p>
                    <p className="text-xs text-cyan-200 mt-0.5">Akurasi Rubrik AI</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-white">70%</p>
                    <p className="text-xs text-cyan-200 mt-0.5">Waktu Dihemat</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-white">100%</p>
                    <p className="text-xs text-cyan-200 mt-0.5">Keamanan Data</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ========================================================
          BAGIAN 4: FOOTER (4 Kolom Rapi & Bersih)
          ======================================================== */}
      <footer id="tentang" className="border-t border-slate-200/80 bg-white pt-16 pb-12 text-slate-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-slate-100">
            {/* Kolom 1: Brand & Penjelasan */}
            <div className="lg:col-span-2">
              <a
                href="#home"
                onClick={(e) => scrollToSection(e, '#home')}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div className="grid size-9 place-items-center rounded-xl bg-white shadow-xs p-1 ring-1 ring-slate-200">
                  <img
                    src="/images/learvia-logo-clean.png"
                    alt="Learvia Logo"
                    className="size-full object-contain"
                  />
                </div>
                <span className="font-display text-xl font-bold text-[#1E2565]">Learvia</span>
              </a>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
                Platform ekosistem manajemen sekolah dan ujian modern berbasis AI. Membantu guru mengoreksi ujian secara objektif dan mengelola kehadiran siswa tanpa repot.
              </p>
              <div className="mt-5 flex items-center gap-3 text-xs font-semibold text-slate-500">
                <span className="inline-flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="size-4" /> Server Aktif
                </span>
                <span>•</span>
                <span>Enkripsi Standar Sekolah</span>
              </div>
            </div>

            {/* Kolom 2: Fitur Utama */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900">Fitur Utama</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href="#fitur-unggulan"
                    onClick={(e) => scrollToSection(e, '#fitur-unggulan')}
                    className="hover:text-[#233371] transition-colors cursor-pointer"
                  >
                    Fitur Unggulan
                  </a>
                </li>
                <li><Link href="/guru/bank-soal" className="hover:text-[#233371] transition-colors">Bank Soal Terpadu</Link></li>
                <li><Link href="/guru/ujian" className="hover:text-[#233371] transition-colors">Manajemen Ujian</Link></li>
                <li><Link href="/guru/hasil" className="hover:text-[#233371] transition-colors">Analisis Nilai & Rekap</Link></li>
              </ul>
            </div>

            {/* Kolom 3: Portal Akses */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900">Portal Pengguna</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/guru" className="hover:text-[#233371] transition-colors">Portal Guru</Link></li>
                <li><Link href="/login" className="hover:text-[#233371] transition-colors">Login Akun Siswa</Link></li>
                <li><Link href="/login" className="hover:text-[#233371] transition-colors">Dashboard Admin</Link></li>
                <li><Link href="/guru/absensi/mulai" className="hover:text-[#233371] transition-colors">Sesi Presensi Kilat</Link></li>
              </ul>
            </div>

            {/* Kolom 4: Bantuan & Kebijakan */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900">Dukungan</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><span className="text-slate-400">Panduan Penggunaan</span></li>
                <li><span className="text-slate-400">Kebijakan Privasi</span></li>
                <li><span className="text-slate-400">Syarat & Ketentuan</span></li>
                <li><span className="text-slate-400">Hubungi Tim Bantuan</span></li>
              </ul>
            </div>
          </div>

          {/* Baris Hak Cipta */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} Learvia. All rights reserved. Platform Manajemen Sekolah & Ujian AI.</p>
            <div className="flex items-center gap-5">
              <span>Made for educators & students</span>
              <span>v1.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
