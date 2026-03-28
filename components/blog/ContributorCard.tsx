'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Linkedin, Instagram, Globe, FileText, User } from 'lucide-react';
import { getCategoryTheme, getOrganicRadius, type BlogCategory } from '@/lib/blog-themes';

interface ContributorCardProps {
  contributor: {
    slug: string;
    name: string;
    title?: string | null;
    bio?: string | null;
    avatar?: string | null;
    website?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    instagram?: string | null;
    specialties?: string[];
    articleCount?: number;
  };
  index?: number;
  variant?: 'default' | 'compact' | 'featured';
}

export function ContributorCard({
  contributor,
  index = 0,
  variant = 'default',
}: ContributorCardProps) {
  // Use the first specialty to determine the theme, or default to dev
  const primarySpecialty = contributor.specialties?.[0] || 'dev';
  const theme = getCategoryTheme(primarySpecialty);
  const borderRadius = getOrganicRadius(index);

  const socialLinks = [
    { icon: Twitter, url: contributor.twitter, label: 'Twitter' },
    { icon: Linkedin, url: contributor.linkedin, label: 'LinkedIn' },
    { icon: Instagram, url: contributor.instagram, label: 'Instagram' },
    { icon: Globe, url: contributor.website, label: 'Website' },
  ].filter(link => link.url);

  if (variant === 'compact') {
    return (
      <motion.div
        className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        {contributor.avatar ? (
          <Image
            src={contributor.avatar}
            alt={contributor.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className={`w-10 h-10 rounded-full ${theme.accent} flex items-center justify-center`}>
            <User className="w-5 h-5 text-white" />
          </div>
        )}
        <div>
          <p className="font-medium text-navy text-sm">{contributor.name}</p>
          {contributor.title && (
            <p className="text-xs text-navy/60">{contributor.title}</p>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="group relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500"
      style={{ borderRadius }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-50`} />

      {/* Decorative ring */}
      <motion.div
        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full border-4 ${theme.border} opacity-30`}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative p-6">
        {/* Avatar with animated ring */}
        <div className="relative mx-auto w-24 h-24 mb-4">
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${theme.gradient}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ padding: '3px' }}
          >
            <div className="absolute inset-[3px] rounded-full bg-white" />
          </motion.div>

          {contributor.avatar ? (
            <Image
              src={contributor.avatar}
              alt={contributor.name}
              width={96}
              height={96}
              className="relative rounded-full object-cover z-10"
              style={{ borderRadius }}
            />
          ) : (
            <div className={`relative w-full h-full ${theme.accent} flex items-center justify-center z-10`} style={{ borderRadius }}>
              <span className="text-3xl font-display font-bold text-white">
                {contributor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
          )}
        </div>

        {/* Name and title */}
        <div className="text-center mb-4">
          <h3 className="font-display text-xl font-bold text-navy group-hover:text-cherry transition-colors">
            {contributor.name}
          </h3>
          {contributor.title && (
            <p className={`text-sm ${theme.text} mt-1`}>{contributor.title}</p>
          )}
        </div>

        {/* Specialty badges */}
        {contributor.specialties && contributor.specialties.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {contributor.specialties.map((specialty) => {
              const specTheme = getCategoryTheme(specialty);
              return (
                <span
                  key={specialty}
                  className={`text-xs px-2.5 py-1 rounded-full ${specTheme.accent} text-white`}
                >
                  {specTheme.emoji} {specTheme.name}
                </span>
              );
            })}
          </div>
        )}

        {/* Bio */}
        {contributor.bio && (
          <p className="text-sm text-navy/70 text-center line-clamp-2 mb-4">
            {contributor.bio}
          </p>
        )}

        {/* Article count */}
        {contributor.articleCount !== undefined && contributor.articleCount > 0 && (
          <div className="flex items-center justify-center gap-1 text-sm text-navy/60 mb-4">
            <FileText className="w-4 h-4" />
            <span>{contributor.articleCount} article{contributor.articleCount !== 1 ? 's' : ''}</span>
          </div>
        )}

        {/* Social links */}
        {socialLinks.length > 0 && (
          <div className="flex justify-center gap-2">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-navy/5 ${theme.text} hover:bg-navy/10 transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              );
            })}
          </div>
        )}
      </div>

      {/* Hover accent line */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradient}`}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
}

export default ContributorCard;
