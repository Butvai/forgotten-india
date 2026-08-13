import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    if (user.role !== 'ADMIN' && user.role !== 'MODERATOR') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    return NextResponse.json({ 
      token: Buffer.from(JSON.stringify({ id: user.id, email: user.email, role: user.role })).toString('base64'),
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
