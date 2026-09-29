// dashless — the house style has no em dashes (Nanda, 2026-09-29).
//
// Rewrites em dashes (and spaced en dashes) in visible text into the
// punctuation a careful editor would have used instead:
//
//   a pair around an aside     →  commas, or parentheses when the aside has commas
//   a label, "**Stack** — …"   →  a colon
//   a new sentence, "— It …"   →  a full stop
//   a list to the sentence end →  a colon
//   a title, "Forge — Scars"   →  a middle dot
//   a range, "2024 — 2026"     →  an unspaced en dash
//   a lone placeholder "—"     →  an en dash
//   an attribution "— Nanda"   →  the name alone
//   anything else              →  a comma
//
// Used by scripts/dashless-sweep.mjs (the one-off sweep) and by the Forge
// ingest scripts, so regenerated data stays clean.

const DASH = '(?:\\s*(?:—|&mdash;|&#8212;)\\s*|\\s+–\\s+)';
const DASH_RE = new RegExp(DASH, 'g');
const HAS_DASH = /—|&mdash;|&#8212;|\s–\s/;

const MONTH = '(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\\.?';
const RANGE_RE = new RegExp(
  `(\\d[\\d,.%]*|\\b${MONTH})${DASH}(?=\\d|${MONTH}\\b|Present\\b|present\\b|Now\\b|now\\b|today\\b|Today\\b)`,
  'g',
);

const STARTERS = new Set(
  ('It This That These Those The A An We She He They You I What And But So Not No Every One ' +
    'Nothing Everything There Here Then Now Each All Its Her His My Our Your If When Which Why How ' +
    'That\'s It\'s I\'m Nobody Someone Everyone Most None Only Just Still Yet Instead Because').split(' '),
);

export function hasDash(s) {
  return typeof s === 'string' && HAS_DASH.test(s);
}

