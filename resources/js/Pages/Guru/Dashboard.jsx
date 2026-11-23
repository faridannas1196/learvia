import { Head, Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import {
  Users, GraduationCap, FileText, PenLine, CalendarCheck, ClipboardCheck, FilePlus2, BookOpen,
  Megaphone, CalendarX, Radio,
} from 'lucide-react';
import GuruLayout from '../../Layouts/GuruLayout';
import Card from '../../Components/ui/Card';
import Button from '../../Components/ui/Button';
import StatCard from '../../Components/ui/StatCard';
import StatusBadge from '../../Components/ui/StatusBadge';
import EmptyState from '../../Components/ui/EmptyState';
import SectionTitle from '../../Components/ui/SectionTitle';
import MiniCalendar from '../../Components/ui/MiniCalendar';
import DonutChart from '../../Components/ui/DonutChart';
import HeroIllustration from '../../Components/ui/HeroIllustration';
import { formatWaktu } from '../../lib/format';

const ATTENDANCE_COLOR = { Hadir: '#16A34A', Sakit: '#0284C7', Izin: '#7C3AED', Alpa: '#E11D48' };

const QUICK = [
  { label: 'Mulai Absensi', href: '/guru/absensi/mulai', icon: ClipboardCheck, tone: 'bg-[#EDF5FA] text-[#233371] border border-[#D3E5F0]' },
  { label: 'Buat Ujian', href: '/guru/ujian/buat', icon: FilePlus2, tone: 'bg-emerald-50 text-emerald-600 border border-emerald-100/70' },
  { label: 'Bank Soal', href: '/guru/bank-soal', icon: BookOpen, tone: 'bg-purple-50 text-purple-600 border border-purple-100/70' },
  { label: 'Nilai Esai', href: '/guru/hasil', icon: PenLine, tone: 'bg-amber-50 text-amber-600 border border-amber-100/70' },
  { label: 'Rekap Absensi', href: '/guru/absensi/rekap', icon: CalendarCheck, tone: 'bg-rose-50 text-rose-600 border border-rose-100/70' },
  { label: 'Kelas Saya', href: '/guru/kelas', icon: Users, tone: 'bg-[#E6F6F8] text-[#207C91] border border-[#C8EEF3]' },
];

function salam() {
  const jam = new Date().getHours();
  if (jam < 11) return 'Selamat pagi';
  if (jam < 15) return 'Selamat siang';
  if (jam < 19) return 'Selamat sore';
  return 'Selamat malam';
}

const seeAll = 'text-xs font-semibold text-[#233371] hover:text-[#307997] hover:underline transition-colors';

export default function Dashboard({ guru, stats, jadwalUjian = [], pengumuman = [], kalender = [], kehadiran = [] }) {
  return (
    <div className="space-y-6">
      <Head title="Beranda" />

      {/* Banner Sapaan Bertema Learvia */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#EDF5FA] via-[#E8F1F8] to-[#E1EEF6] p-6 md:p-8 border border-[#D0E2EE] shadow-sm"
      >
        <div className="relative z-10 max-w-xl">
          <p className="text-sm font-semibold text-[#307997] mb-1 flex items-center gap-1.5">
            {salam()}, 👋
          </p>
          <SectionTitle as="h1" className="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {guru.nama}!
          </SectionTitle>
          <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed">
            Ada <span className="font-semibold text-[#233371]">{stats.ujianAktif} ujian aktif</span> dan{' '}
            <span className="font-semibold text-[#233371]">{stats.perluDinilai} jawaban esai</span> yang menunggu dinilai.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="/guru/absensi/mulai" icon={ClipboardCheck} size="md">Mulai Absensi</Button>
            <Button href="/guru/ujian/buat" icon={FilePlus2} size="md" variant="secondary">Buat Ujian</Button>
          </div>
        </div>
        <HeroIllustration className="pointer-events-none absolute bottom-0 right-4 hidden h-44 w-auto md:block lg:right-10 lg:h-52" />
      </motion.section>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Kelas diajar" value={stats.kelas} icon={Users} tone="blue" caption="Semester ini" delay={0} />
        <StatCard label="Total siswa" value={stats.siswa} icon={GraduationCap} tone="green" caption="Semua kelas" delay={0.05} />
        <StatCard label="Ujian aktif" value={stats.ujianAktif} icon={FileText} tone="purple" caption="Sedang berlangsung" delay={0.1} />
        <StatCard label="Perlu dinilai" value={stats.perluDinilai} icon={PenLine} tone="orange" caption="Jawaban esai" delay={0.15} />
        <StatCard label="Kehadiran" value={stats.kehadiran} suffix="%" icon={CalendarCheck} tone="pink" caption="Minggu ini" delay={0.2} className="col-span-2 md:col-span-1" />
      </div>

      {/* Baris Kedua: Jadwal Ujian & Papan Pengumuman */}
      <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <Card aria-labelledby="h-jadwal">
          <div className="mb-4 flex items-center justify-between">
            <SectionTitle id="h-jadwal" className="font-display text-lg font-bold text-slate-800">Jadwal ujian</SectionTitle>
            <Link href="/guru/ujian" className={seeAll}>Lihat semua</Link>
          </div>
          {jadwalUjian.length === 0 ? (
            <EmptyState icon={CalendarX} title="Belum ada ujian terjadwal" action={<Button href="/guru/ujian/buat">Buat Ujian</Button>}>
              Buat kuis, UTS, atau UAS dari soal di bank soal Anda.
            </EmptyState>
          ) : (
            <div className="-mx-2 overflow-x-auto px-2">
              <table className="w-full min-w-[560px] text-left text-sm">
                <caption className="sr-only">Jadwal ujian</caption>
                <thead className="bg-[#F6FAFD] text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="rounded-l-xl px-4 py-3">Ujian</th>
                    <th scope="col" className="px-4 py-3">Kelas</th>
                    <th scope="col" className="px-4 py-3">Jenis</th>
                    <th scope="col" className="px-4 py-3">Mulai</th>
                    <th scope="col" className="px-4 py-3">Status</th>
                    <th scope="col" className="rounded-r-xl px-4 py-3"><span className="sr-only">Aksi</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {jadwalUjian.map((u) => (
                    <tr key={u.id} className="h-14 transition-colors hover:bg-slate-50/70">
                      <td className="px-4 font-semibold text-slate-900">{u.judul}</td>
                      <td className="px-4 text-slate-600">{u.kelas}</td>
                      <td className="px-4 text-slate-600">{u.jenis}</td>
                      <td className="px-4 text-slate-600">{formatWaktu(u.mulai)}</td>
                      <td className="px-4"><StatusBadge kind="ujian" value={u.status} /></td>
                      <td className="px-4 text-right">
                        {u.status === 'ongoing' && (
                          <Button href={`/guru/ujian/${u.id}`} size="sm" icon={Radio}>Pantau</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Papan Pengumuman */}
        <Card aria-labelledby="h-info">
          <div className="mb-4 flex items-center justify-between">
            <SectionTitle id="h-info" className="font-display text-lg font-bold text-slate-800">Papan pengumuman</SectionTitle>
            <Link href="/guru/pengumuman" className={seeAll}>Lihat semua</Link>
          </div>
          <ul className="space-y-3.5">
            {pengumuman.map((p, i) => (
              <motion.li
                key={p.id}
                initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -30px 0px' }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ x: 3, transition: { duration: 0.15 } }}
                className="flex gap-3.5 rounded-xl p-2.5 transition-colors hover:bg-[#EEF5F9]/60"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#EDF5FA] border border-[#D3E5F0] text-[#233371] shadow-2xs">
                  <Megaphone className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900 leading-tight">{p.judul}</p>
                  <p className="line-clamp-2 text-xs text-slate-500 mt-1 leading-relaxed">{p.isi}</p>
                  <p className="mt-1.5 text-[11px] font-semibold text-[#307997]">{p.tanggal}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Baris Ketiga: Kalender + Akses Cepat + Kehadiran */}
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-[1fr_1fr_1.2fr]">
        <Card aria-labelledby="h-kal">
          <SectionTitle id="h-kal" className="mb-4 font-display text-lg font-bold text-slate-800">Kalender pendidikan</SectionTitle>
          <MiniCalendar events={kalender} />
        </Card>

        <Card aria-labelledby="h-cepat">
          <SectionTitle id="h-cepat" className="mb-4 font-display text-lg font-bold text-slate-800">Akses cepat</SectionTitle>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {QUICK.map((q, i) => (
              <motion.li
                key={q.href}
                initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ y: -3, transition: { duration: 0.15 } }} whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={q.href}
                  className="flex h-full flex-col items-center gap-2.5 rounded-2xl p-3.5 text-center bg-white border border-slate-100 shadow-2xs hover:shadow-md hover:border-[#C3DDEB] transition-all"
                >
                  <span className={`grid size-11 place-items-center rounded-2xl shadow-2xs ${q.tone}`}>
                    <q.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold text-slate-800">{q.label}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </Card>

        <Card aria-labelledby="h-hadir" className="lg:col-span-2 xl:col-span-1">
          <div className="mb-4 flex items-center justify-between">
            <SectionTitle id="h-hadir" className="font-display text-lg font-bold text-slate-800">Ringkasan kehadiran</SectionTitle>
            <Link href="/guru/absensi/rekap" className={seeAll}>Lihat rekap</Link>
          </div>
          <DonutChart
            segments={kehadiran.map((k) => ({ ...k, color: ATTENDANCE_COLOR[k.label] ?? '#0284C7' }))}
            centerValue={`${stats.kehadiran}%`}
            centerLabel="Hadir"
            summary={`Kehadiran minggu ini: ${kehadiran.map((k) => `${k.label} ${k.value} persen`).join(', ')}`}
          />
        </Card>
      </div>
    </div>
  );
}

Dashboard.layout = (page) => <GuruLayout>{page}</GuruLayout>;
