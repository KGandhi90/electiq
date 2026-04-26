import { AlertTriangle, SendHorizontal } from 'lucide-react'
import ChatBubble from '../components/ChatBubble'
import StatusBadge from '../components/StatusBadge'
import { chatSeedMessages } from '../data/mockData'

const CHIPS = [
  'How do I register to vote?',
  'What is EVM?',
  'Lok Sabha vs Vidhan Sabha?',
  'What is NOTA?',
]

export default function Chat() {
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
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar bg-white border border-surface3 rounded-2xl p-4 sm:p-5 flex flex-col gap-5">
        {chatSeedMessages.map((m) => (
          <ChatBubble key={m.id} role={m.role} content={m.content} timestamp={m.timestamp} />
        ))}
      </div>

      {/* ── QUICK CHIPS ──────────────────────── */}
      <div className="flex flex-wrap gap-2 flex-shrink-0">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            className="text-xs font-medium text-muted bg-white border border-surface3 hover:border-saffron hover:text-saffron hover:bg-orange-50 rounded-lg px-3 py-2 transition-all duration-150"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* ── INPUT ────────────────────────────── */}
      <div className="bg-white border border-surface3 rounded-2xl p-3 flex gap-3 items-end flex-shrink-0">
        <textarea
          rows={1}
          placeholder="Ask about Indian elections, parties, Constitution…"
          className="flex-1 bg-transparent outline-none text-sm text-dark placeholder-muted resize-none leading-relaxed min-h-[2.5rem] max-h-32 py-1 no-scrollbar"
        />
        <button className="w-10 h-10 rounded-xl bg-ashoka hover:bg-blue-800 flex items-center justify-center text-white transition-colors duration-150 flex-shrink-0">
          <SendHorizontal size={16} strokeWidth={2} />
        </button>
      </div>

    </div>
  )
}
