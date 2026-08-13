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

export async function PUT(request, { params }) {
  const user = verifyToken(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await request.json()
    const { title, description, story, whoTaught, language, town } = body
    const submission = await prisma.submission.update({
      where: { id: params.id },
      data: { 
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(story !== undefined && { story }),
        ...(whoTaught !== undefined && { whoTaught }),
        ...(language !== undefined && { language: language || null }),
        ...(town !== undefined && { town }),
        updatedAt: new Date()
      }
    })
    await prisma.$disconnect()
    return NextResponse.json({ submission })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const user = verifyToken(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await prisma.submission.delete({ where: { id: params.id } })
    await prisma.$disconnect()
    return NextResponse.json({ message: 'Permanently deleted' })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
