"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

const STATES = ['All States','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Jammu & Kashmir','Ladakh','Delhi','Puducherry']
const CATEGORIES = ['All Categories','Recipe','Home remedy','Song','Story','Superstition','Ritual','Game','Proverb','Word','Craft','Tradition','Other']

export default function IndiaPage() {
  const [submissions, setSubmissions] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => { fetchData() }, [state, category])

  const fetchData = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (state && state !== 'All States') params.set('state', state)
      if (category && category !== 'All Categories') params.set('category', category)
      params.set('limit', '50')
      const res = await window.fetch('/api/public/submissions?' + params.toString())
      const data = await res.json()
      setSubmissions(data.submissions || [])
      setTotal(data.total || 0)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const s = {
    page: { backgroundColor: '#f5f0e8', minHeight: '100vh' },
    hero: { backgroundColor: '#3d2314', padding: '4rem 2rem', textAlign: 'center' },
    heroTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem,4vw,3rem)', color: '#f5f0e8', fontWeight: 400, margin: '0 0 0.75rem' },
    heroSub: { fontFamily: '"Manrope", sans-serif', color: 'rgba(245,240,232,0.75)', fontSize: '1rem' },
    filters: { backgroundColor: '#fff', borderBottom: '1px solid #e8ddd4', padding: '1rem 2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' },
    select: { padding: '0.5rem 1rem', border: '1px solid #e8ddd4', backgroundColor: '#faf8f4', fontFamily: '"Manrope", sans-serif', fontSize: '0.9rem', color: '#3d2314' },
    count: { fontFamily: '"Manrope", sans-serif', fontSize: '0.85rem', color: '#7a6355', marginLeft: 'auto' },
    grid: { maxWidth: '1100px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
    card: { backgroundColor: '#fff', border: '1px solid #e8ddd4', padding: '1.5rem', display: 'flex', flexDirection: 'column' },
    cardCat: { fontSize: '0.75rem', fontFamily: '"Manrope", sans-serif', color: '#c2714f', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 600 },
    cardTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', color: '#3d2314', fontWeight: 500, marginBottom: '0.5rem' },
    cardMeta: { fontSize: '0.8rem', color: '#7a6355', fontFamily: '"Manrope", sans-serif', marginBottom: '0.75rem' },
    cardDesc: { fontSize: '0.9rem', color: '#5a4a3a', fontFamily: '"Manrope", sans-serif', lineHeight: 1.6, flex: 1 },
    empty: { textAlign: 'center', padding: '4rem', color: '#7a6355', fontFamily: '"Manrope", sans-serif' },
    emptyTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', color: '#3d2314', marginBottom: '0.5rem' },
  }

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <h1 style={s.heroTitle}>Explore India</h1>
        <p style={s.heroSub}>Browse memories, stories and traditions from across the country</p>
      </div>
      <div style={s.filters}>
        <select style={s.select} value={state} onChange={e => setState(e.target.value)}>
          {STATES.map(st => <option key={st} value={st}>{st}</option>)}
        </select>
        <select style={s.select} value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span style={s.count}>{total} memories</span>
      </div>
      {loading ? (
        <div style={s.empty}><p>Loading memories...</p></div>
      ) : submissions.length === 0 ? (
        <div style={s.empty}>
          <div style={s.emptyTitle}>No memories here yet.</div>
          <p>Be the first to share something from this region.</p>
          <a href="/share" style={{ color: '#c2714f', fontFamily: '"Manrope", sans-serif' }}>Share something you remember →</a>
        </div>
      ) : (
        <div style={s.grid}>
          {submissions.map(sub => (
            <a key={sub.id} href={`/memory/${sub.id}`} style={{ ...s.card, textDecoration: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
              <div style={s.cardCat}>{sub.category?.name}</div>
              <div style={s.cardTitle}>{sub.title}</div>
              <div style={s.cardMeta}>{sub.state?.name}{sub.district ? ` · ${sub.district.name}` : ''}{sub.contributor?.name ? ` · Remembered by ${sub.contributor.name}` : ''}</div>
              {sub.description && <div style={s.cardDesc}>{sub.description.slice(0, 150)}{sub.description.length > 150 ? '...' : ''}</div>}
              <div style={{ marginTop: 'auto', paddingTop: '1rem', fontFamily: '"Manrope", sans-serif', fontSize: '0.8rem', color: '#c2714f', fontWeight: 500 }}>Read memory →</div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
