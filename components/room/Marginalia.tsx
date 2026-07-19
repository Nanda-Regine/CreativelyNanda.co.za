'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Feather } from 'lucide-react';
import { Button } from '@/components/ui';
import { useSessionId } from '@/hooks/useSessionId';

export interface Whisper {
  id: string;
  line_index: number;
  body: string;
  author: string | null;
  status: string;
  created_at: string;
}

// Marginalia — tap a line, hear what it stirred in others, add your own whisper.
// Public whispers become the poem's collective margin. A slide-in panel.

export default function Marginalia({
  slug,
  lineIndex,
  lineText,
  whispers,
  annotation,
  onClose,
  onAdded,
}: {
  slug: string;
  lineIndex: number;
  lineText: string;
  whispers: Whisper[];
  annotation?: string; // Nanda's own commentary for this line
  onClose: () => void;
  onAdded: (w: Whisper) => void;
}) {
  const sessionId = useSessionId();
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [anon, setAnon] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const lineWhispers = whispers.filter((w) => w.line_index === lineIndex);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = body.trim();
    if (clean.length < 1) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch(`/api/poetry/poems/${slug}/marginalia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lineIndex,
          body: clean,
          author: anon ? null : author,
          isAnonymous: anon,
          sessionId,
        }),
      });
      const data = await res.json();
      if (res.ok && data.whisper) {
        onAdded(data.whisper as Whisper);
        setBody('');
      } else {
        setError(data.error || 'Could not leave your whisper.');
      }
    } catch {
      setError('Could not leave your whisper.');
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.aside
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0b1029]/95 backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[#C9A84C]">
            <Feather className="h-4 w-4" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em]">Marginalia</span>
          </div>
          <p className="font-serif text-lg italic leading-snug text-cream/90">&ldquo;{lineText.trim()}&rdquo;</p>
        </div>
        <button onClick={onClose} className="rounded-full p-2 text-cream/60 transition-colors hover:bg-white/10 hover:text-cream" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        {annotation && (
          <div className="rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/[0.06] p-4">
            <p className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-[#C9A84C]">From Nanda</p>
            <p className="font-display italic leading-relaxed text-cream/85">{annotation}</p>
          </div>
        )}
        {lineWhispers.length === 0 ? (
          <p className="py-8 text-center text-sm text-cream/40">
            No whispers on this line yet. Be the first to say what it opened in you.
          </p>
        ) : (
          lineWhispers.map((w) => (
            <div key={w.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-cream/80">{w.body}</p>
              <p className="mt-2 text-xs text-cream/40">
                — {w.author || 'Anonymous'}
                {w.status === 'featured' && <span className="ml-2 text-[#C9A84C]">✦ featured</span>}
              </p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={submit} className="space-y-3 border-t border-white/10 p-6">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={280}
          rows={3}
          required
          placeholder="What did this line open in you?"
          className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-cream placeholder:text-cream/30 focus:border-cherry/60 focus:outline-none"
        />
        {!anon && (
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-cream placeholder:text-cream/30 focus:border-cherry/60 focus:outline-none"
          />
        )}
        <label className="flex items-center gap-2 text-sm text-cream/60">
          <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} className="rounded border-white/20 text-cherry focus:ring-cherry" />
          Whisper anonymously
        </label>
        {error && <p className="text-sm text-rose-300">{error}</p>}
        <div className="flex items-center justify-between">
          <span className="text-xs text-cream/40">{body.length}/280</span>
          <Button type="submit" variant="primary" size="sm" className="rounded-full" leftIcon={<Send className="h-4 w-4" />} disabled={sending || body.trim().length < 1}>
            {sending ? 'Whispering…' : 'Leave whisper'}
          </Button>
        </div>
      </form>
    </motion.aside>
  );
}
