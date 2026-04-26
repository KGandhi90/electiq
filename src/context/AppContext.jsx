import React, { createContext, useState } from 'react'
import { facts, electionTypes, timelinePhases, quizQuestions, glossaryTerms, chatSeedMessages } from '../data/mockData'
import { useQuiz } from '../hooks/useQuiz'

export const AppContext = createContext()

export function AppProvider({ children }) {
  const [expandedPhase, setExpandedPhase] = useState(6)
  const [activeGuideTab, setActiveGuideTab] = useState('register')
  const [chatMessages, setChatMessages] = useState(chatSeedMessages)

  const quizState = useQuiz(quizQuestions)

  const value = {
    facts,
    electionTypes,
    timelinePhases,
    quizQuestions,
    glossaryTerms,
    chatSeedMessages,
    expandedPhase,
    setExpandedPhase,
    activeGuideTab,
    setActiveGuideTab,
    chatMessages,
    setChatMessages,
    quizState,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
