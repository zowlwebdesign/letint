import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import fs from 'fs'
import path from 'path'
import { client } from '../../../sanity/lib/client'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      nombre,
      empresa,
      correo,
      paisOrigen,
      producto,
      entidadLegalColombia,
      certificadoRetie,
      solucionInteres,
      mensaje,
      aceptaDatos,
      idioma = 'en',
      vistaOrigen = 'industry_site',
      utm_source = '',
      utm_medium = '',
      utm_campaign = '',
      utm_content = '',
      utm_term = '',
    } = body

    // 1. Validation
    if (!nombre || !empresa || !correo) {
      return NextResponse.json(
        { error: 'Missing required fields: name, company and corporate email are required.' },
        { status: 400 }
      )
    }

    if (!aceptaDatos) {
      return NextResponse.json(
        { error: 'You must accept the personal data processing policy (Law 1581 of 2012).' },
        { status: 400 }
      )
    }

    const timestamp = new Date().toISOString()
    const isEs = idioma === 'es'

    // 2. Backup Lead into Sanity (Non-blocking fallback)
    try {
      const sanityToken =
        process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN
      if (sanityToken) {
        const writeClient = client.withConfig({
          token: sanityToken,
          useCdn: false,
        })

        await writeClient.create({
          _type: 'solarLead',
          nombre,
          empresa,
          correo,
          paisOrigen: paisOrigen || 'Not specified',
          producto: producto || 'Inversores',
          entidadLegalColombia: entidadLegalColombia || 'Not specified',
          certificadoRetie: certificadoRetie || 'Not specified',
          solucionInteres: solucionInteres || 'After-sales & warranties',
          mensaje: mensaje || '',
          aceptaDatos: Boolean(aceptaDatos),
          idioma,
          vistaOrigen,
          utm_source,
          utm_medium,
          utm_campaign,
          utm_content,
          utm_term,
          submittedAt: timestamp,
        })
        console.log('[Sanity Success]: Lead stored in solarLead collection')
      }
    } catch (sanityErr: any) {
      console.warn('[Sanity Lead Save Warning]:', sanityErr.message || sanityErr)
      // Continue without failing the user response
    }

    // 3. Email Automation via Resend
    const apiKey = process.env.RESEND_API_KEY
    const receiverEmail =
      process.env.CONTACT_EMAIL_TO ||
      process.env.CONTACT_RECEIVER_EMAIL ||
      'info@letintl.com'
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      'LET PRO Solar <notifications@letintl.com>'

    // Prepare Brochure Attachment
    const brochureFileName = isEs ? 'brochure-solar-es.pdf' : 'brochure-solar-en.pdf'
    const envBrochureUrl = isEs
      ? process.env.SOLAR_BROCHURE_ES_URL
      : process.env.SOLAR_BROCHURE_EN_URL

    // Query Sanity for uploaded brochure PDF asset (if not overridden by env)
    let sanityBrochureUrl: string | null = null
    try {
      const sanityDoc = await client.fetch(
        `*[_type == "industryPage" && slug.current == "energia-solar"][0]{
          "brochureEsUrl": brochurePdf.brochureEs.asset->url,
          "brochureEnUrl": brochurePdf.brochureEn.asset->url,
          "brochureGeneralUrl": brochurePdf.brochureFile.asset->url
        }`
      )
      if (sanityDoc) {
        sanityBrochureUrl = isEs
          ? (sanityDoc.brochureEsUrl || sanityDoc.brochureGeneralUrl)
          : (sanityDoc.brochureEnUrl || sanityDoc.brochureGeneralUrl)
      }
    } catch (sanityPdfErr) {
      console.warn('[Sanity Brochure Lookup Warning]:', sanityPdfErr)
    }

    const effectiveBrochureUrl = envBrochureUrl || sanityBrochureUrl

    let attachmentObj: any = null
    try {
      if (effectiveBrochureUrl && (effectiveBrochureUrl.startsWith('http://') || effectiveBrochureUrl.startsWith('https://'))) {
        attachmentObj = {
          filename: isEs ? 'Brochure_LET_Pro_Energia_Solar_ES.pdf' : 'Brochure_LET_Pro_Solar_Energy_EN.pdf',
          path: effectiveBrochureUrl,
        }
      } else {
        const localPath = path.join(process.cwd(), 'public', 'docs', brochureFileName)
        if (fs.existsSync(localPath)) {
          const buffer = fs.readFileSync(localPath)
          attachmentObj = {
            filename: isEs ? 'Brochure_LET_Pro_Energia_Solar_ES.pdf' : 'Brochure_LET_Pro_Solar_Energy_EN.pdf',
            content: buffer,
          }
        }
      }
    } catch (attErr) {
      console.warn('[Brochure Attachment Warning]:', attErr)
    }

    if (apiKey) {
      const resend = new Resend(apiKey)

      // ─── Correo 1: Notificación Interna a LET ───
      const internalSubject = `[LEAD SOLAR] ${empresa} (${paisOrigen || 'Global'}) — ${solucionInteres}`
      const internalHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f9; margin: 0; padding: 24px; color: #1e293b; }
            .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
            .header { background: #0c1424; padding: 26px 32px; color: #ffffff; border-bottom: 3px solid #00b4ff; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; }
            .header p { margin: 6px 0 0; font-size: 13px; color: #94a3b8; }
            .content { padding: 32px; }
            .field-row { margin-bottom: 18px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
            .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 700; margin-bottom: 4px; }
            .field-val { font-size: 15px; color: #0f172a; font-weight: 600; }
            .field-val a { color: #00b4ff; text-decoration: none; }
            .badge { display: inline-block; background: rgba(0, 180, 255, 0.12); color: #0284c7; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; }
            .msg-box { background: #f8fafc; border-left: 3px solid #00b4ff; padding: 14px; border-radius: 0 8px 8px 0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
            .compliance-tag { background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; padding: 10px 14px; border-radius: 8px; font-size: 12px; margin-top: 20px; font-weight: 500; }
            .footer { padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nuevo Diagnóstico Comercial — Sector Solar & BESS</h1>
              <p>Captado vía página de Industria / Campaña LET PRO</p>
            </div>
            <div class="content">
              <div class="field-row">
                <div class="field-label">Nombre del Contacto</div>
                <div class="field-val">${nombre}</div>
              </div>
              <div class="field-row">
                <div class="field-label">Empresa / Fabricante</div>
                <div class="field-val">${empresa}</div>
              </div>
              <div class="field-row">
                <div class="field-label">Correo Corporativo</div>
                <div class="field-val"><a href="mailto:${correo}">${correo}</a></div>
              </div>
              <div class="field-row">
                <div class="field-label">País de Origen</div>
                <div class="field-val">${paisOrigen || 'No especificado (Campaña)'}</div>
              </div>
              <div class="field-row">
                <div class="field-label">Equipo / Producto Principal</div>
                <div class="field-val"><span class="badge">${producto || 'Inversores'}</span></div>
              </div>
              <div class="field-row">
                <div class="field-label">¿Sociedad Local en Colombia?</div>
                <div class="field-val">${entidadLegalColombia || 'No especificado'}</div>
              </div>
              <div class="field-row">
                <div class="field-label">Certificado RETIE 2024</div>
                <div class="field-val">${certificadoRetie || 'No especificado'}</div>
              </div>
              <div class="field-row">
                <div class="field-label">Solución de Interés Prioritaria</div>
                <div class="field-val">${solucionInteres}</div>
              </div>
              <div class="field-row">
                <div class="field-label">Mensaje / Alcance</div>
                <div class="msg-box">${mensaje || 'Sin mensaje adicional ingresado.'}</div>
              </div>
              <div class="field-row">
                <div class="field-label">Metadatos de Conversión</div>
                <div style="font-size: 13px; color: #475569; line-height: 1.5;">
                  <strong>Vista de Origen:</strong> ${vistaOrigen}<br>
                  <strong>Idioma:</strong> ${idioma.toUpperCase()}<br>
                  <strong>UTM Source:</strong> ${utm_source || 'directo'}<br>
                  <strong>UTM Medium:</strong> ${utm_medium || '-'}<br>
                  <strong>UTM Campaign:</strong> ${utm_campaign || '-'}<br>
                  <strong>UTM Content:</strong> ${utm_content || '-'}
                </div>
              </div>
              <div class="compliance-tag">
                ✓ <strong>Consentimiento Ley 1581 de 2012:</strong> El prospecto autorizó expresamente el tratamiento de datos personales con fecha y hora: ${timestamp}.
              </div>
            </div>
            <div class="footer">
              Notificación automática del sistema LET PRO • Reply-To configurado a: ${correo}
            </div>
          </div>
        </body>
        </html>
      `

      // ─── Correo 2: Autoresponder al Prospecto con Brochure PDF ───
      const prospectSubject = isEs
        ? `Brochure Ejecutivo: Soluciones para Fabricantes de Energía Solar en Colombia — LET PRO`
        : `Executive Brochure: Operational & Regulatory Solutions for Solar Manufacturers in Colombia — LET PRO`

      const prospectHtml = isEs
        ? `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0c1424; margin: 0; padding: 24px; color: #ffffff; }
            .container { max-width: 600px; margin: 0 auto; background: #0f192d; border-radius: 14px; overflow: hidden; border: 1px solid rgba(0, 180, 255, 0.25); }
            .header { background: #0c1424; padding: 32px 36px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
            .logo { font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; }
            .logo-accent { color: #00b4ff; }
            .content { padding: 36px; color: #e2e8f0; line-height: 1.65; font-size: 15px; }
            .content h2 { color: #ffffff; font-size: 20px; margin-top: 0; margin-bottom: 16px; }
            .card-highlight { background: rgba(0, 180, 255, 0.08); border-left: 3px solid #00b4ff; border-radius: 0 8px 8px 0; padding: 18px 20px; margin: 24px 0; }
            .card-highlight h3 { margin: 0 0 8px 0; font-size: 15px; color: #00b4ff; }
            .btn { display: inline-block; background: #00b4ff; color: #040e21; font-weight: 700; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 14px; }
            .footer { padding: 24px 36px; background: #080e1c; font-size: 12px; color: #94a3b8; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">LET PRO <span class="logo-accent">| SOLAR & STORAGE</span></div>
            </div>
            <div class="content">
              <h2>Estimado(a) ${nombre},</h2>
              <p>
                Agradecemos su interés en los servicios especializados de LET para la industria de 
                <strong>Energía Solar y Almacenamiento (BESS)</strong> en Colombia.
              </p>
              <p>
                Hemos recibido su diagnóstico preliminar para <strong>${empresa}</strong>. Nuestro equipo de 
                cumplimiento regulatorio (RETIE 2024 / Resolución 40117) y operaciones de posventa está analizando 
                su requerimiento sobre <strong>${solucionInteres}</strong>.
              </p>
              <div class="card-highlight">
                <h3>Brochure Ejecutivo Adjunto</h3>
                <p style="margin: 0; font-size: 14px;">
                  Adjunto a este correo encontrará el documento técnico y operativo que resume cómo operamos 
                  como titular regulatorio (ICR), importador de record (IOR/EOR) y custodia FSL para fabricantes fotovoltaicos.
                </p>
              </div>
              <p>
                Un director de cuenta especializado se pondrá en contacto con usted en un plazo no mayor a 24 horas 
                hábiles para compartir los hallazgos preliminares.
              </p>
              <p style="margin-top: 28px;">
                Atentamente,<br>
                <strong>Dirección de Cuentas Corporativas & Energía</strong><br>
                LET · LET PRO
              </p>
            </div>
            <div class="footer">
              LET — LET INT (EE. UU.) · LET PRO, LET ADA y LET LOG (Colombia).<br>
              Bogotá · Barranquilla · Medellín · Miami, FL.
            </div>
          </div>
        </body>
        </html>
      `
        : `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0c1424; margin: 0; padding: 24px; color: #ffffff; }
            .container { max-width: 600px; margin: 0 auto; background: #0f192d; border-radius: 14px; overflow: hidden; border: 1px solid rgba(0, 180, 255, 0.25); }
            .header { background: #0c1424; padding: 32px 36px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
            .logo { font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; }
            .logo-accent { color: #00b4ff; }
            .content { padding: 36px; color: #e2e8f0; line-height: 1.65; font-size: 15px; }
            .content h2 { color: #ffffff; font-size: 20px; margin-top: 0; margin-bottom: 16px; }
            .card-highlight { background: rgba(0, 180, 255, 0.08); border-left: 3px solid #00b4ff; border-radius: 0 8px 8px 0; padding: 18px 20px; margin: 24px 0; }
            .card-highlight h3 { margin: 0 0 8px 0; font-size: 15px; color: #00b4ff; }
            .footer { padding: 24px 36px; background: #080e1c; font-size: 12px; color: #94a3b8; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">LET PRO <span class="logo-accent">| SOLAR & STORAGE</span></div>
            </div>
            <div class="content">
              <h2>Dear ${nombre},</h2>
              <p>
                Thank you for your interest in LET's dedicated solutions for the 
                <strong>Solar Energy & Energy Storage (BESS)</strong> sector in Colombia.
              </p>
              <p>
                We have received the operational assessment details for <strong>${empresa}</strong>. Our regulatory compliance 
                team (RETIE 2024 / Resolution 40117) and after-sales logistics division are currently reviewing your requirement 
                regarding <strong>${solucionInteres}</strong>.
              </p>
              <div class="card-highlight">
                <h3>Attached Executive Brochure</h3>
                <p style="margin: 0; font-size: 14px;">
                  Attached to this email you will find the operational and technical brochure detailing our role as 
                  Regulatory Holder (ICR), Importer & Exporter of Record (IOR/EOR), and Forward Stocking Location (FSL).
                </p>
              </div>
              <p>
                A designated corporate director will follow up with you within 24 business hours.
              </p>
              <p style="margin-top: 28px;">
                Best regards,<br>
                <strong>Corporate Accounts & Energy Division</strong><br>
                LET · LET PRO
              </p>
            </div>
            <div class="footer">
              LET — LET INT (United States) · LET PRO, LET ADA, and LET LOG (Colombia).<br>
              Bogotá · Barranquilla · Medellín · Miami, FL.
            </div>
          </div>
        </body>
        </html>
      `

      // Execute both emails concurrently
      const emailPromises: Promise<any>[] = [
        resend.emails.send({
          from: fromEmail,
          to: [receiverEmail],
          replyTo: correo,
          subject: internalSubject,
          html: internalHtml,
        }),
        resend.emails.send({
          from: fromEmail,
          to: [correo],
          replyTo: receiverEmail,
          subject: prospectSubject,
          html: prospectHtml,
          ...(attachmentObj ? { attachments: [attachmentObj] } : {}),
        }),
      ]

      const [resInternal, resProspect] = await Promise.all(emailPromises)

      if (resInternal.error) {
        console.error('[Resend Internal Notification Error]:', resInternal.error)
      }
      if (resProspect.error) {
        console.error('[Resend Prospect Autoresponder Error]:', resProspect.error)
      }

      console.log('[Resend Success]: Both notifications dispatched successfully')
      return NextResponse.json({
        success: true,
        internalEmailId: resInternal.data?.id,
        prospectEmailId: resProspect.data?.id,
      })
    }

    // Fallback: If RESEND_API_KEY is not configured
    console.warn(
      '[Resend Warning]: RESEND_API_KEY is not defined. Inquiry was logged locally:',
      { nombre, empresa, correo, solucionInteres, receiverEmail }
    )

    return NextResponse.json({
      success: true,
      simulated: true,
      message: 'Inquiry processed. Configure RESEND_API_KEY in .env to deliver live emails.',
    })
  } catch (error: any) {
    console.error('[Solar Contact API Error]:', error)
    return NextResponse.json(
      { error: 'Error processing the contact request.' },
      { status: 500 }
    )
  }
}
