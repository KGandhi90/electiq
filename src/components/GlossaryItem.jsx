export default function GlossaryItem({ term, definition, isLast }) {
  return (
    <div
      style={{
        padding: '14px 0',
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{ fontSize: '14px', color: '#F0F0F0', fontWeight: 500 }}>{term}</div>
      <div style={{ fontSize: '13px', color: '#6B6B7A', marginTop: '4px', lineHeight: 1.55 }}>{definition}</div>
    </div>
  )
}
