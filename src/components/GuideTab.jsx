export default function GuideTab({ tabs, activeTab, onTabChange }) {
  return (
    <div
      className="no-scrollbar"
      style={{
        display: 'flex',
        overflowX: 'auto',
        flexWrap: 'nowrap',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        gap: '4px',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              background: isActive ? 'rgba(255,153,51,0.15)' : 'transparent',
              color: isActive ? '#FF9933' : '#6B6B7A',
              border: 'none',
              borderBottom: isActive ? '2px solid #FF9933' : '2px solid transparent',
              fontSize: '13px',
              padding: '10px 16px',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontWeight: isActive ? 500 : 400,
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
