/**
 * Workers Rate Limiting binding helper (https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).
 *
 * Counts are per Cloudflare location and approximate; periods are 10 s or 60 s only.
 * Fail-open by design: no binding (local dev, Vercel) or a binding error allows the request.
 * Bindings are declared in wrangler.jsonc (`ratelimits`, one namespace_id per environment, unique
 * across the whole account). Add a binding there, then a name to RULES below.
 */
import { getCloudflareContext } from '@opennextjs/cloudflare'

interface LimiterBinding {
  limit(options: { key: string }): Promise<{ success: boolean }>
}

/** rule name -> binding name in wrangler.jsonc */
const RULES = {
  // One binding; the key includes the scope, so chat and each form keep separate counters.
  chat: 'RL_10_60', // paid AI model: 10 requests per 60 s per client IP
  form: 'RL_10_60', // public write/email routes: 10 requests per 60 s per client IP and scope
} as const

export type RateRule = keyof typeof RULES

export function clientIp(req: Request): string {
  return (
    req.headers.get('cf-connecting-ip')?.trim() ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'anon'
  )
}

/** Returns true when the request may proceed. */
export async function allowRequest(req: Request, rule: RateRule, scope: string): Promise<boolean> {
  try {
    const { env } = getCloudflareContext() as unknown as { env: Record<string, LimiterBinding | undefined> }
    const binding = env?.[RULES[rule]]
    if (!binding) return true
    const { success } = await binding.limit({ key: `${scope}:${clientIp(req)}` })
    return success
  } catch (err) {
    console.warn('[rate-limit] binding error (allowing):', err instanceof Error ? err.message : err)
    return true
  }
}
