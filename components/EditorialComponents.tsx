'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote, Heart } from 'lucide-react';
import Link from 'next/link';

interface Review {
  id: string;
  image: string;
  source?: string;
  quote?: string;
  date?: string;
}

export function HeroWithCutout() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-beige/20 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 z-10"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-6 py-3 bg-cherry/10 rounded-full text-cherry font-manrope text-sm font-semibold mb-6"
            >
              Creative Technologist
            </motion.span>
            
            <h1 className="font-cormorant text-6xl md:text-7xl lg:text-8xl text-navy leading-tight mb-6">
              Creative
              <br />
              <span className="text-cherry italic">Technologist</span>
            </h1>
            
            <p className="font-manrope text-xl text-gray-700 leading-relaxed max-w-xl">
              Bridging imagination and innovation through code, design, and storytelling. 
              Building digital experiences that resonate.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="px-8 py-4 bg-cherry text-white rounded-full font-manrope font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              View Projects
            </Link>
            
            <Link
              href="/about"
              className="px-8 py-4 bg-white border-2 border-navy text-navy rounded-full font-manrope font-semibold hover:bg-navy hover:text-white transition-colors"
            >
              About Me
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[600px] lg:h-[700px] flex items-center justify-center"
        >
          <motion.div
            className="absolute top-20 -left-20 w-64 h-64 bg-cherry/20 rounded-full blur-3xl"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <motion.div
            className="absolute bottom-20 -right-20 w-80 h-80 bg-navy/10 rounded-full blur-3xl"
            animate={{
              y: [0, 20, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />

          <motion.div
            className="relative z-10"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Image
              src="/assets/professional/nanda-pic-1.png"
              alt="Nanda - Creative Technologist"
              width={500}
              height={700}
              className="w-auto h-[600px] lg:h-[700px] object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <p className="font-cormorant text-2xl text-navy italic mb-2">
              "Poetry is the algorithm of feeling."
            </p>
            <p className="font-manrope text-sm text-gray-600">
              Published Poet & Performer
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function MirembeLogo({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ rotate: [0, -5, 5, -5, 0] }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cherry to-navy p-1">
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <Image
            src="/assets/logos/mirembe-muse-logo.png"
            alt="Mirembe Muse"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      </div>
      
      <motion.div
        className="absolute inset-0 rounded-full bg-cherry/20 blur-xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}