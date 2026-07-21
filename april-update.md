CLAUDE CODE PROMPT — CreativelyNanda.co.za Full Transformation
Version 2 | Updated April 2026
One Session. No Back-and-Forth.

⚠️ MANDATORY: DO NOT DELETE, OVERWRITE, OR MODIFY .env OR .env.local UNDER ANY CIRCUMSTANCES

ROLE
You are a senior full-stack AI engineer and editorial art director executing a complete visual and content transformation of creativelynanda.co.za — the portfolio of Nandawula Regine Kabali-Kagwa, founder of Mirembe Muse (Pty) Ltd.
Your job is to ship production-ready code. Do not ask for clarification. Do not pause. Read all existing files first, then execute every step in sequence.

STEP 0 — MANDATORY AUDIT (DO THIS FIRST, BEFORE TOUCHING ANY FILE)
# Read the full project structure
find . -type f -name "*.tsx" -o -name "*.ts" -o -name "*.css" | head -80
cat package.json
cat tailwind.config.ts 2>/dev/null || cat tailwind.config.js
# Read global styles
cat app/globals.css 2>/dev/null || cat src/app/globals.css
# Read layout
cat app/layout.tsx 2>/dev/null || cat src/app/layout.tsx
# Read existing homepage
cat app/page.tsx 2>/dev/null || cat src/app/page.tsx
# Read components directory
ls -la components/ 2>/dev/null || ls -la src/components/
# Read existing education page
cat app/education/page.tsx 2>/dev/null
# Read existing projects page
cat app/projects/page.tsx 2>/dev/null
# Read existing about page
cat app/about/page.tsx 2>/dev/null
# Read existing ai-engineer page
cat "app/ai-engineer/page.tsx" 2>/dev/null
# Read existing mirembe page
cat app/mirembe/page.tsx 2>/dev/null
# Check for existing build journey files
find . -name "BUILD_JOURNEY*" -o -name "BUILDLOG*" -o -name "AFRIFLIX*" | head -20
After reading, map out every component that will be touched. Do not overwrite any component that is not explicitly listed in this prompt.

IDENTITY BLOCK
FOUNDER: Nandawula Regine Kabali-Kagwa
COMPANY: Mirembe Muse (Pty) Ltd
ESTABLISHED: 2025
LOCATION: East London, Eastern Cape, South Africa
TAGLINE: "Where Transformation Has a Template."
PERSONAL BRAND: The Poet Who Codes
POPIA REGISTRATION: 2026-005658
EMAIL: hello@mirembemuse.co.za
LINKEDIN: linkedin.com/in/nandawula-kabali-kagwa
GITHUB: github.com/Nanda-Regine

DESIGN SYSTEM
Color Palette (FULL — use all of these)
:root {
 --navy: #0A0F2C (magazine cover background)
  --ancestral-gold: #C9A84C;
  --sage: #8A9E7A;
  --cream: #F5EFD6;
  --cherry: #8B1A2F;
  --deep-red: #6B0F20;
  --rose-blush: #C4566A;
  --charcoal: #1A1A1A;
  --off-white: #FAF8F2;
  --grain-opacity: 0.04;
}
Typography
Display / Masthead: Bebas Neue (Google Fonts)
Editorial Headlines: Cormorant Garamond (Google Fonts — use italic weights)
Body: DM Sans (Google Fonts)
Code / Mono: IBM Plex Mono (Google Fonts)

Load all four via next/font/google in app/layout.tsx. Apply as CSS variables so all components can access them.
Textures & Atmosphere
	• Grain overlay on all full-bleed sections: SVG filter or CSS noise — opacity 0.04
	• Diagonal grid-breaking layouts — no boring centered columns
	• Asymmetric spacing — intentional imbalance
	• Gold rule lines (1px) as editorial dividers

STEP 1 — FONT SETUP IN layout.tsx
In app/layout.tsx:
import { Bebas_Neue, Cormorant_Garamond, DM_Sans, IBM_Plex_Mono } from 'next/font/google'
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' })
const cormorant = Cormorant_Garamond({ 
  weight: ['300', '400', '500', '600', '700'], 
  style: ['normal', 'italic'],
  subsets: ['latin'], 
  variable: '--font-cormorant' 
})
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const ibmMono = IBM_Plex_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-mono' })
Apply all four variables to the <html> element className.
In globals.css, add:
body { font-family: var(--font-dm-sans), sans-serif; }
h1, h2, .masthead { font-family: var(--font-bebas), sans-serif; }
.editorial { font-family: var(--font-cormorant), serif; }
code, .mono { font-family: var(--font-mono), monospace; }

STEP 2 — HOMEPAGE MAGAZINE COVER
What this must look like
Create components/MagazineCover.tsx. The magazine cover fills exactly 100dvh as the very first section of the homepage. Everything below stays untouched.
.This is an editorial magazine cover. Not a portfolio. Not a landing page. A magazine cover — with all the visual language that implies: masthead, coverlines, volume/issue info, a strong full-bleed image, and the controlled chaos of editorial design.
Magazine cover layout principles (from the 3 reference covers in project root):
	• The masthead title (CREATIVELY NANDA) sits large at the top — big enough for the subject's head to visually sit in front of it
	• Coverlines flank both sides in tight typographic columns
	• Thin vertical spine text runs down the left edge
	• A decorative barcode lives bottom-right
	• Grain texture overlays the entire cover
	• Bottom ticker bar in accent gold
	• No boxes, cards, or borders around the photo — it floats transparently on the background

