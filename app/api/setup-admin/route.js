import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { PrismaClient } = require('@prisma/client')
    const bcrypt = require('bcryptjs')
    const prisma = new PrismaClient()
    
    const existing = await prisma.user.findUnique({ where: { email: 'admin@forgottenindia.org' } })
    if (existing) {
      await prisma.$disconnect()
      return NextResponse.json({ message: 'Admin already exists. You can log in.' })
    }
    
    const hash = await bcrypt.hash('admin123456', 12)
    await prisma.user.create({
      data: { email: 'admin@forgottenindia.org', password: hash, name: 'Admin', role: 'ADMIN' }
    })
    await prisma.$disconnect()
    return NextResponse.json({ message: 'Admin created. You can now log in at /admin with admin@forgottenindia.org / admin123456' })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
