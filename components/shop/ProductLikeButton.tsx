'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useSessionId } from '@/hooks/useSessionId';

interface ProductLikeButtonProps {
  slug: string;
  initialLikeCount?: number;
  variant?: 'default' | 'floating';
}

export function ProductLikeButton({
  slug,
  initialLikeCount = 0,
  variant = 'default',
}: ProductLikeButtonProps) {
  const sessionId = useSessionId();
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    fetch(`/api/products/${slug}/like?sessionId=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setHasLiked(data.hasLiked);
        if (data.likeCount !== undefined) setLikeCount(data.likeCount);
      })
      .catch(console.error);
  }, [slug, sessionId]);

  const handleLike = async () => {
    if (!sessionId || isLoading) return;
    setIsLoading(true);

    try {
      if (hasLiked) {
        const res = await fetch(`/api/products/${slug}/like`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        setLikeCount(data.likeCount);
        setHasLiked(false);
      } else {
        const res = await fetch(`/api/products/${slug}/like`, {
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

  if (variant === 'floating') {
    return (
      <motion.button
        onClick={handleLike}
        disabled={isLoading || !sessionId}
        className={`relative p-4 rounded-full transition-all ${
          hasLiked
            ? 'bg-cherry/20 text-cherry'
            : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
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
          className={`w-5 h-5 transition-all ${
            hasLiked ? 'fill-cherry text-cherry' : ''
          }`}
        />
        {likeCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center px-1 text-[10px] font-bold bg-cherry text-white rounded-full">
            {likeCount}
          </span>
        )}
      </motion.button>
    );
  }

  // Default variant
  return (
    <motion.button
      onClick={handleLike}
      disabled={isLoading || !sessionId}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
        hasLiked
          ? 'bg-cherry/10 text-cherry border border-cherry/20'
          : 'bg-navy/5 text-navy/70 hover:bg-navy/10 border border-transparent'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Heart
        className={`w-4 h-4 transition-all ${
          hasLiked ? 'fill-cherry text-cherry' : ''
        }`}
      />
      <span>{likeCount}</span>
    </motion.button>
  );
}
