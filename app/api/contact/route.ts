import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, companyName, email, originCountry, service, message } = body

    // Simple validation
    if (!fullName || !companyName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Since this is a demo, we would normally use Resend or SendGrid here
    // Example: await resend.emails.send({ ... })

    console.log('Received contact form submission:', { fullName, companyName, email, originCountry, service, message })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
