// ─────────────────────────────────────────────────────────────────────────────
// X-ray: the craft layer of a poem, measured from the text.
//
// Revolution Plan §4 (READ, the Library): "X-ray mode on her poems shows the
// craft layer (why this break, what this sound is doing)". The WHY belongs to
// Nanda and lives in `Poem.annotations`, in her words. Everything here is the
// WHAT, and it is computed, never typed: the Forge rule ("every number
// measured") applied to verse. Nothing in this file claims an intention.
//
// Pure functions, no React, deterministic (same poem, same X-ray, on the
// server and the client), so it cannot cause a hydration mismatch.
// ─────────────────────────────────────────────────────────────────────────────
import type { Poem } from '@/lib/poems-data';

export type DeviceKind =
  | 'refrain'
  | 'turn'
  | 'landing'
  | 'anaphora'
  | 'rhyme'
  | 'hinge'
  | 'pause'
  | 'alliteration'
  | 'drop'
  | 'pulse';

/** A span inside one line, in characters. */
export interface Mark {
  line: number;
  start: number;
  end: number;
}

export interface Device {
  id: string;
  kind: DeviceKind;
  /** Short name, e.g. "The refrain". */
  title: string;
  /** What was measured, in one sentence. */
  finding: string;
  /** What the device does, in general craft terms (not a claim about intent). */
  craft: string;
  lines: number[];
  marks: Mark[];
}

export interface XrayLine {
  index: number;
  text: string;
  stanza: number;
  syllables: number;
  /** Rhyme-scheme letter for this line's ending, when it rhymes nearby. */
  rhyme: string | null;
}

export interface Xray {
  lines: XrayLine[];
  stanzas: number;
  devices: Device[];
  /** Mean syllables per line, one decimal. */
  meanSyllables: number;
}

// ── Words ─────────────────────────────────────────────────────────────────────

const STOP = new Set(
  ('a an the and but or nor so of to in on at by for from with into onto as is are was were be been am ' +
    'i me my you your he him his she her it its we us our they them their this that these those ' +
    'not no do does did have has had will would can could shall should may might must ' +
    'if when then than there here what who whom which why how all any each every some just ' +
    "i'm it's don't can't i'll i've you're").split(' '),
);

const HINGE_END = new Set(
  ('and but or nor because the a an of to into onto my your our from than through between beyond ' +
    'until while if whose upon').split(' '),
);

interface Tok {
  word: string; // lower-case, letters and apostrophes only
  start: number;
  end: number;
}

function tokens(line: string): Tok[] {
  const out: Tok[] = [];
  const re = /[A-Za-zÀ-ɏ][A-Za-zÀ-ɏ'’]*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    out.push({ word: m[0].toLowerCase().replace(/’/g, "'").replace(/'+$/, ''), start: m.index, end: m.index + m[0].length });
  }
  return out;
}

const norm = (s: string) => tokens(s).map((t) => t.word).join(' ');

/** Rough English syllable count. Good enough to draw a poem's shape. */
export function syllables(word: string): number {
  let w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const groups = w.match(/[aeiouy]{1,2}/g);
  return Math.max(1, groups ? groups.length : 1);
}

/** The sound a word ends on, from its last vowel group. "late" → "at", "day" → "ay". */
function rhymeKey(word: string): string {
  let w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length > 3 && /[^aeiou]s$/.test(w) && !/ss$/.test(w)) w = w.slice(0, -1);
  if (/^(me|be|he|she|we|thee)$/.test(w)) return 'ee';
  if (w.length > 2 && /[^aeiou]y$/.test(w)) return 'ee';
  if (w.length > 3 && /[^aeiouy]e$/.test(w) && !/le$/.test(w)) w = w.slice(0, -1);
  const m = w.match(/[aeiouy]+[^aeiouy]*$/);
  return m ? m[0] : w;
}

/** The consonant sound a word opens on, for alliteration. Vowels return ''. */
function onset(word: string): string {
  const w = word.toLowerCase();
  if (/^[aeiou]/.test(w)) return '';
  if (/^(ph)/.test(w)) return 'f';
  if (/^(kn)/.test(w)) return 'n';
  if (/^(wr)/.test(w)) return 'r';
  if (/^(wh)/.test(w)) return 'w';
  if (/^(ch|sh|th)/.test(w)) return w.slice(0, 2);
  if (/^c[eiy]/.test(w)) return 's';
  if (/^(c|q)/.test(w)) return 'k';
  return w[0];
}

