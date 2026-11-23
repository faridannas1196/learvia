import { Head } from '@inertiajs/react';
import { Hammer } from 'lucide-react';
import GuruLayout from '../../Layouts/GuruLayout';
import Card from '../../Components/ui/Card';
import Button from '../../Components/ui/Button';
import EmptyState from '../../Components/ui/EmptyState';
import PageHeader from '../../Components/ui/PageHeader';

export default function Segera({ judul }) {
  return (
    <>
      <Head title={judul} />
      <PageHeader title={judul} />
      <Card>
        <EmptyState icon={Hammer} title="Halaman ini belum dibangun" action={<Button href="/guru" variant="secondary">Kembali ke beranda</Button>}>
          Halaman ini masuk tahap berikutnya.
        </EmptyState>
      </Card>
    </>
  );
}

Segera.layout = (page) => <GuruLayout>{page}</GuruLayout>;
