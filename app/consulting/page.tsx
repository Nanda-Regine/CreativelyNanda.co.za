'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

function FadeUp({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type Service = {
  id: string;
  name: string;
  tagline: string;
  includes: string[];
  zar: string;
  usd: string;
  timeline: string;
  proven?: string;
  signature?: boolean;
};

type Category = {
  id: string;
  label: string;
  accent: string;
  services: Service[];
};

const CATEGORIES: Category[] = [
  {
    id: 'web',
    label: 'Web Development',
    accent: '#C1292E',
    services: [
      {
        id: 'web-1page',
        name: '1-Page Site',
        tagline: 'A single, conversion-focused landing page.',
        includes: ['Custom design — no templates', 'Mobile-first, SEO-ready', 'Contact form or WhatsApp CTA', 'Vercel deployment'],
        zar: 'R5,000–R10,000',
        usd: '$270–$540',
        timeline: '5–7 days',
      },
      {
        id: 'web-5page',
        name: '5-Page Site',
        tagline: 'Full business website with all key pages.',
        includes: ['Home, About, Services, Gallery, Contact', 'Custom brand-aligned design', 'Performance optimised (95+ Lighthouse)', 'WhatsApp + email CTAs'],
        zar: 'R8,000–R15,000',
        usd: '$430–$810',
        timeline: '2–3 weeks',
      },
      {
        id: 'web-5plus',
        name: '5+ Page Site',
        tagline: 'Complex multi-section site with custom features.',
        includes: ['Unlimited pages with CMS', 'Blog, portfolio or product catalogue', 'Advanced animations (Framer Motion)', 'Full SEO + schema markup'],
        zar: 'R30,000–R60,000',
        usd: '$1,620–$3,240',
        timeline: '3–5 weeks',
        proven: 'CreativelyNanda.co.za',
      },
      {
        id: 'web-ecom',
        name: 'E-Commerce Store',
        tagline: 'Full online store with PayFast payments.',
        includes: ['Product catalogue + cart + checkout', 'PayFast ZAR integration', 'Order management + email receipts', 'Digital goods delivery'],
        zar: 'R35,000–R65,000',
        usd: '$1,892–$3,514',
        timeline: '4–6 weeks',
        proven: 'Mirembe Muse Marketplace',
        signature: true,
      },
      {
        id: 'web-booking',
        name: 'Booking System',
        tagline: 'Real-time availability, reservations and payments.',
        includes: ['Space/service availability calendar', 'Double-booking prevention (PostgreSQL tsrange)', 'PayFast + automated confirmations', 'Admin dashboard'],
        zar: 'R30,000–R60,000',
        usd: '$1,622–$3,243',
        timeline: '4–7 weeks',
        proven: 'Cortex Hub Booking',
      },
      {
        id: 'web-location',
        name: 'Location Platform',
        tagline: 'Map-based platform with user contributions.',
        includes: ['Mapbox GL JS interactive maps', 'Community data with RLS', 'WCAG accessibility compliance', 'Mobile-first PWA'],
        zar: 'R30,000–R60,000',
        usd: '$1,622–$3,243',
        timeline: '4–7 weeks',
        proven: 'True Access App',
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI-Powered Apps & Websites',
    accent: '#B8860B',
    services: [
      {
        id: 'ai-chatbot',
        name: 'AI Chatbot Site',
        tagline: 'A website with an intelligent, context-aware assistant.',
        includes: ['Claude or GPT-4o integration', 'Custom system prompt + persona', 'Conversation memory + rate limiting', 'Lead capture + CRM handoff'],
        zar: 'R30,000–R60,000',
        usd: '$1,622–$3,243',
        timeline: '2–4 weeks',
        proven: 'Nanda AI (+15% conversions)',
        signature: true,
      },
      {
        id: 'ai-mcp',
        name: 'MCP-Embedded Site',
        tagline: 'Site powered by custom Model Context Protocol tools.',
        includes: ['Custom MCP server architecture', 'AI agents with tool use (search, DB, calendar)', 'Production-grade prompt caching', 'Real-time streaming responses'],
        zar: 'R60,000–R120,000',
        usd: '$3,243–$6,486',
        timeline: '4–6 weeks',
        proven: 'Architecture proven across 7 live apps',
        signature: true,
      },
      {
        id: 'ai-saas',
        name: 'Full-Stack SaaS',
        tagline: 'A complete AI-powered subscription product.',
        includes: ['Multi-agent system design + build', 'Supabase auth + RLS + multi-tenancy', 'PayFast subscription billing', 'Admin dashboard + analytics'],
        zar: 'R40,000–R100,000',
        usd: '$2,162–$5,405',
        timeline: '5–10 weeks',
        proven: '6 live SaaS products in production',
        signature: true,
      },
      {
        id: 'ai-streaming',
        name: 'Streaming Platform',
        tagline: 'Video platform with creator monetisation.',
        includes: ['Cloudinary or Mux video processing', 'Creator dashboard + analytics', 'Subscription + pay-per-view billing', 'Language-first content discovery'],
        zar: 'R45,000–R90,000',
        usd: '$2,432–$4,865',
        timeline: '6–10 weeks',
        proven: 'WatchSankofa',
      },
      {
        id: 'ai-rag',
        name: 'RAG / Knowledge Base',
        tagline: 'AI that answers from your own documents and data.',
        includes: ['Vector embeddings + semantic search', 'Document ingestion pipeline', 'Context-aware Q&A interface', 'Hallucination guardrails'],
        zar: 'R35,000–R70,000',
        usd: '$1,892–$3,784',
        timeline: '2–3 weeks',
        proven: 'Nanda AI chatbot',
      },
    ],
  },
  {
    id: 'retainers',
    label: 'AI Engineering Retainers',
    accent: '#2D4A22',
    services: [
      {
        id: 'ret-agents',
        name: 'AI Agent Development',
        tagline: 'Ongoing specialist agent builds for your business.',
        includes: ['Monthly scoped agent development', 'Multi-agent architecture advisory', 'Prompt engineering + optimisation', 'Performance monitoring + iteration'],
        zar: 'R25,000–R55,000',
        usd: '$1,351–$2,973',
        timeline: 'per month',
        proven: 'AdminOS + VarsityOS',
        signature: true,
      },
      {
        id: 'ret-whatsapp',
        name: 'WhatsApp AI Automation',
        tagline: 'Intelligent workflows via Meta WhatsApp Cloud API.',
        includes: ['Meta WhatsApp Cloud API integration', 'Automated response + routing flows', 'Lead capture + CRM sync', 'Broadcast + template messaging'],
        zar: 'R10,000–R25,000',
        usd: '$541–$1,351',
        timeline: 'per month',
      },
      {
        id: 'ret-automation',
        name: 'Business Automation',
        tagline: 'Replace manual processes with intelligent systems.',
        includes: ['Workflow audit + automation map', 'Cron-triggered reporting + alerts', 'Data pipeline + dashboard build', 'Staff-facing admin tools'],
        zar: 'R8,000–R20,000',
        usd: '$432–$1,081',
        timeline: 'per month',
        proven: 'AdminOS-proven',
      },
      {
        id: 'ret-reports',
        name: 'AI Health Reports',
        tagline: 'Automated AI-generated business intelligence.',
        includes: ['Weekly or monthly AI narrative reports', 'Anomaly detection + alerts', 'Plain-English summaries for non-technical teams', 'Delivered via email or WhatsApp'],
        zar: 'R5,000–R15,000',
        usd: '$270–$811',
        timeline: 'per month',
        proven: 'StokvelOS + AdminOS',
      },
    ],
  },
  {
    id: 'notion',
    label: 'Notion & Operations',
    accent: '#C1292E',
    services: [
      {
        id: 'notion-solo',
        name: 'Notion OS — Solo',
        tagline: 'A complete personal operating system in Notion.',
        includes: ['Life dashboard + goals + habits', 'Project + task management', 'Knowledge base + notes', 'Finance tracker'],
        zar: 'R5,000–R10,000',
        usd: '$270–$540',
        timeline: '3–5 days',
      },
      {
        id: 'notion-business',
        name: 'Notion OS — Business',
        tagline: 'A full business OS built in Notion.',
        includes: ['CRM with pipeline tracking', 'Financial management + chart of accounts', 'Project + team management', 'SOPs + knowledge base'],
        zar: 'R8,000–R18,000',
        usd: '$432–$973',
        timeline: '1–2 weeks',
      },
      {
        id: 'notion-bundle',
        name: 'Website + Notion Bundle',
        tagline: 'Your entire digital operation, built together.',
        includes: ['Professional website (3–5 pages)', 'Notion OS matched to your business', 'Website ↔ Notion workflow integration', 'Training + handoff session'],
        zar: 'R20,000–R40,000',
        usd: '$1,081–$2,162',
        timeline: '3–4 weeks',
        proven: 'Mirembe Muse templates',
        signature: true,
      },
      {
        id: 'notion-template',
        name: 'Digital Notion Template',
        tagline: 'An off-the-shelf Notion system, ready to use.',
        includes: ['Instant digital delivery', 'Video walkthrough included', 'One week of email support', '6 templates available in the store'],
        zar: 'R299–R1,499',
        usd: '$16–$81',
        timeline: 'instant delivery',
      },
    ],
  },
];

const STEPS = [
  { n: '01', label: 'Book a session or send an email' },
  { n: '02', label: 'We scope the project or retainer together' },
  { n: '03', label: 'I build, you review, we iterate' },
  { n: '04', label: 'You receive documented, production-ready work' },
];

function ServiceCard({ service, accent }: { service: Service; accent: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          backgroundColor: open ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
          border: `1px solid ${open ? accent + '30' : '#E5E2DA'}`,
          borderLeft: `3px solid ${service.signature ? accent : accent + '60'}`,
          borderRadius: '0 16px 0 16px',
          transition: 'all 0.3s ease',
          boxShadow: open ? '0 8px 32px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        {/* Signature badge */}
        {service.signature && (
          <span style={{
            position: 'absolute',
            top: 12,
            right: 12,
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '10px',
            fontWeight: 600,
            color: accent,
            backgroundColor: accent + '15',
            border: `1px solid ${accent}30`,
            padding: '2px 8px',
            borderRadius: '20px',
            letterSpacing: '0.06em',
          }}>
            ★ Signature
          </span>
        )}

        {/* Header — always visible */}
        <button
          onClick={() => setOpen(p => !p)}
          className="w-full text-left"
          style={{ padding: '20px 20px 16px' }}
        >
          <div style={{ paddingRight: service.signature ? '90px' : '0' }}>
            <h4
              style={{
                fontFamily: 'var(--font-display, Georgia, serif)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: open ? accent : '#0A1128',
                margin: '0 0 4px 0',
                transition: 'color 0.2s',
              }}
            >
              {service.name}
            </h4>
            <p style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '0.82rem',
              color: '#6B6B6B',
              margin: 0,
              lineHeight: 1.5,
            }}>
              {service.tagline}
            </p>
          </div>

          {/* What's included preview */}
          <ul style={{ margin: '12px 0 0 0', padding: 0, listStyle: 'none' }}>
            {service.includes.slice(0, 3).map((item, i) => (
              <li key={i} style={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: '0.8rem',
                color: '#4A4A4A',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                marginBottom: '4px',
              }}>
                <span style={{ color: accent, marginTop: '2px', flexShrink: 0, fontSize: '10px' }}>◆</span>
                {item}
              </li>
            ))}
            {service.includes.length > 3 && !open && (
              <li style={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: '0.75rem',
                color: '#9B9588',
                paddingLeft: '18px',
                marginBottom: '4px',
              }}>
                +{service.includes.length - 3} more included
              </li>
            )}
          </ul>

          {/* Toggle hint */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '14px',
          }}>
            <span style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: accent,
            }}>
              {open ? 'Hide pricing' : 'Reveal pricing'}
            </span>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ color: accent, fontSize: '12px', display: 'inline-block' }}
            >
              ↓
            </motion.span>
          </div>
        </button>

        {/* Revealed price */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                padding: '0 20px 20px',
                borderTop: `1px solid ${accent}15`,
                marginTop: '4px',
                paddingTop: '16px',
              }}>
                {/* Full includes list */}
                {service.includes.length > 3 && (
                  <ul style={{ margin: '0 0 16px 0', padding: 0, listStyle: 'none' }}>
                    {service.includes.slice(3).map((item, i) => (
                      <li key={i} style={{
                        fontFamily: 'var(--font-body, sans-serif)',
                        fontSize: '0.8rem',
                        color: '#4A4A4A',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        marginBottom: '4px',
                      }}>
                        <span style={{ color: accent, marginTop: '2px', flexShrink: 0, fontSize: '10px' }}>◆</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Price block */}
                <div style={{
                  backgroundColor: accent + '08',
                  border: `1px solid ${accent}20`,
                  borderRadius: '8px',
                  padding: '14px 16px',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-display, Georgia, serif)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: accent,
                    margin: '0 0 2px 0',
                    letterSpacing: '-0.01em',
                  }}>
                    {service.zar}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: '0.75rem',
                    color: '#9B9588',
                    margin: '0 0 8px 0',
                  }}>
                    {service.usd} USD · {service.timeline}
                  </p>
                  {service.proven && (
                    <p style={{
                      fontFamily: 'var(--font-cormorant, Georgia, serif)',
                      fontStyle: 'italic',
                      fontSize: '0.82rem',
                      color: accent + 'CC',
                      margin: 0,
                    }}>
                      Proven by {service.proven}
                    </p>
                  )}
                </div>

                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '12px',
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: accent,
                    textDecoration: 'none',
                  }}
                >
                  Get a quote →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ConsultingPage() {
  return (
    <div style={{ backgroundColor: '#FAFAF8', color: '#1A1A1A' }}>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0A1128 0%, #1a2744 50%, #0A1128 100%)',
        padding: 'clamp(80px, 12vw, 140px) 24px clamp(60px, 8vw, 100px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grain */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }} />
        {/* Cherry corner accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '280px',
          height: '280px',
          backgroundColor: 'rgba(193,41,46,0.08)',
          borderRadius: '0 0 0 100%',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <FadeUp>
            <p style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C1292E',
              marginBottom: '20px',
            }}>
              AI Engineering · Systems Architecture · Africa-first
            </p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#FFFFFF',
              marginBottom: '24px',
            }}>
              You don&apos;t need to hire a team.{' '}
              <span style={{ color: '#C1292E' }}>You need the right person.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.6)',
              maxWidth: '560px',
              lineHeight: 1.7,
              marginBottom: '36px',
            }}>
              AI engineering, product strategy, and technical architecture — from
              the founder who built seven Africa-first products in nine months.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="#pricing"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 28px',
                  borderRadius: '50px',
                  backgroundColor: '#C1292E',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                View Services & Pricing
              </a>
              <Link
                href="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 28px',
                  borderRadius: '50px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                View Projects →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ backgroundColor: '#FAFAF8', padding: 'clamp(48px, 8vw, 96px) 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FadeUp>
            <p style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C1292E',
              marginBottom: '8px',
            }}>
              Transparent pricing
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#0A1128',
              marginBottom: '8px',
            }}>
              Services & Engagements
            </h2>
            <p style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '0.95rem',
              color: '#6B6B6B',
              marginBottom: '48px',
              maxWidth: '520px',
              lineHeight: 1.6,
            }}>
              All rates in ZAR — USD equivalent at R18.50 per dollar.
              Tap any service to reveal full pricing.
            </p>
          </FadeUp>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {CATEGORIES.map((cat) => (
              <FadeUp key={cat.id}>
                {/* Category header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: `2px solid ${cat.accent}20`,
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: cat.accent,
                    flexShrink: 0,
                  }} />
                  <p style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: cat.accent,
                    fontWeight: 600,
                    margin: 0,
                  }}>
                    {cat.label}
                  </p>
                </div>

                {/* Service cards grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
                  gap: '12px',
                }}>
                  {cat.services.map((service) => (
                    <ServiceCard key={service.id} service={service} accent={cat.accent} />
                  ))}
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Not sure CTA */}
          <FadeUp>
            <div style={{
              marginTop: '48px',
              padding: '28px 32px',
              backgroundColor: 'rgba(193,41,46,0.04)',
              border: '1px solid rgba(193,41,46,0.15)',
              borderRadius: '0 24px 0 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
            className="sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p style={{
                  fontFamily: 'var(--font-display, Georgia, serif)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#0A1128',
                  margin: '0 0 4px 0',
                }}>
                  Not sure which tier fits?
                </p>
                <p style={{
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontStyle: 'italic',
                  fontSize: '0.88rem',
                  color: '#6B6B6B',
                  margin: 0,
                }}>
                  Send a brief and I&apos;ll scope it honestly.
                </p>
              </div>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '12px 24px',
                  borderRadius: '50px',
                  backgroundColor: '#C1292E',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                Get a Quote →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── WHY ME ── cream with cherry accent ── */}
      <section style={{
        background: 'linear-gradient(135deg, #F5EFE6 0%, #E8DCC4 100%)',
        padding: 'clamp(48px, 8vw, 96px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <FadeUp>
            <blockquote style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(1.2rem, 2.8vw, 1.8rem)',
              fontStyle: 'italic',
              lineHeight: 1.55,
              color: '#0A1128',
              borderLeft: '3px solid #C1292E',
              paddingLeft: '24px',
              marginBottom: '48px',
              maxWidth: '760px',
            }}>
              &ldquo;I don&apos;t just know how to build with AI — I&apos;ve built seven
              products that are live, indexed, paying users, and running in
              production. The people I work with get that context applied to their problem.&rdquo;
            </blockquote>
          </FadeUp>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { heading: '7 production AI apps', proof: 'Built solo in 9 months — VarsityOS, K53, StokvelOS, AdminOS, WatchSankofa, SankofaSessions, CreativelyNanda.', accent: '#C1292E' },
              { heading: 'Africa-first engineering', proof: 'WhatsApp-native, PayFast-integrated, RLS-secured, load-shedding-aware. Built from inside the context.', accent: '#B8860B' },
              { heading: 'The poet who codes', proof: 'Published author of Inside Her Roses. The only AI engineer writing system architecture and sonnets in the same week.', accent: '#2D4A22' },
            ].map((c, i) => (
              <FadeUp key={c.heading} delay={i * 0.08}>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E2DA',
                  borderLeft: `3px solid ${c.accent}`,
                  borderRadius: '0 16px 0 16px',
                  padding: '24px',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display, Georgia, serif)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#0A1128',
                    margin: '0 0 8px 0',
                  }}>
                    {c.heading}
                  </h4>
                  <p style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: '0.85rem',
                    color: '#6B6B6B',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {c.proof}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── white ── */}
      <section style={{ backgroundColor: '#FFFFFF', padding: 'clamp(48px, 8vw, 96px) 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FadeUp>
            <h2 style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 700,
              color: '#0A1128',
              marginBottom: '48px',
            }}>
              From first message to shipped product
            </h2>
          </FadeUp>

          <div style={{ position: 'relative' }}>
            {/* connector line desktop */}
            <div style={{
              position: 'absolute',
              top: '28px',
              left: '7%',
              right: '7%',
              height: '1px',
              backgroundImage: 'repeating-linear-gradient(to right, #C1292E 0, #C1292E 8px, transparent 8px, transparent 18px)',
              zIndex: 0,
            }} className="hidden md:block" />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '24px',
              position: 'relative',
              zIndex: 1,
            }}>
              {STEPS.map((step) => (
                <FadeUp key={step.n}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      border: '2px solid #C1292E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      backgroundColor: '#FFFFFF',
                      fontFamily: 'var(--font-body, sans-serif)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      color: '#C1292E',
                    }}>
                      {step.n}
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-body, sans-serif)',
                      fontSize: '0.85rem',
                      color: '#4A4A4A',
                      lineHeight: 1.5,
                      margin: 0,
                    }}>
                      {step.label}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PAYMENT ── cream ── */}
      <section style={{
        backgroundColor: '#F5EFE6',
        padding: 'clamp(40px, 6vw, 72px) 24px',
        borderTop: '1px solid #E5E2DA',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FadeUp>
            <p style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C1292E',
              marginBottom: '24px',
              fontWeight: 600,
            }}>
              Payment
            </p>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              {
                title: 'South African clients',
                body: 'Invoiced in ZAR via PayFast. Bank transfer accepted for projects over R20,000.',
                badge: 'PayFast · ZAR',
                badgeColor: '#B8860B',
              },
              {
                title: 'International clients',
                body: 'Invoiced in USD, EUR, GBP, or KES via Wise. No conversion fees. Same-day setup.',
                badge: 'Wise · USD · EUR · GBP · KES',
                badgeColor: '#0A1128',
              },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.08}>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E2DA',
                  borderRadius: '0 16px 0 16px',
                  padding: '24px',
                }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display, Georgia, serif)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#0A1128',
                    margin: '0 0 8px 0',
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: '0.85rem',
                    color: '#6B6B6B',
                    lineHeight: 1.6,
                    margin: '0 0 16px 0',
                  }}>
                    {item.body}
                  </p>
                  <span style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: item.badgeColor,
                    backgroundColor: item.badgeColor + '12',
                    border: `1px solid ${item.badgeColor}25`,
                    padding: '4px 12px',
                    borderRadius: '20px',
                  }}>
                    {item.badge}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK — cherry ── */}
      <section
        id="book"
        style={{
          backgroundColor: '#C1292E',
          padding: 'clamp(56px, 10vw, 112px) 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.2,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '40px',
            }}>
              Start the conversation
            </h2>
          </FadeUp>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '28px' }}>
            <FadeUp>
              <div style={{
                backgroundColor: '#0A1128',
                borderRadius: '24px 8px 24px 8px',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                <p style={{
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: '#B8860B',
                  margin: 0,
                }}>
                  Email me directly
                </p>
                <a
                  href="mailto:hello@creativelynanda.co.za"
                  style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                  }}
                >
                  hello@creativelynanda.co.za
                </a>
                <p style={{
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '0.82rem',
                  color: 'rgba(255,255,255,0.5)',
                  margin: 0,
                }}>
                  I respond within 24 hours.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <Link
                href="/contact"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#0A1128',
                  borderRadius: '8px 24px 8px 24px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '28px',
                  textDecoration: 'none',
                  minHeight: '120px',
                }}
              >
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    color: '#B8860B',
                    margin: '0 0 8px 0',
                  }}>
                    Use the contact form
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: '0.82rem',
                    color: 'rgba(255,255,255,0.55)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}>
                    Preferred for project briefs — gives me the context I need.
                  </p>
                </div>
                <span style={{
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  color: '#FFFFFF',
                  marginTop: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  Go to contact form →
                </span>
              </Link>
            </FadeUp>
          </div>

          <FadeUp delay={0.15}>
            <p style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.55)',
              textAlign: 'center',
            }}>
              No discovery calls unless you want one. A clear brief is enough to get started.
            </p>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
