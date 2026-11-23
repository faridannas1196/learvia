<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Support\DummyGuruData;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AbsensiController extends Controller
{
    public function setup(Request $request): Response
    {
        return Inertia::render('Guru/Absensi/Setup', [
            'penugasan' => DummyGuruData::penugasan(),
            'terpilih' => $request->query('penugasan_id'),
            'urls' => ['store' => route('guru.absensi.store')],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'penugasan_id' => ['required', 'integer'], // TODO: exists + milik guru ini (FR-04)
            'tanggal' => ['required', 'date'],
            'sesi' => ['required', 'integer', 'between:1,8'],
        ], [
            'penugasan_id.required' => 'Pilih kelas dan mata pelajaran.',
        ]);

        // TODO: buat attendance_sessions di database, lalu redirect ke id aslinya.
        return redirect()->route('guru.absensi.show', ['sesi' => 1] + $data);
    }

    public function show(Request $request, int $sesi): Response
    {
        $penugasan = collect(DummyGuruData::penugasan())->firstWhere('id', (int) $request->query('penugasan_id', 1));

        return Inertia::render('Guru/Absensi/Sesi', [
            'sesi' => [
                'id' => $sesi,
                'kelas' => $penugasan['kelas'],
                'mapel' => $penugasan['mapel'],
                'tanggal' => $request->query('tanggal', now('Asia/Jakarta')->toDateString()),
                'jam' => (int) $request->query('sesi', 1),
            ],
            'siswa' => DummyGuruData::siswa(),
            'urls' => [
                'konfirmasi' => route('guru.absensi.konfirmasi', $sesi),
                'tutup' => route('guru.absensi.tutup', $sesi),
            ],
        ]);
    }

    public function konfirmasi(Request $request, int $sesi): RedirectResponse
    {
        $request->validate([
            'student_id' => ['required', 'integer'],
            'status' => ['required', 'in:hadir,sakit,izin,alpa'],
        ]);

        // TODO (FR-22): Attendance::updateOrCreate(
        //   ['attendance_session_id' => $sesi, 'student_id' => $request->student_id],
        //   ['status' => $request->status, 'detection_method' => 'yolo_manual', 'verified_by' => auth()->id(), 'verified_at' => now()]
        // ); idempotent, jadi retry tidak membuat catatan ganda. Catat juga di audit_logs bila mengubah catatan lama.
        return back();
    }

    public function tutup(int $sesi): RedirectResponse
    {
        // TODO: set attendance_sessions.status = closed, ended_at = now().
        return redirect()->route('guru.dashboard')->with('status', 'Sesi absensi disimpan sebagai riwayat.');
    }
}
