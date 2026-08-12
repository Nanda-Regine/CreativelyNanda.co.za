/**
 * Upload media to Cloudinary, recursively, preserving folder structure.
 *
 * `upload-folder.mjs` handles images in ONE flat directory and `upload-videos.mjs`
 * handles videos in ONE flat directory. Neither recurses, which is why
 * `nanda-portraits/nanda-coding/` and the nested video folders were still
 * missing from the CDN long after everything else had been uploaded — the tools
 * quietly did not reach them and nothing said so.
 *
 * This one walks. It also preserves the subfolder in the public_id, which
 * matters more than it looks: her folder names (`nanda-lesotho`, `nanda-coding`,
 * `tru-fm and nelson mandela bay arts festival`) are the best curation in the
 * archive, and the original flat upload destroyed that structure — ninety-six
 * portraits landed in one bucket called `IMG_2025…`. See `lib/data/asset-atlas.ts`.
 *
 *   node scripts/upload-media.mjs                      # every folder in TARGETS
 *   node scripts/upload-media.mjs work reviews         # just these
 *   node scripts/upload-media.mjs --dry                # list what would upload
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { v2 as cloudinary } from 'cloudinary';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = path.join(ROOT, 'public', 'assets');
const BASE = 'creativelynanda';

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

/** Folders the atlas references that were never fully uploaded. */
const TARGETS = [
  'radio',
  'reviews',
  'work',
  'project-screen-record',
  'nandas-videos-of-her',
  'book-launch',
  'graduation',
  'nanda-culture',
  'nanda-portraits',
  'performance',
];

const IMAGE = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const VIDEO = new Set(['.mp4', '.mov', '.webm']);

const DRY = process.argv.includes('--dry');
const chosen = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const folders = chosen.length ? chosen : TARGETS;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    // Parentheses and duplicate markers are variants she kept by accident.
    else if (!/[()]/.test(e.name)) out.push(p);
  }
  return out;
}

let uploaded = 0;
let skipped = 0;
const failed = [];

for (const folder of folders) {
  const dir = path.join(ASSETS, folder);
  const files = walk(dir);
  if (!files.length) {
    console.log(`— ${folder}: nothing found`);
    continue;
  }
  console.log(`\n══ ${folder} (${files.length} files)`);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const kind = IMAGE.has(ext) ? 'image' : VIDEO.has(ext) ? 'video' : null;
    if (!kind) { skipped++; continue; }

    // public_id mirrors the path under /public/assets, minus the extension —
    // so the folder structure survives the upload this time.
    const rel = file.slice(ASSETS.length + 1).replace(/\\/g, '/').replace(/\.[^.]+$/, '');
    const publicId = `${BASE}/${rel}`;
    const mb = (fs.statSync(file).size / 1e6).toFixed(1);

    if (DRY) { console.log(`   would upload ${publicId} (${mb}MB, ${kind})`); continue; }

    try {
      // upload_large streams in chunks — a 40 MB video through the plain
      // uploader fails on a slow connection with an unhelpful error.
      const res = await cloudinary.uploader.upload_large(file, {
        resource_type: kind,
        public_id: publicId,
        overwrite: true,
        chunk_size: 6_000_000,
      });
      console.log(`   ✓ ${res.public_id} (${mb}MB)`);
      uploaded++;
    } catch (err) {
      console.log(`   ✗ ${rel} — ${err.message}`);
      failed.push(rel);
    }
  }
}

console.log(`\n${'─'.repeat(60)}`);
console.log(`  uploaded ${uploaded} · skipped ${skipped} non-media · failed ${failed.length}`);
if (failed.length) {
  failed.forEach((f) => console.log(`   ✗ ${f}`));
  process.exit(1);
}
