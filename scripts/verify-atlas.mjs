/**
 * Verify every Cloudinary id referenced by the asset atlas actually exists.
 *
 * ── WHY ───────────────────────────────────────────────────────────────────────
 *
 * The first version of `lib/data/asset-atlas.ts` invented three ids for the
 * poetry-book family — `nanda-poetry-book-1..3` — by guessing from the folder
 * name instead of listing the folder. /about shipped a 404 into the page, and
 * the only reason it was caught is that a screenshot run happened to log a
 * failed resource.
 *
 * A missing image is close to invisible in review: `next-cloudinary` renders an
 * empty box, the layout still works, and on a dark ground an empty box looks
 * like a design decision. So this checks them all, by asking the API rather than
 * by fetching URLs — one call per folder instead of one per asset.
 *
 *   node scripts/verify-atlas.mjs
 *
 * Exit 0 = every id resolves. Exit 1 = at least one does not.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { v2 as cloudinary } from 'cloudinary';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

for (const line of fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
}
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// The atlas is TypeScript, so pull the quoted ids out of it textually rather
// than importing it — this script must run without a build step.
const source = fs.readFileSync(path.join(ROOT, 'lib/data/asset-atlas.ts'), 'utf8');

/**
 * Ids from `ids: []`, `videos: []`, `madibaz: []`, `covers: []`.
 *
 * ⚠️ Parsed PER FAMILY, not by proximity. The first version decided whether a
 * list held videos by looking for `video: true` in a character window around the
 * array — which reached into the neighbouring family and classified the reader
 * reviews, the café photographs and the book-launch poster as videos. A window
 * is not a scope. Cut the source into family blocks first, decide once per block.
 */
const ids = new Set();
const videos = new Set();

const bounds = [...source.matchAll(/^  (\w+): \{$/gm)].map((m) => m.index);
for (let i = 0; i < bounds.length; i++) {
  const block = source.slice(bounds[i], bounds[i + 1] ?? source.length);
  // A family whose `ids` are themselves videos declares it once.
  const familyIsVideo = /^\s*video:\s*true,/m.test(block);

  for (const arr of block.matchAll(/(ids|videos|madibaz|covers):\s*\[([^\]]*)\]/g)) {
    const isVideo = arr[1] === 'videos' || (arr[1] === 'ids' && familyIsVideo);
    for (const q of arr[2].matchAll(/'([^']+)'/g)) {
      const raw = q[1];
      if (raw.includes('${')) continue; // template pieces are resolved below
      (isVideo ? videos : ids).add(raw);
    }
  }
}

// Resolve the `${P}` / `${C}` template ids too.
const P = (source.match(/const P = '([^']+)'/) || [])[1] || '';
const C = (source.match(/const C = '([^']+)'/) || [])[1] || '';
for (const m of source.matchAll(/`\$\{([PC])\}([^`]+)`/g)) {
  ids.add((m[1] === 'P' ? P : C) + m[2]);
}

const full = (id) =>
  id.startsWith('creativelynanda/') || id.startsWith('varsityos') || id.startsWith('sanyu/')
    ? id
    : `creativelynanda/${id}`;

/** One listing per folder, cached — far cheaper than one request per asset. */
const cache = new Map();
async function folderIds(prefix, type) {
  const key = `${type}:${prefix}`;
  if (cache.has(key)) return cache.get(key);
  const found = new Set();
  let next = null;
  do {
    const res = await cloudinary.api.resources({
      resource_type: type,
      type: 'upload',
      prefix,
      max_results: 500,
      next_cursor: next,
    });
    res.resources.forEach((r) => found.add(r.public_id));
    next = res.next_cursor;
  } while (next);
  cache.set(key, found);
  return found;
}

async function check(list, type) {
  const missing = [];
  for (const id of list) {
    const pid = full(id);
    const prefix = pid.split('/').slice(0, -1).join('/');
    const inFolder = await folderIds(prefix, type);
    if (!inFolder.has(pid)) missing.push(pid);
  }
  return missing;
}

console.log(`\nasset-atlas — verifying ${ids.size} images and ${videos.size} videos\n${'─'.repeat(64)}`);

const missingImages = await check(ids, 'image');
const missingVideos = await check(videos, 'video');

for (const m of missingImages) console.log(`🔴 image missing: ${m}`);
for (const m of missingVideos) console.log(`🔴 video missing: ${m}`);

const total = missingImages.length + missingVideos.length;
console.log('─'.repeat(64));
if (total) {
  console.error(`\n✗ ${total} referenced asset(s) do not exist on Cloudinary.\n`);
  process.exit(1);
}
console.log('\n✓ every id in the atlas resolves\n');
