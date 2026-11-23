<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Support\DummyKelasData;
use Inertia\Inertia;
use Inertia\Response;

class KelasController extends Controller
{
    public function index(): Response
    {
        // TODO: hanya kelas dari class_subjects.teacher_id = guru yang login.
        return Inertia::render('Guru/Kelas/Index', [
            'kelas' => DummyKelasData::kelas(),
            'hariIni' => now('Asia/Jakarta')->toIso8601String(),
        ]);
    }

    public function show(int $kelas): Response
    {
        // TODO (FR-04): abort(403) bila guru ini tidak ditugaskan di kelas tersebut.
        $data = DummyKelasData::find($kelas);
        abort_if($data === null, 404);

        return Inertia::render('Guru/Kelas/Show', [
            'kelas' => $data,
            'bulan' => DummyKelasData::bulan(),
            'siswa' => DummyKelasData::siswa($kelas),
        ]);
    }
}
