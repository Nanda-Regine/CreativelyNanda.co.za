// Upload curated assets to Cloudinary, mirroring the /public/assets folder
// structure as public_ids under the "creativelynanda" base folder.
//
//   node scripts/upload-to-cloudinary.mjs [relPathUnderAssets ...]
//
// With no args it uploads the HOME_ASSETS set below. Reads credentials from
// .env.local (never printed). Idempotent: overwrite:true, so re-runs are safe.

import { readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import { v2 as cloudinary } from 'cloudinary';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ASSETS = join(ROOT, 'public', 'assets');
const BASE_FOLDER = 'creativelynanda';

// --- load .env.local without echoing secrets -------------------------------
function loadEnv() {
  const p = join(ROOT, '.env.local');
  if (!existsSync(p)) throw new Error('.env.local not found');
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let v = m[2].trim().replace(/^["']|["']$/g, '');
    if (!(m[1] in process.env)) process.env[m[1]] = v;
  }
}
loadEnv();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_SECRET) {
  console.error('Missing Cloudinary credentials in .env.local');
  process.exit(1);
}

// The assets Home needs (images + the two ambient videos).
const HOME_ASSETS = [
  'nanda-culture/IMG_20260719_181316.jpg',
  'performance/nmb-perform-1.jpg',
  'nanda-portraits/nanda-green-1.jpg',
  'poetry-book/official-cover.jpg',
  'professional/nanda-coding.jpg',
  'book-launch/book-customer.mp4',
  'nanda-culture/nanda-making-african-beer.mp4',
];

const rels = process.argv.slice(2).length ? process.argv.slice(2) : HOME_ASSETS;

const isVideo = (f) => ['.mp4', '.mov', '.webm'].includes(extname(f).toLowerCase());

async function run() {
  let ok = 0, fail = 0;
  for (const rel of rels) {
    const abs = join(ASSETS, rel);
    if (!existsSync(abs)) { console.log(`SKIP (missing): ${rel}`); fail++; continue; }
    const publicId = `${BASE_FOLDER}/${rel.replace(/\.[^.]+$/, '')}`;
    const sizeMB = (statSync(abs).size / 1048576).toFixed(1);
    process.stdout.write(`↑ ${rel} (${sizeMB}MB) … `);
    try {
      const res = await cloudinary.uploader.upload(abs, {
        public_id: publicId,
        resource_type: isVideo(abs) ? 'video' : 'image',
        overwrite: true,
        invalidate: true,
        use_filename: false,
        unique_filename: false,
      });
      console.log(`ok  →  ${res.public_id}  [${res.width}x${res.height}]`);
      ok++;
    } catch (e) {
      console.log(`FAIL: ${e.message}`);
      fail++;
    }
  }
  console.log(`\nDone. ${ok} uploaded, ${fail} failed. Base folder: ${BASE_FOLDER}/`);
}
run();