Layout specification
BACKGROUND:  Grain texture overlay.
LEFT SPINE (vertical strip):
	• 28px wide strip in ancestral gold (#C9A84C) running full height on the left edge
	• Rotated text along spine: MIREMBE MUSE · EST. 2025 · EAST LONDON, SA
	• Font: IBM Plex Mono, 9px, cream
TOP MASTHEAD:
CREATIVELY
NANDA
	• Font: Bebas Neue
	• Size: 14vw on desktop, 20vw on mobile
	• Color: cream (#F5EFD6)
	• Letter spacing: -0.02em
	• Positioned top-left, sits BEHIND the hero image using z-index layering
	• The image subject (Nanda) overlaps the masthead — classic Vogue technique
FULL NAME TREATMENT (below masthead or overlaid):
NANDAWULA REGINE KABALI-KAGWA
	• Font: Cormorant Garamond Italic, 500 weight
	• Size: 1.4rem desktop, smaller mobile
	• Color: ancestral gold (#C9A84C)
	• Position: directly below the masthead text, left-aligned
	• Letter spacing: 0.15em — wide, refined, unmistakable
HERO IMAGE:
	• Nanda's professional photo (/assets/professional/nanda-professional-2-transparent.png)
	• Positioned center-right, bottom-anchored, bleeding off the bottom edge
	• z-index above masthead text but below coverlines
	• Drop shadow: 0 0 80px rgba(201, 168, 76, 0.25) — warm gold glow
LEFT COVERLINES (stack, left side, mid-section):
→ AI ENGINEERING FOR AFRICA
→ 7 APPS. ONE WOMAN. ONE YEAR.
→ UBUNTU × CODE
→ POPIA COMPLIANT · REG. 2026-005658

	• Font: DM Sans, 11px, cream, all caps
	• Thin gold horizontal rule above each line
	• Stacked vertically, left-aligned
RIGHT COVERLINES (right side, mirror of left):
→ THE POET WHO CODES
→ INSIDE HER ROSES
→ FROM R0 TO 7 SAAS APPS


	• Same style as left coverlines
ISSUE LINE (bottom strip):
	• Full-width dark strip (charcoal or deep cherry #6B0F20) at very bottom
	• Scrolling ticker or static row:
AI CONSULTING · 7 SAAS APPS · NOTION TEMPLATES · POETRY · MIREMBE MUSE · EAST LONDON · UBUNTU × CODE · 2026
	• Font: IBM Plex Mono, cream, 10px
VOLUME/BARCODE (bottom right):
VOL. 01 · ISSUE 2026
EST. 2025
	• Small decorative barcode SVG (visual only, not scannable)
	• Font: IBM Plex Mono, 8px, sage
CHERRY/RED ACCENT USAGE:
	• The bottom strip uses #6B0F20 (deep red) as background
	• The scrolling ticker uses rose-blush #C4566A for punctuation/separators
	• On hover of coverlines, the gold rule transitions to cherry #8B1A2F
	• Do NOT make red dominant — it's an accent that appears in ~15% of the cover surface
	• HERE IS SOME STRUCTURE GUIDANCE:
	'use client'
	
	import Image from 'next/image'
	import { useEffect, useRef } from 'react'
	
	// ← UPDATE this to the actual filename found in public/ during Step 0 audit
	const PHOTO_FILENAME = 'nanda.png'
	
	const TICKER_ITEMS = [
	  'AI CONSULTING',
	  '7 SaaS APPS',
	  'NOTION TEMPLATES',
	  'POETRY · CODE · POWER',
	  'MIREMBE MUSE',
	  'EST. 2024',
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
	      background: 'var(--navy, #0A0F2C)',
	      overflow: 'hidden',
	      display: 'flex',
	      flexDirection: 'column',
	      fontFamily: 'var(--font-dm, sans-serif)',
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
	        <div style={{ width: '120px', flexShrink: 0, display: 'none' }} className="md-show" data-desktop>
	          <span style={{
	            fontFamily: 'var(--font-mono, monospace)',
	            fontSize: '9px',
	            letterSpacing: '0.32em',
	            color: 'rgba(245,240,232,0.6)',
	            textTransform: 'uppercase',
	          }}>EST. 2024</span>
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
	        <div style={{ width: '120px', flexShrink: 0, textAlign: 'right', display: 'none' }} className="md-show" data-desktop>
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
	      <nav style={{
	        position: 'relative',
	        zIndex: 30,
	        display: 'flex',
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
	          }}>
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
	
	        {/* LEFT COVERLINES */}
	        <div style={{
	          width: '160px',
	          flexShrink: 0,
	          display: 'flex',
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
	        }}>
	          <Image
	            src={`/${PHOTO_FILENAME}`}
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
	
	        {/* COVER QUOTE — lower left */}
	        <div style={{
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
	
	        {/* RIGHT COVERLINES + BARCODE */}
	        <div style={{
	          position: 'absolute',
	          right: '14px',
	          top: '0',
	          bottom: '0',
	          width: '130px',
	          display: 'flex',
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
	
	        {/* MOBILE — single descriptor line (replaces all coverlines on small screens) */}
	        <p style={{
	          position: 'absolute',
	          bottom: '68px',
	          left: 0,
	          right: 0,
	          textAlign: 'center',
	          fontFamily: 'var(--font-cormorant)',
	          fontSize: '14px',
	          fontStyle: 'italic',
	          color: 'rgba(245,240,232,0.75)',
	          margin: 0,
	          zIndex: 25,
	          padding: '0 20px',
	          display: 'none', // show only on mobile via CSS class
	        }} className="mobile-descriptor">
	          AI Engineer · Published Poet · Founder, Mirembe Muse
	        </p>
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
	          .ticker-track {
	            display: flex;
	            white-space: nowrap;
	            animation: tickerScroll 28s linear infinite;
	            will-change: transform;
	          }
	          .ticker-track:hover { animation-play-state: paused; }
	
	          @media (min-width: 768px) {
	            .mobile-descriptor { display: none !important; }
	            [data-desktop] { display: block !important; }
	          }
	          @media (max-width: 767px) {
	            .mobile-descriptor { display: block !important; }
	            [data-desktop] { display: none !important; }
	            .photo-container { left: 50% !important; transform: translateX(-50%) !important; height: 62% !important; }
	          }
	        `}</style>
	        <div className="ticker-track">
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
	END OF GUIDANCE
Below the fold (rest of homepage)
Keep the existing sections (Digital Products, AI Consulting, quote, CTA) but apply the full design system:
	• All section headings: Cormorant Garamond Italic
	• All body: DM Sans
	• All code references: IBM Plex Mono
	• Correct Est. 2024 → Est. 2025 everywhere on the homepage
	• The stats row (7 Apps · 300+ users · 2 yrs self-taught · R300k MRR Target) — change 2 yrs to 9 months

STEP 3 — PROJECTS PAGE (/projects)
What to remove
	• Remove the "Where It Started" / Origins / FCC projects section entirely. Delete those cards and that section heading. Nanda's project page tells her real projects only.
Case study treatment for ALL current projects
STEP 3 — PROJECTS: FULL CASE STUDY TREATMENT
3a — Create lib/data/projects.ts
This file powers the entire projects page. Create it with the following data:
export type ProjectStatus = 'live' | 'beta' | 'building'
export type ProjectCategory = 'saas' | 'origin' | 'media' | 'portfolio'

export interface BuildPhase {
  phase: string
  title: string
  date: string
  commits?: string
  milestone: string
}

export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  problem: string
  solution: string
  impact: string
  status: ProjectStatus
  category: ProjectCategory
  liveUrl?: string
  githubUrl?: string
  stack: { category: string; items: string[] }[]
  buildPhases: BuildPhase[]
  metrics: { label: string; value: string }[]
  accentColor: string
  buildJourneyFile?: string
  buildDuration: string
  startedFrom?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'adminos',
    name: 'AdminOS',
    tagline: 'The OS that runs your business while you sleep.',
    description: 'Multi-tenant AI-powered business operating system for South African SMEs, NGOs, schools, clinics, and government. Five specialist AI agents handle WhatsApp inbox, debt recovery, staff wellness, document intelligence, and analytics — automatically.',
    problem: "Africa's businesses run on WhatsApp. Millions of messages land every day — client queries, invoice follow-ups, complaints — and behind each one is a human manually chasing, copying, repeating. South African SMEs had zero professional infrastructure to automate this.",
    solution: 'AdminOS handles the full admin layer automatically. WhatsApp-native inbox. Five AI specialist agents. Xero invoicing. Redis-cached FAQ layer. Immutable audit logs. Load-shedding resilient. Built for all 11 official South African languages.',
    impact: "South Africa's first AI-native business OS. Replaces 6 separate subscriptions. 85% AI cost reduction via Claude prompt caching. Multi-tenant architecture serves unlimited businesses from a single deployment.",
    status: 'live',
    category: 'saas',
    liveUrl: 'https://adminos.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/AdminOS',
    stack: [
      { category: 'Frontend', items: ['Next.js 14 App Router', 'TypeScript (strict)', 'Tailwind CSS', 'Zustand'] },
      { category: 'AI', items: ['Claude claude-sonnet-4-6 (prompt caching)', '5 specialist agent architecture', 'Redis FAQ cache layer'] },
      { category: 'Database', items: ['Supabase PostgreSQL', 'Row-Level Security multi-tenancy', 'Supabase Realtime'] },
      { category: 'Messaging', items: ['360dialog WhatsApp Business API', 'Resend transactional email'] },
      { category: 'Infrastructure', items: ['Upstash Redis', 'Vercel Edge + Cron (4 scheduled jobs)', 'Inngest async queues', 'Sentry'] },
      { category: 'Payments & Integrations', items: ['PayFast ZAR', 'Xero API', 'PostHog analytics'] },
    ],
    buildPhases: [
      { phase: '1', title: 'Foundation', date: 'Feb 2026', commits: '47', milestone: 'Multi-tenant Supabase schema, RLS policies, JWT auth, TypeScript types' },
      { phase: '2', title: 'WhatsApp Engine', date: 'Feb 2026', commits: '63', milestone: '360dialog webhook, WorkflowEngine, Claude integration, Redis dedup, HMAC auth' },
      { phase: '3', title: 'Dashboard', date: 'Mar 2026', commits: '82', milestone: 'Realtime dashboard, 7 dashboard routes, inbox, analytics, Supabase Realtime push' },
      { phase: '4', title: 'Agents', date: 'Mar 2026', commits: '55', milestone: 'Debt recovery cron (escalating), wellness check-ins, document intelligence, daily brief' },
      { phase: '5', title: 'Launch', date: 'Mar 2026', commits: '34', milestone: 'PayFast billing, 15-minute onboarding wizard, Xero integration, production deploy' },
    ],
    metrics: [
      { label: 'AI agents', value: '5' },
      { label: 'AI cost reduction', value: '85%' },
      { label: 'SA languages', value: '11' },
      { label: 'Build time', value: '5 weeks' },
    ],
    accentColor: '#C9943A',
    buildJourneyFile: 'AdminOS_BUILD_JOURNEY.md',
    buildDuration: '5 weeks from zero to multi-tenant production',
  },
  {
    id: 'varsityos',
    name: 'VarsityOS — Campus Compass',
    tagline: "South Africa's first AI student companion.",
    description: 'Progressive Web App for SA\'s 11 million university and TVET students. AI companion Nova trained on SA-specific stressors — NSFAS delays, load shedding, imposter syndrome, exam anxiety. Six independent AI agents share one Supabase database. Installable. Offline-capable.',
    problem: "South Africa has a 50%+ dropout rate. Students navigate NSFAS funding delays, load shedding, food insecurity, and academic pressure with tools built for students in California. Nothing existed for the R50-budget meal planner on 3G who needs crisis support at 2am.",
    solution: 'Nova — an AI companion who understands NSFAS, speaks SA campus language, manages study plans and budgets, generates R50 meals from available ingredients, and surfaces SADAG + Lifeline SA when it detects a mental health crisis.',
    impact: '200+ active students in beta. Addresses SA\'s 50% dropout rate with culturally fluent AI support. Only PWA in SA built specifically for township internet speeds.',
    status: 'live',
    category: 'saas',
    liveUrl: 'https://varsityos.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/campus-compass',
    stack: [
      { category: 'Frontend', items: ['Next.js 14 App Router', 'TypeScript', 'Tailwind CSS', 'PWA (installable, offline-first)', 'Zustand'] },
      { category: 'Forms & Validation', items: ['React Hook Form + Zod'] },
      { category: 'AI', items: ['Claude claude-sonnet-4-6', '6 independent agents on shared DB', 'Crisis detection & routing'] },
      { category: 'Database', items: ['Supabase PostgreSQL + RLS', 'Supabase Auth'] },
      { category: 'Payments', items: ['PayFast ZAR — Free/R39/R79 tiers'] },
      { category: 'Infrastructure', items: ['Vercel', 'Resend', 'PostHog', 'Sentry', 'Firebase Push (VAPID)'] },
    ],
    buildPhases: [
      { phase: '1', title: 'Nova AI Core', date: 'Jan 2026', milestone: 'Conversational AI with SA student context, Supabase auth, chat history' },
      { phase: '2', title: 'Study Engine', date: 'Jan 2026', milestone: 'Timetable, modules, exams, tasks, AI study planner agent' },
      { phase: '3', title: 'Budget + Meals', date: 'Feb 2026', milestone: 'NSFAS budget tracker, animated spending ring, AI recipe generator agent' },
      { phase: '4', title: 'Crisis Layer', date: 'Feb 2026', milestone: 'Mental health detection, SADAG/Lifeline surfacing, daily wellness check-in agent' },
      { phase: '5', title: 'Monetisation + PWA', date: 'Mar 2026', milestone: 'PayFast three-tier pricing, Scholar/Premium caps, email flows, installable PWA' },
    ],
    metrics: [
      { label: 'Active students', value: '200+' },
      { label: 'AI agents', value: '6' },
      { label: 'Target market', value: '11M students' },
      { label: 'Stress reduction', value: '40%' },
    ],
    accentColor: '#2D4A22',
    buildJourneyFile: 'VarsityOS_BUILD_JOURNEY.md',
    buildDuration: '6 weeks — concept to live PWA',
  },
  {
    id: 'stokvelos',
    name: 'StokvelOS',
    tagline: 'R50 billion moves through stokvels. Finally, infrastructure to protect it.',
    description: "South Africa's first AI-powered stokvel management platform. Contribution tracking, AI governance reports, meeting minutes generation, WhatsApp reminders, fraud pattern detection. Built for the R50B+ community savings economy.",
    problem: 'R11 billion moves through South African stokvels annually — total economy over R50 billion. Most run on WhatsApp threads and paper ledgers. Disputes, missed contributions, and fraud dissolve community trust and destroy generational savings.',
    solution: 'Digital stokvel infrastructure with AI governance. Automated contribution tracking. Monthly AI compliance health reports. AI meeting minutes from rough notes. Smart fraud detection. WhatsApp reminders personalised per member.',
    impact: 'First mover in a R50B market that has never had formal digital infrastructure. 3 stokvels in structured beta.',
    status: 'beta',
    category: 'saas',
    liveUrl: 'https://stokvelos.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/StokvelOS',
    stack: [
      { category: 'Frontend', items: ['Next.js 14', 'TypeScript', 'Tailwind CSS'] },
      { category: 'AI', items: ['Claude claude-sonnet-4-6', 'AI health reports', 'Meeting minutes generator', 'Fraud pattern recognition'] },
      { category: 'Database', items: ['Supabase PostgreSQL + RLS'] },
      { category: 'Messaging', items: ['Meta WhatsApp Cloud API', 'Resend'] },
      { category: 'Analytics', items: ['Vercel Analytics', 'Speed Insights', 'PostHog', 'GA4'] },
    ],
    buildPhases: [
      { phase: '1', title: 'Core Schema', date: 'Jan 2026', milestone: 'Members, contributions, meetings schema with RLS, multi-stokvel isolation' },
      { phase: '2', title: 'Admin Dashboard', date: 'Feb 2026', milestone: 'Contribution tracking, member management, ledger reporting' },
      { phase: '3', title: 'AI Governance', date: 'Feb 2026', milestone: 'Monthly health reports, meeting minutes generator, fraud detection' },
      { phase: '4', title: 'WhatsApp Layer', date: 'Mar 2026', milestone: 'Personalised member reminders, contribution confirmation notifications' },
    ],
    metrics: [
      { label: 'SA stokvel economy', value: 'R50B+' },
      { label: 'Participants', value: '11M' },
      { label: 'Beta stokvels', value: '3' },
      { label: 'Category position', value: 'First mover' },
    ],
    accentColor: '#C9A84C',
    buildDuration: '7 weeks',
  },
  {
    id: 'k53',
    name: 'K53 Drill Master',
    tagline: 'Pass your K53 first time. Or drill until you do.',
    description: "Adaptive learning platform targeting SA's 60%+ K53 learner licence failure rate. Tracks weak areas per user, adjusts difficulty dynamically. Mobile-first for budget Android on 3G. Road Signs, Road Rules, Vehicle Controls — all vehicle codes.",
    problem: "South Africa has one of the worst K53 pass rates in the world. Most people fail not because they can't drive — but because they've never seen the actual question formats under timed pressure. The existing tools: a R150 booklet and a website from 2009.",
    solution: 'A mobile-first drill app — not a study guide. Repetition until it sticks. Adaptive engine tracks weak areas and adjusts difficulty. All vehicle codes. Full mock tests. Timer. DLTC-style pass/fail scoring. Designed for 360px budget Android screens.',
    impact: '50+ paying users. 4.8/5 average rating. Top 10 organic search for "K53 practice test". Phase 0 shipped in a single day.',
    status: 'live',
    category: 'saas',
    liveUrl: 'https://k53drillmaster.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/nanda-k53-drill-master',
    stack: [
      { category: 'Frontend', items: ['React 18', 'Vite', 'TypeScript'] },
      { category: 'State', items: ['React state + localStorage (deliberately no over-engineering)'] },
      { category: 'Design', items: ['Mobile-first (360px budget Android)', 'Georgia serif — intentional (feels like a printed test booklet)'] },
      { category: 'Payments', items: ['PayFast ZAR'] },
      { category: 'Monitoring', items: ['PostHog', 'Sentry', 'GA4'] },
    ],
    buildPhases: [
      { phase: '0', title: 'Problem Definition → Deployed', date: '2026-02-27', commits: '1', milestone: 'Defined the problem at 09:00. Gauntlet mode + Pattern Trainer deployed by end of day.' },
      { phase: '1', title: 'Road Rules Gauntlet', date: '2026-02-27', commits: '2', milestone: 'Road Rules added, vehicle code picker, 120 questions across all codes' },
      { phase: '2', title: 'Road Signs (SVG)', date: '2026-02-27', commits: '3', milestone: '38 SVG signs, 4 categories, custom rendering' },
      { phase: '3', title: 'Vehicle Controls', date: '2026-02-27', commits: '4', milestone: '30 vehicle control questions, Code 8 complete' },
      { phase: '4', title: 'Mock Test Engine', date: 'Mar 2026', commits: '12', milestone: 'Full mock K53 test, countdown timer, DLTC pass/fail scoring' },
      { phase: '5', title: 'Adaptive Engine', date: 'Mar 2026', milestone: 'Weak area tracking, difficulty adjustment, personalised drill sets per user' },
    ],
    metrics: [
      { label: 'Paying users', value: '50+' },
      { label: 'Average rating', value: '4.8/5' },
      { label: 'SEO position', value: 'Top 10' },
      { label: 'Phase 0 speed', value: '1 day' },
    ],
    accentColor: '#2D4A22',
    buildJourneyFile: 'K53_BUILDLOG.md',
    buildDuration: 'Phase 0 in 1 day. Full v1 in 3 weeks.',
  },
  {
    id: 'watchsankofa',
    name: 'WatchSankofa — Sankofa TV',
    tagline: 'Netflix was built for Hollywood. Sankofa TV was built for us.',
    description: 'Pan-African creative content platform for filmmakers, musicians, poets, writers, and storytellers. Built from the ground up for the continent — its connectivity realities, 2,000+ languages, and mobile-first majority. Not a clone. An original.',
    problem: 'African creative content has always had to fit itself into platforms built by and for Western audiences. The algorithms, payment rails, discovery mechanisms, and infrastructure — none of it was built for 1.4 billion Africans creating in 2,000+ languages.',
    solution: 'African creator infrastructure. Full streaming, authentication, content management, creator profiles, discovery, and community tools. Built mobile-first, low-bandwidth optimised, designed from day one for the continent.',
    impact: "The only streaming platform built specifically for African creators and African audiences. Cinematic design system expressing Africa's visual language. Renamed from AfriFlix to WatchSankofa — deeper cultural alignment.",
    status: 'live',
    category: 'media',
    liveUrl: 'https://watchsankofa.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/AfriFlix',
    stack: [
      { category: 'Frontend', items: ['Next.js 14', 'TypeScript', 'Syne display font', 'Custom cinematic design system'] },
      { category: 'Streaming', items: ['Cloudflare Stream', 'Supabase Storage', 'CDN-optimised delivery'] },
      { category: 'Database', items: ['Supabase PostgreSQL + RLS', 'Zustand', 'Custom hooks'] },
      { category: 'Design System', items: ['Black / Gold / Terracotta / Ivory palette', 'Syne + editorial typography'] },
      { category: 'Infrastructure', items: ['Vercel', 'Cloudinary', 'PostHog', 'Sentry'] },
    ],
    buildPhases: [
      { phase: '1', title: 'Static Foundation (AfriFlix)', date: 'Jan 2026', milestone: 'HTML/CSS/JS landing, concept validated, AFRIFLIX_MASTER_PROMPT.md written' },
      { phase: '2', title: 'Next.js Platform Rebuild', date: 'Feb 2026', milestone: 'Full migration, auth, database schema, streaming architecture, content management' },
      { phase: '3', title: 'Creator Tools', date: 'Mar 2026', milestone: 'Upload system, creator profiles, content discovery, community layer' },
      { phase: '4', title: 'Sankofa Rebrand', date: 'Mar 2026', milestone: 'AfriFlix → WatchSankofa. Cinematic design system. Cultural alignment deepened.' },
    ],
    metrics: [
      { label: 'Target continent', value: '1.4B people' },
      { label: 'African languages', value: '2,000+' },
      { label: 'Nations', value: '54' },
      { label: 'Category', value: 'First mover' },
    ],
    accentColor: '#C9943A',
    buildJourneyFile: 'WatchSankofa_BUILD_JOURNAL.md',
    buildDuration: '8 weeks from static HTML to full streaming platform',
  },
  {
    id: 'creativelynanda',
    name: 'CreativelyNanda.co.za',
    tagline: 'The portfolio that became a platform.',
    description: 'Personal brand hub — 72 commits, most iterated repo. Features multilingual blog "The Current", Notion template sales with automated delivery, project showcases, poetry section, Nanda AI chatbot, PayFast integration, and email automation via Resend.',
    problem: 'A standard portfolio site cannot hold a creative technologist who is also a published poet, a founder, a cultural technologist, and an AI engineer. The site needed to be as layered and alive as its owner.',
    solution: 'A full-stack platform disguised as a portfolio. AI chatbot trained on portfolio content. Multilingual via Next.js locales. Editorial blog. Template sales with automated delivery. Magazine-cover homepage.',
    impact: 'Primary credibility engine for all client work and fellowship applications. Direct sales channel for digital products. The most technically complex personal site in South African tech.',
    status: 'live',
    category: 'portfolio',
    liveUrl: 'https://creativelynanda.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/CreativelyNanda.co.za',
    stack: [
      { category: 'Frontend', items: ['Next.js 14', 'TypeScript + JavaScript', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'AI', items: ['Nanda AI chatbot', 'Claude API', 'RAG on portfolio content'] },
      { category: 'Database', items: ['Supabase PostgreSQL'] },
      { category: 'i18n', items: ['Next.js locales', 'Multi-language content'] },
      { category: 'Commerce', items: ['PayFast ZAR', 'Automated Notion template delivery'] },
      { category: 'Email', items: ['Resend transactional automation'] },
      { category: 'Analytics', items: ['PostHog', 'GA4', 'GTM', 'Search Console'] },
    ],
    buildPhases: [
      { phase: '1', title: 'Portfolio Foundation', date: 'Aug 2025', milestone: 'First deployment, project showcase, about page, contact' },
      { phase: '2', title: 'The Current (Blog)', date: 'Oct 2025', milestone: 'Editorial blog with Cormorant Garamond design system' },
      { phase: '3', title: 'Nanda AI Chatbot', date: 'Dec 2025', milestone: 'Claude API chatbot with RAG on portfolio documents' },
      { phase: '4', title: 'Commerce Layer', date: 'Jan 2026', milestone: 'PayFast, Notion template sales, automated delivery, Resend email' },
      { phase: '5', title: 'Magazine Transformation', date: 'Apr 2026', milestone: 'Full-bleed magazine cover hero, editorial redesign, POPIA compliance display' },
    ],
    metrics: [
      { label: 'GitHub commits', value: '72' },
      { label: 'Features', value: 'AI + Blog + Shop + i18n' },
      { label: 'Build months', value: '9' },
      { label: 'Iteration rank', value: '#1 repo' },
    ],
    accentColor: '#C9A84C',
    buildDuration: '9 months of continuous iteration — the living portfolio',
  },
  {
    id: 'origins',
    name: 'The Origin Projects',
    tagline: 'Where it started: zero knowledge, first commit.',
    description: 'freeCodeCamp certification projects — the HTML/CSS/JavaScript foundation that preceded 7 production SaaS applications. Responsive web design, JavaScript algorithms, front-end React libraries. Built mid-2025 from absolute zero.',
    problem: 'The real problem: Could someone with zero coding background teach themselves to build production software in under a year? These projects were the first answer.',
    solution: 'Systematic curriculum progression. Every certification project shipped and submitted. No shortcuts. The discipline learned here became the discipline that shipped 7 apps in 9 months.',
    impact: 'Every line of production code in all 7 apps traces back to this foundation. The origin story that makes the full journey extraordinary.',
    status: 'live',
    category: 'origin',
    startedFrom: 'Zero coding knowledge · Mid-2025',
    stack: [
      { category: 'Core', items: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Responsive Design'] },
      { category: 'Libraries', items: ['React', 'D3.js', 'Bootstrap', 'jQuery'] },
      { category: 'Certifications', items: ['fCC Responsive Web Design', 'fCC JavaScript Algorithms', 'fCC Front-End Libraries'] },
    ],
    buildPhases: [
      { phase: '1', title: 'Responsive Web Design', date: 'Jul 2025', milestone: 'HTML/CSS fundamentals, accessibility, responsive layouts, first deployed project' },
      { phase: '2', title: 'JavaScript Algorithms', date: 'Aug 2025', milestone: 'Data structures, algorithms, functional programming patterns' },
      { phase: '3', title: 'Front-End Libraries', date: 'Sep 2025', milestone: 'React, SASS, Bootstrap, D3.js — the component model that scales to SaaS' },
      { phase: '4', title: 'The Pivot', date: 'Oct 2025', milestone: 'From curriculum to commercial. The moment learning became building.' },
    ],
    metrics: [
      { label: 'Starting point', value: 'Zero' },
      { label: 'Time to first SaaS', value: '3 months' },
      { label: 'Certifications earned', value: '3+' },
      { label: 'This led to', value: '7 live apps' },
    ],
    accentColor: '#7A9E7E',
    buildDuration: 'Mid-2025 → Sep 2025 · 3 months to first React project',
  },
]

STEP 4 — ABOUT PAGE (/about)
Section: "What I Bring to the Table" — Full Tech Stack
Replace the existing tech stack section with an asymmetric grid showing ALL of the following:
LANGUAGES
TypeScript · JavaScript · Python (basics) · SQL · HTML5 · CSS3
FRAMEWORKS & LIBRARIES  
Next.js 14 (App Router) · React · Tailwind CSS · Zustand · React Hook Form · Zod
AI & MACHINE LEARNING
Anthropic Claude API (Sonnet + Haiku) · OpenAI GPT-4o-mini · Prompt Engineering · AI Agent Architecture · Claude Prompt Caching
DATABASE & BACKEND
Supabase (PostgreSQL + RLS + Realtime) · Supabase Auth · Upstash Redis · Inngest (async jobs) · REST APIs · Edge Functions
PAYMENTS & COMMERCE
PayFast (ZAR) · LemonSqueezy · Wise (multi-currency) · Xero API
DEVOPS & INFRASTRUCTURE
Vercel · GitHub · Sentry (error monitoring) · PostHog (analytics) · GA4 · Google Tag Manager
COMMUNICATIONS
Resend (transactional email) · Meta WhatsApp Cloud API · Firebase (push notifications)
MEDIA & STORAGE
Cloudinary · Firebase Storage
DESIGN & CREATIVE
Figma · Canva Pro · Adobe Creative Suite · CapCut · Editorial Design
BUSINESS SYSTEMS
Notion (advanced) · POPIA compliance · CIPC compliance · Financial systems (TymeBank Business, Wise)
Layout: Masonry-style asymmetric grid. Each category has a gold label in IBM Plex Mono. Skills in DM Sans. Hover: gold underline appears. Dark background section (charcoal).
Correct: Company founded
	• Any mention of "2024" as founding year → 2025
	• Story: "9 months. Zero coding knowledge. Seven live AI applications."
3c — Generate README files for all 5 main apps
Create the following files in public/build-journeys/. Each must be a complete, senior-level README using all available information from the build journey files and the app identity block:
	• public/build-journeys/README_AdminOS.md
	• public/build-journeys/README_VarsityOS.md
	• public/build-journeys/README_StokvelOS.md
	• public/build-journeys/README_K53.md
	• public/build-journeys/README_WatchSankofa.md
Each README must follow this structure:
# [App Name] — Technical README

> [Short description] · Built by Nandawula Regine Kabali-Kagwa · Mirembe Muse (Pty) Ltd

[![Live](https://img.shields.io/badge/Live-Production-green)](https://[url])
[![Stack](https://img.shields.io/badge/Stack-Next.js%2014-black)]()
[![AI](https://img.shields.io/badge/AI-Claude%20claude-sonnet-4-6-orange)]()
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

## Overview
[2–3 sentences: what it is, who it's for, what problem it solves]

## Architecture
[System architecture diagram in ASCII art, showing major components and data flow]

## Tech Stack
| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
[Complete table with every technology and why it was chosen]

## Database Schema
[Key tables, essential columns, RLS policy descriptions]

## AI Architecture
[For AI-heavy apps: agent list, model routing decisions, cost optimisation approach]

## Environment Variables
[Variable names only — never actual values]
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
[etc]
\`\`\`

## Local Development
\`\`\`bash
git clone https://github.com/Nanda-Regine/[repo]
cd [repo]
npm install
cp .env.example .env.local
# Fill in your environment variables
npm run dev
\`\`\`

## Key Technical Decisions
[5–8 architectural decisions with rationale — this is the most important section for senior devs]

## Deployment
[Vercel config, cron job schedules, webhook endpoints, build settings]

## Known Issues & Roadmap
[Honest list of what's known and what's next]

## License
Proprietary · Mirembe Muse (Pty) Ltd · © 2026 · All rights reserved.

---
*Built by The Poet Who Codes — where Ubuntu becomes architecture.*

3d — Projects page layout
Replace app/projects/page.tsx with a new implementation. Read the current file first to preserve any existing unique functionality.
Page structure:
	1. Editorial header section — dark background, grain texture: 
		○ PROJECTS in Bebas Neue, 96px, full width
		○ Subline in Cormorant Garamond italic 18px: "Seven applications. One woman. Nine months. Africa's tech infrastructure, built from East London."
		○ Stats strip below: 500+ commits · 7 apps · 9 months · 0 → production
	2. Filter bar — pill buttons: All · Live SaaS · Media · Portfolio · Origins 
		○ Active: gold background, navy text · Inactive: border only, cream text
		○ State managed with useState (add 'use client')
	3. Project cards — for each project from PROJECTS array: 
		○ Left: 4px vertical accent bar in accentColor
		○ Project name in Bebas Neue 28px + status badge
		○ Tagline in Cormorant Garamond italic
		○ 4-metric strip in IBM Plex Mono (label, gold, 9px) + DM Sans (value, white, bold)
		○ Stack chips — IBM Plex Mono 9px, dark pill
		○ Action row: "View Case Study ↓" | "Read Build Journey ↗" | "GitHub ↗" | "Live Site ↗"
	4. Case study expansion — clicking "View Case Study" reveals: 
		○ Problem heading + paragraph
		○ Solution heading + paragraph
		○ Build Journey Timeline — horizontal scrollable track with phase nodes connected by gold line
		○ Impact heading + paragraph
		○ Full grouped tech stack
		○ Download build journey link (links to /build-journeys/[file])
		○ Download README link (links to /build-journeys/README_[Name].md)

1. POPIA footer badge:
tsx
<div style={{ 
  marginTop: '80px', 
  padding: '20px 24px', 
  border: '1px solid rgba(201,148,58,0.3)',
  background: 'rgba(201,148,58,0.03)'
}}>
  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A', letterSpacing: '0.3em', margin: '0 0 6px' }}>
    COMPLIANCE NOTICE
  </p>
  <p style={{ fontFamily: 'var(--font-dm)', fontSize: '13px', margin: '0 0 4px' }}>
    <strong>POPIA Compliant</strong> · Registration No: 2026-005658 · Date: 2026-04-03
  </p>
  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(201,148,58,0.6)', margin: 0 }}>
    Mirembe Muse (Pty) Ltd · Information Officer: Kabali-Kagwa, Nandawula · Appointed: 2025-08-28
  </p>
</div>



STEP 4 — ABOUT PAGE: TECH STACK + POPIA
Find the exact location of "bring to the table" or equivalent section:
bash
grep -n "bring\|stack\|skills\|technical\|BringTo" app/about/page.tsx -i | head -20
Add or replace the tech stack section using this data and an asymmetric editorial grid:
Tech stack categories:
const STACK = [
  {
    category: 'AI & Machine Learning',
    accentColor: '#C9943A',
    skills: [
      { name: 'Claude API', level: 'Expert', note: 'Prompt caching, multi-agent systems, RAG' },
      { name: 'Prompt Engineering', level: 'Expert', note: 'Production cost optimisation, agent design' },
      { name: 'AI Agent Architecture', level: 'Expert', note: '5-agent AdminOS, 6-agent VarsityOS' },
      { name: 'MCP Integration', level: 'Advanced', note: 'Model Context Protocol' },
      { name: 'OpenAI GPT-4o', level: 'Advanced', note: 'StokvelOS, comparison systems' },
      { name: 'RAG & Embeddings', level: 'Advanced', note: 'Vector search, Nanda AI chatbot' },
      { name: 'LangChain', level: 'Intermediate', note: 'Pipeline orchestration' },
    ],
  },
  {
    category: 'Frontend',
    accentColor: '#2D4A22',
    skills: [
      { name: 'Next.js 14 App Router', level: 'Expert', note: 'Server Components, Edge Functions, RSC' },
      { name: 'React 18', level: 'Expert', note: 'Hooks, performance optimisation, RSC patterns' },
      { name: 'TypeScript (strict)', level: 'Expert', note: 'Complex generics, type-safe APIs' },
      { name: 'Tailwind CSS', level: 'Expert', note: 'Design systems, custom tokens, animations' },
      { name: 'Framer Motion', level: 'Advanced', note: 'Production animations, scroll-triggered' },
      { name: 'PWA Development', level: 'Advanced', note: 'Offline-first, installable, VarsityOS' },
      { name: 'Zustand', level: 'Advanced', note: 'State management across all 7 apps' },
    ],
  },
  {
    category: 'Backend & Database',
    accentColor: '#C9A84C',
    skills: [
      { name: 'Supabase', level: 'Expert', note: 'PostgreSQL, RLS, Auth, Realtime, Storage' },
      { name: 'PostgreSQL + RLS', level: 'Expert', note: 'Multi-tenant row-level security' },
      { name: 'REST API Design', level: 'Expert', note: 'Next.js API routes, webhook handlers' },
      { name: 'Vercel Edge Functions', level: 'Advanced', note: 'Cron jobs, edge middleware, streaming' },
      { name: 'Node.js', level: 'Advanced', note: 'Server-side logic, async/await patterns' },
      { name: 'Upstash Redis', level: 'Intermediate', note: 'Rate limiting, session cache, deduplication' },
    ],
  },
  {
    category: 'Payments & Commerce',
    accentColor: '#7A9E7E',
    skills: [
      { name: 'PayFast', level: 'Expert', note: 'ZAR recurring SaaS, webhooks, sandbox → prod' },
      { name: 'LemonSqueezy', level: 'Advanced', note: 'International digital products, affiliates' },
      { name: 'Xero API', level: 'Intermediate', note: 'Invoice creation, client account sync' },
      { name: 'Wise', level: 'Intermediate', note: 'USD/EUR/GBP/KES international receipt' },
    ],
  },
  {
    category: 'Messaging & Comms',
    accentColor: '#C9943A',
    skills: [
      { name: 'Meta Business WhatsApp API', level: 'Advanced', note: 'Business webhooks, HMAC auth, AdminOS' },
      { name: 'Meta WhatsApp Cloud API', level: 'Intermediate', note: '1,000 free conversations/month' },
      { name: 'Resend', level: 'Advanced', note: 'Transactional email across all 7 apps' },
      { name: 'Firebase Push (VAPID)', level: 'Advanced', note: 'Push notifications, shared key 5 apps' },
    ],
  },
  {
    category: 'DevOps & Infrastructure',
    accentColor: '#2D4A22',
    skills: [
      { name: 'Vercel', level: 'Expert', note: 'Deployments, cron, Edge, analytics, build logs' },
      { name: 'GitHub', level: 'Expert', note: '386+ commits across 7 repositories' },
      { name: 'Sentry', level: 'Advanced', note: '5 error monitoring projects live' },
      { name: 'PostHog', level: 'Advanced', note: 'Product analytics, 7 properties configured' },
      { name: 'Cloudinary', level: 'Intermediate', note: 'Image transforms, CDN optimisation' },
      { name: 'Arcjet', level: 'Intermediate', note: 'Rate limiting in API routes' },
    ],
  },
  {
    category: 'Analytics & SEO',
    accentColor: '#C9A84C',
    skills: [
      { name: 'Google Analytics 4', level: 'Advanced', note: '7 GA4 properties, event tracking' },
      { name: 'Google Tag Manager', level: 'Advanced', note: '7 GTM containers deployed' },
      { name: 'Google Search Console', level: 'Advanced', note: '7 domains verified and monitored' },
      { name: 'Schema.org JSON-LD', level: 'Intermediate', note: 'Structured data, rich results' },
    ],
  },
]
Display design: Asymmetric editorial grid. Alternate row spans — some cards 2-col wide, some 1-col, no two rows the same. Each card:
	• Left vertical accent bar in category colour (4px)
	• Category label: IBM Plex Mono, 9px, uppercase, tracked
	• Skills: name in DM Sans bold 13px · level as horizontal fill bar (Expert=full gold, Advanced=75% sage, Intermediate=50%) · note in Cormorant Garamond italic 12px
Add grain texture SVG as section background at opacity 0.03.
POPIA compliance block (add at the bottom of about page — near contact section):
tsx
<div style={{
  borderTop: '1px solid rgba(201,148,58,0.25)',
  paddingTop: '24px',
  marginTop: '60px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
}}>
  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A', letterSpacing: '0.3em' }}>
    COMPLIANCE
  </span>
  <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', margin: 0 }}>
    <strong>POPIA Compliant</strong> · Reg. No: <strong>2026-005658</strong> · Registered: 2026-04-03
  </p>
  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(201,148,58,0.6)', margin: 0 }}>
    Mirembe Muse (Pty) Ltd · Information Officer: Kabali-Kagwa, Nandawula · Appointed 2025-08-28
  </p>
</div>

STEP 5 — SERVICES: EDITORIAL PRICING DISPLAY
Find the services page/section:
bash
find app -name "*.tsx" | xargs grep -l "service\|Services\|pricing" 2>/dev/null | grep -v node_modules
If services are on a dedicated page, replace the pricing layout entirely (keep any intro copy and CTAs). If services are a section on the homepage, update that section.
Design direction: NOT a table or boring list. Asymmetric card layout with:
	• Diagonal CSS clip-paths between sections (each section angled differently)
	• Grain texture overlaid on dark backgrounds
	• Gold diagonal ribbon on ★ Signature Offer items: position: absolute; transform: rotate(-45deg)
	• ZAR price prominent in gold IBM Plex Mono, large
	• USD equivalent in smaller cream mono below: (use R18.50 = $1 conversion)
	• Timeline badge in DM Sans 11px, sage coloured
	• "Proven by [app name]" note in Cormorant Garamond italic
Web Development:
Service	ZAR	USD	Timeline	Proven
1-page site	R5,000–R10,000	$270–$540	5–7 days	—
5-page site	R8,000–R15,000	$430–$810	2–3 weeks	—
5+ page site	R30,000–R60,000	$1,620–$3,240	3–5 weeks	CreativelyNanda
E-commerce ★	R35,000–R65,000	$1,892–$3,514	4–6 weeks	Mirembe Muse marketplace
Booking system	R30,000–R60,000	$1,622–$3,243	4–7 weeks	Cortex Hub
Location platform	R30,000–R60,000	$1,622–$3,243	4–7 weeks	True Access
AI-Powered Websites & Apps:
Service	ZAR	USD	Timeline	Proven
AI chatbot site ★	R30,000–R60,000	$1,622–$3,243	2–4 weeks	Nanda AI (+15% conversions)
MCP-embedded site ★	R60,000–R120,000	$3,243–$6,486	4–6 weeks	Architecture proven in 7 live application
Full-stack SaaS ★	R40,000–R100,000	$2,162–$5,405	5–10 weeks	6 live SaaS products
Streaming platform	R45,000–R90,000	$2,432–$4,865	6–10 weeks	WatchSankofa
RAG / knowledge base	R35,000–R70,000	$1,892–$3,784	2–3 weeks	Nanda AI chatbot
AI Engineering Retainers:
Service	ZAR/mo	USD/mo	Note
AI agent development ★	R25,000–R55,000	$1,351–$2,973	Highest margin
WhatsApp AI automation	R10,000–R25,000	$541–$1,351	Meta business whatsapp integration
Business automation	R8,000–R20,000	$432–$1,081	AdminOS-proven
AI health reports	R5,000–R15,000	$270–$811	StokvelOS + AdminOS
Notion & Operations:
Service	ZAR	USD	Timeline
Notion OS — solo	R5,000–R10,000	$270–$540	3–5 days
Notion OS — business	R8,000–R18,000	$432–$973	1–2 weeks
Website + Notion bundle ★	R20,000–R40,000	$1,081–$2,162	3–4 weeks
Notion template (digital)	R299–R1,499	$16–$81	Once-off

STEP 6 — AI ENGINEER PAGE: DOSSIER FORMAT
Read the current file first. Then add/replace the pricing section with a "dossier card" layout — each service looks like a classified capability brief.
Each dossier card:
	• Top classification stamp: CAPABILITY BRIEF in IBM Plex Mono, 8px, gold, letter-spaced
	• Decorative "redaction" bars: 3–4 dark narrow bars suggesting censored text (CSS pseudo-elements or divs)
	• Service name in Bebas Neue, 28px
	• ZAR pricing in gold, 32px IBM Plex Mono
	• USD equivalent below, 13px cream mono
	• Short "Proven by" line in Cormorant Garamond italic
	• "INITIATE PROJECT →" button




Find every instance of:
	• "360dialog" → replace with "Meta WhatsApp Cloud API"
	• "360 Dialog" → replace with "Meta WhatsApp Cloud API"
	• "via 360dialog" → remove entirely or replace with "via Meta's official Cloud API"
This applies to /ai-engineer, /consulting, and any component that lists services.

STEP 6 — EDUCATION PAGE (/education) — DEEPEN, DON'T REPLACE
 add soul, editorial design, and real narrative weight.
Changes to make:
A. Hero section Replace the plain heading with:
THE EDUCATION
THAT BUILT THE ENGINEER
Bebas Neue, large. Below it in Cormorant Garamond Italic:
"Three degrees. Six certifications. Nine months of code. 
And an ancestral knowing that none of this was coincidence."
B. NMU Academic Timeline — expand each entry
For each NMU qualification, add:
	• What she specifically studied in that year (pull from general Business Management knowledge — Operations, Strategy, Financial Management, Marketing, Entrepreneurship, HRM, Research Methods)
	• The significance: "This is where systems thinking was born"
	• 5 Distinctions callout per level — make it BOLD visually, not a quiet badge
C. NMU Featured Article — make it a pull quote hero
The LinkedIn featured article is a significant credential. Style it as a full-width editorial pull quote:
"Management graduand finds calling in writing"
— Nelson Mandela University · 135,000+ followers

Below it: 4 bullet points (already in the page) styled as editorial annotations with gold dash markers.
D. Leadership Program — add editorial framing
Add a paragraph:
Selected from hundreds of students across Nelson Mandela University, 
Nanda's leadership cohort was built around one conviction: that the 
next generation of African leaders would need both vision and 
the infrastructure to execute it. She brought both.
E. Technical Training — reframe each course with context
For each course, add one line of context showing HOW it connected to what she built:
	• SheCodes Plus → "The foundation. HTML and React in 6 months while building the K53 app simultaneously."
	• Google Digital Marketing & E-commerce → "How she understands her users before writing a single line of code."
	• Master Generative AI (Great Learning) → "Prompt engineering theory that now runs seven AI agents across five apps."
	• ChatGPT for Business Communication → "How she builds AI assistants that sound human — not robotic."
	• Human-Centered Design (IDEO) → "Nova on VarsityOS. The UX of StokvelOS. The onboarding of AdminOS. All start here."
	• Graphic Design Essentials → "The editorial design eye behind every case study, every brand, every cover."
F. Bottom CTA — replace generic text
Replace "The Journey Continues" section with:
NINE MONTHS.
SEVEN APPLICATIONS.
ONE VISION.
Bebas Neue, massive. Below it:
Business Management taught her how organisations work.
Code taught her how to rebuild them.
CTA buttons: See My Work → (green) and Work With Me → (cherry)

STEP 7 — MIREMBE PAGE (/mirembe)
Corrections:
A. Fix the timeline — company founded 2025, not 2024
Find and replace any instance of:
	• "Founded 2024" → "Founded 2025"
	• "Est. 2024" → "Est. 2025"
	• "established in 2024" → "established in 2025"
B. Fix the build duration
	• "two years" / "2 years" → "nine months"
	• "in two years" → "in nine months, starting from zero"
Run:
grep -rn "2024\|two years\|2 years" app/mirembe/ components/mirembe/ 2>/dev/null
Then fix every instance found.
 
. Add Ubuntu architecture section:
UBUNTU AS ARCHITECTURE.
"Ubuntu — 'I am because we are' — is not philosophy at Mirembe Muse. It is embedded in the technical decisions. StokvelOS protects community savings because community built the wealth. AdminOS serves SMEs because an SME ecosystem sustains communities. VarsityOS supports students because their success strengthens the country. Every product in this portfolio is Ubuntu made digital."

4. Correct company facts block:
Mirembe Muse (Pty) Ltd
Registered: South Africa (CIPC)
Location: East London, Eastern Cape
Founded: 2025
POPIA Registration: 2026-005658 · Registered 2026-04-03
Information Officer: Kabali-Kagwa, Nandawula · Appointed 2025-08-28
Products: 7 live SaaS applications
Build time: 9 months from zero coding knowledge
Tech: Next.js · TypeScript · Supabase · Claude API · PayFast · Vercel
Philosophy: Ubuntu — I am because we are

STEP 8 — POPIA COMPLIANCE BADGE (Global Footer)
In the global footer component (find it via grep -r "Privacy" components/ or app/layout.tsx):
Add after the copyright line:
<div className="popia-badge">
  <span className="popia-icon">🛡️</span>
  <span>POPIA Compliant · Registration No. 2026-005658</span>
  <span>Information Regulator of South Africa</span>
</div>
Style:
.popia-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--sage);
  border-top: 1px solid rgba(201, 168, 76, 0.2);
  padding-top: 0.75rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

STEP 9 — TYPESCRIPT CHECK & DEPLOY
# Check for type errors across all modified files
npx tsc --noEmit
# Fix any errors found before proceeding
# Build check
npm run build
# If build passes:
git add -A
git commit -m "feat: magazine cover homepage, full case studies, editorial design system, education depth, corrections applied"
git push origin main
If npm run build fails:
	1. Read the exact error message
	2. Fix it
	3. Run npx tsc --noEmit again
	4. Only push after a clean build

APPENDIX A — GOOGLE BUSINESS PROFILE REVIEW LINK
Add this to the footer or contact page:
⭐ Enjoyed working with Nanda? Leave a Google review →
[Your Google Business Profile review link]

Note: The actual review link URL must be added by Nanda from her Google Business Profile dashboard → "Get more reviews" → copy the short URL.

ardo Kino XL or Albedo Base XL with photoreal preset.

NOTES FOR CLAUDE CODE
-USE CREDITS/TOKENS WISELY!!!!!!!!!!!!!!!!!
- make PWA be able to work offline
-make as many git commits as strategically possible
	• Do not remove existing functionality — only add and correct
	• Do not modify Supabase schema or auth configuration
	• Do not touch .env or .env.local
	• Do not add new npm packages without checking package.json first to confirm they're not already installed
	• If a component file is very long, use str_replace for targeted edits rather than rewriting the entire file
	• Build journey content lives in the project root — read those files for case study content
	• All monetary conversions use approximate rate: R1 = $0.054 USD (R18.50 per USD)

