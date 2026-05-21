import { normalizeService, normalizeStatus } from '../data/services'

function generateTrackingId() {
  return Math.floor(10000000 + Math.random() * 90000000).toString()
}

async function sendEmailNotification(data) {
  try {
    const isPricing = data.source === 'pricing'
    const subject = isPricing
      ? `📋 New Service Request — ${data.service}`
      : `📞 New Inquiry — Home Page`

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f4f6f8;">
        <div style="max-width:560px;margin:24px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
          <div style="background:#1a2e44;padding:24px 32px;">
            <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">Professionall</h1>
            <p style="margin:4px 0 0;color:#94a3b8;font-size:13px;">Legal Services Platform</p>
          </div>
          <div style="padding:28px 32px;">
            <h2 style="margin:0 0 20px;color:#1a2e44;font-size:18px;border-bottom:2px solid #e2e8f0;padding-bottom:12px;">
              ${isPricing ? '🧾 New Service Request' : '📞 New Lead Inquiry'}
            </h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:600;color:#475569;width:130px;font-size:13px;">📱 Phone</td>
                <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#1e293b;font-size:14px;">${data.phone}</td>
              </tr>
              <tr>
                <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:600;color:#475569;font-size:13px;">⚙️ Service</td>
                <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#1e293b;font-size:14px;">${data.service || 'Not specified'}</td>
              </tr>
              ${isPricing ? `
              <tr>
                <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:600;color:#475569;font-size:13px;">📄 Document</td>
                <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#1e293b;font-size:14px;">${data.document || 'Not selected'}</td>
              </tr>
              <tr>
                <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:600;color:#475569;font-size:13px;">📑 Pages</td>
                <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#1e293b;font-size:14px;">${data.pages || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:600;color:#475569;font-size:13px;">💰 Estimate</td>
                <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#059669;font-size:14px;font-weight:600;">₹${data.estimate}</td>
              </tr>
              <tr>
                <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:600;color:#475569;font-size:13px;">🔖 Tracking ID</td>
                <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#7c3aed;font-size:14px;font-weight:600;">${data.trackingId || 'N/A'}</td>
              </tr>
              ` : `
              <tr>
                <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:600;color:#475569;font-size:13px;">💬 Message</td>
                <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#1e293b;font-size:14px;">${data.message || 'No message'}</td>
              </tr>
              `}
            </table>
            <div style="margin-top:20px;padding:12px 16px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;">
              <p style="margin:0;color:#166534;font-size:13px;">✅ ${isPricing ? 'Service request received. Check Google Sheet for full details.' : 'New lead received. Follow up soon.'}</p>
            </div>
          </div>
          <div style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;">
            <p style="margin:0;color:#94a3b8;font-size:11px;text-align:center;">Professionall — Drafting, Filing & Legal Help Made Simple</p>
          </div>
        </div>
      </body>
      </html>
    `

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': import.meta.env.VITE_BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: 'Professionall', email: import.meta.env.VITE_SENDER_EMAIL },
        to: [{ email: import.meta.env.VITE_NOTIFY_EMAIL }],
        subject,
        htmlContent,
      }),
    })
  } catch (err) {
    console.error('Email notification error:', err)
  }
}

export async function submitHomeLead(data) {
  const SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL_HOME
  const payload = { timestamp: new Date().toISOString(), ...data }

  if (SHEETS_URL && SHEETS_URL !== 'your_home_sheet_apps_script_url') {
    try {
      await fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      console.error('Home sheet error:', err)
    }
  }

  await sendEmailNotification({ phone: data.phone, service: data.service, message: data.message, source: 'home' })

  return { success: true }
}

export async function submitPricingRequest(data) {
  const SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL_PRICING
  const trackingId = generateTrackingId()
  const payload = { timestamp: new Date().toISOString(), ...data, trackingId }

  if (SHEETS_URL && SHEETS_URL !== 'your_pricing_sheet_apps_script_url') {
    try {
      await fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      console.error('Pricing sheet error:', err)
    }
  }

  await sendEmailNotification({
    phone: data.phone,
    service: data.service,
    document: data.document,
    pages: data.pages,
    estimate: data.estimate,
    trackingId,
    source: 'pricing',
  })

  return { success: true, trackingId }
}

export async function trackRequest(trackingId) {
  const SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL_PRICING
  if (!SHEETS_URL || SHEETS_URL === 'your_pricing_sheet_apps_script_url') {
    const id = trackingId.replace(/\D/g, '')
    if (id === '101') return { status: 'drafting', service: 'Both', message: 'Your document is being drafted.' }
    if (id === '102') return { status: 'filing', service: 'Both', message: 'Drafting done, filing in progress.' }
    if (id === '103') return { status: 'numbering', service: 'Both', message: 'Filing done, numbering in progress.' }
    if (id === '104') return { status: 'completed', service: 'Both', message: 'Your request has been completed.' }
    if (id === '105') return { status: 'in-progress', service: 'Drafting', message: 'Your draft is in progress.' }
    if (id === '106') return { status: 'completed', service: 'Filing', message: 'Your filing is completed.' }
    return { status: 'not-found', service: 'Drafting', message: 'Tracking ID not found. Please check and try again.' }
  }
  try {
    const res = await fetch(`${SHEETS_URL}?action=track&id=${encodeURIComponent(trackingId.trim())}`)
    const data = await res.json()
    return {
      ...data,
      status: normalizeStatus(data.status),
      service: normalizeService(data.service),
    }
  } catch (err) {
    console.error('Track error:', err)
    return { status: 'error', service: 'Drafting', message: 'Unable to fetch status. Please try again later.' }
  }
}
