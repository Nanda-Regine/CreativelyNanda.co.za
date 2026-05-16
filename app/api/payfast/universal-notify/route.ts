export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Universal PayFast ITN Router
 *
 * Single notify_url for all Mirembe Muse apps:
 *   VarsityOS · AdminOS · (future apps)
 *
 * m_payment_id format: "{app}_{userId36}_{tier}_{timestamp}"
 *   e.g. "varsityos_abc123..._{tier}_{ts}"
 *
 * Each app registers its own Supabase URL + service role key + PayFast
 * passphrase via env vars:
 *   VARSITYOS_SUPABASE_URL / VARSITYOS_SUPABASE_SERVICE_ROLE_KEY / VARSITYOS_PAYFAST_PASSPHRASE
 *   ADMINOS_SUPABASE_URL  / ADMINOS_SUPABASE_SERVICE_ROLE_KEY  / ADMINOS_PAYFAST_PASSPHRASE
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import crypto from 'crypto'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySupabase = SupabaseClient<any, any, any>

// ─── PayFast IP Whitelist ───────────────────────────────────────────────────
const PAYFAST_IPS = new Set([
  '197.97.145.144', '197.97.145.145', '197.97.145.146', '197.97.145.147',
  '41.74.179.194',  '41.74.179.195',  '41.74.179.196',  '41.74.179.197',
  '102.216.36.3',   '102.216.36.4',   '102.216.36.5',   '102.216.36.6',
  '197.97.145.148', // additional PayFast range
])

// ─── App Registry ──────────────────────────────────────────────────────────
interface AppConfig {
  supabaseUrl: string
  serviceRoleKey: string
  passphrase: string
  name: string
}

function getAppConfig(app: string): AppConfig | null {
  switch (app) {
    case 'varsityos':
      return {
        supabaseUrl:    process.env.VARSITYOS_SUPABASE_URL || '',
        serviceRoleKey: process.env.VARSITYOS_SUPABASE_SERVICE_ROLE_KEY || '',
        passphrase:     process.env.VARSITYOS_PAYFAST_PASSPHRASE || '',
        name:           'VarsityOS',
      }
    case 'adminos':
      return {
        supabaseUrl:    process.env.ADMINOS_SUPABASE_URL || '',
        serviceRoleKey: process.env.ADMINOS_SUPABASE_SERVICE_ROLE_KEY || '',
        passphrase:     process.env.ADMINOS_PAYFAST_PASSPHRASE || '',
        name:           'AdminOS',
      }
    default:
      return null
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-real-ip') ||
    '0.0.0.0'
  )
}

