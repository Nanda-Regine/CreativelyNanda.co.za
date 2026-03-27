import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Nandawula Regine Kabali-Kagwa — Creative Technologist & AI Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0A1128 0%, #1a2744 50%, #0A1128 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative circle */}
        <div
          style={{
            position: 'absolute',
            right: '-80px',
            top: '-80px',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'rgba(194, 30, 86, 0.12)',
            border: '1px solid rgba(194, 30, 86, 0.2)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '40px',
            bottom: '-120px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'rgba(232, 220, 196, 0.05)',
            border: '1px solid rgba(232, 220, 196, 0.1)',
            display: 'flex',
          }}
        />

        {/* Top label */}
        <div
          style={{
            color: '#c21e56',
            fontSize: '14px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '24px',
            display: 'flex',
          }}
        >
          Creatively Nanda · Mirembe Muse
        </div>

        {/* Name */}
        <div
          style={{
            color: '#E8DCC4',
            fontSize: '72px',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '16px',
            display: 'flex',
          }}
        >
          Nandawula Regine
        </div>
        <div
          style={{
            color: '#c21e56',
            fontSize: '72px',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '32px',
            display: 'flex',
          }}
        >
          Kabali-Kagwa
        </div>

        {/* Tagline */}
        <div
          style={{
            color: '#E8DCC4',
            fontSize: '26px',
            lineHeight: 1.5,
            opacity: 0.75,
            maxWidth: '680px',
            marginBottom: '48px',
            display: 'flex',
          }}
        >
          Creative Technologist & AI Engineer · Published Poet · Founder of Mirembe Muse
        </div>

        {/* Divider */}
        <div
          style={{
            width: '80px',
            height: '3px',
            background: '#c21e56',
            borderRadius: '2px',
            marginBottom: '32px',
            display: 'flex',
          }}
        />

        {/* URL */}
        <div
          style={{
            color: '#E8DCC4',
            fontSize: '18px',
            opacity: 0.5,
            letterSpacing: '0.05em',
            display: 'flex',
          }}
        >
          creativelynanda.co.za
        </div>

        {/* Location tag */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '80px',
            color: '#E8DCC4',
            fontSize: '14px',
            opacity: 0.4,
            letterSpacing: '0.1em',
            display: 'flex',
          }}
        >
          East London, South Africa
        </div>
      </div>
    ),
    { ...size }
  );
}
