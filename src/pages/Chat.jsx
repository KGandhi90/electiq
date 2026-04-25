import { useRef } from 'react'
import { SendHorizontal } from 'lucide-react'
import ChatBubble from '../components/ChatBubble'
import { chatSeedMessages } from '../data/mockData'

const quickChips = [
  'How do I register?',
  'What is EVM?',
  'Lok Sabha vs Vidhan Sabha?',
  'What is NOTA?',
  'How are votes counted?',
  'What is MCC?',
  'Minimum age to vote?',
]

export default function Chat() {
  const inputRef = useRef(null)

  return (
    // Chat gets its own full-height layout; constrained width via inner wrapper
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 52px)' }}>
      {/* Inner max-width container — constrains everything on wide screens */}
      <div className="max-w-2xl mx-auto w-full" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>

        {/* Chat sub-header */}
        <div style={{ background: '#13131E', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', color: '#F0F0F0', fontWeight: 600 }}>ElectIQ AI</p>
            <p style={{ fontSize: '11px', color: '#6B6B7A', marginTop: '2px' }}>Ask anything about Indian elections</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div className="pulse" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FF9933' }} />
            <span style={{ fontSize: '11px', color: '#00D68F', fontWeight: 500 }}>Online</span>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          {chatSeedMessages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
        </div>

        {/* Quick chips */}
        <div
          className="no-scrollbar"
          style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '8px 16px', flexShrink: 0, borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          {quickChips.map((chip) => (
            <div
              key={chip}
              className="pressable"
              style={{ background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', fontSize: '12px', color: '#6B6B7A', padding: '6px 14px', whiteSpace: 'nowrap', cursor: 'pointer' }}
            >
              {chip}
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div style={{ background: '#13131E', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px 16px', display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0, marginBottom: '90px' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask about Indian elections..."
            style={{ flex: 1, background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '12px 18px', fontSize: '13px', color: '#F0F0F0', outline: 'none', fontFamily: 'Inter, sans-serif' }}
          />
          <button
            style={{ background: '#FF9933', border: 'none', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            <SendHorizontal size={18} color="#0C0C14" strokeWidth={2} />
          </button>
        </div>

      </div>
    </div>
  )
}
