'use client';

/**
 * The press front page's two interactive pieces: search over the archive, and
 * the letters sign-up. Everything else on the page is server-rendered.
 */

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';

const NAVY = '#0A1128';
const GOLD = '#C9943A';
const CREAM = '#F5F0E8';
const EMBER = '#E4572E';

export interface SearchItem {
  href: string;
  title: string;
  excerpt: string;
  imprint: string;
  issue: string;
}

export function PressSearch({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState('');
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return [];
    return items.filter((i) => `${i.title} ${i.excerpt} ${i.imprint}`.toLowerCase().includes(t)).slice(0, 12);
  }, [q, items]);

  return (
    <div className="relative max-w-md">
      <label className="flex items-center gap-3 border px-5 py-3" style={{ borderColor: `${CREAM}2e`, borderRadius: 2 }}>
        <Search className="h-4 w-4 shrink-0" style={{ color: GOLD }} />
        <span className="sr-only">Search the archive</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the archive"
          className="flex-1 bg-transparent text-sm focus:outline-none"
          style={{ color: CREAM }}
        />
      </label>
      {q.trim().length >= 2 ? (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-[60vh] overflow-y-auto border shadow-2xl" style={{ background: CREAM, borderColor: `${NAVY}1a`, borderRadius: 2 }}>
          {hits.length ? (
            <ul>
              {hits.map((h) => (
                <li key={h.href}>
                  <Link href={h.href} className="block border-b px-5 py-4 transition-colors hover:bg-white" style={{ borderColor: `${NAVY}12` }}>
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                      {h.imprint}
                      {h.issue ? ` · ${h.issue}` : ''}
                    </p>
                    <p className="mt-1 font-display text-lg leading-snug" style={{ color: NAVY }}>
                      {h.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-5 font-display italic" style={{ color: `${NAVY}99` }}>
              Nothing in the archive matches that yet.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <p className="font-display text-2xl italic" style={{ color: CREAM }}>
        You&apos;re on the list. The next issue comes to you.
      </p>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="press-email">
          Email address
        </label>
        <input
          id="press-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={status === 'loading'}
          className="flex-1 border bg-transparent px-6 py-4 text-base focus:outline-none disabled:opacity-60"
          style={{ borderColor: `${CREAM}33`, color: CREAM, borderRadius: 2 }}
        />
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className="flex items-center justify-center gap-2 px-8 py-4 font-mono text-xs uppercase tracking-[0.3em] disabled:opacity-60"
          style={{ background: GOLD, color: NAVY, borderRadius: 2 }}
        >
          {status === 'loading' ? 'Sending' : (
            <>
              Subscribe <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      {status === 'error' ? (
        <p className="mt-3 text-sm" style={{ color: EMBER }}>
          Something went wrong. Try again, or write to nandaregine@gmail.com
        </p>
      ) : null}
    </form>
  );
}
