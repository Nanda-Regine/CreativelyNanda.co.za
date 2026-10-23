'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Cloudflare Turnstile widget + hook.
 *
 *   const [tsToken, tsWidget, tsReset] = useTurnstile()
 *   ... body: JSON.stringify({ ...fields, turnstileToken: tsToken })
 *   ... {tsWidget}   // inside the form
 *   ... tsReset()    // after each submit (tokens are single use)
 *
 * Renders nothing when NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset, and the server fails open when
 * TURNSTILE_SECRET_KEY is unset (lib/turnstile.ts), so forms keep working before keys exist.
 * Appearance is "interaction-only": invisible unless Cloudflare needs the visitor to do something.
 */
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
const SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string
  reset: (id?: string) => void
  remove: (id?: string) => void
}
type TsWindow = Window & { turnstile?: TurnstileApi }

let scriptPromise: Promise<void> | null = null
function loadScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if ((window as TsWindow).turnstile) return Promise.resolve()
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = SRC
      s.async = true
      s.defer = true
      s.onload = () => resolve()
      s.onerror = () => {
        scriptPromise = null
        reject(new Error('turnstile script failed'))
      }
      document.head.appendChild(s)
    })
  }
  return scriptPromise
}

export function useTurnstile(): [string | undefined, ReactNode, () => void] {
  const [token, setToken] = useState<string | undefined>(undefined)
  const [host, setHost] = useState<HTMLDivElement | null>(null) // callback ref: widget may mount later (e.g. a revealed form)
  const idRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!SITE_KEY || !host) return
    let cancelled = false
    loadScript()
      .then(() => {
        const api = (window as TsWindow).turnstile
        if (cancelled || !api || idRef.current) return
        idRef.current = api.render(host, {
          sitekey: SITE_KEY,
          appearance: 'interaction-only',
          theme: 'dark',
          callback: (t: string) => setToken(t),
          'expired-callback': () => setToken(undefined),
          'error-callback': () => setToken(undefined),
        })
      })
      .catch(() => {
        /* server fails open if siteverify is unreachable; a blocked script just means no token */
      })
    return () => {
      cancelled = true
      const api = (window as TsWindow).turnstile
      if (api && idRef.current) api.remove(idRef.current)
      idRef.current = undefined
    }
  }, [host])

  const reset = useCallback(() => {
    setToken(undefined)
    const api = (window as TsWindow).turnstile
    if (api && idRef.current) api.reset(idRef.current)
  }, [])

  const widget: ReactNode = SITE_KEY ? <div ref={setHost} className="cf-turnstile-host" aria-label="Verification" /> : null
  return [token, widget, reset]
}
