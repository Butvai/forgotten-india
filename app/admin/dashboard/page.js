"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState([])
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('pending')

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) { router.push('/admin'); return }
    fetchSubmissions(token)
  }, [])

  const fetchSubmissions = async (token) => {
    try {
      const res = await fetch('/api/admin/submissions', {
        headers: { 'Authorization': 'Bearer ' + token }
      })
      if (res.status === 401) { router.push('/admin'); return }
      const data = await res.json()
      setSubmissions(data.submissions || [])
      setStats(data.stats || { total: 0, pending: 0, approved: 0, rejected: 0 })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const moderate = async (id, action) => {
    const token = localStorage.getItem('authToken')
    await fetch('/api/admin/submissions/' + id, {
      method: 'PATCH',
      headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    })
    fetchSubmissions(token)
  }

  const logout = () => { localStorage.removeItem('authToken'); router.push('/admin') }

  const filtered = submissions.filter(s => activeTab === 'all' ? true : s.status.toLowerCase() === activeTab)

  const s = {
    page: { backgroundColor: '#f5f0e8', minHeight: '100vh', fontFamily: '"Manrope", sans-serif' },
    header: { backgroundColor: '#3d2314', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    headerTitle: { color: '#f5f0e8', fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 400, margin: 0 },
    logoutBtn: { backgroundColor: 'transparent', border: '1px solid rgba(245,240,232,0.4)', color: '#f5f0e8', padding: '0.4rem 1rem', cursor: 'pointer', fontSize: '0.85rem' },
    content: { maxWidth: '1200px', margin: '0 auto', padding: '2rem' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' },
    statCard: (color) => ({ backgroundColor: '#fff', border: '1px solid #e8ddd4', padding: '1.5rem', textAlign: 'center', borderTop: '3px solid ' + color }),
    statNum: { fontSize: '2rem', fontWeight: 700, color: '#3d2314', fontFamily: '"Cormorant Garamond", serif' },
    statLabel: { fontSize: '0.8rem', color: '#7a6355', textTransform: 'uppercase', letterSpacing: '0.05em' },
    tabs: { display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' },
    tab: (active) => ({ padding: '0.5rem 1.25rem', border: '1px solid #e8ddd4', backgroundColor: active ? '#3d2314' : '#fff', color: active ? '#f5f0e8' : '#3d2314', cursor: 'pointer', fontSize: '0.9rem' }),
    card: { backgroundColor: '#fff', border: '1px solid #e8ddd4', padding: '1.5rem', marginBottom: '1rem' },
    cardTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: '1.25rem', color: '#3d2314', marginBottom: '0.25rem', fontWeight: 500 },
    meta: { fontSize: '0.8rem', color: '#7a6355', marginBottom: '0.75rem' },
    desc: { fontSize: '0.9rem', color: '#5a4a3a', marginBottom: '1rem', lineHeight: 1.6 },
    actions: { display: 'flex', gap: '0.5rem' },
    approveBtn: { backgroundColor: '#2d6a4f', color: '#fff', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.85rem' },
    rejectBtn: { backgroundColor: '#c0392b', color: '#fff', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.85rem' },
    badge: (status) => ({
      display: 'inline-block', padding: '0.2rem 0.6rem', fontSize: '0.75rem', fontWeight: 600,
      backgroundColor: status === 'PENDING' ? '#fff3cd' : status === 'APPROVED' ? '#d4edda' : '#f8d7da',
      color: status === 'PENDING' ? '#856404' : status === 'APPROVED' ? '#155724' : '#721c24',
      marginLeft: '0.5rem'
    }),
    empty: { textAlign: 'center', padding: '3rem', color: '#7a6355' }
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.headerTitle}>Forgotten India — Admin</h1>
        <button style={s.logoutBtn} onClick={logout}>Sign out</button>
      </div>
      <div style={s.content}>
        <div style={s.statsGrid}>
          <div style={s.statCard('#c2714f')}><div style={s.statNum}>{stats.total}</div><div style={s.statLabel}>Total</div></div>
          <div style={s.statCard('#f0a500')}><div style={s.statNum}>{stats.pending}</div><div style={s.statLabel}>Pending</div></div>
          <div style={s.statCard('#2d6a4f')}><div style={s.statNum}>{stats.approved}</div><div style={s.statLabel}>Approved</div></div>
          <div style={s.statCard('#c0392b')}><div style={s.statNum}>{stats.rejected}</div><div style={s.statLabel}>Rejected</div></div>
        </div>

        <div style={s.tabs}>
          {['pending','approved','rejected','all'].map(tab => (
            <button key={tab} style={s.tab(activeTab===tab)} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {loading ? <div style={s.empty}>Loading submissions...</div> :
         filtered.length === 0 ? <div style={s.empty}>No {activeTab} submissions yet.</div> :
         filtered.map(sub => (
          <div key={sub.id} style={s.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={s.cardTitle}>{sub.title}<span style={s.badge(sub.status)}>{sub.status}</span></div>
                <div style={s.meta}>{sub.category} · {sub.state} {sub.district ? '· ' + sub.district : ''} · {new Date(sub.createdAt).toLocaleDateString('en-IN')}</div>
              </div>
            </div>
            {sub.description && <div style={s.desc}>{sub.description}</div>}
            {sub.story && <div style={{ ...s.desc, fontStyle: 'italic', borderLeft: '3px solid #e8ddd4', paddingLeft: '1rem' }}>{sub.story}</div>}
            <div style={s.meta}>Contributor: {sub.contributor?.name || 'Anonymous'} · Language: {sub.language || 'Not specified'}</div>
            {sub.status === 'PENDING' && (
              <div style={s.actions}>
                <button style={s.approveBtn} onClick={() => moderate(sub.id, 'APPROVE')}>✓ Approve</button>
                <button style={s.rejectBtn} onClick={() => moderate(sub.id, 'REJECT')}>✗ Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
