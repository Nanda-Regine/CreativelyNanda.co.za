'use client';

import { useId, useState } from 'react';
import Link from 'next/link';

type Status = 'idle' | 'sending' | 'success' | 'error';

const FIELD =
  'min-h-[44px] w-full rounded-lg border bg-transparent px-4 py-2.5 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9943A]';
const FIELD_STYLE: React.CSSProperties = {
  borderColor: 'rgb(var(--ink-rgb, 245 240 232) / 0.4)',
  color: 'inherit',
};

export default function OptInForm({
  source = 'cn_home',
  compact = false,
}: {
  source?: string;
  compact?: boolean;
}) {
  const uid = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    setMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: String(data.get('email') ?? ''),
          name: String(data.get('name') ?? ''),
          company: String(data.get('company') ?? ''),
          source,
        }),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
        return;
      }
      const j = await res.json().catch(() => null);
      setMessage(j?.error || 'Something went wrong. Please try again.');
      setStatus('error');
    } catch {
      setMessage('No connection. Please check your data and try again.');
      setStatus('error');
    }
  }

  const sending = status === 'sending';

  return (
    <div className={compact ? 'max-w-sm' : 'mx-auto max-w-xl'}>
      <h2 className={`font-display font-bold italic ${compact ? 'text-xl' : 'text-3xl md:text-4xl'}`}>Builder Notes</h2>
      <p className={`mt-2 opacity-85 ${compact ? 'text-sm' : 'text-base md:text-lg'}`}>
        Short, honest notes on what I&apos;m building, what broke, and what I&apos;d do differently. Now and then, never spam.
      </p>

      {status === 'success' ? (
        <p role="status" className="mt-5 rounded-lg border px-4 py-3 font-semibold" style={FIELD_STYLE}>
          You&apos;re in. Check your inbox.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <div>
            <label htmlFor={`${uid}-name`} className="mb-1 block text-sm font-medium">
              Name (optional)
            </label>
            <input
              id={`${uid}-name`}
              name="name"
              type="text"
              autoComplete="name"
              maxLength={100}
              disabled={sending}
              className={FIELD}
              style={FIELD_STYLE}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-email`} className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={200}
              disabled={sending}
              aria-invalid={status === 'error'}
              aria-describedby={status === 'error' ? `${uid}-err` : undefined}
              className={FIELD}
              style={FIELD_STYLE}
            />
          </div>
          {/* Honeypot: hidden from people and assistive tech */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
            <label htmlFor={`${uid}-company`}>Company</label>
            <input id={`${uid}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>

          {status === 'error' && (
            <p id={`${uid}-err`} role="alert" className="text-sm font-semibold">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="min-h-[44px] w-full rounded-full bg-[#C9943A] px-8 py-3 font-semibold text-[#1A1A2E] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9943A] disabled:opacity-60"
          >
            {sending ? 'Sending...' : 'Subscribe'}
          </button>
          <p className="text-xs opacity-75">
            By subscribing you agree to receive emails from Nanda / CreativelyNanda. Unsubscribe any time. See our{' '}
            <Link href="/legal/privacy" className="underline">privacy policy</Link>.
          </p>
        </form>
      )}
    </div>
  );
}
