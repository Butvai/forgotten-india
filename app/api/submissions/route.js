import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const body = await request.json()
    const { category, title, description, story, whoTaught, language, state, district, town, contributorName, isAnonymous } = body

    if (!title || !category || !state) {
      return NextResponse.json({ error: 'Title, category and state are required' }, { status: 400 })
    }

    // Get or create category
    let cat = await prisma.category.findFirst({ where: { name: category } })
    if (!cat) cat = await prisma.category.create({ data: { name: category, slug: category.toLowerCase().replace(/\s+/g, '-') } })

    // Get or create state
    let st = await prisma.state.findFirst({ where: { name: state } })
    if (!st) st = await prisma.state.create({ data: { name: state, slug: state.toLowerCase().replace(/\s+/g, '-') } })

    // Get or create district
    let dist = null
    if (district) {
      dist = await prisma.district.findFirst({ where: { name: district, stateId: st.id } })
      if (!dist) dist = await prisma.district.create({ data: { name: district, slug: district.toLowerCase().replace(/\s+/g, '-'), stateId: st.id } })
    }

    // Create contributor
    const contributor = await prisma.contributor.create({
      data: { name: isAnonymous ? null : (contributorName || null), isAnonymous: !!isAnonymous }
    })

    // Create language record if provided
    let lang = null
    if (language) {
      lang = await prisma.language.findFirst({ where: { name: language } })
      if (!lang) lang = await prisma.language.create({ data: { name: language, code: language.toLowerCase().slice(0, 5) } })
    }

    // Create submission
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now()
    const submission = await prisma.submission.create({
      data: {
        slug, title, description: description || null, content: story || null,
        story: story || null, whoTaught: whoTaught || null,
        categoryId: cat.id, stateId: st.id,
        districtId: dist?.id || null, languageId: lang?.id || null,
        contributorId: contributor.id, town: town || null,
        status: 'PENDING'
      }
    })

    // Create media record if mediaUrl is provided
    if (body.mediaUrl) {
      const mediaType = body.mediaUrl.match(/\.(mp4|mov|webm|avi)$/i) ? 'VIDEO' :
                        body.mediaUrl.match(/\.(mp3|wav|m4a|ogg)$/i) ? 'AUDIO' : 'IMAGE'
      await prisma.media.create({
        data: { submissionId: submission.id, url: body.mediaUrl, type: mediaType }
      })
    }

    await prisma.$disconnect()
    return NextResponse.json({ submission, message: 'Submitted successfully' })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
