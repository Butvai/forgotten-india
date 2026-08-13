import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const filename = `memories/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const blob = await put(filename, file, { access: 'public' })

    return NextResponse.json({ url: blob.url })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export const config = { api: { bodyParser: false } }
