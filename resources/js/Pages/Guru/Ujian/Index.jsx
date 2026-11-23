import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus, FileText } from 'lucide-react';
import GuruLayout from '../../../Layouts/GuruLayout';
import Card from '../../../Components/ui/Card';
import Button from '../../../Components/ui/Button';
import StatusBadge from '../../../Components/ui/StatusBadge';
import EmptyState from '../../../Components/ui/EmptyState';
import PageHeader from '../../../Components/ui/PageHeader';
import { cx } from '../../../lib/cx';
import { formatWaktu } from '../../../lib/format';

const TABS = [
  ['semua', 'Semua'], ['draft', 'Draft'], ['published', 'Terbit'], ['ongoing', 'Berlangsung'], ['completed', 'Selesai'],
];

export default function Index({ ujian }) {
  const [tab, setTab] = useState('semua');
  const list = tab === 'semua' ? ujian : ujian.filter((u) => u.status === tab);
  const count = (key) => (key === 'semua' ? ujian.length : ujian.filter((u) => u.status === key).length);

  return (
    <>
      <Head title="Ujian" />
      <PageHeader
        title="Ujian"
        subtitle="Kuis, UTS, dan UAS untuk kelas yang Anda ajar."
        action={<Button href="/guru/ujian/buat" icon={Plus} size="lg">Buat Ujian</Button>}
      />

      <Card className="!p-0">
        <div role="tablist" aria-label="Filter status ujian" className="flex gap-1 overflow-x-auto border-b border-line p-2">
          {TABS.map(([key, label]) => (
            <button
              key={key} role="tab" aria-selected={tab === key} onClick={() => setTab(key)}
              className={cx(
                'h-10 shrink-0 rounded-md px-3 text-body font-medium transition-colors',
                tab === key ? 'bg-primary-50 text-primary-700' : 'text-ink-700 hover:bg-surface-subtle',
              )}
            >
              {label} <span className="text-ink-500">{count(key)}</span>
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <EmptyState icon={FileText} title={tab === 'semua' ? 'Belum ada ujian' : 'Tidak ada ujian dengan status ini'}
            action={tab === 'semua' && <Button href="/guru/ujian/buat">Buat Ujian</Button>}>
            {tab === 'semua' ? 'Buat ujian pertama dari soal di bank soal.' : 'Coba pilih filter lain.'}
          </EmptyState>
        ) : (
          <>
            {/* Tablet/desktop: tabel */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-body">
                <caption className="sr-only">Daftar ujian</caption>
                <thead className="bg-surface-subtle text-label text-ink-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">Judul</th>
                    <th scope="col" className="px-4 py-3">Jenis</th>
                    <th scope="col" className="px-4 py-3">Kelas</th>
                    <th scope="col" className="px-4 py-3">Mulai</th>
                    <th scope="col" className="px-4 py-3">Status</th>
                    <th scope="col" className="px-6 py-3"><span className="sr-only">Aksi</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {list.map((u) => (
                    <tr key={u.id} className="h-14 hover:bg-surface-subtle">
                      <td className="px-6 font-medium text-ink-900">{u.judul}</td>
                      <td className="px-4 text-ink-700">{u.jenis}</td>
                      <td className="px-4 text-ink-700">{u.kelas}</td>
                      <td className="px-4 text-ink-700">{formatWaktu(u.mulai)}</td>
                      <td className="px-4"><StatusBadge kind="ujian" value={u.status} /></td>
                      <td className="px-6 text-right">
                        <Button href={`/guru/ujian/${u.id}`} variant="ghost" size="sm" aria-label={`Buka ${u.judul}`}>Buka</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: daftar kartu */}
            <ul className="divide-y divide-line md:hidden">
              {list.map((u) => (
                <li key={u.id} className="space-y-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-ink-900">{u.judul}</p>
                    <StatusBadge kind="ujian" value={u.status} />
                  </div>
                  <p className="text-body text-ink-700">{u.jenis} · {u.kelas}</p>
                  <p className="text-caption text-ink-500">{formatWaktu(u.mulai)}</p>
                  <Button href={`/guru/ujian/${u.id}`} variant="secondary" size="sm">Buka</Button>
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>
    </>
  );
}

Index.layout = (page) => <GuruLayout>{page}</GuruLayout>;
