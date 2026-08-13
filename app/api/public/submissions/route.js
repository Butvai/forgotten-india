import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const state = searchParams.get('state') || ''
    const category = searchParams.get('category') || ''
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where = {
      status: 'APPROVED',
      AND: [
        query ? {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { story: { contains: query, mode: 'insensitive' } },
          ]
        } : {},
        state ? { state: { name: { contains: state, mode: 'insensitive' } } } : {},
        category ? { category: { name: { contains: category, mode: 'insensitive' } } } : {},
      ]
    }

    const [submissions, total] = await Promise.all([
      prisma.submission.findMany({
        where,
        include: { contributor: true, category: true, state: true, district: true, language: true },
        orderBy: { approvedAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.submission.count({ where })
    ])

    await prisma.$disconnect()
    return NextResponse.json({ submissions, total })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
