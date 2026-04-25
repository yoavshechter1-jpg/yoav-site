const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ── Health check (required by Render) ──────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// ── Contact form endpoint ───────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, company, position, email, phone, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Dr. Yoav Shechter Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || 'yoav.shechter1@gmail.com',
      replyTo: email,
      subject: `New Consultation Request — ${name}${company ? ` (${company})` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1a1a2e;">
          <div style="background: linear-gradient(135deg, #0d1f35 0%, #1b3a5c 100%); padding: 28px 32px; border-radius: 10px 10px 0 0;">
            <h2 style="margin:0; color: #c9922a; font-size: 1.25rem; font-weight: 600;">New Consultation Request</h2>
            <p style="margin: 6px 0 0; color: #8ba5c2; font-size: 0.875rem;">Submitted via dr-yoav-shechter.com</p>
          </div>
          <div style="background: #f8f9fc; padding: 32px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 8px 12px 0; color: #64748b; width: 110px; font-weight: 500;">Name</td>
                <td style="padding: 12px 0; font-weight: 600; color: #1a1a2e;">${name}</td>
              </tr>
              ${company ? `
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 8px 12px 0; color: #64748b; font-weight: 500;">Company</td>
                <td style="padding: 12px 0; color: #1a1a2e;">${company}</td>
              </tr>` : ''}
              ${position ? `
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 8px 12px 0; color: #64748b; font-weight: 500;">Position</td>
                <td style="padding: 12px 0; color: #1a1a2e;">${position}</td>
              </tr>` : ''}
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 8px 12px 0; color: #64748b; font-weight: 500;">Email</td>
                <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #c9922a;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 8px 12px 0; color: #64748b; font-weight: 500;">Phone</td>
                <td style="padding: 12px 0; color: #1a1a2e;">${phone}</td>
              </tr>` : ''}
            </table>
            ${message ? `
            <div style="margin-top: 24px; padding: 20px; background: white; border-radius: 8px; border-left: 4px solid #c9922a; box-shadow: 0 1px 4px rgba(0,0,0,0.06);">
              <p style="margin: 0 0 8px; color: #64748b; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Their Message</p>
              <p style="margin: 0; color: #1a1a2e; line-height: 1.7;">${message.replace(/\n/g, '<br>')}</p>
            </div>` : ''}
            <div style="margin-top: 28px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background: #c9922a; color: white; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.9rem;">Reply to ${name}</a>
            </div>
          </div>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to send. Please try again.' });
  }
});

// ── Catch-all: serve the React/HTML app ────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
