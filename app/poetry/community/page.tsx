'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button, Badge, Card } from '@/components/ui';
import {
  Users,
  MessageCircle,
  Calendar,
  Mic,
  BookOpen,
  Star,
  ArrowRight,
  Instagram,
  Mail,
  Heart,
  Sparkles,
} from 'lucide-react';

// Community stats
const COMMUNITY_STATS = [
  { label: 'Poets', value: '500+', icon: Users },
  { label: 'Poems Shared', value: '2,000+', icon: BookOpen },
  { label: 'Events Hosted', value: '25+', icon: Calendar },
  { label: 'Countries', value: '12', icon: Sparkles },
];

// Featured community members
const FEATURED_POETS = [
  {
    name: 'Thandi M.',
    location: 'Johannesburg',
    avatar: '/assets/professional/nanda-consulting.jpg',
    quote: 'Finding this community changed my relationship with my own voice.',
    poemsShared: 23,
  },
  {
    name: 'Sipho K.',
    location: 'Cape Town',
    avatar: '/assets/professional/nanda-consulting.jpg',
    quote: 'A safe space to be vulnerable and creative.',
    poemsShared: 45,
  },
  {
    name: 'Naledi P.',
    location: 'Durban',
    avatar: '/assets/professional/nanda-consulting.jpg',
    quote: 'The workshops helped me find my authentic style.',
    poemsShared: 18,
  },
];

// Upcoming events
const UPCOMING_EVENTS = [
  {
    title: 'Monthly Open Mic Night',
    date: 'February 15, 2026',
    time: '7:00 PM SAST',
    type: 'Virtual',
    description: 'Share your poetry in a supportive virtual space. All levels welcome.',
    spots: 12,
  },
  {
    title: 'Poetry Workshop: Finding Your Voice',
    date: 'February 22, 2026',
    time: '2:00 PM SAST',
    type: 'Virtual',
    description: 'A guided workshop on developing your unique poetic voice.',
    spots: 8,
  },
  {
    title: 'Book Club: African Poetry Now',
    date: 'March 1, 2026',
    time: '6:00 PM SAST',
    type: 'Virtual',
    description: 'Discussion of contemporary African poetry and its global impact.',
    spots: 20,
  },
];

// Community benefits
const BENEFITS = [
  {
    icon: Mic,
    title: 'Open Mic Events',
    description: 'Regular virtual and in-person events to share your work and connect with fellow poets.',
  },
  {
    icon: BookOpen,
    title: 'Workshop Series',
    description: 'Monthly workshops covering craft, performance, and the business of poetry.',
  },
  {
    icon: MessageCircle,
    title: 'Feedback Circles',
    description: 'Get constructive feedback from fellow poets in a supportive environment.',
  },
  {
    icon: Star,
    title: 'Publishing Support',
    description: 'Resources and guidance for poets ready to publish their work.',
  },
];

