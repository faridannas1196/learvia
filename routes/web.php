<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Guru\AbsensiController;
use App\Http\Controllers\Guru\DashboardController;
use App\Http\Controllers\Guru\KelasController;
use App\Http\Controllers\Guru\UjianController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome')->name('home');
Route::get('/login/{role?}', [AuthController::class, 'create'])->name('login');
Route::post('/login', [AuthController::class, 'store'])->name('login.store');
Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');
Route::get('/siswa', fn () => redirect()->route('login', ['role' => 'siswa']));
Route::get('/admin', fn () => redirect()->route('login', ['role' => 'admin']));

$guard = app()->environment('local') ? [] : ['auth'];

Route::middleware($guard)->prefix('guru')->name('guru.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/login', [AuthController::class, 'create'])->defaults('role', 'guru')->name('login');

    Route::get('/absensi/mulai', [AbsensiController::class, 'setup'])->name('absensi.setup');
    Route::post('/absensi', [AbsensiController::class, 'store'])->name('absensi.store');
    Route::get('/absensi/{sesi}', [AbsensiController::class, 'show'])->whereNumber('sesi')->name('absensi.show');
    Route::post('/absensi/{sesi}/konfirmasi', [AbsensiController::class, 'konfirmasi'])->whereNumber('sesi')->name('absensi.konfirmasi');
    Route::post('/absensi/{sesi}/tutup', [AbsensiController::class, 'tutup'])->whereNumber('sesi')->name('absensi.tutup');

    Route::get('/ujian', [UjianController::class, 'index'])->name('ujian.index');

    // Belum dibangun: halaman placeholder.
    Route::get('/kelas', [KelasController::class, 'index'])->name('kelas.index');
    Route::get('/kelas/{kelas}', [KelasController::class, 'show'])->whereNumber('kelas')->name('kelas.show');
    Route::inertia('/bank-soal', 'Guru/Segera', ['judul' => 'Bank Soal'])->name('bank-soal');
    Route::inertia('/hasil', 'Guru/Segera', ['judul' => 'Hasil & Nilai'])->name('hasil');
    Route::inertia('/ujian/buat', 'Guru/Segera', ['judul' => 'Buat Ujian'])->name('ujian.buat');
});
