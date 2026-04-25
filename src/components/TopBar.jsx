export default function TopBar() {
  return (
    <div
      style={{
        width: '100%',
        background: '#13131E',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Logo */}
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.3px' }}>
          Elect<span style={{ color: '#FF9933' }}>I</span>Q
        </div>

        {/* Center: Live indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            className="pulse"
            style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FF9933', flexShrink: 0 }}
          />
          <span style={{ fontSize: '11px', color: '#FF9933', fontWeight: 500, letterSpacing: '0.04em' }}>LIVE</span>
        </div>

        {/* Right: Flag + label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '16px' }}>🇮🇳</span>
          <span style={{ fontSize: '12px', color: '#6B6B7A', fontWeight: 400 }}>India</span>
        </div>
      </div>
    </div>
  )
}
