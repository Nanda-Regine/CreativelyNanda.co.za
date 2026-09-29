/**
 * 📱 Upload the App Studio's screens to Cloudinary.
 *
 *   node scripts/upload-app-screens.mjs          # dry run: resolve every file, upload nothing
 *   node scripts/upload-app-screens.mjs --go     # upload (idempotent, overwrites)
 *
 * Reads `lib/data/app-screens.ts` as text, so ONLY screens listed in the
 * manifest are uploaded. A screenshot sitting in the folder but not in the
 * manifest (like the one left out for privacy) never leaves the laptop. The
 * source folders under /public are not committed; Cloudinary serves the site.
 *
 * public_id: creativelynanda/app-screens/<app>/<HHMMSS>
 */

import fs from 'node:fs';
import path from 'node:path';
import { v2 as cloudinary } from 'cloudinary';

const ROOT = process.cwd();
for (const l of fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').split(/\r?\n/)) {
  const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
}

const src = fs.readFileSync(path.join(ROOT, 'lib/data/app-screens.ts'), 'utf8');
const folders = {};
for (const m of src.matchAll(/key: '(\w+)',[\s\S]*?folder: '([^']+)'/g)) folders[m[1]] = m[2];

const screens = [];
let app = null;
for (const line of src.split(/\r?\n/)) {
  const a = line.match(/\.\.\.s\('(\w+)'/);
  if (a) app = a[1];
  const r = line.match(/^\s*\['(\d{6})',/);
  if (r && app) screens.push({ app, id: r[1] });
}

const go = process.argv.includes('--go');
const missing = [];
const jobs = screens.map((sc) => {
  const file = path.join(ROOT, 'public', folders[sc.app], `Screenshot_20260830_${sc.id}_com.huawei.browser.jpg`);
  if (!fs.existsSync(file)) missing.push(file);
  return { ...sc, file, publicId: `creativelynanda/app-screens/${sc.app}/${sc.id}` };
});

console.log(`${jobs.length} screens in the manifest (${Object.entries(folders).map(([k, v]) => `${k}→${v}`).join(', ')})`);
if (missing.length) {
  console.error(`Missing ${missing.length} source file(s):\n  ${missing.join('\n  ')}`);
  process.exit(1);
}
if (!go) {
  console.log('Dry run. Every file resolved. Re-run with --go to upload.');
  process.exit(0);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

let ok = 0;
const failed = [];
for (const j of jobs) {
  try {
    await cloudinary.uploader.upload(j.file, { public_id: j.publicId, overwrite: true, invalidate: true, resource_type: 'image' });
    ok++;
    process.stdout.write('.');
  } catch (e) {
    failed.push(`${j.publicId}: ${e.message}`);
    process.stdout.write('x');
  }
}
console.log(`\n${ok} uploaded, ${failed.length} failed`);
if (failed.length) {
  console.error(failed.join('\n'));
  process.exit(1);
}
