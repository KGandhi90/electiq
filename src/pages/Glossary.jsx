import { Search } from 'lucide-react'
import GlossaryItem from '../components/GlossaryItem'
import { glossaryTerms } from '../data/mockData'

// Group terms by first letter
const grouped = glossaryTerms.reduce((acc, term) => {
  const letter = term.term[0].toUpperCase()
  if (!acc[letter]) acc[letter] = []
  acc[letter].push(term)
  return acc
}, {})

const letters = Object.keys(grouped).sort()

// Split letters into two columns for lg layout
const mid = Math.ceil(letters.length / 2)
const leftLetters  = letters.slice(0, mid)
const rightLetters = letters.slice(mid)

function LetterGroup({ letter }) {
  const terms = grouped[letter]
  return (
    <div key={letter}>
      <div style={{ marginTop: '20px', marginBottom: '8px' }}>
        <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '13px', color: '#FF9933', fontWeight: 600, marginBottom: '6px' }}>{letter}</p>
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </div>
      {terms.map((item, i) => (
        <GlossaryItem
          key={item.term}
          term={item.term}
          definition={item.definition}
          isLast={i === terms.length - 1}
        />
      ))}
    </div>
  )
}

export default function Glossary() {
  return (
    <div className="page-enter py-5 md:py-8">
      {/* Header */}
      <div style={{ marginBottom: '8px' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', color: '#F0F0F0', fontWeight: 700 }}>Glossary</h1>
        <p style={{ fontSize: '13px', color: '#6B6B7A', marginTop: '4px' }}>19 election terms explained</p>
      </div>

      {/* Search bar — full width */}
      <div style={{ margin: '12px 0 16px', background: '#13131E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px' }}>
        <Search size={16} color="#6B6B7A" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Search terms..."
          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '13px', color: '#F0F0F0', fontFamily: 'Inter, sans-serif' }}
        />
      </div>

      {/* Single column on mobile/tablet, 2-column on lg+ */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-x-12">
        <div>{leftLetters.map((l)  => <LetterGroup key={l} letter={l} />)}</div>
        <div>{rightLetters.map((l) => <LetterGroup key={l} letter={l} />)}</div>
      </div>

      {/* Single-column fallback for < lg */}
      <div className="lg:hidden">
        {letters.map((l) => <LetterGroup key={l} letter={l} />)}
      </div>

      <div style={{ height: '16px' }} />
    </div>
  )
}
