export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Universal PayFast ITN Router
 *
 * Single notify_url for all Mirembe Muse apps:
 *   VarsityOS · AdminOS · K53 Drill Master · (future apps)
 *
 * m_payment_id formats:
 *   "varsityos_{userId36}_{tier}_{timestamp}"        — user-scoped subscription
 *   "adminos_{tenantId36}_{plan}_{timestamp}"        — tenant-scoped subscription
 *   "k53drillmaster_{plan}_{timestamp}"              — email-scoped (no user at checkout time)
 *
 * Each app registers its own Supabase URL + service role key + PayFast
 * passphrase via env vars:
 *   VARSITYOS_SUPABASE_URL / VARSITYOS_SUPABASE_SERVICE_ROLE_KEY / VARSITYOS_PAYFAST_PASSPHRASE
 *   ADMINOS_SUPABASE_URL  / ADMINOS_SUPABASE_SERVICE_ROLE_KEY  / ADMINOS_PAYFAST_PASSPHRASE
 *   K53_SUPABASE_URL      / K53_SUPABASE_SERVICE_ROLE_KEY      / K53_PAYFAST_PASSPHRASE
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
    case 'stokvelos':
      return {
        supabaseUrl:    process.env.STOKVELOS_SUPABASE_URL || '',
        serviceRoleKey: process.env.STOKVELOS_SUPABASE_SERVICE_ROLE_KEY || '',
        passphrase:     process.env.STOKVELOS_PAYFAST_PASSPHRASE || '',
        name:           'Stokvelos',
      }
    case 'k53drillmaster':
      return {
        supabaseUrl:    process.env.K53_SUPABASE_URL || '',
        serviceRoleKey: process.env.K53_SUPABASE_SERVICE_ROLE_KEY || '',
        passphrase:     process.env.K53_PAYFAST_PASSPHRASE || '',
        name:           'K53 Drill Master',
      }
    case 'watchsankofa':
      return {
        supabaseUrl:    process.env.WATCHSANKOFA_SUPABASE_URL || '',
        serviceRoleKey: process.env.WATCHSANKOFA_SUPABASE_SERVICE_ROLE_KEY || '',
        passphrase:     process.env.WATCHSANKOFA_PAYFAST_PASSPHRASE || '',
        name:           'WatchSankofa',
      }
    case 'sankofasessions':
      return {
        supabaseUrl:    process.env.SANKOFASESSIONS_SUPABASE_URL || '',
        serviceRoleKey: process.env.SANKOFASESSIONS_SUPABASE_SERVICE_ROLE_KEY || '',
        passphrase:     process.env.SANKOFASESSIONS_PAYFAST_PASSPHRASE || '',
        name:           'Sankofa Sessions',
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

// ─── K53 Drill Master Handler ───────────────────────────────────────────────
async function handleK53(
  data: Record<string, string>,
  rest: string, // m_payment_id after "k53drillmaster_"
  supabase: AnySupabase,
) {
  // rest = "{plan}_{timestamp}"  e.g. "monthly_1716300000000"
  const plan = rest.split('_')[0] || 'monthly'
  const email = (data.email_address || '').trim().toLowerCase()

  if (!email) {
    console.warn('[Universal ITN] K53: no email_address in payload')
    return
  }

  const PLAN_DAYS: Record<string, number> = {
    monthly:      30,
    bundle:       90,
    lifetime:     365 * 20,
    lifetime_pdp: 365 * 20,
  }
  const days = PLAN_DAYS[plan] ?? 30
  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()

  // Always log
  try {
    await supabase.from('payment_logs').insert({
      payfast_payment_id: data.pf_payment_id ?? null,
      amount:             parseFloat(data.amount_gross ?? '0'),
      status:             data.payment_status ?? 'unknown',
      item_name:          data.item_name ?? null,
      raw_data:           data,
    })
  } catch { /* non-fatal */ }

  const status = data.payment_status

  if (status === 'COMPLETE' || status === 'SUBSCR_PAYMENT') {
    try {
      // Creates account + sends magic link if new; safe to call for existing users (they get a login link)
      const { data: inviteData, error: inviteErr } = await supabase.auth.admin.inviteUserByEmail(email, {
        redirectTo: 'https://k53drillmaster.co.za',
      })

      if (inviteErr) {
        // "User already registered" is not a failure — subscription renewal or returning customer
        console.log(`[Universal ITN] K53: invite note for ${email}: ${inviteErr.message}`)
      }

      const userId = inviteData?.user?.id
      if (userId) {
        const { error: dbErr } = await supabase.from('subscribers').upsert({
          user_id:            userId,
          email,
          plan,
          expires_at:         expiresAt,
          payfast_payment_id: data.pf_payment_id ?? null,
          payfast_token:      data.token ?? null,
          updated_at:         new Date().toISOString(),
        }, { onConflict: 'user_id' })

        if (dbErr) console.error('[Universal ITN] K53: subscriber upsert failed', dbErr.message)
        else console.log(`[Universal ITN] K53: activated ${email} | plan=${plan} | expires=${expiresAt}`)
      }
    } catch (err) {
      console.error('[Universal ITN] K53: activation error', err instanceof Error ? err.message : err)
    }
  }

  if (status === 'CANCELLED') {
    // Downgrade by email — subscribers table stores email for exactly this lookup
    try {
      const { error } = await supabase
        .from('subscribers')
        .update({
          plan:         'free',
          status:       'cancelled',
          cancelled_at: new Date().toISOString(),
          updated_at:   new Date().toISOString(),
        })
        .eq('email', email)

      if (error) console.error('[Universal ITN] K53: cancellation update failed', error.message)
      else console.log(`[Universal ITN] K53: cancelled subscription for ${email}`)
    } catch (err) {
      console.error('[Universal ITN] K53: cancellation error', err instanceof Error ? err.message : err)
    }
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
      case 'varsityos':      await handleVarsityOS(data, rest, supabase); break
      case 'adminos':        await handleAdminOS(data, rest, supabase);   break
      case 'k53drillmaster': await handleK53(data, rest, supabase);       break
    }

    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('[Universal ITN] Unhandled error:', error)
    return new NextResponse('OK', { status: 200 }) // Always 200 to PayFast
  }
}
