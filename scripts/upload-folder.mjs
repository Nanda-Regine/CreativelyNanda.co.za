// Upload every image in a /public/assets subfolder to Cloudinary, mirroring the
// path as a public_id under "creativelynanda/". Skips filenames with spaces or
// parentheses (dupes/variants we don't reference). Idempotent (overwrite:true).
//
//   node scripts/upload-folder.mjs nanda-portraits

import { readdirSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import { readFileSync } from 'node:fs';
import { v2 as cloudinary } from 'cloudinary';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ASSETS = join(ROOT, 'public', 'assets');
const BASE = 'creativelynanda';

for (const line of readFileSync(join(ROOT, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
}
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const rel = process.argv[2];
if (!rel) { console.error('usage: node scripts/upload-folder.mjs <subfolder>'); process.exit(1); }
const dir = join(ASSETS, rel);
if (!existsSync(dir)) { console.error(`no such folder: ${dir}`); process.exit(1); }

const IMG = new Set(['.jpg', '.jpeg', '.png']);
const files = readdirSync(dir)
  .filter((f) => IMG.has(extname(f).toLowerCase()))
  .filter((f) => !/[()\s]/.test(f)); // skip spaces/parens (dupes/variants)

console.log(`Uploading ${files.length} images from ${rel}/ …`);
let ok = 0, fail = 0;
for (const f of files) {
  const abs = join(dir, f);
  const publicId = `${BASE}/${rel}/${f.replace(/\.[^.]+$/, '')}`;
  const mb = (statSync(abs).size / 1048576).toFixed(1);
  process.stdout.write(`↑ ${f} (${mb}MB) … `);
  try {
    const r = await cloudinary.uploader.upload(abs, {
      public_id: publicId, resource_type: 'image', overwrite: true, invalidate: true,
      use_filename: false, unique_filename: false,
    });
    console.log(`ok [${r.width}x${r.height}]`);
    ok++;
  } catch (e) { console.log(`FAIL: ${e.message}`); fail++; }
}
console.log(`\nDone. ${ok} uploaded, ${fail} failed.`);
