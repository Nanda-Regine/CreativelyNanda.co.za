export const metadata = {
  title: 'Back soon — CreativelyNanda',
  robots: { index: false, follow: false },
};

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function Maintenance() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2147483647,
        background: '#0A1128',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none', backgroundImage: GRAIN }} />
      <div style={{ position: 'relative', maxWidth: 560 }}>
        <p
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: 11,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#C9943A',
            marginBottom: 24,
          }}
        >
          Creatively Nanda
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(40px, 9vw, 72px)',
            lineHeight: 1.05,
            color: '#F5F0E8',
            margin: 0,
            fontWeight: 700,
            fontStyle: 'italic',
          }}
        >
          Taking a<br />short pause.
        </h1>
        <div style={{ width: 36, height: 2, background: '#C1292E', margin: '28px auto' }} />
        <p
          style={{
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            fontSize: 16,
            lineHeight: 1.7,
            color: 'rgba(245,240,232,0.6)',
            margin: 0,
          }}
        >
          This site is being reworked and will be back soon.
          Thank you for your patience.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            fontSize: 12,
            color: 'rgba(245,240,232,0.35)',
            marginTop: 28,
          }}
        >
          — Nandawula Regine · East London, South Africa
        </p>
      </div>
    </div>
  );
}
