<?php

use App\Http\Controllers\Guru\AbsensiController;
use App\Http\Controllers\Guru\DashboardController;
use App\Http\Controllers\Guru\KelasController;
use App\Http\Controllers\Guru\UjianController;
use Illuminate\Support\Facades\Route;

// TODO: HAPUS bypass ini begitu halaman login selesai. Di lokal saja agar UI bisa dilihat tanpa login.
// Jangan pernah set APP_ENV=local di server produksi.
$guard = app()->environment('local') ? [] : ['auth', 'role:guru'];

Route::middleware($guard)->prefix('guru')->name('guru.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/absensi/mulai', [AbsensiController::class, 'setup'])->name('absensi.setup');
    Route::post('/absensi', [AbsensiController::class, 'store'])->name('absensi.store');
    Route::get('/absensi/{sesi}', [AbsensiController::class, 'show'])->whereNumber('sesi')->name('absensi.show');
    Route::post('/absensi/{sesi}/konfirmasi', [AbsensiController::class, 'konfirmasi'])->whereNumber('sesi')->name('absensi.konfirmasi');
    Route::post('/absensi/{sesi}/tutup', [AbsensiController::class, 'tutup'])->whereNumber('sesi')->name('absensi.tutup');

    Route::get('/ujian', [UjianController::class, 'index'])->name('ujian.index');

    // Belum dibangun: halaman placeholder.
    Route::inertia('/pengumuman', 'Guru/Segera', ['judul' => 'Pengumuman'])->name('pengumuman');
    Route::inertia('/absensi/rekap', 'Guru/Segera', ['judul' => 'Rekap Absensi'])->name('absensi.rekap');
    Route::get('/kelas', [KelasController::class, 'index'])->name('kelas.index');
    Route::get('/kelas/{kelas}', [KelasController::class, 'show'])->whereNumber('kelas')->name('kelas.show');
    Route::inertia('/bank-soal', 'Guru/Segera', ['judul' => 'Bank Soal'])->name('bank-soal');
    Route::inertia('/hasil', 'Guru/Segera', ['judul' => 'Hasil & Nilai'])->name('hasil');
    Route::inertia('/ujian/buat', 'Guru/Segera', ['judul' => 'Buat Ujian'])->name('ujian.buat');
    Route::inertia('/profil', 'Guru/Segera', ['judul' => 'Profil'])->name('profil');
});
