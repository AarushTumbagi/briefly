'use client';
import { useEffect, useRef, type ReactNode } from 'react';

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>('button, [href], input, select');
    el?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <button aria-label="Close dialog" onClick={onClose} className="absolute inset-0 bg-black/50 cursor-default" />
      <div ref={ref} className="relative card p-6 w-full max-w-md animate-in">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">{title}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export function Confirm({ title, body, confirmLabel = 'Confirm', onConfirm, onCancel }: {
  title: string; body: string; confirmLabel?: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{body}</p>
      <div className="flex justify-end gap-2 mt-6">
        <button onClick={onCancel} className="btn-secondary">Cancel</button>
        <button onClick={onConfirm} className="btn bg-red-600 text-white hover:bg-red-700">{confirmLabel}</button>
      </div>
    </Modal>
  );
}
