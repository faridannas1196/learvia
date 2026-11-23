import { Fragment, useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, ChevronDown, ChevronLeft, ClipboardCheck, Search, SlidersHorizontal, UserX } from 'lucide-react';
import GuruLayout from '../../../Layouts/GuruLayout';
import Card from '../../../Components/ui/Card';
import Button from '../../../Components/ui/Button';
import Avatar from '../../../Components/ui/Avatar';
import MiniRing from '../../../Components/ui/MiniRing';
import Segmented from '../../../Components/ui/Segmented';
import Pagination from '../../../Components/ui/Pagination';
import StatusBadge from '../../../Components/ui/StatusBadge';
import EmptyState from '../../../Components/ui/EmptyState';
import PageHeader from '../../../Components/ui/PageHeader';
import { cx } from '../../../lib/cx';

const PAGE_SIZE = 10;
const TABS = [['kehadiran', 'Kehadiran per bulan'], ['data', 'Data siswa']];
const FILTERS = [['semua', 'Semua siswa'], ['rendah', 'Perlu perhatian (di bawah 75%)'], ['baik', 'Sangat baik (90% ke atas)']];
const angka = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 });
const JK = { L: 'Laki-laki', P: 'Perempuan' };

const hitungPersen = (hadir, sesi) => (sesi > 0 ? Math.round((hadir / sesi) * 100) : null);

function PersenChip({ value }) {
  if (value === null) return <span className="text-ink-500">—</span>;
  const rendah = value < 75;
  const cls = value >= 90 ? 'bg-success-bg text-success-fg' : rendah ? 'bg-warning-bg text-warning-fg' : 'bg-info-bg text-info-fg';
  return (
    <span className={cx('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-label', cls)}>
      {rendah && <AlertTriangle className="size-3.5" aria-hidden="true" />}
      {value}%
      {rendah && <span className="sr-only"> perlu perhatian</span>}
    </span>
  );
}

