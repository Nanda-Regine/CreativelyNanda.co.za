'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import TexturedSection, { TEXTURES } from '@/components/ui/TexturedSection';

const P = (id: string) => `creativelynanda/nanda-portraits/${id}`;
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

const SOCIALS = [
  { name: 'Instagram', href: 'https://www.instagram.com/creativelynanda/' },
  { name: 'Twitter / X', href: 'https://x.com/CreativelyNanda' },
  { name: 'Substack — Sankofa Sessions', href: 'https://substack.com/@sankofasessions' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/nandawula-kabali-kagwa-584bb0262/' },
  { name: 'GitHub', href: 'https://github.com/Nanda-Regine' },
];

const SUBJECT_OPTIONS = [
  'What is this about?',
  'Poetry & creative work',
  'Collaboration / partnership',
  'Speaking or an invitation',
  'Press',
  'Business & tech (Mirembe Muse)',
  'Just saying hello',
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
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

  const inputCls = 'w-full rounded-lg border border-white/15 bg-[#0d1330] px-4 py-3 text-white placeholder-white/25 outline-none transition-colors focus:border-[#C9943A]/60';
  const labelCls = 'mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9943A]';

  return (
    <main className="min-h-screen bg-[#0A1128] text-[#F5F0E8]">
      <div className="fixed inset-0 pointer-events-none opacity-[0.14] z-0" style={{ backgroundImage: GRAIN }} />
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-[#C9943A]/10 blur-3xl" />

      {/* toasts */}
      {status === 'success' && (
        <div role="status" className="fixed right-6 top-6 z-[80] flex max-w-sm items-center gap-3 rounded-xl border border-[#C9943A]/40 bg-[#0A1128] px-6 py-4 shadow-xl">
          <span className="text-xl text-[#C9943A]">✓</span>
          <div><p className="font-medium text-white">Message sent 🌹</p><p className="text-sm text-white/50">I&apos;ll write back soon.</p></div>
          <button onClick={() => setStatus('idle')} className="ml-auto text-white/40 hover:text-white" aria-label="Dismiss">✕</button>
        </div>
      )}
      {status === 'error' && (
        <div role="alert" className="fixed right-6 top-6 z-[80] flex max-w-sm items-center gap-3 rounded-xl bg-[#C1292E] px-6 py-4 text-white shadow-xl">
          <span className="text-xl">⚠</span>
          <div><p className="font-medium">Something went wrong</p><p className="text-sm text-white/70">Email hello@creativelynanda.co.za directly.</p></div>
          <button onClick={() => setStatus('idle')} className="ml-auto text-white/60 hover:text-white" aria-label="Dismiss">✕</button>
        </div>
      )}

      {/* ── OPENER (textured depth) ── */}
      <TexturedSection texture={TEXTURES.roseWall} tone="wine" className="relative z-10 px-6 pt-36 pb-16 text-center">
        <FadeUp>
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-[#C9943A] mb-5">Say hello</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="font-display text-6xl md:text-8xl font-bold italic leading-[0.9]">Get in Touch</h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-white/60">
            For poetry and performance, a collaboration, an invitation, or simply to say a line landed —
            this is where it starts.
          </p>
        </FadeUp>
      </TexturedSection>

      {/* ── MAIN ── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-12 md:grid-cols-2">

          {/* LEFT — invitation + details */}
          <div className="space-y-10">
            <FadeUp>
              <div className="relative aspect-[5/4] overflow-hidden rounded-xl ring-1 ring-[#C9943A]/20">
                <CldImage src={P('nanda-green-2')} alt="Nanda in a tropical garden at golden hour" fill sizes="(max-width:768px) 100vw, 45vw" className="object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,17,40,0.55) 0%, transparent 55%)' }} />
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="space-y-6">
                <div>
                  <p className={labelCls}>Write to me</p>
                  <a href="mailto:hello@creativelynanda.co.za" className="font-display text-2xl italic text-white transition-colors hover:text-[#C9943A]">
                    hello@creativelynanda.co.za
                  </a>
                </div>
                <div className="h-px w-full bg-[#C9943A]/20" />
                <div>
                  <p className={labelCls}>Where I am</p>
                  <p className="text-white/70">KuGompo City, Eastern Cape — South Africa.</p>
                  <p className="text-sm text-white/40">And on stages, and online, wherever the words are needed.</p>
                </div>
                <div className="h-px w-full bg-[#C9943A]/20" />
                <div>
                  <p className={labelCls}>Find me</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                    {SOCIALS.map(({ name, href }) => (
                      <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 transition-colors hover:text-[#C9943A]">
                        {name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-[#C9943A]/25 bg-white/[0.03] p-5">
                  <p className="text-sm text-white/70">
                    Here for <span className="text-white">software, AI, or to work with me professionally?</span> That
                    lives under my company —{' '}
                    <a href="https://mirembemuse.co.za" target="_blank" rel="noopener noreferrer" className="font-medium text-[#C9943A] underline underline-offset-2 hover:opacity-80">
                      Mirembe Muse ↗
                    </a>
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — form */}
          <FadeUp delay={0.1}>
            <div id="contact-form" className="rounded-2xl border border-[#C9943A]/25 bg-white/[0.03] p-7 md:p-8">
              <h2 className="font-display text-3xl font-bold italic text-white">Send a message</h2>
              <p className="mb-7 mt-1 text-sm text-white/45">Every real one gets a real reply.</p>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="c-name" className={labelCls}>Name *</label>
                  <input id="c-name" type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="c-email" className={labelCls}>Email *</label>
                  <input id="c-email" type="email" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="c-subject" className={labelCls}>About</label>
                  <select id="c-subject" value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`${inputCls} cursor-pointer appearance-none`}>
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt === 'What is this about?' ? '' : opt} style={{ backgroundColor: '#0A1128' }}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="c-message" className={labelCls}>Message *</label>
                  <textarea id="c-message" rows={5} required value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me what&apos;s on your mind…" className={`${inputCls} resize-none`} />
                </div>
                <button type="submit" disabled={status === 'loading'}
                  className="w-full rounded-full bg-[#C1292E] py-4 font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-60">
                  {status === 'loading' ? 'Sending…' : 'Send it →'}
                </button>
              </form>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CLOSE ── */}
      <section className="relative z-10 px-6 pb-28 pt-4 text-center" style={{ background: 'radial-gradient(120% 90% at 50% 100%, #241021 0%, transparent 60%)' }}>
        <FadeUp>
          <p className="mx-auto max-w-xl font-display text-2xl md:text-3xl italic leading-relaxed text-white/90">
            Bring a clear thought and an honest word. That&apos;s always where the good things start.
          </p>
        </FadeUp>
      </section>
    </main>
  );
}
