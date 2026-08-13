import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function verifyToken(request) {
  const auth = request.headers.get('Authorization')
  if (!auth || !auth.startsWith('Bearer ')) return null
  try {
    const decoded = JSON.parse(Buffer.from(auth.slice(7), 'base64').toString())
    return decoded
  } catch { return null }
}

export async function GET(request) {
  const user = verifyToken(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const submissions = await prisma.submission.findMany({
      include: { contributor: true },
      orderBy: { createdAt: 'desc' }
    })

    const total = submissions.length
    const pending = submissions.filter(s => s.status === 'PENDING').length
    const approved = submissions.filter(s => s.status === 'APPROVED').length
    const rejected = submissions.filter(s => s.status === 'REJECTED').length

    await prisma.$disconnect()
    return NextResponse.json({ submissions, stats: { total, pending, approved, rejected } })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
