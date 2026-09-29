/**
 * 📰 The Press — put an issue's pieces into Supabase `blog_posts`.
 *
 *   node scripts/publish-press.mjs content/press/issue-004            # dry run: parse, check, print
 *   node scripts/publish-press.mjs content/press/issue-004 --draft    # upsert as UNPUBLISHED (proofread via ?preview=1 on a dev server)
 *   node scripts/publish-press.mjs content/press/issue-004 --publish  # upsert and publish, dated now (UTC)
 *
 * Pieces are written as markdown in the repo, so the text is version-
 * controlled (and its git history is a real revision record). Supabase stays
 * the one source the site reads.
 *
 * Refuses to write if any piece contains an em dash (house style, 2026-09-28),
 * has no slug/title/category, or uses a category the press does not publish.
 * `--publish` keeps an existing `published_at`, so re-running it to fix a typo
 * does not re-date a piece into a later issue.
 */

import fs from 'node:fs';
import path from 'node:path';

const [dir, flag] = process.argv.slice(2);
if (!dir) {
  console.error('usage: node scripts/publish-press.mjs <dir> [--draft|--publish]');
  process.exit(1);
}
const mode = flag === '--publish' ? 'publish' : flag === '--draft' ? 'draft' : 'dry';

for (const l of fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
  const m = l.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

const CATEGORIES = new Set(['writing', 'dev', 'letters']);

function parse(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: no frontmatter`);
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  const content = m[2].trim() + '\n';
  const words = (content.match(/\S+/g) ?? []).length;
  return {
    file: path.basename(file),
    slug: meta.slug,
    title: meta.title,
    category: meta.category,
    excerpt: meta.excerpt ?? null,
    tags: meta.tags ? meta.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    content,
    words,
    reading_time: Math.max(1, Math.round(words / 230)),
  };
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
const pieces = files.map((f) => parse(path.join(dir, f)));

const problems = [];
for (const p of pieces) {
  if (!p.slug || !p.title || !p.category) problems.push(`${p.file}: missing slug/title/category`);
  if (p.category && !CATEGORIES.has(p.category)) problems.push(`${p.file}: category "${p.category}" is not a press imprint`);
  const text = [p.title, p.excerpt, p.content].join('\n');
  const dashes = text.split('\n').filter((l) => l.includes('—'));
  if (dashes.length) problems.push(`${p.file}: ${dashes.length} line(s) with an em dash, e.g. "${dashes[0].slice(0, 80)}"`);
}

for (const p of pieces) console.log(`${p.category.padEnd(8)} ${String(p.words).padStart(5)} words  ${p.reading_time} min  ${p.slug}`);
if (problems.length) {
  console.error('\nRefusing to write:\n  ' + problems.join('\n  '));
  process.exit(1);
}
if (mode === 'dry') {
  console.log('\nDry run. Nothing written. Use --draft or --publish.');
  process.exit(0);
}

const { createClient } = await import('@supabase/supabase-js');
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const now = new Date().toISOString();
for (const p of pieces) {
  const { data: existing, error: readErr } = await db.from('blog_posts').select('id,published_at,is_published').eq('slug', p.slug).maybeSingle();
  if (readErr) throw readErr;
  const row = {
    slug: p.slug,
    title: p.title,
    category: p.category,
    excerpt: p.excerpt,
    tags: p.tags,
    content: p.content,
    reading_time: p.reading_time,
    updated_at: now,
    is_published: mode === 'publish' ? true : existing?.is_published ?? false,
    published_at: mode === 'publish' ? existing?.published_at ?? now : existing?.published_at ?? null,
  };
  const { error } = existing
    ? await db.from('blog_posts').update(row).eq('id', existing.id)
    : await db.from('blog_posts').insert({ ...row, created_at: now, view_count: 0, like_count: 0, is_featured: false });
  if (error) throw new Error(`${p.slug}: ${error.message}`);
  console.log(`${existing ? 'updated ' : 'inserted'} ${row.is_published ? 'PUBLISHED' : 'draft    '} ${p.slug}`);
}
