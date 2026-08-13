import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
  try {
    const submission = await prisma.submission.findFirst({
      where: { id: params.id, status: 'APPROVED' },
      include: { contributor: true, category: true, state: true, district: true, language: true, media: true }
    })
    if (!submission) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    await prisma.$disconnect()
    return NextResponse.json({ submission })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
