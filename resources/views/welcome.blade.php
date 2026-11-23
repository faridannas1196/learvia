<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f2f7ff">
  <title>Learvia — Belajar tumbuh bersama</title>
  <style>
    :root{font-family:Inter,"Segoe UI",sans-serif;color:#172944;background:#f2f7ff;font-synthesis:none;text-rendering:optimizeLegibility}*{box-sizing:border-box}body{margin:0}.wrap{max-width:1160px;margin:auto;padding:0 28px}.nav{height:82px;display:flex;align-items:center;justify-content:space-between}.brand{display:flex;align-items:center;gap:11px;font-size:25px;font-weight:800;color:#183b70;text-decoration:none}.logo{width:42px;height:42px;display:grid;place-items:center;border-radius:14px;background:#477ff2;color:#fff;font-size:22px}.links{display:flex;align-items:center;gap:30px}.links a,.login{color:#536680;text-decoration:none;font-size:14px;font-weight:600}.btn{display:inline-flex;justify-content:center;align-items:center;border-radius:999px;background:#477ff2;color:#fff;text-decoration:none;padding:14px 23px;font-weight:700;box-shadow:0 10px 25px #477ff233}.btn.light{background:#fff;color:#477ff2;box-shadow:none}.hero{position:relative;overflow:hidden;min-height:520px;display:grid;grid-template-columns:1fr .9fr;align-items:center;gap:44px;padding:62px 0 78px}.hero:before{content:"";position:absolute;z-index:-1;width:580px;height:580px;right:2%;top:-40px;border-radius:48% 52% 58% 42%;background:linear-gradient(145deg,#e3f5f2,#e6eaff)}.eyebrow{color:#477ff2;font-size:12px;letter-spacing:.14em;font-weight:800;text-transform:uppercase}.hero h1{font-size:clamp(42px,5vw,66px);line-height:1.08;letter-spacing:-.045em;margin:16px 0;color:#182b49}.hero h1 span{color:#477ff2}.hero p{font-size:16px;line-height:1.8;color:#687991;max-width:470px;margin:0 0 27px}.actions{display:flex;gap:13px;flex-wrap:wrap}.visual{position:relative;min-height:380px;display:grid;place-items:center}.blob{position:absolute;width:310px;height:330px;background:linear-gradient(145deg,#ffc17d,#ff8755);border-radius:48% 52% 40% 60%;transform:rotate(-8deg)}.student{position:relative;width:80%;max-width:390px;height:335px;border-radius:46% 46% 24px 24px;background:linear-gradient(160deg,#eaf7f4,#d4e2ff);display:flex;align-items:center;justify-content:center;overflow:hidden}.student .person{font-size:175px;filter:drop-shadow(0 20px 12px #314b7130)}.float{position:absolute;background:#fff;border-radius:18px;padding:13px 16px;box-shadow:0 14px 40px #203a6520;font-size:12px;font-weight:700}.f1{left:1%;top:48px}.f2{right:0;bottom:48px}.section{background:#fff;padding:74px 0}.center{text-align:center}.center h2{font-size:34px;letter-spacing:-.03em;margin:10px 0;color:#1b2c49}.sub{color:#718099;line-height:1.7}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}.card{border:1px solid #e9eff7;border-radius:18px;padding:25px;background:#fff;box-shadow:0 12px 32px #243a6008}.icon{width:48px;height:48px;border-radius:15px;background:#edf3ff;color:#477ff2;display:grid;place-items:center;font-size:23px}.card h3{margin:17px 0 8px;font-size:17px}.card p{margin:0;color:#75839a;line-height:1.65;font-size:14px}.about{background:#f2f7ff;padding:70px 0}.aboutbox{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:55px}.aboutart{min-height:300px;border-radius:24px;background:linear-gradient(135deg,#d8f1eb,#e7edff);display:grid;place-items:center;font-size:135px}.about h2{font-size:34px;line-height:1.2;margin:12px 0}.roles{padding:70px 0;background:#fff}.rolecard{display:flex;align-items:center;justify-content:space-between;gap:24px;background:linear-gradient(110deg,#174681,#477ff2);color:white;padding:36px 42px;border-radius:24px}.rolecard h2{font-size:29px;margin:8px 0}.rolecard p{margin:0;color:#dce8ff}.footer{padding:26px 0;color:#77869b;font-size:13px}.mobile{display:none}@media(max-width:760px){.wrap{padding:0 20px}.links{display:none}.mobile{display:inline-flex}.hero{grid-template-columns:1fr;padding:45px 0 60px;gap:15px}.hero:before{width:390px;height:390px;right:-20%;top:43%}.hero h1{font-size:46px}.visual{min-height:315px}.student{height:280px}.blob{height:280px;width:270px}.student .person{font-size:145px}.grid{grid-template-columns:1fr}.aboutbox{grid-template-columns:1fr;gap:30px}.aboutart{min-height:230px}.rolecard{padding:28px;align-items:flex-start;flex-direction:column}.center h2,.about h2{font-size:29px}}
  </style>
</head>
<body>
  <header class="wrap nav">
    <a class="brand" href="{{ route('home') }}"><span class="logo">✦</span>Learvia</a>
    <nav class="links" aria-label="Navigasi utama">
      <a href="#beranda">Beranda</a><a href="#fitur">Fitur</a><a href="#tentang">Tentang</a><a href="#akses">Akses</a>
    </nav>
    <a class="btn mobile" href="{{ url('/guru') }}">Masuk</a>
    <a class="btn links" href="{{ url('/guru') }}">Masuk ke Learvia&nbsp; →</a>
  </header>

  <main>
    <section class="wrap hero" id="beranda">
      <div>
        <div class="eyebrow">Platform pembelajaran terpadu</div>
        <h1>Belajar lebih mudah,<br><span>tumbuh bersama.</span></h1>
        <p>Learvia menghubungkan guru dan siswa dalam pengalaman belajar yang lebih terarah, menyenangkan, dan bermakna.</p>
        <div class="actions"><a class="btn" href="{{ url('/guru') }}">Jelajahi Learvia&nbsp; →</a><a class="btn light" href="#fitur">Kenali platform</a></div>
      </div>
      <div class="visual" aria-label="Ilustrasi suasana belajar">
        <div class="blob"></div><div class="student"><span class="person" aria-hidden="true">🧑🏻‍🎓</span></div>
        <div class="float f1">📚 &nbsp;Belajar dengan nyaman</div><div class="float f2">✨ &nbsp;Ruang tumbuh bersama</div>
      </div>
    </section>

    <section class="section" id="fitur">
      <div class="wrap center"><div class="eyebrow">Semua dalam satu platform</div><h2>Belajar dan mengajar jadi lebih terarah</h2><p class="sub">Fitur yang membantu setiap bagian dari perjalanan belajar.</p>
        <div class="grid">
          <article class="card"><div class="icon">▤</div><h3>Kelas terorganisir</h3><p>Materi dan aktivitas kelas tersusun rapi agar mudah diikuti setiap hari.</p></article>
          <article class="card"><div class="icon">✎</div><h3>Ujian dan penilaian</h3><p>Buat evaluasi, kerjakan ujian, dan pantau perkembangan belajar.</p></article>
          <article class="card"><div class="icon">◷</div><h3>Kehadiran praktis</h3><p>Kelola presensi kelas dengan alur yang sederhana dan jelas.</p></article>
        </div>
      </div>
    </section>

    <section class="about" id="tentang"><div class="wrap aboutbox">
      <div class="aboutart" aria-hidden="true">📖</div>
      <div><div class="eyebrow">Tentang Learvia</div><h2>Ruang belajar untuk setiap potensi.</h2><p class="sub">Kami percaya pendidikan yang baik tumbuh dari kolaborasi. Learvia membantu guru mengelola pembelajaran dan memberi siswa ruang untuk berkembang.</p><a class="btn" href="{{ url('/guru') }}">Mulai jelajahi&nbsp; →</a></div>
    </div></section>

    <section class="roles" id="akses"><div class="wrap rolecard"><div><div class="eyebrow" style="color:#cfe0ff">Siap memulai?</div><h2>Masuk ke ruang belajar Anda.</h2><p>Pilih ruang guru untuk melihat dashboard pembelajaran.</p></div><a class="btn light" href="{{ url('/guru') }}">Masuk sebagai guru&nbsp; →</a></div></section>
  </main>
  <footer class="wrap footer">© {{ date('Y') }} Learvia. Belajar tumbuh bersama.</footer>
</body>
</html>
