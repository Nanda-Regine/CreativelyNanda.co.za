const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    {
      urlPattern: /\.(?:js|css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
        },
      },
    },
    {
      urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 5, // 5 minutes
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'creativelynanda.co.za', 'bemgnttmaqpmsaosdisc.supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Only remove console.log in production — keep console.error/warn for Vercel logs
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },
  // Compression
  compress: true,
  // Output optimization
  poweredByHeader: false,
  // Business/portfolio routes now live on mirembemuse.co.za (the studio site).
  // creativelynanda.co.za is the personal/creative identity only.
  // NOTE: /products (live marketplace) and /upgrades (PayFast landing) intentionally stay.
  redirects: async () => [
    { source: '/ai-engineer', destination: 'https://mirembemuse.co.za/services/ai-engineering', permanent: true },
    { source: '/consulting', destination: 'https://mirembemuse.co.za/services', permanent: true },
    { source: '/work', destination: 'https://mirembemuse.co.za/case-studies', permanent: true },
    { source: '/work/:path*', destination: 'https://mirembemuse.co.za/case-studies', permanent: true },
    { source: '/projects', destination: 'https://mirembemuse.co.za/case-studies', permanent: true },
    { source: '/projects/:slug', destination: 'https://mirembemuse.co.za/case-studies', permanent: true },
    { source: '/press', destination: 'https://mirembemuse.co.za/press', permanent: true },
    { source: '/mirembe', destination: 'https://mirembemuse.co.za', permanent: true },
    { source: '/mirembe/:path*', destination: 'https://mirembemuse.co.za', permanent: true },
    // House of Roses vocabulary: "The Library" is the collection. Aliases only —
    // the canonical creative URLs stay /poetry/collection to preserve SEO.
    { source: '/library', destination: '/poetry/collection', permanent: false },
    { source: '/library/:slug', destination: '/poetry/collection/:slug', permanent: false },
  ],
  // Cloudflare-compatible security headers
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ],
};

module.exports = withPWA(nextConfig);
