'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

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
    icon: '⬡',
    title: 'AI Integration',
    body: 'Custom AI agents, Claude API integrations, and multi-agent systems. From R45,000/project.',
  },
  {
    icon: '◈',
    title: 'Fractional AI Officer',
    body: 'Monthly AI strategy and advisory retainer. From R18,000/month.',
  },
  {
    icon: '◆',
    title: 'Notion Systems',
    body: 'Custom business operating systems for entrepreneurs and SMEs.',
  },
  {
    icon: '◇',
    title: 'Speaking & Workshops',
    body: 'Conferences, panels, university lectures, and corporate AI workshops.',
  },
];

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
    <main className="min-h-screen" style={{ backgroundColor: '#0A1128' }}>
      {/* Grain texture */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0" style={{ backgroundImage: GRAIN }} />

      {/* ── Toast notifications ───────────────────────────────────────────────── */}
      {status === 'success' && (
        <div
          role="status"
          className="fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 max-w-sm"
          style={{ backgroundColor: '#0A1128', border: '1px solid #C1292E40' }}
        >
          <span className="text-[#C1292E] text-xl">✓</span>
          <div>
            <p className="font-medium text-white">Message sent!</p>
            <p className="text-white/50 text-sm">I&apos;ll respond within 24 hours.</p>
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="ml-auto text-white/40 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}
      {status === 'error' && (
        <div
          role="alert"
          className="fixed top-6 right-6 z-50 bg-[#C1292E] text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 max-w-sm"
        >
          <span className="text-xl">⚠</span>
          <div>
            <p className="font-medium">Something went wrong</p>
            <p className="text-white/70 text-sm">Email hello@creativelynanda.co.za directly.</p>
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

      {/* ── HERO — full navy ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden" style={{ backgroundColor: '#0A1128' }}>
        {/* Asymmetric cherry blob — top right */}
        <div
          className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
          style={{ backgroundColor: '#C1292E18', borderRadius: '0 0 0 100%' }}
        />
        {/* Gold accent line — left */}
        <div className="absolute left-0 top-32 w-1 h-32 bg-[#B8860B]/60 pointer-events-none" style={{ borderRadius: '0 4px 4px 0' }} />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <FadeUp>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-[#C1292E] mb-4">
              Let&apos;s Create Together
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white mb-6 leading-[0.9]">
              Get in<br /><span className="text-[#C1292E]">Touch</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-4">
              Whether you have a project brief, a consulting enquiry, a speaking invitation,
              or a press request — this is where it starts.
            </p>
            <p className="text-[13px] text-[#B8860B] font-medium">
              Looking to hire Nanda?{' '}
              <Link href="/consulting" className="text-[#C1292E] underline underline-offset-2 hover:opacity-80 transition-opacity">
                View consulting offers and pricing →
              </Link>
            </p>
          </FadeUp>
        </div>

        {/* Diagonal divider into main content */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #0A1128 49%, #E8DCC4 50%)',
          }}
        />
      </section>

      {/* ── MAIN GRID ────────────────────────────────────────────────── */}
      <section className="relative pb-24 px-6" style={{ backgroundColor: '#E8DCC4' }}>
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        {/* Cherry asymmetric shape */}
        <div
          className="absolute top-20 right-8 w-32 h-32 pointer-events-none"
          style={{ backgroundColor: '#C1292E12', borderRadius: '50% 0 50% 50%', transform: 'rotate(15deg)' }}
        />
        {/* Navy shape bottom-left */}
        <div
          className="absolute bottom-20 left-4 w-20 h-20 pointer-events-none"
          style={{ backgroundColor: '#0A112815', borderRadius: '0 50% 50% 50%', transform: 'rotate(-20deg)' }}
        />

        <div className="max-w-5xl mx-auto relative z-10 pt-8">
          <div className="grid md:grid-cols-2 gap-12">

            {/* LEFT — Info ──────────────────────────────────────────── */}
            <div className="space-y-10">

              {/* Direct contact */}
              <FadeUp>
                <div className="space-y-5">
                  <div
                    className="flex items-start gap-4 p-5 rounded-2xl"
                    style={{ backgroundColor: '#0A1128', borderRadius: '24px 8px 24px 8px' }}
                  >
                    <div className="w-10 h-10 bg-[#C1292E] rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white text-base">✉</span>
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white mb-1">Email</h3>
                      <a
                        href="mailto:hello@creativelynanda.co.za"
                        className="text-white/60 hover:text-[#C1292E] transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E] rounded"
                      >
                        hello@creativelynanda.co.za
                      </a>
                    </div>
                  </div>

                  <div
                    className="flex items-start gap-4 p-5"
                    style={{ backgroundColor: '#0A1128', borderRadius: '8px 24px 8px 24px' }}
                  >
                    <div className="w-10 h-10 bg-[#C1292E] rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white text-base">📍</span>
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white mb-1">Location</h3>
                      <p className="text-white/60 text-sm">Based in East London, South Africa</p>
                      <p className="text-white/50 text-xs mt-0.5">Available for remote work worldwide</p>
                      <p className="text-green-400 text-xs font-medium mt-1">Open for opportunities</p>
                      <p className="text-white/30 text-[11px] mt-1">
                        ZAR via PayFast · International via Wise
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-start gap-4 p-5"
                    style={{ backgroundColor: '#0A1128', borderRadius: '24px 8px 24px 8px' }}
                  >
                    <div className="w-10 h-10 bg-[#C1292E] rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white text-base">🔗</span>
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white mb-2">Connect</h3>
                      <div className="space-y-1.5">
                        {SOCIALS.map(({ name, href }) => (
                          <a
                            key={name}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-white/50 hover:text-[#C1292E] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E] rounded text-sm"
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
                  <h2 className="font-display text-2xl font-bold text-[#0A1128] mb-5">
                    What I Can Help With
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {SERVICES.map((s, i) => (
                      <div
                        key={s.title}
                        className="p-5 relative overflow-hidden"
                        style={{
                          backgroundColor: '#0A1128',
                          borderRadius: i % 2 === 0 ? '20px 6px 20px 6px' : '6px 20px 6px 20px',
                          border: '1px solid #C1292E20',
                        }}
                      >
                        <span className="text-[#C1292E] text-lg mb-2 block">{s.icon}</span>
                        <h3 className="font-display font-bold text-white mb-1 text-sm">{s.title}</h3>
                        <p className="text-white/50 text-xs leading-relaxed">{s.body}</p>
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
                  className="flex items-center gap-3 p-4 rounded-xl hover:shadow-md transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
                  style={{ backgroundColor: '#0A1128', border: '1px solid #C1292E20' }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#C1292E]/15 flex items-center justify-center shrink-0">
                    <span className="text-[#C1292E] text-base">★</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm group-hover:text-[#C1292E] transition-colors">
                      Leave us a Google Review
                    </p>
                    <p className="text-white/40 text-xs">Mirembe Muse (Pty) Ltd</p>
                  </div>
                  <span className="ml-auto text-white/30 group-hover:text-[#C1292E] transition-colors text-sm">→</span>
                </a>
              </FadeUp>
            </div>

            {/* RIGHT — Form ─────────────────────────────────────────── */}
            <FadeUp delay={0.1}>
              <div
                id="contact-form"
                className="p-8 relative overflow-hidden"
                style={{
                  backgroundColor: '#0A1128',
                  borderRadius: '32px 12px 32px 12px',
                  border: '1px solid #C1292E25',
                }}
              >
                {/* Grain on form panel */}
                <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
                {/* Cherry blob top-right of form */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                  style={{ backgroundColor: '#C1292E15', borderRadius: '0 12px 0 100%' }}
                />

                <div className="relative z-10">
                  <h2 className="font-display text-2xl font-bold text-white mb-1">Send a Message</h2>
                  <p className="text-white/40 text-sm mb-7">
                    I respond to all serious enquiries within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div>
                      <label htmlFor="contact-name" className="block text-[#C1292E] font-medium mb-2 text-xs tracking-widest uppercase">
                        Name <span className="text-[#C1292E]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-transparent focus:border-[#C1292E] focus:outline-none transition-colors text-white placeholder-white/30"
                        style={{ backgroundColor: '#1a2744' }}
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-[#C1292E] font-medium mb-2 text-xs tracking-widest uppercase">
                        Email <span className="text-[#C1292E]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-transparent focus:border-[#C1292E] focus:outline-none transition-colors text-white placeholder-white/30"
                        style={{ backgroundColor: '#1a2744' }}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-[#C1292E] font-medium mb-2 text-xs tracking-widest uppercase">
                        Subject
                      </label>
                      <select
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-transparent focus:border-[#C1292E] focus:outline-none transition-colors appearance-none cursor-pointer text-white"
                        style={{ backgroundColor: '#1a2744' }}
                      >
                        {SUBJECT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt === 'Select a topic...' ? '' : opt} style={{ backgroundColor: '#0A1128' }}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-[#C1292E] font-medium mb-2 text-xs tracking-widest uppercase">
                        Message <span className="text-[#C1292E]">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border-2 border-transparent focus:border-[#C1292E] focus:outline-none transition-colors resize-none text-white placeholder-white/30"
                        style={{ backgroundColor: '#1a2744' }}
                        placeholder="Tell me about your project or enquiry..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 bg-[#C1292E] text-white rounded-xl font-medium hover:bg-[#C1292E]/90 transition-all hover:shadow-lg hover:shadow-[#C1292E]/20 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
                    >
                      {status === 'loading' ? 'Sending…' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CLOSING — navy again ─────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: '#0A1128' }}>
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        {/* Diagonal top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-10 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #E8DCC4 49%, #0A1128 50%)' }}
        />
        {/* Cherry shape */}
        <div
          className="absolute bottom-8 right-8 w-40 h-40 pointer-events-none"
          style={{ backgroundColor: '#C1292E12', borderRadius: '50% 0 50% 50%' }}
        />
        <div className="max-w-lg mx-auto text-center relative z-10 pt-4">
          <FadeUp>
            <p className="font-display text-2xl md:text-3xl italic text-white leading-relaxed mb-8">
              &ldquo;The best projects start with a clear brief.<br />
              The best collaborations start with honesty.<br />
              Send both.&rdquo;
            </p>
            <button
              onClick={scrollToForm}
              className="px-8 py-4 bg-[#C1292E] text-white rounded-full font-semibold hover:bg-[#C1292E]/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
            >
              Send a message
            </button>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
