import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const submissionId = formData.get('submissionId')

    if (!file || !submissionId) {
      return NextResponse.json(
        { error: 'File and submission ID are required' },
        { status: 400 }
      )
    }

    // Validate file type
    const fileType = file.type.split('/')[0] // image, audio, or video
    if (!['image', 'audio', 'video'].includes(fileType)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images, audio, and video are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop()
    const uniqueFilename = `${uuidv4()}.${fileExtension}`
    const uploadDir = process.env.UPLOAD_DIR || '/app/public/uploads'
    const filepath = join(uploadDir, uniqueFilename)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filepath, buffer)

    // Save to database
    const media = await prisma.media.create({
      data: {
        submissionId,
        type: fileType,
        filename: uniqueFilename,
        originalName: file.name,
        filepath: `/uploads/${uniqueFilename}`,
        mimeType: file.type,
        size: file.size,
      }
    })

    return NextResponse.json(media, { status: 201 })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    )
  }
}