'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { useSessionId } from '@/hooks/useSessionId';
import {
  ArrowLeft, Feather, Send, Instagram, Mail, Star, Sparkles, CheckCircle, Loader2, Flower2, Shuffle, X,
} from 'lucide-react';
import { PROMPTS, randomPrompt, type WritingPrompt } from '@/lib/data/prompts';
import { recordPlanted } from '@/lib/poet-profile';
import PetalButton from '@/components/poetry/PetalButton';

interface GuestPoem {
  id: string;
  title: string;
  content: string;
  author_name: string | null;
  is_anonymous: boolean;
  status: 'approved' | 'featured';
  nanda_note: string | null;
  created_at: string;
}

// This month's prompt. Update the line/text here each cycle.
const PROMPT = {
  month: 'This season',
  line: '“she learned to speak in two tongues”',
  invitation:
    'Write from that line — in any language your heart keeps. A poem, a fragment, a single honest stanza. Plant it below; I read every one.',
};

export default function TheCircle() {
  const sessionId = useSessionId();
  const [poems, setPoems] = useState<GuestPoem[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ title: '', content: '', name: '', email: '', isAnonymous: false });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Playful prompts — kill the blank page.
  const [spun, setSpun] = useState<WritingPrompt | null>(null);
  const [writingFrom, setWritingFrom] = useState<string | null>(null);

  const spin = () => setSpun(randomPrompt(spun?.id));

  const writeFrom = (prompt: { kind: 'seed' | 'spark'; text: string }) => {
    setWritingFrom(prompt.text);
    if (prompt.kind === 'seed') {
      setForm((f) => ({ ...f, content: f.content ? f.content : `${prompt.text}\n` }));
    }
    document.getElementById('write')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetch('/api/poetry/guest-poems')
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setPoems(d); })
      .catch(() => {})
      .finally(() => setLoading(false));

    // Today's spark — the same prompt for everyone, turning over each day.
    const day = Math.floor(Date.now() / 86_400_000);
    setSpun(PROMPTS[day % PROMPTS.length]);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.title.trim() || form.content.trim().length < 20) {
      setError('A title and at least a few lines, please.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/poetry/guest-poems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          authorName: form.isAnonymous ? null : form.name,
          authorEmail: form.email,
          isAnonymous: form.isAnonymous,
          sessionId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setForm({ title: '', content: '', name: '', email: '', isAnonymous: false });
        setWritingFrom(null);
        recordPlanted(); // grow this writer's plot (badges live in My Garden)
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-cream">
      {/* Hero */}
      <section className="relative px-6 pt-28 pb-12">
        <div className="max-w-5xl mx-auto">
          <Link href="/poetry/collection" className="inline-flex items-center gap-2 text-cream/55 hover:text-cherry transition-colors mb-10 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to the garden
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-px" style={{ background: '#C9A84C' }} />
            <span className="text-xs font-mono tracking-[0.35em] uppercase" style={{ color: '#C9A84C' }}>
              Inside Her Roses · The Circle
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light italic leading-[1.05]" style={{ color: '#F5EFD6' }}>
            Poetry is a conversation.<br />Bring your voice.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: 'rgba(245,239,214,0.72)' }}>
            This is the meeting place for readers, dreamers, and fellow writers. Share a poem of
            your own, read what others have planted, and let the garden grow beyond me.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#write">
              <Button className="rounded-full bg-cherry text-white hover:bg-cherry-dark" leftIcon={<Feather className="w-4 h-4" />}>
                Share your poem
              </Button>
            </a>
            <Link href="/poetry/erasure">
              <Button variant="outline" className="rounded-full border-cream/25 text-cream hover:bg-cream hover:text-navy">
                ✂️ Erasure Studio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* This season's prompt + Spin the Prompt */}
      <section className="px-6 py-8">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-4">
          {/* Season prompt */}
          <div className="rounded-[2rem] border border-white/10 bg-[#0d1330]/70 p-8 md:p-10">
            <div className="flex items-center gap-2 mb-4" style={{ color: '#C9A84C' }}>
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-[0.28em]">{PROMPT.month}&rsquo;s prompt</span>
            </div>
            <p className="font-display italic text-2xl md:text-3xl text-cream mb-3">{PROMPT.line}</p>
            <p className="text-cream/70 max-w-2xl mb-6">{PROMPT.invitation}</p>
            <Button
              className="rounded-full bg-cherry text-white hover:bg-cherry-dark"
              leftIcon={<Feather className="w-4 h-4" />}
              onClick={() => writeFrom({ kind: 'seed', text: 'She learned to speak in two tongues —' })}
            >
              Write from this line
            </Button>
          </div>

          {/* Spin the Prompt */}
          <div className="rounded-[2rem] border border-white/10 bg-[#0b1029]/75 p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-4" style={{ color: '#7FD4E6' }}>
              <Shuffle className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-[0.28em]">Today&rsquo;s spark</span>
            </div>

            <div className="flex-1 flex items-center">
              {spun ? (
                <motion.p
                  key={spun.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display italic text-xl text-cream leading-relaxed"
                >
                  {spun.text}
                </motion.p>
              ) : (
                <p className="text-cream/50 italic font-display text-lg">
                  Stuck? Let the garden hand you a spark.
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              <Button
                variant="outline"
                className="rounded-full border-cream/25 text-cream hover:bg-cream hover:text-navy"
                leftIcon={<Shuffle className="w-4 h-4" />}
                onClick={spin}
              >
                {spun ? 'Spin again' : 'Spin'}
              </Button>
              {spun && (
                <Button
                  className="rounded-full bg-cherry text-white hover:bg-cherry-dark"
                  leftIcon={<Feather className="w-4 h-4" />}
                  onClick={() => writeFrom(spun)}
                >
                  Write from this
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* The Guest Garden */}
      <section className="px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: '#C9A84C' }}>The Guest Garden</span>
            <div className="flex-1 h-px bg-cream/15" />
            {!loading && poems.length > 0 && (
              <span className="text-cream/50 text-sm">{poems.length} {poems.length === 1 ? 'poem' : 'poems'} planted</span>
            )}
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-cream/50 py-12 justify-center">
              <Loader2 className="w-5 h-5 animate-spin" /> Gathering the garden…
            </div>
          ) : poems.length === 0 ? (
            <div className="text-center py-14 rounded-[2rem] border border-dashed border-white/15">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="font-display text-2xl text-cream mb-2">The garden is young.</h3>
              <p className="text-cream/60 max-w-md mx-auto">
                No guest poems have bloomed yet. Be the first to plant one — yours could open the circle.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {poems.map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.05 }}
                  className={`rounded-[1.5rem] border p-6 ${
                    p.status === 'featured' ? 'border-cherry/40 bg-cherry/[0.06]' : 'border-white/10 bg-white/[0.04]'
                  }`}
                >
                  {p.status === 'featured' && (
                    <span className="inline-flex items-center gap-1 text-cherry text-xs font-medium mb-3">
                      <Star className="w-3 h-3 fill-current" /> Featured by Nanda
                    </span>
                  )}
                  <h3 className="font-display text-xl font-bold text-cream mb-3">{p.title}</h3>
                  <p className="whitespace-pre-line font-serif text-cream/80 leading-relaxed text-[15px] max-h-64 overflow-hidden">
                    {p.content}
                  </p>

                  {p.nanda_note && (
                    <div className="mt-4 rounded-xl border border-cherry/25 bg-cherry/[0.06] px-4 py-3">
                      <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-cherry mb-1">Nanda&rsquo;s note</p>
                      <p className="text-cream/80 text-sm italic font-display">&ldquo;{p.nanda_note}&rdquo;</p>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                    <p className="text-sm text-cream/50 font-display italic">
                      — {p.is_anonymous ? 'Anonymous' : p.author_name || 'A fellow writer'}
                    </p>
                    <PetalButton guestPoemId={p.id} />
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Submission */}
      <section id="write" className="px-6 py-10 scroll-mt-24">
        <div className="max-w-2xl mx-auto rounded-[2rem] border border-white/10 bg-[#0b1029]/75 p-8 md:p-10">
          <div className="flex items-center gap-2 mb-2" style={{ color: '#C9A84C' }}>
            <Feather className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-[0.28em]">Plant a poem</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-cream mb-2">Share your work</h2>
          <p className="text-cream/60 text-sm mb-5">
            Nanda reads every submission before it blooms in the garden. Kindness and honesty only.
          </p>

          {writingFrom && !message && (
            <div className="mb-6 flex items-start gap-2 rounded-xl border border-cherry/30 bg-cherry/[0.08] px-4 py-3">
              <Feather className="w-4 h-4 text-cherry mt-0.5 shrink-0" />
              <p className="text-sm text-cream/85 flex-1">
                <span className="text-cream/50">Writing from:</span>{' '}
                <span className="font-display italic">{writingFrom}</span>
              </p>
              <button onClick={() => setWritingFrom(null)} className="text-cream/40 hover:text-cream" aria-label="Clear prompt">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {message ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-300" />
                </div>
                <p className="font-display italic text-xl text-cream max-w-sm">{message}</p>
                <button onClick={() => setMessage(null)} className="mt-6 text-cherry hover:text-cherry-dark text-sm font-medium">
                  Plant another
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} className="space-y-4" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div>
                  <label className="block text-sm text-cream/70 mb-1.5">Title</label>
                  <input
                    type="text" value={form.title} maxLength={120}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-cream placeholder:text-cream/30 focus:outline-none focus:border-cherry/60"
                    placeholder="Name your poem"
                  />
                </div>
                <div>
                  <label className="block text-sm text-cream/70 mb-1.5">Your poem</label>
                  <textarea
                    value={form.content} rows={7} maxLength={4000}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-cream placeholder:text-cream/30 focus:outline-none focus:border-cherry/60 resize-none font-serif leading-relaxed"
                    placeholder="Let it out. Line breaks are kept exactly as you write them."
                  />
                  <p className="text-xs text-cream/40 mt-1">{form.content.length}/4000</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-cream/70 mb-1.5">Your name {form.isAnonymous && <span className="text-cream/40">(hidden)</span>}</label>
                    <input
                      type="text" value={form.name} disabled={form.isAnonymous}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-cream placeholder:text-cream/30 focus:outline-none focus:border-cherry/60 disabled:opacity-40"
                      placeholder="How to credit you"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-cream/70 mb-1.5">Email <span className="text-cream/40">(optional, private)</span></label>
                    <input
                      type="email" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-cream placeholder:text-cream/30 focus:outline-none focus:border-cherry/60"
                      placeholder="So Nanda can reach you"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm text-cream/60 cursor-pointer">
                  <input type="checkbox" checked={form.isAnonymous}
                    onChange={(e) => setForm({ ...form, isAnonymous: e.target.checked })}
                    className="rounded border-white/20 text-cherry focus:ring-cherry" />
                  Share it anonymously
                </label>

                {error && <p className="text-cherry text-sm">{error}</p>}

                <Button type="submit" disabled={submitting} className="rounded-full bg-cherry text-white hover:bg-cherry-dark w-full sm:w-auto" leftIcon={submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}>
                  {submitting ? 'Planting…' : 'Plant my poem'}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Connect */}
      <section className="px-6 py-14">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Flower2 className="w-6 h-6 text-cherry" />
          </div>
          <p className="font-display italic text-2xl text-cream/85 mb-6">
            Hosting a poetry night, or want Nanda to read? The circle reaches beyond the screen.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="https://instagram.com/nanda.regine" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cream/70 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" /> @nanda.regine
            </a>
            <a href="mailto:hello@creativelynanda.co.za"
              className="inline-flex items-center gap-2 text-cream/70 hover:text-white transition-colors">
              <Mail className="w-5 h-5" /> hello@creativelynanda.co.za
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
