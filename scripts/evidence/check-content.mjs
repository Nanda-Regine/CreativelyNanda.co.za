#!/usr/bin/env node
// Evidence Wing content gate. Exit 1 with file:line hits.
// Usage: node scripts/evidence/check-content.mjs [--self-test]
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json']);
const ALLOWED_EMAILS = new Set(['hello@mirembemuse.co.za']);
const FNB_ALLOWED = [
  'accepted into FNB App Academy 2026',
  'submitted to the FNB App of the Year hackathon (Youth Entrepreneurship & Small Business Growth, 23-25 Oct 2026)',
];
const PRICES = '(?:349|899|1[ ,]?999|3[ ,]?999|2[ ,]?500|4[ ,]?500|8[ ,]?500|14[ ,]?999)';

// The only files that may hold the live, dated AdminOS price list (read from adminos.co.za, 11 Nov 2026).
const PRICE_FILES = new Set([
  'lib/data/evidence/adminos/pricing.ts',
  'components/forge/evidence/PriceLadder.tsx',
]);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  if (fs.statSync(dir).isFile()) return [dir];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (EXTS.has(path.extname(e.name))) out.push(p);
  }
  return out;
}

const isComment = (line) => /^\s*(\/\/|\/\*|\*)/.test(line);

/** scan one file's text; returns [{line, rule, text}] */
export function scanText(text, { inData, inComponents, allowPrices = false }) {
  const hits = [];
  const lines = text.split(/\r?\n/);
  const add = (i, rule, m) => hits.push({ line: i + 1, rule, text: String(m).slice(0, 80) });
  // offsets for FNB-in-allowed-string check
  const starts = [];
  let off = 0;
  for (const l of lines) { starts.push(off); off += l.length + 1; }
  const allowedRanges = [];
  if (inData) {
    for (const s of FNB_ALLOWED) {
      let i = text.indexOf(s);
      while (i !== -1) { allowedRanges.push([i, i + s.length]); i = text.indexOf(s, i + 1); }
    }
  }
  lines.forEach((line, i) => {
    if (line.includes('—')) add(i, 'em dash', '—');
    if (/ -- /.test(line)) add(i, "' -- ' dash", ' -- ');
    for (const m of line.matchAll(/[\w.+-]+@[\w-]+\.[\w.]+/g)) {
      if (!ALLOWED_EMAILS.has(m[0].toLowerCase())) add(i, 'email / credential', m[0]);
    }
    for (const [re, rule] of [[/password/i, 'password'], [/demo@/i, 'demo@'], [/login:/i, 'login:'], [/7jQd/, 'credential fragment']]) {
      const m = line.match(re); if (m) add(i, rule, m[0]);
    }
    if (!allowPrices) {
      const p1 = line.match(new RegExp(String.raw`\bR\s?` + PRICES + String.raw`\b`));
      if (p1) add(i, 'price', p1[0]);
      const p2 = line.match(new RegExp(String.raw`\b` + PRICES + String.raw`\s*(?:\/mo\b|per month)`, 'i'));
      if (p2) add(i, 'price', p2[0]);
      const p3 = line.match(/per month|\/mo\b|free trial|\/month/i);
      if (p3) add(i, 'price wording', p3[0]);
    }
    const f1 = line.match(/partner(ed)? with FNB|FNB partner|FNB-backed/i);
    if (f1) add(i, 'FNB partnership wording', f1[0]);
    if (inData && !isComment(line)) {
      for (const m of line.matchAll(/FNB/g)) {
        const pos = starts[i] + m.index;
        if (!allowedRanges.some(([a, b]) => pos >= a && pos < b)) add(i, 'FNB outside the two allowed strings', line.trim());
      }
    }
    if (inComponents && !isComment(line)) {
      for (const [re, rule] of [[/blur\(/, 'CSS blur() filter'], [/dangerouslySetInnerHTML/, 'dangerouslySetInnerHTML'], [/Date\.now|Math\.random|toLocale/, 'hydration-unsafe call']]) {
        const m = line.match(re); if (m) add(i, rule, m[0]);
      }
      const n = line.match(/\b\d[\d,.+/]*\s*(?:tests|tables|screens|automations|personas)\b/i);
      if (n) add(i, 'inline number (must come from claims)', n[0]);
    }
  });
  return hits;
}

export function scanRoot(root) {
  const dirs = [
    ['lib/data/evidence', { inData: true, inComponents: false }],
    ['components/forge/evidence', { inData: false, inComponents: true }],
    ['app/forge/cases', { inData: false, inComponents: false }],
    ['lib/data/roster.ts', { inData: false, inComponents: false }],
    ['components/forge/studio', { inData: false, inComponents: true }],
  ];
  const results = [];
  for (const [rel, flags] of dirs) {
    for (const f of walk(path.join(root, rel))) {
      const rel2 = path.relative(root, f).split(path.sep).join('/');
      const allowPrices = PRICE_FILES.has(rel2);
      for (const h of scanText(fs.readFileSync(f, 'utf8'), { ...flags, allowPrices })) {
        results.push({ file: path.relative(root, f).split(path.sep).join('/'), ...h });
      }
    }
  }
  return results;
}

function selfTest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'evidence-check-'));
  try {
    fs.mkdirSync(path.join(tmp, 'lib/data/evidence'), { recursive: true });
    fs.mkdirSync(path.join(tmp, 'components/forge/evidence'), { recursive: true });
    fs.writeFileSync(path.join(tmp, 'lib/data/evidence/bad.ts'), [
      "export const a = 'one — two';",
      "export const b = 'mail demo@x.co.za';",
      "export const c = 'only R349 per month';",
      "export const d = 'partnered with FNB';",
      "export const e = 'FNB loves us';",
      "export const f = 'password 7jQd';",
      "export const g = 'accepted into FNB App Academy 2026';",
      "export const h = 'hello@mirembemuse.co.za and R 14 134';",
    ].join('\n'));
    fs.writeFileSync(path.join(tmp, 'components/forge/evidence/Bad.tsx'),
      "export const X = () => <div style={{filter:'blur(4px)'}} dangerouslySetInnerHTML={{__html: String(Date.now())}}>238 tests</div>;\n");
    const hits = scanRoot(tmp);
    const need = ['em dash', 'email / credential', 'price', 'FNB partnership wording', 'FNB outside the two allowed strings', 'password', 'CSS blur() filter', 'dangerouslySetInnerHTML', 'hydration-unsafe call', 'inline number (must come from claims)'];
    const missing = need.filter((r) => !hits.some((h) => h.rule === r));
    const falsePos = hits.filter((h) => h.file.endsWith('bad.ts') && (h.line === 7 || h.line === 8));
    if (missing.length || falsePos.length) {
      console.error('self-test FAILED. missing rules:', missing, 'false positives:', falsePos);
      process.exit(1);
    }
    console.log(`self-test ok: checker caught ${hits.length} planted hits across ${need.length} rules, no false positives`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--self-test')) selfTest();
  else {
    const hits = scanRoot(ROOT);
    if (hits.length) {
      for (const h of hits) console.error(`${h.file}:${h.line}  [${h.rule}]  ${h.text}`);
      console.error(`\ncheck-content: ${hits.length} hit(s)`);
      process.exit(1);
    }
    console.log('check-content: clean');
  }
}
