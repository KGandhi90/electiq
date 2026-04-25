import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import StatusBadge from './StatusBadge'

export default function TimelinePhase({ phase, defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const nodeColor = {
    completed: '#00D68F',
    active: '#FF9933',
    upcoming: 'transparent',
  }
  const nodeBorder = {
    completed: '#00D68F',
    active: '#FF9933',
    upcoming: '#6B6B7A',
  }

  return (
    <div style={{ display: 'flex', gap: '0', marginBottom: '4px' }}>
      {/* Left column: timeline line + node */}
      <div style={{ width: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        {/* Node */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '18px' }}>
          {phase.status === 'active' && (
            <div
              style={{
                position: 'absolute',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'rgba(255,153,51,0.25)',
              }}
              className="pulse"
            />
          )}
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: nodeColor[phase.status],
              border: `2px solid ${nodeBorder[phase.status]}`,
              zIndex: 1,
            }}
          />
        </div>
        {/* Line */}
        <div
          style={{
            flex: 1,
            width: '2px',
            borderLeft: '2px dashed rgba(255,255,255,0.1)',
            minHeight: '24px',
          }}
        />
      </div>

      {/* Right column: card */}
      <div style={{ flex: 1, paddingLeft: '8px', paddingBottom: '8px' }}>
        <div
          className="pressable"
          onClick={() => setExpanded(!expanded)}
          style={{
            background: '#13131E',
            border: phase.status === 'active' ? '1px solid rgba(255,153,51,0.4)' : '1px solid rgba(255,255,255,0.07)',
            borderLeft: phase.status === 'active' ? '2px solid #FF9933' : undefined,
            borderRadius: '16px',
            padding: '14px',
          }}
        >
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{phase.icon}</span>
              <span style={{ fontSize: '14px', color: '#F0F0F0', fontWeight: 500, lineHeight: 1.3 }}>{phase.title}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <StatusBadge status={phase.status} />
              <ChevronDown
                size={14}
                color="#6B6B7A"
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
              />
            </div>
          </div>

          {/* Marker */}
          <p style={{ fontSize: '11px', color: '#6B6B7A', marginTop: '4px', paddingLeft: '26px' }}>{phase.marker}</p>

          {/* Collapsible content */}
          <div className={`collapsible${expanded ? ' open' : ''}`}>
            <div style={{ paddingLeft: '26px', paddingTop: '12px' }}>
              <p style={{ fontSize: '13px', color: '#D0D0D0', lineHeight: 1.6 }}>{phase.description}</p>
              {/* Fact card */}
              <div style={{ background: '#1C1C2E', borderRadius: '12px', padding: '12px', marginTop: '10px' }}>
                <p style={{ fontSize: '12px', color: '#6B6B7A', fontStyle: 'italic', lineHeight: 1.5 }}>
                  💡 {phase.fact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
