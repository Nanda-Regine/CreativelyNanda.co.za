'use client';

import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { useSessionId } from '@/hooks/useSessionId';

interface ProductViewCounterProps {
  slug: string;
  initialViewCount?: number;
  variant?: 'default' | 'compact' | 'badge';
}

export function ProductViewCounter({
  slug,
  initialViewCount = 0,
  variant = 'default',
}: ProductViewCounterProps) {
  const sessionId = useSessionId();
  const [viewCount, setViewCount] = useState(initialViewCount);
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    if (!sessionId || hasTracked) return;

    fetch(`/api/products/${slug}/view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.viewCount !== undefined) setViewCount(data.viewCount);
        setHasTracked(true);
      })
      .catch(console.error);
  }, [slug, sessionId, hasTracked]);

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  if (variant === 'compact') {
    return (
      <span className="flex items-center gap-1 text-sm text-white/60">
        <Eye className="w-4 h-4" />
        {formatCount(viewCount)}
      </span>
    );
  }

  if (variant === 'badge') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/70">
        <Eye className="w-3.5 h-3.5" />
        {formatCount(viewCount)} views
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5 text-white/60">
      <Eye className="w-4 h-4" />
      <span className="text-sm">{formatCount(viewCount)} views</span>
    </span>
  );
}
