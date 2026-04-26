import { useNavigate } from 'react-router-dom'
import { Brain, MessageCircle } from 'lucide-react'
import { stats, facts, features } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="page-enter flex flex-col gap-12">

      {/* ── MASTHEAD ─────────────────────────── */}
      <section className="text-center py-10 sm:py-14">
        <span className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-saffron text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-saffron pulse" />
          2024 Election Edition
        </span>

        <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-dark leading-tight tracking-tight">
          Elect<span className="text-saffron">I</span>Q
        </h1>

        <p className="mt-4 text-base sm:text-lg text-muted max-w-lg mx-auto leading-relaxed">
          The simplest way to understand India's elections. Data-driven, authoritative, and free.
        </p>

        <div className="mt-6 flex justify-center items-center gap-6 text-xs font-mono font-semibold text-muted uppercase tracking-widest">
          <span>🗳️ 969M Voters</span>
          <span className="w-1 h-1 rounded-full bg-surface3" />
          <span>🏛️ 543 Seats</span>
          <span className="w-1 h-1 rounded-full bg-surface3" />
          <span>📅 7 Phases</span>
        </div>
      </section>

      {/* ── STATS GRID ───────────────────────── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const color = {
            saffron: 'text-saffron',
            ashoka:  'text-ashoka',
            success: 'text-success',
            warning: 'text-warning',
          }[stat.color] ?? 'text-dark'

          return (
            <div key={i} className="bg-white border border-surface3 rounded-2xl p-5 sm:p-6 flex flex-col gap-1">
              <span className={`font-display text-4xl sm:text-5xl font-bold ${color}`}>{stat.value}</span>
              <span className="text-sm font-semibold text-dark">{stat.label}</span>
              <span className="text-xs text-muted font-mono">{stat.sub}</span>
            </div>
          )
        })}
      </section>

      {/* ── DID YOU KNOW ─────────────────────── */}
      <section className="bg-orange-50 border border-orange-200 border-l-4 border-l-saffron rounded-2xl p-6 sm:p-8">
        <p className="text-xs font-mono font-bold text-saffron uppercase tracking-widest mb-3">Did you know?</p>
        <p className="text-sm sm:text-base text-dark leading-relaxed">{facts[0]}</p>
        <div className="flex gap-2 mt-4">
          {facts.map((_, i) => (
            <div key={i} className={`rounded-full transition-all duration-300 ${i === 0 ? 'w-4 h-1.5 bg-saffron' : 'w-1.5 h-1.5 bg-surface3'}`} />
          ))}
        </div>
      </section>

      {/* ── FEATURE CARDS ────────────────────── */}
      <section>
        <h2 className="text-sm font-bold text-dark uppercase tracking-widest mb-5 pl-3 border-l-4 border-saffron">
          Explore ElectIQ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f) => {
            const isQuiz = f.icon === 'Brain'
            const Icon   = isQuiz ? Brain : MessageCircle
            const accent = isQuiz ? 'saffron' : 'ashoka'

            return (
              <div
                key={f.id}
                onClick={() => navigate(f.href)}
                className="bg-white border border-surface3 rounded-2xl p-6 sm:p-8 flex flex-col gap-5 cursor-pointer hover:border-saffron hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex justify-between items-start">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isQuiz ? 'bg-orange-50 text-saffron' : 'bg-blue-50 text-ashoka'}`}>
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <StatusBadge label={f.tag} variant={accent} />
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold text-dark mb-2 group-hover:text-saffron transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{f.description}</p>
                </div>

                <p className={`text-sm font-semibold ${isQuiz ? 'text-saffron' : 'text-ashoka'} mt-auto`}>
                  Get Started →
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4 border-t border-surface3">
        {[
          { n: '01', title: 'Take the Quiz',   desc: 'Answer 10 questions about Indian elections.' },
          { n: '02', title: 'Learn as You Go', desc: 'Every answer includes a detailed explanation.' },
          { n: '03', title: 'Ask the Expert',  desc: 'Dive deeper with our Indian politics AI.' },
        ].map((s) => (
          <div key={s.n} className="text-center p-5">
            <span className="font-display text-4xl font-bold text-surface3">{s.n}</span>
            <h4 className="text-sm font-bold text-dark mt-2">{s.title}</h4>
            <p className="text-xs text-muted mt-1 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </section>

    </div>
  )
}
