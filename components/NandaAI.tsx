'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface NandaAIProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialMessage?: string;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Sawubona! 👋 I'm Nanda AI — ask me anything about my work, consulting offers, Notion templates, or how I can help your business.",
};

export default function NandaAI({ isOpen: externalOpen, onClose, initialMessage }: NandaAIProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // External open control (from NandaGirl)
  useEffect(() => {
    if (externalOpen !== undefined) {
      setIsOpen(externalOpen);
      if (externalOpen) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [externalOpen]);

  // Pre-fill initial message from speech bubble
  useEffect(() => {
    if (initialMessage && isOpen) {
      setInput(initialMessage);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [initialMessage, isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const open = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const close = () => {
    setIsOpen(false);
    onClose?.();
    if (abortRef.current) abortRef.current.abort();
  };

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userMsg: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsStreaming(true);

    // Add empty assistant message to stream into
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error('Request failed');
      if (!res.body) throw new Error('No body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: updated[updated.length - 1].content + parsed.text,
                };
                return updated;
              });
            }
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: "Something went wrong. Email hello@mirembemuse.co.za directly.",
          };
          return updated;
        });
      }
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Don't render on admin pages
  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      {/* ── Toggle button (bottom-right) ───────────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="toggle"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={open}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-navy text-white rounded-full shadow-2xl hover:bg-cherry transition-colors flex items-center justify-center font-display text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry"
            aria-label="Open Nanda AI chat"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            💬
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat panel ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed bottom-6 right-6 z-40 w-[360px] max-w-[calc(100vw-1.5rem)] h-[520px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-[#1A1A1A]/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-navy px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center font-display font-bold text-navy text-sm">
                  N
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Nanda AI</p>
                  <p className="text-white/50 text-[11px]">Powered by Claude · Ask me anything</p>
                </div>
              </div>
              <button
                onClick={close}
                className="text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FAFAF8]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-navy text-white rounded-br-sm'
                        : 'bg-white border border-[#1A1A1A]/10 text-[#1A1A1A] rounded-bl-sm'
                    }`}
                  >
                    {msg.content || (
                      <span className="inline-flex gap-1 items-center text-[#9B9B9B]">
                        <motion.span animate={{ opacity: [0.3,1,0.3] }} transition={{ duration:0.8, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-current" />
                        <motion.span animate={{ opacity: [0.3,1,0.3] }} transition={{ duration:0.8, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-current" />
                        <motion.span animate={{ opacity: [0.3,1,0.3] }} transition={{ duration:0.8, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-current" />
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[#1A1A1A]/10 px-4 py-3 flex gap-2 bg-white shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask Nanda anything…"
                disabled={isStreaming}
                className="flex-1 bg-[#F2F0EB] rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-[#9B9B9B] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isStreaming}
                className="w-10 h-10 bg-[#C9A84C] text-[#1A1A1A] rounded-xl flex items-center justify-center hover:bg-[#C9A84C]/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                aria-label="Send message"
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
