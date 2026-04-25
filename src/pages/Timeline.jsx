import TimelinePhase from '../components/TimelinePhase'
import StatusBadge from '../components/StatusBadge'
import { timelinePhases } from '../data/mockData'

export default function Timeline() {
  return (
    <div className="page-enter py-5 md:py-8">
      {/* Constrain timeline to readable width on large screens */}
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div style={{ marginBottom: '8px' }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', color: '#F0F0F0', fontWeight: 700 }}>Election Timeline</h1>
          <p style={{ fontSize: '13px', color: '#6B6B7A', marginTop: '4px' }}>Lok Sabha General Election</p>
        </div>

        {/* Active phase banner */}
        <div style={{ margin: '16px 0', background: 'rgba(255,153,51,0.12)', border: '1px solid rgba(255,153,51,0.3)', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF9933', flexShrink: 0 }} />
            <span style={{ fontSize: '13px', color: '#F0F0F0', fontWeight: 500 }}>Currently in: Election Campaign Phase</span>
          </div>
          <StatusBadge status="active" />
        </div>

        {/* Timeline phases */}
        <div>
          {timelinePhases.map((phase) => (
            <TimelinePhase
              key={phase.id}
              phase={phase}
              defaultExpanded={phase.id === 6}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
