'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, type Project, type ProjectCategory } from '@/lib/data/projects';

// ── helpers ──────────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
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

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

const FILTER_LABELS: { key: ProjectCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'saas', label: 'Live SaaS' },
  { key: 'media', label: 'Media' },
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'origin', label: 'Origins' },
];

const README_MAP: Record<string, string> = {
  adminos: '/build-journeys/README_AdminOS.md',
  varsityos: '/build-journeys/README_VarsityOS.md',
  stokvelos: '/build-journeys/README_StokvelOS.md',
  k53: '/build-journeys/README_K53.md',
  watchsankofa: '/build-journeys/README_WatchSankofa.md',
  creativelynanda: '/build-journeys/README_AdminOS.md',
  origins: '/build-journeys/README_Origins.md',
};

const JOURNEY_MAP: Record<string, string> = {
  adminos: '/build-journeys/adminos-build-journey.md',
  varsityos: '/build-journeys/varsityos-build-journey.md',
  stokvelos: '/build-journeys/stokvelos-build-journey.md',
  k53: '/build-journeys/k53-build-journey.md',
  watchsankofa: '/build-journeys/sankofatv-build-journey.md',
  creativelynanda: '/build-journeys/creativelynanda-build-journey.md',
};

function StatusBadge({ status }: { status: Project['status'] }) {
  const map = {
    live: { bg: '#2D4A22', color: '#7A9E7E', label: 'LIVE' },
    beta: { bg: '#1A2A40', color: '#C9943A', label: 'BETA' },
    building: { bg: '#2A1A10', color: '#C4566A', label: 'BUILDING' },
  };
  const s = map[status];
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      fontFamily: 'var(--font-mono)',
      fontSize: '8px',
      letterSpacing: '0.25em',
      padding: '3px 8px',
      borderRadius: '2px',
      textTransform: 'uppercase' as const,
      border: `1px solid ${s.color}40`,
    }}>
      {s.label}
    </span>
  );
}

function CategoryBadge({ category }: { category: Project['category'] }) {
  const map: Record<ProjectCategory, string> = {
    saas: 'SaaS Product',
    media: 'Media Platform',
    portfolio: 'Portfolio',
    origin: 'Foundation',
  };
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '8px',
      letterSpacing: '0.2em',
      color: 'rgba(201,168,76,0.6)',
      textTransform: 'uppercase' as const,
    }}>
      {map[category]}
    </span>
  );
}

// ── Case Study Expansion ───────────────────────────────────────────────────────