function MatriksKehadiran({ view, bulan, mode, footer, jumlahSiswa, open, toggle, tahunAjaran }) {
  const ganjil = bulan.filter((b) => b.semester === 'ganjil');
  const genap = bulan.filter((b) => b.semester === 'genap');
  const th = 'border-b border-line px-2 py-2 text-center text-label text-ink-700';
  const nameCell = 'sticky left-0 z-10 border-b border-r border-line bg-inherit px-4 py-3 text-left';
  const awalSemester = (i) => i === 0 || i === ganjil.length;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1080px] border-separate border-spacing-0 text-body">
        <caption className="sr-only">Jumlah kehadiran siswa per bulan, tahun ajaran {tahunAjaran}</caption>
        <thead>
          <tr className="bg-surface">
            <th scope="col" rowSpan={2} className={cx(nameCell, 'min-w-[260px] text-label text-ink-700')}>Siswa</th>
            <th scope="colgroup" colSpan={ganjil.length} className="border-b border-l border-line bg-tint-pink-bg px-2 py-1.5 text-center text-caption font-semibold text-tint-pink-fg">
              Semester ganjil (Jul–Des)
            </th>
            <th scope="colgroup" colSpan={genap.length} className="border-b border-l border-line bg-tint-blue-bg px-2 py-1.5 text-center text-caption font-semibold text-tint-blue-fg">
              Semester genap (Jan–Jun)
            </th>
            <th scope="col" rowSpan={2} className={cx(th, 'border-l')}>Total hadir</th>
            <th scope="col" rowSpan={2} className={th}>Persen</th>
          </tr>
          <tr className="bg-surface">
            {bulan.map((b, i) => (
              <th key={b.key} scope="col" className={cx(th, awalSemester(i) && 'border-l')}>
                {b.label}
                <span className="block text-caption font-normal text-ink-500">{b.sesi ? `${b.sesi} sesi` : '—'}</span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {view.map((s) => {
            const isOpen = open.has(s.id);
            return (
              <Fragment key={s.id}>
                <tr className="bg-surface transition-colors hover:bg-surface-subtle">
                  <th scope="row" className={cx(nameCell, 'font-normal')}>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggle(s.id)} aria-expanded={isOpen} aria-controls={`detail-${s.id}`} aria-label={`Rincian ${s.nama}`}
                        className="grid size-8 shrink-0 place-items-center rounded-md text-ink-500 hover:bg-primary-50"
                      >
                        <ChevronDown className={cx('size-4 transition-transform', isOpen && 'rotate-180')} aria-hidden="true" />
                      </button>
                      <Avatar name={s.nama} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-primary-700">{s.nama}</p>
                        <p className="text-caption text-ink-500">{s.nis}</p>
                      </div>
                    </div>
                  </th>

                  {bulan.map((b, i) => {
                    const v = s.hadir[b.key];
                    const kosong = v == null || !b.sesi;
                    const rendah = !kosong && v / b.sesi < 0.75;
                    return (
                      <td key={b.key} className={cx('border-b border-line px-1 py-2 text-center', awalSemester(i) && 'border-l')}>
                        {kosong ? (
                          <span className="text-ink-500"><span aria-hidden="true">—</span><span className="sr-only">belum ada data</span></span>
                        ) : (
                          <span className={cx('inline-block min-w-9 rounded-md px-1.5 py-1 font-medium', rendah ? 'bg-warning-bg text-warning-fg' : 'text-ink-900')}>
                            {mode === 'persen' ? `${Math.round((v / b.sesi) * 100)}%` : v}
                            {rendah && <span className="sr-only"> (di bawah 75%)</span>}
                          </span>
                        )}
                      </td>
                    );
                  })}

                  <td className="border-b border-l border-line px-2 text-center font-semibold text-ink-900">
                    {s.totalHadir}<span className="font-normal text-ink-500">/{s.totalSesi}</span>
                  </td>
                  <td className="border-b border-line px-2 text-center"><PersenChip value={s.persen} /></td>
                </tr>

                {isOpen && (
                  <tr id={`detail-${s.id}`}>
                    <td colSpan={bulan.length + 3} className="border-b border-line bg-surface-subtle px-4 py-3">
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body text-ink-700">
                        {['hadir', 'sakit', 'izin', 'alpa'].map((k) => (
                          <span key={k} className="inline-flex items-center gap-2">
                            <StatusBadge kind="kehadiran" value={k} />
                            <b className="text-ink-900">{s.rekap[k]}</b>
                          </span>
                        ))}
                        <span>{s.email}</span>
                        <span>{JK[s.jk]}</span>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>

        <tfoot>
          <tr className="bg-surface-subtle">
            <th scope="row" className={cx(nameCell, 'text-label text-ink-900')}>
              Rata-rata siswa hadir per sesi
              <span className="block text-caption font-normal text-ink-500">dari {jumlahSiswa} siswa</span>
            </th>
            {footer.map((f, i) => (
              <td key={i} className={cx('px-1 py-3 text-center font-semibold text-ink-900', awalSemester(i) && 'border-l border-line')}>
                {f ? angka.format(f.rata) : '—'}
              </td>
            ))}
            <td colSpan={2} className="border-l border-line" />
          </tr>
          <tr className="bg-surface-subtle">
            <th scope="row" className={cx(nameCell, 'border-b-0 text-label text-ink-900')}>Kehadiran kelas</th>
            {footer.map((f, i) => (
              <td key={i} className={cx('px-1 py-3 text-center font-semibold text-ink-900', awalSemester(i) && 'border-l border-line')}>
                {f ? `${f.persen}%` : '—'}
              </td>
            ))}
            <td colSpan={2} className="border-l border-line" />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function TabelDataSiswa({ view }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-body">
        <caption className="sr-only">Data lengkap siswa</caption>
        <thead className="bg-surface-subtle text-label text-ink-700">
          <tr>
            {['Siswa', 'NIS', 'Jenis kelamin', 'Email', 'Status akun', 'Kehadiran'].map((h) => (
              <th key={h} scope="col" className="px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {view.map((s) => (
            <tr key={s.id} className="h-16 transition-colors hover:bg-surface-subtle">
              <th scope="row" className="px-4 text-left font-normal">
                <div className="flex items-center gap-3">
                  <Avatar name={s.nama} size="sm" />
                  <span className="font-semibold text-primary-700">{s.nama}</span>
                </div>
              </th>
              <td className="px-4 text-ink-700">{s.nis}</td>
              <td className="px-4 text-ink-700">{JK[s.jk]}</td>
              <td className="px-4 text-ink-700">{s.email}</td>
              <td className="px-4">
                <span className={cx('inline-flex rounded-full px-2.5 py-1 text-label', s.status === 'aktif' ? 'bg-success-bg text-success-fg' : 'bg-neutral-bg text-neutral-fg')}>
                  {s.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                </span>
              </td>
              <td className="px-4"><PersenChip value={s.persen} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Show({ kelas, bulan, siswa }) {
  const [tab, setTab] = useState('kehadiran');
  const [mode, setMode] = useState('jumlah');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('semua');
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(() => new Set());

  const rows = useMemo(
    () => siswa.map((s) => {
      let hadir = 0;
      let sesi = 0;
      bulan.forEach((b) => {
        const v = s.hadir[b.key];
        if (v != null && b.sesi) { hadir += v; sesi += b.sesi; }
      });
      return { ...s, totalHadir: hadir, totalSesi: sesi, persen: hitungPersen(hadir, sesi) };
    }),
    [siswa, bulan],
  );

  const stat = useMemo(() => {
    const valid = rows.filter((r) => r.persen !== null);
    const n = valid.length || 1;
    return {
      rata: Math.round(valid.reduce((a, r) => a + r.persen, 0) / n),
      baik: Math.round((valid.filter((r) => r.persen >= 90).length / n) * 100),
      rendah: Math.round((valid.filter((r) => r.persen < 75).length / n) * 100),
    };
  }, [rows]);

  // Total siswa hadir tiap bulan: jumlah hadir seluruh siswa dibagi jumlah sesi bulan itu.
  const footer = useMemo(
    () => bulan.map((b) => {
      if (!b.sesi) return null;
      const total = rows.reduce((a, r) => a + (r.hadir[b.key] ?? 0), 0);
      return { rata: total / b.sesi, persen: Math.round((total / (b.sesi * rows.length)) * 100) };
    }),
    [bulan, rows],
  );

  const q = query.trim().toLowerCase();
  const filtered = rows.filter((r) => {
    const cocokCari = !q || r.nama.toLowerCase().includes(q) || r.nis.includes(q);
    const cocokFilter = filter === 'semua'
      || (filter === 'rendah' && r.persen !== null && r.persen < 75)
      || (filter === 'baik' && r.persen !== null && r.persen >= 90);
    return cocokCari && cocokFilter;
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const view = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const toggle = (id) => setOpen((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  return (
    <>
      <Head title={`${kelas.mapel} ${kelas.kode}`} />
      <Link href="/guru/kelas" className="mb-3 inline-flex items-center gap-1 text-label text-primary-600 hover:underline">
        <ChevronLeft className="size-4" aria-hidden="true" />
        Kelas Saya
      </Link>
      <PageHeader
        title={`${kelas.mapel} · ${kelas.kode}`}
        subtitle={`${kelas.jumlahSiswa} siswa · Tahun ajaran ${kelas.tahunAjaran}`}
        action={<Button href={`/guru/absensi/mulai?penugasan_id=${kelas.penugasanId}`} icon={ClipboardCheck}>Mulai Absensi</Button>}
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <MiniRing value={stat.rata} label="Rata-rata kehadiran" tone="text-primary-600" />
          <MiniRing value={stat.baik} label="Siswa dengan kehadiran 90% ke atas" tone="text-success-fg" />
          <MiniRing value={stat.rendah} label="Siswa perlu perhatian (di bawah 75%)" tone="text-warning-fg" />
        </div>

        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <div className="relative grow sm:w-64">
            <label htmlFor="cari-siswa" className="sr-only">Cari nama atau NIS</label>
            <input
              id="cari-siswa" type="search" value={query} placeholder="Cari nama atau NIS"
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              className="h-10 w-full rounded-full border-0 bg-surface pl-4 pr-10 text-body ring-1 ring-line placeholder:text-ink-500 focus:ring-2 focus:ring-primary-500"
            />
            <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-500" aria-hidden="true" />
          </div>
          <div className="relative">
            <label htmlFor="filter-hadir" className="sr-only">Filter kehadiran</label>
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-500" aria-hidden="true" />
            <select
              id="filter-hadir" value={filter}
              onChange={(e) => { setFilter(e.target.value); setPage(1); }}
              className="h-10 appearance-none rounded-full border-0 bg-surface pl-9 pr-4 text-body ring-1 ring-line focus:ring-2 focus:ring-primary-500"
            >
              {FILTERS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        </div>
      </div>

      <Card aria-label="Data siswa kelas" className="overflow-hidden !p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 pt-2 md:px-6">
          <div role="tablist" aria-label="Data kelas" className="flex gap-6">
            {TABS.map(([k, l]) => (
              <button
                key={k} role="tab" id={`tab-${k}`} aria-selected={tab === k} aria-controls={`panel-${k}`}
                onClick={() => setTab(k)}
                className={cx(
                  '-mb-px border-b-2 py-3 font-display text-body-l font-semibold transition-colors',
                  tab === k ? 'border-primary-600 text-ink-900' : 'border-transparent text-ink-500 hover:text-ink-900',
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 pb-2">
            {tab === 'kehadiran' && (
              <Segmented
                label="Tampilan angka" value={mode} onChange={setMode}
                options={[{ value: 'jumlah', label: 'Jumlah' }, { value: 'persen', label: 'Persen' }]}
              />
            )}
            <Pagination page={current} pageCount={pageCount} onChange={setPage} />
          </div>
        </div>

        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
          {filtered.length === 0 ? (
            <EmptyState icon={UserX} title="Tidak ada siswa yang cocok">Ubah kata kunci atau filter kehadiran.</EmptyState>
          ) : tab === 'kehadiran' ? (
            <MatriksKehadiran
              view={view} bulan={bulan} mode={mode} footer={footer} jumlahSiswa={rows.length}
              open={open} toggle={toggle} tahunAjaran={kelas.tahunAjaran}
            />
          ) : (
            <TabelDataSiswa view={view} />
          )}
        </div>

        {tab === 'kehadiran' && filtered.length > 0 && (
          <p className="border-t border-line px-4 py-3 text-caption text-ink-500 md:px-6">
            Sel berlatar kuning: kehadiran bulan itu di bawah 75%. Tanda — berarti bulan belum berjalan. Rincian sakit, izin, dan alpa ada di panah sebelah nama.
          </p>
        )}
      </Card>
    </>
  );
}

Show.layout = (page) => <GuruLayout>{page}</GuruLayout>;
