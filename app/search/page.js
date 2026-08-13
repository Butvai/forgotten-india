"use client"
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function SearchResults() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) { setQuery(q); doSearch(q) }
  }, [])

  const doSearch = async (q) => {
    if (!q.trim()) return
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch('/api/public/submissions?q=' + encodeURIComponent(q) + '&limit=30')
      const data = await res.json()
      setResults(data.submissions || [])
      setTotal(data.total || 0)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    doSearch(query)
    window.history.pushState({}, '', '/search?q=' + encodeURIComponent(query))
  }

  const s = {
    page: { backgroundColor: '#f5f0e8', minHeight: '100vh', padding: '4rem 2rem' },
    wrap: { maxWidth: '800px', margin: '0 auto' },
    title: { fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem,4vw,3rem)', color: '#3d2314', fontWeight: 400, marginBottom: '0.5rem' },
    sub: { fontFamily: '"Manrope", sans-serif', color: '#7a6355', marginBottom: '2rem', fontSize: '1rem' },
    form: { display: 'flex', gap: '0.75rem', marginBottom: '2.5rem' },
    input: { flex: 1, padding: '0.75rem 1rem', border: '1px solid #e8ddd4', backgroundColor: '#fff', fontFamily: '"Manrope", sans-serif', fontSize: '1rem', color: '#3d2314', outline: 'none' },
    btn: { backgroundColor: '#c2714f', color: '#f5f0e8', padding: '0.75rem 1.5rem', border: 'none', fontFamily: '"Manrope", sans-serif', fontSize: '0.95rem', cursor: 'pointer', fontWeight: 500 },
    card: { backgroundColor: '#fff', border: '1px solid #e8ddd4', padding: '1.5rem', marginBottom: '1rem' },
    cardCat: { fontSize: '0.75rem', fontFamily: '"Manrope", sans-serif', color: '#c2714f', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem', fontWeight: 600 },
    cardTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', color: '#3d2314', fontWeight: 500, marginBottom: '0.4rem' },
    cardMeta: { fontSize: '0.8rem', color: '#7a6355', fontFamily: '"Manrope", sans-serif', marginBottom: '0.75rem' },
    cardDesc: { fontSize: '0.9rem', color: '#5a4a3a', fontFamily: '"Manrope", sans-serif', lineHeight: 1.6 },
    count: { fontFamily: '"Manrope", sans-serif', color: '#7a6355', fontSize: '0.9rem', marginBottom: '1.5rem' },
    empty: { textAlign: 'center', padding: '3rem 0', color: '#7a6355', fontFamily: '"Manrope", sans-serif' },
  }

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <h1 style={s.title}>Search the archive</h1>
        <p style={s.sub}>Search recipes, songs, stories, remedies and more from across India.</p>
        <form style={s.form} onSubmit={handleSubmit}>
          <input style={s.input} value={query} onChange={e => setQuery(e.target.value)} placeholder='Try "rasam", "lullaby", "Coorg", "harvest"...' />
          <button style={s.btn} type="submit">Search</button>
        </form>
        {loading && <div style={s.empty}>Searching the archive...</div>}
        {!loading && searched && (
          <>
            <div style={s.count}>{total} result{total !== 1 ? 's' : ''}</div>
            {results.length === 0 ? (
              <div style={s.empty}>
                <p>Nothing found. Try a different word — or <a href="/share" style={{ color: '#c2714f' }}>share this memory yourself</a>.</p>
              </div>
            ) : results.map(sub => (
              <a key={sub.id} href={`/memory/${sub.id}`} style={{ ...s.card, textDecoration: 'none', display: 'block', cursor: 'pointer' }}>
                <div style={s.cardCat}>{sub.category?.name}</div>
                <div style={s.cardTitle}>{sub.title}</div>
                <div style={s.cardMeta}>{sub.state?.name}{sub.district ? ' · ' + sub.district.name : ''}{sub.contributor?.name ? ' · ' + sub.contributor.name : ''}</div>
                {sub.description && <div style={s.cardDesc}>{sub.description.slice(0,200)}{sub.description.length > 200 ? '...' : ''}</div>}
                <div style={{ marginTop: '0.75rem', fontFamily: '"Manrope", sans-serif', fontSize: '0.8rem', color: '#c2714f', fontWeight: 500 }}>Read memory →</div>
              </a>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', fontFamily: '"Manrope", sans-serif', color: '#7a6355' }}>Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}