function phpUrlencode(str: string): string {
  return encodeURIComponent(str)
    .replace(/!/g, '%21').replace(/'/g, '%27')
    .replace(/\(/g, '%28').replace(/\)/g, '%29')
    .replace(/\*/g, '%2A').replace(/%20/g, '+')
  // ~ intentionally left unencoded — matches PHP urlencode()
}

function verifySignature(data: Record<string, string>, passphrase: string): boolean {
  const { signature, ...rest } = data
  const paramString = Object.entries(rest)
    .filter(([, v]) => v !== '')
    .map(([k, v]) => `${k}=${phpUrlencode(v)}`)
    .join('&')
  const stringToHash = passphrase
    ? `${paramString}&passphrase=${phpUrlencode(passphrase.trim())}`
    : paramString
  return crypto.createHash('md5').update(stringToHash).digest('hex') === signature
}

// ─── VarsityOS Handler ──────────────────────────────────────────────────────
async function handleVarsityOS(
  data: Record<string, string>,
  rest: string, // m_payment_id after "varsityos_"
  supabase: AnySupabase,
) {
  // rest = "{userId36}_{tier}_{timestamp}"
  const userId = rest.slice(0, 36)
  const afterUuid = rest.slice(37)
  const tier: 'scholar' | 'premium' | 'nova_unlimited' =
    afterUuid.startsWith('nova_unlimited') ? 'nova_unlimited'
    : afterUuid.startsWith('scholar') ? 'scholar'
    : 'premium'

  // Always log
  try {
    await supabase.from('payment_logs').insert({
      payfast_payment_id: data.pf_payment_id ?? null,
      amount:             parseFloat(data.amount_gross ?? '0'),
      status:             data.payment_status ?? 'unknown',
      item_name:          data.item_name ?? null,
      raw_data:           data,
      user_id:            userId || null,
    })
  } catch { /* non-fatal */ }

  const status = data.payment_status

  if ((status === 'COMPLETE' || status === 'SUBSCR_PAYMENT') && userId) {
    const novaLimit = tier === 'nova_unlimited' ? 9999 : tier === 'premium' ? 250 : 100

    const { error } = await supabase
      .from('profiles')
      .update({ plan: tier, subscription_tier: tier, is_premium: true, nova_messages_limit: novaLimit })
      .eq('id', userId)

    if (error) {
      console.error('[Universal ITN] VarsityOS upgrade failed', { userId, tier, error: error.message })
    } else {
      console.log(`[Universal ITN] VarsityOS: upgraded ${userId} → ${tier}`)
      try {
        await supabase.from('subscriptions').upsert({
          user_id:                   userId,
          plan:                      tier,
          status:                    'active',
          payfast_subscription_token: data.token ?? null,
          payfast_payment_id:        data.pf_payment_id ?? null,
          amount:                    parseFloat(data.amount_gross ?? '0'),
          updated_at:                new Date().toISOString(),
        }, { onConflict: 'user_id' })
      } catch { /* non-fatal */ }
    }
  }

  if (status === 'CANCELLED' && userId) {
    await supabase.from('profiles')
      .update({ plan: 'free', subscription_tier: 'free', is_premium: false, nova_messages_limit: 15 })
      .eq('id', userId)
    try {
      await supabase.from('subscriptions').upsert({
        user_id:      userId,
        plan:         'free',
        status:       'cancelled',
        cancelled_at: new Date().toISOString(),
        updated_at:   new Date().toISOString(),
      }, { onConflict: 'user_id' })
    } catch { /* non-fatal */ }
    console.log(`[Universal ITN] VarsityOS: cancelled subscription for ${userId}`)
  }
}

// ─── AdminOS Handler ────────────────────────────────────────────────────────
async function handleAdminOS(
  data: Record<string, string>,
  rest: string, // m_payment_id after "adminos_"
  supabase: AnySupabase,
) {
  // rest = "{tenantId36}_{plan}_{timestamp}"
  const tenantId = rest.slice(0, 36)
  const afterTenant = rest.slice(37)
  const plan = afterTenant.split('_')[0] || 'starter' // starter | business | enterprise

  // Always log
  try {
    await supabase.from('payment_logs').insert({
      payfast_payment_id: data.pf_payment_id ?? null,
      amount:             parseFloat(data.amount_gross ?? '0'),
      status:             data.payment_status ?? 'unknown',
      item_name:          data.item_name ?? null,
      raw_data:           data,
      tenant_id:          tenantId || null,
    })
  } catch { /* non-fatal */ }

  const status = data.payment_status

  if ((status === 'COMPLETE' || status === 'SUBSCR_PAYMENT') && tenantId) {
    const { error } = await supabase
      .from('tenants')
      .update({ plan, subscription_status: 'active' })
      .eq('id', tenantId)

    if (error) {
      console.error('[Universal ITN] AdminOS upgrade failed', { tenantId, plan, error: error.message })
    } else {
      console.log(`[Universal ITN] AdminOS: upgraded tenant ${tenantId} → ${plan}`)
      try {
        await supabase.from('subscriptions').upsert({
          tenant_id:                 tenantId,
          plan,
          status:                    'active',
          payfast_subscription_token: data.token ?? null,
          payfast_payment_id:        data.pf_payment_id ?? null,
          amount:                    parseFloat(data.amount_gross ?? '0'),
          updated_at:                new Date().toISOString(),
        }, { onConflict: 'tenant_id' })
      } catch { /* non-fatal */ }
    }
  }

  if (status === 'CANCELLED' && tenantId) {
    await supabase.from('tenants')
      .update({ plan: 'free', subscription_status: 'cancelled' })
      .eq('id', tenantId)
    console.log(`[Universal ITN] AdminOS: cancelled subscription for tenant ${tenantId}`)
  }
}

// ─── Main Handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const params = new URLSearchParams(body)
    const data: Record<string, string> = {}
    params.forEach((value, key) => { data[key] = value })

    const isSandbox = process.env.PAYFAST_SANDBOX === 'true'
    const clientIp = getClientIp(request)

    // ── IP whitelist (skip in sandbox) ──────────────────────────────────────
    if (!isSandbox && !PAYFAST_IPS.has(clientIp)) {
      console.warn(`[Universal ITN] Rejected IP: ${clientIp}`)
      return new NextResponse('OK', { status: 200 }) // Always 200 to PayFast
    }

    // ── Parse app prefix ────────────────────────────────────────────────────
    const mpid = data.m_payment_id ?? ''
    const firstUnderscore = mpid.indexOf('_')
    if (firstUnderscore === -1) {
      console.warn('[Universal ITN] Invalid m_payment_id format — no app prefix:', mpid)
      return new NextResponse('OK', { status: 200 })
    }

    const app = mpid.slice(0, firstUnderscore)
    const rest = mpid.slice(firstUnderscore + 1)

    const config = getAppConfig(app)
    if (!config) {
      console.warn(`[Universal ITN] Unknown app prefix: ${app}`)
      return new NextResponse('OK', { status: 200 })
    }

    if (!config.supabaseUrl || !config.serviceRoleKey) {
      console.error(`[Universal ITN] Missing Supabase config for app: ${app}`)
      return new NextResponse('OK', { status: 200 })
    }

    // ── Signature verification (per-app passphrase) ─────────────────────────
    if (!verifySignature(data, config.passphrase)) {
      console.warn(`[Universal ITN] Signature failed for app: ${app}`)
      return new NextResponse('OK', { status: 200 })
    }

    const supabase = createClient(config.supabaseUrl, config.serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    console.log(`[Universal ITN] ${config.name} | status: ${data.payment_status} | mpid: ${mpid.slice(0, 30)}...`)

    switch (app) {
      case 'varsityos': await handleVarsityOS(data, rest, supabase); break
      case 'adminos':   await handleAdminOS(data, rest, supabase);   break
    }

    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('[Universal ITN] Unhandled error:', error)
    return new NextResponse('OK', { status: 200 }) // Always 200 to PayFast
  }
}
