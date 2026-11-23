<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Masuk — Learvia</title>
  <style>
    *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#f2f7ff;color:#172944;font-family:Inter,"Segoe UI",sans-serif}.box{width:min(100%,420px);padding:38px;background:#fff;border:1px solid #e6edf7;border-radius:22px;box-shadow:0 20px 60px #243a6012}.brand{color:#183b70;text-decoration:none;font-size:24px;font-weight:800}.brand b{display:inline-grid;place-items:center;width:38px;height:38px;margin-right:8px;border-radius:12px;background:#477ff2;color:#fff}.eyebrow{margin:30px 0 8px;color:#477ff2;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}h1{margin:0 0 8px;font-size:30px}p{margin:0 0 24px;color:#718099;line-height:1.6}label{display:block;margin:18px 0 7px;font-size:14px;font-weight:700}input{width:100%;padding:13px 14px;border:1px solid #dce5f1;border-radius:11px;font:inherit}input:focus{outline:3px solid #477ff233;border-color:#477ff2}.error{margin-top:6px;color:#c24143;font-size:13px}.submit{width:100%;margin-top:24px;padding:14px;border:0;border-radius:999px;background:#477ff2;color:white;font-size:15px;font-weight:700;cursor:pointer}.back{display:block;margin-top:20px;text-align:center;color:#60718b;text-decoration:none;font-size:14px}
  </style>
</head>
<body><main class="box">
  <a class="brand" href="{{ route('home') }}"><b>✦</b>Learvia</a>
  <div class="eyebrow">Selamat datang kembali</div><h1>Masuk ke Learvia</h1><p>Masukkan email dan password akun Anda untuk melanjutkan.</p>
  <form method="POST" action="{{ route('login.store') }}">
    @csrf
    <label for="email">Email</label><input id="email" name="email" type="email" value="{{ old('email') }}" autocomplete="email" required autofocus>
    @error('email')<div class="error">{{ $message }}</div>@enderror
    <label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" required>
    @error('password')<div class="error">{{ $message }}</div>@enderror
    <button class="submit" type="submit">Masuk</button>
  </form>
  <a class="back" href="{{ route('home') }}">← Kembali ke beranda</a>
</main></body></html>