export default function PoetryCommunity() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubscribed(true);
    setIsSubmitting(false);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-parchment via-cream to-parchment">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-10 w-[400px] h-[400px] bg-gradient-to-bl from-cherry/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-32 h-32 border border-cherry/20 rounded-full"
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-navy/60 mb-8"
          >
            <Link href="/poetry" className="hover:text-cherry transition-colors">Poetry</Link>
            <span>/</span>
            <span className="text-cherry">Community</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-px bg-cherry" />
                <span className="text-cherry text-sm font-medium tracking-[0.3em] uppercase">Join Us</span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-navy mb-6">
                Poetry <span className="text-cherry">Community</span>
              </h1>

              <p className="text-lg text-navy/70 mb-8 leading-relaxed">
                A gathering place for poets, dreamers, and lovers of words. Connect, create,
                and grow with a community that celebrates the power of poetry.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-full"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Join the Community
                </Button>
                <Link href="/poetry/collection">
                  <Button variant="outline" size="lg" className="rounded-full">
                    Browse Poems
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right: Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {COMMUNITY_STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/80 backdrop-blur p-6 text-center"
                  style={{ borderRadius: index % 2 === 0 ? '24px 8px 24px 8px' : '8px 24px 8px 24px' }}
                >
                  <stat.icon className="w-8 h-8 text-cherry mx-auto mb-3" />
                  <div className="font-display text-3xl font-bold text-navy">{stat.value}</div>
                  <div className="text-navy/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-navy">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-cherry" />
              <span className="text-cherry text-sm font-medium tracking-[0.3em] uppercase">What We Offer</span>
              <div className="w-12 h-px bg-cherry" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-beige">
              Grow Your <span className="text-cherry">Craft</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition-colors"
                style={{ borderRadius: index % 2 === 0 ? '24px 8px 24px 8px' : '8px 24px 8px 24px' }}
              >
                <div className="w-12 h-12 bg-cherry/20 rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-cherry" />
                </div>
                <h3 className="font-display text-xl font-bold text-beige mb-2">{benefit.title}</h3>
                <p className="text-beige/60 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Poets */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-cherry text-sm font-medium tracking-[0.2em] uppercase">Featured Voices</span>
            <div className="flex-1 h-px bg-navy/10" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_POETS.map((poet, index) => (
              <motion.div
                key={poet.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur p-6 relative overflow-hidden"
                style={{ borderRadius: '24px 8px 24px 8px' }}
              >
                {/* Quote mark */}
                <div className="absolute top-4 right-4 text-cherry/10 text-6xl font-serif">"</div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img
                      src={poet.avatar}
                      alt={poet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy">{poet.name}</h3>
                    <p className="text-navy/60 text-sm">{poet.location}</p>
                  </div>
                </div>

                <p className="text-navy/80 italic mb-4">"{poet.quote}"</p>

                <div className="flex items-center gap-2 text-sm text-navy/50">
                  <BookOpen className="w-4 h-4" />
                  <span>{poet.poemsShared} poems shared</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-cherry" />
              <span className="text-cherry text-sm font-medium tracking-[0.3em] uppercase">Events</span>
              <div className="w-12 h-px bg-cherry" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">
              Upcoming <span className="text-cherry">Gatherings</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {UPCOMING_EVENTS.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 hover:shadow-lg transition-shadow"
                style={{ borderRadius: '20px 8px 20px 8px' }}
              >
                {/* Date */}
                <div className="flex-shrink-0 text-center md:w-24">
                  <div className="font-display text-3xl font-bold text-cherry">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-navy/60 text-sm">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-xl font-bold text-navy">{event.title}</h3>
                    <Badge variant="secondary" size="sm">{event.type}</Badge>
                  </div>
                  <p className="text-navy/60 text-sm mb-2">{event.description}</p>
                  <div className="flex items-center gap-4 text-sm text-navy/50">
                    <span>{event.time}</span>
                    <span className="w-1 h-1 bg-navy/30 rounded-full" />
                    <span>{event.spots} spots left</span>
                  </div>
                </div>

                {/* Action */}
                <Button variant="outline" size="sm" className="rounded-full flex-shrink-0">
                  RSVP
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-20 px-6 bg-gradient-to-br from-cherry to-cherry-dark scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Join Our Poetry Family
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to receive updates about events, workshops, and community highlights.
              Plus, get exclusive poetry prompts delivered to your inbox.
            </p>

            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/20 backdrop-blur rounded-full py-4 px-8 inline-block"
              >
                <span className="text-white font-medium">Welcome to the community!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full bg-white text-cherry hover:bg-cream"
                  loading={isSubmitting}
                >
                  Subscribe
                </Button>
              </form>
            )}

            {/* Social links */}
            <div className="mt-12 flex items-center justify-center gap-6">
              <a
                href="https://instagram.com/nanda.regine"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
              <a
                href="mailto:hello@creativelynanda.co.za"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 bg-parchment">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-navy/60 mb-4">Explore the collection</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/poetry/collection">
                <Button variant="primary" className="rounded-full">
                  Browse Collection
                </Button>
              </Link>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => window.open('https://books2read.com/Nrkk-insideherroses', '_blank')}
              >
                Get the Book
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
