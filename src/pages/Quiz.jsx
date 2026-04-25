import { Trophy, Share2 } from 'lucide-react'
import QuizCard from '../components/QuizCard'
import ProgressRing from '../components/ProgressRing'
import { quizQuestions } from '../data/mockData'

const previewQuestion = quizQuestions[2] // question 3
const CURRENT_Q = 3
const TOTAL_Q = 10

export default function Quiz() {
  return (
    <div className="page-enter py-5 md:py-8">
      {/* Constrain quiz to max-w-xl for best readability */}
      <div className="max-w-xl mx-auto">

        {/* START SCREEN */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '24px' }}>
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
            className="pressable"
            style={{ width: '100%', background: '#FF9933', color: '#0C0C14', border: 'none', borderRadius: '16px', padding: '18px', fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '15px', marginTop: '32px', cursor: 'pointer' }}
          >
            Start Quiz
          </button>
        </div>

        {/* Divider */}
        <div style={{ margin: '32px 0 0', borderTop: '1px solid rgba(255,255,255,0.06)' }} />
        <p style={{ fontSize: '11px', color: '#6B6B7A', textAlign: 'center', marginTop: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Preview — Question Screen</p>

        {/* QUESTION SCREEN PREVIEW */}
        <div style={{ marginTop: '16px' }}>
          {/* Progress bar */}
          <div>
            <div style={{ background: '#1C1C2E', height: '4px', borderRadius: '9999px', width: '100%' }}>
              <div style={{ background: '#FF9933', height: '4px', borderRadius: '9999px', width: `${(CURRENT_Q / TOTAL_Q) * 100}%` }} />
            </div>
            <p style={{ fontSize: '11px', color: '#6B6B7A', marginTop: '8px' }}>Question {CURRENT_Q} of {TOTAL_Q}</p>
          </div>

          {/* Question — answered correctly */}
          <p className="text-xl md:text-2xl" style={{ fontFamily: 'Syne, sans-serif', color: '#F0F0F0', lineHeight: 1.4, marginTop: '24px' }}>
            {previewQuestion.question}
          </p>

          {/* Options */}
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {previewQuestion.options.map((opt, i) => {
              let style = { background: '#13131E', border: '1px solid rgba(255,255,255,0.08)', color: '#F0F0F0' }
              if (i === previewQuestion.correct) style = { background: 'rgba(0,214,143,0.08)', border: '1px solid rgba(0,214,143,0.5)', color: '#F0F0F0' }
              return (
                <div key={i} style={{ ...style, borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                  <span>{opt}</span>
                  {i === previewQuestion.correct && <span style={{ color: '#00D68F', fontSize: '16px', fontWeight: 600 }}>✓</span>}
                </div>
              )
            })}
          </div>

          {/* Explanation */}
          <div style={{ background: '#1C1C2E', border: '1px solid rgba(26,79,186,0.3)', borderRadius: '12px', padding: '14px', marginTop: '16px' }}>
            <p style={{ fontSize: '13px', color: '#6B6B7A', lineHeight: 1.6 }}>💡 {previewQuestion.explanation}</p>
          </div>

          <button className="pressable" style={{ width: '100%', background: '#FF9933', color: '#0C0C14', border: 'none', borderRadius: '16px', padding: '16px', fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '14px', cursor: 'pointer', marginTop: '16px' }}>
            Next Question →
          </button>
        </div>

        {/* Divider */}
        <div style={{ margin: '24px 0 0', borderTop: '1px solid rgba(255,255,255,0.06)' }} />
        <p style={{ fontSize: '11px', color: '#6B6B7A', textAlign: 'center', marginTop: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Preview — Results Screen</p>

        {/* RESULTS SCREEN PREVIEW */}
        <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <ProgressRing percent={70} size={120} strokeWidth={8} />
          <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '56px', color: '#F0F0F0', fontWeight: 700, marginTop: '20px', lineHeight: 1 }}>7/10</p>
          <p style={{ fontSize: '16px', color: '#00D68F', marginTop: '8px', fontWeight: 500 }}>Election Expert! 🏆</p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', width: '100%' }}>
            <button className="pressable" style={{ flex: 1, background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '14px', color: '#F0F0F0', fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              Retake Quiz
            </button>
            <button className="pressable" style={{ flex: 1, background: '#FF9933', border: 'none', borderRadius: '16px', padding: '14px', color: '#0C0C14', fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Share2 size={16} strokeWidth={2} /> Share Score
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
