import { useState, useCallback, useMemo } from 'react';
import { trackEvent } from '../utils/analytics';
import { getScoreResult, formatShareText } from '../utils/helpers';

/**
 * Manages the complete quiz flow.
 * @param {Array} questions - Quiz question array
 */
export function useQuiz(questions) {
  const [quizPhase, setQuizPhase] = useState('start'); // 'start' | 'question' | 'results'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  /**
   * Starts the quiz from the beginning.
   * Resets all state and fires GA event.
   */
  const startQuiz = useCallback(() => {
    setQuizPhase('question');
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setAnswers([]);
    trackEvent('Quiz', 'Started');
  }, []);

  /**
   * Records the selected option and reveals answer.
   * @param {number} optionIndex - Selected option (0-3)
   */
  const selectOption = useCallback((optionIndex) => {
    if (isAnswered) return;
    const correct = questions[currentIndex].correct;
    const wasCorrect = optionIndex === correct;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    if (wasCorrect) setScore(prev => prev + 1);
    
    setAnswers(prev => [...prev, {
      questionId: questions[currentIndex].id,
      selected:   optionIndex,
      correct,
      wasCorrect,
    }]);
    
    trackEvent(
      'Quiz', 
      'Answered',
      `Q${currentIndex + 1} - ${wasCorrect ? 'Correct' : 'Wrong'}`
    );
  }, [isAnswered, currentIndex, questions]);

  /**
   * Advances to next question or shows results.
   */
  const nextQuestion = useCallback(() => {
    if (!isAnswered) return;
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizPhase('results');
      trackEvent(
        'Quiz', 
        'Completed',
        `Score: ${score}/10`
      );
    }
  }, [isAnswered, currentIndex, questions.length, score]);

  /**
   * Resets quiz back to start screen.
   */
  const retakeQuiz = useCallback(() => {
    setQuizPhase('start');
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setAnswers([]);
    trackEvent('Quiz', 'Retaken');
  }, []);

  /**
   * Returns the display state for an option button.
   * @param {number} optionIndex
   * @returns {'default'|'correct'|'wrong'|'reveal'}
   */
  const getOptionState = useCallback((optionIndex) => {
    if (!isAnswered) return 'default';
    const correct = questions[currentIndex].correct;
    if (optionIndex === correct) return 'correct';
    if (optionIndex === selectedOption) return 'wrong';
    return 'default';
  }, [isAnswered, currentIndex, selectedOption, questions]);

  /**
   * Shares or copies the quiz score.
   */
  const shareScore = useCallback(async () => {
    const text = formatShareText(score);
    let copied = false;
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
    trackEvent('Quiz', 'Shared');
    return copied; // Returns true if copied to clipboard
  }, [score]);

  const scoreResult = useMemo(() => getScoreResult(score), [score]);

  return {
    quizPhase,
    currentIndex,
    selectedOption,
    isAnswered,
    score,
    answers,
    scoreResult,
    currentQuestion: questions ? questions[currentIndex] : null,
    totalQuestions: questions ? questions.length : 0,
    progressPercent: questions ? ((currentIndex) / questions.length) * 100 : 0,
    startQuiz,
    selectOption,
    nextQuestion,
    retakeQuiz,
    shareScore,
    getOptionState,
  };
}
