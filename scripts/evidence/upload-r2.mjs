#!/usr/bin/env node
/**
 * Evidence Wing: create the R2 bucket and upload web derivatives (images only).
 *
 *   node scripts/evidence/upload-r2.mjs --check                 # verify the key, list buckets, change nothing
 *   node scripts/evidence/upload-r2.mjs --apps adminos,jarvis --dry
 *   node scripts/evidence/upload-r2.mjs --apps adminos,jarvis   # create bucket if missing, upload
 *
 * Secrets: reads CLOUDFLARE_R2_TOKEN (preferred, R2-only) or CLOUDFLARE_API_TOKEN, and CLOUDFLARE_ACCOUNT_ID (or CF_ equivalents) from the shell or .env.local
 * INSIDE this process. Values are never printed, never written anywhere, never sent anywhere but api.cloudflare.com.
 * Only *.webp and *.avif are uploaded. The lossless *.master.png files never leave the work folder.
 * Nothing is deleted. Uploads are idempotent (same key, same bytes).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const WORK = process.env.EVIDENCE_WORK || 'C:/Users/nanda/evidence-work';
const BUCKET = process.env.EVIDENCE_R2_BUCKET || 'creativelynanda-media';
const API = 'https://api.cloudflare.com/client/v4';
const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : undefined; };

function die(m) { console.error(`\nSTOP: ${m}`); process.exit(1); }

// load only Cloudflare variables from .env.local, in memory
function loadEnv() {
  const f = path.join(ROOT, '.env.local');
  if (!fs.existsSync(f)) return;
  for (const line of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*(?:export\s+)?((?:CLOUDFLARE|CF)_[A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}
loadEnv();

const pick = (...names) => names.map((n) => [n, process.env[n]]).find(([, v]) => v);
// a narrow R2-only token wins over the account-wide one
const tok = pick('CLOUDFLARE_R2_TOKEN', 'CLOUDFLARE_API_TOKEN', 'CF_API_TOKEN', 'CLOUDFLARE_TOKEN');
const acc = pick('CLOUDFLARE_ACCOUNT_ID', 'CF_ACCOUNT_ID', 'CLOUDFLARE_ACCOUNT');
console.log(`token variable: ${tok ? tok[0] + ' (found)' : 'NOT FOUND'}`);
console.log(`account id variable: ${acc ? acc[0] + ' (found)' : 'NOT FOUND'}`);
if (!tok) die('no Cloudflare API token variable found. Expected CLOUDFLARE_API_TOKEN.');
const TOKEN = tok[1].trim();
{
  // shape only, never the value
  const kind = /^[0-9a-f]{37}$/.test(TOKEN) ? "looks like a Global API Key (37 hex), which is not a bearer token"
    : /^cfut_|^cfat_|^cfk_/.test(TOKEN) ? "new-style prefixed token"
    : /^[A-Za-z0-9_-]{40}$/.test(TOKEN) ? "classic 40-character token"
    : "unrecognised shape";
  console.log(`token shape: length ${TOKEN.length}, ${kind}${/s|["']/.test(TOKEN) ? ", CONTAINS whitespace or quotes" : ""}`);
  console.log(`account id shape: length ${(acc?.[1] ?? "").trim().length} (a real id is 32 hex)`);
}
let ACCOUNT = acc?.[1]?.trim();

async function cf(method, url, body, headers = {}) {
  const res = await fetch(API + url, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, ...headers },
    body,
  });
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* not json */ }
  return { ok: res.ok, status: res.status, json, text };
}

if (!ACCOUNT) {
  const r = await cf('GET', '/accounts');
  const list = r.json?.result ?? [];
  if (list.length === 1) { ACCOUNT = list[0].id; console.log('account id: taken from the token (only one account visible)'); }
  else die(`no account id variable, and the token shows ${list.length} accounts (HTTP ${r.status}). Add CLOUDFLARE_ACCOUNT_ID to .env.local.`);
}

