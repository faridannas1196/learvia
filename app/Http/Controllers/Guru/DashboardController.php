<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Support\DummyGuruData;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        // TODO: ganti seluruh data dummy dengan query Eloquent milik guru ini.
        $ujian = DummyGuruData::ujian();

        return Inertia::render('Guru/Dashboard', [
            'guru' => ['nama' => auth()->user()?->name ?? 'Bu Rina'],
            'stats' => ['kelas' => 3, 'siswa' => 36, 'ujianAktif' => 1, 'perluDinilai' => 8, 'kehadiran' => 87],
            'jadwalUjian' => array_values(array_filter($ujian, fn ($u) => $u['status'] !== 'completed')),
            // Tanggal ujian untuk titik di kalender (Y-m-d, zona Asia/Jakarta).
            'kalender' => array_map(fn ($u) => [
                'tanggal' => Carbon::parse($u['mulai'])->timezone('Asia/Jakarta')->toDateString(),
                'judul' => $u['judul'],
            ], $ujian),
            // Total harus 100 (persen kehadiran minggu ini).
            'kehadiran' => [
                ['label' => 'Hadir', 'value' => 87],
                ['label' => 'Sakit', 'value' => 5],
                ['label' => 'Izin', 'value' => 5],
                ['label' => 'Alpa', 'value' => 3],
            ],
            'pengumuman' => [
                ['id' => 1, 'judul' => 'Jadwal UTS genap', 'isi' => 'Ujian Tengah Semester dimulai minggu depan. Pastikan soal sudah terbit.', 'tanggal' => '20 Nov 2026'],
                ['id' => 2, 'judul' => 'Batas input nilai esai', 'isi' => 'Nilai esai kuis sebelumnya perlu selesai sebelum rapat guru.', 'tanggal' => '18 Nov 2026'],
                ['id' => 3, 'judul' => 'Briefing penggunaan Learvia', 'isi' => 'Guru membriefing siswa soal kamera dan berbagi layar sebelum ujian.', 'tanggal' => '15 Nov 2026'],
            ],
        ]);
    }
}
