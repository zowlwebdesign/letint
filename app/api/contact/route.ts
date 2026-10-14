import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, companyName, email, originCountry, service, message } = body

    // Validation
    if (!fullName || !companyName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, companyName, and email are required.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'info@letintl.com'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'LET INT US <onboarding@resend.dev>'

    // If Resend API key is provided, send real email
    if (apiKey) {
      const resend = new Resend(apiKey)

      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 24px; color: #1e293b; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: #0c1424; padding: 28px 32px; color: #ffffff; border-bottom: 3px solid #00b4ff; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
            .header p { margin: 6px 0 0; font-size: 13px; color: #94a3b8; }
            .content { padding: 32px; }
            .field-group { margin-bottom: 20px; }
            .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 700; margin-bottom: 4px; }
            .field-value { font-size: 15px; color: #0f172a; font-weight: 500; }
            .field-value a { color: #00b4ff; text-decoration: none; }
            .badge { display: inline-block; background: rgba(0, 180, 255, 0.12); color: #0284c7; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
            .message-box { background: #f8fafc; border-left: 3px solid #00b4ff; padding: 16px; border-radius: 0 8px 8px 0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; margin-top: 6px; }
            .footer { padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Client Inquiry — LET INT US</h1>
              <p>Submitted via letintl.com website contact form</p>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="field-label">Contact Name</div>
                <div class="field-value">${fullName}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Company</div>
                <div class="field-value">${companyName}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Business Email</div>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field-group">
                <div class="field-label">Country of Origin</div>
                <div class="field-value">${originCountry || 'Not specified'}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Service of Interest</div>
                <div class="field-value"><span class="badge">${service || 'General Inquiry'}</span></div>
              </div>
              <div class="field-group">
                <div class="field-label">Project Scope / Message</div>
                <div class="message-box">${message || 'No additional message provided.'}</div>
              </div>
            </div>
            <div class="footer">
              Sent automatically from the LET INT US Website • Direct reply is set to ${email}
            </div>
          </div>
        </body>
        </html>
      `

      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [receiverEmail],
        replyTo: email,
        subject: `New Lead: ${companyName} — ${service || 'Logistics Inquiry'}`,
        html: emailHtml,
      })

      if (error) {
        console.error('[Resend Error]:', error)
        return NextResponse.json(
          { error: error.message || 'Error sending email via Resend' },
          { status: 500 }
        )
      }

      console.log('[Resend Success]: Email sent to', receiverEmail, 'ID:', data?.id)
      return NextResponse.json({ success: true, emailId: data?.id })
    }

    // Fallback: If RESEND_API_KEY is not configured yet, log submission and advise setup
    console.warn(
      '[Resend Warning]: RESEND_API_KEY is not defined in environment variables. Email was logged locally:',
      { fullName, companyName, email, originCountry, service, message, destination: receiverEmail }
    )

    return NextResponse.json({
      success: true,
      simulated: true,
      message: 'Inquiry received. Configure RESEND_API_KEY in .env to deliver live emails.',
    })
  } catch (error: any) {
    console.error('[Contact API Error]:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
