'use client';
import { useState } from 'react';
import Link from 'next/link';

// Replace this URL with your actual Mirembe Muse Google Business review link
const GOOGLE_REVIEW_URL =
  'https://g.page/r/REPLACE_WITH_YOUR_GOOGLE_BUSINESS_PLACE_ID/review';

const SOCIALS = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/nandawula-kabali-kagwa-584bb0262/' },
  { name: 'GitHub', href: 'https://github.com/Nanda-Regine' },
  { name: 'Twitter/X', href: 'https://x.com/CreativelyNanda' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
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

  return (
    <div className="page-transition min-h-screen bg-gradient-to-br from-beige-light via-white to-beige py-24 px-6">
      {/* Toast notification */}
      {status === 'success' && (
        <div
          role="status"
          className="fixed top-6 right-6 z-50 bg-navy text-beige px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 max-w-sm"
        >
          <span className="text-cherry text-xl">✓</span>
          <div>
            <p className="font-medium">Message sent!</p>
            <p className="text-beige/60 text-sm">I&apos;ll get back to you within 24–48 hours.</p>
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
            <p className="text-white/70 text-sm">Please email hello@creativelynanda.co.za directly.</p>
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

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Side — Info */}
          <div className="space-y-8">
            <div>
              <h1 className="font-display text-6xl md:text-7xl font-bold text-navy mb-6">
                Let&apos;s <span className="text-cherry">Connect</span>
              </h1>
              <p className="text-lg md:text-xl text-navy/70 leading-relaxed">
                Have a project in mind? Want to collaborate? Need a custom Notion system?
                Or just want to talk about poetry and code? I&apos;d love to hear from you.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cherry/10 rounded-full flex items-center justify-center shrink-0" aria-hidden>
                  <span className="text-cherry text-xl">✉</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy mb-1">Email</h3>
                  <a
                    href="mailto:hello@creativelynanda.co.za"
                    className="text-navy/60 hover:text-cherry transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry rounded"
                  >
                    hello@creativelynanda.co.za
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cherry/10 rounded-full flex items-center justify-center shrink-0" aria-hidden>
                  <span className="text-cherry text-xl">📍</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy mb-1">Location</h3>
                  <p className="text-navy/60">East London, South Africa</p>
                  <p className="text-navy/60 text-sm">Remote work available worldwide</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cherry/10 rounded-full flex items-center justify-center shrink-0" aria-hidden>
                  <span className="text-cherry text-xl">🔗</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy mb-1">Connect</h3>
                  <div className="space-y-1">
                    {SOCIALS.map(({ name, href }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-navy/60 hover:text-cherry transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry rounded"
                      >
                        {name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="p-6 bg-navy rounded-2xl text-beige">
              <h3 className="font-display text-2xl font-bold mb-3">What I Offer</h3>
              <ul className="space-y-2 text-beige/80 text-sm">
                <li>→ Full-stack web development</li>
                <li>→ Custom Notion systems &amp; templates</li>
                <li>→ AI integration &amp; chatbots</li>
                <li>→ Technical consulting</li>
                <li>→ Poetry workshops &amp; performances</li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div className="p-6 bg-white rounded-2xl border border-cherry/10 shadow-sm">
              <h3 className="font-display text-2xl font-bold text-navy mb-4">Payment Methods</h3>
              <p className="text-navy/60 text-sm mb-4">
                I accept payment from clients anywhere in the world.
              </p>

              {/* PayFast */}
              <div className="flex items-start gap-4 mb-4 pb-4 border-b border-navy/10">
                <div className="w-10 h-10 bg-[#0079C1]/10 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-[#0079C1] font-bold text-sm">PF</span>
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">PayFast — South African clients</p>
                  <p className="text-navy/60 text-xs mt-0.5">ZAR · Credit/Debit Card · EFT · Instant EFT · SnapScan</p>
                </div>
              </div>

              {/* Wise */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#00B9FF]/10 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-[#00B9FF] font-bold text-sm">W</span>
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">Wise — International clients</p>
                  <p className="text-navy/60 text-xs mt-0.5">USD · EUR · GBP · KES · Low transfer fees</p>
                </div>
              </div>
            </div>

            {/* Google Review CTA */}
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white border border-navy/10 rounded-xl hover:border-cherry/30 hover:shadow-md transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry"
            >
              <div className="w-10 h-10 rounded-full bg-[#4285F4]/10 flex items-center justify-center shrink-0">
                <span className="text-base">★</span>
              </div>
              <div>
                <p className="font-semibold text-navy text-sm group-hover:text-cherry transition-colors">
                  Leave us a Google Review
                </p>
                <p className="text-navy/50 text-xs">Mirembe Muse (Pty) Ltd</p>
              </div>
              <span className="ml-auto text-navy/30 group-hover:text-cherry transition-colors text-sm">→</span>
            </a>
          </div>

          {/* Right Side — Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h2 className="font-display text-2xl font-bold text-navy mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="contact-name" className="block text-navy font-medium mb-2 text-sm">
                  Name <span className="text-cherry">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-beige/30 rounded-xl border-2 border-transparent focus:border-cherry focus:outline-none transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-navy font-medium mb-2 text-sm">
                  Email <span className="text-cherry">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-beige/30 rounded-xl border-2 border-transparent focus:border-cherry focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-navy font-medium mb-2 text-sm">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-beige/30 rounded-xl border-2 border-transparent focus:border-cherry focus:outline-none transition-colors"
                  placeholder="e.g. Web development project"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-navy font-medium mb-2 text-sm">
                  Message <span className="text-cherry">*</span>
                </label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-beige/30 rounded-xl border-2 border-transparent focus:border-cherry focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
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
        </div>
      </div>
    </div>
  );
}
