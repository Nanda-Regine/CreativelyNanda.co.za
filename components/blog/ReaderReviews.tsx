'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageCircle, Send, CheckCircle, User } from 'lucide-react';
import type { BlogReview } from '@/types/database';

interface ReaderReviewsProps {
  slug: string;
  initialReviews?: BlogReview[];
}

export function ReaderReviews({ slug, initialReviews = [] }: ReaderReviewsProps) {
  const [reviews, setReviews] = useState<BlogReview[]>(initialReviews);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    content: '',
    rating: 0,
  });

  // Fetch reviews on mount
  useEffect(() => {
    fetch(`/api/blog/posts/${slug}/review`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        }
      })
      .catch(console.error);
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/blog/posts/${slug}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setSubmitted(true);
      setFormData({ authorName: '', authorEmail: '', content: '', rating: 0 });
      // Reload reviews immediately so the new one appears
      fetch(`/api/blog/posts/${slug}/review`)
        .then(r => r.json())
        .then(d => { if (Array.isArray(d)) setReviews(d); })
        .catch(() => {});
      setTimeout(() => {
        setSubmitted(false);
        setIsFormOpen(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section className="mt-16 pt-12 border-t border-navy/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cherry/10 rounded-lg">
            <MessageCircle className="w-5 h-5 text-cherry" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-navy text-lg">
              Reader Insights
            </h3>
            <p className="text-sm text-navy/50">
              {reviews.length} {reviews.length === 1 ? 'response' : 'responses'}
            </p>
          </div>
        </div>

        {!isFormOpen && (
          <motion.button
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-2 bg-cherry text-white rounded-full text-sm font-medium hover:bg-cherry-dark transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Share Your Thoughts
          </motion.button>
        )}
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-cream to-beige/50 rounded-2xl p-6 border border-navy/5"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-display font-semibold text-navy mb-2">
                    Thank You!
                  </h4>
                  <p className="text-navy/60 text-sm">
                    Your insight is now live below!
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-navy/70 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.authorName}
                        onChange={(e) =>
                          setFormData({ ...formData, authorName: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-white rounded-lg border border-navy/10 focus:border-cherry/50 focus:ring-2 focus:ring-cherry/10 outline-none transition-all"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy/70 mb-1.5">
                        Email (optional)
                      </label>
                      <input
                        type="email"
                        value={formData.authorEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, authorEmail: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-white rounded-lg border border-navy/10 focus:border-cherry/50 focus:ring-2 focus:ring-cherry/10 outline-none transition-all"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-navy/70 mb-1.5">
                      Rating (optional)
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              rating: formData.rating === star ? 0 : star,
                            })
                          }
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              star <= formData.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-navy/20'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-navy/70 mb-1.5">
                      Your Thoughts *
                    </label>
                    <textarea
                      required
                      rows={4}
                      minLength={10}
                      maxLength={1000}
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white rounded-lg border border-navy/10 focus:border-cherry/50 focus:ring-2 focus:ring-cherry/10 outline-none transition-all resize-none"
                      placeholder="What did you think of this article? What resonated with you?"
                    />
                    <p className="text-xs text-navy/40 mt-1">
                      {formData.content.length}/1000 characters
                    </p>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-4 py-2.5 text-navy/60 hover:text-navy transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-2.5 bg-cherry text-white rounded-full font-medium hover:bg-cherry-dark transition-colors disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit
                        </>
                      )}
                    </motion.button>
                  </div>
                </>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-navy/5"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cherry/20 to-pink-200 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-cherry" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div>
                      <h4 className="font-medium text-navy">
                        {review.author_name}
                      </h4>
                      <p className="text-xs text-navy/40">
                        {formatDate(review.created_at)}
                      </p>
                    </div>
                    {review.rating && (
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating!
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-navy/10'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <p className="text-navy/70 leading-relaxed">{review.content}</p>

                  {/* Featured badge */}
                  {review.is_featured && (
                    <span className="inline-flex items-center gap-1 mt-3 px-2 py-1 bg-cherry/10 text-cherry text-xs rounded-full">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        !isFormOpen && (
          <div className="text-center py-12 bg-cream/50 rounded-2xl border border-dashed border-navy/10">
            <MessageCircle className="w-10 h-10 text-navy/20 mx-auto mb-3" />
            <p className="text-navy/50 mb-4">No insights yet. Be the first!</p>
            <motion.button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2 bg-navy/5 text-navy/70 rounded-full text-sm hover:bg-navy/10 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              Share Your Thoughts
            </motion.button>
          </div>
        )
      )}
    </section>
  );
}
