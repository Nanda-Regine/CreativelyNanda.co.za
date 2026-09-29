// The same no-em-dash sweep, for copy that lives in Supabase (blog posts, products).
//
//   node scripts/dashless-db.mjs --backup=<file.json>            # dry run + backup
//   node scripts/dashless-db.mjs --backup=<file.json> --write    # apply
//
// Every touched row is written to the backup file first, whole, so any change
// can be put back by hand. Only display copy is rewritten; slugs, URLs, paths
// and ids are never touched.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { dashless, dashlessDeep, hasDash } from './lib/dashless.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
for (const line of readFileSync(join(ROOT, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
}
const WRITE = process.argv.includes('--write');
const BACKUP = process.argv.find((a) => a.startsWith('--backup='))?.slice(9);
if (!BACKUP) throw new Error('--backup=<file> is required');

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const TABLES = {
  blog_posts: { title: ['title'], text: ['excerpt', 'content'], deep: ['tags'] },
  products: { title: ['name', 'badge'], text: ['tagline', 'description', 'impact'], deep: ['features', 'faqs'] },
};

const backup = {};
for (const [table, cols] of Object.entries(TABLES)) {
  const { data, error } = await db.from(table).select('*');
  if (error) throw new Error(`${table}: ${error.message}`);
  backup[table] = [];
  let n = 0;
  for (const row of data) {
    const patch = {};
    for (const c of cols.title) if (hasDash(row[c])) patch[c] = dashless(row[c], { title: true });
    for (const c of cols.text) if (hasDash(row[c])) patch[c] = dashless(row[c]);
    for (const c of cols.deep) {
      if (row[c] == null) continue;
      const next = dashlessDeep(row[c]);
      if (JSON.stringify(next) !== JSON.stringify(row[c])) patch[c] = next;
    }
    if (!Object.keys(patch).length) continue;
    backup[table].push(row);
    n++;
    if (WRITE) {
      const { error: e } = await db.from(table).update(patch).eq('id', row.id);
      if (e) throw new Error(`${table} ${row.id}: ${e.message}`);
    }
  }
  console.log(`${table}: ${n} of ${data.length} rows ${WRITE ? 'updated' : 'would change'}`);
}
writeFileSync(BACKUP, JSON.stringify(backup, null, 2));
console.log(`backup → ${BACKUP}`);
