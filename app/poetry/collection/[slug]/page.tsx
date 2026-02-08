'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button, Badge } from '@/components/ui';
import { getPoemBySlug, getRelatedPoems, CATEGORIES, type Poem } from '@/lib/poems-data';
import { RoseCard } from '@/components/poetry/RoseCard';
import { useSessionId } from '@/hooks/useSessionId';
import {
  ArrowLeft,
  Heart,
  Share2,
  BookOpen,
  Volume2,
  VolumeX,
  Bookmark,
  MessageCircle,
  Send,
  Star,
  User,
  CheckCircle,
  Flower2,
} from 'lucide-react';

// Rose outline background for poem reader
const RoseBackground = () => (
  <svg
    viewBox="0 0 400 400"
    className="absolute top-0 right-0 w-[600px] h-[600px] text-cherry opacity-[0.03] -translate-y-1/4 translate-x-1/4"
    fill="none"
  >
    <path
      d="M200 40 C120 40, 60 100, 60 180 C60 260, 120 320, 200 360 C280 320, 340 260, 340 180 C340 100, 280 40, 200 40"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M200 70 C140 70, 90 120, 90 190 C90 260, 140 310, 200 340 C260 310, 310 260, 310 190 C310 120, 260 70, 200 70"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M200 100 C160 100, 120 140, 120 200 C120 260, 160 300, 200 320 C240 300, 280 260, 280 200 C280 140, 240 100, 200 100"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

// Category colors
const categoryColors: Record<string, { bg: string; text: string }> = {
  Romance: { bg: 'from-pink-50 to-rose-100', text: 'text-pink-600' },
  Sensual: { bg: 'from-red-50 to-rose-100', text: 'text-red-500' },
  Life: { bg: 'from-emerald-50 to-green-100', text: 'text-emerald-600' },
  Personal: { bg: 'from-purple-50 to-violet-100', text: 'text-purple-600' },
  Depth: { bg: 'from-blue-50 to-indigo-100', text: 'text-blue-600' },
  Empowering: { bg: 'from-amber-50 to-yellow-100', text: 'text-amber-600' },
};

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

  // Get poem from local data (for now - can migrate to Supabase later)
  const poem = getPoemBySlug(slug);
  const relatedPoems = getRelatedPoems(slug, 3);

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [roses, setRoses] = useState<Rose[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newRose, setNewRose] = useState({ name: '', content: '', isAnonymous: false });
  const [showHearts, setShowHearts] = useState(false);

  // Load data from Supabase
  useEffect(() => {
    if (!poem || !sessionId) return;

    // Check if user has hearted this poem
    fetch(`/api/poetry/poems/${slug}/heart?sessionId=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        setIsLiked(data.hasHearted);
        if (data.heartCount !== undefined) {
          setLikes(data.heartCount);
        }
      })
      .catch(console.error);

    // Load roses (reviews)
    fetch(`/api/poetry/poems/${slug}/rose`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRoses(data);
        }
      })
      .catch(console.error);

    // Check if saved (still using localStorage for saves - personal feature)
    const savedPoems = JSON.parse(localStorage.getItem('savedPoems') || '[]');
    setIsSaved(savedPoems.includes(slug));
  }, [slug, poem, sessionId]);

  if (!poem) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-navy/20 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-navy mb-4">Poem not found</h1>
          <Link href="/poetry/collection">
            <Button variant="primary" className="rounded-full">
              Browse Collection
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const colors = categoryColors[poem.category] || categoryColors.Romance;
  const categoryInfo = CATEGORIES.find((c) => c.name === poem.category);

  const handleLike = async () => {
    if (!sessionId) return;

    try {
      if (isLiked) {
        // Unlike
        const res = await fetch(`/api/poetry/poems/${slug}/heart`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        setLikes(data.heartCount);
        setIsLiked(false);
      } else {
        // Like
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
      const updated = savedPoems.filter((s: string) => s !== slug);
      localStorage.setItem('savedPoems', JSON.stringify(updated));
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
      } catch {
        setShowShareMenu(!showShareMenu);
      }
    } else {
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
        setTimeout(() => {
          setSubmitted(false);
          setShowReviewForm(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting rose:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg}`}>
      {/* Rose background */}
      <RoseBackground />

      {/* Header */}
      <section className="relative pt-28 pb-8 px-6">
        <div className="max-w-3xl mx-auto relative z-10">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/poetry/collection"
              className="inline-flex items-center gap-2 text-navy/60 hover:text-cherry transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Collection
            </Link>
          </motion.div>

          {/* Category */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-2xl">{categoryInfo?.icon}</span>
            <Badge variant="secondary" className={colors.text}>
              {poem.category}
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-4"
          >
            {poem.title}
          </motion.h1>

          {/* Author & stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 text-navy/60"
          >
            <span className="font-medium text-navy">Nanda Regine</span>
            <span className="w-1 h-1 bg-navy/30 rounded-full" />
            <span className="flex items-center gap-1">
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-cherry text-cherry' : ''}`} />
              {likes} {likes === 1 ? 'heart' : 'hearts'}
            </span>
            <span className="w-1 h-1 bg-navy/30 rounded-full" />
            <span className="flex items-center gap-1">
              <Flower2 className="w-4 h-4 text-cherry" />
              {roses.length} {roses.length === 1 ? 'rose' : 'roses'}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Action Bar */}
      <section className="sticky top-[72px] z-40 bg-white/90 backdrop-blur border-b border-navy/10 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`p-2 rounded-full transition-colors ${
                  isLiked ? 'bg-cherry/10 text-cherry' : 'hover:bg-navy/5 text-navy/60'
                }`}
                title={isLiked ? 'Remove heart' : 'Give heart'}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-cherry' : ''}`} />
              </motion.button>

              {/* Floating hearts animation */}
              <AnimatePresence>
                {showHearts && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-0 left-1/2"
                        initial={{ opacity: 1, scale: 0.5, y: 0, x: '-50%' }}
                        animate={{
                          opacity: 0,
                          scale: 1.2,
                          y: -40,
                          x: `calc(-50% + ${(i - 2) * 12}px)`,
                        }}
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
              className={`p-2 rounded-full transition-colors ${
                isSaved ? 'bg-gold/10 text-gold' : 'hover:bg-navy/5 text-navy/60'
              }`}
              title={isSaved ? 'Unsave' : 'Save'}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-gold' : ''}`} />
            </motion.button>
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-navy/5 text-navy/60 transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
              {showShareMenu && (
                <div className="absolute top-full left-0 mt-2 py-2 px-3 bg-white rounded-xl shadow-lg border border-navy/10 text-sm z-50">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setShowShareMenu(false);
                    }}
                    className="block w-full text-left py-1 text-navy hover:text-cherry whitespace-nowrap"
                  >
                    Copy link
                  </button>
                </div>
              )}
            </div>
          </div>

          <Button
            variant={isReading ? 'secondary' : 'outline'}
            size="sm"
            className="rounded-full"
            leftIcon={isReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            onClick={handleReadAloud}
          >
            {isReading ? 'Stop' : 'Listen'}
          </Button>
        </div>
      </section>

      {/* Poem Content */}
      <section className="py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/60 backdrop-blur p-8 md:p-12 rounded-3xl shadow-sm">
            {poem.content.split('\n\n').map((stanza, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="whitespace-pre-line text-navy/80 leading-relaxed mb-8 font-serif text-lg md:text-xl"
              >
                {stanza}
              </motion.p>
            ))}

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-navy/10 text-right"
            >
              <p className="font-display text-2xl text-cherry italic">— Nanda Regine</p>
              <p className="text-navy/40 text-sm mt-1">From "Inside Her Roses"</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Roses (Reviews) Section */}
      <section className="py-12 px-6 bg-white/50">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-navy flex items-center gap-2">
              <Flower2 className="w-6 h-6 text-cherry" />
              Roses ({roses.length})
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              Leave a Rose
            </Button>
          </div>

          {/* Rose Form */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmitRose}
                className="bg-white p-6 rounded-2xl shadow-sm mb-8 overflow-hidden"
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-6 text-center"
                  >
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                    <h4 className="font-display font-semibold text-navy mb-2">
                      Thank you for your rose!
                    </h4>
                    <p className="text-navy/60 text-sm">
                      It will appear once approved.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {!newRose.isAnonymous && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-navy mb-2">Your Name</label>
                        <input
                          type="text"
                          value={newRose.name}
                          onChange={(e) => setNewRose({ ...newRose, name: e.target.value })}
                          className="w-full px-4 py-2 border border-navy/10 rounded-xl focus:outline-none focus:border-cherry/50"
                          placeholder="Enter your name"
                        />
                      </div>
                    )}

                    <div className="mb-4">
                      <label className="flex items-center gap-2 text-sm text-navy/60 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newRose.isAnonymous}
                          onChange={(e) => setNewRose({ ...newRose, isAnonymous: e.target.checked })}
                          className="rounded border-navy/20 text-cherry focus:ring-cherry"
                        />
                        Post anonymously
                      </label>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-navy mb-2">Your Rose</label>
                      <textarea
                        value={newRose.content}
                        onChange={(e) => setNewRose({ ...newRose, content: e.target.value })}
                        className="w-full px-4 py-2 border border-navy/10 rounded-xl focus:outline-none focus:border-cherry/50 resize-none"
                        rows={3}
                        placeholder="Share what this poem means to you..."
                        required
                        maxLength={500}
                      />
                      <p className="text-xs text-navy/40 mt-1">{newRose.content.length}/500</p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        variant="primary"
                        className="rounded-full"
                        leftIcon={<Flower2 className="w-4 h-4" />}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Rose'}
                      </Button>
                      <Button type="button" variant="ghost" onClick={() => setShowReviewForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </motion.form>
            )}
          </AnimatePresence>

          {/* Roses List */}
          {roses.length > 0 ? (
            <div className="space-y-4">
              {roses.map((rose, index) => (
                <motion.div
                  key={rose.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-5 rounded-xl shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-cherry/10 rounded-full flex items-center justify-center flex-shrink-0">
                      {rose.is_anonymous ? (
                        <Flower2 className="w-5 h-5 text-cherry" />
                      ) : (
                        <User className="w-5 h-5 text-cherry" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-navy">
                          {rose.is_anonymous ? 'Anonymous' : rose.author_name || 'A Reader'}
                        </p>
                        {rose.status === 'featured' && (
                          <span className="px-2 py-0.5 bg-cherry/10 text-cherry text-xs rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-navy/70">{rose.content}</p>
                      <p className="text-xs text-navy/40 mt-2">
                        {new Date(rose.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-navy/40">
              <Flower2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No roses yet. Be the first to leave one!</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Poems */}
      {relatedPoems.length > 0 && (
        <section className="py-12 px-6 bg-navy">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-beige mb-8">
              More {poem.category} Poems
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {relatedPoems.map((related, index) => (
                <RoseCard key={related.slug} poem={related} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 px-6 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-navy/60 mb-4">Enjoying the poetry?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/poetry/collection">
              <Button variant="primary" className="rounded-full">
                Browse All Poems
              </Button>
            </Link>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => window.open('https://books2read.com/Nrkk-insideherroses', '_blank')}
            >
              Get the Book
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
