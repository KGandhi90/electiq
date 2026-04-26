import { useRef, useEffect, useState } from 'react'

export default function GuideTab({ tabs, activeTab, onTabChange }) {
  const [lineStyle, setLineStyle] = useState({ transform: 'translateX(0px)', width: 0 })
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const activeIndex = tabs.findIndex(t => t.id === activeTab)
    const activeEl = containerRef.current.children[activeIndex]
    if (activeEl) {
      setLineStyle({
        transform: `translateX(${activeEl.offsetLeft}px)`,
        width: activeEl.offsetWidth,
      })
    }
  }, [activeTab, tabs])

  return (
    <div
      className="no-scrollbar"
      ref={containerRef}
      style={{
        position: 'relative',
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
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          background: '#FF9933',
          transition: 'all 0.2s ease',
          transform: lineStyle.transform,
          width: lineStyle.width,
        }}
      />
    </div>
  )
}
