/**
 * 🖋 The Press — markdown to magazine HTML, on the server.
 *
 * Replaces the article page's old regex chain, which ran in the browser, turned
 * every blank line into a paragraph break (including inside code blocks) and
 * had no links. This is a small line-based block parser instead: fenced code,
 * headings, quotes, lists, paragraphs, and the press's own layout blocks.
 *
 * ── SAFETY ────────────────────────────────────────────────────────────────────
 * All text is HTML-escaped before any markup is added, and link targets are
 * limited to http(s), mailto and site-relative paths. The output is injected
 * with dangerouslySetInnerHTML, so this file is the whole XSS boundary. Keep
 * it that way: never interpolate an unescaped string.
 *
 * ── LAYOUT BLOCKS ─────────────────────────────────────────────────────────────
 * A block opens with `:::kind optional title` on its own line and closes with
 * `:::`. Rows inside are split on ` | `. These exist so each piece can have its
 * own shape instead of one template for everything:
 *
 *   :::chapter  `II | The vault`           a chapter opener with a large numeral
 *   :::statement                           one line, set large, alone on the page
 *   :::pull                                a pull quote
 *   :::aside Title                         a margin note (inline on phones)
 *   :::figures  `~2,100 | answerable questions`
 *   :::timeline `09:54 | First commit`      a timestamp rail
 *   :::ledger   `claim | source | verdict`  first row is the header; verdict
 *               starts with true/cut/understated/false/open
 *   :::receipt Title  `item | amount`, a row starting `=` is the total
 *   :::checklist `pass | text` / `fail | text` / `open | text`
 *   :::frames   `01 | caption`              a typographic contact sheet
 */

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');

export const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const safeHref = (h: string) => /^(https?:\/\/|mailto:|\/(?!\/))/i.test(h);

/** Inline markup on already-escaped text. */
function inline(raw: string): string {
  const codes: string[] = [];
  let s = esc(raw).replace(/`([^`]+)`/g, (_, c) => {
    codes.push(`<code class="press-code-inline">${c}</code>`);
    return `\u0000${codes.length - 1}\u0000`;
  });
  s = s
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, text, href) => {
      const h = href.replace(/&amp;/g, '&');
      if (!safeHref(h)) return text;
      const ext = /^https?:/i.test(h);
      return `<a href="${esc(h)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
    })
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => codes[Number(i)]);
}

const cells = (line: string) => line.split(/\s+\|\s+/).map((c) => c.trim());

const VERDICTS = ['true', 'cut', 'understated', 'false', 'open', 'wrong', 'fixed'];

