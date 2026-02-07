'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { contextImages, getContextFromPath } from './types';

interface NandaGirlProps {
  className?: string;
}

export function NandaGirl({ className = '' }: NandaGirlProps) {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering (fixes hydration)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Load minimized state from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('nandaGirl-minimized');
    if (stored !== null) {
      setIsMinimized(stored === 'true');
    }
  }, []);

  // Save minimized state to localStorage
  const toggleMinimized = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nandaGirl-minimized', String(newState));
    }
  };

  const context = getContextFromPath(pathname);
  const imageData = contextImages[context];

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) return null;

  // Don't render on admin or special pages
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 left-4 z-30 ${className}`}>
      <AnimatePresence mode="wait">
        {isMinimized ? (
          // Minimized State - Small circle
          <motion.button
            key="minimized"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={toggleMinimized}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-navy shadow-elevated overflow-hidden border-2 border-gold/30 hover:border-gold transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Expand Nanda character"
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
          // Expanded State - Full character
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Floating Animation Container */}
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [0, -6, 0],
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Image Container */}
              <div className="relative w-24 h-32 md:w-32 md:h-40">
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

                {/* Glow effect behind character */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-gold/20 rounded-full blur-xl"
                  animate={{
                    scale: isHovered ? 1.2 : 1,
                    opacity: isHovered ? 0.4 : 0.2,
                  }}
                />
              </div>

            </motion.div>

            {/* Minimize button */}
            <motion.button
              onClick={toggleMinimized}
              className="absolute -top-1 -right-1 w-5 h-5 bg-cherry text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg hover:bg-cherry/80 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              aria-label="Minimize Nanda character"
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
