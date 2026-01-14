'use client';
import { useState } from 'react';

export default function NandaAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m Nanda AI, your portfolio assistant. Ask me anything about Nanda\'s work!' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // TODO: Call OpenAI API here
    // For now, placeholder response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'This is a placeholder response. Connect OpenAI API to make me fully functional!'
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-cherry text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center font-display text-2xl"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cherry to-cherry-dark text-white p-4">
            <h3 className="font-display text-xl font-bold">Nanda AI</h3>
            <p className="text-white/80 text-sm">Ask me about Nanda's work</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-beige/20">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-cherry text-white'
                      : 'bg-white text-navy'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-beige/20 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 bg-beige/30 rounded-full border-2 border-transparent focus:border-cherry focus:outline-none text-sm"
              />
              <button
                onClick={handleSend}
                className="px-5 py-2 bg-cherry text-white rounded-full font-medium hover:bg-cherry-dark transition-colors text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}