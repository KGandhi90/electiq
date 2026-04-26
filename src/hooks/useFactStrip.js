import { useState, useEffect, useCallback } from 'react';
import { getNextFactIndex } from '../utils/helpers';

/**
 * Manages the rotating facts strip on Home.
 * Auto-advances every 5 seconds.
 * @param {string[]} facts - Array of fact strings
 * @returns {{ currentFact: string, currentIndex: number, totalFacts: number, isVisible: boolean, goToFact: function }}
 */
export function useFactStrip(facts) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!facts || facts.length === 0) return;

    const interval = setInterval(() => {
      // Fade out → change fact → fade in
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex(prev => getNextFactIndex(prev, facts.length));
        setIsVisible(true);
      }, 300);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [facts]);

  /** 
   * Navigate to specific fact index
   * @param {number} index - Target fact index 
   */
  const goToFact = useCallback((index) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsVisible(true);
    }, 300);
  }, []);

  return { 
    currentFact: facts ? facts[currentIndex] : '',
    currentIndex, 
    totalFacts: facts ? facts.length : 0,
    isVisible,
    goToFact,
  };
}
