import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    const { category, title, description, story, whoTaught, language, state, district, contributorName, isAnonymous } = body

    if (!category || !title || !state) {
      return NextResponse.json(
        { error: 'Missing required fields: category, title, and state are required.' },
        { status: 400 }
      )
    }

    const submission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category,
      title,
      description: description || null,
      story: story || null,
      whoTaught: whoTaught || null,
      language: language || null,
      state,
      district: district || null,
      contributorName: isAnonymous ? null : (contributorName || null),
      isAnonymous: isAnonymous || false,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    }

    console.log('[Submission received]', JSON.stringify(submission, null, 2))

    return NextResponse.json(
      {
        success: true,
        message: 'Your memory has been submitted for review.',
        id: submission.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[Submission error]', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Submissions API is active. Use POST to submit a memory.' },
    { status: 200 }
  )
}
