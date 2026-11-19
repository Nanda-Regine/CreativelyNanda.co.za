#!/usr/bin/env node
/**
 * Evidence Wing: build web derivatives for the screens listed in a case file.
 *
 *   node scripts/evidence/build-derivatives.mjs --app adminos            # build
 *   node scripts/evidence/build-derivatives.mjs --app adminos --dry      # list only
 *   node scripts/evidence/build-derivatives.mjs --app adminos --review   # also write a review sheet
 *   node scripts/evidence/build-derivatives.mjs --app jarvis --only-new  # skip screens already in manifest.json (light on memory), merge the rest
 *
 * Rules this script enforces (docs/EVIDENCE_WING.md, section 4):
 *  - ONLY screens listed in lib/data/evidence/<app>/screens.json are processed. Nothing else leaves the work folder.
 *  - Redaction is BAKED INTO THE PIXELS before any derivative is made. Never CSS blur.
 *    Rectangles live in scripts/evidence/redactions.json as percentages of the source image.
 *  - Fail closed: a redaction that points at a screen not in the list, or a rectangle outside 0..100, stops the run.
 *  - The un-redacted source is never copied anywhere. Output goes to <WORK>/out/<app>/ and, for local dev only,
 *    to public/evidence-dev/<app>/ (git-ignored). Uploading to R2 is a separate, deliberate step (not in this script).
 *
 * Needs only ffmpeg on PATH (no npm dependency). Source crops come from <WORK>/shots/<folder>/<date>_<HHMMSS>.png.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const WORK = process.env.EVIDENCE_WORK || 'C:/Users/nanda/evidence-work';

/** app key -> folders under <WORK>/shots (an app may span several, e.g. Jarvis wings) */
const FOLDERS = {
  adminos: ['adminos-screenshots'],
  amanda: ['amanda-screenshots'],
  ecdc: ['ecdc-screenshots'],
  greendiaspora: ['green-diaspora-screenshots'],
  isd: ['isd-screenshots'],
  sanyu: ['sanyu-screenshots'],
  jarvis: ['jarvis-dashboard', 'jarvis-ceo-wing', 'jarvis-finance-wing', 'jarvis-cycle-wing', 'jarvis-body-wing', 'jarvis-marketing-wing', 'jarvis-engineering-wing', 'jarvis-sanctuary-wing', 'jarvis-scholar-wing'],
  selves: ['theselvesofus-screenshots'],
};

const WIDTHS = [480, 960, 1366];
const AVIF_WIDTHS = [960, 1366];

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : undefined;
};

function die(msg) {
  console.error(`\nSTOP: ${msg}`);
  process.exit(1);
}

const app = opt('app');
if (!app || !FOLDERS[app]) die(`--app must be one of: ${Object.keys(FOLDERS).join(', ')}`);

const screensFile = path.join(ROOT, 'lib', 'data', 'evidence', app, 'screens.json');
if (!fs.existsSync(screensFile)) die(`missing ${path.relative(ROOT, screensFile)}`);
const screens = JSON.parse(fs.readFileSync(screensFile, 'utf8'));
const ids = new Set(screens.map((s) => s.id));
if (ids.size !== screens.length) die('duplicate screen ids in screens.json');

const redactionsFile = path.join(ROOT, 'scripts', 'evidence', 'redactions.json');
const allRedactions = fs.existsSync(redactionsFile) ? JSON.parse(fs.readFileSync(redactionsFile, 'utf8')) : {};
const redactions = allRedactions[app] ?? {};

// ---- fail closed on redaction mistakes -----------------------------------
for (const [id, rects] of Object.entries(redactions)) {
  if (!ids.has(id)) die(`redaction for "${id}" but that screen is not listed in screens.json (typo, or screen was removed)`);
  for (const r of rects) {
    const ok = ['x', 'y', 'w', 'h'].every((k) => typeof r[k] === 'number' && r[k] >= 0) && r.x + r.w <= 100.001 && r.y + r.h <= 100.001 && r.w > 0 && r.h > 0;
    if (!ok) die(`bad rectangle for "${id}": ${JSON.stringify(r)} (percent of image, inside 0..100)`);
    if (!['blur', 'pixelate', 'block'].includes(r.mode)) die(`bad mode for "${id}": ${r.mode}`);
  }
}

const srcDirs = FOLDERS[app].map((f) => path.join(WORK, 'shots', f));
const outDir = path.join(WORK, 'out', app);
const devDir = path.join(ROOT, 'public', 'evidence-dev', app);

/** screen id is "<app>-<HHMMSS>"; the source file is <date>_<HHMMSS>.png */
function sourceFor(id) {
  const hhmmss = id.slice(app.length + 1);
  for (const dir of srcDirs) {
    const hit = fs.readdirSync(dir).find((f) => f.endsWith(`_${hhmmss}.png`));
    if (hit) return path.join(dir, hit);
  }
  return null;
}

function ff(argv, opts = {}) {
  const r = spawnSync('ffmpeg', ['-nostdin', '-v', 'error', '-y', ...argv], { encoding: opts.binary ? 'buffer' : 'utf8', maxBuffer: 1 << 26 });
  if (r.status !== 0) die(`ffmpeg failed: ${String(r.stderr).slice(0, 400)}`);
  return r.stdout;
}

function probe(file) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', file], { encoding: 'utf8' });
  const [w, h] = r.stdout.trim().split('x').map(Number);
  if (!w || !h) die(`cannot read size of ${file}`);
  return { w, h };
}

