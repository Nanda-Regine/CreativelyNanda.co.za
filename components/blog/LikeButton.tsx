'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useSessionId } from '@/hooks/useSessionId';

interface LikeButtonProps {
  slug: string;
  initialLikeCount?: number;
  variant?: 'default' | 'compact' | 'floating';
}

export function LikeButton({
  slug,
  initialLikeCount = 0,
  variant = 'default',
}: LikeButtonProps) {
  const sessionId = useSessionId();
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  // Check if user has already liked
  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/blog/posts/${slug}/like?sessionId=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setHasLiked(data.hasLiked);
        if (data.likeCount !== undefined) {
          setLikeCount(data.likeCount);
        }
      })
      .catch(console.error);
  }, [slug, sessionId]);

  const handleLike = async () => {
    if (!sessionId || isLoading) return;

    setIsLoading(true);

    try {
      if (hasLiked) {
        // Unlike
        const res = await fetch(`/api/blog/posts/${slug}/like`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        setLikeCount(data.likeCount);
        setHasLiked(false);
      } else {
        // Like
        const res = await fetch(`/api/blog/posts/${slug}/like`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        setLikeCount(data.likeCount);
        setHasLiked(true);
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 1000);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleLike}
        disabled={isLoading || !sessionId}
        className="flex items-center gap-1.5 text-sm text-navy/60 hover:text-cherry transition-colors disabled:opacity-50"
      >
        <Heart
          className={`w-4 h-4 transition-all ${
            hasLiked ? 'fill-cherry text-cherry scale-110' : ''
          }`}
        />
        <span>{likeCount}</span>
      </button>
    );
  }

  if (variant === 'floating') {
    return (
      <motion.button
        onClick={handleLike}
        disabled={isLoading || !sessionId}
        className={`relative flex flex-col items-center gap-1 p-3 rounded-full transition-all ${
          hasLiked
            ? 'bg-cherry/10 text-cherry'
            : 'bg-navy/5 text-navy/60 hover:bg-navy/10'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence>
          {showHearts && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ opacity: 1, scale: 0.5, y: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 1.5,
                    y: -40,
                    x: (i - 2) * 15,
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

        <Heart
          className={`w-6 h-6 transition-all ${
            hasLiked ? 'fill-cherry text-cherry' : ''
          }`}
        />
        <span className="text-xs font-medium">{likeCount}</span>
      </motion.button>
    );
  }

  // Default variant
  return (
    <motion.button
      onClick={handleLike}
      disabled={isLoading || !sessionId}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
        hasLiked
          ? 'bg-cherry/10 text-cherry border border-cherry/20'
          : 'bg-navy/5 text-navy/70 hover:bg-navy/10 border border-transparent'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence>
        {showHearts && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-4"
                initial={{ opacity: 1, scale: 0.5, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1.2,
                  y: -30,
                  x: (i - 1) * 10,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Heart className="w-3 h-3 fill-cherry text-cherry" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      <Heart
        className={`w-5 h-5 transition-all ${
          hasLiked ? 'fill-cherry text-cherry' : ''
        }`}
      />
      <span>{hasLiked ? 'Loved' : 'Love this'}</span>
      <span className="text-sm opacity-60">({likeCount})</span>
    </motion.button>
  );
}
