'use client';

import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { useSessionId } from '@/hooks/useSessionId';

interface ViewCounterProps {
  slug: string;
  initialViewCount?: number;
  variant?: 'default' | 'compact' | 'badge';
}

export function ViewCounter({
  slug,
  initialViewCount = 0,
  variant = 'default',
}: ViewCounterProps) {
  const sessionId = useSessionId();
  const [viewCount, setViewCount] = useState(initialViewCount);
  const [hasTracked, setHasTracked] = useState(false);

  // Track view on mount
  useEffect(() => {
    if (!sessionId || hasTracked) return;

    fetch(`/api/blog/posts/${slug}/view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.viewCount !== undefined) {
          setViewCount(data.viewCount);
        }
        setHasTracked(true);
      })
      .catch(console.error);
  }, [slug, sessionId, hasTracked]);

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (variant === 'compact') {
    return (
      <span className="flex items-center gap-1 text-sm text-navy/50">
        <Eye className="w-4 h-4" />
        {formatCount(viewCount)}
      </span>
    );
  }

  if (variant === 'badge') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-navy/5 rounded-full text-xs text-navy/60">
        <Eye className="w-3.5 h-3.5" />
        {formatCount(viewCount)} views
      </span>
    );
  }

  // Default variant
  return (
    <span className="flex items-center gap-1.5 text-navy/50">
      <Eye className="w-4 h-4" />
      <span className="text-sm">{formatCount(viewCount)} views</span>
    </span>
  );
}
