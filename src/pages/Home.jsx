import { useNavigate } from 'react-router-dom'
import { GitBranch, BookOpen, MessageCircle, Brain, ChevronRight } from 'lucide-react'
import FactStrip from '../components/FactStrip'
import StatusBadge from '../components/StatusBadge'
import { electionTypes } from '../data/mockData'

const quickCards = [
  { icon: GitBranch,     color: '#FF9933', title: 'Election Timeline', subtitle: '9 phases explained',   path: '/timeline' },
  { icon: BookOpen,      color: '#4A7FE8', title: 'How to Vote',       subtitle: 'Step by step guide',   path: '/guide'    },
  { icon: MessageCircle, color: '#C8F135', title: 'Ask ElectIQ AI',    subtitle: 'Get instant answers',  path: '/chat'     },
  { icon: Brain,         color: '#7C6AFA', title: 'Take the Quiz',     subtitle: 'Test your knowledge',  path: '/quiz'     },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="page-enter py-5 md:py-8 lg:py-10">
      {/* Hero */}
      <div style={{ marginBottom: '24px' }}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1 }}>
          Elect<span style={{ color: '#FF9933' }}>I</span>Q
        </h1>
        <p style={{ fontSize: '14px', color: '#6B6B7A', marginTop: '6px' }}>India's elections, explained simply.</p>
        <div style={{ marginTop: '14px', width: '60px', height: '2px', background: 'linear-gradient(to right, #FF9933, #1A4FBA)', borderRadius: '2px' }} />
      </div>

      {/* Fact Strip */}
      <FactStrip />

      {/* Election Types */}
      <div style={{ marginTop: '28px' }}>
        <p style={{ fontSize: '11px', color: '#6B6B7A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 500 }}>
          Election Types
        </p>
        {/* Mobile: horizontal scroll | md+: 3-col grid | lg+: 5-col grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {electionTypes.map((type) => <ElectionCard key={type.id} type={type} />)}
        </div>
        <div className="flex md:hidden no-scrollbar" style={{ gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
          {electionTypes.map((type) => <ElectionCard key={type.id} type={type} mobile />)}
        </div>
      </div>

      {/* Quick Entry Grid */}
      <div style={{ marginTop: '28px' }}>
        <p style={{ fontSize: '11px', color: '#6B6B7A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 500 }}>
          Explore
        </p>
        {/* 2-col on mobile, 4-col on sm+ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {quickCards.map(({ icon: Icon, color, title, subtitle, path }) => (
            <div
              key={path}
              className="pressable"
              onClick={() => navigate(path)}
              style={{
                background: '#13131E',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                minHeight: '120px',
              }}
            >
              <Icon size={22} color={color} strokeWidth={1.5} />
              <p style={{ fontSize: '14px', color: '#F0F0F0', fontWeight: 500, marginTop: '14px' }}>{title}</p>
              <p style={{ fontSize: '11px', color: '#6B6B7A', marginTop: '4px' }}>{subtitle}</p>
              <ChevronRight size={14} color="#6B6B7A" style={{ position: 'absolute', bottom: '16px', right: '16px' }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: '16px' }} />
    </div>
  )
}

function ElectionCard({ type, mobile }) {
  return (
    <div
      className="pressable"
      style={{
        minWidth: mobile ? '160px' : undefined,
        background: '#13131E',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        padding: '16px',
        flexShrink: mobile ? 0 : undefined,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '22px' }}>{type.icon}</span>
        <StatusBadge status="info" />
      </div>
      <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', color: '#F0F0F0', marginTop: '12px', fontWeight: 600 }}>{type.name}</p>
      <p style={{ fontSize: '11px', color: '#6B6B7A', marginTop: '2px' }}>
        {type.seats ? `${type.seats.toLocaleString()} seats` : 'Local bodies'}
      </p>
      <p style={{ fontSize: '11px', color: '#6B6B7A', marginTop: '8px', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {type.description}
      </p>
    </div>
  )
}
