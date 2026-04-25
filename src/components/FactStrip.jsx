import { facts } from '../data/mockData'

export default function FactStrip() {
  const currentIndex = 0
  const fact = facts[currentIndex]

  return (
    <div
      style={{
        background: '#13131E',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        padding: '16px',
        width: '100%',
      }}
    >
      <div style={{ fontSize: '10px', color: '#FF9933', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
        Did You Know
      </div>
      <p style={{ fontSize: '13px', color: '#F0F0F0', marginTop: '8px', lineHeight: 1.55 }}>
        {fact}
      </p>
      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: '5px', marginTop: '12px', alignItems: 'center' }}>
        {facts.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentIndex ? '16px' : '5px',
              height: '5px',
              borderRadius: '9999px',
              background: i === currentIndex ? '#FF9933' : '#6B6B7A',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
