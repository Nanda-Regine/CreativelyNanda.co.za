'use client'

import Image from 'next/image'

const PHOTO_FILENAME = '/assets/professional/nanda-professional-2-transparent.png'

const TICKER_ITEMS = [
  'AI CONSULTING',
  '7 SaaS APPS',
  'NOTION TEMPLATES',
  'POETRY · CODE · POWER',
  'MIREMBE MUSE',
  'EST. 2025',
  'EAST LONDON',
  'WHERE TRANSFORMATION HAS A TEMPLATE',
  'POPIA COMPLIANT · REG. 2026-005658',
]

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

export default function MagazineCover() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100dvh',
      minHeight: '600px',
      background: '#0A0F2C',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* GRAIN TEXTURE */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: GRAIN_SVG,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px 300px',
        opacity: 0.035,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
        zIndex: 5,
      }} />

      {/* VERTICAL SPINE (left gold bar) */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '20px',
        background: '#C9943A',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '7.5px',
          letterSpacing: '0.2em',
          color: '#0A0F2C',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          textTransform: 'uppercase',
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}>
          MIREMBE MUSE (PTY) LTD · ISSUE 001 · APRIL 2026
        </span>
      </div>

      {/* ── MASTHEAD ── */}
      <div style={{
        position: 'relative',
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '28px',
        paddingRight: '14px',
        paddingTop: '10px',
        paddingBottom: '6px',
        borderBottom: '1px solid rgba(201,148,58,0.25)',
        flexShrink: 0,
      }}>
        {/* Left meta — desktop only */}
        <div className="hidden md:block" style={{ width: '120px', flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '9px',
            letterSpacing: '0.32em',
            color: 'rgba(245,240,232,0.6)',
            textTransform: 'uppercase',
          }}>EST. 2025</span>
        </div>

        {/* Centre: magazine title */}
        <h1 style={{
          fontFamily: 'var(--font-bebas, sans-serif)',
          fontSize: 'clamp(48px, 9.5vw, 108px)',
          lineHeight: 0.88,
          letterSpacing: '0.03em',
          color: '#FFFFFF',
          margin: 0,
          textAlign: 'center',
          flex: 1,
        }}>
          CREATIVELY{' '}
          <span style={{ color: '#C9943A' }}>NANDA</span>
        </h1>

        {/* Right meta — desktop only */}
        <div className="hidden md:block" style={{ width: '120px', flexShrink: 0, textAlign: 'right' }}>
          <span style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '8px',
            letterSpacing: '0.18em',
            color: 'rgba(245,240,232,0.5)',
            textTransform: 'uppercase',
            lineHeight: 1.8,
            display: 'block',
          }}>
            EAST LONDON<br />SOUTH AFRICA<br />APRIL 2026
          </span>
        </div>
      </div>

      {/* NAV — slim bar below masthead (desktop only) */}
      <nav className="hidden md:flex" style={{
        position: 'relative',
        zIndex: 30,
        gap: '28px',
        paddingLeft: '28px',
        paddingRight: '14px',
        paddingTop: '7px',
        paddingBottom: '7px',
        borderBottom: '1px solid rgba(201,148,58,0.12)',
        flexShrink: 0,
        flexWrap: 'wrap',
      }}>
        {[
          ['Projects', '/projects'],
          ['About', '/about'],
          ['AI Engineer', '/ai-engineer'],
          ['Education', '/education'],
          ['Mirembe', '/mirembe'],
          ['Contact', '/contact'],
        ].map(([label, href]) => (
          <a key={href} href={href} style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '8.5px',
            letterSpacing: '0.25em',
            color: 'rgba(245,240,232,0.65)',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#C9943A')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.65)')}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* ── MAIN COVER AREA ── */}
      <div style={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        alignItems: 'stretch',
        paddingLeft: '28px',
        overflow: 'hidden',
        minHeight: 0,
      }}>

        {/* LEFT COVERLINES — desktop only */}
        <div className="hidden md:flex" style={{
          width: '160px',
          flexShrink: 0,
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '0px',
          paddingRight: '12px',
          paddingTop: '24px',
          paddingBottom: '80px',
          zIndex: 20,
          position: 'relative',
        }}>
          {/* Coverline 1 */}
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#C9943A', letterSpacing: '0.28em', textTransform: 'uppercase', margin: '0 0 5px 0' }}>
              Inside This Issue
            </p>
            <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '32px', color: '#FFFFFF', lineHeight: '0.95', margin: '0 0 5px 0', letterSpacing: '0.02em' }}>
              7 APPS.
            </p>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '12px', fontStyle: 'italic', color: 'rgba(245,240,232,0.65)', margin: 0, lineHeight: 1.45 }}>
              One woman. East London.<br />Africa&apos;s OS.
            </p>
          </div>

          <div style={{ width: '100%', height: '1px', background: 'rgba(201,148,58,0.35)', margin: '0 0 16px 0' }} />

          {/* Coverline 2 */}
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#C9943A', letterSpacing: '0.28em', textTransform: 'uppercase', margin: '0 0 5px 0' }}>
              The Build
            </p>
            <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '26px', color: '#FFFFFF', lineHeight: '0.95', margin: '0 0 5px 0', letterSpacing: '0.02em' }}>
              POET WHO<br />CODES
            </p>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '12px', fontStyle: 'italic', color: 'rgba(245,240,232,0.65)', margin: 0, lineHeight: 1.45 }}>
              Where Ubuntu becomes<br />architecture
            </p>
          </div>

          <div style={{ width: '100%', height: '1px', background: 'rgba(201,148,58,0.35)', margin: '0 0 16px 0' }} />

          {/* Coverline 3 */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#C9943A', letterSpacing: '0.28em', textTransform: 'uppercase', margin: '0 0 5px 0' }}>
              Ubuntu Tech
            </p>
            <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '28px', color: '#FFFFFF', lineHeight: '0.95', margin: '0 0 5px 0', letterSpacing: '0.02em' }}>
              R50 BILLION
            </p>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '12px', fontStyle: 'italic', color: 'rgba(245,240,232,0.65)', margin: 0, lineHeight: 1.45 }}>
              The stokvel economy.<br />Finally protected.
            </p>
          </div>
        </div>

        {/* PHOTO — transparent PNG, floats from bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-30%)',
          height: '88%',
          zIndex: 15,
          display: 'flex',
          alignItems: 'flex-end',
          pointerEvents: 'none',
        }} className="photo-container">
          <Image
            src={PHOTO_FILENAME}
            alt="Nandawula Regine Kabali-Kagwa — Creative Technologist, AI Engineer, Published Poet, Founder of Mirembe Muse"
            width={600}
            height={900}
            priority
            style={{
              height: '100%',
              width: 'auto',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(0 0 60px rgba(201,148,58,0.12)) drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
            }}
          />
        </div>

        {/* COVER QUOTE — lower left, desktop only */}
        <div className="hidden md:block" style={{
          position: 'absolute',
          bottom: '72px',
          left: '28px',
          zIndex: 25,
          maxWidth: '150px',
        }}>
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '11.5px',
            fontStyle: 'italic',
            color: 'rgba(245,240,232,0.45)',
            lineHeight: 1.65,
            margin: '0 0 5px 0',
          }}>
            &ldquo;she learned to speak<br />
            in two tongues —<br />
            the language of systems<br />
            and the language of longing.&rdquo;
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            color: 'rgba(201,148,58,0.55)',
            letterSpacing: '0.18em',
            margin: 0,
          }}>— N.R.K-K.</p>
        </div>

        {/* RIGHT COVERLINES + BARCODE — desktop only */}
        <div className="hidden md:flex" style={{
          position: 'absolute',
          right: '14px',
          top: '0',
          bottom: '0',
          width: '130px',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '10px',
          paddingBottom: '60px',
          zIndex: 20,
          textAlign: 'right',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', color: '#C9943A', letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0, lineHeight: 1.6 }}>
            Consulting from<br />R8,000/mo
          </p>
          <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '19px', color: '#FFFFFF', margin: 0, letterSpacing: '0.04em' }}>
            300+ ACTIVE USERS
          </p>
          <div style={{ width: '100%', height: '1px', background: 'rgba(201,148,58,0.3)' }} />
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '13px', fontStyle: 'italic', color: '#F5F0E8', margin: 0 }}>
            Inside Her Roses
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', color: '#C9943A', letterSpacing: '0.22em', margin: 0 }}>
            POETRY · CODE<br />· POWER
          </p>
          <div style={{ width: '100%', height: '1px', background: 'rgba(201,148,58,0.3)' }} />
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(201,148,58,0.6)', margin: 0, lineHeight: 1.7, letterSpacing: '0.12em' }}>
            POPIA COMPLIANT<br />REG. 2026-005658
          </p>

          {/* DECORATIVE BARCODE */}
          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <svg width="80" height="46" viewBox="0 0 80 46" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
              {[1,3,6,8,10,13,15,17,19,22,24,26,28,31,33,35,37,39,42,44,46,49,51,53,55,58,60,62,64,66,69,71,73,75,78].map((x, i) => (
                <rect
                  key={i}
                  x={x}
                  y={0}
                  width={i % 4 === 0 ? 2.5 : 1.5}
                  height={i % 7 === 0 ? 42 : i % 3 === 0 ? 38 : 34}
                  fill={`rgba(245,240,232,${i % 5 === 0 ? 0.55 : 0.35})`}
                />
              ))}
            </svg>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'rgba(245,240,232,0.28)', letterSpacing: '0.14em', margin: '3px 0 0 0' }}>
              ISSUE 001 · APRIL 2026
            </p>
          </div>
        </div>

        {/* MOBILE descriptor + name treatment */}
        <div style={{
          position: 'absolute',
          bottom: '60px',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 25,
          padding: '0 20px',
        }} className="md:hidden">
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '13px',
            fontStyle: 'italic',
            color: 'rgba(245,240,232,0.75)',
            margin: '0 0 4px 0',
          }}>
            AI Engineer · Published Poet · Founder, Mirembe Muse
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            color: 'rgba(201,148,58,0.7)',
            letterSpacing: '0.2em',
            margin: 0,
            textTransform: 'uppercase',
          }}>
            POPIA COMPLIANT · 2026-005658
          </p>
        </div>

        {/* FULL NAME below masthead — mobile visible */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '28px',
          zIndex: 25,
        }} className="md:hidden">
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '10px',
            fontStyle: 'italic',
            fontWeight: 500,
            color: '#C9943A',
            letterSpacing: '0.12em',
            margin: 0,
            textTransform: 'uppercase',
          }}>
            Nandawula Regine Kabali-Kagwa
          </p>
        </div>

        {/* FULL NAME treatment — desktop, below masthead left */}
        <div className="hidden md:block" style={{
          position: 'absolute',
          top: '8px',
          left: '185px',
          zIndex: 25,
        }}>
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '13px',
            fontStyle: 'italic',
            fontWeight: 500,
            color: '#C9943A',
            letterSpacing: '0.15em',
            margin: 0,
          }}>
            Nandawula Regine Kabali-Kagwa
          </p>
        </div>
      </div>

      {/* ── BOTTOM TICKER ── */}
      <div style={{
        position: 'relative',
        zIndex: 40,
        background: '#C9943A',
        height: '30px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <style>{`
          @keyframes tickerScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .magazine-ticker-track {
            display: flex;
            white-space: nowrap;
            animation: tickerScroll 28s linear infinite;
            will-change: transform;
          }
          .magazine-ticker-track:hover { animation-play-state: paused; }
          @media (max-width: 767px) {
            .photo-container { left: 50% !important; transform: translateX(-50%) !important; height: 72% !important; }
          }
        `}</style>
        <div className="magazine-ticker-track">
          {[0, 1].map(i => (
            <span key={i}>
              {TICKER_ITEMS.map((item, j) => (
                <span key={j} style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '9.5px',
                  letterSpacing: '0.24em',
                  color: '#0A0F2C',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  padding: '0 24px 0 0',
                }}>
                  {item} ·{' '}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
