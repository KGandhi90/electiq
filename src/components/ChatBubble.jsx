export default function ChatBubble({ message }) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: '12px' }}>
        <div
          style={{
            background: 'rgba(255,153,51,0.15)',
            border: '1px solid rgba(255,153,51,0.2)',
            borderRadius: '16px',
            borderBottomRightRadius: '4px',
            maxWidth: '78%',
            padding: '12px 16px',
            fontSize: '13px',
            color: '#F0F0F0',
            lineHeight: 1.5,
          }}
        >
          {message.content}
        </div>
        <span style={{ fontSize: '10px', color: '#6B6B7A', marginTop: '4px' }}>{message.timestamp}</span>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', maxWidth: '82%' }}>
        {/* Avatar */}
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: '#1A4FBA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            flexShrink: 0,
            marginBottom: '16px',
          }}
        >
          ⚡
        </div>
        <div
          style={{
            background: '#1C1C2E',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            borderBottomLeftRadius: '4px',
            padding: '12px 16px',
            fontSize: '13px',
            color: '#F0F0F0',
            lineHeight: 1.6,
          }}
        >
          {message.content}
        </div>
      </div>
      <span style={{ fontSize: '10px', color: '#6B6B7A', marginTop: '4px', paddingLeft: '32px' }}>{message.timestamp}</span>
    </div>
  )
}
