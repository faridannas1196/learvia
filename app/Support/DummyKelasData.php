<?php

namespace App\Support;

use Carbon\Carbon;

/**
 * Data dummy halaman Kelas Saya.
 * TODO: ganti dengan query Eloquent. Kehadiran per bulan = agregasi attendances
 * (group by student_id + bulan session_date) pada class_subject milik guru.
 */
class DummyKelasData
{
    private const SISWA = [
        'Adinda Putri|P', 'Bagas Pratama|L', 'Citra Lestari|P', 'Dimas Saputra|L', 'Eka Wulandari|P', 'Fajar Nugroho|L',
        'Gita Maharani|P', 'Hafidz Ramadhan|L', 'Intan Permata|P', 'Joko Santoso|L', 'Kirana Dewi|P', 'Lutfi Hakim|L',
        'Maya Anggraini|P', 'Naufal Firmansyah|L', 'Olivia Handayani|P', 'Putra Wijaya|L', 'Qonita Azzahra|P', 'Rizky Maulana|L',
        'Salsabila Nur|P', 'Teguh Prakoso|L', 'Ulfa Rahmawati|P', 'Vino Aditya|L', 'Wulan Sari|P', 'Yoga Permana|L',
        'Zahra Amelia|P', 'Arif Setiawan|L', 'Bunga Citra|P', 'Cahyo Nugraha|L', 'Dewi Anjani|P', 'Erlangga Putra|L',
        'Farah Nabila|P', 'Galih Kusuma|L', 'Hana Pertiwi|P', 'Ilham Ramadhan|L', 'Jihan Safitri|P', 'Kevin Alamsyah|L',
        'Laila Fitria|P', 'Mario Gunawan|L', 'Nadia Utami|P', 'Oka Wardana|L',
    ];

    // id sama dengan DummyGuruData::penugasan()
    private const KELAS = [
        1 => ['kode' => 'X-A', 'tingkat' => 'X', 'mapel' => 'Informatika', 'jumlah' => 12, 'offset' => 0],
        2 => ['kode' => 'X-B', 'tingkat' => 'X', 'mapel' => 'Informatika', 'jumlah' => 12, 'offset' => 12],
        3 => ['kode' => 'XI-A', 'tingkat' => 'XI', 'mapel' => 'Informatika', 'jumlah' => 14, 'offset' => 24],
    ];

