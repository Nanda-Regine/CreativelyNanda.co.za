'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageCircle, Send, CheckCircle, User, ThumbsUp } from 'lucide-react';
import type { Testimonial } from '@/types/database';

interface ProductReviewsProps {
  slug: string;
  productName: string;
}

export function ProductReviews({ slug, productName }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    authorName: '',
    content: '',
    rating: 0,
  });

  useEffect(() => {
    fetch(`/api/products/${slug}/review`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setReviews(data);
      })
      .catch(console.error);
  }, [slug]);

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percent: reviews.length > 0
      ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100
      : 0,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.rating === 0) {
      setError('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/products/${slug}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      // Add the new review to the list immediately
      if (data.review) {
        setReviews((prev) => [data.review, ...prev]);
      }

      setSubmitted(true);
      setFormData({ authorName: '', content: '', rating: 0 });
      setTimeout(() => {
        setSubmitted(false);
        setIsFormOpen(false);
      }, 3000);
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
    <section className="py-20 px-6 bg-gradient-to-b from-cream to-parchment">
      <div className="max-w-4xl mx-auto">
        {/* Header with aggregate rating */}
        <div className="flex flex-col md:flex-row md:items-start gap-8 mb-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-display font-bold text-navy mb-2">
              Customer Reviews
            </h2>
            <p className="text-navy/50">
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} for {productName}
            </p>
          </div>

          {reviews.length > 0 && (
            <div className="flex items-center gap-6 md:ml-auto">
              {/* Big average */}
              <div className="text-center">
                <p className="text-4xl font-bold text-navy">{avgRating.toFixed(1)}</p>
                <div className="flex gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(avgRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-navy/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Distribution bars */}
              <div className="space-y-1">
                {ratingDistribution.map(({ star, count, percent }) => (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-3 text-navy/50">{star}</span>
                    <div className="w-24 h-2 bg-navy/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-4 text-navy/40">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Write review button */}
        {!isFormOpen && (
          <motion.button
            onClick={() => setIsFormOpen(true)}
            className="mb-8 px-6 py-3 bg-cherry text-white rounded-full font-medium hover:bg-cherry-dark transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Write a Review
          </motion.button>
        )}

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
                className="bg-white rounded-2xl p-6 shadow-sm border border-navy/5"
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
                      Review Published!
                    </h4>
                    <p className="text-navy/60 text-sm">
                      Thank you for sharing your experience.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Rating */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-navy/70 mb-2">
                        Your Rating *
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, rating: star })
                            }
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-8 h-8 transition-colors ${
                                star <= formData.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-navy/20 hover:text-amber-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div className="mb-4">
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
                        className="w-full px-4 py-2.5 bg-parchment/50 rounded-lg border border-navy/10 focus:border-cherry/50 focus:ring-2 focus:ring-cherry/10 outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-navy/70 mb-1.5">
                        Your Review *
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
                        className="w-full px-4 py-2.5 bg-parchment/50 rounded-lg border border-navy/10 focus:border-cherry/50 focus:ring-2 focus:ring-cherry/10 outline-none transition-all resize-none"
                        placeholder="How has this product helped you? What do you love about it?"
                      />
                      <p className="text-xs text-navy/40 mt-1">
                        {formData.content.length}/1000
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
                            Publish Review
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
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-navy/5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cherry/20 to-pink-200 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-cherry" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h4 className="font-medium text-navy">{review.author_name}</h4>
                      <p className="text-xs text-navy/40">{formatDate(review.created_at)}</p>
                    </div>
                    {review.rating && (
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-navy/10'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    <p className="text-navy/70 leading-relaxed">{review.content}</p>
                    {review.is_featured && (
                      <span className="inline-flex items-center gap-1 mt-3 px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">
                        <ThumbsUp className="w-3 h-3" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          !isFormOpen && (
            <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-navy/10">
              <MessageCircle className="w-10 h-10 text-navy/20 mx-auto mb-3" />
              <p className="text-navy/50 mb-4">No reviews yet. Be the first!</p>
              <motion.button
                onClick={() => setIsFormOpen(true)}
                className="px-4 py-2 bg-navy/5 text-navy/70 rounded-full text-sm hover:bg-navy/10 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                Write a Review
              </motion.button>
            </div>
          )
        )}
      </div>
    </section>
  );
}
