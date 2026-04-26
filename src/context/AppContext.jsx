import React, { createContext, useContext, useMemo } from 'react';
import { facts, stats, features, quizQuestions, chatSeedMessages } from '../data/mockData';

/**
 * AppContext provides global state across 
 * all 3 pages of ElectIQ.
 */
const AppContext = createContext();

export function AppProvider({ children }) {
  const value = useMemo(() => ({
    facts,
    stats,
    features,
    quizQuestions,
    chatSeedMessages,
  }), []);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
