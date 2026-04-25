import { useState } from 'react'

export default function FlipCard({ myth, fact }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`flip-card pressable${flipped ? ' flipped' : ''}`}
      style={{ width: '100%', height: '120px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div
          className="flip-card-front"
          style={{
            background: '#1C1C2E',
            border: '1px solid rgba(255,77,109,0.3)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '10px', color: '#FF4D6D', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Myth
            </div>
            <p style={{ fontSize: '13px', color: '#F0F0F0', lineHeight: 1.5 }}>{myth}</p>
          </div>
          <div style={{ fontSize: '11px', color: '#6B6B7A', textAlign: 'right' }}>Tap to reveal →</div>
        </div>

        {/* Back */}
        <div
          className="flip-card-back"
          style={{
            background: '#1C1C2E',
            border: '1px solid rgba(0,214,143,0.3)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <div style={{ fontSize: '10px', color: '#00D68F', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Fact
          </div>
          <p style={{ fontSize: '13px', color: '#F0F0F0', lineHeight: 1.5 }}>{fact}</p>
        </div>
      </div>
    </div>
  )
}
