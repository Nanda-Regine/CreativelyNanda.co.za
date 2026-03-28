'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Linkedin, Instagram, Globe, ArrowRight } from 'lucide-react';
import { getCategoryTheme } from '@/lib/blog-themes';

interface AuthorBioCardProps {
  author: {
    name: string;
    title?: string;
    bio?: string;
    avatar?: string;
    website?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  category?: string;
}

export function AuthorBioCard({ author, category = 'business' }: AuthorBioCardProps) {
  const theme = getCategoryTheme(category);

  const socialLinks = [
    { icon: Twitter, url: author.twitter, label: 'Twitter' },
    { icon: Linkedin, url: author.linkedin, label: 'LinkedIn' },
    { icon: Instagram, url: author.instagram, label: 'Instagram' },
    { icon: Globe, url: author.website, label: 'Website' },
  ].filter(link => link.url);

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm border border-white/50 shadow-lg mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Decorative gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-30`} />

      {/* Animated accent orb */}
      <motion.div
        className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${theme.gradient} rounded-full opacity-20 blur-2xl`}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
        {/* Author Photo */}
        <motion.div
          className="relative flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {/* Animated gradient ring */}
          <motion.div
            className={`absolute -inset-1 rounded-full bg-gradient-to-r ${theme.gradient}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white">
            {author.avatar ? (
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 112px, 128px"
              />
            ) : (
              <div className={`w-full h-full ${theme.accent} flex items-center justify-center`}>
                <span className="text-3xl font-display font-bold text-white">
                  {author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Author Info */}
        <div className="flex-1 text-center md:text-left">
          <motion.span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${theme.accent} text-white mb-2`}
          >
            Meet Your Author
          </motion.span>

          <h3 className="font-display text-2xl md:text-3xl font-bold text-navy mb-1">
            {author.name}
          </h3>

          {author.title && (
            <p className={`text-sm md:text-base ${theme.text} font-medium mb-3`}>
              {author.title}
            </p>
          )}

          {author.bio && (
            <p className="text-navy/70 text-sm md:text-base leading-relaxed mb-4 max-w-xl">
              {author.bio}
            </p>
          )}

          {/* Social links and CTA */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-full bg-navy/5 ${theme.text} hover:bg-navy/10 transition-colors`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              );
            })}

            <Link href="/about">
              <motion.span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme.accent} ${theme.accentHover} text-white text-sm font-medium transition-colors ml-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AuthorBioCard;
