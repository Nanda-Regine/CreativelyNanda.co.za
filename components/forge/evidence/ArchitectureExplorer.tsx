'use client';

import { useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { ArchLayer, ArchNode } from '@/lib/data/evidence/types';
import { track } from '@/lib/analytics';
import { GOLD, GOLD_INK, ink, Rule } from '../ForgeChrome';
import { ClaimFigure } from './ClaimFigure';

const LAYERS: { key: ArchLayer; label: string }[] = [
  { key: 'clients', label: 'Clients' },
  { key: 'edge', label: 'Edge' },
  { key: 'data', label: 'Data' },
  { key: 'ai', label: 'AI' },
  { key: 'jobs', label: 'Jobs' },
  { key: 'ops', label: 'Ops' },
];

const VB_W = 760;
const LABEL_W = 84;
const ROW_H = 96;
const NODE_H = 54;
const NODE_MAX_W = 136;
const GAP = 12;

/** Split a label into at most two lines of roughly 17 characters. */
function wrap(label: string): string[] {
  const words = label.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    if (cur && (cur + ' ' + w).length > 17) {
      lines.push(cur);
      cur = w;
    } else {
      cur = cur ? cur + ' ' + w : w;
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 2);
}

interface Placed {
  node: ArchNode;
  cx: number;
  cy: number;
  w: number;
}

export default function ArchitectureExplorer({ nodes, title, app = 'adminos' }: { nodes: ArchNode[]; title: string; app?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const opener = useRef<Element | null>(null);

  const rows = useMemo(
    () => LAYERS.map((l) => ({ ...l, nodes: nodes.filter((n) => n.layer === l.key) })).filter((r) => r.nodes.length > 0),
    [nodes],
  );

  const placed = useMemo(() => {
    const map = new Map<string, Placed>();
    const avail = VB_W - LABEL_W - 8;
    rows.forEach((row, ri) => {
      const n = row.nodes.length;
      const w = Math.min(NODE_MAX_W, (avail - GAP * (n - 1)) / n);
      const total = w * n + GAP * (n - 1);
      const start = LABEL_W + (avail - total) / 2;
      row.nodes.forEach((node, i) => {
        map.set(node.id, { node, cx: start + i * (w + GAP) + w / 2, cy: ri * ROW_H + ROW_H / 2, w });
      });
    });
    return map;
  }, [rows]);

  const edges = useMemo(() => {
    const seen = new Set<string>();
    const out: { key: string; a: Placed; b: Placed }[] = [];
    nodes.forEach((n) =>
      (n.edges ?? []).forEach((to) => {
        const a = placed.get(n.id);
        const b = placed.get(to);
        if (!a || !b) return;
        const key = [n.id, to].sort().join('|');
        if (seen.has(key)) return;
        seen.add(key);
        out.push({ key, a, b });
      }),
    );
    return out;
  }, [nodes, placed]);

  const active = openId ? nodes.find((n) => n.id === openId) ?? null : null;

  function activate(id: string, el: Element) {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    opener.current = el;
    setOpenId(id);
    track('evidence_arch_node', { app, node: id });
  }

  function close() {
    setOpenId(null);
    const el = opener.current;
    if (el instanceof HTMLElement || el instanceof SVGElement) el.focus();
  }

  const btnBase =
    'flex min-h-[44px] w-full items-center rounded border px-4 py-2 text-left text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  return (
    <section
      aria-labelledby="arch-title"
      className="px-5 py-14 sm:px-8 md:py-20"
      onKeyDown={(e) => {
        if (e.key === 'Escape' && openId) {
          e.stopPropagation();
          close();
        }
      }}
    >
      <div className="mx-auto max-w-6xl">
        <Rule label="Architecture" />
        <h2
          id="arch-title"
          className="mt-4 font-display text-3xl italic leading-tight sm:text-4xl"
          style={{ color: ink(0.95) }}
        >
          {title}
        </h2>
        <p className="mt-2 text-sm" style={{ color: ink(0.75) }}>
          Choose a part to see what it does, why it is there and what it cost.
        </p>

        <div className="mt-8 md:grid md:grid-cols-[minmax(0,1fr)_300px] md:gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Vertical list, under md */}
          <div className="space-y-6 md:hidden">
            {rows.map((row) => (
              <div key={row.key}>
                <h3 className="font-mono text-xs uppercase tracking-widest" style={{ color: GOLD_INK }}>
                  {row.label}
                </h3>
                <ul className="mt-2 space-y-2">
                  {row.nodes.map((n) => (
                    <li key={n.id}>
                      <button
                        type="button"
                        aria-expanded={openId === n.id}
                        onClick={(e) => activate(n.id, e.currentTarget)}
                        className={btnBase}
                        style={{
                          borderColor: openId === n.id ? GOLD : ink(0.25),
                          color: ink(0.92),
                          background: openId === n.id ? ink(0.06) : 'transparent',
                        }}
                      >
                        {n.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* SVG diagram, md and up */}
          <div className="hidden md:block">
            <svg
              viewBox={`0 0 ${VB_W} ${rows.length * ROW_H}`}
              width="100%"
              role="group"
              aria-label={`${title}: diagram`}
              className="h-auto w-full"
            >
              {rows.map((row, ri) => (
                <g key={row.key}>
                  <line x1={0} x2={VB_W} y1={ri * ROW_H} y2={ri * ROW_H} stroke={ink(0.12)} strokeWidth={1} />
                  <text
                    x={4}
                    y={ri * ROW_H + ROW_H / 2 + 4}
                    fontSize={12}
                    className="font-mono"
                    style={{ fill: GOLD_INK, textTransform: 'uppercase', letterSpacing: '0.08em' }}
                  >
                    {row.label}
                  </text>
                </g>
              ))}
              {edges.map(({ key, a, b }) => (
                <line
                  key={key}
                  x1={a.cx}
                  y1={a.cy}
                  x2={b.cx}
                  y2={b.cy}
                  stroke={ink(0.28)}
                  strokeWidth={1}
                  aria-hidden="true"
                />
              ))}
              {Array.from(placed.values()).map(({ node, cx, cy, w }) => {
                const sel = openId === node.id;
                const lines = wrap(node.label);
                return (
                  <g
                    key={node.id}
                    role="button"
                    tabIndex={0}
                    aria-label={node.label}
                    aria-expanded={sel}
                    className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-[3]"
                    onClick={(e) => activate(node.id, e.currentTarget)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        activate(node.id, e.currentTarget);
                      }
                    }}
                  >
                    <rect
                      x={cx - w / 2}
                      y={cy - NODE_H / 2}
                      width={w}
                      height={NODE_H}
                      rx={6}
                      style={{
                        fill: sel ? 'var(--card, transparent)' : 'var(--stock, transparent)',
                        stroke: sel ? GOLD : ink(0.55),
                      }}
                      strokeWidth={sel ? 2 : 1}
                    />
                    <text textAnchor="middle" fontSize={13} style={{ fill: ink(0.95) }}>
                      {lines.map((ln, i) => (
                        <tspan key={ln} x={cx} y={cy + (i - (lines.length - 1) / 2) * 15 + 4}>
                          {ln}
                        </tspan>
                      ))}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detail panel: aside on md+, below the diagram under md */}
          <div className="mt-6 md:mt-0" aria-live="polite">
            {active ? (
              <aside
                aria-label={`${active.label} details`}
                className="rounded border p-5"
                style={{ borderColor: GOLD, background: 'var(--card, transparent)' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl leading-tight" style={{ color: ink(0.95) }}>
                    {active.label}
                  </h3>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close details"
                    className="-mr-2 -mt-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded focus:outline-none focus-visible:ring-2"
                    style={{ color: ink(0.85) }}
                  >
                    <X size={20} aria-hidden="true" />
                  </button>
                </div>
                <dl className="mt-3 space-y-4 text-sm leading-relaxed" style={{ color: ink(0.88) }}>
                  <Item term="What" text={active.what} />
                  <Item term="Why" text={active.why} />
                  <Item term="Alternative" text={active.alternative} />
                  {active.cost ? <Item term="Cost" text={active.cost} /> : null}
                  {active.wentWrong ? <Item term="What went wrong" text={active.wentWrong} /> : null}
                </dl>
                {active.claimIds && active.claimIds.length > 0 ? (
                  <div className="mt-5">
                    <ul className="space-y-4">
                      {active.claimIds.map((cid) => (
                        <li key={cid}>
                          <ClaimFigure id={cid} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </aside>
            ) : (
              <p className="hidden text-sm md:block" style={{ color: ink(0.7) }}>
                Nothing selected yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({ term, text }: { term: string; text: string }) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-widest" style={{ color: GOLD_INK }}>
        {term}
      </dt>
      <dd className="mt-1">{text}</dd>
    </div>
  );
}