/** Build the ffmpeg filter that burns redactions into the source before anything is derived from it. */
function redactionFilter(rects, w, h) {
  if (!rects?.length) return null;
  let chain = '[0:v]split=' + (rects.length + 1) + '[base]' + rects.map((_, i) => `[s${i}]`).join('') + ';';
  let last = 'base';
  rects.forEach((r, i) => {
    const px = Math.round((r.x / 100) * w);
    const py = Math.round((r.y / 100) * h);
    const pw = Math.max(2, Math.round((r.w / 100) * w));
    const ph = Math.max(2, Math.round((r.h / 100) * h));
    let fx;
    if (r.mode === 'block') fx = `drawbox=x=0:y=0:w=iw:h=ih:color=black@1:t=fill`;
    else if (r.mode === 'pixelate') fx = `scale=max(2\\,iw/16):max(2\\,ih/16):flags=neighbor,scale=${pw}:${ph}:flags=neighbor`;
    else fx = `boxblur=luma_radius=min(w\\,h)/6:luma_power=3:chroma_radius=min(cw\\,ch)/6:chroma_power=3`;
    chain += `[s${i}]crop=${pw}:${ph}:${px}:${py},${fx}[b${i}];[${last}][b${i}]overlay=${px}:${py}[o${i}];`;
    last = `o${i}`;
  });
  return { graph: chain.slice(0, -1), out: last };
}

const manifestFile = path.join(ROOT, 'lib', 'data', 'evidence', app, 'manifest.json');
const existing = flag('only-new') && fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : {};
const manifest = {};
let n = 0;
console.log(`${flag('dry') ? 'DRY RUN: ' : ''}${app}: ${screens.length} listed screens, ${Object.keys(redactions).length} with redactions`);

for (const s of screens) {
  if (existing[s.id]) continue;
  const src = sourceFor(s.id);
  if (!src) die(`source image for "${s.id}" not found in ${srcDirs.join(', ')}`);
  const { w, h } = probe(src);
  const rects = redactions[s.id];
  console.log(`  ${s.id}  ${w}x${h}${rects ? `  REDACTED x${rects.length}` : ''}`);
  if (flag('dry')) continue;

  fs.mkdirSync(path.join(outDir), { recursive: true });
  // 1) the one redacted master (lossless png) that every derivative comes from
  const master = path.join(outDir, `${s.id}.master.png`);
  const red = redactionFilter(rects, w, h);
  if (red) ff(['-i', src, '-filter_complex', red.graph, '-map', `[${red.out}]`, '-frames:v', '1', master]);
  else ff(['-i', src, '-frames:v', '1', master]);

  // 2) derivatives (no upscaling beyond native width)
  const widths = WIDTHS.filter((x) => x <= w);
  for (const width of widths) {
    ff(['-i', master, '-vf', `scale=${width}:-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', '82', path.join(outDir, `${s.id}-${width}.webp`)]);
    if (AVIF_WIDTHS.includes(width)) {
      ff(['-i', master, '-vf', `scale=${width}:-2:flags=lanczos`, '-c:v', 'libaom-av1', '-still-picture', '1', '-crf', '34', '-cpu-used', '8', path.join(outDir, `${s.id}-${width}.avif`)]);
    }
  }

  // 3) placeholder + dominant colour (tiny, from the redacted master only)
  const tiny = ff(['-i', master, '-vf', 'scale=24:-2:flags=area', '-c:v', 'libwebp', '-quality', '35', '-f', 'webp', 'pipe:1'], { binary: true });
  const raw = ff(['-i', master, '-vf', 'scale=1:1:flags=area', '-pix_fmt', 'rgb24', '-f', 'rawvideo', 'pipe:1'], { binary: true });
  const color = '#' + [...raw.subarray(0, 3)].map((v) => v.toString(16).padStart(2, '0')).join('');
  manifest[s.id] = { w, h, widths, avif: AVIF_WIDTHS.filter((x) => widths.includes(x)), color, blur: `data:image/webp;base64,${tiny.toString('base64')}`, redacted: Boolean(rects) };

  // 4) local dev copy (git-ignored). Masters never go here.
  fs.mkdirSync(devDir, { recursive: true });
  for (const f of fs.readdirSync(outDir)) if (f.startsWith(`${s.id}-`)) fs.copyFileSync(path.join(outDir, f), path.join(devDir, f));
  n++;
}

if (!flag('dry')) {
  const merged = {};
  for (const sc of screens) merged[sc.id] = manifest[sc.id] ?? existing[sc.id];
  fs.writeFileSync(manifestFile, JSON.stringify(merged, null, 2) + '\n');
  console.log(`\nWrote ${n} screens. Manifest: ${path.relative(ROOT, manifestFile)}`);
  console.log(`Derivatives: ${outDir}\nDev copy: ${path.relative(ROOT, devDir)} (git-ignored)`);

  if (flag('review')) {
    const red = screens.filter((s) => redactions[s.id]);
    if (red.length) {
      const inputs = red.flatMap((s) => ['-i', path.join(outDir, `${s.id}-960.webp`)]);
      const cols = Math.min(2, red.length);
      const layout = red.map((_, i) => `${(i % cols) * 960}_${Math.floor(i / cols) * 440}`).join('|');
      const scaled = red.map((_, i) => `[${i}:v]scale=960:440:force_original_aspect_ratio=decrease,pad=960:440:(ow-iw)/2:(oh-ih)/2[v${i}]`).join(';');
      const graph = red.length > 1 ? `${scaled};${red.map((_, i) => `[v${i}]`).join('')}xstack=inputs=${red.length}:layout=${layout}[o]` : `[0:v]scale=960:440[o]`;
      const sheet = path.join(outDir, `_review-${app}.jpg`);
      ff([...inputs, '-filter_complex', graph, '-map', '[o]', '-frames:v', '1', '-q:v', '3', sheet]);
      console.log(`Review sheet (look at it before any upload): ${sheet}`);
    } else console.log('No redactions in this app, nothing to review.');
  }
}
