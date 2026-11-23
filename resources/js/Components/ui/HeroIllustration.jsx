/** Ilustrasi dekoratif banner dengan palet warna resmi Learvia (Navy & Teal). */
export default function HeroIllustration({ className }) {
  return (
    <svg viewBox="0 0 280 200" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="150" cy="186" rx="104" ry="9" fill="#233371" opacity=".1" />
      {/* tumpukan buku */}
      <rect x="64" y="136" width="170" height="34" rx="6" fill="#233371" />
      <rect x="64" y="150" width="170" height="4" fill="#93C6DD" />
      <rect x="82" y="100" width="146" height="34" rx="6" fill="#307997" />
      <rect x="82" y="114" width="146" height="4" fill="#C5E3F0" />
      <rect x="74" y="66" width="132" height="32" rx="6" fill="#4AAABF" />
      <rect x="74" y="79" width="132" height="4" fill="#E2F2F8" />
      {/* tanaman */}
      <path d="M22 150h36l-5 34H27z" fill="#fff" stroke="#D3E5EF" strokeWidth="2" />
      <ellipse cx="30" cy="124" rx="9" ry="22" fill="#16A34A" transform="rotate(-24 30 124)" />
      <ellipse cx="50" cy="120" rx="9" ry="24" fill="#22C55E" transform="rotate(20 50 120)" />
      <ellipse cx="40" cy="112" rx="8" ry="22" fill="#15803D" />
      {/* burung */}
      <path d="M214 38q6-8 12 0M236 52q5-6 10 0" fill="none" stroke="#307997" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
