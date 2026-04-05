'use client'

import Image from 'next/image'

const PHOTO_FILENAME = '/assets/professional/nanda-professional-2-transparent.png'

const TICKER_ITEMS = [
  'AI ENGINEER',
  'FULL-STACK DEVELOPER',
  'CLAUDE API · NEXT.JS · TYPESCRIPT',
  'AFRICA-FIRST SOFTWARE',
  '7 LIVE AI APPS',
  'NMU ALUMNI',
  'PUBLISHED POET',
  'MIREMBE MUSE',
  'EAST LONDON · SOUTH AFRICA',
  'BUILDING FOR THE CONTINENT',
  'SUPABASE · PAYFAST · WHATSAPP AI',
  'WHERE TRANSFORMATION HAS A TEMPLATE',
]

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

export default function MagazineCover() {
  return (
    <section className="mag-cover-section" style={{
      position: 'relative',
      width: '100%',
      height: '100dvh',
      minHeight: '600px',
      background: '#0A0F2C',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ── BACKGROUND ANIMATION KEYFRAMES ── */}
      <style>{`
        @keyframes nebula-gold {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(30px, -20px) scale(1.08); }
          66%  { transform: translate(-15px, 25px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes nebula-gold-2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(-40px, 20px) scale(1.12); }
          60%  { transform: translate(20px, -30px) scale(0.92); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes nebula-cherry {
          0%   { transform: translate(0px, 0px) scale(1); }
          40%  { transform: translate(-25px, 15px) scale(1.06); }
          70%  { transform: translate(20px, -10px) scale(0.97); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes nebula-cherry-2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          30%  { transform: translate(35px, -25px) scale(1.10); }
          65%  { transform: translate(-20px, 30px) scale(0.94); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes nebula-float {
          0%   { transform: translate(0px, 0px) scale(1); opacity: 1; }
          50%  { transform: translate(15px, -35px) scale(1.15); opacity: 0.7; }
          100% { transform: translate(0px, 0px) scale(1); opacity: 1; }
        }
        @keyframes grain-drift {
          0%   { backgroundPosition: 0px 0px; }
          100% { backgroundPosition: 300px 300px; }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="mag-nebula"], .mag-grain-anim { animation: none !important; }
        }
        /* Mobile: clear the fixed nav */
        @media (max-width: 767px) {
          .mag-cover-section {
            padding-top: 84px;
          }
          /* Widen photo zone on mobile — left col is narrower so give photo more room */
          .photo-container {
            left: 18% !important;
          }
        }
      `}</style>

      {/* ANIMATED GRAIN TEXTURE */}
      <div
        className="mag-grain-anim"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: GRAIN_SVG,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
          opacity: 0.12,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          zIndex: 5,
          animation: 'grain-drift 8s linear infinite',
        }}
      />

      {/* BLOB 1 — gold, top right, large */}
      <div
        className="mag-nebula-gold"
        style={{
          position: 'absolute',
          right: '-5%',
          top: '5%',
          width: '65%',
          height: '75%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(201,148,58,0.28) 0%, rgba(201,148,58,0.12) 40%, transparent 68%)',
          pointerEvents: 'none',
          zIndex: 2,
          animation: 'nebula-gold 22s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* BLOB 2 — gold, bottom centre, secondary */}
      <div
        className="mag-nebula-gold mag-nebula-gold-2"
        style={{
          position: 'absolute',
          left: '20%',
          bottom: '10%',
          width: '50%',
          height: '45%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(201,148,58,0.20) 0%, rgba(201,148,58,0.08) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 2,
          animation: 'nebula-gold-2 18s ease-in-out infinite',
          animationDelay: '-6s',
          willChange: 'transform',
        }}
      />

      {/* BLOB 3 — cherry, bottom left, large */}
      <div
        className="mag-nebula-cherry"
        style={{
          position: 'absolute',
          left: '-8%',
          bottom: '-5%',
          width: '62%',
          height: '65%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(193,41,46,0.24) 0%, rgba(107,15,32,0.12) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 2,
          animation: 'nebula-cherry 26s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* BLOB 4 — cherry, top left, floating */}
      <div
        className="mag-nebula-cherry mag-nebula-cherry-2"
        style={{
          position: 'absolute',
          left: '5%',
          top: '15%',
          width: '38%',
          height: '40%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(193,41,46,0.18) 0%, rgba(193,41,46,0.07) 50%, transparent 72%)',
          pointerEvents: 'none',
          zIndex: 2,
          animation: 'nebula-cherry-2 20s ease-in-out infinite',
          animationDelay: '-9s',
          willChange: 'transform',
        }}
      />

      {/* BLOB 5 — deep gold accent, centre, slow float */}
      <div
        style={{
          position: 'absolute',
          left: '35%',
          top: '30%',
          width: '40%',
          height: '40%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(201,148,58,0.14) 0%, rgba(193,41,46,0.06) 55%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 2,
          animation: 'nebula-float 32s ease-in-out infinite',
          animationDelay: '-14s',
          willChange: 'transform',
        }}
      />

      {/* SCANLINE OVERLAY — editorial depth */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)',
        pointerEvents: 'none',
        zIndex: 3,
      }} />

      {/* VERTICAL SPINE */}
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
        {/* Left meta */}
        <div style={{ width: '100px', flexShrink: 0 }}>
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
          fontSize: 'clamp(42px, 9vw, 108px)',
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

        {/* Right meta */}
        <div style={{ width: '100px', flexShrink: 0, textAlign: 'right' }}>
          <span style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '8px',
            letterSpacing: '0.18em',
            color: 'rgba(245,240,232,0.5)',
            textTransform: 'uppercase',
            lineHeight: 1.8,
            display: 'block',
          }}>
            EAST LONDON<br />SOUTH AFRICA
          </span>
        </div>
      </div>

      {/* NAV — desktop only */}
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

        {/* ── LEFT COVERLINES — flex child, overlays photo via zIndex ── */}
        <div style={{
          width: 'clamp(72px, 14vw, 160px)',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '0px',
          paddingRight: '8px',
          paddingTop: '16px',
          paddingBottom: '60px',
          zIndex: 20,
        }}>
          {/* Coverline 1 — AI Engineer */}
          <div style={{ marginBottom: '12px' }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(6px, 1.2vw, 8px)',
              color: '#C9943A',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              margin: '0 0 4px 0',
            }}>
              Role
            </p>
            <p style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(20px, 4vw, 30px)',
              color: '#FFFFFF',
              lineHeight: '0.95',
              margin: '0 0 4px 0',
              letterSpacing: '0.02em',
            }}>
              AI<br />ENGINEER
            </p>
            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(9px, 1.5vw, 12px)',
              fontStyle: 'italic',
              color: 'rgba(245,240,232,0.65)',
              margin: 0,
              lineHeight: 1.4,
            }}>
              Full-Stack Dev.<br />Africa-first.
            </p>
          </div>

          <div style={{ width: '100%', height: '1px', background: 'rgba(201,148,58,0.35)', margin: '0 0 12px 0' }} />

          {/* Coverline 2 — 7 Apps */}
          <div style={{ marginBottom: '12px' }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(6px, 1.2vw, 8px)',
              color: '#C9943A',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              margin: '0 0 4px 0',
            }}>
              In Production
            </p>
            <p style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(18px, 3.5vw, 26px)',
              color: '#FFFFFF',
              lineHeight: '0.95',
              margin: '0 0 4px 0',
              letterSpacing: '0.02em',
            }}>
              7 LIVE<br />APPS
            </p>
            <p className="hidden md:block" style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: '11px',
              fontStyle: 'italic',
              color: 'rgba(245,240,232,0.65)',
              margin: 0,
              lineHeight: 1.4,
            }}>
              9 months.<br />Zero to SaaS.
            </p>
          </div>

          <div style={{ width: '100%', height: '1px', background: 'rgba(201,148,58,0.35)', margin: '0 0 12px 0' }} />

          {/* Coverline 3 — Published Poet */}
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(6px, 1.2vw, 8px)',
              color: '#C9943A',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              margin: '0 0 4px 0',
            }}>
              Published
            </p>
            <p style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(18px, 3.5vw, 28px)',
              color: '#FFFFFF',
              lineHeight: '0.95',
              margin: '0 0 4px 0',
              letterSpacing: '0.02em',
            }}>
              POET &amp;<br />FOUNDER
            </p>
            <p className="hidden md:block" style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: '11px',
              fontStyle: 'italic',
              color: 'rgba(245,240,232,0.65)',
              margin: 0,
              lineHeight: 1.4,
            }}>
              Inside Her Roses.<br />NMU Alumni.
            </p>
          </div>

          {/* Quote — desktop only, bottom of left column */}
          <div className="hidden md:block" style={{ marginTop: 'auto', paddingTop: '16px' }}>
            <div style={{ width: '100%', height: '1px', background: 'rgba(201,148,58,0.2)', marginBottom: '10px' }} />
            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: '10.5px',
              fontStyle: 'italic',
              color: 'rgba(245,240,232,0.42)',
              lineHeight: 1.6,
              margin: '0 0 5px 0',
            }}>
              &ldquo;she learned to speak<br />
              in two tongues —<br />
              code and longing.&rdquo;
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '7.5px',
              color: 'rgba(201,148,58,0.5)',
              letterSpacing: '0.18em',
              margin: 0,
            }}>— N.R.K-K.</p>
          </div>
        </div>

        {/* PHOTO — fill container, face always visible */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '20%',
          right: '0',
          zIndex: 15,
          pointerEvents: 'none',
        }} className="photo-container">
          <Image
            src={PHOTO_FILENAME}
            alt="Nandawula Regine Kabali-Kagwa — Creative Technologist, AI Engineer, Published Poet, Founder of Mirembe Muse"
            fill
            priority
            style={{
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(0 0 60px rgba(201,148,58,0.12)) drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
            }}
          />
        </div>

        {/* ── RIGHT COVERLINES — visible on ALL screen sizes ── */}
        <div style={{
          position: 'absolute',
          right: '8px',
          top: '0',
          bottom: '0',
          width: 'clamp(72px, 13vw, 130px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '8px',
          paddingBottom: '50px',
          zIndex: 20,
          textAlign: 'right',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(6.5px, 1.2vw, 8.5px)',
            color: '#C9943A',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            margin: 0,
            lineHeight: 1.6,
          }}>
            Building<br />Africa-First
          </p>
          <p style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(14px, 2.5vw, 20px)',
            color: '#FFFFFF',
            margin: 0,
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}>
            CLAUDE API<br />&amp; NEXT.JS
          </p>
          <div style={{ width: '100%', height: '1px', background: 'rgba(201,148,58,0.3)', marginLeft: 'auto' }} />
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(10px, 1.8vw, 13px)',
            fontStyle: 'italic',
            color: '#F5F0E8',
            margin: 0,
            lineHeight: 1.4,
          }}>
            NMU Alumni.<br />550+ commits.
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(6px, 1.1vw, 8px)',
            color: '#C9943A',
            letterSpacing: '0.18em',
            margin: 0,
            lineHeight: 1.6,
          }}>
            SUPABASE<br />TYPESCRIPT
          </p>
          <div style={{ width: '100%', height: '1px', background: 'rgba(201,148,58,0.3)', marginLeft: 'auto' }} />
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(5.5px, 1vw, 7.5px)',
            color: 'rgba(201,148,58,0.6)',
            margin: 0,
            lineHeight: 1.7,
            letterSpacing: '0.1em',
          }}>
            POPIA<br />2026-005658
          </p>

          {/* BARCODE — desktop only */}
          <div className="hidden md:flex" style={{ marginTop: '6px', flexDirection: 'column', alignItems: 'flex-end' }}>
            <svg width="72" height="40" viewBox="0 0 80 46" xmlns="http://www.w3.org/2000/svg">
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
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '6.5px',
              color: 'rgba(245,240,232,0.28)',
              letterSpacing: '0.12em',
              margin: '2px 0 0 0',
            }}>
              ISSUE 001 · 2026
            </p>
          </div>
        </div>

        {/* FULL NAME — mobile, top of cover area */}
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
            Nandawula Regine
          </p>
        </div>

        {/* FULL NAME — desktop */}
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

        {/* MOBILE descriptor — bottom center */}
        <div style={{
          position: 'absolute',
          bottom: '60px',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 25,
          padding: '0 90px',
        }} className="md:hidden">
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '12px',
            fontStyle: 'italic',
            color: 'rgba(245,240,232,0.7)',
            margin: 0,
          }}>
            AI Engineer · Poet · Founder
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
            .photo-container {
              left: 50% !important;
              transform: translateX(-50%) !important;
              height: 65% !important;
            }
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
