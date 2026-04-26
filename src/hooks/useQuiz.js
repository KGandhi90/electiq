import { useState } from 'react'

export function useQuiz(questions) {
  const [quizPhase, setQuizPhase] = useState('start')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])

  const startQuiz = () => {
    setQuizPhase('question')
    setCurrentIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setAnswers([])
  }

  const selectOption = (optionIndex) => {
    if (isAnswered) return
    const isCorrect = optionIndex === questions[currentIndex].correct
    setSelectedOption(optionIndex)
    setIsAnswered(true)
    if (isCorrect) setScore((prev) => prev + 1)
    setAnswers((prev) => [
      ...prev,
      {
        questionId: questions[currentIndex].id,
        selected: optionIndex,
        correct: questions[currentIndex].correct,
        wasCorrect: isCorrect,
      },
    ])
  }

  const nextQuestion = () => {
    if (!isAnswered) return
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setQuizPhase('results')
    }
  }

  const retakeQuiz = () => {
    setQuizPhase('start')
    setCurrentIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setAnswers([])
  }

  const getOptionState = (optionIndex) => {
    if (!isAnswered) return 'default'
    if (optionIndex === questions[currentIndex].correct) return 'correct'
    if (optionIndex === selectedOption && optionIndex !== questions[currentIndex].correct) return 'wrong'
    return 'default'
  }

  let scoreLabel = 'Keep learning! 📚'
  let scoreColor = '#6B6B7A'
  if (score >= 4 && score <= 6) {
    scoreLabel = 'Not bad! 👍'
    scoreColor = '#FFB547'
  } else if (score >= 7 && score <= 9) {
    scoreLabel = 'Election Expert! 🏆'
    scoreColor = '#00D68F'
  } else if (score === 10) {
    scoreLabel = 'Perfect Score! 🇮🇳'
    scoreColor = '#C8F135'
  }

  return {
    quizPhase,
    currentIndex,
    selectedOption,
    isAnswered,
    score,
    answers,
    startQuiz,
    selectOption,
    nextQuestion,
    retakeQuiz,
    getOptionState,
    scoreLabel,
    scoreColor,
    currentQuestion: questions[currentIndex],
    totalQuestions: questions.length,
  }
}
