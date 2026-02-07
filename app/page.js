'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax effect for background orbs
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation variants
  // Animation variants - optimized for mobile scroll
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const featureItem = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  // Mobile-friendly viewport settings
  const mobileViewport = { once: true, amount: 0.2, margin: '-50px' };

  return (
    <div className="page-transition">
      {/* ===== HERO: VOGUE COVER SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A1128]">

        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
             }} />

        {/* Animated Background Shapes with Parallax */}
        <motion.div
          className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-bl from-[#D4A574]/20 via-[#D4A574]/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: [1, 1.05, 1],
          }}
          transition={{
            x: { type: 'spring', stiffness: 50, damping: 30 },
            y: { type: 'spring', stiffness: 50, damping: 30 },
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-tr from-beige/15 via-beige/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x,
            y: -mousePosition.y,
            scale: [1, 1.08, 1],
          }}
          transition={{
            x: { type: 'spring', stiffness: 50, damping: 30 },
            y: { type: 'spring', stiffness: 50, damping: 30 },
            scale: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-gradient-to-r from-[#D4A574]/10 to-transparent rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Magazine Masthead */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 text-center z-20"
        >
          <div className="font-display text-beige/40 text-[10px] md:text-xs tracking-[0.5em] uppercase mb-2">
            Portfolio Issue • 2026
          </div>
        </motion.div>

        {/* Magazine Stats - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="hidden lg:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-20"
        >
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '5+', label: 'Years Experience' },
            { value: '1000+', label: 'Templates Sold' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.15 }}
              className="text-left"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="font-display text-2xl xl:text-3xl font-bold text-[#D4A574]"
              >
                {stat.value}
              </motion.div>
              <div className="text-[10px] xl:text-xs text-beige/40 tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Magazine Highlights - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-20 max-w-[180px] xl:max-w-[220px]"
        >
          {[
            { title: 'EXCLUSIVE', text: 'Inside Her Roses: Poetry Collection' },
            { title: 'FEATURED', text: 'Building Mirembe Muse Platform' },
            { title: 'SPOTLIGHT', text: 'Notion Systems for Creators' },
          ].map((highlight, i) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.15 }}
              className="text-right"
            >
              <motion.div
                whileHover={{ x: -3 }}
                className="group cursor-default"
              >
                <div className="text-[10px] xl:text-xs font-bold text-[#D4A574] tracking-widest mb-1">
                  {highlight.title}
                </div>
                <div className="text-xs xl:text-sm text-beige/60 leading-tight group-hover:text-beige/80 transition-colors">
                  {highlight.text}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 md:py-20 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center">

            {/* Left Side: Editorial Headlines */}
            <div className="lg:col-span-5 space-y-4 md:space-y-6 text-center lg:text-left order-2 lg:order-1">

              {/* Main Title */}
              <div className="space-y-3 md:space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <span className="text-beige/60 text-xs md:text-sm font-medium tracking-[0.3em] uppercase">
                    Introducing
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="font-display font-bold text-beige leading-[0.9]"
                >
                  <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Nandawula</span>
                  <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#D4A574] mt-1">Regine Kabali-Kagwa</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-3 md:px-4 py-1.5 md:py-2 border border-[#D4A574] text-[#D4A574] text-xs md:text-sm font-medium tracking-wider"
                  >
                    CREATIVE
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-3 md:px-4 py-1.5 md:py-2 bg-[#D4A574] text-navy text-xs md:text-sm font-medium tracking-wider"
                  >
                    TECHNOLOGIST
                  </motion.span>
                </motion.div>
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="font-display text-base md:text-lg lg:text-xl text-beige/70 leading-relaxed max-w-md mx-auto lg:mx-0 px-4 lg:px-0"
              >
                Bridging imagination and innovation through
                <span className="text-[#D4A574] font-semibold"> code</span>,
                <span className="text-beige font-semibold"> design</span>, and
                <span className="text-[#D4A574] font-semibold"> storytelling</span>.
              </motion.p>

              {/* Magazine-style Feature List */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
                className="space-y-2"
              >
                {['PUBLISHED POET', 'FULL-STACK DEVELOPER', 'NOTION ARCHITECT', 'FOUNDER, MIREMBE MUSE'].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={featureItem}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3 md:gap-4 text-beige/60 text-xs md:text-sm justify-center lg:justify-start"
                  >
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: '1.5rem' }}
                      transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                      className="h-px bg-[#D4A574] md:w-8"
                    />
                    <span className="tracking-wider">{item}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start pt-2 md:pt-4"
              >
                <Button
                  size="lg"
                  className="rounded-full bg-[#D4A574] text-navy hover:bg-[#C49464] text-sm md:text-base"
                  rightIcon={<span>→</span>}
                  onClick={() => window.location.href = '/projects'}
                >
                  Explore My Work
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-beige/40 text-beige hover:bg-beige hover:text-navy text-sm md:text-base"
                  onClick={() => window.location.href = '/about'}
                >
                  Read My Story
                </Button>
              </motion.div>
            </div>

            {/* Right Side: Photo in Organic Frame */}
            <div className="lg:col-span-7 relative flex justify-center order-1 lg:order-2">

              {/* Floating Highlight Words - Desktop Only */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="hidden xl:block absolute -top-4 right-12 2xl:right-24 z-20"
              >
                <motion.span
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="font-display text-3xl 2xl:text-4xl font-bold text-[#D4A574]/70 italic"
                >
                  Visionary
                </motion.span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="hidden xl:block absolute top-1/3 -left-4 2xl:left-4 z-20"
              >
                <motion.span
                  animate={{ y: [0, 8, 0], rotate: [-12, -10, -12] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="font-display text-2xl 2xl:text-3xl font-bold text-beige/50 -rotate-12"
                >
                  Poet
                </motion.span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="hidden xl:block absolute bottom-1/3 -right-2 2xl:right-4 z-20"
              >
                <motion.span
                  animate={{ y: [0, -6, 0], rotate: [6, 8, 6] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="font-display text-2xl 2xl:text-3xl font-bold text-[#D4A574]/60 rotate-6"
                >
                  Builder
                </motion.span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="hidden 2xl:block absolute bottom-16 left-16 z-20"
              >
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="font-display text-2xl font-bold text-beige/40 -rotate-6"
                >
                  Dreamer
                </motion.span>
              </motion.div>

              {/* Main Photo Container - 3D Magazine Pop-out Effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                className="relative"
                style={{ perspective: '1200px' }}
              >
                {/* Background blob layers with pulse */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-4 md:-inset-6 lg:-inset-8 bg-gradient-to-br from-[#D4A574]/30 via-[#D4A574]/10 to-transparent blur-sm"
                  style={{ borderRadius: '60% 40% 55% 45% / 55% 60% 40% 45%' }}
                />
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -inset-2 md:-inset-3 lg:-inset-4 bg-gradient-to-tr from-beige/20 via-beige/5 to-transparent"
                  style={{ borderRadius: '55% 45% 60% 40% / 45% 55% 45% 55%' }}
                />

                {/* 3D Layered Photo Frame */}
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    rotateY: 5,
                    rotateX: -3,
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="relative w-[240px] h-[320px] sm:w-[280px] sm:h-[380px] md:w-[320px] md:h-[430px] lg:w-[380px] lg:h-[510px] xl:w-[420px] xl:h-[560px]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Background Layer - Arch Frame */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#D4A574]/40 to-[#D4A574]/20 shadow-2xl"
                    style={{
                      borderRadius: '47% 53% 43% 57% / 54% 46% 54% 46%',
                      transform: 'translateZ(-30px)',
                      boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5), 0 50px 100px -20px rgba(0,0,0,0.3)'
                    }}
                  />

                  {/* Middle Layer - Accent Border */}
                  <motion.div
                    className="absolute inset-2 bg-gradient-to-tr from-beige/30 to-[#D4A574]/30"
                    style={{
                      borderRadius: '47% 53% 43% 57% / 54% 46% 54% 46%',
                      transform: 'translateZ(-15px)'
                    }}
                  />

                  {/* Photo Container - Pops OUT of frame */}
                  <motion.div
                    animate={{
                      rotateY: [0, 2, 0, -2, 0],
                      rotateX: [0, -1, 0, 1, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="absolute inset-0 overflow-visible"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(20px)'
                    }}
                  >
                    {/* Photo that breaks out of frame */}
                    <img
                      src="/assets/professional/nanda-professional-2-transparent.png"
                      alt="Nanda - Creative Technologist"
                      className="w-[110%] h-[110%] object-cover object-top absolute -top-[5%] -left-[5%] drop-shadow-2xl"
                      style={{
                        filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4)) drop-shadow(0 12px 24px rgba(0,0,0,0.3))'
                      }}
                    />
                  </motion.div>

                  {/* Foreground Accent - Partial frame overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#0A1128]/70 via-[#0A1128]/30 to-transparent pointer-events-none"
                    style={{
                      borderRadius: '0 0 43% 57% / 0 0 54% 46%',
                      transform: 'translateZ(40px)'
                    }}
                  />

                  {/* Glowing accent ring at front */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -inset-4 pointer-events-none"
                    style={{
                      borderRadius: '50% 50% 45% 55% / 55% 45% 55% 45%',
                      border: '2px solid rgba(212,165,116,0.3)',
                      transform: 'translateZ(50px)'
                    }}
                  />
                </motion.div>

                {/* Decorative Ring with rotation */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-6 md:-inset-8 lg:-inset-10 xl:-inset-12 border border-beige/10 pointer-events-none"
                  style={{ borderRadius: '50% 50% 45% 55% / 55% 45% 55% 45%' }}
                />

                {/* 3D Shadow on ground */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/20 blur-xl rounded-full"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Magazine Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy via-navy/80 to-transparent py-4 md:py-6 lg:py-8"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6 text-beige/50 text-[9px] md:text-[10px] lg:text-xs tracking-widest uppercase">
              <span>East London, South Africa</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Inside Her Roses — Published Author</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Building Africa's Tech Future</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-16 md:bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 md:h-10 lg:h-12 bg-gradient-to-b from-beige/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* ===== FEATURED QUOTE SECTION ===== */}
      <section className="relative py-12 md:py-16 lg:py-24 px-4 sm:px-6 bg-beige overflow-hidden scroll-mt-20">
        {/* Animated Decorative elements */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-48 md:w-64 lg:w-96 h-48 md:h-64 lg:h-96 bg-gradient-to-br from-[#D4A574]/15 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 right-0 w-40 md:w-56 lg:w-80 h-40 md:h-56 lg:h-80 bg-gradient-to-tl from-navy/10 to-transparent rounded-full blur-3xl"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={mobileViewport}
          variants={staggerContainer}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-4 md:mb-6 lg:mb-8"
          >
            <span className="text-[#B8860B] text-xs md:text-sm font-medium tracking-[0.3em] uppercase">The Philosophy</span>
          </motion.div>

          <motion.blockquote
            variants={fadeInUp}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-4 md:mb-6 lg:mb-8 px-4"
          >
            "Technology should amplify
            <span className="text-[#B8860B]"> humanity</span>,
            not replace it."
          </motion.blockquote>

          <motion.p
            variants={fadeInUp}
            className="text-navy/60 text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4"
          >
            Every line of code, every design decision, every word I write —
            it's all in service of connection, creativity, and meaningful impact.
          </motion.p>
        </motion.div>
      </section>

      {/* ===== EXPLORE SECTION ===== */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={mobileViewport}
            variants={fadeInLeft}
            className="flex items-center gap-3 md:gap-4 lg:gap-6 mb-8 md:mb-12 lg:mb-16"
          >
            <div className="w-12 md:w-20 h-px bg-navy" />
            <span className="text-navy text-[10px] md:text-xs lg:text-sm font-medium tracking-[0.2em] uppercase whitespace-nowrap">Inside This Issue</span>
            <div className="flex-1 h-px bg-navy/10" />
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={mobileViewport}
            variants={fadeInUp}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-8 md:mb-12 lg:mb-16 text-center"
          >
            Explore My <span className="text-[#B8860B]">World</span>
          </motion.h2>

          {/* Magazine Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={mobileViewport}
            variants={staggerContainer}
            className="grid md:grid-cols-12 gap-3 md:gap-4 lg:gap-6"
          >

            {/* Large Feature Card - Projects */}
            <motion.div
              variants={fadeInUp}
              className="md:col-span-7"
            >
              <Link
                href="/projects"
                className="group block relative overflow-hidden bg-navy p-6 md:p-8 lg:p-10 xl:p-14 hover:scale-[1.02] transition-all duration-500"
                style={{ borderRadius: '40px 16px 40px 16px' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 right-0 w-32 md:w-48 lg:w-64 h-32 md:h-48 lg:h-64 bg-gradient-to-bl from-[#D4A574]/30 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"
                />

                <div className="relative z-10">
                  <span className="text-[#D4A574] text-[10px] md:text-xs lg:text-sm font-medium tracking-[0.2em] uppercase">Featured</span>
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-beige mt-2 md:mt-3 lg:mt-4 mb-3 md:mb-4 lg:mb-6 group-hover:text-[#D4A574] transition-colors">
                    Projects
                  </h3>
                  <p className="text-beige/70 text-sm md:text-base lg:text-lg max-w-md mb-4 md:mb-6 lg:mb-8">
                    Full-stack applications, AI integrations, and digital experiences built with intention.
                  </p>
                  <span className="text-[#D4A574] text-sm md:text-base font-medium group-hover:translate-x-2 inline-block transition-transform">
                    View Collection →
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Stacked Cards - Right Column */}
            <div className="md:col-span-5 space-y-3 md:space-y-4 lg:space-y-6">
              {/* Poetry Card */}
              <motion.div
                variants={fadeInRight}
              >
                <Link
                  href="/poetry"
                  className="group block relative overflow-hidden bg-gradient-to-br from-[#8B4513] to-[#654321] p-5 md:p-6 lg:p-8 hover:scale-[1.02] transition-all duration-500"
                  style={{ borderRadius: '16px 40px 16px 40px' }}
                >
                  <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute bottom-0 left-0 w-20 md:w-24 lg:w-32 h-20 md:h-24 lg:h-32 bg-white/10 rounded-full blur-xl"
                  />
                  <span className="text-white/70 text-[10px] md:text-xs tracking-[0.2em] uppercase">Published Author</span>
                  <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white mt-2 mb-2 lg:mb-3 group-hover:translate-x-1 transition-transform">
                    Poetry & Performance
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm">Words that move. Stories that heal.</p>
                </Link>
              </motion.div>

              {/* Notion Card */}
              <motion.div
                variants={fadeInRight}
              >
                <Link
                  href="/notion"
                  className="group block relative overflow-hidden bg-beige p-5 md:p-6 lg:p-8 hover:scale-[1.02] transition-all duration-500"
                  style={{ borderRadius: '40px 16px 16px 40px' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-0 right-0 w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 bg-navy/10 rounded-full blur-xl"
                  />
                  <span className="text-[#B8860B] text-[10px] md:text-xs tracking-[0.2em] uppercase">Systems Architecture</span>
                  <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-navy mt-2 mb-2 lg:mb-3 group-hover:translate-x-1 transition-transform">
                    Notion Systems
                  </h3>
                  <p className="text-navy/60 text-xs md:text-sm">Transforming chaos into clarity.</p>
                </Link>
              </motion.div>
            </div>

            {/* Bottom Row - Three Equal Cards */}
            <motion.div
              variants={fadeInUp}
              className="md:col-span-4"
            >
              <Link
                href="/mirembe"
                className="group block relative overflow-hidden bg-gradient-to-br from-[#2D5A3D] to-[#1E3F2A] p-5 md:p-6 lg:p-8 hover:scale-[1.02] transition-all duration-500 h-full"
                style={{ borderRadius: '16px 16px 40px 16px' }}
              >
                <span className="text-white/70 text-[10px] md:text-xs tracking-[0.2em] uppercase">Coming 2026</span>
                <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold text-white mt-2 mb-2 group-hover:translate-x-1 transition-transform">
                  Mirembe Muse
                </h3>
                <p className="text-white/60 text-xs md:text-sm">African botanical wellness.</p>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="md:col-span-4"
            >
              <Link
                href="/work"
                className="group block relative overflow-hidden bg-navy/5 p-5 md:p-6 lg:p-8 hover:scale-[1.02] transition-all duration-500 border border-navy/10 h-full"
                style={{ borderRadius: '16px 16px 16px 40px' }}
              >
                <span className="text-[#B8860B] text-[10px] md:text-xs tracking-[0.2em] uppercase">Experience</span>
                <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold text-navy mt-2 mb-2 group-hover:translate-x-1 transition-transform">
                  Work Journey
                </h3>
                <p className="text-navy/60 text-xs md:text-sm">From hospitality to full-stack.</p>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="md:col-span-4"
            >
              <Link
                href="/contact"
                className="group block relative overflow-hidden bg-[#D4A574]/15 p-5 md:p-6 lg:p-8 hover:scale-[1.02] transition-all duration-500 h-full"
                style={{ borderRadius: '40px 16px 16px 16px' }}
              >
                <span className="text-[#B8860B] text-[10px] md:text-xs tracking-[0.2em] uppercase">Connect</span>
                <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold text-navy mt-2 mb-2 group-hover:translate-x-1 transition-transform">
                  Get in Touch
                </h3>
                <p className="text-navy/60 text-xs md:text-sm">Let's create something amazing.</p>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== CLOSING STATEMENT ===== */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 bg-navy overflow-hidden scroll-mt-20">
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-b from-[#D4A574]/5 via-transparent to-[#D4A574]/5"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={mobileViewport}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.p
            variants={fadeInUp}
            className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl text-beige/80 leading-relaxed mb-4 md:mb-6 lg:mb-8 px-4"
          >
            I'm building at the intersection of technology, creativity, and African innovation —
            proving that you can speak both <span className="text-[#D4A574] font-semibold">boardroom</span> and
            <span className="text-[#D4A574] font-semibold"> JavaScript</span>.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Button
              variant="ghost"
              className="text-[#D4A574] hover:text-[#D4A574]/80 text-sm md:text-base"
              rightIcon={<span>→</span>}
              onClick={() => window.location.href = '/about'}
            >
              Read the full story
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
