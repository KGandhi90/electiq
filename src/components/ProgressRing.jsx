import { useState, useEffect } from 'react'

export default function ProgressRing({ percent = 70, size = 120, strokeWidth = 8, color = '#FF9933' }) {
  const [animated, setAnimated] = useState(false)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  
  const targetOffset = circumference - (percent / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1C1C2E"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? targetOffset : circumference}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          fontFamily: 'Syne, sans-serif',
          fontSize: '18px',
          fontWeight: 600,
          color: '#F0F0F0',
        }}
      >
        {percent}%
      </div>
    </div>
  )
}
