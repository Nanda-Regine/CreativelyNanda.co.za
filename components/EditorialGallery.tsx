'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  src: string;
  alt: string;
}

interface EditorialGalleryProps {
  images: GalleryImage[];
  title?: string;
}

export default function EditorialGallery({ images, title }: EditorialGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  const getLayoutClass = (index: number) => {
    const pattern = index % 6;
    
    switch (pattern) {
      case 0:
        return 'col-span-2 row-span-2';
      case 1:
        return 'col-span-1 row-span-2';
      case 2:
        return 'col-span-2 row-span-1';
      case 3:
        return 'col-span-1 row-span-1';
      case 4:
        return 'col-span-1 row-span-2';
      case 5:
        return 'col-span-2 row-span-1';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  return (
    <div className="w-full">
      {title && (
        <h2 className="font-cormorant text-4xl md:text-5xl text-navy mb-12">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`relative overflow-hidden group cursor-pointer ${getLayoutClass(index)}`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => setSelectedImage(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div 
              className={`absolute inset-0 transition-all duration-700 ${
                hoveredIndex === index ? 'scale-105' : 'scale-100'
              }`}
              style={{
                clipPath: index % 5 === 0 
                  ? 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)'
                  : index % 5 === 1
                  ? 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)'
                  : index % 5 === 2
                  ? 'ellipse(100% 100% at 50% 50%)'
                  : index % 5 === 3
                  ? 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)'
                  : 'none',
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-all duration-700"
                style={{
                  filter: hoveredIndex === index ? 'brightness(0.9) saturate(1.2)' : 'brightness(1)',
                }}
              />
              
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent transition-opacity duration-500 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
              
              <div 
                className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${
                  hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <p className="font-manrope text-white text-sm">
                  View full image
                </p>
              </div>
            </div>

            {index % 4 === 0 && (
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-cherry/10 rounded-full blur-2xl"
                animate={{
                  scale: hoveredIndex === index ? 1.5 : 1,
                  opacity: hoveredIndex === index ? 0.3 : 0.1,
                }}
                transition={{ duration: 0.6 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 text-white/80 hover:text-white transition-colors z-10"
            >
              <ChevronLeft size={48} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 text-white/80 hover:text-white transition-colors z-10"
            >
              <ChevronRight size={48} />
            </button>

            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-6xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                className="object-contain"
              />
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
                <p className="text-white font-manrope text-sm">
                  {selectedImage + 1} / {images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}