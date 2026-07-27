'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const APP_LABELS: Record<string, { name: string; accent: string; tagline: string }> = {
  adminos: {
    name: 'AdminOS',
    accent: '#C9A84C',
    tagline: 'The AI Operating System for South African SMEs',
  },
  stokvelos: {
    name: 'StokvelOS',
    accent: '#C4613A',
    tagline: 'AI-Native Stokvel Management for 11M South Africans',
  },
  watchsankofa: {
    name: 'WatchSankofa',
    accent: '#FF8C42',
    tagline: 'The African-First Streaming Platform — 85% Creator Revenue Share',
  },
};

function UpgradesContent() {
  const searchParams = useSearchParams();
  const appKey = searchParams.get('app') ?? '';
  const app = APP_LABELS[appKey];

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#1a1a2e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      {/* Back link */}
      <div style={{ position: 'absolute', top: '32px', left: '32px' }}>
        <Link
          href="/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(245,241,232,0.5)',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            transition: 'color 0.2s',
          }}
        >
          <ArrowLeft size={14} />
          All Projects
        </Link>
      </div>

      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: app ? app.accent : '#C9943A',
            margin: '0 0 24px',
          }}
        >
          Mirembe Muse (Pty) Ltd · Domain Migration
        </p>

        {/* App name */}
        {app && (
          <div
            style={{
              display: 'inline-block',
              background: `${app.accent}12`,
              border: `1px solid ${app.accent}35`,
              borderRadius: '4px',
              padding: '6px 16px',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: app.accent,
              }}
            >
              {app.name}
            </span>
          </div>
        )}

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(36px, 7vw, 64px)',
            fontWeight: 700,
            color: '#F5F1E8',
            lineHeight: 1.05,
            margin: '0 0 20px',
            letterSpacing: '-0.01em',
          }}
        >
          Upgrades in Progress.
        </h1>

        {/* Subline */}
        <p
          style={{
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            fontSize: '16px',
            color: 'rgba(245,241,232,0.6)',
            lineHeight: 1.65,
            margin: '0 0 12px',
            maxWidth: '480px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          This product is live and actively maintained.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            fontSize: '15px',
            color: 'rgba(245,241,232,0.4)',
            lineHeight: 1.65,
            margin: '0 0 36px',
            maxWidth: '480px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Currently migrating to its permanent domain — check back shortly.
        </p>

        {/* Tagline if available */}
        {app && (
          <p
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontStyle: 'italic',
              fontSize: '15px',
              color: app.accent,
              margin: '0 0 48px',
              opacity: 0.8,
            }}
          >
            {app.tagline}
          </p>
        )}

        {/* Divider */}
        <div
          style={{
            width: '48px',
            height: '1px',
            background: 'rgba(201,148,58,0.4)',
            margin: '0 auto 36px',
          }}
        />

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/projects"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#C21E56',
              color: '#FFFFFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              borderRadius: '3px',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            ← Back to Projects
          </Link>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              border: '1px solid rgba(245,241,232,0.2)',
              color: 'rgba(245,241,232,0.6)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              borderRadius: '3px',
              textTransform: 'uppercase',
            }}
          >
            Get in Touch →
          </Link>
        </div>

        {/* Footer note */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'rgba(245,241,232,0.2)',
            letterSpacing: '0.2em',
            marginTop: '56px',
          }}
        >
          Mirembe Muse (Pty) Ltd · KuGompo City, South Africa
        </p>
      </div>
    </main>
  );
}

export default function UpgradesPage() {
  return (
    <Suspense
      fallback={
        <main
          style={{
            minHeight: '100vh',
            background: '#1a1a2e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: 'rgba(245,241,232,0.3)',
            }}
          >
            Loading...
          </p>
        </main>
      }
    >
      <UpgradesContent />
    </Suspense>
  );
}