const vu = await cf('GET', '/user/tokens/verify');
const va = ACCOUNT ? await cf('GET', `/accounts/${ACCOUNT.trim()}/tokens/verify`) : null;
console.log(`account-owned token verify: HTTP ${va?.status ?? "n/a"}, status=${va?.json?.result?.status ?? "n/a"}`);
const v = vu;
console.log(`token verify: HTTP ${v.status}, status=${v.json?.result?.status ?? 'n/a'}`);

if (flag("check")) {
  const probes = [
    ["R2 buckets", `/accounts/${ACCOUNT}/r2/buckets`],
    ["Workers scripts", `/accounts/${ACCOUNT}/workers/scripts`],
    ["KV namespaces", `/accounts/${ACCOUNT}/storage/kv/namespaces`],
    ["Zones in account", `/zones?account.id=${ACCOUNT}`],
    ["Cloudflare Stream", `/accounts/${ACCOUNT}/stream`],
  ];
  for (const [label, u] of probes) {
    const r = await cf("GET", u);
    const e = r.json?.errors?.[0];
    console.log(`  probe ${label}: HTTP ${r.status}${e ? ` code ${e.code} "${String(e.message).slice(0, 90)}"` : ""}${r.ok ? " (allowed)" : ""}`);
  }
  const wsChars = (tok[1].match(/s/g) || []).length, qChars = (TOKEN.match(/["']/g) || []).length;
  console.log(`  token raw: ${wsChars} whitespace char(s) before trim, ${qChars} quote char(s) after trim`);
}
const buckets = await cf('GET', `/accounts/${ACCOUNT}/r2/buckets`);
console.log(`R2 access: HTTP ${buckets.status}${buckets.ok ? '' : ' ' + (buckets.json?.errors?.[0]?.message ?? '')}`);
if (!buckets.ok) die('this token cannot list R2 buckets. It needs Workers R2 Storage: Edit on the account.');
const names = (buckets.json?.result?.buckets ?? []).map((b) => b.name);
console.log(`existing buckets: ${names.length ? names.join(', ') : '(none)'}`);
if (flag('check')) { console.log('\ncheck only: nothing changed.'); process.exit(0); }

const apps = (opt('apps') ?? '').split(',').filter(Boolean);
if (!apps.length) die('pass --apps adminos,jarvis');

if (!names.includes(BUCKET)) {
  if (flag('dry')) console.log(`DRY: would create bucket ${BUCKET}`);
  else {
    const c = await cf('POST', `/accounts/${ACCOUNT}/r2/buckets`, JSON.stringify({ name: BUCKET }), { 'Content-Type': 'application/json' });
    if (!c.ok) die(`bucket create failed: HTTP ${c.status} ${c.json?.errors?.[0]?.message ?? ''}`);
    console.log(`created bucket ${BUCKET}`);
  }
} else console.log(`bucket ${BUCKET} already exists`);

const TYPES = { '.webp': 'image/webp', '.avif': 'image/avif' };
let up = 0, skipped = 0, failed = 0, bytes = 0;
for (const app of apps) {
  const dir = path.join(WORK, 'out', app);
  if (!fs.existsSync(dir)) die(`no derivatives for ${app} at ${dir}`);
  const files = fs.readdirSync(dir).filter((f) => TYPES[path.extname(f)]);
  console.log(`${app}: ${files.length} files`);
  for (const f of files) {
    const key = `${app}/${f}`;
    const url = `/accounts/${ACCOUNT}/r2/buckets/${BUCKET}/objects/${encodeURIComponent(key).replace(/%2F/g, '/')}`;
    if (flag('dry')) { up++; continue; }
    const buf = fs.readFileSync(path.join(dir, f));
    const r = await cf('PUT', url, buf, { 'Content-Type': TYPES[path.extname(f)], 'Cache-Control': 'public, max-age=31536000, immutable' });
    if (r.ok) { up++; bytes += buf.length; } else { failed++; console.log(`  FAILED ${key}: HTTP ${r.status} ${r.json?.errors?.[0]?.message ?? ''}`); }
  }
}
console.log(`\n${flag('dry') ? 'DRY RUN: ' : ''}uploaded ${up}, skipped ${skipped}, failed ${failed}, ${(bytes / 1e6).toFixed(1)} MB`);
console.log('Next: the bucket is private until a public domain is attached (step 4, needs your OK on DNS).');
