export default function QuizCard({ question, options, selectedIndex, correctIndex, showExplanation, explanation }) {
  const getOptionStyle = (i) => {
    if (selectedIndex === null) {
      return {
        background: '#13131E',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#F0F0F0',
      }
    }
    if (i === correctIndex) {
      return {
        background: 'rgba(0,214,143,0.08)',
        border: '1px solid rgba(0,214,143,0.5)',
        color: '#F0F0F0',
      }
    }
    if (i === selectedIndex && selectedIndex !== correctIndex) {
      return {
        background: 'rgba(255,77,109,0.12)',
        border: '1px solid #FF4D6D',
        color: '#F0F0F0',
      }
    }
    return {
      background: '#13131E',
      border: '1px solid rgba(255,255,255,0.08)',
      color: '#6B6B7A',
    }
  }

  return (
    <div>
      <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', color: '#F0F0F0', lineHeight: 1.4, padding: '0 20px', marginTop: '24px' }}>
        {question}
      </p>
      <div style={{ padding: '0 20px', marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {options.map((opt, i) => (
          <div
            key={i}
            style={{
              ...getOptionStyle(i),
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <span>{opt}</span>
            {selectedIndex !== null && i === correctIndex && (
              <span style={{ color: '#00D68F', fontSize: '16px', fontWeight: 600 }}>✓</span>
            )}
            {selectedIndex !== null && i === selectedIndex && selectedIndex !== correctIndex && (
              <span style={{ color: '#FF4D6D', fontSize: '16px', fontWeight: 600 }}>✗</span>
            )}
          </div>
        ))}
      </div>

      {showExplanation && (
        <div
          style={{
            margin: '16px 20px 0',
            background: '#1C1C2E',
            border: '1px solid rgba(26,79,186,0.3)',
            borderRadius: '12px',
            padding: '14px',
          }}
        >
          <p style={{ fontSize: '13px', color: '#6B6B7A', lineHeight: 1.6 }}>💡 {explanation}</p>
        </div>
      )}
    </div>
  )
}
