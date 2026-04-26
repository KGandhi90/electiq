import { useState, useContext } from 'react'
import { Search, X } from 'lucide-react'
import GlossaryItem from '../components/GlossaryItem'
import { AppContext } from '../context/AppContext'

export default function Glossary() {
  const { glossaryTerms } = useContext(AppContext)
  const [searchQuery, setSearchQuery] = useState('')

  const isSearching = searchQuery.trim() !== ''

  const filtered = isSearching
    ? glossaryTerms.filter(
        (term) =>
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  // Group terms by first letter for non-search view
  const grouped = glossaryTerms.reduce((acc, term) => {
    const letter = term.term[0].toUpperCase()
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(term)
    return acc
  }, {})

  const letters = Object.keys(grouped).sort()
  const mid = Math.ceil(letters.length / 2)
  const leftLetters = letters.slice(0, mid)
  const rightLetters = letters.slice(mid)

  const highlightText = (text, query) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} style={{ background: 'rgba(255,153,51,0.2)', color: '#FF9933', borderRadius: '2px', padding: '0 2px' }}>
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    )
  }

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

  return (
    <div className="page-enter py-5 md:py-8">
      {/* Header */}
      <div style={{ marginBottom: '8px' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', color: '#F0F0F0', fontWeight: 700 }}>Glossary</h1>
        <p style={{ fontSize: '13px', color: '#6B6B7A', marginTop: '4px' }}>19 election terms explained</p>
      </div>

      {/* Search bar */}
      <div style={{ margin: '12px 0 16px', background: '#13131E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px' }}>
        <Search size={16} color="#6B6B7A" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Search terms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '13px', color: '#F0F0F0', fontFamily: 'Inter, sans-serif' }}
        />
        {isSearching && (
          <button 
            onClick={() => setSearchQuery('')}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', transform: 'scale(1)', animation: 'scaleIn 0.15s ease' }}
          >
            <X size={16} color="#6B6B7A" />
          </button>
        )}
      </div>

      {isSearching ? (
        <div className="page-enter">
          {filtered.length > 0 ? (
            filtered.map((item, i) => (
              <GlossaryItem
                key={item.term}
                term={highlightText(item.term, searchQuery)}
                definition={highlightText(item.definition, searchQuery)}
                isLast={i === filtered.length - 1}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <Search size={32} color="#6B6B7A" style={{ margin: '0 auto', opacity: 0.5 }} />
              <p style={{ fontSize: '14px', color: '#F0F0F0', marginTop: '16px', fontWeight: 500 }}>No results for '{searchQuery}'</p>
              <p style={{ fontSize: '12px', color: '#6B6B7A', marginTop: '4px' }}>Try a different term</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="hidden lg:grid lg:grid-cols-2 gap-x-12 page-enter">
            <div>{leftLetters.map((l)  => <LetterGroup key={l} letter={l} />)}</div>
            <div>{rightLetters.map((l) => <LetterGroup key={l} letter={l} />)}</div>
          </div>
          <div className="lg:hidden page-enter">
            {letters.map((l) => <LetterGroup key={l} letter={l} />)}
          </div>
        </>
      )}
      <div style={{ height: '16px' }} />
    </div>
  )
}
