'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shuffle, RotateCcw, Copy, Feather, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { POEMS, getPoemBySlug, type Poem } from '@/lib/poems-data';
import { useSessionId } from '@/hooks/useSessionId';
import { recordPlanted } from '@/lib/poet-profile';

export default function ErasureStudio() {
  const sessionId = useSessionId();
  const [poem, setPoem] = useState<Poem>(POEMS[0]);
  const [erased, setErased] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  // plant panel
  const [name, setName] = useState('');
  const [anon, setAnon] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Honor ?poem=<slug> deep links (read on client to avoid Suspense needs).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('poem');
    if (slug) {
      const p = getPoemBySlug(slug);
      if (p) setPoem(p);
    }
  }, []);

  const lines = useMemo(() => poem.content.split('\n').map((l) => l.split(/\s+/).filter(Boolean)), [poem]);

  const toggle = (key: string) =>
    setErased((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const shuffle = () => {
    const others = POEMS.filter((p) => p.slug !== poem.slug);
    setPoem(others[Math.floor(Math.random() * others.length)]);
    setErased(new Set());
    setMessage(null);
  };

  const reset = () => setErased(new Set());

  const erasureText = useMemo(() => {
    return lines
      .map((words, li) => words.filter((_, wi) => !erased.has(`${li}:${wi}`)).join(' '))
      .filter((l) => l.trim().length > 0)
      .join('\n');
  }, [lines, erased]);

  const keptCount = erasureText.split(/\s+/).filter(Boolean).length;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(erasureText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const plant = async () => {
    setError(null);
    if (keptCount < 3) {
      setError('Keep at least a few words first — carve out your poem.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/poetry/guest-poems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Erasure — from “${poem.title}”`,
          content: `${erasureText}\n\n— an erasure of “${poem.title}” by Nanda Regine`,
          authorName: anon ? null : name,
          isAnonymous: anon,
          sessionId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        recordPlanted();
      } else {
        setError(data.error || 'Could not plant it. Try again.');
      }
    } catch {
      setError('Could not plant it. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-cream">
      {/* Hero */}
      <section className="relative px-6 pt-24 pb-8">
        <div className="max-w-5xl mx-auto">
          <Link href="/poetry/community" className="inline-flex items-center gap-2 text-cream/55 hover:text-cherry transition-colors mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to The Circle
          </Link>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-px" style={{ background: '#C9A84C' }} />
            <span className="text-xs font-mono tracking-[0.35em] uppercase" style={{ color: '#C9A84C' }}>
              Inside Her Roses · The Erasure Studio
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light italic leading-[1.08]" style={{ color: '#F5EFD6' }}>
            Find your poem hidden<br />inside hers.
          </h1>
          <p className="mt-5 max-w-2xl text-cream/70 leading-relaxed">
            Tap words to black them out. What&rsquo;s left is a new poem — yours — carved from
            one of Nanda&rsquo;s. Keep the words that speak; erase the rest.
          </p>
        </div>
      </section>

      {/* Studio */}
      <section className="px-6 pb-8">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-4">
          {/* The canvas */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] backdrop-blur-md p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-cream/45">Erasing</p>
                <p className="font-display text-lg text-cream">&ldquo;{poem.title}&rdquo;</p>
              </div>
              <div className="flex gap-2">
                <button onClick={shuffle} title="Different poem" className="p-2 rounded-full hover:bg-white/10 text-cream/60">
                  <Shuffle className="w-4 h-4" />
                </button>
                <button onClick={reset} title="Reset" className="p-2 rounded-full hover:bg-white/10 text-cream/60">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="font-serif text-lg leading-[2] select-none">
              {lines.map((words, li) => (
                <div key={li} className="min-h-[0.6em]">
                  {words.map((word, wi) => {
                    const key = `${li}:${wi}`;
                    const isErased = erased.has(key);
                    return (
                      <button
                        key={key}
                        onClick={() => toggle(key)}
                        className={`inline rounded px-0.5 mx-[1px] transition-colors ${
                          isErased ? 'bg-cream/85 text-transparent' : 'text-cream/85 hover:bg-cherry/25'
                        }`}
                        style={isErased ? { color: 'transparent' } : undefined}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* The result */}
          <div className="rounded-[2rem] border border-white/10 bg-[#0d1330]/70 p-6 md:p-8 flex flex-col">
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-cream/45 mb-4">Your erasure</p>
            <div className="flex-1 min-h-[180px]">
              {keptCount > 0 ? (
                <p className="whitespace-pre-line font-display italic text-xl md:text-2xl text-cream leading-relaxed">
                  {erasureText}
                </p>
              ) : (
                <p className="text-cream/40 italic font-display text-lg">
                  Tap words on the left to begin carving…
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              <Button variant="outline" className="rounded-full border-cream/25 text-cream hover:bg-cream hover:text-navy"
                leftIcon={<Copy className="w-4 h-4" />} onClick={copy} disabled={keptCount === 0}>
                {copied ? 'Copied' : 'Copy'}
              </Button>
              <a href="#plant">
                <Button className="rounded-full bg-cherry text-white hover:bg-cherry-dark" leftIcon={<Feather className="w-4 h-4" />} >
                  Plant it
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Plant panel */}
      <section id="plant" className="px-6 pb-16 scroll-mt-24">
        <div className="max-w-2xl mx-auto rounded-[2rem] border border-white/10 bg-[#0b1029]/75 p-8">
          <h2 className="font-display text-2xl font-bold text-cream mb-2">Plant your erasure</h2>
          <p className="text-cream/60 text-sm mb-6">
            Send it to the Guest Garden. Nanda reads every one before it blooms.
          </p>

          <AnimatePresence mode="wait">
            {message ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-300" />
                </div>
                <p className="font-display italic text-xl text-cream max-w-sm">{message}</p>
                <button onClick={() => { setMessage(null); shuffle(); }} className="mt-6 text-cherry hover:text-cherry-dark text-sm font-medium">
                  Carve another
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0 }} className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="whitespace-pre-line font-display italic text-cream/85">{erasureText || '…'}</p>
                </div>
                <div>
                  <label className="block text-sm text-cream/70 mb-1.5">Your name {anon && <span className="text-cream/40">(hidden)</span>}</label>
                  <input type="text" value={name} disabled={anon} onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-cream placeholder:text-cream/30 focus:outline-none focus:border-cherry/60 disabled:opacity-40"
                    placeholder="How to credit you" />
                </div>
                <label className="flex items-center gap-2 text-sm text-cream/60 cursor-pointer">
                  <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} className="rounded border-white/20 text-cherry focus:ring-cherry" />
                  Plant it anonymously
                </label>
                {error && <p className="text-cherry text-sm">{error}</p>}
                <Button onClick={plant} disabled={submitting} className="rounded-full bg-cherry text-white hover:bg-cherry-dark w-full sm:w-auto"
                  leftIcon={submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Feather className="w-4 h-4" />}>
                  {submitting ? 'Planting…' : 'Plant my erasure'}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
