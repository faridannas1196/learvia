import { Head, useForm } from '@inertiajs/react';
import { ClipboardCheck, School } from 'lucide-react';
import GuruLayout from '../../../Layouts/GuruLayout';
import Card from '../../../Components/ui/Card';
import Button from '../../../Components/ui/Button';
import EmptyState from '../../../Components/ui/EmptyState';
import PageHeader from '../../../Components/ui/PageHeader';

const field = 'mt-1.5 h-11 w-full rounded-md border-0 bg-surface px-3 text-body-l ring-1 ring-line-strong focus:ring-2 focus:ring-primary-600';

export default function Setup({ penugasan, terpilih, urls }) {
  const { data, setData, post, processing, errors } = useForm({
    penugasan_id: terpilih ? String(terpilih) : '',
    tanggal: new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' }),
    sesi: '1',
  });

  const submit = (e) => {
    e.preventDefault();
    post(urls.store);
  };

  return (
    <>
      <Head title="Mulai absensi" />
      <PageHeader title="Mulai sesi absensi" subtitle="Pilih kelas dan mata pelajaran, lalu nyalakan kamera." />

      {penugasan.length === 0 ? (
        <Card>
          <EmptyState icon={School} title="Belum ada kelas yang ditugaskan">
            Admin sekolah perlu menghubungkan Anda dengan kelas dan mata pelajaran terlebih dahulu.
          </EmptyState>
        </Card>
      ) : (
        <Card className="max-w-xl">
          <form onSubmit={submit} noValidate className="space-y-5">
            {Object.keys(errors).length > 0 && (
              <div role="alert" className="rounded-md bg-danger-bg px-4 py-3 text-body text-danger-fg">
                Periksa kembali isian yang ditandai.
              </div>
            )}

            <div>
              <label htmlFor="penugasan" className="text-label text-ink-900">Kelas dan mata pelajaran</label>
              <select
                id="penugasan" className={field} value={data.penugasan_id} required
                aria-invalid={!!errors.penugasan_id} aria-describedby={errors.penugasan_id ? 'err-penugasan' : undefined}
                onChange={(e) => setData('penugasan_id', e.target.value)}
              >
                <option value="">Pilih kelas…</option>
                {penugasan.map((p) => <option key={p.id} value={p.id}>{p.kelas} · {p.mapel}</option>)}
              </select>
              {errors.penugasan_id && <p id="err-penugasan" className="mt-1 text-body text-danger-fg">{errors.penugasan_id}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="tanggal" className="text-label text-ink-900">Tanggal</label>
                <input id="tanggal" type="date" className={field} value={data.tanggal} onChange={(e) => setData('tanggal', e.target.value)} />
                {errors.tanggal && <p className="mt-1 text-body text-danger-fg">{errors.tanggal}</p>}
              </div>
              <div>
                <label htmlFor="sesi" className="text-label text-ink-900">Sesi</label>
                <select id="sesi" className={field} value={data.sesi} onChange={(e) => setData('sesi', e.target.value)}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>Jam ke-{n}</option>)}
                </select>
              </div>
            </div>

            <p className="text-body text-ink-700">
              Browser akan meminta izin kamera. Deteksi hanya menandai wajah di depan kamera. Anda yang mencocokkan nama dan mengonfirmasi kehadiran.
            </p>

            <Button type="submit" size="lg" icon={ClipboardCheck} loading={processing} disabled={!data.penugasan_id}>
              Mulai Sesi
            </Button>
          </form>
        </Card>
      )}
    </>
  );
}

Setup.layout = (page) => <GuruLayout>{page}</GuruLayout>;
