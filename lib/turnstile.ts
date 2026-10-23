/**
 * Cloudflare Turnstile server-side verification (Siteverify).
 *
 * Contract
 *   - TURNSTILE_SECRET_KEY unset  -> FAIL OPEN (skipped). Nothing breaks before the keys exist.
 *   - secret set, token missing or rejected by Siteverify -> not ok (route answers 403).
 *   - Siteverify unreachable (network or timeout) -> allow and log a warning, so a Cloudflare blip
 *     never takes the public forms down. An attacker cannot cause this path.
 *
 * The browser sends the widget token in the JSON body as `turnstileToken`
 * (see components/ui/Turnstile.tsx). Tokens are single use.
 * Docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export interface TurnstileResult {
  ok: boolean
  skipped?: boolean
  reason?: string
}

export async function verifyTurnstile(token: unknown, ip?: string | null): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return { ok: true, skipped: true }
  if (typeof token !== 'string' || token.length < 10 || token.length > 4096) {
    return { ok: false, reason: 'missing-token' }
  }
  try {
    const form = new URLSearchParams({ secret, response: token })
    if (ip) form.set('remoteip', ip)
    const res = await fetch(SITEVERIFY, { method: 'POST', body: form, signal: AbortSignal.timeout(4000) })
    if (!res.ok) {
      console.warn('[turnstile] siteverify HTTP', res.status, '(allowing)')
      return { ok: true, skipped: true, reason: 'siteverify-unavailable' }
    }
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] }
    return data.success ? { ok: true } : { ok: false, reason: (data['error-codes'] ?? []).join(',') || 'rejected' }
  } catch (err) {
    console.warn('[turnstile] siteverify unreachable (allowing):', err instanceof Error ? err.message : err)
    return { ok: true, skipped: true, reason: 'siteverify-unreachable' }
  }
}
