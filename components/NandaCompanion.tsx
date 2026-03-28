'use client';

/**
 * NandaCompanion — wires NandaGirl (speech bubbles + character)
 * to NandaAI (Claude-powered chat panel) via shared state.
 *
 * NandaGirl lives bottom-left, NandaAI lives bottom-right.
 * When the user clicks "Reply →" on a speech bubble, the chat opens
 * with the bubble text pre-filled as context.
 */

import { useState } from 'react';
import NandaGirl from './nanda-girl/NandaGirl';
import NandaAI from './NandaAI';

export default function NandaCompanion() {
  const [chatOpen, setChatOpen] = useState(false);
  const [initialMsg, setInitialMsg] = useState<string | undefined>();

  const handleOpenChat = (msg?: string) => {
    setInitialMsg(msg);
    setChatOpen(true);
  };

  return (
    <>
      <NandaGirl onOpenChat={handleOpenChat} />
      <NandaAI
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        initialMessage={initialMsg}
      />
    </>
  );
}
