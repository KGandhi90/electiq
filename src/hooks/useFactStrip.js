import { useState, useEffect } from 'react'

export function useFactStrip(facts) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!facts || facts.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === facts.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [facts])

  return { currentFact: facts[currentIndex], currentIndex, totalFacts: facts?.length || 0 }
}
