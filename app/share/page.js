"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const categories = ['Recipe','Home remedy','Song','Story','Superstition','Ritual','Game','Proverb','Word','Craft','Tradition','Other']

const states = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Jammu & Kashmir','Ladakh','Delhi','Puducherry']

const s = {
  page: { backgroundColor: '#f5f0e8', minHeight: '100vh', padding: '4rem 1.5rem' },
  wrap: { maxWidth: '680px', margin: '0 auto' },
  title: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '2.5rem', fontWeight: 400, color: '#3d2314', marginBottom: '0.5rem' },
  sub: { fontFamily: '"Manrope", sans-serif', color: '#7a6355', marginBottom: '2.5rem', fontSize: '1rem' },
  card: { backgroundColor: '#fff', border: '1px solid #e8ddd4', padding: '2rem', marginBottom: '1.5rem' },
  stepTitle: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1.5rem', color: '#3d2314', marginBottom: '1.25rem', fontWeight: 500 },
  label: { display: 'block', fontFamily: '"Manrope", sans-serif', fontSize: '0.85rem', color: '#5a4a3a', marginBottom: '0.4rem', fontWeight: 500 },
  input: { width: '100%', padding: '0.7rem', border: '1px solid #e8ddd4', backgroundColor: '#faf8f4', fontFamily: '"Manrope", sans-serif', fontSize: '0.95rem', boxSizing: 'border-box', marginBottom: '1rem' },
  textarea: { width: '100%', padding: '0.7rem', border: '1px solid #e8ddd4', backgroundColor: '#faf8f4', fontFamily: '"Manrope", sans-serif', fontSize: '0.95rem', boxSizing: 'border-box', marginBottom: '1rem', minHeight: '120px', resize: 'vertical' },
  select: { width: '100%', padding: '0.7rem', border: '1px solid #e8ddd4', backgroundColor: '#faf8f4', fontFamily: '"Manrope", sans-serif', fontSize: '0.95rem', boxSizing: 'border-box', marginBottom: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1rem' },
  catBtn: (active) => ({ padding: '0.75rem', border: active ? '2px solid #c2714f' : '1px solid #e8ddd4', backgroundColor: active ? '#fdf0e8' : '#fff', fontFamily: '"Manrope", sans-serif', fontSize: '0.9rem', cursor: 'pointer', color: active ? '#c2714f' : '#5a4a3a', fontWeight: active ? 600 : 400 }),
  btn: { backgroundColor: '#c2714f', color: '#f5f0e8', padding: '0.875rem 2rem', fontFamily: '"Manrope", sans-serif', fontSize: '0.95rem', fontWeight: 500, border: 'none', cursor: 'pointer', marginTop: '0.5rem' },
  progress: { display: 'flex', gap: '0.5rem', marginBottom: '2rem' },
  dot: (active, done) => ({ width: '32px', height: '4px', backgroundColor: done ? '#c2714f' : active ? '#c2714f' : '#e8ddd4' }),
  check: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontFamily: '"Manrope", sans-serif', fontSize: '0.95rem', color: '#3d2314', cursor: 'pointer' },
}

