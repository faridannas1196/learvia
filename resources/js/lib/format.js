const timeZone = 'Asia/Jakarta';

export const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', timeZone });

export const formatWaktu = (iso) =>
  new Date(iso).toLocaleString('id-ID', {
    weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone,
  });
