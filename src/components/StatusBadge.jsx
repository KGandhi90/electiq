const statusConfig = {
  completed: { bg: 'rgba(0,214,143,0.12)',  color: '#00D68F' },
  active:    { bg: 'rgba(255,153,51,0.15)',  color: '#FF9933' },
  upcoming:  { bg: 'rgba(107,107,122,0.15)', color: '#6B6B7A' },
  correct:   { bg: 'rgba(0,214,143,0.12)',   color: '#00D68F' },
  wrong:     { bg: 'rgba(255,77,109,0.12)',   color: '#FF4D6D' },
  info:      { bg: 'rgba(26,79,186,0.15)',   color: '#4A7FE8' },
}

export default function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.info
  return (
    <span
      style={{
        background: cfg.bg,
        color: cfg.color,
        fontSize: '10px',
        fontWeight: 500,
        padding: '2px 10px',
        borderRadius: '9999px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
        display: 'inline-block',
      }}
    >
      {status}
    </span>
  )
}
