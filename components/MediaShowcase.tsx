'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  description?: string;
  coverImage: string;
  videoFile?: string;
  category: 'performance' | 'radio-interview' | 'book-launch' | 'creative';
  featured?: boolean;
}

interface MediaShowcaseProps {
  items: MediaItem[];
  title: string;
  subtitle?: string;
}

export default function MediaShowcase({ items, title, subtitle }: MediaShowcaseProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const featuredItem = items.find(item => item.featured);
  const otherItems = items.filter(item => !item.featured);

  const handleVideoClick = (videoFile: string) => {
    setSelectedVideo(videoFile);
  };

  return (
    <section className="py-16">
      <div className="mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-cormorant text-5xl md:text-6xl text-navy mb-4"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-manrope text-lg text-gray-600"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <div className="space-y-12">
        {featuredItem && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden group">
              <div 
                className="relative h-[400px] md:h-[500px] cursor-pointer"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 90%, 95% 100%, 0 100%)',
                }}
                onClick={() => handleVideoClick(featuredItem.videoFile || '')}
                onMouseEnter={() => setHoveredId(featuredItem.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Image
                  src={featuredItem.coverImage}
                  alt={featuredItem.title}
                  fill
                  className="object-cover transition-all duration-700"
                  style={{
                    transform: hoveredId === featuredItem.id ? 'scale(1.05)' : 'scale(1)',
                    filter: hoveredId === featuredItem.id ? 'brightness(0.7)' : 'brightness(0.85)',
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: hoveredId === featuredItem.id ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-20 h-20 rounded-full bg-cherry flex items-center justify-center shadow-2xl">
                    <Play className="text-white ml-1" size={32} fill="white" />
                  </div>
                </motion.div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <motion.span
                    className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-manrope mb-4"
                    animate={{
                      y: hoveredId === featuredItem.id ? -5 : 0,
                    }}
                  >
                    Featured
                  </motion.span>
                  <h3 className="font-cormorant text-3xl md:text-4xl text-white mb-3">
                    {featuredItem.title}
                  </h3>
                  {featuredItem.description && (
                    <p className="text-white/90 font-manrope text-lg max-w-2xl">
                      {featuredItem.description}
                    </p>
                  )}
                </div>
              </div>
              
              <motion.div
                className="absolute -top-12 -right-12 w-64 h-64 bg-cherry/20 rounded-full blur-3xl -z-10"
                animate={{
                  scale: hoveredId === featuredItem.id ? 1.3 : 1,
                  opacity: hoveredId === featuredItem.id ? 0.4 : 0.2,
                }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {otherItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative group"
            >
              <div
                className="relative h-[350px] cursor-pointer overflow-hidden"
                style={{
                  clipPath: index % 3 === 0 
                    ? 'polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 90%)'
                    : index % 3 === 1
                    ? 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 0 100%)'
                    : 'polygon(5% 0, 100% 0, 100% 100%, 0 100%, 0 5%)',
                }}
                onClick={() => handleVideoClick(item.videoFile || '')}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-700"
                  style={{
                    transform: hoveredId === item.id ? 'scale(1.08)' : 'scale(1)',
                    filter: hoveredId === item.id ? 'brightness(0.7)' : 'brightness(0.9)',
                  }}
                />
                
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent transition-opacity duration-500 ${
                    hoveredId === item.id ? 'opacity-100' : 'opacity-80'
                  }`}
                />
                
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: hoveredId === item.id ? 1.2 : 1,
                    opacity: hoveredId === item.id ? 1 : 0.9,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/30">
                    <Play className="text-white ml-1" size={24} fill="white" />
                  </div>
                </motion.div>
                
                <div 
                  className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${
                    hoveredId === item.id ? 'translate-y-0' : 'translate-y-2'
                  }`}
                >
                  <h3 className="font-cormorant text-2xl md:text-3xl text-white mb-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p 
                      className={`text-white/80 font-manrope text-sm transition-all duration-500 ${
                        hoveredId === item.id ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
                      }`}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
              
              <motion.div
                className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-beige flex items-center justify-center font-cormorant text-3xl text-navy -z-10"
                animate={{
                  rotate: hoveredId === item.id ? 360 : 0,
                }}
                transition={{ duration: 0.8 }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVideo(null);
              }}
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full h-full rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}