export default function SharePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ category: '', title: '', description: '', story: '', whoTaught: '', language: '', state: '', district: '', town: '', contributorName: '', isAnonymous: false, consent: false })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => s - 1)

  const submit = async () => {
    try {
      const res = await fetch('/api/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) router.push('/thank-you')
    } catch (e) { router.push('/thank-you') }
  }

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <h1 style={s.title}>Share something you've inherited.</h1>
        <p style={s.sub}>Every family has something the internet doesn't. Before it disappears, write it down.</p>

        <div style={s.progress}>
          {[1,2,3,4,5,6].map(n => <div key={n} style={s.dot(step===n, step>n)} />)}
        </div>

        {step === 1 && (
          <div style={s.card}>
            <p style={s.stepTitle}>What are you sharing?</p>
            <div style={s.grid}>
              {categories.map(c => (
                <button key={c} style={s.catBtn(form.category===c)} onClick={() => set('category', c)}>{c}</button>
              ))}
            </div>
            <button style={{ ...s.btn, opacity: form.category ? 1 : 0.5 }} onClick={next} disabled={!form.category}>Continue →</button>
          </div>
        )}

        {step === 2 && (
          <div style={s.card}>
            <p style={s.stepTitle}>Tell us about it</p>
            <label style={s.label}>Title *</label>
            <input style={s.input} value={form.title} onChange={e => set('title', e.target.value)} placeholder={`e.g. Ajji's rasam recipe`} />
            <label style={s.label}>Description</label>
            <input style={s.input} value={form.description} onChange={e => set('description', e.target.value)} placeholder="A brief description" />
            <label style={s.label}>The memory or story behind it</label>
            <textarea style={s.textarea} value={form.story} onChange={e => set('story', e.target.value)} placeholder="How do you know this? What does it mean to you?" />
            <label style={s.label}>Who taught you this?</label>
            <input style={s.input} value={form.whoTaught} onChange={e => set('whoTaught', e.target.value)} placeholder="e.g. My grandmother, My village elder" />
            <label style={s.label}>Language</label>
            <input style={s.input} value={form.language} onChange={e => set('language', e.target.value)} placeholder="e.g. Kannada, Tamil, Hindi" />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ ...s.btn, backgroundColor: '#7a6355' }} onClick={back}>← Back</button>
              <button style={{ ...s.btn, opacity: form.title ? 1 : 0.5 }} onClick={next} disabled={!form.title}>Continue →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={s.card}>
            <p style={s.stepTitle}>Where is it from?</p>
            <label style={s.label}>State *</label>
            <select style={s.select} value={form.state} onChange={e => set('state', e.target.value)}>
              <option value="">Select a state</option>
              {states.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
            <label style={s.label}>District</label>
            <input style={s.input} value={form.district} onChange={e => set('district', e.target.value)} placeholder="e.g. Kodagu, Thanjavur" />
            <label style={s.label}>Town or village (optional)</label>
            <input style={s.input} value={form.town} onChange={e => set('town', e.target.value)} placeholder="e.g. Madikeri" />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ ...s.btn, backgroundColor: '#7a6355' }} onClick={back}>← Back</button>
              <button style={{ ...s.btn, opacity: form.state ? 1 : 0.5 }} onClick={next} disabled={!form.state}>Continue →</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={s.card}>
            <p style={s.stepTitle}>Add media (optional)</p>
            <p style={{ fontFamily: '"Manrope", sans-serif', color: '#7a6355', marginBottom: '1.5rem', fontSize: '0.95rem' }}>You can add images, audio recordings, or video. If you're on a phone, you can record directly.</p>
            <label htmlFor="media-upload" style={{ display: 'block', cursor: 'pointer' }}>
              <div style={{ border: '2px dashed #c2714f', padding: '2.5rem', textAlign: 'center', backgroundColor: '#fdf0e8', marginBottom: '1rem' }}>
                <p style={{ fontFamily: '"Manrope", sans-serif', color: '#c2714f', margin: 0, fontWeight: 500 }}>📎 Tap here to upload a file</p>
                <p style={{ fontFamily: '"Manrope", sans-serif', color: '#b0a090', fontSize: '0.8rem', marginTop: '0.5rem' }}>JPG, PNG, MP3, WAV, MP4, MOV — up to 10MB</p>
                {form.mediaFile && <p style={{ fontFamily: '"Manrope", sans-serif', color: '#2d6a4f', fontSize: '0.85rem', marginTop: '0.75rem', fontWeight: 500 }}>✓ {form.mediaFile}</p>}
              </div>
            </label>
            <input
              id="media-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp,audio/mp3,audio/wav,audio/m4a,video/mp4,video/mov,video/webm"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) set('mediaFile', file.name)
              }}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ ...s.btn, backgroundColor: '#7a6355' }} onClick={back}>← Back</button>
              <button style={s.btn} onClick={next}>Continue →</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div style={s.card}>
            <p style={s.stepTitle}>About you</p>
            <label style={s.check}>
              <input type="checkbox" checked={form.isAnonymous} onChange={e => set('isAnonymous', e.target.checked)} />
              Submit anonymously
            </label>
            {!form.isAnonymous && (
              <>
                <label style={s.label}>Your name (optional)</label>
                <input style={s.input} value={form.contributorName} onChange={e => set('contributorName', e.target.value)} placeholder="How would you like to be credited?" />
              </>
            )}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ ...s.btn, backgroundColor: '#7a6355' }} onClick={back}>← Back</button>
              <button style={s.btn} onClick={next}>Continue →</button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div style={s.card}>
            <p style={s.stepTitle}>One last thing</p>
            <label style={s.check}>
              <input type="checkbox" checked={form.consent} onChange={e => set('consent', e.target.checked)} />
              I confirm that I have permission to share this material and understand that it may become part of the Forgotten India public archive.
            </label>
            <p style={{ fontFamily: '"Manrope", sans-serif', color: '#7a6355', fontSize: '0.85rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              Every submission is reviewed by our team before it is published. Some knowledge belongs to communities — we treat it with care.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ ...s.btn, backgroundColor: '#7a6355' }} onClick={back}>← Back</button>
              <button style={{ ...s.btn, opacity: form.consent ? 1 : 0.5 }} onClick={submit} disabled={!form.consent}>Submit to the archive →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
