<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function create(Request $request): Response|RedirectResponse
    {
        $role = $request->route('role', $request->query('role', 'guru'));
        abort_unless(in_array($role, ['siswa', 'guru', 'admin'], true), 404);

        return Inertia::render('Auth/Login', ['role' => $role]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate(['email' => ['required', 'email'], 'password' => ['required', 'string']]);
        $role = $request->input('role', 'guru');
        abort_unless(in_array($role, ['siswa', 'guru', 'admin'], true), 422);
        $request->session()->put('demo_user', ['email' => $data['email'], 'role' => $role]);

        return redirect('/'.$role);
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}
