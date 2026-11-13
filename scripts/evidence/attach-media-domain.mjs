#!/usr/bin/env node
/**
 * One-time, owner-run: connect media.creativelynanda.co.za to the R2 bucket creativelynanda-media.
 * Cloudflare creates the DNS record for that one subdomain. Nothing else in the zone is touched.
 * Stops if any record for media.creativelynanda.co.za already exists.
 *
 *   node scripts/evidence/attach-media-domain.mjs
 *
 * Reads CLOUDFLARE_WORKERS_API_TOKEN and CLOUDFLARE_ACCOUNT_ID from .env.local in memory. Prints no secrets.
 */
import fs from 'node:fs';

const DOMAIN = 'media.creativelynanda.co.za';
const ZONE = 'creativelynanda.co.za';
const BUCKET = 'creativelynanda-media';
const A = 'https://api.cloudflare.com/client/v4';

const env = {};
for (const l of fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
  const m = l.match(/^\s*(CLOUDFLARE_ACCOUNT_ID|CLOUDFLARE_WORKERS_API_TOKEN)\s*=\s*(.*)$/);
  if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
}
if (!env.CLOUDFLARE_WORKERS_API_TOKEN || !env.CLOUDFLARE_ACCOUNT_ID) {
  console.error('STOP: CLOUDFLARE_WORKERS_API_TOKEN or CLOUDFLARE_ACCOUNT_ID missing in .env.local');
  process.exit(1);
}
const H = { Authorization: `Bearer ${env.CLOUDFLARE_WORKERS_API_TOKEN}`, 'Content-Type': 'application/json' };
const get = async (p) => (await fetch(A + p, { headers: H })).json();

const zones = await get(`/zones?name=${ZONE}`);
const zone = zones.success && zones.result[0];
if (!zone) { console.error('STOP: zone not visible to this token'); process.exit(1); }

const recs = await get(`/zones/${zone.id}/dns_records?name=${DOMAIN}`);
if (!recs.success) { console.error('STOP: cannot read DNS records', JSON.stringify(recs.errors)); process.exit(1); }
if (recs.result.length) { console.error(`STOP: ${DOMAIN} already has ${recs.result.length} record(s); not touching it`); process.exit(1); }

const r = await fetch(`${A}/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/r2/buckets/${BUCKET}/domains/custom`, {
  method: 'POST', headers: H,
  body: JSON.stringify({ domain: DOMAIN, zoneId: zone.id, enabled: true, minTLS: '1.2' }),
});
const j = await r.json();
if (!j.success) { console.error(`attach failed, HTTP ${r.status}`, JSON.stringify(j.errors)); process.exit(1); }
console.log(`connected ${DOMAIN} -> R2 ${BUCKET}. It can take a few minutes to go live.`);
