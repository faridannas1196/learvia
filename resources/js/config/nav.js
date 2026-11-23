import { Home, Users, ClipboardCheck, BookOpen, FileText, BarChart3, UserRound } from 'lucide-react';

// Menu guru. `match` = prefix URL yang membuat item dianggap aktif.
export const guruNav = [
  { label: 'Beranda', href: '/guru', match: '/guru', exact: true, icon: Home },
  { label: 'Kelas Saya', href: '/guru/kelas', match: '/guru/kelas', icon: Users },
  { label: 'Absensi', href: '/guru/absensi/mulai', match: '/guru/absensi', icon: ClipboardCheck },
  { label: 'Bank Soal', href: '/guru/bank-soal', match: '/guru/bank-soal', icon: BookOpen },
  { label: 'Ujian', href: '/guru/ujian', match: '/guru/ujian', icon: FileText },
  { label: 'Hasil & Nilai', href: '/guru/hasil', match: '/guru/hasil', icon: BarChart3 },
  { label: 'Profil', href: '/guru/profil', match: '/guru/profil', icon: UserRound },
];

export function isActive(url, item) {
  const path = url.split('?')[0];
  return item.exact ? path === item.match : path.startsWith(item.match);
}
