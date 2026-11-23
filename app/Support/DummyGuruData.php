<?php

namespace App\Support;

/**
 * Data dummy supaya UI bisa dilihat sebelum model Eloquent siap.
 * TODO: hapus file ini dan ganti dengan query berdasarkan class_subjects.teacher_id.
 */
class DummyGuruData
{
    public static function penugasan(): array
    {
        return [
            ['id' => 1, 'kelas' => 'X-A', 'mapel' => 'Informatika'],
            ['id' => 2, 'kelas' => 'X-B', 'mapel' => 'Informatika'],
            ['id' => 3, 'kelas' => 'XI-A', 'mapel' => 'Informatika'],
        ];
    }

    public static function siswa(): array
    {
        $nama = ['Adinda Putri', 'Bagas Pratama', 'Citra Lestari', 'Dimas Saputra', 'Eka Wulandari', 'Fajar Nugroho',
            'Gita Maharani', 'Hafidz Ramadhan', 'Intan Permata', 'Joko Santoso', 'Kirana Dewi', 'Lutfi Hakim'];

        return collect($nama)->map(fn ($n, $i) => [
            'id' => $i + 1,
            'nama' => $n,
            'nis' => (string) (2410001 + $i),
            'status' => null,
        ])->all();
    }

    public static function ujian(): array
    {
        $t = fn (int $hari, int $jam) => now('Asia/Jakarta')->addDays($hari)->setTime($jam, 0)->toIso8601String();

        return [
            ['id' => 1, 'judul' => 'Kuis Algoritma Dasar', 'jenis' => 'Kuis', 'kelas' => 'X-A', 'mulai' => $t(0, 9), 'status' => 'ongoing'],
            ['id' => 2, 'judul' => 'UTS Informatika', 'jenis' => 'UTS', 'kelas' => 'X-B', 'mulai' => $t(3, 8), 'status' => 'published'],
            ['id' => 3, 'judul' => 'Kuis Jaringan Komputer', 'jenis' => 'Kuis', 'kelas' => 'XI-A', 'mulai' => $t(7, 10), 'status' => 'draft'],
            ['id' => 4, 'judul' => 'Kuis Berpikir Komputasional', 'jenis' => 'Kuis', 'kelas' => 'X-A', 'mulai' => $t(-5, 9), 'status' => 'completed'],
        ];
    }
}