function CaseStudy({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: 'hidden' }}
    >
      <div style={{
        background: 'rgba(10,15,44,0.6)',
        borderTop: `1px solid ${project.accentColor}30`,
        padding: '32px 28px',
      }}>
        {/* Problem / Solution / Impact */}
        <div style={{ display: 'grid', gap: '24px', marginBottom: '32px' }}>
          {[
            { label: 'THE PROBLEM', text: project.problem, icon: '⚡' },
            { label: 'THE SOLUTION', text: project.solution, icon: '⚙' },
            { label: 'THE IMPACT', text: project.impact, icon: '◆' },
          ].map(({ label, text, icon }) => (
            <div key={label}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: project.accentColor, letterSpacing: '0.3em', margin: '0 0 8px 0' }}>
                {icon} {label}
              </p>
              <p style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '14px', color: 'rgba(245,240,232,0.75)', lineHeight: 1.7, margin: 0 }}>
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Build Journey Timeline */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: project.accentColor, letterSpacing: '0.3em', margin: '0 0 16px 0' }}>
            ◉ BUILD JOURNEY TIMELINE
          </p>
          <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0', minWidth: 'max-content', position: 'relative' }}>
              {/* Connecting line */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                right: '16px',
                height: '1px',
                background: `linear-gradient(90deg, ${project.accentColor}60, ${project.accentColor}20)`,
              }} />
              {project.buildPhases.map((phase, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '160px', padding: '0 12px', position: 'relative' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: i === 0 ? project.accentColor : 'rgba(10,15,44,0.9)',
                    border: `2px solid ${project.accentColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    zIndex: 1,
                    flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: i === 0 ? '#0A0F2C' : project.accentColor, fontWeight: 600 }}>
                      {phase.phase}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '13px', color: '#FFFFFF', margin: '0 0 4px 0', textAlign: 'center', letterSpacing: '0.05em' }}>
                    {phase.title}
                  </p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: project.accentColor, margin: '0 0 4px 0', textAlign: 'center', letterSpacing: '0.15em' }}>
                    {phase.date}{phase.commits ? ` · ${phase.commits} commits` : ''}
                  </p>
                  <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '11px', fontStyle: 'italic', color: 'rgba(245,240,232,0.5)', margin: 0, textAlign: 'center', lineHeight: 1.4, maxWidth: '140px' }}>
                    {phase.milestone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Tech Stack */}
        <div style={{ marginBottom: '28px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: project.accentColor, letterSpacing: '0.3em', margin: '0 0 14px 0' }}>
            ◈ FULL TECH STACK
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {project.stack.map((layer) => (
              <div key={layer.category}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(201,168,76,0.5)', letterSpacing: '0.2em', margin: '0 0 6px 0', textTransform: 'uppercase' as const }}>
                  {layer.category}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {layer.items.map((item) => (
                    <span key={item} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'rgba(245,240,232,0.65)',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '3px 8px',
                      borderRadius: '2px',
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download links */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {JOURNEY_MAP[project.id] && (
            <a href={JOURNEY_MAP[project.id]} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: project.accentColor,
              letterSpacing: '0.2em',
              textDecoration: 'none',
              border: `1px solid ${project.accentColor}40`,
              padding: '8px 16px',
              textTransform: 'uppercase' as const,
              transition: 'all 0.2s',
            }}>
              ↓ Build Journey
            </a>
          )}
          {README_MAP[project.id] && (
            <a href={README_MAP[project.id]} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'rgba(245,240,232,0.5)',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              border: '1px solid rgba(245,240,232,0.1)',
              padding: '8px 16px',
              textTransform: 'uppercase' as const,
              transition: 'all 0.2s',
            }}>
              ↓ Technical README
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Project Card ───────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isOrigin = project.category === 'origin';
  const allStackItems = project.stack.flatMap(l => l.items);

  return (
    <FadeUp delay={index * 0.06}>
      <div style={{
        position: 'relative',
        background: isOrigin
          ? `linear-gradient(135deg, rgba(122,158,126,0.08) 0%, rgba(10,15,44,0.95) 100%)`
          : 'rgba(10,15,44,0.8)',
        border: `1px solid ${expanded ? project.accentColor + '50' : 'rgba(255,255,255,0.06)'}`,
        borderLeft: `4px solid ${project.accentColor}`,
        borderRadius: '2px',
        transition: 'border-color 0.3s',
        overflow: 'hidden',
      }}>
        {/* Origins: decorative background text */}
        {isOrigin && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '16px',
            fontFamily: 'var(--font-bebas)',
            fontSize: '80px',
            color: `${project.accentColor}08`,
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none' as const,
          }}>
            ZERO
          </div>
        )}

        <div style={{ padding: '24px 24px 20px 24px' }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' as const }}>
              <CategoryBadge category={project.category} />
              <StatusBadge status={project.status} />
              {project.startedFrom && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: `${project.accentColor}80`, letterSpacing: '0.15em' }}>
                  {project.startedFrom}
                </span>
              )}
            </div>
          </div>

          {/* Name */}
          <h3 style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(22px, 3vw, 30px)',
            color: '#FFFFFF',
            margin: '0 0 4px 0',
            letterSpacing: '0.03em',
            lineHeight: 1,
          }}>
            {project.name}
          </h3>

          {/* Tagline */}
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '15px',
            fontStyle: 'italic',
            color: 'rgba(245,240,232,0.6)',
            margin: '0 0 16px 0',
            lineHeight: 1.4,
          }}>
            {project.tagline}
          </p>

          {/* Metrics strip */}
          <div style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap' as const,
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '16px',
          }}>
            {project.metrics.map((m) => (
              <div key={m.label}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: project.accentColor, letterSpacing: '0.2em', textTransform: 'uppercase' as const, margin: '0 0 2px 0' }}>
                  {m.label}
                </p>
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', color: '#FFFFFF', margin: 0, letterSpacing: '0.02em' }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          {/* Stack chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '5px', marginBottom: '18px' }}>
            {allStackItems.slice(0, 8).map((item) => (
              <span key={item} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'rgba(245,240,232,0.45)',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                padding: '2px 7px',
                borderRadius: '2px',
              }}>
                {item}
              </span>
            ))}
            {allStackItems.length > 8 && (
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: `${project.accentColor}60`,
                padding: '2px 7px',
              }}>
                +{allStackItems.length - 8} more
              </span>
            )}
          </div>

          {/* Action row */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const, alignItems: 'center' }}>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.2em',
                color: expanded ? project.accentColor : 'rgba(245,240,232,0.7)',
                background: 'none',
                border: `1px solid ${expanded ? project.accentColor : 'rgba(255,255,255,0.15)'}`,
                padding: '7px 14px',
                cursor: 'pointer',
                textTransform: 'uppercase' as const,
                transition: 'all 0.2s',
                borderRadius: '2px',
              }}
            >
              {expanded ? '↑ Close Case Study' : '↓ View Case Study'}
            </button>
            {JOURNEY_MAP[project.id] && (
              <a href={JOURNEY_MAP[project.id]} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.2em',
                color: 'rgba(245,240,232,0.4)',
                textDecoration: 'none',
                textTransform: 'uppercase' as const,
              }}>
                Build Journey ↗
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.2em',
                color: 'rgba(245,240,232,0.4)',
                textDecoration: 'none',
                textTransform: 'uppercase' as const,
              }}>
                GitHub ↗
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.2em',
                color: project.accentColor,
                textDecoration: 'none',
                textTransform: 'uppercase' as const,
              }}>
                Live Site ↗
              </a>
            )}
          </div>
        </div>

        {/* Expandable case study */}
        <AnimatePresence>
          {expanded && <CaseStudy project={project} />}
        </AnimatePresence>
      </div>
    </FadeUp>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');

  const filtered = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <main style={{ minHeight: '100vh', background: '#0A0F2C' }}>

      {/* Grain overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '300px 300px',
        opacity: 0.025, mixBlendMode: 'overlay' as const,
      }} />

      {/* ── EDITORIAL HEADER ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px 48px', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeUp>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A', letterSpacing: '0.35em', textTransform: 'uppercase' as const, margin: '0 0 16px 0' }}>
              Mirembe Muse (Pty) Ltd · Project Portfolio
            </p>
            <h1 style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(64px, 12vw, 120px)',
              color: '#FFFFFF',
              lineHeight: 0.9,
              letterSpacing: '0.02em',
              margin: '0 0 16px 0',
            }}>
              PROJECTS
            </h1>
            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(16px, 2vw, 20px)',
              fontStyle: 'italic',
              color: 'rgba(245,240,232,0.7)',
              margin: '0 0 28px 0',
              maxWidth: '680px',
              lineHeight: 1.5,
            }}>
              Seven applications. One woman. Nine months. Africa&apos;s tech infrastructure, built from East London.
            </p>

            {/* Stats strip */}
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' as const }}>
              {[
                { v: '500+', l: 'commits' },
                { v: '7', l: 'apps' },
                { v: '9 months', l: 'build time' },
                { v: '0 → production', l: 'journey' },
              ].map(({ v, l }) => (
                <div key={l}>
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '24px', color: '#C9943A', letterSpacing: '0.03em' }}>{v}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(245,240,232,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginLeft: '6px' }}>{l}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
          {FILTER_LABELS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
                padding: '7px 16px',
                borderRadius: '2px',
                cursor: 'pointer',
                border: activeFilter === key ? 'none' : '1px solid rgba(255,255,255,0.15)',
                background: activeFilter === key ? '#C9943A' : 'transparent',
                color: activeFilter === key ? '#0A0F2C' : 'rgba(245,240,232,0.6)',
                fontWeight: activeFilter === key ? 600 : 400,
                transition: 'all 0.2s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* ── PROJECT CARDS ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── POPIA FOOTER BADGE ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 24px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            padding: '20px 24px',
            border: '1px solid rgba(201,148,58,0.3)',
            background: 'rgba(201,148,58,0.03)',
          }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A', letterSpacing: '0.3em', margin: '0 0 6px 0' }}>
              COMPLIANCE NOTICE
            </p>
            <p style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '13px', margin: '0 0 4px 0', color: 'rgba(245,240,232,0.8)' }}>
              <strong>POPIA Compliant</strong> · Registration No: 2026-005658 · Date: 2026-04-03
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(201,148,58,0.6)', margin: 0 }}>
              Mirembe Muse (Pty) Ltd · Information Officer: Kabali-Kagwa, Nandawula · Appointed: 2025-08-28
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