function renderBlock(kind: string, title: string, rows: string[], toc: TocItem[]): string {
  const body = rows.filter((r) => r.trim() !== '');
  switch (kind) {
    case 'chapter': {
      const [num, name = ''] = cells(body[0] ?? '');
      const id = slugify(name || num);
      toc.push({ id, title: name || num, level: 2 });
      return `<div class="press-chapter" id="${id}"><span class="press-chapter-num">${esc(num)}</span><h2 class="press-chapter-title">${inline(name)}</h2></div>`;
    }
    case 'statement':
      return `<p class="press-statement">${inline(body.join(' '))}</p>`;
    case 'pull':
      return `<blockquote class="press-pull"><p>${inline(body.join(' '))}</p>${title ? `<cite>${inline(title)}</cite>` : ''}</blockquote>`;
    case 'aside':
      return `<aside class="press-aside">${title ? `<p class="press-aside-title">${inline(title)}</p>` : ''}${body.map((l) => `<p>${inline(l)}</p>`).join('')}</aside>`;
    case 'figures':
      return `<div class="press-figures">${body
        .map((l) => {
          const [v, label = ''] = cells(l);
          return `<div class="press-figure"><span class="press-figure-v">${inline(v)}</span><span class="press-figure-l">${inline(label)}</span></div>`;
        })
        .join('')}</div>`;
    case 'timeline':
      return `<ol class="press-timeline">${title ? `<li class="press-timeline-title">${inline(title)}</li>` : ''}${body
        .map((l) => {
          const [t, text = ''] = cells(l);
          return `<li><time>${inline(t)}</time><p>${inline(text)}</p></li>`;
        })
        .join('')}</ol>`;
    case 'ledger': {
      const [head, ...rest] = body;
      const h = cells(head ?? '');
      return `<div class="press-ledger" role="table">${title ? `<p class="press-ledger-title">${inline(title)}</p>` : ''}<div class="press-ledger-row press-ledger-head" role="row">${h
        .map((c) => `<span role="columnheader">${inline(c)}</span>`)
        .join('')}</div>${rest
        .map((l) => {
          const c = cells(l);
          const verdict = (c[c.length - 1] ?? '').toLowerCase().split(/\s/)[0].replace(/[^a-z]/g, '');
          const cls = VERDICTS.includes(verdict) ? ` press-v-${verdict}` : '';
          return `<div class="press-ledger-row${cls}" role="row">${c
            .map((x, i) => `<span role="cell"${i < h.length ? ` data-label="${esc(h[i])}"` : ''}><span class="press-cell">${inline(x)}</span></span>`)
            .join('')}</div>`;
        })
        .join('')}</div>`;
    }
    case 'receipt':
      return `<div class="press-receipt">${title ? `<p class="press-receipt-title">${inline(title)}</p>` : ''}${body
        .map((l) => {
          const total = l.startsWith('=');
          const [item, amount = ''] = cells(total ? l.slice(1).trim() : l);
          return `<div class="press-receipt-row${total ? ' press-receipt-total' : ''}"><span>${inline(item)}</span><span class="press-receipt-dots" aria-hidden="true"></span><span>${inline(amount)}</span></div>`;
        })
        .join('')}</div>`;
    case 'checklist':
      return `<ul class="press-checklist">${title ? `<li class="press-checklist-title">${inline(title)}</li>` : ''}${body
        .map((l) => {
          const [state, text = ''] = cells(l);
          const s = ['pass', 'fail', 'open'].includes(state.toLowerCase()) ? state.toLowerCase() : 'open';
          const label = s === 'pass' ? 'Passed' : s === 'fail' ? 'Failed' : 'Open';
          return `<li class="press-check-${s}"><span class="press-check-mark" aria-label="${label}"></span><p>${inline(text)}</p></li>`;
        })
        .join('')}</ul>`;
    case 'frames':
      return `<div class="press-frames">${title ? `<p class="press-frames-title">${inline(title)}</p>` : ''}<div class="press-frames-grid">${body
        .map((l) => {
          const [n, cap = ''] = cells(l);
          return `<figure class="press-frame"><span class="press-frame-n">${inline(n)}</span><figcaption>${inline(cap)}</figcaption></figure>`;
        })
        .join('')}</div></div>`;
    default:
      return body.map((l) => `<p class="press-p">${inline(l)}</p>`).join('');
  }
}

export function renderPress(markdown: string): { html: string; toc: TocItem[] } {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  const toc: TocItem[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let firstPara = true;

  const flushPara = () => {
    if (!para.length) return;
    out.push(`<p class="press-p${firstPara ? ' press-lead' : ''}">${inline(para.join(' '))}</p>`);
    firstPara = false;
    para = [];
  };
  const flushList = () => {
    if (!list) return;
    const tag = list.ordered ? 'ol' : 'ul';
    out.push(`<${tag} class="press-list">${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${tag}>`);
    list = null;
  };
  const flush = () => {
    flushPara();
    flushList();
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const fence = line.match(/^```(\w+)?\s*$/);
    if (fence) {
      flush();
      const code: string[] = [];
      while (++i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i]);
      out.push(`<pre class="press-code"><code>${esc(code.join('\n'))}</code></pre>`);
      continue;
    }

    const block = line.match(/^:::(\w+)\s*(.*)$/);
    if (block) {
      flush();
      const rows: string[] = [];
      while (++i < lines.length && !/^:::\s*$/.test(lines[i])) rows.push(lines[i]);
      out.push(renderBlock(block[1].toLowerCase(), block[2].trim(), rows, toc));
      continue;
    }

    const h = line.match(/^(#{2,3})\s+(.+)$/);
    if (h) {
      flush();
      const level = h[1].length;
      const id = slugify(h[2]);
      toc.push({ id, title: h[2].replace(/[`*]/g, ''), level });
      out.push(`<h${level} id="${id}" class="press-h${level}">${inline(h[2])}</h${level}>`);
      continue;
    }

    if (/^---\s*$/.test(line)) {
      flush();
      out.push('<hr class="press-rule" />');
      continue;
    }

    const q = line.match(/^>\s?(.*)$/);
    if (q) {
      flush();
      const quote = [q[1]];
      while (i + 1 < lines.length && /^>\s?/.test(lines[i + 1])) quote.push(lines[++i].replace(/^>\s?/, ''));
      out.push(`<blockquote class="press-quote"><p>${inline(quote.join(' '))}</p></blockquote>`);
      continue;
    }

    const li = line.match(/^(\d+\.|[-*])\s+(.+)$/);
    if (li) {
      flushPara();
      const ordered = /\d/.test(li[1]);
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }
      list.items.push(li[2]);
      continue;
    }

    if (line.trim() === '') {
      flush();
      continue;
    }

    flushList();
    para.push(line.trim());
  }
  flush();

  return { html: out.join('\n'), toc };
}
