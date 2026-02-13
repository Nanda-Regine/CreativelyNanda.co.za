'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Search, Code, Feather, TrendingUp, Sparkles, ArrowDown } from 'lucide-react';
import { blogCategoryThemes } from '@/lib/blog-themes';

interface MagazineHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  featuredArticle?: {
    title: string;
    excerpt: string;
    category: string;
    slug: string;
  } | null;
  issueNumber?: number;
}

const categoryIcons = {
  dev: Code,
  writing: Feather,
  business: TrendingUp,
};

export function MagazineHero({
  searchQuery,
  onSearchChange,
  featuredArticle,
  issueNumber = 1,
}: MagazineHeroProps) {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax transforms for orbs
  const orb1X = useTransform(springX, [-500, 500], [-30, 30]);
  const orb1Y = useTransform(springY, [-500, 500], [-20, 20]);
  const orb2X = useTransform(springX, [-500, 500], [20, -20]);
  const orb2Y = useTransform(springY, [-500, 500], [15, -15]);
  const orb3X = useTransform(springX, [-500, 500], [-15, 15]);
  const orb3Y = useTransform(springY, [-500, 500], [-25, 25]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <section
      className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-navy"
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient orbs */}
      {mounted && (
        <>
          <motion.div
            className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-cherry/30 to-pink-500/20 blur-3xl"
            style={{ x: orb1X, y: orb1Y }}
          />
          <motion.div
            className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl"
            style={{ x: orb2X, y: orb2Y }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-500/10 to-emerald-500/10 blur-3xl"
            style={{ x: orb3X, y: orb3Y }}
          />
        </>
      )}

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Masthead */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Issue badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-beige/80 text-sm mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="w-4 h-4 text-cherry" />
            <span className="tracking-[0.2em] uppercase">
              Issue {String(issueNumber).padStart(3, '0')} | {currentMonth} {currentYear}
            </span>
          </motion.div>

          {/* Main title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-beige mb-6">
            <span className="block tracking-[0.3em] uppercase text-beige/60 text-lg md:text-xl mb-4">
              CreativelyNanda
            </span>
            <motion.span
              className="bg-gradient-to-r from-beige via-cherry to-beige bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{ backgroundPosition: ['0%', '200%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              SANKOFA SESSIONS
            </motion.span>
          </h1>

          {/* Tagline */}
          <motion.p
            className="text-xl md:text-2xl text-beige/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Where Black excellence in <span className="text-blue-400">tech</span>,{' '}
            <span className="text-emerald-400">business</span>, and{' '}
            <span className="text-purple-400">creativity</span> is documented, celebrated, and monetized
          </motion.p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          className="max-w-xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-beige/40" />
            <input
              type="text"
              placeholder="Search articles, topics, contributors..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-beige/20 rounded-full text-beige placeholder:text-beige/40 focus:outline-none focus:border-cherry/50 focus:ring-2 focus:ring-cherry/20 transition-all"
            />
          </div>
        </motion.div>

        {/* Category quick links */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {Object.entries(blogCategoryThemes).map(([key, theme], index) => {
            const Icon = categoryIcons[key as keyof typeof categoryIcons];
            return (
              <Link key={key} href={`/blog/${key}`}>
                <motion.div
                  className={`group flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r ${theme.gradient} text-white font-medium shadow-lg hover:shadow-xl transition-shadow`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{theme.name}</span>
                  <span className="text-white/60">{theme.emoji}</span>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        {/* Featured article teaser */}
        {featuredArticle && (
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <p className="text-beige/50 text-sm uppercase tracking-widest mb-3">
              Featured Story
            </p>
            <Link href={`/blog/${featuredArticle.category}/${featuredArticle.slug}`}>
              <motion.div
                className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-beige/10 hover:border-cherry/30 transition-colors"
                whileHover={{ y: -4 }}
              >
                <h2 className="font-display text-2xl md:text-3xl font-bold text-beige group-hover:text-cherry transition-colors mb-2">
                  {featuredArticle.title}
                </h2>
                <p className="text-beige/60 line-clamp-2">
                  {featuredArticle.excerpt}
                </p>
              </motion.div>
            </Link>
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="flex flex-col items-center text-beige/40"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs uppercase tracking-widest mb-2">Explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-parchment to-transparent" />
    </section>
  );
}

export default MagazineHero;
