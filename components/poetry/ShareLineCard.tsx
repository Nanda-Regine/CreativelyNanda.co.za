'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Quote } from 'lucide-react';
import type { Poem } from '@/lib/poems-data';

/**
 * "Highlight a line → share it as art." The reader picks a line from the poem
 * and we render a branded, IG-ready square image on a canvas. Every share is
 * marketing in Nanda's exact aesthetic. Pure client-side, no backend.
 */
export default function ShareLineCard({
  poem,
  open,
  onClose,
}: {
  poem: Poem;
  open: boolean;
  onClose: () => void;
}) {
  const lines = poem.content.split('\n').map((l) => l.trim()).filter(Boolean);
  const [selected, setSelected] = useState<string>(lines[0] || '');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState('');

  // Redraw whenever the selected line changes
  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const S = 1080;
    canvas.width = S;
    canvas.height = S;

    // Background — deep navy with a rose glow
    ctx.fillStyle = '#0A1128';
    ctx.fillRect(0, 0, S, S);
    const glow = ctx.createRadialGradient(S * 0.8, S * 0.2, 50, S * 0.8, S * 0.2, 700);
    glow.addColorStop(0, 'rgba(194,30,86,0.35)');
    glow.addColorStop(1, 'rgba(194,30,86,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, S, S);

    // Cherry accent bar
    ctx.fillStyle = '#c21e56';
    ctx.fillRect(120, 250, 90, 8);

    // Quote mark
    ctx.fillStyle = 'rgba(201,148,58,0.6)';
    ctx.font = 'bold 160px Georgia, serif';
    ctx.fillText('“', 108, 260);

    // The line — wrapped, centred vertically-ish
    ctx.fillStyle = '#F5F1E8';
    ctx.font = 'italic 60px Georgia, serif';
    ctx.textBaseline = 'top';
    const maxWidth = S - 240;
    const words = selected.split(' ');
    const wrapped: string[] = [];
    let current = '';
    for (const w of words) {
      const test = current ? `${current} ${w}` : w;
      if (ctx.measureText(test).width > maxWidth && current) {
        wrapped.push(current);
        current = w;
      } else {
        current = test;
      }
    }
    if (current) wrapped.push(current);

    const lineHeight = 82;
    let y = 340;
    for (const w of wrapped.slice(0, 6)) {
      ctx.fillText(w, 120, y);
      y += lineHeight;
    }

    // Footer — attribution + brand
    ctx.fillStyle = '#c21e56';
    ctx.font = '600 34px Georgia, serif';
    ctx.fillText('Nanda Regine', 120, S - 180);

    ctx.fillStyle = 'rgba(245,241,232,0.55)';
    ctx.font = '28px Georgia, serif';
    ctx.fillText(`“${poem.title}”  ·  Inside Her Roses`, 120, S - 128);
    ctx.fillText('creativelynanda.co.za', 120, S - 88);

    setDataUrl(canvas.toDataURL('image/png'));
  }, [selected, open, poem.title]);

  const download = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${poem.slug}-line.png`;
    a.click();
  };

  const share = async () => {
    if (!dataUrl) return;
    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `${poem.slug}-line.png`, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: poem.title,
          text: `A line from "${poem.title}" by Nanda Regine`,
        });
        return;
      }
    } catch {
      /* fall through to download */
    }
    download();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-parchment rounded-3xl p-6 max-w-lg w-full my-8"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-navy/50 hover:text-navy" aria-label="Close">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1 text-cherry">
              <Quote className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide uppercase">Share a line</span>
            </div>
            <p className="text-navy/60 text-sm mb-4">Pick the line that stayed with you.</p>

            {/* Live preview */}
            <div className="rounded-2xl overflow-hidden mb-4 border border-navy/10">
              {dataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={dataUrl} alt="Shareable card preview" className="w-full block" />
              ) : (
                <div className="aspect-square bg-navy" />
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />

            {/* Line chooser */}
            <div className="max-h-40 overflow-y-auto rounded-xl bg-white/60 border border-navy/10 p-2 mb-4 space-y-1">
              {lines.map((line, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(line)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selected === line ? 'bg-cherry text-white' : 'text-navy hover:bg-cherry/10'
                  }`}
                >
                  {line}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={share}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-cherry text-white py-3 font-medium hover:bg-cherry-dark transition-colors"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button
                onClick={download}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 text-navy px-5 py-3 font-medium hover:bg-navy/5 transition-colors"
              >
                <Download className="w-4 h-4" /> Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
