import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function verifyToken(request) {
  const auth = request.headers.get('Authorization')
  if (!auth || !auth.startsWith('Bearer ')) return null
  try {
    return JSON.parse(Buffer.from(auth.slice(7), 'base64').toString())
  } catch { return null }
}

export async function PATCH(request, { params }) {
  const user = verifyToken(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { action } = await request.json()
    const statusMap = { APPROVE: 'APPROVED', REJECT: 'REJECTED', FLAG: 'FLAGGED', NEEDS_CHANGES: 'NEEDS_CHANGES' }
    const status = statusMap[action]
    if (!status) return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

    const submission = await prisma.submission.update({
      where: { id: params.id },
      data: { status, approvedAt: action === 'APPROVE' ? new Date() : undefined }
    })
    await prisma.$disconnect()
    return NextResponse.json({ submission })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
