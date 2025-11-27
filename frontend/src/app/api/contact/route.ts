import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

const POST = async (request: NextRequest) => {
  try {
    const data = await request.json()
    await sendEmail(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
  }
}

export { POST }
