"use client"
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function MemoryPage() {
  const params = useParams()
  const router = useRouter()
  const [memory, setMemory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetch('/api/public/submissions/' + params.id)
        .then(r => r.json())
        .then(d => { setMemory(d.submission); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [params.id])

  const s = {
    page: { backgroundColor: '#f5f0e8', minHeight: '100vh', padding: '4rem 2rem' },
    wrap: { maxWidth: '720px', margin: '0 auto' },
    back: { fontFamily: '"Manrope", sans-serif', fontSize: '0.85rem', color: '#c2714f', cursor: 'pointer', background: 'none', border: 'none', padding: 0, marginBottom: '2rem', display: 'block' },
    cat: { fontSize: '0.75rem', fontFamily: '"Manrope", sans-serif', color: '#c2714f', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.75rem' },
    title: { fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem,4vw,3rem)', color: '#3d2314', fontWeight: 400, lineHeight: 1.2, marginBottom: '1rem' },
    meta: { fontFamily: '"Manrope", sans-serif', fontSize: '0.85rem', color: '#7a6355', marginBottom: '2rem', lineHeight: 1.8 },
    divider: { borderTop: '1px solid #e8ddd4', margin: '2rem 0' },
    section: { marginBottom: '2rem' },
    label: { fontFamily: '"Manrope", sans-serif', fontSize: '0.75rem', color: '#7a6355', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.5rem' },
    body: { fontFamily: '"Manrope", sans-serif', fontSize: '1rem', color: '#3d2314', lineHeight: 1.9 },
    story: { fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: '#5a4a3a', lineHeight: 1.8, fontStyle: 'italic', borderLeft: '3px solid #c2714f', paddingLeft: '1.5rem' },
    attribution: { backgroundColor: '#fff', border: '1px solid #e8ddd4', padding: '1.25rem 1.5rem', marginTop: '2.5rem' },
    attrLabel: { fontFamily: '"Manrope", sans-serif', fontSize: '0.75rem', color: '#7a6355', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.5rem' },
    attrName: { fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem', color: '#3d2314', fontWeight: 500 },
  }

  if (loading) return <div style={{ ...s.page, textAlign: 'center' }}><p style={{ fontFamily: '"Manrope", sans-serif', color: '#7a6355' }}>Loading memory...</p></div>
  if (!memory) return <div style={{ ...s.page, textAlign: 'center' }}><p style={{ fontFamily: '"Manrope", sans-serif', color: '#7a6355' }}>Memory not found.</p></div>

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <button style={s.back} onClick={() => router.back()}>← Back</button>
        <div style={s.cat}>{memory.category?.name}</div>
        <h1 style={s.title}>{memory.title}</h1>
        <div style={s.meta}>
          {memory.state?.name}{memory.district ? ' · ' + memory.district.name : ''}{memory.town ? ' · ' + memory.town : ''}<br/>
          {memory.language?.name && <>Language: {memory.language.name}<br/></>}
          {memory.whoTaught && <>Learned from: {memory.whoTaught}</>}
        </div>
        <div style={s.divider} />
        {memory.description && (
          <div style={s.section}>
            <div style={s.label}>About</div>
            <p style={s.body}>{memory.description}</p>
          </div>
        )}
        {memory.story && (
          <div style={s.section}>
            <div style={s.label}>The memory</div>
            <p style={s.story}>{memory.story}</p>
          </div>
        )}
        {memory.content && memory.content !== memory.story && (
          <div style={s.section}>
            <div style={s.label}>Full record</div>
            <p style={s.body}>{memory.content}</p>
          </div>
        )}
        <div style={s.divider} />
        <div style={s.attribution}>
          <div style={s.attrLabel}>Remembered by</div>
          <div style={s.attrName}>{memory.contributor?.isAnonymous || !memory.contributor?.name ? 'Anonymous' : memory.contributor.name}</div>
          {memory.whoTaught && <div style={{ ...s.body, fontSize: '0.9rem', color: '#7a6355', marginTop: '0.25rem' }}>Learned from {memory.whoTaught}</div>}
        </div>
      </div>
    </div>
  )
}