const words = (s) => (s.match(/[\p{L}\p{N}'’]+/gu) || []).length;
const isPunct = (c) => /^[,.;:!?)\]}"'”’]/.test(c || '');


function tidy(s) {
  return s
    .replace(/(\S) {2,}(?=\S)/g, '$1 ')
    .replace(/,[ \t]*,/g, ',')
    .replace(/,[ \t]*([.;:!?)\]])/g, '$1')
    .replace(/([(\[])[ \t]*,[ \t]*/g, '$1')
    .replace(/:[ \t]*,/g, ':')
    .replace(/\([ \t]+/g, '(')
    .replace(/[ \t]+\)/g, ')');
}

const SEP_RE = new RegExp(`(${DASH})`);

// "A 15-Wing Personal AI Operating System — The Most Complex Thing": a headline.
function titleCase(s) {
  if (/[.!?]\s/.test(s) || s.length > 140) return false;
  const ws = s.match(/[\p{L}][\p{L}'’-]{3,}/gu) || [];
  if (ws.length < 3) return false;
  return ws.filter((w) => /^\p{Lu}/u.test(w)).length / ws.length >= 0.75;
}
const hasWord = (s) => /[\p{L}\p{N}]/u.test(s);

// The whitespace to put after the replacement: keep a line break if the dash
// had one on either side (JSX joins lines with a space; markdown keeps them).
function gapOf(sep) {
  const before = sep.match(/^\s*/)[0];
  const after = sep.match(/\s*$/)[0];
  if (after.includes('\n')) return after;
  if (before.includes('\n')) return before;
  return ' ';
}

// One sentence (no sentence-ending punctuation inside).
function sentence(s, ctx) {
  const parts = s.split(SEP_RE); // [text, sep, text, sep, text…]
  if (parts.length === 1) return s;

  let out = parts[0];
  let i = 1;
  while (i < parts.length) {
    const sep = parts[i];
    const right = parts[i + 1];
    const last = i + 2 >= parts.length;
    const first = i === 1;

    // A pair: "A — aside — B".
    if (!last && hasWord(out) && hasWord(right) && !ctx.title) {
      const sep2 = parts[i + 2];
      const after = parts[i + 3];
      const aside = right.trim();
      if (words(aside) <= 25) {
        const l = out.replace(/\s+$/, '');
        const tail = after.replace(/^\s+/, '');
        const closes = isPunct(tail[0]) || !tail;
        if (/,/.test(aside) || words(aside) > 12) {
          out = `${l}${gapOf(sep)}(${aside})${closes ? '' : gapOf(sep2)}${tail}`;
        } else {
          out = `${l},${gapOf(sep)}${aside}${closes ? '' : `,${gapOf(sep2)}`}${tail}`;
        }
        i += 4;
        continue;
      }
    }

    out = single(out, right, gapOf(sep), {
      ...ctx,
      lead: sep.match(/^\s*/)[0],
      joinLeft: ctx.joinLeft && first,
      joinRight: ctx.joinRight && last,
    });
    i += 2;
  }
  return out;
}

function single(left, right, gap, ctx) {
  const l = left.replace(/\s+$/, '');
  const r = right.replace(/^\s+/, '');
  const wl = hasWord(left);
  const wr = hasWord(right);
  const colonFree = !/:/.test(l) && !/:/.test(r);

  // Separator with no words either side (between two JSX expressions).
  if (!wl && !wr) return `${l}${l ? ' ' : ''}·${r || ctx.joinRight ? ' ' : ''}${r}`;
  // Dash opens the text.
  if (!wl) {
    // After an element or expression it continues the sentence: a comma.
    // A short capitalised tail is a title part: "{name} — Notion Template".
    if (ctx.joinLeft && /^[A-Z]/.test(r) && r.length < 60 && !/\.\s/.test(r)) return `${l} ·${gap}${r}`;
    if (ctx.joinLeft) return `${l},${gap}${r}`;
    // Otherwise it is an attribution: "— Nanda Regine".
    return `${left}${ctx.lead ?? ''}${r}`;
  }
  // An attribution after an HTML tag: `<p>— Nanda</p>`.
  if (/>$/.test(l)) return `${l}${gap === ' ' ? '' : gap}${r}`;
  // Dash closes the text: the sentence continues in markup we cannot see.
  if (!wr) return ctx.joinRight ? `${l},${gap}` : `${l}${right}`;

  if (ctx.title || (!/,/.test(l) && titleCase(l) && titleCase(`${l} ${r}`))) return `${l} · ${r}`;
  if (/[,;:?!]$/.test(l)) return `${l}${gap}${r}`;
  if (isPunct(r[0])) return `${l}${r}`;

  // A label: "**Stack** — …", "`fn` — …", "- Phase 1 — …"
  if (colonFree && (/(\*\*|`|__)$/.test(l) || (ctx.blockStart && words(l) <= 6 && /^\s*([-*•]|\d+\.)\s/.test(ctx.block)))) {
    return `${l}:${gap}${r}`;
  }

  const firstWord = (r.match(/^[\p{L}'’]+/u) || [''])[0];
  if (STARTERS.has(firstWord) && words(l) >= 3) return `${l}.${gap}${r}`;

  // A list running to the end of the sentence.
  if (colonFree && (r.match(/,/g) || []).length >= 2 && !/,/.test(l) && !/^(with|and|or|but|for|to|from|in|on|by|of|as|at)\b/i.test(r)) {
    return `${l}:${gap}${r}`;
  }

  // An independent clause in lower case: a colon, not a comma splice.
  if (colonFree && /^(it|it's|its|they|we|she|he|you|i|there|there's|nothing|everything|this)\b/.test(r) && words(l) >= 3) {
    return `${l}:${gap}${r}`;
  }

  return `${l},${gap}${r}`;
}

/**
 * @param {string} text
 * @param {{ title?: boolean, joinLeft?: boolean, joinRight?: boolean }} [opts]
 *   title: a short display string, gets a middle dot.
 *   joinLeft / joinRight: the text sits against an element or expression on
 *   that side (JSX children, template literal parts), so a dash at that edge
 *   is part of a sentence, not an attribution.
 */
export function dashless(text, opts = {}) {
  if (!hasDash(text)) return text;
  const trimmed = text.trim();
  if (trimmed === '—' || trimmed === '&mdash;' || trimmed === '&#8212;') {
    return trimmed !== text ? text.replace(/—|&mdash;|&#8212;/, '·') : '–';
  }

  const title = !!opts.title || (/ \| /.test(text) && !/\.\s/.test(text) && text.length < 140);
  const s = text.replace(RANGE_RE, '$1–');

  // Blocks: paragraphs, list items and headings. Prose that merely wraps
  // across source lines stays one block, so a sentence is never cut.
  const blocks = s.split(/(\n[ \t]*\n|\n(?=[ \t]*(?:[-*•>]|#{1,6}|\d+\.)\s))/);
  const out = blocks.map((block, bi) => {
    if (bi % 2 === 1 || !hasDash(block)) return block;
    const heading = /^\s*#{1,6}\s/.test(block) || /^\s*title:\s/.test(block);
    const chunks = block.split(/(?<=[.!?…]["”’)]?)(\s+)/);
    let seenWords = false;
    return chunks
      .map((c, ci) => {
        if (ci % 2 === 1) return c;
        const res = hasDash(c)
          ? sentence(c, {
              title: title || heading,
              block,
              blockStart: !seenWords,
              joinLeft: !!opts.joinLeft && bi === 0 && ci === 0,
              joinRight: !!opts.joinRight && bi === blocks.length - 1 && ci === chunks.length - 1,
            })
          : c;
        if (hasWord(c)) seenWords = true;
        return res;
      })
      .join('');
  });

  return tidy(out.join(''));
}

/** Deep-apply to every string value in a JSON-like structure (keys untouched). */
const TITLE_KEYS = new Set(['title', 'name', 'label', 'heading', 'headline', 'kicker', 'eyebrow', 'session', 'tag', 'badge']);
export function dashlessDeep(value, key) {
  if (typeof value === 'string') {
    const title = TITLE_KEYS.has(key) && value.length < 100 && !/\.\s/.test(value);
    return dashless(value, { title });
  }
  if (Array.isArray(value)) return value.map((v) => dashlessDeep(v, key));
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = dashlessDeep(v, k);
    return out;
  }
  return value;
}
