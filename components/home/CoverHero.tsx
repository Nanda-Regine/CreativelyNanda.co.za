'use client';

import { CldImage } from 'next-cloudinary';

/**
 * CoverHero — the CreativelyNanda magazine cover.
 * The OG editorial-cover aesthetic (gold spine, Bebas masthead, flanking
 * coverlines, nebula atmosphere, grain, scrolling ticker) — but the centre is
 * the red-afro portrait, its left/right edges dissolved into the dark so the
 * coverlines can flank her. Soul-forward coverlines; Mirembe is the tech door.
 */

const TICKER = [
  'PUBLISHED POET',
  'INSIDE HER ROSES',
  'SPOKEN WORD',
  'NINE GENERATIONS · THREE NATIONS',
  'AMAHLUBI · AMATSHAWE · NSEENENE',
  'UMQOMBOTHI & INK',
  'THE ROSE, THE STAGE, THE CODE',
  'MADIBAZ RADIO · TRU FM',
  'EAST LONDON · SOUTH AFRICA',
  'A POET WHO CODES',
  'MIREMBE MUSE — BUSINESS & TECH ↗',
];

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

export default function CoverHero() {
  return (
    <section
      className="mag-cover"
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        minHeight: '640px',
        background: '#0A0F2C',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '80px', // clear the fixed nav
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @keyframes cover-neb-a { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(26px,-22px) scale(1.1)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes cover-neb-b { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,20px) scale(1.08)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes cover-neb-c { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,26px) scale(0.94)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes cover-ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .cover-ticker-track{ display:flex; white-space:nowrap; animation:cover-ticker 30s linear infinite; will-change:transform; }
        .cover-ticker-track:hover{ animation-play-state:paused; }
        @media (prefers-reduced-motion: reduce){ [class*="cover-neb"]{ animation:none !important; } }
        /* The portrait fills the oval; only she shows, perimeter feathered away.
           Narrow centred column => cover reveals more of her (zoomed out), smaller. */
        .cover-portrait{ object-fit:cover; object-position:center 58%; }
        @media (max-width:767px){
          /* Re-compose the cover for narrow screens: coverlines get a real column
             on the left, the portrait moves to the right (feathered edge overlaps
             gracefully), and the cramped right column is dropped — its heritage /
             Mirembe lines live in the scroll sections + nav/footer. */
          .cover-right{ display:none !important; }
          .cover-photo{ width:60% !important; left:auto !important; right:6px !important; transform:none !important; }
          .cover-left{ width:52% !important; max-width:52% !important; padding-right:4px !important; padding-bottom:40px !important; }
          .cover-portrait{ object-position:center 54%; }
        }
      `}</style>

      {/* ── ATMOSPHERE: warm nebula over navy (the canvas) ── */}
      <div className="cover-neb-a" style={{ position: 'absolute', right: '-6%', top: '4%', width: '62%', height: '72%', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(201,148,58,0.30) 0%, rgba(201,148,58,0.10) 42%, transparent 68%)', zIndex: 1, animation: 'cover-neb-a 24s ease-in-out infinite', willChange: 'transform' }} />
      <div className="cover-neb-b" style={{ position: 'absolute', left: '-8%', bottom: '-6%', width: '60%', height: '64%', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(194,30,86,0.26) 0%, rgba(107,15,32,0.12) 50%, transparent 72%)', zIndex: 1, animation: 'cover-neb-b 28s ease-in-out infinite', animationDelay: '-7s', willChange: 'transform' }} />
      <div className="cover-neb-c" style={{ position: 'absolute', left: '30%', top: '26%', width: '44%', height: '44%', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(228,87,46,0.16) 0%, rgba(201,148,58,0.06) 55%, transparent 75%)', zIndex: 1, animation: 'cover-neb-c 34s ease-in-out infinite', animationDelay: '-12s', willChange: 'transform' }} />

      {/* grain + scanlines */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: GRAIN, backgroundSize: '300px 300px', opacity: 0.11, mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 6 }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)', pointerEvents: 'none', zIndex: 4 }} />

      {/* ── GOLD SPINE ── */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '18px', background: '#C9943A', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '7.5px', letterSpacing: '0.2em', color: '#0A0F2C', writingMode: 'vertical-rl', transform: 'rotate(180deg)', textTransform: 'uppercase', fontWeight: 500, whiteSpace: 'nowrap' }}>
          CREATIVELY NANDA · THE SOUL ISSUE · 2026
        </span>
      </div>

      {/* ── MASTHEAD ── */}
      <div style={{ position: 'relative', zIndex: 30, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingLeft: '30px', paddingRight: '16px', paddingTop: '14px', paddingBottom: '8px', borderBottom: '1px solid rgba(201,148,58,0.22)', flexShrink: 0 }}>
        <div style={{ width: '96px', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(245,240,232,0.6)', textTransform: 'uppercase' }}>EST. 2021</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-bebas, sans-serif)', fontSize: 'clamp(40px, 8.5vw, 104px)', lineHeight: 0.88, letterSpacing: '0.03em', color: '#FFFFFF', margin: 0, textAlign: 'center', flex: 1 }}>
          CREATIVELY <span style={{ color: '#C9943A' }}>NANDA</span>
        </h1>
        <div style={{ width: '96px', flexShrink: 0, textAlign: 'right' }}>
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '8px', letterSpacing: '0.18em', color: 'rgba(245,240,232,0.5)', textTransform: 'uppercase', lineHeight: 1.8, display: 'block' }}>
            EAST LONDON<br />SOUTH AFRICA
          </span>
        </div>
      </div>

      {/* ── COVER AREA ── */}
      <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'stretch', paddingLeft: '30px', overflow: 'hidden', minHeight: 0 }}>

        {/* PHOTO — a feathered OVAL of her, smaller + centred, dissolving into the nebula */}
        <div className="cover-photo" style={{ position: 'absolute', top: '4%', bottom: '4%', left: '50%', transform: 'translateX(-50%)', width: 'clamp(260px, 36vw, 430px)', zIndex: 10, pointerEvents: 'none' }}>
          {/* warm halo behind her, so the oval glows off the navy */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(34% 46% at 50% 46%, rgba(228,87,46,0.20) 0%, rgba(194,30,86,0.10) 48%, transparent 72%)', mixBlendMode: 'screen' }} />
          {/* elliptical mask — solid over her, feathering to transparent at the edges */}
          <div style={{
            position: 'absolute', inset: 0,
            WebkitMaskImage: 'radial-gradient(ellipse 42% 80% at 50% 46%, #000 46%, rgba(0,0,0,0.55) 66%, transparent 86%)',
            maskImage: 'radial-gradient(ellipse 42% 80% at 50% 46%, #000 46%, rgba(0,0,0,0.55) 66%, transparent 86%)',
          }}>
            <CldImage
              src="creativelynanda/nanda-portraits/nanda-homepage-hero-image"
              alt="Nandawula Regine — natural afro haloed in golden light, red satin bodice"
              fill
              priority
              sizes="(max-width:768px) 100vw, 60vw"
              className="cover-portrait"
            />
          </div>
        </div>

        {/* LEFT COVERLINES — soul */}
        <div className="cover-left" style={{ width: 'clamp(78px, 15vw, 178px)', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0', paddingRight: '8px', paddingTop: '18px', paddingBottom: '64px', position: 'relative', zIndex: 20 }}>
          <Coverline kicker="The Poet" title={'INSIDE\nHER ROSES'} sub={'Womanhood,\nlonging, becoming.'} />
          <Rule />
          <Coverline kicker="On Stage" title={'SPOKEN\nWORD'} sub={'Beadwork &\na microphone.'} />
          <Rule />
          <Coverline kicker="The Line" title={'NINE\nGENERATIONS'} sub={'Three nations,\none voice.'} />
          <div className="hidden md:block" style={{ marginTop: 'auto', paddingTop: '16px' }}>
            <div style={{ width: '100%', height: '1px', background: 'rgba(201,148,58,0.2)', marginBottom: '10px' }} />
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '10.5px', fontStyle: 'italic', color: 'rgba(245,240,232,0.45)', lineHeight: 1.6, margin: '0 0 5px 0' }}>
              &ldquo;she learned to speak<br />in two tongues —<br />code &amp; longing.&rdquo;
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', color: 'rgba(201,148,58,0.5)', letterSpacing: '0.18em', margin: 0 }}>— N.R.K-K.</p>
          </div>
        </div>

        {/* RIGHT COVERLINES — heritage + the tech door */}
        <div className="cover-right" style={{ position: 'absolute', right: '8px', top: 0, bottom: 0, width: 'clamp(78px, 14vw, 150px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', paddingBottom: '54px', zIndex: 20, textAlign: 'right' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(6.5px,1.2vw,8.5px)', color: '#C9943A', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Heritage</p>
            <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(15px,2.6vw,22px)', color: '#FFFFFF', margin: '0 0 4px 0', letterSpacing: '0.03em', lineHeight: 0.98 }}>AMAHLUBI<br />&amp; BUGANDA</p>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(10px,1.7vw,12px)', fontStyle: 'italic', color: '#F5F0E8', margin: 0, lineHeight: 1.4 }}>Totem:<br />the grasshopper.</p>
          </div>
          <div style={{ width: '100%', height: '1px', background: 'rgba(201,148,58,0.3)', marginLeft: 'auto' }} />
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(6.5px,1.2vw,8.5px)', color: '#C9943A', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 4px 0' }}>She also builds</p>
            <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(15px,2.6vw,22px)', color: '#FFFFFF', margin: '0 0 4px 0', letterSpacing: '0.03em', lineHeight: 0.98 }}>MIREMBE<br />MUSE ↗</p>
            <p className="hidden md:block" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '12px', fontStyle: 'italic', color: 'rgba(245,240,232,0.65)', margin: 0, lineHeight: 1.4 }}>AI engineer,<br />by day.</p>
          </div>
          <div style={{ width: '100%', height: '1px', background: 'rgba(201,148,58,0.3)', marginLeft: 'auto' }} />
          {/* BARCODE — desktop only */}
          <div className="hidden md:flex" style={{ marginTop: '2px', flexDirection: 'column', alignItems: 'flex-end' }}>
            <svg width="70" height="38" viewBox="0 0 80 46" xmlns="http://www.w3.org/2000/svg">
              {[1,3,6,8,10,13,15,17,19,22,24,26,28,31,33,35,37,39,42,44,46,49,51,53,55,58,60,62,64,66,69,71,73,75,78].map((x, i) => (
                <rect key={i} x={x} y={0} width={i % 4 === 0 ? 2.5 : 1.5} height={i % 7 === 0 ? 42 : i % 3 === 0 ? 38 : 34} fill={`rgba(245,240,232,${i % 5 === 0 ? 0.55 : 0.32})`} />
              ))}
            </svg>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '6.5px', color: 'rgba(245,240,232,0.28)', letterSpacing: '0.12em', margin: '2px 0 0 0' }}>THE SOUL ISSUE · 2026</p>
          </div>
        </div>

        {/* full name — desktop */}
        <div className="hidden md:block" style={{ position: 'absolute', top: '10px', left: '200px', zIndex: 25 }}>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '13px', fontStyle: 'italic', fontWeight: 500, color: '#C9943A', letterSpacing: '0.15em', margin: 0 }}>
            Nandawula Regine Kabali-Kagwa
          </p>
        </div>

        {/* mobile descriptor */}
        <div className="md:hidden" style={{ position: 'absolute', bottom: '54px', left: 0, right: 0, textAlign: 'center', zIndex: 25, padding: '0 84px' }}>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '12px', fontStyle: 'italic', color: 'rgba(245,240,232,0.75)', margin: 0 }}>
            Poet · Performer · Founder
          </p>
        </div>
      </div>

      {/* ── TICKER ── */}
      <div style={{ position: 'relative', zIndex: 40, background: '#C9943A', height: '30px', overflow: 'hidden', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <div className="cover-ticker-track">
          {[0, 1].map((i) => (
            <span key={i}>
              {TICKER.map((item, j) => (
                <span key={j} style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '9.5px', letterSpacing: '0.24em', color: '#0A0F2C', textTransform: 'uppercase', fontWeight: 500, padding: '0 24px 0 0' }}>
                  {item} ·{' '}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Coverline({ kicker, title, sub }: { kicker: string; title: string; sub: string }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(6px,1.2vw,8px)', color: '#C9943A', letterSpacing: '0.28em', textTransform: 'uppercase', margin: '0 0 4px 0' }}>{kicker}</p>
      <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(19px,3.8vw,29px)', color: '#FFFFFF', lineHeight: 0.95, margin: '0 0 4px 0', letterSpacing: '0.02em', whiteSpace: 'pre-line' }}>{title}</p>
      <p className="hidden md:block" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '11px', fontStyle: 'italic', color: 'rgba(245,240,232,0.65)', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{sub}</p>
    </div>
  );
}

function Rule() {
  return <div style={{ width: '100%', height: '1px', background: 'rgba(201,148,58,0.35)', margin: '0 0 12px 0' }} />;
}
