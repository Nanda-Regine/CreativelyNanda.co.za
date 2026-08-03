'use client';

/**
 * TexturedSection — a section whose background is a soul-palette texture veiled
 * for readability, giving pages a layered "magazine" depth (à la mirembemuse).
 * The texture only whispers through a strong tonal veil + grain, so text stays
 * crisp. Curated texture ids live in TEXTURES below.
 *
 *   <TexturedSection texture={TEXTURES.roseWall} tone="navy" className="py-28 px-6">
 *     …content…
 *   </TexturedSection>
 */

import { cldImg } from '@/lib/cloudinary';

// Curated from the 52-texture library — the ones with real depth + brand colour.
export const TEXTURES = {
  roseWall: 'creativelynanda/backgrounds/download-premium-image-of-oldrose-pink-rough-paper-wall-abou', // dusty-rose plaster
  petal: 'creativelynanda/backgrounds/petal',                       // crimson/gold petal
  marble: 'creativelynanda/backgrounds/download-29',                // red-gold ink marble
  goldBloom: 'creativelynanda/backgrounds/download-40',             // gold-lit night bloom
  crimsonPetal: 'creativelynanda/backgrounds/download-15',          // crimson + gold
  regalNavy: 'creativelynanda/backgrounds/download-41',             // navy + gold botanical
  regalNavy2: 'creativelynanda/backgrounds/download-45',
  navyFloral: 'creativelynanda/backgrounds/navy-floral',
  marineBlue: 'creativelynanda/backgrounds/marine-blue-wallpaper-4k-hd-images',
  jewel: 'creativelynanda/backgrounds/jewel',
  dark: 'creativelynanda/backgrounds/ultra-hd-4k-dark-minimalist-wallpapers',
  pressedRose: 'creativelynanda/backgrounds/download-23',
  atmospheric: 'creativelynanda/backgrounds/atmospheric-reference-for-alteritas-explore-the-full-board-o',
} as const;

// Tonal veils — strong enough that the texture is atmosphere, not competition.
const TONES: Record<string, string> = {
  navy: 'linear-gradient(180deg, rgba(10,17,40,0.92) 0%, rgba(10,17,40,0.95) 100%)',
  rose: 'linear-gradient(180deg, rgba(36,16,33,0.88) 0%, rgba(10,17,40,0.93) 100%)',
  wine: 'linear-gradient(160deg, rgba(20,16,42,0.90) 0%, rgba(36,16,33,0.90) 55%, rgba(10,17,40,0.94) 100%)',
  cream: 'linear-gradient(180deg, rgba(245,240,232,0.93) 0%, rgba(232,220,196,0.95) 100%)',
  parchment: 'linear-gradient(180deg, rgba(234,224,204,0.92) 0%, rgba(216,203,172,0.95) 100%)',
};

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

type Tone = keyof typeof TONES;

export default function TexturedSection({
  texture,
  tone = 'navy',
  fixed = false,
  className = '',
  style,
  id,
  children,
}: {
  texture: string;
  tone?: Tone;
  fixed?: boolean;         // parallax-ish fixed attachment on desktop
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  children: React.ReactNode;
}) {
  const light = tone === 'cream' || tone === 'parchment';
  return (
    <section id={id} className={`relative isolate overflow-hidden ${className}`} style={style}>
      {/* texture */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url('${cldImg(texture, 1600)}')`, backgroundAttachment: fixed ? 'fixed' : 'scroll' }}
      />
      {/* tonal veil */}
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: TONES[tone] }} />
      {/* grain */}
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none" style={{ backgroundImage: GRAIN, opacity: light ? 0.22 : 0.16, mixBlendMode: light ? 'multiply' : 'overlay' }} />
      {children}
    </section>
  );
}
