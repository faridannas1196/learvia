import { useEffect, useRef } from 'react';
import Button from './Button';

/** Memakai <dialog> native: focus trap + Esc sudah ditangani browser. */
export default function ConfirmDialog({ open, title, children, confirmLabel = 'Ya, lanjutkan', loading, onConfirm, onCancel }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-title"
      data-lenis-prevent
      onCancel={(e) => { e.preventDefault(); onCancel(); }}
      className="w-[calc(100%-2rem)] max-w-md rounded-xl p-0 shadow-e3 backdrop:bg-ink-900/40"
    >
      <div className="p-6">
        <h2 id="confirm-title" className="font-display text-h2 text-ink-900">{title}</h2>
        <div className="mt-2 text-body text-ink-700">{children}</div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>Batal</Button>
          <Button onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
        </div>
      </div>
    </dialog>
  );
}
