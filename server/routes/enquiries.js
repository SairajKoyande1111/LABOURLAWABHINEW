import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import ContactEnquiry from '../models/ContactEnquiry.js';

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
