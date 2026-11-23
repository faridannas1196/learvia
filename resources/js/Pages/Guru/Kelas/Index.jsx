import { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { CalendarDays, CheckCircle2, Clock3, Radio, School, Search } from 'lucide-react';
import GuruLayout from '../../../Layouts/GuruLayout';
import Card from '../../../Components/ui/Card';
import Button from '../../../Components/ui/Button';
import Avatar from '../../../Components/ui/Avatar';
import EmptyState from '../../../Components/ui/EmptyState';
import PageHeader from '../../../Components/ui/PageHeader';
import { cx } from '../../../lib/cx';
import { formatTanggal } from '../../../lib/format';

function statusKelas(k) {
  if (k.ujianAktif) return { label: 'Ujian berlangsung', cls: 'bg-info-bg text-info-fg', Icon: Radio };
  if (k.absensiHariIni === 'selesai') return { label: 'Absensi selesai', cls: 'bg-success-bg text-success-fg', Icon: CheckCircle2 };
  return { label: 'Belum absen hari ini', cls: 'bg-warning-bg text-warning-fg', Icon: Clock3 };
}

export default function Index({ kelas, hariIni }) {
  const [tingkat, setTingkat] = useState('semua');
  const [query, setQuery] = useState('');

  const tabs = useMemo(() => ['semua', ...new Set(kelas.map((k) => k.tingkat))], [kelas]);
  const q = query.trim().toLowerCase();
  const list = kelas.filter(
    (k) => (tingkat === 'semua' || k.tingkat === tingkat) && (!q || `${k.mapel} ${k.kode}`.toLowerCase().includes(q)),
  );
  const tanggal = new Date(hariIni).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta',
  });

  return (
    <>
      <Head title="Kelas Saya" />
      <PageHeader
        title="Kelas Saya"
        subtitle="Pilih kelas untuk melihat data siswa dan kehadiran per bulan."
        action={<p className="text-body text-ink-700">{tanggal}</p>}
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Filter tingkat" className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t} role="tab" aria-selected={tingkat === t} onClick={() => setTingkat(t)}
              className={cx(
                'h-9 rounded-full px-4 text-label transition-colors',
                tingkat === t ? 'bg-primary-600 text-white shadow-e1' : 'bg-surface text-ink-700 ring-1 ring-line hover:bg-primary-50',
              )}
            >
              {t === 'semua' ? 'Semua' : `Kelas ${t}`}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <label htmlFor="cari-kelas" className="sr-only">Cari kelas atau mata pelajaran</label>
          <input
            id="cari-kelas" type="search" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kelas atau mapel"
            className="h-10 w-full rounded-full border-0 bg-surface pl-4 pr-10 text-body ring-1 ring-line placeholder:text-ink-500 focus:ring-2 focus:ring-primary-500"
          />
          <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-500" aria-hidden="true" />
        </div>
      </div>

      <p role="status" className="sr-only">{list.length} kelas ditampilkan</p>

      {list.length === 0 ? (
        <Card>
          <EmptyState icon={School} title={kelas.length === 0 ? 'Belum ada kelas yang ditugaskan' : 'Tidak ada kelas yang cocok'}>
            {kelas.length === 0 ? 'Admin sekolah perlu menghubungkan Anda dengan kelas dan mata pelajaran.' : 'Ubah kata kunci atau pilih tingkat lain.'}
          </EmptyState>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((k, i) => {
            const st = statusKelas(k);
            return (
              <Card key={k.id} as="article" lift delay={(i % 3) * 0.06} aria-labelledby={`kelas-${k.id}`} className="flex flex-col !p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar name={k.kode} square toneIndex={i} />
                    <div className="min-w-0">
                      <h2 id={`kelas-${k.id}`} className="truncate font-display text-h3 text-ink-900">{k.mapel} · {k.kode}</h2>
                      <p className="text-caption text-ink-500">Kelas {k.tingkat} · {k.jumlahSiswa} siswa</p>
                    </div>
                  </div>
                  <span className={cx('inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-caption font-semibold', st.cls)}>
                    <st.Icon className="size-3.5" aria-hidden="true" />
                    {st.label}
                  </span>
                </div>

                <hr className="my-4 border-line" />

                <div className="flex items-center justify-between text-caption text-ink-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    Jadwal berikutnya: {formatTanggal(k.jadwal.tanggal)}
                  </span>
                  <span>{k.jadwal.jam}</span>
                </div>

                <table className="mt-3 w-full text-left text-body">
                  <caption className="sr-only">Ringkasan kelas {k.kode}</caption>
                  <thead>
                    <tr className="text-caption text-ink-500">
                      <th scope="col" className="pb-2 font-medium">Indikator</th>
                      <th scope="col" className="pb-2 text-right font-medium">Nilai</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    <tr><td className="py-2 text-ink-700">Kehadiran bulan ini</td><td className="py-2 text-right font-semibold text-ink-900">{k.kehadiranBulanIni}%</td></tr>
                    <tr><td className="py-2 text-ink-700">Rata-rata nilai</td><td className="py-2 text-right font-semibold text-ink-900">{k.rataNilai}</td></tr>
                    <tr>
                      <td className="py-2 text-ink-700">Ujian berikutnya</td>
                      <td className="py-2 text-right font-semibold text-ink-900">
                        {k.ujianBerikutnya ? `${k.ujianBerikutnya.jenis} · ${formatTanggal(k.ujianBerikutnya.tanggal)}` : '—'}
                      </td>
                    </tr>
                    <tr><td className="py-2 text-ink-700">Perlu dinilai</td><td className="py-2 text-right font-semibold text-ink-900">{k.perluDinilai} esai</td></tr>
                  </tbody>
                </table>

                <div className="mt-1 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-body font-semibold text-ink-900">Total siswa</span>
                  <span className="font-display text-h2 text-ink-900">{k.jumlahSiswa}</span>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
                  <Button variant="secondary" href={`/guru/absensi/mulai?penugasan_id=${k.penugasanId}`}>Absensi</Button>
                  <Button href={`/guru/kelas/${k.id}`}>Lihat Siswa</Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

Index.layout = (page) => <GuruLayout>{page}</GuruLayout>;
