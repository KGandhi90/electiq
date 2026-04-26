import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useFactStrip } from '../hooks/useFactStrip'

export default function FactStrip() {
  const { facts } = useContext(AppContext)
  const { currentFact, currentIndex, totalFacts } = useFactStrip(facts)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    setFade(false)
    const timeout = setTimeout(() => setFade(true), 50)
    return () => clearTimeout(timeout)
  }, [currentIndex])

  if (!facts || facts.length === 0) return null

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
      <p style={{ fontSize: '13px', color: '#F0F0F0', marginTop: '8px', lineHeight: 1.55, opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        {currentFact}
      </p>
      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: '5px', marginTop: '12px', alignItems: 'center' }}>
        {Array.from({ length: totalFacts }).map((_, i) => (
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
