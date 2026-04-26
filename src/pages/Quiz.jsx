import { useState } from 'react'
import { quizQuestions } from '../data/mockData'
import QuizCard from '../components/QuizCard'

export default function Quiz() {
  const [phase, setPhase] = useState('start') // 'start' | 'question' | 'results'
  const q = quizQuestions[2] // Q3 preview

  return (
    <div className="page-enter">

      {/* ── START ─────────────────────────────── */}
      {phase === 'start' && (
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
            onClick={() => setPhase('question')}
            className="w-full bg-saffron hover:bg-orange-700 text-white font-semibold text-base rounded-xl py-4 transition-colors duration-150 shadow-lg shadow-orange-200 mb-3"
          >
            Start Quiz →
          </button>
          <p className="text-xs text-muted">No signup required · Instant results</p>
        </div>
      )}

      {/* ── QUESTION ──────────────────────────── */}
      {phase === 'question' && (
        <div className="max-w-2xl mx-auto page-enter">
          {/* Progress bar */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-sm text-muted whitespace-nowrap">Q3 / 10</span>
            <div className="flex-1 h-1.5 bg-surface3 rounded-full overflow-hidden">
              <div className="h-full bg-saffron rounded-full" style={{ width: '30%' }} />
            </div>
            <span className="font-mono text-sm text-success whitespace-nowrap">✓ 2</span>
          </div>

          <QuizCard
            question={q}
            options={q.options}
            selectedOption={1}
            isAnswered={true}
            correctIndex={q.correct}
            onSelect={() => {}}
          />

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setPhase('results')}
              className="w-full sm:w-auto sm:px-10 bg-dark hover:bg-neutral-800 text-white font-semibold text-sm rounded-xl py-4 transition-colors duration-150"
            >
              Next Question →
            </button>
          </div>
        </div>
      )}

      {/* ── RESULTS ───────────────────────────── */}
      {phase === 'results' && (
        <div className="max-w-lg mx-auto text-center pt-10 sm:pt-16 page-enter">
          <div className="mb-4">
            <span className="font-display text-7xl sm:text-8xl font-bold text-saffron">7</span>
            <span className="text-2xl text-muted font-light">/10</span>
          </div>
          <h2 className="text-lg font-semibold text-dark mb-6">Election Expert! 🏆</h2>

          <div className="w-full h-2.5 bg-surface3 rounded-full overflow-hidden mb-8">
            <div className="h-full bg-saffron rounded-full" style={{ width: '70%' }} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setPhase('start')}
              className="flex-1 border border-surface3 hover:border-dark text-dark font-semibold text-sm rounded-xl py-4 transition-colors duration-150 bg-white"
            >
              Retake Quiz
            </button>
            <button className="flex-1 bg-ashoka hover:bg-blue-800 text-white font-semibold text-sm rounded-xl py-4 transition-colors duration-150">
              Share Score
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
