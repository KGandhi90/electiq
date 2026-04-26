import { useEffect, useRef } from 'react';
import { AlertTriangle, SendHorizontal } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useChat } from '../hooks/useChat';
import ChatBubble from '../components/ChatBubble';
import StatusBadge from '../components/StatusBadge';

const CHIPS = [
  'How do I register to vote?',
  'What is EVM?',
  'Lok Sabha vs Vidhan Sabha?',
  'What is NOTA?',
];

export default function Chat() {
  const { chatSeedMessages } = useAppContext();
  const {
    messages,
    input,
    isTyping,
    setInput,
    sendMessage,
    handleKeyDown,
  } = useChat(chatSeedMessages);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages, isTyping]);

  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="page-enter flex flex-col gap-4" style={{ minHeight: 'calc(100vh - 9rem)' }}>

      {/* ── HEADER ───────────────────────────── */}
      <div className="bg-white border border-surface3 rounded-2xl px-5 py-4 flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-ashoka flex items-center justify-center text-white text-base flex-shrink-0">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-dark">ElectIQ AI</span>
              <StatusBadge label="Beta" variant="ashoka" />
            </div>
            <p className="text-xs text-muted mt-0.5">Indian Politics & Elections Expert</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-success pulse" />
          <span className="text-xs text-success font-semibold">Online</span>
        </div>
      </div>

      {/* ── DISCLAIMER ───────────────────────── */}
      <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-warning rounded-xl px-4 py-3 flex gap-3 items-start flex-shrink-0">
        <AlertTriangle size={15} className="text-warning flex-shrink-0 mt-0.5" />
        <p className="text-xs text-warning leading-relaxed">
          This AI provides general information about Indian elections and politics. For official information, visit <strong>eci.gov.in</strong>
        </p>
      </div>

      {/* ── MESSAGES ─────────────────────────── */}
      <div 
        ref={messagesEndRef}
        className="flex-1 min-h-0 overflow-y-auto no-scrollbar bg-white border border-surface3 rounded-2xl p-4 sm:p-5 flex flex-col gap-5"
        role="log"
        aria-label="Conversation with ElectIQ AI"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((m) => (
          <ChatBubble key={m.id} role={m.role} content={m.content} timestamp={m.timestamp} />
        ))}
        
        {isTyping && (
          <div 
            className="flex justify-start gap-3 items-start page-enter"
            role="status"
            aria-label="ElectIQ AI is typing"
            aria-live="polite"
          >
            <div className="w-8 h-8 rounded-xl bg-ashoka flex items-center justify-center text-white text-xs font-mono flex-shrink-0 mt-0.5">
              ⚡
            </div>
            <div className="max-w-xs sm:max-w-sm lg:max-w-md">
              <div className="bg-white border border-surface3 rounded-2xl rounded-bl-sm px-4 py-4">
                <span className="flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span 
                      key={i} 
                      className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" 
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── QUICK CHIPS ──────────────────────── */}
      {messages.length <= 2 && (
        <div className="flex flex-wrap gap-2 flex-shrink-0 page-enter transition-all" role="group" aria-label="Suggested questions">
          {CHIPS.map((chip) => (
            <button
              key={chip}
              role="button"
              tabIndex={0}
              onClick={() => sendMessage(chip)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  sendMessage(chip);
                }
              }}
              className="text-xs font-medium text-muted bg-white border border-surface3 hover:border-saffron hover:text-saffron hover:bg-orange-50 rounded-lg px-3 py-2 transition-all duration-150 cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* ── INPUT ────────────────────────────── */}
      <div className="bg-white border border-surface3 rounded-2xl p-3 flex gap-3 items-end flex-shrink-0">
        <textarea
          rows={1}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Indian elections, parties, Constitution…"
          aria-label="Message ElectIQ AI"
          aria-multiline="true"
          className="flex-1 bg-transparent outline-none text-sm text-dark placeholder-muted resize-none leading-relaxed min-h-[2.5rem] max-h-32 py-2 pl-2 no-scrollbar"
        />
        <button 
          onClick={() => sendMessage()}
          disabled={!input.trim()}
          aria-label="Send message"
          aria-disabled={!input.trim()}
          className={`w-10 h-10 rounded-xl bg-ashoka hover:bg-blue-800 flex items-center justify-center text-white transition-colors duration-150 flex-shrink-0 ${!input.trim() ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
        >
          <SendHorizontal size={16} strokeWidth={2} />
        </button>
      </div>

    </div>
  );
}
