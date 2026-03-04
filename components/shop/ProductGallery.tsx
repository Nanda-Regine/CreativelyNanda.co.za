'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());

  const validImages = images
    .filter(Boolean)
    .filter(src => !failedSrcs.has(src))
    .slice(0, 12);

  const handleError = (src: string) => {
    setFailedSrcs(prev => new Set(prev).add(src));
    setSelectedIndex(null);
  };

  const open = (index: number) => setSelectedIndex(index);
  const close = () => setSelectedIndex(null);

  const prev = useCallback(() => {
    setSelectedIndex(i => i === null ? null : (i - 1 + validImages.length) % validImages.length);
  }, [validImages.length]);

  const next = useCallback(() => {
    setSelectedIndex(i => i === null ? null : (i + 1) % validImages.length);
  }, [validImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedIndex, prev, next]);

  if (validImages.length === 0) return null;

  return (
    <>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-12 rounded-full bg-gradient-to-b from-cherry to-navy" />
        <div>
          <h2 className="text-3xl font-display font-bold text-navy">Inside the Product</h2>
          <p className="text-navy/50 text-sm mt-1">{validImages.length} screenshot{validImages.length !== 1 ? 's' : ''} — click any to enlarge</p>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {validImages.map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => open(i)}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-sm border border-navy/5 bg-navy/5"
          >
            <Image
              src={src}
              alt={`${productName} screenshot ${i + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
              onError={() => handleError(src)}
            />
            <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-all duration-200 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
            </div>
            {/* Index badge */}
            <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-navy/60 backdrop-blur-sm text-white text-xs flex items-center justify-center font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {i + 1}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={close}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={close}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10 backdrop-blur-sm"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/60 text-sm bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Images className="w-4 h-4" />
              {selectedIndex + 1} / {validImages.length}
            </div>

            {/* Main image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[75vh] w-full mx-16 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={validImages[selectedIndex]}
                alt={`${productName} screenshot ${selectedIndex + 1}`}
                width={1280}
                height={960}
                className="object-contain w-full h-full max-h-[75vh] bg-navy/20"
                priority
                onError={() => handleError(validImages[selectedIndex])}
              />
            </motion.div>

            {/* Prev / Next arrows */}
            {validImages.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors backdrop-blur-sm"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors backdrop-blur-sm"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </>
            )}

            {/* Thumbnail strip */}
            {validImages.length > 1 && (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-2 pb-1"
                onClick={(e) => e.stopPropagation()}
              >
                {validImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedIndex(i)}
                    className={`relative w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      i === selectedIndex
                        ? 'border-white scale-110 shadow-lg'
                        : 'border-white/30 hover:border-white/70 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
