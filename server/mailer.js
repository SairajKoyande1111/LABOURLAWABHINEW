import nodemailer from 'nodemailer';

const GMAIL_USER = process.env.ADMIN_EMAIL || 'maru.payslip@gmail.com';
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD;

function createTransport() {
  if (!GMAIL_PASS) {
    console.warn('[mailer] GMAIL_APP_PASSWORD not set — emails will not be sent.');
    return null;
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  });
}

let _transport = null;
function getTransport() {
  if (!_transport) _transport = createTransport();
  return _transport;
}

/**
 * Send an email. Silently logs and continues if mail is not configured.
 */
export async function sendMail({ to, subject, html, text }) {
  const transport = getTransport();
  if (!transport) return;
  try {
    await transport.sendMail({
      from: `"Maru Labour Laws" <${GMAIL_USER}>`,
      to,
      subject,
      html,
      text,
    });
  } catch (err) {
    console.error('[mailer] Failed to send email:', err.message);
  }
}

export const ADMIN_EMAIL = GMAIL_USER;
