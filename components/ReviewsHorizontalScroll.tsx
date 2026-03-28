'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Review {
  id: string;
  image: string;
  source?: string;
  quote?: string;
  date?: string;
}

interface ReviewsHorizontalScrollProps {
  reviews: Review[];
  title?: string;
}

export default function ReviewsHorizontalScroll({ reviews, title = "Press & Reviews" }: ReviewsHorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-beige/20 to-transparent -z-10" />
      
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="mb-12 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-cormorant text-5xl md:text-6xl text-navy mb-4">
              {title}
            </h2>
            <p className="font-manrope text-gray-600 text-lg">
              Featured in {reviews.length}+ publications
            </p>
          </motion.div>

          <div className="hidden md:flex gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                canScrollLeft 
                  ? 'bg-navy text-white hover:bg-cherry' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={24} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                canScrollRight 
                  ? 'bg-navy text-white hover:bg-cherry' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-custom"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#c21e56 #f5f1e8',
          }}
        >
          {reviews.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="flex-shrink-0 w-80 md:w-96 snap-start group"
            >
              <div className="relative h-full">
                <div 
                  className="relative h-80 mb-6 overflow-hidden"
                  style={{
                    clipPath: index % 4 === 0 
                      ? 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)'
                      : index % 4 === 1
                      ? 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)'
                      : index % 4 === 2
                      ? 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)'
                      : 'polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 90%)',
                  }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={review.image}
                      alt={review.source || 'Review'}
                      fill
                      className="object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
                    
                    <div className="absolute top-6 left-6 w-14 h-14 rounded-full bg-cherry/90 backdrop-blur-md flex items-center justify-center">
                      <Quote className="text-white" size={24} />
                    </div>
                    
                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-cormorant text-2xl text-white">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-4 px-2">
                  {review.quote && (
                    <p className="font-manrope text-gray-700 text-lg leading-relaxed italic">
                      "{review.quote}"
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    {review.source && (
                      <p className="font-cormorant text-2xl text-navy font-semibold">
                        {review.source}
                      </p>
                    )}
                    {review.date && (
                      <span className="text-sm text-gray-500 font-manrope">
                        {review.date}
                      </span>
                    )}
                  </div>
                </div>

                <motion.div
                  className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full -z-10"
                  style={{
                    background: index % 3 === 0 
                      ? 'radial-gradient(circle, rgba(194,30,86,0.15) 0%, transparent 70%)'
                      : index % 3 === 1
                      ? 'radial-gradient(circle, rgba(26,26,46,0.1) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(245,241,232,0.8) 0%, transparent 70%)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="md:hidden text-center mt-6"
        >
          <p className="text-sm text-gray-500 font-manrope flex items-center justify-center gap-2">
            <ChevronLeft size={16} />
            Swipe to explore
            <ChevronRight size={16} />
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        .scrollbar-custom::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: #f5f1e8;
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #c21e56;
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #8b1538;
        }
      `}</style>
    </section>
  );
}