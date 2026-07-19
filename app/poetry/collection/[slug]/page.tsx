'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui';
import {
  getPoemBySlug,
  getRelatedPoems,
  CATEGORIES,
  getMoodKeyForPoem,
  getMood,
} from '@/lib/poems-data';
import PoemAudio from '@/components/poetry/PoemAudio';
import ShareLineCard from '@/components/poetry/ShareLineCard';
import { RoseCard } from '@/components/poetry/RoseCard';
import { useMood } from '@/components/poetry/MoodProvider';
import { useSessionId } from '@/hooks/useSessionId';
import {
  ArrowLeft,
  Heart,
  Share2,
  BookOpen,
  Volume2,
  VolumeX,
  Bookmark,
  Send,
  Star,
  User,
  CheckCircle,
  Flower2,
  Quote,
} from 'lucide-react';

interface Rose {
  id: string;
  content: string;
  author_name: string | null;
  is_anonymous: boolean;
  status: string;
  created_at: string;
}

export default function PoemReader() {
  const params = useParams();
  const slug = params.slug as string;
  const sessionId = useSessionId();
  const { setMood } = useMood();

  const poem = getPoemBySlug(slug);
  const relatedPoems = getRelatedPoems(slug, 3);

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showLineCard, setShowLineCard] = useState(false);
  const [roses, setRoses] = useState<Rose[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newRose, setNewRose] = useState({ name: '', content: '', isAnonymous: false });
  const [showHearts, setShowHearts] = useState(false);

  // Entering a poem washes the whole garden into that poem's feeling.
  useEffect(() => {
    if (poem) setMood(getMoodKeyForPoem(poem));
  }, [poem, setMood]);

  // Load hearts + roses from Supabase; saves stay on-device.
  useEffect(() => {
    if (!poem || !sessionId) return;

    fetch(`/api/poetry/poems/${slug}/heart?sessionId=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLiked(data.hasHearted);
        if (data.heartCount !== undefined) setLikes(data.heartCount);
      })
      .catch(console.error);

    fetch(`/api/poetry/poems/${slug}/rose`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRoses(data);
      })
      .catch(console.error);

    const savedPoems = JSON.parse(localStorage.getItem('savedPoems') || '[]');
    setIsSaved(savedPoems.includes(slug));
  }, [slug, poem, sessionId]);

  if (!poem) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cream">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-cream/20 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold mb-4">Poem not found</h1>
          <Link href="/poetry/collection">
            <Button variant="primary" className="rounded-full">Browse Collection</Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = CATEGORIES.find((c) => c.name === poem.category);
  const moodKey = getMoodKeyForPoem(poem);
  const mood = getMood(moodKey);

  const handleLike = async () => {
    if (!sessionId) return;
    try {
      if (isLiked) {
        const res = await fetch(`/api/poetry/poems/${slug}/heart`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        setLikes(data.heartCount);
        setIsLiked(false);
      } else {
        const res = await fetch(`/api/poetry/poems/${slug}/heart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        setLikes(data.heartCount);
        setIsLiked(true);
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 1000);
      }
    } catch (error) {
      console.error('Error toggling heart:', error);
    }
  };

  const handleSave = () => {
    const savedPoems = JSON.parse(localStorage.getItem('savedPoems') || '[]');
    if (isSaved) {
      localStorage.setItem('savedPoems', JSON.stringify(savedPoems.filter((s: string) => s !== slug)));
    } else {
      localStorage.setItem('savedPoems', JSON.stringify([...savedPoems, slug]));
    }
    setIsSaved(!isSaved);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: poem.title,
          text: `Read "${poem.title}" from Inside Her Roses by Nanda Regine`,
          url: window.location.href,
        });
        return;
      } catch {
        /* fall through */
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      setShowShareMenu(!showShareMenu);
    }
  };

  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(poem.content);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.onend = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const handleSubmitRose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRose.content) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/poetry/poems/${slug}/rose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newRose.content,
          authorName: newRose.isAnonymous ? null : newRose.name,
          isAnonymous: newRose.isAnonymous,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setNewRose({ name: '', content: '', isAnonymous: false });
        fetch(`/api/poetry/poems/${slug}/rose`)
          .then((r) => r.json())
          .then((data) => { if (Array.isArray(data)) setRoses(data); })
          .catch(() => {});
        setTimeout(() => { setSubmitted(false); setShowReviewForm(false); }, 2000);
      }
    } catch (error) {
      console.error('Error submitting rose:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const accent = mood?.wash ?? '#8B1A2F';

  return (
    <div className="min-h-screen text-cream">
      {/* Header */}
      <section className="relative pt-24 pb-6 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
            <Link
              href="/poetry/collection"
              className="inline-flex items-center gap-2 text-cream/55 hover:text-cherry transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to the garden
            </Link>
          </motion.div>

          {/* Mood + category kicker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-lg">{mood?.emoji ?? categoryInfo?.icon}</span>
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: '#C9A84C' }}
            >
              {mood?.label ?? poem.category} · {poem.category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl md:text-6xl font-bold leading-[1.02] mb-5"
            style={{ color: '#F5EFD6' }}
          >
            {poem.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 text-cream/55 text-sm"
          >
            <span className="font-display italic text-base text-cream/85">Nanda Regine</span>
            <span className="w-1 h-1 bg-cream/30 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-cherry text-cherry' : ''}`} />
              {likes} {likes === 1 ? 'heart' : 'hearts'}
            </span>
            <span className="w-1 h-1 bg-cream/30 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Flower2 className="w-4 h-4 text-cherry" />
              {roses.length} {roses.length === 1 ? 'rose' : 'roses'}
            </span>
          </motion.div>

          {/* Enter the Reading Room — the immersive layer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-7"
          >
            <Link
              href={`/poetry/collection/${slug}/room`}
              className="group inline-flex items-center gap-3 rounded-full border px-6 py-3 transition-all hover:-translate-y-0.5"
              style={{ borderColor: `${accent}88`, background: `${accent}1a` }}
            >
              <span className="text-lg">🌙</span>
              <span className="font-display text-lg" style={{ color: '#F5EFD6' }}>
                Enter the Reading Room
              </span>
              <span className="text-cream/50 text-sm group-hover:text-cream/80 transition-colors">
                read it in your own breath &rarr;
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Action bar — dark glass, sticky under the nav */}
      <section className="sticky top-20 z-40 bg-[#0b1029]/80 backdrop-blur border-y border-white/10">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`p-2 rounded-full transition-colors ${isLiked ? 'bg-cherry/20 text-cherry' : 'hover:bg-white/10 text-cream/60'}`}
                title={isLiked ? 'Remove heart' : 'Give heart'}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-cherry' : ''}`} />
              </motion.button>
              <AnimatePresence>
                {showHearts && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-0 left-1/2 pointer-events-none"
                        initial={{ opacity: 1, scale: 0.5, y: 0, x: '-50%' }}
                        animate={{ opacity: 0, scale: 1.2, y: -40, x: `calc(-50% + ${(i - 2) * 12}px)` }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                      >
                        <Heart className="w-4 h-4 fill-cherry text-cherry" />
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
              className={`p-2 rounded-full transition-colors ${isSaved ? 'bg-gold/20 text-gold' : 'hover:bg-white/10 text-cream/60'}`}
              title={isSaved ? 'Remove from your garden' : 'Plant in your garden'}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-gold' : ''}`} />
            </motion.button>

            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className={`p-2 rounded-full transition-colors ${shareCopied ? 'bg-emerald-500/20 text-emerald-300' : 'hover:bg-white/10 text-cream/60'}`}
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
              {shareCopied && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-cream text-navy text-xs rounded-lg whitespace-nowrap shadow-lg"
                >
                  Link copied!
                </motion.div>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowLineCard(true)}
              className="p-2 rounded-full transition-colors hover:bg-cherry/20 text-cream/60"
              title="Share a line as art"
            >
              <Quote className="w-5 h-5" />
            </motion.button>
          </div>

          <Button
            variant={isReading ? 'secondary' : 'outline'}
            size="sm"
            className="rounded-full border-cream/25 text-cream hover:bg-cream hover:text-navy"
            leftIcon={isReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            onClick={handleReadAloud}
          >
            {isReading ? 'Stop' : 'Listen'}
          </Button>
        </div>
      </section>

      {/* Nanda's own voice — only when a recording exists */}
      {poem.audioUrl && (
        <div className="max-w-3xl mx-auto px-6 mt-8">
          <PoemAudio src={poem.audioUrl} title={poem.title} />
        </div>
      )}

      {/* A painting paired with this poem — only when one exists */}
      {poem.paintingSrc && (
        <div className="max-w-2xl mx-auto px-6 mt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poem.paintingSrc}
            alt={`A painting paired with "${poem.title}"`}
            className="w-full rounded-[1.75rem] border border-white/10 shadow-2xl"
          />
        </div>
      )}

      {/* The poem */}
      <section className="py-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.05] backdrop-blur-xl p-8 md:p-12 shadow-2xl">
            {/* mood accent seam */}
            <span
              className="absolute left-8 top-0 h-1 w-16 rounded-full"
              style={{ background: accent }}
            />
            {poem.content.split('\n\n').map((stanza, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="whitespace-pre-line leading-relaxed mb-8 font-serif text-lg md:text-xl text-cream/85"
              >
                {stanza}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-white/10 text-right"
            >
              <p className="font-display text-2xl italic" style={{ color: '#C9A84C' }}>— Nanda Regine</p>
              <p className="text-cream/40 text-sm mt-1">From &ldquo;Inside Her Roses&rdquo;</p>
            </motion.div>
          </div>

          {/* The story behind this one — intimate, confided */}
          {poem.backstory && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 rounded-[1.75rem] border border-white/10 bg-[#0d1330]/70 px-8 py-7"
              style={{ borderLeft: `3px solid ${accent}` }}
            >
              <div className="flex items-center gap-2 mb-3" style={{ color: '#C9A84C' }}>
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-[0.25em]">The story behind this one</span>
              </div>
              <p className="text-cream/75 leading-relaxed font-display italic text-lg md:text-xl">
                {poem.backstory}
              </p>
            </motion.div>
          )}

          {/* Mother-tongue versions — only when a translation exists */}
          {poem.translations && poem.translations.length > 0 && (
            <div className="mt-6 space-y-4">
              {poem.translations.map((t, i) => (
                <details
                  key={i}
                  className="rounded-[1.5rem] border border-white/10 bg-[#0d1330]/70 overflow-hidden group"
                >
                  <summary className="cursor-pointer list-none px-8 py-5 flex items-center justify-between text-cream hover:text-cherry transition-colors">
                    <span className="font-display text-lg italic">{t.label}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-cream/40 font-mono">{t.lang}</span>
                  </summary>
                  <p className="whitespace-pre-line text-cream/80 leading-relaxed px-8 pb-8 font-serif text-lg md:text-xl">
                    {t.content}
                  </p>
                </details>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Carve your own from this poem */}
      <div className="max-w-2xl mx-auto px-6 -mt-2 mb-6 text-center">
        <Link href={`/poetry/erasure?poem=${poem.slug}`} className="text-cream/55 hover:text-cherry text-sm transition-colors">
          ✂️ Carve your own poem from this one in the Erasure Studio &rarr;
        </Link>
      </div>

      {/* Share-a-line-as-art modal */}
      <ShareLineCard poem={poem} open={showLineCard} onClose={() => setShowLineCard(false)} />

      {/* Roses (reviews) */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2" style={{ color: '#F5EFD6' }}>
              <Flower2 className="w-6 h-6 text-cherry" />
              Roses ({roses.length})
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-cream/25 text-cream hover:bg-cherry hover:text-white hover:border-cherry"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              Leave a Rose
            </Button>
          </div>

          <AnimatePresence>
            {showReviewForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmitRose}
                className="rounded-2xl border border-white/10 bg-[#0d1330]/80 p-6 mb-8 overflow-hidden"
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-6 text-center"
                  >
                    <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-7 h-7 text-emerald-300" />
                    </div>
                    <h4 className="font-display font-semibold mb-2 text-cream">Thank you for your rose!</h4>
                    <p className="text-cream/60 text-sm">Your rose has been added below.</p>
                  </motion.div>
                ) : (
                  <>
                    {!newRose.isAnonymous && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-cream/80 mb-2">Your name</label>
                        <input
                          type="text"
                          value={newRose.name}
                          onChange={(e) => setNewRose({ ...newRose, name: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/15 rounded-xl text-cream placeholder:text-cream/30 focus:outline-none focus:border-cherry/60"
                          placeholder="Enter your name"
                        />
                      </div>
                    )}

                    <div className="mb-4">
                      <label className="flex items-center gap-2 text-sm text-cream/60 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newRose.isAnonymous}
                          onChange={(e) => setNewRose({ ...newRose, isAnonymous: e.target.checked })}
                          className="rounded border-white/20 text-cherry focus:ring-cherry"
                        />
                        Leave it anonymously
                      </label>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-cream/80 mb-2">Your rose</label>
                      <textarea
                        value={newRose.content}
                        onChange={(e) => setNewRose({ ...newRose, content: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/15 rounded-xl text-cream placeholder:text-cream/30 focus:outline-none focus:border-cherry/60 resize-none"
                        rows={3}
                        placeholder="Share what this poem stirred in you…"
                        required
                        maxLength={500}
                      />
                      <p className="text-xs text-cream/40 mt-1">{newRose.content.length}/500</p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        variant="primary"
                        className="rounded-full"
                        leftIcon={<Send className="w-4 h-4" />}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending…' : 'Send Rose'}
                      </Button>
                      <Button type="button" variant="ghost" className="text-cream/70 hover:text-cream" onClick={() => setShowReviewForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </motion.form>
            )}
          </AnimatePresence>

          {roses.length > 0 ? (
            <div className="space-y-4">
              {roses.map((rose, index) => (
                <motion.div
                  key={rose.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-cherry/15 rounded-full flex items-center justify-center flex-shrink-0">
                      {rose.is_anonymous ? <Flower2 className="w-5 h-5 text-cherry" /> : <User className="w-5 h-5 text-cherry" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-cream">
                          {rose.is_anonymous ? 'Anonymous' : rose.author_name || 'A Reader'}
                        </p>
                        {rose.status === 'featured' && (
                          <span className="px-2 py-0.5 bg-cherry/15 text-cherry text-xs rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" /> Featured
                          </span>
                        )}
                      </div>
                      <p className="text-cream/70">{rose.content}</p>
                      <p className="text-xs text-cream/40 mt-2">
                        {new Date(rose.created_at).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-cream/40">
              <Flower2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No roses yet. Be the first to leave one.</p>
            </div>
          )}
        </div>
      </section>

      {/* Related poems */}
      {relatedPoems.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: '#C9A84C' }}>
                More that meet you here
              </span>
              <div className="flex-1 h-px bg-cream/15" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedPoems.map((related, index) => (
                <RoseCard key={related.slug} poem={related} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto text-center rounded-[2rem] border border-white/10 bg-[#0d1330]/60 py-12 px-6">
          <p className="font-display italic text-2xl text-cream/80 mb-6">
            If this one found you, the book holds the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className="rounded-full bg-cherry text-white hover:bg-cherry-dark"
              onClick={() => window.open('https://books2read.com/Nrkk-insideherroses', '_blank')}
            >
              Get the Book
            </Button>
            <Link href="/poetry/collection">
              <Button variant="outline" className="rounded-full border-cream/25 text-cream hover:bg-cream hover:text-navy">
                Back to the garden
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
