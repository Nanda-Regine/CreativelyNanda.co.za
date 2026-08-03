// Upload every .mp4 in a /public/assets subfolder to Cloudinary as VIDEO under
// creativelynanda/<subfolder>/<name>. Videos are .vercelignore'd from the deploy,
// so anything referenced in-app must be served from Cloudinary via cldVideo().
//
//   node scripts/upload-videos.mjs graduation
import { readdirSync, existsSync, statSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import { v2 as cloudinary } from 'cloudinary';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
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
if (!rel) { console.error('usage: node scripts/upload-videos.mjs <subfolder>'); process.exit(1); }
const dir = join(ROOT, 'public', 'assets', rel);
if (!existsSync(dir)) { console.error(`no such folder: ${dir}`); process.exit(1); }

const files = readdirSync(dir).filter((f) => extname(f).toLowerCase() === '.mp4');
console.log(`Uploading ${files.length} videos from ${rel}/ …`);
let ok = 0, fail = 0;
for (const f of files) {
  const abs = join(dir, f);
  const publicId = `creativelynanda/${rel}/${f.replace(/\.[^.]+$/, '')}`;
  const mb = (statSync(abs).size / 1048576).toFixed(1);
  process.stdout.write(`↑ ${f} (${mb}MB) … `);
  try {
    const r = await new Promise((res, rej) =>
      cloudinary.uploader.upload_large(abs, {
        public_id: publicId, resource_type: 'video', overwrite: true, invalidate: true,
        use_filename: false, unique_filename: false, chunk_size: 6_000_000,
      }, (err, result) => (err ? rej(err) : res(result))));
    console.log(`ok [${r.width}x${r.height}, ${Math.round(r.duration || 0)}s]`);
    ok++;
  } catch (e) { console.log(`FAIL: ${e.message}`); fail++; }
}
console.log(`\nDone. ${ok} uploaded, ${fail} failed.`);
