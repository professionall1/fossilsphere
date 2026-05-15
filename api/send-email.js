import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, service, message, source } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone is required' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
      user: process.env.BREVO_SMTP_LOGIN,
      pass: process.env.BREVO_SMTP_KEY,
    },
  });

  const subject = source === 'pricing'
    ? `New Pricing Request - ${service}`
    : `New Lead - Home Page`;

  const html = `
    <h2>${subject}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:500px;">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Service</td><td style="padding:8px;border:1px solid #ddd;">${service || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #ddd;">${message || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Source</td><td style="padding:8px;border:1px solid #ddd;">${source || 'website'}</td></tr>
    </table>
    <p style="color:#666;font-size:12px;margin-top:16px;">Sent from Professionall Website</p>
  `;

  try {
    await transporter.sendMail({
      from: `"Professionall" <${process.env.BREVO_SMTP_LOGIN}>`,
      to: process.env.NOTIFY_EMAIL,
      subject,
      html,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
