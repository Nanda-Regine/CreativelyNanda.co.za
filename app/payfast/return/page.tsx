'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ExternalLink, Loader2 } from 'lucide-react'

// ─── App Registry ──────────────────────────────────────────────────────────
const APP_CONFIGS: Record<string, { name: string; logo: string; dashboardUrl: string; color: string }> = {
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
}

const DEFAULT_CONFIG = {
  name:         'your app',
  logo:         '✅',
  dashboardUrl: 'https://creativelynanda.co.za',
  color:        '#10b981',
}

const REDIRECT_DELAY = 4 // seconds

export default function PayFastReturnPage() {
  const searchParams = useSearchParams()
  const appKey = searchParams.get('app') ?? ''
  const config = APP_CONFIGS[appKey] ?? DEFAULT_CONFIG

  const [countdown, setCountdown] = useState(REDIRECT_DELAY)
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
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
  }, [config.dashboardUrl])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)' }}
    >
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 space-y-6 shadow-2xl">
        {/* Icon */}
        <div className="flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
            style={{ background: `${config.color}22`, border: `2px solid ${config.color}44` }}
          >
            {config.logo}
          </div>
        </div>

        {/* Success indicator */}
        <div className="flex items-center justify-center gap-2" style={{ color: config.color }}>
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wide uppercase">Payment Successful</span>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">
            Welcome to {config.name}! 🎉
          </h1>
          <p className="text-white/60 text-sm leading-relaxed">
            Your subscription is now active. We&apos;re taking you back to your dashboard.
          </p>
        </div>

        {/* Countdown */}
        <div className="space-y-3">
          {redirecting ? (
            <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Redirecting…</span>
            </div>
          ) : (
            <p className="text-white/40 text-sm">
              Redirecting in{' '}
              <span className="font-bold" style={{ color: config.color }}>
                {countdown}s
              </span>
            </p>
          )}

          {/* Progress bar */}
          <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all ease-linear"
              style={{
                background: config.color,
                width: `${((REDIRECT_DELAY - countdown) / REDIRECT_DELAY) * 100}%`,
                transitionDuration: '1000ms',
              }}
            />
          </div>
        </div>

        {/* Manual link */}
        <a
          href={config.dashboardUrl}
          className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
          style={{ color: config.color }}
        >
          Go to {config.name} dashboard
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Footer */}
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
