/**
 * Placeholder hasil deteksi YOLO (F-06).
 *
 * TODO: ambil frame dari videoRef secara berkala, kirim ke Laravel (bukan langsung ke FastAPI),
 * lalu kembalikan deteksi: [{ id, box: { x, y, w, h } (skala 0..1), confidence }].
 * `service`: 'aktif' | 'gagal' | 'unknown'. Selama belum terhubung statusnya 'unknown',
 * bukan 'aktif' (Design Brief prinsip 2: status tidak diketahui tidak dianggap aktif).
 */
export default function useYoloDetection(/* videoRef, enabled */) {
  return { detections: [], service: 'unknown' };
}
