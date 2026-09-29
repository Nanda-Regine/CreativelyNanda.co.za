// One-off sweep: remove em dashes from every piece of visible text on the site.
//
//   node scripts/dashless-sweep.mjs            # dry run, writes a report
//   node scripts/dashless-sweep.mjs --write    # apply
//
// Only text a visitor can see is touched: string literals, template text and
// JSX text in .ts/.tsx/.js/.jsx/.mjs (found with the TypeScript parser, so
// comments and code are left alone), string VALUES in .json, and .md bodies.
// Rules live in scripts/lib/dashless.mjs.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { dashless, dashlessDeep, hasDash } from './lib/dashless.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['app', 'components', 'lib', 'content', 'locales', 'hooks', 'emails'];
const WRITE = process.argv.includes('--write');
const REPORT = process.argv.find((a) => a.startsWith('--report='))?.slice(9);

const TITLE_KEYS = new Set(['title', 'name', 'label', 'heading', 'headline', 'kicker', 'eyebrow', 'session', 'tag', 'badge', 'alt', 'aria-label']);

function walk(dir, out = []) {
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const e of entries) {
    if (e === 'node_modules' || e.startsWith('.')) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function titleContext(node, text) {
  if (text.length >= 100 || /\.\s/.test(text)) return false;
  const p = node.parent;
  if (!p) return false;
  if (ts.isPropertyAssignment(p) && p.initializer === node) {
    const n = p.name.getText().replace(/['"]/g, '');
    return TITLE_KEYS.has(n);
  }
  if (ts.isJsxAttribute(p)) return TITLE_KEYS.has(p.name.getText());
  return false;
}

const log = [];

function sweepCode(file, src) {
  const kind = file.endsWith('x') ? ts.ScriptKind.TSX : file.endsWith('.ts') ? ts.ScriptKind.TS : ts.ScriptKind.JSX;
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, kind);
  const edits = [];

  const visit = (node) => {
    let range = null;
    let join = {};
    switch (node.kind) {
      case ts.SyntaxKind.StringLiteral: {
        const p = node.parent;
        if (ts.isImportDeclaration(p) || ts.isExportDeclaration(p) || ts.isExternalModuleReference(p)) break;
        if ((ts.isPropertyAssignment(p) || ts.isPropertySignature(p)) && p.name === node) break;
        range = [node.getStart(sf) + 1, node.end - 1];
        break;
      }
      case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
      case ts.SyntaxKind.TemplateTail:
        range = [node.getStart(sf) + 1, node.end - 1];
        if (node.kind === ts.SyntaxKind.TemplateTail) join = { joinLeft: true };
        break;
      case ts.SyntaxKind.TemplateHead:
      case ts.SyntaxKind.TemplateMiddle:
        range = [node.getStart(sf) + 1, node.end - 2];
        join = { joinLeft: node.kind === ts.SyntaxKind.TemplateMiddle, joinRight: true };
        break;
      case ts.SyntaxKind.JsxText: {
        range = [node.pos, node.end];
        const kids = node.parent.children ?? [];
        const at = kids.indexOf(node);
        const real = (k) => k && !(ts.isJsxText(k) && k.containsOnlyTriviaWhiteSpaces);
        join = { joinLeft: real(kids[at - 1]), joinRight: real(kids[at + 1]) };
        break;
      }
    }
    if (range) {
      const text = src.slice(range[0], range[1]);
      if (hasDash(text)) {
        const next = dashless(text, { title: titleContext(node, text.trim()), ...join });
        if (next !== text) edits.push({ range, text, next });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);

  let out = src;
  for (const e of edits.sort((a, b) => b.range[0] - a.range[0])) {
    out = out.slice(0, e.range[0]) + e.next + out.slice(e.range[1]);
    log.push({ file, before: e.text.trim(), after: e.next.trim() });
  }
  return out;
}

let files = 0, changed = 0;
for (const dir of DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const ext = extname(file);
    if (!['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json', '.md'].includes(ext)) continue;
    const src = readFileSync(file, 'utf8');
    if (!hasDash(src)) continue;
    files++;
    let out;
    if (ext === '.json') {
      const indent = /^[[{]\r?\n( +)/.exec(src)?.[1]?.length ?? 0;
      const eol = src.includes('\r\n') ? '\r\n' : '\n';
      const before = JSON.parse(src);
      out = JSON.stringify(dashlessDeep(before), null, indent || undefined).replace(/\n/g, eol) + (src.endsWith('\n') ? eol : '');
      if (out !== src) log.push({ file, before: '(json)', after: '(json values)' });
    } else if (ext === '.md') {
      out = dashless(src);
      if (out !== src) log.push({ file, before: '(markdown)', after: '(markdown body)' });
    } else {
      out = sweepCode(file, src);
    }
    if (out !== src) {
      changed++;
      if (WRITE) writeFileSync(file, out);
    }
  }
}

if (REPORT) {
  writeFileSync(REPORT, log.map((l) => `${l.file.replace(ROOT, '')}\n  - ${l.before}\n  + ${l.after}`).join('\n\n'));
}
console.log(`${WRITE ? 'wrote' : 'dry run'}: ${changed} of ${files} files with dashes, ${log.length} edits`);
