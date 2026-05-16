'use client'

/**
 * Universal PayFast Return Page
 *
 * Two modes:
 * 1. With ?app=xxx  — user came via a specific app's payment form.
 *    Auto-redirects to that app's dashboard after a countdown.
 *
 * 2. Without ?app=  — user came via the PayFast dashboard fallback URL
 *    (dashboard can only hold one generic URL for all apps).
 *    Shows a "payment complete" message + "go back" button that uses
 *    browser history — works for ANY app with no code changes.
 *
 * PayFast dashboard: https://creativelynanda.co.za/payfast/return
 * Per-payment code:  return_url = https://creativelynanda.co.za/payfast/return?app=varsityos
 *                    (each app passes its own ?app= in the initiate route)
 */

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowLeft, ExternalLink, Loader2 } from 'lucide-react'

// ─── App Registry — add new apps here as they onboard PayFast ──────────────
const APP_CONFIGS: Record<string, {
  name:         string
  logo:         string
  dashboardUrl: string
  color:        string
}> = {
  varsityos: {
    name:         'VarsityOS',
    logo:         '🎓',
    dashboardUrl: 'https://varsityos.co.za/dashboard',
    color:        '#0d9488',
  },
  adminos: {
    name:         'AdminOS',
    logo:         '⚡',
    dashboardUrl: 'https://adminos.co.za/dashboard',
    color:        '#6366f1',
  },
  stokvelos: {
    name:         'Stokvelos',
    logo:         '💰',
    dashboardUrl: 'https://stokvelos.co.za/dashboard',
    color:        '#f59e0b',
  },
  k53drillmaster: {
    name:         'K53 Drill Master',
    logo:         '🚗',
    dashboardUrl: 'https://k53drillmaster.co.za/dashboard',
    color:        '#ef4444',
  },
  watchsankofa: {
    name:         'WatchSankofa',
    logo:         '🎬',
    dashboardUrl: 'https://watchsankofa.co.za/dashboard',
    color:        '#8b5cf6',
  },
  sankofasessions: {
    name:         'Sankofa Sessions',
    logo:         '🎵',
    dashboardUrl: 'https://sankofasessions.co.za/dashboard',
    color:        '#ec4899',
  },
}

const REDIRECT_DELAY = 4 // seconds

export default function PayFastReturnPage() {
  const searchParams = useSearchParams()
  const appKey = searchParams.get('app') ?? ''
  const config = APP_CONFIGS[appKey] ?? null // null = no known app (dashboard fallback)

  const [countdown, setCountdown] = useState(REDIRECT_DELAY)
  const [redirecting, setRedirecting] = useState(false)

  // Only start countdown when we have a known app to redirect to
  useEffect(() => {
    if (!config) return
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setRedirecting(true)
          window.location.href = config.dashboardUrl
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [config])

  const accentColor = config?.color ?? '#10b981'

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)' }}
    >
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 space-y-6 shadow-2xl">

        {/* Icon */}
        <div className="flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
            style={{ background: `${accentColor}22`, border: `2px solid ${accentColor}44` }}
          >
            {config?.logo ?? '✅'}
          </div>
        </div>

        {/* Status badge */}
        <div className="flex items-center justify-center gap-2" style={{ color: accentColor }}>
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wide uppercase">Payment Successful</span>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">
            {config ? `Welcome to ${config.name}! 🎉` : 'Payment complete! 🎉'}
          </h1>
          <p className="text-white/60 text-sm leading-relaxed">
            {config
              ? 'Your subscription is now active. Taking you back to your dashboard…'
              : 'Your subscription is now active. Head back to the app to get started.'}
          </p>
        </div>

        {/* Redirect countdown — only when app is known */}
        {config && (
          <div className="space-y-3">
            {redirecting ? (
              <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Redirecting…</span>
              </div>
            ) : (
              <p className="text-white/40 text-sm">
                Redirecting in{' '}
                <span className="font-bold" style={{ color: accentColor }}>{countdown}s</span>
              </p>
            )}
            <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all ease-linear"
                style={{
                  background: accentColor,
                  width: `${((REDIRECT_DELAY - countdown) / REDIRECT_DELAY) * 100}%`,
                  transitionDuration: '1000ms',
                }}
              />
            </div>
            <a
              href={config.dashboardUrl}
              className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: accentColor }}
            >
              Go to {config.name} dashboard
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Generic fallback — browser back button */}
        {!config && (
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-80"
            style={{ background: accentColor }}
          >
            <ArrowLeft className="w-4 h-4" />
            Return to the app
          </button>
        )}
      </div>

      <p className="mt-8 text-white/20 text-xs">
        Payments securely processed by{' '}
        <span className="text-white/40">PayFast</span>
        {' · '}
        <a href="https://creativelynanda.co.za" className="hover:text-white/50 transition-colors">
          Mirembe Muse (Pty) Ltd
        </a>
      </p>
    </div>
  )
}
