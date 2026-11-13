import Script from 'next/script'

/**
 * Cloudflare Web Analytics beacon (cookieless, no consent banner needed, POPIA friendly).
 * Replaces Vercel Analytics. Renders nothing until NEXT_PUBLIC_CF_BEACON_TOKEN is set at build time.
 * CSP: script-src static.cloudflareinsights.com, connect-src cloudflareinsights.com (next.config.ts).
 */
const TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN

export function CloudflareAnalytics() {
  if (!TOKEN) return null
  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token: TOKEN })}
    />
  )
}
