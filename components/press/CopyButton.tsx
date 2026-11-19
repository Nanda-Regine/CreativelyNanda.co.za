'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** Copies a bio to the clipboard. Says what happened, and says so when it could not. */
export default function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<'idle' | 'done' | 'failed'>('idle');

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState('done');
    } catch {
      setState('failed');
    }
    setTimeout(() => setState('idle'), 2400);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 font-mono text-[11px] uppercase tracking-[0.18em] transition-opacity hover:opacity-80"
      style={{ borderColor: 'currentColor' }}
    >
      {state === 'done' ? <Check aria-hidden className="h-4 w-4" /> : <Copy aria-hidden className="h-4 w-4" />}
      <span aria-live="polite">{state === 'done' ? 'Copied' : state === 'failed' ? 'Select and copy by hand' : 'Copy'}</span>
    </button>
  );
}
