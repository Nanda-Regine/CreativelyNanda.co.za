export default function Loading() {
  return (
    <div className="min-h-screen bg-navy-deep flex items-center justify-center grain-overlay">
      <div className="text-center">
        {/* Logo pulse animation */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold to-gold/50 animate-pulse-soft" />
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-gold/20 animate-ping" />
        </div>

        {/* Brand name */}
        <h1 className="font-display text-3xl text-beige mb-2">Nanda</h1>
        <p className="text-beige/60 text-sm tracking-widest uppercase">Loading</p>

        {/* Loading bar */}
        <div className="mt-8 w-48 mx-auto h-0.5 bg-beige/10 rounded-full overflow-hidden">
          <div className="h-full bg-gold skeleton" style={{ width: '100%' }} />
        </div>
      </div>
    </div>
  );
}
