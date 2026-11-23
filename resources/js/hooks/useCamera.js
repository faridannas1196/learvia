import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Kamera guru untuk absensi (FR-16). state:
 * meminta | aktif | ditolak | tidak_tersedia
 */
export default function useCamera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [state, setState] = useState('meminta');

  const start = useCallback(async () => {
    setState('meminta');
    if (!navigator.mediaDevices?.getUserMedia) return setState('tidak_tersedia');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 } },
        audio: false,
      });
      streamRef.current = stream;
      stream.getVideoTracks()[0]?.addEventListener('ended', () => setState('tidak_tersedia'));
      if (videoRef.current) videoRef.current.srcObject = stream;
      setState('aktif');
    } catch (e) {
      setState(e?.name === 'NotAllowedError' ? 'ditolak' : 'tidak_tersedia');
    }
  }, []);

  useEffect(() => {
    start();
    return () => streamRef.current?.getTracks().forEach((t) => t.stop());
  }, [start]);

  return { videoRef, state, retry: start };
}
