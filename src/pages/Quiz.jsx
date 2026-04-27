import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useQuiz } from '../hooks/useQuiz';
import QuizCard from '../components/QuizCard';
import Leaderboard from '../components/Leaderboard';

export default function Quiz() {
  const { quizQuestions } = useAppContext();
  const {
    quizPhase,
    currentIndex,
    selectedOption,
    isAnswered,
    score,
    answers,
    scoreResult,
    currentQuestion,
    totalQuestions,
    progressPercent,
    startQuiz,
    selectOption,
    nextQuestion,
    retakeQuiz,
    shareScore,
    getOptionState,
  } = useQuiz(quizQuestions);

  const [displayScore, setDisplayScore] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const questionRef = useRef(null);
  const resultsRef = useRef(null);

  // Score counter animation
  useEffect(() => {
    if (quizPhase === 'results') {
      const step = Math.max(1, score / 20);
      const timer = setInterval(() => {
        setDisplayScore(prev => {
          if (prev >= score) {
            clearInterval(timer);
            return score;
          }
          return Math.min(prev + step, score);
        });
      }, 40);
      
      // Progress bar animation
      setTimeout(() => setAnimatedProgress((score / totalQuestions) * 100), 100);
      
      // Focus management
      resultsRef.current?.focus();
      
      return () => clearInterval(timer);
    } else {
      setDisplayScore(0);
      setAnimatedProgress(0);
      setIsReviewOpen(false);
    }
  }, [quizPhase, score, totalQuestions]);

  // Focus management on new question
  useEffect(() => {
    if (quizPhase === 'question') {
      questionRef.current?.focus();
    }
  }, [quizPhase, currentIndex]);

  const handleShare = async () => {
    const copied = await shareScore();
    if (copied) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="page-enter">

      {/* ── START ─────────────────────────────── */}
      {quizPhase === 'start' && (
        <div className="max-w-lg mx-auto text-center pt-10 sm:pt-16 page-enter">
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-dark mb-3">
            Election IQ Quiz
          </h1>
          <div className="w-10 h-1 bg-saffron rounded-full mx-auto mb-4" />
          <p className="text-sm sm:text-base text-muted mb-10">
            10 questions · India's elections · Learn as you go
          </p>

          <div className="grid grid-cols-3 bg-white border border-surface3 rounded-2xl overflow-hidden mb-8 shadow-sm">
            {[['10', 'Questions'], ['3 min', 'Duration'], ['100%', 'Free']].map(([val, lbl]) => (
              <div key={lbl} className="flex flex-col items-center py-6 border-r last:border-r-0 border-surface3">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-dark">{val}</span>
                <span className="text-xs text-muted uppercase tracking-widest mt-1">{lbl}</span>
              </div>
            ))}
          </div>

          <button
            onClick={startQuiz}
            aria-label="Start the election quiz"
            className="w-full bg-saffron hover:bg-orange-700 text-white font-semibold text-base rounded-xl py-4 transition-colors duration-150 shadow-lg shadow-orange-200 mb-3 cursor-pointer"
          >
            Start Quiz →
          </button>
          <p className="text-xs text-muted">No signup required · Instant results</p>
        </div>
      )}

      {/* ── QUESTION ──────────────────────────── */}
      {quizPhase === 'question' && currentQuestion && (
        <div className="max-w-2xl mx-auto page-enter" aria-live="polite">
          {/* Progress bar */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-sm text-muted whitespace-nowrap">
              Q{currentIndex + 1} / {totalQuestions}
            </span>
            <div 
              className="flex-1 h-1.5 bg-surface3 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={currentIndex}
              aria-valuemin={0}
              aria-valuemax={totalQuestions}
              aria-label={`Question ${currentIndex + 1} of ${totalQuestions}`}
            >
              <div 
                className="h-full bg-saffron rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
            <span className="font-mono text-sm text-success whitespace-nowrap">✓ {score}</span>
          </div>

          <div tabIndex={-1} ref={questionRef} className="outline-none">
            <QuizCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              selectedOption={selectedOption}
              isAnswered={isAnswered}
              correctIndex={currentQuestion.correct}
              explanation={currentQuestion.explanation}
              onSelect={selectOption}
              getOptionState={getOptionState}
            />
          </div>

          <div className="mt-8 flex justify-end min-h-[4rem]">
            {isAnswered && (
              <button
                onClick={nextQuestion}
                className="w-full sm:w-auto sm:px-10 bg-dark hover:bg-neutral-800 text-white font-semibold text-sm rounded-xl py-4 transition-all duration-300 transform translate-y-0 opacity-100 cursor-pointer"
                style={{ animation: 'fadeUp 0.3s ease-out forwards' }}
              >
                {currentIndex < totalQuestions - 1 ? 'Next Question →' : 'See Results →'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── RESULTS ───────────────────────────── */}
      {quizPhase === 'results' && (
        <div className="max-w-xl mx-auto pt-10 sm:pt-16 page-enter" role="region" aria-label="Quiz results" aria-live="polite">
          <div className="text-center mb-8" tabIndex={-1} ref={resultsRef} style={{ outline: 'none' }}>
            <div className="mb-2">
              <span className={`font-display text-7xl sm:text-8xl font-bold ${scoreResult.color}`}>
                {Math.floor(displayScore)}
              </span>
              <span className="text-2xl text-muted font-light">/{totalQuestions}</span>
            </div>
            <h2 className="text-xl font-semibold text-dark mb-6">{scoreResult.label}</h2>

            <div className="w-full h-2.5 bg-surface3 rounded-full overflow-hidden mb-8">
              <div 
                className="h-full bg-saffron rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${animatedProgress}%` }} 
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 relative">
              <button
                onClick={retakeQuiz}
                className="flex-1 border border-surface3 hover:border-dark text-dark font-semibold text-sm rounded-xl py-4 transition-colors duration-150 bg-white cursor-pointer"
              >
                Retake Quiz
              </button>
              
              <div className="flex-1 relative">
                {isCopied && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-dark text-white text-xs rounded-lg px-3 py-1.5 whitespace-nowrap animate-fade-in z-10">
                    Score copied to clipboard!
                  </div>
                )}
                <button 
                  onClick={handleShare}
                  className="w-full bg-ashoka hover:bg-blue-800 text-white font-semibold text-sm rounded-xl py-4 transition-colors duration-150 shadow-lg shadow-ashoka/20 cursor-pointer"
                >
                  Share Score
                </button>
              </div>
            </div>
          </div>

          <Leaderboard userScore={score} />

          {/* Answer Review Section */}
          <div className="mt-8 border border-surface3 rounded-2xl bg-white overflow-hidden">
            <button 
              onClick={() => setIsReviewOpen(!isReviewOpen)}
              className="w-full flex items-center justify-between p-5 bg-surface2/50 hover:bg-surface2 transition-colors cursor-pointer text-left"
              aria-expanded={isReviewOpen}
            >
              <span className="font-semibold text-dark text-sm">Review Answers</span>
              {isReviewOpen ? <ChevronUp size={20} className="text-muted" /> : <ChevronDown size={20} className="text-muted" />}
            </button>
            
            {isReviewOpen && (
              <div className="p-5 flex flex-col gap-4 border-t border-surface3">
                {answers.map((ans, i) => {
                  const q = quizQuestions.find(q => q.id === ans.questionId);
                  if (!q) return null;
                  
                  return (
                    <div key={i} className="flex gap-3 text-sm pb-4 border-b border-surface3 last:border-0 last:pb-0">
                      <div className="flex-shrink-0 mt-0.5">
                        {ans.wasCorrect ? 
                          <span className="text-success font-bold">✓</span> : 
                          <span className="text-danger font-bold">✗</span>
                        }
                      </div>
                      <div>
                        <p className="text-dark font-medium mb-1">
                          {q.question.length > 60 ? q.question.substring(0, 60) + '...' : q.question}
                        </p>
                        <p className="text-muted text-xs">
                          Answer: {q.options[q.correct]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