    /** Bulan tahun ajaran berjalan (Jul-Jun). sesi = 0 untuk bulan yang belum berjalan. */
    public static function bulan(): array
    {
        $now = now('Asia/Jakarta');
        $dasar = [7 => 8, 8 => 8, 9 => 9, 10 => 9, 11 => 9, 12 => 6, 1 => 8, 2 => 8, 3 => 9, 4 => 8, 5 => 9, 6 => 6];
        $label = [7 => 'Jul', 8 => 'Agu', 9 => 'Sep', 10 => 'Okt', 11 => 'Nov', 12 => 'Des', 1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr', 5 => 'Mei', 6 => 'Jun'];
        $mulai = $now->month >= 7 ? $now->year : $now->year - 1;

        $out = [];
        foreach ([7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6] as $m) {
            $tahun = $m >= 7 ? $mulai : $mulai + 1;
            $awal = Carbon::create($tahun, $m, 1, 0, 0, 0, 'Asia/Jakarta');

            if ($awal->greaterThan($now)) {
                $sesi = 0;
            } elseif ($awal->isSameMonth($now)) {
                $sesi = max(1, intdiv($dasar[$m] * $now->day, $now->daysInMonth));
            } else {
                $sesi = $dasar[$m];
            }

            $out[] = [
                'key' => sprintf('%d-%02d', $tahun, $m),
                'label' => $label[$m],
                'semester' => $m >= 7 ? 'ganjil' : 'genap',
                'sesi' => $sesi,
            ];
        }

        return $out;
    }

    public static function find(int $id): ?array
    {
        $k = self::KELAS[$id] ?? null;
        if (! $k) {
            return null;
        }
        $now = now('Asia/Jakarta');
        $mulai = $now->month >= 7 ? $now->year : $now->year - 1;

        return [
            'id' => $id,
            'penugasanId' => $id,
            'kode' => $k['kode'],
            'tingkat' => $k['tingkat'],
            'mapel' => $k['mapel'],
            'jumlahSiswa' => $k['jumlah'],
            'tahunAjaran' => $mulai.'/'.($mulai + 1),
        ];
    }

    public static function siswa(int $kelasId): array
    {
        $k = self::KELAS[$kelasId] ?? null;
        if (! $k) {
            return [];
        }
        $bulan = self::bulan();

        return collect(array_slice(self::SISWA, $k['offset'], $k['jumlah']))->values()->map(
            function ($row, $i) use ($kelasId, $k, $bulan) {
                [$nama, $jk] = explode('|', $row);
                $nis = (string) (2610001 + $k['offset'] + $i);
                $dasar = 0.68 + 0.32 * self::acak("dasar-$nis");
                $hadir = [];
                $rekap = ['hadir' => 0, 'sakit' => 0, 'izin' => 0, 'alpa' => 0];

                foreach ($bulan as $b) {
                    if ($b['sesi'] === 0) {
                        $hadir[$b['key']] = null;

                        continue;
                    }
                    $rate = max(0, min(1, $dasar + (self::acak("$nis-{$b['key']}") - 0.5) * 0.2));
                    $h = (int) round($b['sesi'] * $rate);
                    $hadir[$b['key']] = $h;

                    $absen = $b['sesi'] - $h;
                    $sakit = intdiv($absen * 4, 10);
                    $izin = intdiv($absen * 3, 10);
                    $rekap['hadir'] += $h;
                    $rekap['sakit'] += $sakit;
                    $rekap['izin'] += $izin;
                    $rekap['alpa'] += $absen - $sakit - $izin;
                }

                return [
                    'id' => $kelasId * 100 + $i + 1,
                    'nama' => $nama,
                    'nis' => $nis,
                    'jk' => $jk,
                    'email' => strtolower(str_replace(' ', '.', $nama)).'@learvia.test',
                    'status' => ($kelasId === 3 && $i === 13) ? 'nonaktif' : 'aktif',
                    'hadir' => $hadir,
                    'rekap' => $rekap,
                ];
            }
        )->all();
    }

    /** Daftar kelas untuk kartu di halaman Kelas Saya. */
    public static function kelas(): array
    {
        $now = now('Asia/Jakarta');
        $bulanIni = collect(self::bulan())->where('sesi', '>', 0)->last();
        $jadwal = [1 => [0, '07.30–09.00'], 2 => [1, '09.15–10.45'], 3 => [2, '10.00–11.30']];
        $ujian = [
            1 => ['jenis' => 'Kuis', 'tanggal' => $now->copy()->setTime(9, 0)->toIso8601String()],
            2 => ['jenis' => 'UTS', 'tanggal' => $now->copy()->addDays(3)->setTime(8, 0)->toIso8601String()],
            3 => ['jenis' => 'Kuis', 'tanggal' => $now->copy()->addDays(7)->setTime(10, 0)->toIso8601String()],
        ];

        return collect(array_keys(self::KELAS))->map(function ($id) use ($now, $bulanIni, $jadwal, $ujian) {
            $siswa = self::siswa($id);
            $persen = 0;
            if ($bulanIni && count($siswa)) {
                $total = collect($siswa)->sum(fn ($s) => $s['hadir'][$bulanIni['key']] ?? 0);
                $persen = (int) round($total / ($bulanIni['sesi'] * count($siswa)) * 100);
            }

            return array_merge(self::find($id), [
                'kehadiranBulanIni' => $persen,
                'rataNilai' => 76 + (crc32("nilai-$id") % 15),
                'perluDinilai' => $id === 1 ? 8 : 0,
                'ujianAktif' => $id === 1,
                'absensiHariIni' => $id === 1 ? 'selesai' : 'belum',
                'jadwal' => [
                    'tanggal' => $now->copy()->addDays($jadwal[$id][0])->toIso8601String(),
                    'jam' => $jadwal[$id][1],
                ],
                'ujianBerikutnya' => $ujian[$id],
            ]);
        })->values()->all();
    }

    private static function acak(string $seed): float
    {
        return (crc32($seed) % 10000) / 10000;
    }
}