// ── The X-ray ─────────────────────────────────────────────────────────────────

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const times = (k: number) => (k === 2 ? 'twice' : k === 3 ? 'three times' : `${k} times`);

export function xray(poem: Pick<Poem, 'content'>): Xray {
  // Lines, with stanza numbers. Blank lines separate stanzas.
  const lines: XrayLine[] = [];
  let stanza = 0;
  let prevBlank = false;
  for (const raw of poem.content.replace(/\r\n/g, '\n').split('\n')) {
    if (!raw.trim()) {
      if (lines.length) prevBlank = true;
      continue;
    }
    if (prevBlank) stanza++;
    prevBlank = false;
    const text = raw.trim();
    lines.push({
      index: lines.length,
      text,
      stanza,
      syllables: tokens(text).reduce((n, t) => n + syllables(t.word), 0),
      rhyme: null,
    });
  }
  const toks = lines.map((l) => tokens(l.text));
  const last = (i: number) => toks[i][toks[i].length - 1];
  const whole = (i: number): Mark => ({ line: i, start: 0, end: lines[i].text.length });
  const devices: Device[] = [];
  const add = (d: Omit<Device, 'id'>) => devices.push({ ...d, id: `${d.kind}-${devices.length}` });
  const quote = (i: number) => `“${lines[i].text.replace(/[.,;:!?]+$/, '')}”`;
  const n = lines.length;
  if (!n) return { lines, stanzas: 0, devices, meanSyllables: 0 };

  // ── Refrains: a whole line (2+ words) that comes back. ──
  const byText = new Map<string, number[]>();
  lines.forEach((l, i) => {
    const k = norm(l.text);
    if (k.split(' ').length < 2) return;
    byText.set(k, [...(byText.get(k) ?? []), i]);
  });
  const refrains = Array.from(byText.values()).filter((ix) => ix.length >= 2).sort((a, b) => b.length - a.length || a[0] - b[0]);
  const inRefrain = new Set(refrains.flat());
  refrains.slice(0, 2).forEach((ix, k) => {
    add({
      kind: 'refrain',
      title: k === 0 ? 'The refrain' : 'The second refrain',
      finding: `${quote(ix[0])} is said ${times(ix.length)}.`,
      craft: 'A refrain is the poem’s heartbeat. The words stay the same; what changes is everything the reader has been through since the last time.',
      lines: ix,
      marks: ix.map(whole),
    });
  });

  // ── The turn: a refrain line that comes back with its last word changed. ──
  for (const ix of refrains) {
    const base = toks[ix[0]].map((t) => t.word);
    if (base.length < 3) continue;
    for (let i = 0; i < n; i++) {
      if (ix.includes(i)) continue;
      const w = toks[i].map((t) => t.word);
      if (w.length !== base.length) continue;
      if (w.slice(0, -1).join(' ') !== base.slice(0, -1).join(' ') || w[w.length - 1] === base[base.length - 1]) continue;
      const t = last(i);
      add({
        kind: 'turn',
        title: 'The turn',
        finding: `The refrain comes back once with one word changed: “${base[base.length - 1]}” becomes “${w[w.length - 1]}”.`,
        craft: 'When a refrain has trained the ear to expect a word, changing only that word carries the whole poem’s shift in a single syllable.',
        lines: [...ix, i],
        marks: [{ line: i, start: t.start, end: t.end }, ...ix.map((j) => ({ line: j, start: last(j).start, end: last(j).end }))],
      });
    }
  }

  // ── Landing word: distinct lines that end on the same word. ──
  const byEnd = new Map<string, number[]>();
  lines.forEach((_, i) => {
    const t = last(i);
    if (t && !/[?!]$/.test(lines[i].text)) byEnd.set(t.word, [...(byEnd.get(t.word) ?? []), i]);
  });
  for (const [word, ix] of Array.from(byEnd)) {
    const distinct = new Set(ix.map((i) => norm(lines[i].text)));
    if (ix.length < 3 || distinct.size < 2 || STOP.has(word)) continue;
    add({
      kind: 'landing',
      title: 'The landing word',
      finding: `${ix.length} lines end on “${word}”.`,
      craft: 'Ending line after line on the same word (epistrophe) makes the reader wait for it. Each line becomes a different road to one place.',
      lines: ix,
      marks: ix.map((i) => ({ line: i, start: last(i).start, end: last(i).end })),
    });
  }

  // ── Anaphora: lines that open on the same words. ──
  const byOpen = new Map<string, number[]>();
  lines.forEach((_, i) => {
    const w = toks[i];
    if (w.length < 3) return;
    const k = `${w[0].word} ${w[1].word}`;
    byOpen.set(k, [...(byOpen.get(k) ?? []), i]);
  });
  for (const [k, ix] of Array.from(byOpen)) {
    if (ix.length < 3 || ix.every((i) => inRefrain.has(i))) continue;
    const first = lines[ix[0]].text.slice(0, toks[ix[0]][1].end);
    add({
      kind: 'anaphora',
      title: 'The drumbeat',
      finding: `${ix.length} lines open on “${first}”.`,
      craft: 'Anaphora, the praise-poem’s oldest tool: a repeated opening sets a beat, so the new words at the end of each line land harder.',
      lines: ix,
      marks: ix.map((i) => ({ line: i, start: 0, end: toks[i][1].end })),
    });
    void k;
  }

  // ── Rhyme: line endings that share a sound within four lines. ──
  const keys = lines.map((_, i) => (last(i) ? rhymeKey(last(i).word) : ''));
  const partner = new Array<number>(n).fill(-1);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < Math.min(n, i + 5); j++) {
      if (!keys[i] || keys[i] !== keys[j] || keys[i].length < 2) continue;
      if (last(i).word === last(j).word) continue; // the same word is a landing, not a rhyme
      partner[i] = partner[i] < 0 ? j : partner[i];
      partner[j] = partner[j] < 0 ? i : partner[j];
    }
  }
  const rhymed = lines.map((_, i) => i).filter((i) => partner[i] >= 0);
  // Scheme letters, per poem, in order of first appearance.
  const letterOf = new Map<string, string>();
  for (const i of rhymed) {
    if (!letterOf.has(keys[i])) letterOf.set(keys[i], LETTERS[letterOf.size % 26]);
    lines[i].rhyme = letterOf.get(keys[i])!;
  }
  if (rhymed.length >= 2) {
    const pairs = Array.from(letterOf.keys()).length;
    const example = rhymed.slice(0, 2).map((i) => `“${last(i).word}”`).join(' and ');
    add({
      kind: 'rhyme',
      title: 'The chime',
      finding: `${rhymed.length} of ${n} lines rhyme with a line close by, in ${pairs} sound${pairs === 1 ? '' : 's'}, starting with ${example}.`,
      craft: 'Rhyme within earshot binds lines together for the ear before the mind has caught the meaning. Free verse that rhymes when it wants to is choosing its moments.',
      lines: rhymed,
      marks: rhymed.map((i) => ({ line: i, start: last(i).start, end: last(i).end })),
    });
  }

  // ── Hinge breaks: a line that stops on a word that cannot end a thought. ──
  const hinges = lines
    .map((l, i) => ({ l, i, t: last(i) }))
    .filter(({ l, t }) => t && !/[.,;:!?…"”)]$/.test(l.text) && HINGE_END.has(t.word));
  if (hinges.length) {
    const h = hinges[0];
    add({
      kind: 'hinge',
      title: 'The held breath',
      finding:
        hinges.length === 1
          ? `One line stops on “${h.t.word}”, a word that cannot end a thought, so the reader has to cross the break to finish it.`
          : `${hinges.length} lines stop on a word that cannot end a thought (${Array.from(new Set(hinges.map((x) => `“${x.t.word}”`))).slice(0, 3).join(', ')}), so the reader has to cross the break to finish them.`,
      craft: 'A line break is a pause the poet chooses. Breaking on “and” or “because” holds the breath at the hinge, and the next line arrives as a small surprise.',
      lines: hinges.map((x) => x.i),
      marks: hinges.map((x) => ({ line: x.i, start: x.t.start, end: x.t.end })),
    });
  }

  // ── Pauses: an ellipsis inside a line, or trailing off at its end. ──
  const pauseMarks: Mark[] = [];
  lines.forEach((l, i) => {
    const re = /\.{3}|…/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(l.text))) pauseMarks.push({ line: i, start: m.index, end: m.index + m[0].length });
  });
  if (pauseMarks.length) {
    const inside = pauseMarks.filter((m) => m.end < lines[m.line].text.length).length;
    add({
      kind: 'pause',
      title: 'The pause',
      finding:
        pauseMarks.length === 1
          ? `One ellipsis, ${inside ? 'in the middle of a line' : 'where a line trails off'}.`
          : `${pauseMarks.length} ellipses${inside ? `, ${inside} of them in the middle of a line` : ''}.`,
      craft: 'An ellipsis inside a line is a caesura you can see: the voice stops, and the rest of the line comes after a breath. On the page it is the performer’s pause, written down.',
      lines: Array.from(new Set(pauseMarks.map((m) => m.line))),
      marks: pauseMarks,
    });
  }

  // ── Alliteration: three words in a line that open on one sound, or two side by side. ──
  const allit: Mark[] = [];
  const allitLines: number[] = [];
  let bestAllit = '';
  toks.forEach((ts, i) => {
    const content = ts.filter((t) => !STOP.has(t.word) && t.word.length >= 3);
    const groups = new Map<string, Tok[]>();
    content.forEach((t) => {
      const o = onset(t.word);
      if (o) groups.set(o, [...(groups.get(o) ?? []), t]);
    });
    let hit = false;
    for (const g of Array.from(groups.values())) {
      const adjacent = g.some((t, k) => k > 0 && ts.indexOf(t) - ts.indexOf(g[k - 1]) === 1);
      if (g.length >= 3 || adjacent) {
        g.forEach((t) => allit.push({ line: i, start: t.start, end: t.end }));
        if (!bestAllit) {
          const span = lines[i].text.slice(g[0].start, g[g.length - 1].end);
          bestAllit = span.length <= 40 ? span : g.map((t) => lines[i].text.slice(t.start, t.end)).join(' … ');
        }
        hit = true;
      }
    }
    if (hit) allitLines.push(i);
  });
  if (allitLines.length) {
    add({
      kind: 'alliteration',
      title: 'The echo',
      finding: `${allitLines.length === 1 ? 'One line leans' : `${allitLines.length} lines lean`} on one opening sound, for example “${bestAllit}”.`,
      craft: 'Alliteration puts a sound in the mouth before the meaning reaches the mind. Read these lines aloud and the consonants do half the work.',
      lines: allitLines,
      marks: allit,
    });
  }

  // ── The drop: the shortest line, when it is far shorter than the poem around it. ──
  const mean = lines.reduce((s, l) => s + l.syllables, 0) / n;
  const shortest = lines.reduce((a, b) => (b.syllables < a.syllables ? b : a));
  if (n >= 6 && shortest.syllables <= Math.max(2, mean * 0.4)) {
    add({
      kind: 'drop',
      title: 'The drop',
      finding: `${quote(shortest.index)} is ${shortest.syllables} syllable${shortest.syllables === 1 ? '' : 's'}, in a poem that averages ${mean.toFixed(1)} a line.`,
      craft: 'A sudden short line is white space doing the talking. The eye drops, the voice slows, and the words that are left carry all the weight.',
      lines: [shortest.index],
      marks: [whole(shortest.index)],
    });
  }

  // ── The pulse word: the content word the poem keeps coming back to. ──
  const freq = new Map<string, Mark[]>();
  toks.forEach((ts, i) =>
    ts.forEach((t) => {
      if (STOP.has(t.word) || t.word.length < 3) return;
      freq.set(t.word, [...(freq.get(t.word) ?? []), { line: i, start: t.start, end: t.end }]);
    }),
  );
  const [pw, pm] = Array.from(freq.entries()).sort((a, b) => b[1].length - a[1].length)[0] ?? ['', []];
  if (pw && pm.length >= 4) {
    add({
      kind: 'pulse',
      title: 'The pulse word',
      finding: `“${pw}” is said ${times(pm.length)} in ${n} lines.`,
      craft: 'The word a poem cannot stop saying is usually the one it is about, even when the title says otherwise.',
      lines: Array.from(new Set(pm.map((m) => m.line))),
      marks: pm,
    });
  }

  return { lines, stanzas: stanza + 1, devices, meanSyllables: Math.round(mean * 10) / 10 };
}

/** How much the X-ray finds in a poem: used to pick the richest poems first. */
export function xrayDensity(poem: Pick<Poem, 'content'>): number {
  const x = xray(poem);
  return x.devices.length;
}
