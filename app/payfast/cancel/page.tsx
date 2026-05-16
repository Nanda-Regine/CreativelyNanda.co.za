'use client'

/**
 * Universal PayFast Cancel Page
 *
 * Two modes:
 * 1. With ?app=xxx  — user came via a specific app's payment form.
 *    Auto-redirects to that app's upgrade page after a countdown.
 *
 * 2. Without ?app=  — user came via the PayFast dashboard fallback URL.
 *    Shows a "payment cancelled" message + browser-back button.
 *    Works for ANY app with no code changes.
 *
 * PayFast dashboard: https://creativelynanda.co.za/payfast/cancel
 * Per-payment code:  cancel_url = https://creativelynanda.co.za/payfast/cancel?app=varsityos
 */

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { XCircle, ArrowLeft, Loader2 } from 'lucide-react'

// ─── App Registry — mirror return/page.tsx ────────────────────────────────
const APP_CONFIGS: Record<string, {
  name:       string
  logo:       string
  upgradeUrl: string
}> = {
  varsityos:      { name: 'VarsityOS',       logo: '🎓', upgradeUrl: 'https://varsityos.co.za/upgrade' },
  adminos:        { name: 'AdminOS',          logo: '⚡', upgradeUrl: 'https://adminos.co.za/upgrade' },
  stokvelos:      { name: 'Stokvelos',        logo: '💰', upgradeUrl: 'https://stokvelos.co.za/upgrade' },
  k53drillmaster: { name: 'K53 Drill Master', logo: '🚗', upgradeUrl: 'https://k53drillmaster.co.za/upgrade' },
  watchsankofa:   { name: 'WatchSankofa',    logo: '🎬', upgradeUrl: 'https://watchsankofa.co.za/upgrade' },
  sankofasessions:{ name: 'Sankofa Sessions', logo: '🎵', upgradeUrl: 'https://sankofasessions.co.za/upgrade' },
}

const REDIRECT_DELAY = 6 // seconds — give more time to reconsider

export default function PayFastCancelPage() {
  const searchParams = useSearchParams()
  const appKey = searchParams.get('app') ?? ''
  const config = APP_CONFIGS[appKey] ?? null

  const [countdown, setCountdown] = useState(REDIRECT_DELAY)
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (!config) return
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setRedirecting(true)
          window.location.href = config.upgradeUrl
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [config])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)' }}
    >
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 space-y-6 shadow-2xl">

        {/* Icon */}
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl bg-white/5 border border-white/10">
            {config?.logo ?? '💡'}
          </div>
        </div>

        {/* Status badge */}
        <div className="flex items-center justify-center gap-2 text-white/40">
          <XCircle className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wide uppercase">Payment Cancelled</span>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">No worries — you can try again</h1>
          <p className="text-white/60 text-sm leading-relaxed">
            Your payment was cancelled and nothing was charged.
            {config
              ? ` Taking you back to ${config.name} so you can upgrade when you're ready.`
              : ' Head back to the app whenever you\'re ready to upgrade.'}
          </p>
        </div>

        {/* Countdown — only when app is known */}
        {config && (
          <div className="space-y-3">
            {redirecting ? (
              <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Returning to {config.name}…</span>
              </div>
            ) : (
              <p className="text-white/40 text-sm">
                Returning in <span className="font-bold text-white/60">{countdown}s</span>
              </p>
            )}
            <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-white/20 transition-all ease-linear"
                style={{
                  width: `${((REDIRECT_DELAY - countdown) / REDIRECT_DELAY) * 100}%`,
                  transitionDuration: '1000ms',
                }}
              />
            </div>
            <a
              href={config.upgradeUrl}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to {config.name} upgrade page
            </a>
          </div>
        )}

        {/* Generic fallback — browser back button */}
        {!config && (
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/80 border border-white/20 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to the app
          </button>
        )}
      </div>

      <div className="mt-6 space-y-1">
        <p className="text-white/20 text-xs">Nothing was charged to your card.</p>
        <p className="text-white/20 text-xs">
          Payments by{' '}
          <span className="text-white/40">PayFast</span>
          {' · '}
          <a href="https://creativelynanda.co.za" className="hover:text-white/40 transition-colors">
            Mirembe Muse (Pty) Ltd
          </a>
        </p>
      </div>
    </div>
  )
}
