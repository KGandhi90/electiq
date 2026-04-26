import { CheckCircle, XCircle } from 'lucide-react'

export default function QuizCard({ question, options, selectedOption, isAnswered, correctIndex, onSelect }) {
  return (
    <div className="page-enter w-full">
      <h2 className="font-display text-xl sm:text-2xl font-semibold text-dark leading-snug mb-6">
        {question.question}
      </h2>

      <div className="flex flex-col gap-3">
        {options.map((opt, i) => {
          const isSelected    = selectedOption === i
          const isCorrect     = i === correctIndex
          const showCorrect   = isAnswered && isCorrect
          const showWrong     = isAnswered && isSelected && !isCorrect

          let cls = 'bg-white border-surface3 text-dark hover:border-saffron hover:bg-orange-50'
          if (showCorrect)  cls = 'bg-green-50 border-success text-success border-l-4 border-l-success'
          if (showWrong)    cls = 'bg-red-50 border-danger text-danger border-l-4 border-l-danger'
          if (isAnswered && !isSelected && !isCorrect) cls = 'bg-white border-surface3 text-muted opacity-60'

          return (
            <button
              key={i}
              onClick={() => !isAnswered && onSelect(i)}
              disabled={isAnswered}
              className={`w-full flex items-center justify-between gap-4 px-4 py-4 rounded-xl border text-sm font-medium text-left transition-all duration-150 ${
                !isAnswered ? 'cursor-pointer' : 'cursor-default'
              } ${cls}`}
            >
              <span>{opt}</span>
              {showCorrect && <CheckCircle size={18} className="text-success flex-shrink-0" />}
              {showWrong   && <XCircle    size={18} className="text-danger flex-shrink-0"  />}
            </button>
          )
        })}
      </div>

      {isAnswered && (
        <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-100 border-l-4 border-l-ashoka text-sm text-dark leading-relaxed page-enter">
          {question.explanation}
        </div>
      )}
    </div>
  )
}
