'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { contextImages, getContextFromPath } from './types';
import {
  getMessagesForPath,
  hasShownMessage,
  markMessageShown,
  type ProactiveMessage,
} from './ProactiveMessages';

interface NandaGirlProps {
  className?: string;
  onOpenChat?: (initialMessage?: string) => void;
}

// ─── Typing dots ─────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <span className="inline-flex gap-[3px] items-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-current"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}

export function NandaGirl({ className = '', onOpenChat }: NandaGirlProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  // Speech bubble state
  const [activeBubble, setActiveBubble] = useState<ProactiveMessage | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingMessages = useRef<ProactiveMessage[]>([]);
  const handledScrollIds = useRef(new Set<string>());

  const context = getContextFromPath(pathname);
  const imageData = contextImages[context];

  // ─── Show bubble with typing animation ──────────────────────────────────
  const showBubble = useCallback((msg: ProactiveMessage) => {
    if (hasShownMessage(msg.sessionKey)) return;
    markMessageShown(msg.sessionKey);

    setIsTyping(true);
    setActiveBubble(null);

    // Show typing for 1.2s then reveal message
    setTimeout(() => {
      setIsTyping(false);
      setActiveBubble(msg);

      // Auto-dismiss after 8 seconds
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
      dismissTimer.current = setTimeout(() => {
        setActiveBubble(null);
      }, 8000);
    }, 1200);
  }, []);

  // ─── Hydration ────────────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('nandaGirl-minimized');
    if (stored !== null) setIsMinimized(stored === 'true');

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ─── Reset + schedule messages when path changes ─────────────────────────
  useEffect(() => {
    if (!mounted) return;
    setActiveBubble(null);
    setIsTyping(false);
    handledScrollIds.current = new Set();

    const msgs = getMessagesForPath(pathname);
    pendingMessages.current = msgs;

    const timers: ReturnType<typeof setTimeout>[] = [];

    msgs
      .filter((m) => m.trigger === 'time' && !hasShownMessage(m.sessionKey))
      .forEach((msg) => {
        const t = setTimeout(() => showBubble(msg), msg.triggerValue * 1000);
        timers.push(t);
      });

    return () => {
      timers.forEach(clearTimeout);
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, [pathname, mounted, showBubble]);

  // ─── Scroll tracker ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!mounted) return;

    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) return;
      const pct = Math.round((window.scrollY / docH) * 100);
      setScrollPct(pct);

      // Check scroll-triggered messages
      pendingMessages.current
        .filter((m) => m.trigger === 'scroll')
        .forEach((msg) => {
          if (
            pct >= msg.triggerValue &&
            !handledScrollIds.current.has(msg.id) &&
            !hasShownMessage(msg.sessionKey)
          ) {
            handledScrollIds.current.add(msg.id);
            showBubble(msg);
          }
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mounted, showBubble]);

  const toggleMinimized = () => {
    const next = !isMinimized;
    setIsMinimized(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nandaGirl-minimized', String(next));
    }
    if (!next) {
      // Expanding — dismiss any bubble
      setActiveBubble(null);
      setIsTyping(false);
    }
  };

  const dismissBubble = () => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setActiveBubble(null);
    setIsTyping(false);
  };

  const handleReply = () => {
    const msg = activeBubble?.message;
    dismissBubble();
    onOpenChat?.(msg);
  };

  if (!mounted) return null;
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return null;

  return (
    <div className={`fixed bottom-4 left-4 z-30 flex flex-col items-start gap-2 ${className}`}>

      {/* ── SPEECH BUBBLE ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {(isTyping || activeBubble) && !isMinimized && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="relative mb-1 ml-2 max-w-[220px]"
          >
            {/* Bubble body */}
            <div className="bg-white border border-[#1A1A1A]/10 rounded-2xl rounded-bl-sm px-4 py-3 shadow-lg">
              {isTyping ? (
                <span className="text-[#6B6B6B]">
                  <TypingDots />
                </span>
              ) : (
                <>
                  <p className="text-[13px] text-[#1A1A1A] leading-snug mb-2">
                    {activeBubble?.message}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleReply}
                      className="text-[11px] font-semibold text-[#C9A84C] hover:text-[#C4613A] transition-colors focus:outline-none"
                    >
                      Reply →
                    </button>
                    <button
                      onClick={dismissBubble}
                      className="text-[11px] text-[#9B9B9B] hover:text-[#1A1A1A] transition-colors focus:outline-none ml-auto"
                    >
                      ✕
                    </button>
                  </div>
                </>
              )}
            </div>
            {/* Tail */}
            <div className="absolute -bottom-1 left-3 w-3 h-3 bg-white border-b border-l border-[#1A1A1A]/10 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CHARACTER ──────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {isMinimized ? (
          <motion.button
            key="minimized"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={toggleMinimized}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-navy shadow-elevated overflow-hidden border-2 border-[#C9A84C]/30 hover:border-[#C9A84C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Expand Nanda assistant"
          >
            <Image
              src="/assets/nanda-girl/logo-circle-transparent.png"
              alt="Nanda"
              width={56}
              height={56}
              className="object-cover"
            />
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Floating animation */}
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Character image */}
              <button
                onClick={() => onOpenChat?.()}
                className="relative w-24 h-32 md:w-32 md:h-40 block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg"
                aria-label="Open Nanda AI chat"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={context}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={imageData.src}
                      alt={imageData.alt}
                      fill
                      className="object-contain object-bottom drop-shadow-lg"
                      priority
                      sizes="(max-width: 768px) 96px, 128px"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Glow */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#C9A84C]/20 rounded-full blur-xl pointer-events-none"
                  animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.4 : 0.2 }}
                />
              </button>
            </motion.div>

            {/* Minimize button */}
            <motion.button
              onClick={toggleMinimized}
              className="absolute -top-1 -right-1 w-5 h-5 bg-cherry text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg hover:bg-cherry/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              aria-label="Minimize Nanda assistant"
            >
              −
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NandaGirl;
