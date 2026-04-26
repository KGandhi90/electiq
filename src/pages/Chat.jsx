import { useState, useRef, useEffect, useContext } from 'react'
import { SendHorizontal } from 'lucide-react'
import ChatBubble from '../components/ChatBubble'
import { AppContext } from '../context/AppContext'

const quickChips = [
  'How do I register?',
  'What is EVM?',
  'Lok Sabha vs Vidhan Sabha?',
  'What is NOTA?',
  'How are votes counted?',
  'What is MCC?',
  'Minimum age to vote?',
]

const getMockResponse = (text) => {
  const lower = text.toLowerCase()
  if (lower.includes('register') || lower.includes('registration')) {
    return "Registering is simple! Visit voters.eci.gov.in, fill Form 6, and submit your age + address proof. You can also register through the Voter Helpline App or your local Booth Level Officer."
  }
  if (lower.includes('evm') || lower.includes('machine') || lower.includes('vote machine')) {
    return "EVMs are standalone electronic devices with zero internet or wireless connectivity — making remote hacking impossible. They've been used in Indian elections since 1999 and are tested multiple times before polling."
  }
  if (lower.includes('lok sabha') || lower.includes('vidhan sabha') || lower.includes('difference')) {
    return "Lok Sabha is the lower house of Parliament — 543 seats, citizens vote directly, 5-year term. Vidhan Sabha is the State Assembly — each state has its own with varying seat counts. Both use the First Past The Post system."
  }
  if (lower.includes('nota')) {
    return "NOTA stands for None Of The Above. Introduced in 2013 by a Supreme Court order, it lets you formally reject all candidates. NOTA votes are counted and published, but don't affect the outcome — the candidate with the most votes still wins."
  }
  if (lower.includes('count') || lower.includes('counting') || lower.includes('counted')) {
    return "After polling, EVMs are stored in strong rooms under CCTV and armed guard. On counting day, votes are tallied at counting centres under strict observation by candidates and their agents."
  }
  if (lower.includes('mcc') || lower.includes('model code')) {
    return "The Model Code of Conduct kicks in the moment elections are announced. It prevents the ruling party from announcing new schemes, using government resources for campaigns, or transferring key officials until results are declared."
  }
  if (lower.includes('age') || lower.includes('minimum age') || lower.includes('18')) {
    return "The minimum voting age in India is 18 years, reduced from 21 by the 61st Constitutional Amendment in 1989."
  }
  return "Great question! Indian elections are a fascinating topic. You can explore the Election Timeline, read the How to Vote guide, or try the Quiz — I'm also happy to answer specific questions here!"
}

export default function Chat() {
  const { chatMessages, setChatMessages } = useContext(AppContext)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages, isTyping])

  const handleSend = (text) => {
    const msgText = typeof text === 'string' ? text : inputValue
    if (!msgText.trim()) return

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: msgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setChatMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: getMockResponse(msgText),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setChatMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 52px)' }}>
      <div className="max-w-2xl mx-auto w-full" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        
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

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          {chatMessages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          
          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 20px', background: '#13131E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', alignSelf: 'flex-start', maxWidth: '80%', marginBottom: '16px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', animation: 'typingDot 1s infinite ease' }} />
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', animation: 'typingDot 1s infinite ease 0.2s' }} />
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', animation: 'typingDot 1s infinite ease 0.4s' }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div
          className="no-scrollbar"
          style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '8px 16px', flexShrink: 0, borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          {quickChips.map((chip) => (
            <div
              key={chip}
              onClick={() => handleSend(chip)}
              className="pressable"
              style={{ background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', fontSize: '12px', color: '#6B6B7A', padding: '6px 14px', whiteSpace: 'nowrap', cursor: 'pointer' }}
            >
              {chip}
            </div>
          ))}
        </div>

        <div style={{ background: '#13131E', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px 16px', display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0, marginBottom: '90px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Ask about Indian elections..."
            style={{ flex: 1, background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '12px 18px', fontSize: '13px', color: '#F0F0F0', outline: 'none', fontFamily: 'Inter, sans-serif' }}
          />
          <button
            onClick={() => handleSend()}
            style={{ 
              background: '#FF9933', 
              border: 'none', 
              borderRadius: '50%', 
              width: '44px', 
              height: '44px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: inputValue.trim() ? 'pointer' : 'default', 
              flexShrink: 0,
              opacity: inputValue.trim() ? 1 : 0.4,
              pointerEvents: inputValue.trim() ? 'auto' : 'none'
            }}
          >
            <SendHorizontal size={18} color="#0C0C14" strokeWidth={2} />
          </button>
        </div>

      </div>
    </div>
  )
}
