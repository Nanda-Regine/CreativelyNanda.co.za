// Upload a single file (absolute path) to a given Cloudinary public_id.
//   node scripts/upload-one.mjs "<absPath>" "<publicId>"
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { v2 as cloudinary } from 'cloudinary';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
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
const [abs, publicId] = process.argv.slice(2);
const r = await cloudinary.uploader.upload(abs, {
  public_id: publicId, resource_type: 'image', overwrite: true, invalidate: true,
  use_filename: false, unique_filename: false,
});
console.log(`ok → ${r.public_id} [${r.width}x${r.height}]`);
