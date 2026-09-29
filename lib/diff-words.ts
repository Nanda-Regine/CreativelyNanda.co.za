/**
 * Word-level diff for prose. Server-side only in practice (it runs in the
 * article page), but has no imports, so it is safe anywhere.
 *
 * A token is a word together with the whitespace that follows it, so a diff
 * reads as sentences changing rather than as a scatter of spaces. The
 * algorithm is a plain LCS table. An essay is a few thousand tokens, which is
 * a few million cells: trivial on a server, and simpler to trust than a
 * clever diff. Common prefix and suffix are trimmed first, because between
 * two drafts most of the text usually hasn't moved.
 */

export type DiffOp = 'same' | 'ins' | 'del';
export interface DiffSegment {
  op: DiffOp;
  text: string;
}

const tokenize = (s: string) => s.match(/\S+\s*|\s+/g) ?? [];

export function diffWords(before: string, after: string): DiffSegment[] {
  const a = tokenize(before);
  const b = tokenize(after);

  let start = 0;
  while (start < a.length && start < b.length && a[start] === b[start]) start++;
  let endA = a.length;
  let endB = b.length;
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA--;
    endB--;
  }

  const out: DiffSegment[] = [];
  const push = (op: DiffOp, text: string) => {
    if (!text) return;
    const last = out[out.length - 1];
    if (last && last.op === op) last.text += text;
    else out.push({ op, text });
  };

  push('same', a.slice(0, start).join(''));

  const x = a.slice(start, endA);
  const y = b.slice(start, endB);
  const n = x.length;
  const m = y.length;
  // lcs[i][j] = LCS length of x[i..] and y[j..], flattened.
  const w = m + 1;
  const lcs = new Uint32Array((n + 1) * w);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      lcs[i * w + j] = x[i] === y[j] ? lcs[(i + 1) * w + j + 1] + 1 : Math.max(lcs[(i + 1) * w + j], lcs[i * w + j + 1]);
    }
  }
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (x[i] === y[j]) {
      push('same', x[i]);
      i++;
      j++;
    } else if (lcs[(i + 1) * w + j] >= lcs[i * w + j + 1]) {
      push('del', x[i++]);
    } else {
      push('ins', y[j++]);
    }
  }
  while (i < n) push('del', x[i++]);
  while (j < m) push('ins', y[j++]);

  push('same', a.slice(endA).join(''));
  return out;
}

/** Words added and removed, for the colophon. */
export function diffStats(segments: DiffSegment[]) {
  const words = (s: string) => (s.match(/\S+/g) ?? []).length;
  let added = 0;
  let removed = 0;
  for (const s of segments) {
    if (s.op === 'ins') added += words(s.text);
    if (s.op === 'del') removed += words(s.text);
  }
  return { added, removed };
}
