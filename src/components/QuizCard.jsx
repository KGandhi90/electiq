import { memo, useCallback } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import PropTypes from 'prop-types';

const QuizCard = memo(function QuizCard({ 
  question, 
  options, 
  selectedOption, 
  isAnswered, 
  correctIndex, 
  explanation,
  onSelect,
  getOptionState
}) {

  const handleKeyDown = useCallback((e, index) => {
    if (isAnswered) return;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        onSelect(index);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        const next = index < options.length - 1 ? index + 1 : 0;
        document.getElementById(`option-${next}`)?.focus();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        const prev = index > 0 ? index - 1 : options.length - 1;
        document.getElementById(`option-${prev}`)?.focus();
        break;
      default:
        break;
    }
  }, [isAnswered, onSelect, options.length]);

  return (
    <div className="page-enter w-full">
      <h2 className="font-display text-xl sm:text-2xl font-semibold text-dark leading-snug mb-6">
        {question}
      </h2>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Quiz options">
        {options.map((opt, i) => {
          const state = getOptionState ? getOptionState(i) : 'default';
          
          let cls = 'bg-white border-surface3 text-dark hover:border-saffron hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent';
          if (state === 'correct')  cls = 'bg-green-50 border-success text-success border-l-4 border-l-success';
          if (state === 'wrong')    cls = 'bg-red-50 border-danger text-danger border-l-4 border-l-danger';
          if (isAnswered && state === 'default') cls = 'bg-white border-surface3 text-muted opacity-60';

          return (
            <button
              key={i}
              id={`option-${i}`}
              onClick={() => !isAnswered && onSelect(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              disabled={isAnswered}
              role="radio"
              aria-checked={selectedOption === i}
              aria-disabled={isAnswered}
              tabIndex={isAnswered ? -1 : 0}
              className={`w-full flex items-center justify-between gap-4 px-4 py-4 rounded-xl border text-sm font-medium text-left transition-all duration-150 ${
                !isAnswered ? 'cursor-pointer' : 'cursor-default'
              } ${cls}`}
            >
              <span>{opt}</span>
              {state === 'correct' && <CheckCircle size={18} className="text-success flex-shrink-0" />}
              {state === 'wrong'   && <XCircle    size={18} className="text-danger flex-shrink-0"  />}
            </button>
          );
        })}
      </div>

      {isAnswered && explanation && (
        <div 
          role="alert" 
          aria-live="polite"
          className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-100 border-l-4 border-l-ashoka text-sm text-dark leading-relaxed page-enter"
        >
          {explanation}
        </div>
      )}
    </div>
  );
});

QuizCard.propTypes = {
  question:       PropTypes.string.isRequired,
  options:        PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOption: PropTypes.number,
  isAnswered:     PropTypes.bool.isRequired,
  correctIndex:   PropTypes.number.isRequired,
  explanation:    PropTypes.string.isRequired,
  onSelect:       PropTypes.func.isRequired,
  getOptionState: PropTypes.func.isRequired,
};

export default QuizCard;
