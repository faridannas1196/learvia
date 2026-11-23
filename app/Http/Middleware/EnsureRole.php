<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/** FR-04: izin divalidasi di backend, bukan hanya menyembunyikan menu. Pakai: ->middleware('role:guru') */
class EnsureRole
{
    public function handle(Request $request, Closure $next, string $role)
    {
        abort_unless($request->user()?->role === $role, 403);

        return $next($request);
    }
}
