'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2 } from 'lucide-react';

/**
 * "Hear Nanda read it" — an audio player that renders ONLY when a recording
 * exists for the poem. Add `audioUrl` to a poem in poems-data.ts and this
 * appears automatically; until then it stays invisible.
 */
export default function PoemAudio({ src, title }: { src?: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!src) return null;

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="inline-flex items-center gap-3 rounded-full bg-white/10 border border-white/15 backdrop-blur pl-2 pr-5 py-2">
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.92 }}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-cherry text-white shadow-md"
        aria-label={playing ? `Pause reading of ${title}` : `Hear Nanda read ${title}`}
      >
        {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-0.5" />}
      </motion.button>
      <div className="flex items-center gap-2 text-cream/80">
        <Volume2 className="w-4 h-4" />
        <span className="text-sm font-medium">Hear Nanda read it — in her own voice</span>
      </div>
      <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} preload="none" />
    </div>
  );
}
