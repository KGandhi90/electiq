import { useContext, useEffect, useState } from 'react'
import { Trophy, Share2, CheckCircle2, XCircle, ChevronDown } from 'lucide-react'
import ProgressRing from '../components/ProgressRing'
import { AppContext } from '../context/AppContext'

function ResultsScreen() {
  const { quizState } = useContext(AppContext)
  const { score, totalQuestions, scoreLabel, scoreColor, retakeQuiz, answers } = quizState
  const [displayScore, setDisplayScore] = useState(0)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (score === 0) return
    const duration = 800
    const intervalTime = duration / score
    let current = 0
    const timer = setInterval(() => {
      current += 1
      setDisplayScore(current)
      if (current >= score) clearInterval(timer)
    }, intervalTime)
    return () => clearInterval(timer)
  }, [score])

  const handleShare = async () => {
    const text = `I scored ${score}/10 on the ElectIQ Quiz! Test your election knowledge at ${window.location.origin}`
    if (navigator.share) {
      try {
        await navigator.share({ title: 'ElectIQ Quiz Score', text })
        return
      } catch (err) {
        // Fallback
      }
    }
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transform: 'scale(1)', animation: 'scaleIn 0.3s ease' }}>
      <ProgressRing percent={(score / totalQuestions) * 100} size={120} strokeWidth={8} color={scoreColor} />
      <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '56px', color: '#F0F0F0', fontWeight: 700, marginTop: '20px', lineHeight: 1 }}>{displayScore}/{totalQuestions}</p>
      <p style={{ fontSize: '16px', color: scoreColor, marginTop: '8px', fontWeight: 500 }}>{scoreLabel}</p>
      
      <div style={{ display: 'flex', gap: '12px', marginTop: '24px', width: '100%' }}>
        <button onClick={retakeQuiz} className="pressable" style={{ flex: 1, background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '14px', color: '#F0F0F0', fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
          Retake Quiz
        </button>
        <button onClick={handleShare} className="pressable" style={{ position: 'relative', flex: 1, background: '#FF9933', border: 'none', borderRadius: '16px', padding: '14px', color: '#0C0C14', fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Share2 size={16} strokeWidth={2} /> {copied ? 'Copied!' : 'Share Score'}
        </button>
      </div>

      <div style={{ width: '100%', marginTop: '32px', textAlign: 'left' }}>
        <button 
          onClick={() => setReviewOpen(!reviewOpen)} 
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#13131E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px', color: '#F0F0F0', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '14px', fontWeight: 500 }}>Review Answers</span>
          <ChevronDown size={16} color="#6B6B7A" style={{ transform: reviewOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
        </button>
        <div className={`collapsible${reviewOpen ? ' open' : ''}`}>
          <div style={{ paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {answers.map((ans, i) => {
              const { quizQuestions } = useContext(AppContext)
              const q = quizQuestions.find(q => q.id === ans.questionId)
              return (
                <div key={i} style={{ background: '#1C1C2E', borderRadius: '12px', padding: '12px', display: 'flex', gap: '10px' }}>
                  {ans.wasCorrect ? <CheckCircle2 size={18} color="#00D68F" style={{ flexShrink: 0, marginTop: '2px' }} /> : <XCircle size={18} color="#FF4D6D" style={{ flexShrink: 0, marginTop: '2px' }} />}
                  <div>
                    <p style={{ fontSize: '13px', color: '#F0F0F0', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{q?.question}</p>
                    {!ans.wasCorrect && <p style={{ fontSize: '11px', color: '#00D68F', marginTop: '6px' }}>Correct: {q?.options[q.correct]}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Quiz() {
  const { quizState } = useContext(AppContext)
  const { quizPhase, currentIndex, isAnswered, score, startQuiz, selectOption, nextQuestion, getOptionState, currentQuestion, totalQuestions } = quizState

  return (
    <div className="page-enter py-5 md:py-8">
      <div className="max-w-xl mx-auto">
        {quizPhase === 'start' && (
          <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '24px' }}>
            <Trophy size={64} color="#FF9933" strokeWidth={1.5} />
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', color: '#F0F0F0', marginTop: '16px', fontWeight: 700 }}>Election IQ Quiz</h1>
            <p style={{ fontSize: '14px', color: '#6B6B7A', marginTop: '8px' }}>10 questions · ~3 minutes</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['🎯 Beginner Friendly', '🇮🇳 India Focus', '💡 Learn as you go'].map((chip) => (
                <div key={chip} style={{ background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', fontSize: '12px', color: '#6B6B7A', padding: '6px 14px' }}>
                  {chip}
                </div>
              ))}
            </div>
            <button
              onClick={startQuiz}
              className="pressable"
              style={{ width: '100%', background: '#FF9933', color: '#0C0C14', border: 'none', borderRadius: '16px', padding: '18px', fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '15px', marginTop: '32px', cursor: 'pointer' }}
            >
              Start Quiz
            </button>
          </div>
        )}

        {quizPhase === 'question' && (
          <div className="page-enter" style={{ marginTop: '16px' }} key={currentIndex}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <div style={{ background: '#1C1C2E', height: '4px', borderRadius: '9999px', width: '100%' }}>
                  <div style={{ background: '#FF9933', height: '4px', borderRadius: '9999px', width: `${(currentIndex / totalQuestions) * 100}%`, transition: 'width 0.4s ease' }} />
                </div>
                <p style={{ fontSize: '11px', color: '#6B6B7A', marginTop: '8px' }}>Question {currentIndex + 1} of {totalQuestions}</p>
              </div>
              <div style={{ fontSize: '11px', color: '#00D68F', fontWeight: 600, paddingLeft: '16px', paddingBottom: '2px' }}>
                ✓ {score}
              </div>
            </div>

            <p className="text-xl md:text-2xl" style={{ fontFamily: 'Syne, sans-serif', color: '#F0F0F0', lineHeight: 1.4, marginTop: '24px' }}>
              {currentQuestion.question}
            </p>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentQuestion.options.map((opt, i) => {
                const state = getOptionState(i)
                let style = { background: '#13131E', border: '1px solid rgba(255,255,255,0.08)', color: '#F0F0F0', transform: 'scale(1)' }
                let Icon = null
                
                if (state === 'correct') {
                  style = { background: 'rgba(0,214,143,0.12)', border: '1px solid #00D68F', color: '#F0F0F0', animation: 'scaleBounce 0.15s ease' }
                  Icon = <CheckCircle2 size={16} color="#00D68F" />
                } else if (state === 'wrong') {
                  style = { background: 'rgba(255,77,109,0.12)', border: '1px solid #FF4D6D', color: '#F0F0F0', animation: 'scaleBounce 0.15s ease' }
                  Icon = <XCircle size={16} color="#FF4D6D" />
                }

                return (
                  <button 
                    key={i} 
                    onClick={() => selectOption(i)}
                    className={!isAnswered ? 'pressable' : ''}
                    style={{ ...style, pointerEvents: isAnswered ? 'none' : 'auto', borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', textAlign: 'left', cursor: isAnswered ? 'default' : 'pointer' }}
                  >
                    <span>{opt}</span>
                    {Icon && <span>{Icon}</span>}
                  </button>
                )
              })}
            </div>

            <div style={{ 
              maxHeight: isAnswered ? '200px' : '0', 
              opacity: isAnswered ? 1 : 0, 
              overflow: 'hidden', 
              transition: 'all 0.3s ease',
              marginTop: isAnswered ? '16px' : '0' 
            }}>
              <div style={{ background: '#1C1C2E', border: '1px solid rgba(26,79,186,0.3)', borderRadius: '12px', padding: '14px' }}>
                <p style={{ fontSize: '13px', color: '#6B6B7A', lineHeight: 1.6 }}>💡 {currentQuestion.explanation}</p>
              </div>
            </div>

            <div style={{
              transform: isAnswered ? 'translateY(0)' : 'translateY(10px)',
              opacity: isAnswered ? 1 : 0,
              visibility: isAnswered ? 'visible' : 'hidden',
              transition: 'all 0.25s ease',
              marginTop: '16px'
            }}>
              <button onClick={nextQuestion} className="pressable" style={{ width: '100%', background: '#FF9933', color: '#0C0C14', border: 'none', borderRadius: '16px', padding: '16px', fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
                {currentIndex === totalQuestions - 1 ? 'See Results →' : 'Next Question →'}
              </button>
            </div>
          </div>
        )}

        {quizPhase === 'results' && <ResultsScreen />}
      </div>
    </div>
  )
}
