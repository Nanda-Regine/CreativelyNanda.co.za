'use client';

import PoemAudio from '@/components/poetry/PoemAudio';

// VoicePlayer — Nanda reading the poem in her own voice. A thin wrapper over the
// existing PoemAudio (which renders nothing when no recording exists), kept as a
// seam for the future ElevenLabs voice pipeline (voice_url) without touching the
// room's markup.

export default function VoicePlayer({ src, title }: { src?: string; title: string }) {
  if (!src) return null;
  return (
    <div className="mx-auto max-w-2xl">
      <PoemAudio src={src} title={title} />
    </div>
  );
}
