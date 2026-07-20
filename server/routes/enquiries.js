import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import ContactEnquiry from '../models/ContactEnquiry.js';
import { sendMail, ADMIN_EMAIL } from '../mailer.js';

const router = express.Router();

// POST /api/enquiries — public, website visitors submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, service, message } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'name, email and phone are required.' });
    }
    const enquiry = await ContactEnquiry.create({
      name:    String(name).trim(),
      email:   String(email).trim(),
      phone:   String(phone).trim(),
      company: String(company || '').trim(),
      service: String(service || '').trim(),
      message: String(message || '').trim(),
    });

    // Notify admin by email (fire-and-forget)
    sendMail({
      to: ADMIN_EMAIL,
      subject: `New Enquiry from ${String(name).trim()} — Maru Labour Laws`,
      html: `
        <div style="font-family:sans-serif;max-width:540px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
          <h2 style="color:#1a2c4e;margin-top:0">New Contact Enquiry</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#888;width:110px">Name</td><td style="padding:8px 0;font-weight:600">${String(name).trim()}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0">${String(email).trim()}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Phone</td><td style="padding:8px 0">${String(phone).trim()}</td></tr>
            ${company ? `<tr><td style="padding:8px 0;color:#888">Company</td><td style="padding:8px 0">${String(company).trim()}</td></tr>` : ''}
            ${service ? `<tr><td style="padding:8px 0;color:#888">Service</td><td style="padding:8px 0">${String(service).trim()}</td></tr>` : ''}
            ${message ? `<tr><td style="padding:8px 0;color:#888;vertical-align:top">Message</td><td style="padding:8px 0">${String(message).trim().replace(/\n/g, '<br/>')}</td></tr>` : ''}
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
          <p style="color:#bbb;font-size:12px">View all enquiries in the Admin Panel.</p>
        </div>
      `,
      text: `New enquiry from ${String(name).trim()}\nEmail: ${String(email).trim()}\nPhone: ${String(phone).trim()}${company ? `\nCompany: ${String(company).trim()}` : ''}${service ? `\nService: ${String(service).trim()}` : ''}${message ? `\nMessage: ${String(message).trim()}` : ''}`,
    }).catch(() => {});

    res.status(201).json({ ok: true, id: enquiry._id });
  } catch (e) {
    console.error('[enquiries POST]', e);
    res.status(500).json({ error: 'Failed to save enquiry.' });
  }
});

// GET /api/enquiries — admin only
router.get('/', requireAuth, async (req, res) => {
  try {
    const enquiries = await ContactEnquiry.find().sort({ createdAt: -1 }).lean();
    res.json(enquiries);
  } catch (e) {
    console.error('[enquiries GET]', e);
    res.status(500).json({ error: 'Failed to fetch enquiries.' });
  }
});

// PATCH /api/enquiries/:id — admin only, mark as read/unread
router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const { read } = req.body;
    const enq = await ContactEnquiry.findByIdAndUpdate(
      req.params.id,
      { read: Boolean(read) },
      { new: true }
    ).lean();
    if (!enq) return res.status(404).json({ error: 'Enquiry not found.' });
    res.json(enq);
  } catch (e) {
    console.error('[enquiries PATCH]', e);
    res.status(500).json({ error: 'Failed to update enquiry.' });
  }
});

// DELETE /api/enquiries/:id — admin only
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const enq = await ContactEnquiry.findByIdAndDelete(req.params.id).lean();
    if (!enq) return res.status(404).json({ error: 'Not found.' });
    res.json({ ok: true });
  } catch (e) {
    console.error('[enquiries DELETE]', e);
    res.status(500).json({ error: 'Failed to delete enquiry.' });
  }
});

export default router;
