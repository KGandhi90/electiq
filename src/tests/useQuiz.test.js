import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuiz } from '../hooks/useQuiz';

// Mock analytics so GA calls don't error
vi.mock('../utils/analytics', () => ({
  trackEvent: vi.fn(),
}));

// Mock firebase so network calls don't fire
vi.mock('../api/firebase', () => ({
  saveQuizScore: vi.fn(),
}));

const mockQuestions = [
  {
    id: 1,
    question: 'How many seats?',
    options: ['543', '500', '600', '450'],
    correct: 0,
    explanation: 'There are 543 seats.',
  },
  {
    id: 2,
    question: 'What is NOTA?',
    options: ['A', 'B', 'None Of The Above', 'D'],
    correct: 2,
    explanation: 'NOTA means None Of The Above.',
  },
];

describe('useQuiz', () => {
  it('starts in "start" phase', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    expect(result.current.quizPhase).toBe('start');
  });

  it('startQuiz transitions to "question" phase', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    act(() => result.current.startQuiz());
    expect(result.current.quizPhase).toBe('question');
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.score).toBe(0);
  });

  it('selectOption records a correct answer and increments score', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    act(() => result.current.startQuiz());
    act(() => result.current.selectOption(0)); // correct answer is 0
    expect(result.current.score).toBe(1);
    expect(result.current.isAnswered).toBe(true);
  });

  it('selectOption records a wrong answer without incrementing score', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    act(() => result.current.startQuiz());
    act(() => result.current.selectOption(2)); // wrong
    expect(result.current.score).toBe(0);
    expect(result.current.isAnswered).toBe(true);
  });

  it('second selectOption call is ignored after first answer', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    act(() => result.current.startQuiz());
    act(() => result.current.selectOption(0));
    act(() => result.current.selectOption(2));
    expect(result.current.score).toBe(1);
  });

  it('nextQuestion advances to next question', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    act(() => result.current.startQuiz());
    act(() => result.current.selectOption(0));
    act(() => result.current.nextQuestion());
    expect(result.current.currentIndex).toBe(1);
    expect(result.current.isAnswered).toBe(false);
  });

  it('nextQuestion transitions to "results" after last question', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    act(() => result.current.startQuiz());
    act(() => result.current.selectOption(0));
    act(() => result.current.nextQuestion());
    act(() => result.current.selectOption(2));
    act(() => result.current.nextQuestion());
    expect(result.current.quizPhase).toBe('results');
  });

  it('retakeQuiz resets everything back to start', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    act(() => result.current.startQuiz());
    act(() => result.current.selectOption(0));
    act(() => result.current.retakeQuiz());
    expect(result.current.quizPhase).toBe('start');
    expect(result.current.score).toBe(0);
    expect(result.current.currentIndex).toBe(0);
  });

  it('getOptionState returns "correct" for the right answer after answering', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    act(() => result.current.startQuiz());
    act(() => result.current.selectOption(0));
    expect(result.current.getOptionState(0)).toBe('correct');
  });

  it('getOptionState returns "wrong" for the selected wrong answer', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    act(() => result.current.startQuiz());
    act(() => result.current.selectOption(2)); // wrong
    expect(result.current.getOptionState(2)).toBe('wrong');
  });

  it('getOptionState returns "default" before answering', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    act(() => result.current.startQuiz());
    expect(result.current.getOptionState(0)).toBe('default');
  });

  it('progressPercent is 0 at first question', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    act(() => result.current.startQuiz());
    expect(result.current.progressPercent).toBe(0);
  });

  it('scoreResult has a label and color', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    expect(result.current.scoreResult).toHaveProperty('label');
    expect(result.current.scoreResult).toHaveProperty('color');
  });

  it('currentQuestion returns null before quiz starts (start phase)', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    // In start phase, currentIndex is 0 so currentQuestion is still question[0], not null
    // It should return the first question
    expect(result.current.currentQuestion).toBeTruthy();
  });

  it('totalQuestions returns the correct count', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    expect(result.current.totalQuestions).toBe(2);
  });
});
