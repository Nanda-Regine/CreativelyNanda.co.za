'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── Fade-up helper ────────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ───────────────────────────────────────────────────────────────────────
const GOOGLE_REVIEW_URL =
  'https://g.page/r/REPLACE_WITH_YOUR_GOOGLE_BUSINESS_PLACE_ID/review';

const SOCIALS = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/nandawula-kabali-kagwa-584bb0262/' },
  { name: 'GitHub', href: 'https://github.com/Nanda-Regine' },
  { name: 'Twitter / X', href: 'https://x.com/CreativelyNanda' },
  { name: 'Instagram', href: 'https://www.instagram.com/creativelynanda/' },
  { name: 'Substack — Sankofa Sessions', href: 'https://substack.com/@sankofasessions' },
];

const SUBJECT_OPTIONS = [
  'Select a topic...',
  'Consulting Engagement',
  'AI Integration Project',
  'Web Development Project',
  'Notion Systems',
  'Speaking / Fellowship Invitation',
  'Press Inquiry',
  'Partnership / Collaboration',
  'Poetry & Creative Work',
  'Just saying hello',
];

const SERVICES = [
  {
    icon: '💻',
    title: 'AI Integration',
    body: 'Custom AI agents, Claude API integrations, and multi-agent systems. From R45,000/project.',
  },
  {
    icon: '🤝',
    title: 'Fractional AI Officer',
    body: 'Monthly AI strategy and advisory retainer. From R18,000/month.',
  },
  {
    icon: '🗂️',
    title: 'Notion Systems',
    body: 'Custom business operating systems for entrepreneurs and SMEs.',
  },
  {
    icon: '🎤',
    title: 'Speaking & Workshops',
    body: 'Conferences, panels, university lectures, and corporate AI workshops.',
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A]">
      {/* ── Toast notifications ───────────────────────────────────────────────── */}
      {status === 'success' && (
        <div
          role="status"
          className="fixed top-6 right-6 z-50 bg-navy text-beige px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 max-w-sm"
        >
          <span className="text-cherry text-xl">✓</span>
          <div>
            <p className="font-medium">Message sent!</p>
            <p className="text-beige/60 text-sm">I&apos;ll respond within 24 hours.</p>
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="ml-auto text-beige/40 hover:text-beige transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-beige/40"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}
      {status === 'error' && (
        <div
          role="alert"
          className="fixed top-6 right-6 z-50 bg-cherry text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 max-w-sm"
        >
          <span className="text-xl">⚠</span>
          <div>
            <p className="font-medium">Something went wrong</p>
            <p className="text-white/70 text-sm">Email hello@mirembemuse.co.za directly.</p>
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="ml-auto text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
        <FadeUp>
          <p className="font-display text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
            Let&apos;s Create Together
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-[#1A1A1A] mb-6 leading-[0.9]">
            Get in Touch
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-[#6B6B6B] leading-relaxed max-w-2xl mx-auto mb-4">
            Whether you have a project brief, a consulting enquiry, a speaking invitation,
            or a press request — this is where it starts.
          </p>
          <p className="text-[13px] text-[#C9A84C] font-medium">
            Looking to hire Nanda?{' '}
            <Link href="/consulting" className="underline underline-offset-2 hover:opacity-80 transition-opacity">
              View consulting offers and pricing →
            </Link>
          </p>
        </FadeUp>
      </section>

      {/* ── MAIN GRID ────────────────────────────────────────────────────────── */}
      <section className="pb-24 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">

          {/* LEFT — Info ───────────────────────────────────────────────────── */}
          <div className="space-y-10">

            {/* Direct contact */}
            <FadeUp>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-cherry/10 rounded-full flex items-center justify-center shrink-0" aria-hidden>
                    <span className="text-cherry text-lg">✉</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-1">Email</h3>
                    <a
                      href="mailto:hello@mirembemuse.co.za"
                      className="text-[#6B6B6B] hover:text-cherry transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry rounded"
                    >
                      hello@mirembemuse.co.za
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-cherry/10 rounded-full flex items-center justify-center shrink-0" aria-hidden>
                    <span className="text-cherry text-lg">📍</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-1">Location</h3>
                    <p className="text-[#6B6B6B]">Based in East London, South Africa</p>
                    <p className="text-[#6B6B6B] text-sm">Available for remote work worldwide 🌍</p>
                    <p className="text-[#6B6B6B] text-sm mt-1">
                      Status:{' '}
                      <span className="text-green-600 font-medium">Open for opportunities</span>
                    </p>
                    <p className="text-[#9B9B9B] text-[12px] mt-1">
                      ZAR via PayFast · International via Wise (USD / EUR / GBP / KES)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-cherry/10 rounded-full flex items-center justify-center shrink-0" aria-hidden>
                    <span className="text-cherry text-lg">🔗</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-2">Connect</h3>
                    <div className="space-y-1.5">
                      {SOCIALS.map(({ name, href }) => (
                        <a
                          key={name}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-[#6B6B6B] hover:text-cherry transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry rounded text-sm"
                        >
                          {name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* What I can help with */}
            <FadeUp delay={0.1}>
              <div>
                <h2 className="font-display text-2xl font-bold text-[#1A1A1A] mb-5">
                  What I Can Help With
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {SERVICES.map((s) => (
                    <div
                      key={s.title}
                      className="p-5 bg-[#F5F0E8] rounded-xl border border-[#1A1A1A]/5 hover:border-[#C9A84C]/40 transition-colors"
                    >
                      <div className="text-2xl mb-2">{s.icon}</div>
                      <h3 className="font-display font-bold text-[#1A1A1A] mb-1 text-sm">
                        {s.title}
                      </h3>
                      <p className="text-[#6B6B6B] text-xs leading-relaxed">{s.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Google Review CTA */}
            <FadeUp delay={0.15}>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white border border-[#1A1A1A]/10 rounded-xl hover:border-cherry/30 hover:shadow-md transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry"
              >
                <div className="w-10 h-10 rounded-full bg-[#4285F4]/10 flex items-center justify-center shrink-0">
                  <span className="text-base">★</span>
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm group-hover:text-cherry transition-colors">
                    Leave us a Google Review
                  </p>
                  <p className="text-[#9B9B9B] text-xs">Mirembe Muse (Pty) Ltd</p>
                </div>
                <span className="ml-auto text-[#9B9B9B] group-hover:text-cherry transition-colors text-sm">→</span>
              </a>
            </FadeUp>
          </div>

          {/* RIGHT — Form ──────────────────────────────────────────────────── */}
          <FadeUp delay={0.1}>
            <div id="contact-form" className="bg-white p-8 rounded-3xl shadow-xl border border-[#1A1A1A]/5">
              <h2 className="font-display text-2xl font-bold text-[#1A1A1A] mb-2">Send a Message</h2>
              <p className="text-[#9B9B9B] text-sm mb-6">
                I respond to all serious enquiries within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="contact-name" className="block text-[#1A1A1A] font-medium mb-2 text-sm">
                    Name <span className="text-cherry">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5F0E8] rounded-xl border-2 border-transparent focus:border-cherry focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-[#1A1A1A] font-medium mb-2 text-sm">
                    Email <span className="text-cherry">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5F0E8] rounded-xl border-2 border-transparent focus:border-cherry focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-[#1A1A1A] font-medium mb-2 text-sm">
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5F0E8] rounded-xl border-2 border-transparent focus:border-cherry focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt === 'Select a topic...' ? '' : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[#1A1A1A] font-medium mb-2 text-sm">
                    Message <span className="text-cherry">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-[#F5F0E8] rounded-xl border-2 border-transparent focus:border-cherry focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project or enquiry..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-cherry text-white rounded-xl font-medium hover:bg-cherry/90 transition-all hover:shadow-lg hover:shadow-cherry/20 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry"
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CLOSING ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#F5F0E8]">
        <div className="max-w-lg mx-auto text-center">
          <FadeUp>
            <p className="font-display text-2xl md:text-3xl italic text-[#1A1A1A] leading-relaxed mb-8">
              &ldquo;The best projects start with a clear brief.<br />
              The best collaborations start with honesty.<br />
              Send both.&rdquo;
            </p>
            <button
              onClick={scrollToForm}
              className="px-8 py-4 bg-[#C9A84C] text-[#1A1A1A] rounded-lg font-semibold hover:bg-[#C9A84C]/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
            >
              Send a message
            </button>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
