import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Camera, CameraOff, Search, WifiOff, ScanFace, RotateCw, Loader2, AlertTriangle } from 'lucide-react';
import GuruLayout from '../../../Layouts/GuruLayout';
import Card from '../../../Components/ui/Card';
import Button from '../../../Components/ui/Button';
import StatusBadge from '../../../Components/ui/StatusBadge';
import DeviceChip from '../../../Components/ui/DeviceChip';
import ConfirmDialog from '../../../Components/ui/ConfirmDialog';
import PageHeader from '../../../Components/ui/PageHeader';
import useCamera from '../../../hooks/useCamera';
import useYoloDetection from '../../../hooks/useYoloDetection';
import useOnline from '../../../hooks/useOnline';
import { cx } from '../../../lib/cx';
import { formatTanggal } from '../../../lib/format';

const CONFIDENCE_MIN = 0.6; // TODO: tetapkan bersama hasil uji precision/recall (SM-03)
const CAM_CHIP = { aktif: 'aktif', meminta: 'memeriksa', ditolak: 'masalah', tidak_tersedia: 'masalah' };
const SVC_CHIP = { aktif: 'aktif', gagal: 'masalah', unknown: 'unknown' };

function CameraPanel({ videoRef, camState, retry, detections, service }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-ink-900 shadow-e2">
      <video
        ref={videoRef} autoPlay playsInline muted
        aria-label={camState === 'aktif' ? `Kamera aktif, ${detections.length} wajah terdeteksi` : 'Kamera belum aktif'}
        className={cx('size-full object-cover', camState !== 'aktif' && 'invisible')}
      />

      {/* Kotak deteksi: hanya menandai wajah, tanpa nama. Info yang sama ada di daftar siswa. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {detections.map((d) => {
          const cek = d.confidence < CONFIDENCE_MIN;
          return (
            <div
              key={d.id}
              className={cx('absolute rounded-md border-2', cek ? 'border-dashed border-amber-300' : 'border-primary-400')}
              style={{ left: `${d.box.x * 100}%`, top: `${d.box.y * 100}%`, width: `${d.box.w * 100}%`, height: `${d.box.h * 100}%` }}
            >
              <span className="absolute -top-6 left-0 rounded-sm bg-surface px-1.5 py-0.5 text-caption text-ink-900">
                {cek ? 'Perlu dicek' : 'Wajah terdeteksi'}
              </span>
            </div>
          );
        })}
      </div>

      <div className="absolute left-3 top-3 flex flex-wrap gap-2">
        <DeviceChip label="Kamera" state={CAM_CHIP[camState]} icon={Camera} />
        <DeviceChip label="Deteksi" state={SVC_CHIP[service]} icon={ScanFace} />
      </div>

      {camState !== 'aktif' && (
        <div className="absolute inset-0 grid place-items-center p-6 text-center text-white">
          {camState === 'meminta' ? (
            <div role="status" className="flex flex-col items-center gap-3">
              <Loader2 className="size-8 animate-spin" aria-hidden="true" />
              <p className="text-body-l">Menunggu izin kamera dari browser…</p>
            </div>
          ) : (
            <div role="alert" className="flex max-w-md flex-col items-center gap-3">
              <CameraOff className="size-8" aria-hidden="true" />
              <p className="font-display text-h3">{camState === 'ditolak' ? 'Izin kamera ditolak' : 'Kamera tidak tersedia'}</p>
              <p className="text-body text-white/80">
                {camState === 'ditolak'
                  ? 'Klik ikon kunci di address bar, izinkan Kamera, lalu coba lagi. Anda juga bisa lanjut mengabsen manual dari daftar siswa.'
                  : 'Kamera mungkin sedang dipakai aplikasi lain atau tidak terpasang. Anda tetap bisa mengabsen manual dari daftar siswa.'}
              </p>
              <Button variant="secondary" icon={RotateCw} onClick={retry}>Coba lagi</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RosterRow({ siswa, row, selected, onSelect }) {
  return (
    <li>
      <button
        onClick={() => onSelect(siswa.id)}
        aria-pressed={selected}
        className={cx(
          'flex min-h-14 w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left transition-colors',
          selected ? 'bg-primary-50 ring-2 ring-primary-600' : 'hover:bg-surface-subtle',
        )}
      >
        <span className="min-w-0">
          <span className="block truncate text-body-l font-medium text-ink-900">{siswa.nama}</span>
          <span className="text-caption text-ink-500">NIS {siswa.nis}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          {row.sync === 'pending' && (
            <span role="status" className="inline-flex items-center gap-1 text-caption text-ink-700">
              <Loader2 className="size-3.5 animate-spin" aria-hidden="true" /> Menyimpan…
            </span>
          )}
          {row.sync === 'error' && (
            <span className="inline-flex items-center gap-1 text-caption text-danger-fg">
              <AlertTriangle className="size-3.5" aria-hidden="true" /> Belum tersimpan
            </span>
          )}
          {row.status && <StatusBadge kind="kehadiran" value={row.status} />}
        </span>
      </button>
    </li>
  );
}

export default function Sesi({ sesi, siswa, urls }) {
  const online = useOnline();
  const { videoRef, state: camState, retry } = useCamera();
  const { detections, service } = useYoloDetection(videoRef, camState === 'aktif');

  const [rows, setRows] = useState(() =>
    Object.fromEntries(siswa.map((s) => [s.id, { status: s.status ?? null, sync: s.status ? 'saved' : 'idle' }])),
  );
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');
  const [confirmClose, setConfirmClose] = useState(false);
  const [closing, setClosing] = useState(false);
  const searchRef = useRef(null);

  const mark = (id, patch) => setRows((r) => ({ ...r, [id]: { ...r[id], ...patch } }));

  // "Tersimpan" hanya setelah server mengonfirmasi (Design Brief prinsip 2).
  const record = useCallback((id, status) => {
    mark(id, { status, sync: 'pending' });
    if (!navigator.onLine) return mark(id, { sync: 'error' });

    let ok = false;
    router.post(urls.konfirmasi, { student_id: id, status }, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => { ok = true; mark(id, { sync: 'saved' }); },
      onError: () => mark(id, { sync: 'error' }),
      onFinish: () => { if (!ok) mark(id, { sync: 'error' }); },
    });

    const next = siswa.find((s) => s.id !== id && !rows[s.id]?.status);
    setSelectedId(next ? next.id : null);
  }, [urls.konfirmasi, siswa, rows]);

  useEffect(() => {
    const onKey = (e) => {
      if (document.querySelector('dialog[open]') || e.metaKey || e.ctrlKey || e.altKey) return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.key === '/') { e.preventDefault(); searchRef.current?.focus(); return; }
      const status = { h: 'hadir', s: 'sakit', i: 'izin', a: 'alpa' }[e.key.toLowerCase()];
      if (status && selectedId) { e.preventDefault(); record(selectedId, status); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, record]);

  const counts = useMemo(() => {
    const c = { hadir: 0, sakit: 0, izin: 0, alpa: 0, belum: 0 };
    siswa.forEach((s) => { c[rows[s.id]?.status ?? 'belum'] += 1; });
    return c;
  }, [siswa, rows]);

  const unsynced = Object.values(rows).filter((r) => r.sync === 'pending' || r.sync === 'error').length;
  const q = query.trim().toLowerCase();
  const filtered = siswa.filter((s) => !q || s.nama.toLowerCase().includes(q) || s.nis.includes(q));
  const belum = filtered.filter((s) => !rows[s.id]?.status);
  const sudah = filtered.filter((s) => rows[s.id]?.status);
  const selected = siswa.find((s) => s.id === selectedId);

  const closeSession = () => {
    setClosing(true);
    router.post(urls.tutup, {}, { onFinish: () => { setClosing(false); setConfirmClose(false); } });
  };

  return (
    <>
      <Head title="Sesi absensi" />
      <PageHeader
        title={`${sesi.kelas} · ${sesi.mapel}`}
        subtitle={`${formatTanggal(sesi.tanggal)} · Jam ke-${sesi.jam}`}
      />

      {!online && (
        <div role="alert" className="mb-4 flex items-start gap-3 rounded-md bg-warning-bg px-4 py-3 text-body text-warning-fg">
          <WifiOff className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p>Tidak ada koneksi internet. Catatan baru belum tersimpan di server sampai koneksi kembali. Coba konfirmasi ulang setelah online.</p>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-4">
          <CameraPanel videoRef={videoRef} camState={camState} retry={retry} detections={detections} service={service} />

          <Card aria-labelledby="h-aksi">
            <h2 id="h-aksi" className="sr-only">Konfirmasi kehadiran</h2>
            <div aria-live="polite" className="min-h-6">
              {selected ? (
                <p className="font-display text-h2 text-ink-900">{selected.nama}</p>
              ) : (
                <p className="text-body text-ink-700">
                  Pilih siswa di daftar. Kotak deteksi hanya menandai wajah di depan kamera, bukan identitas.
                </p>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="lg" disabled={!selected} onClick={() => record(selected.id, 'hadir')} className="grow sm:grow-0">
                Konfirmasi Hadir <kbd className="rounded bg-white/20 px-1.5 text-caption">H</kbd>
              </Button>
              {[['sakit', 'Sakit', 'S'], ['izin', 'Izin', 'I'], ['alpa', 'Alpa', 'A']].map(([v, l, k]) => (
                <Button key={v} size="lg" variant="secondary" disabled={!selected} onClick={() => record(selected.id, v)}>
                  {l} <kbd className="rounded bg-neutral-bg px-1.5 text-caption">{k}</kbd>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        <Card aria-labelledby="h-daftar" className="flex max-h-[calc(100vh-14rem)] min-h-[24rem] flex-col !p-3">
          <h2 id="h-daftar" className="px-2 pb-2 font-display text-h2">Daftar siswa</h2>
          <div className="relative mb-2 px-1">
            <label htmlFor="cari-siswa" className="sr-only">Cari nama atau NIS (tekan / untuk fokus)</label>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-500" aria-hidden="true" />
            <input
              id="cari-siswa" ref={searchRef} type="search" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama atau NIS ( / )"
              className="h-11 w-full rounded-md border-0 bg-surface-subtle pl-9 pr-3 text-body ring-1 ring-line-strong focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div data-lenis-prevent className="flex-1 overflow-y-auto px-1">
            <h3 className="px-2 py-2 text-label text-ink-700">Belum dicatat ({belum.length})</h3>
            {belum.length === 0 ? (
              <p className="px-2 pb-2 text-body text-ink-500">{q ? 'Tidak ada hasil.' : 'Semua siswa sudah dicatat.'}</p>
            ) : (
              <ul>{belum.map((s) => <RosterRow key={s.id} siswa={s} row={rows[s.id]} selected={s.id === selectedId} onSelect={setSelectedId} />)}</ul>
            )}
            <h3 className="px-2 pb-2 pt-4 text-label text-ink-700">Sudah dicatat ({sudah.length})</h3>
            <ul>{sudah.map((s) => <RosterRow key={s.id} siswa={s} row={rows[s.id]} selected={s.id === selectedId} onSelect={setSelectedId} />)}</ul>
          </div>
        </Card>
      </div>

      <div className="sticky bottom-4 z-20 mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-surface px-4 py-3 shadow-e3 ring-1 ring-line">
        <p className="text-body text-ink-700" aria-live="polite">
          <b className="text-ink-900">{counts.hadir}</b> hadir · <b className="text-ink-900">{counts.sakit}</b> sakit ·{' '}
          <b className="text-ink-900">{counts.izin}</b> izin · <b className="text-ink-900">{counts.alpa}</b> alpa ·{' '}
          <b className="text-ink-900">{counts.belum}</b> belum
        </p>
        <div className="flex items-center gap-3">
          {unsynced > 0 && <span className="text-caption text-warning-fg">{unsynced} catatan belum tersimpan di server</span>}
          <Button onClick={() => setConfirmClose(true)} disabled={unsynced > 0}>Tutup Sesi</Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmClose} title="Tutup sesi absensi?" confirmLabel="Tutup Sesi" loading={closing}
        onConfirm={closeSession} onCancel={() => setConfirmClose(false)}
      >
        {counts.belum > 0
          ? `Masih ada ${counts.belum} siswa yang belum dicatat. Sesi akan disimpan apa adanya sebagai riwayat.`
          : 'Semua siswa sudah dicatat. Sesi akan disimpan sebagai riwayat.'}
      </ConfirmDialog>
    </>
  );
}

Sesi.layout = (page) => <GuruLayout>{page}</GuruLayout>;
