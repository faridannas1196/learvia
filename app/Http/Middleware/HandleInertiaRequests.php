<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user
                    ? ['name' => $user->name, 'role' => $user->role]
                    // Hanya lokal, supaya layout terlihat sebelum login dibuat.
                    : (app()->environment('local') ? ['name' => 'Bu Rina', 'role' => 'guru'] : null),
            ],
            'flash' => ['status' => fn () => $request->session()->get('status')],
            // TODO: hitung dari tabel notifikasi.
            'notifikasiBelumDibaca' => fn () => 3,
        ];
    }
}
