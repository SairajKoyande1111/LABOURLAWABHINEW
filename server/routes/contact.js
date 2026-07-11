import express from 'express';
import Contact from '../models/Contact.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let doc = await Contact.findOne({ singleton: 'contact' });
    if (!doc) doc = await Contact.create({ singleton: 'contact' });
    res.json(doc);
  } catch (err) {
    console.error('[contact/get]', err);
    res.status(500).json({ error: 'Failed to load contact content' });
  }
});

router.put('/', requireAuth, async (req, res) => {
  try {
    const update = { ...req.body };
    delete update._id;
    delete update.singleton;
    delete update.createdAt;
    delete update.updatedAt;
    const doc = await Contact.findOneAndUpdate(
      { singleton: 'contact' },
      { $set: update },
      { new: true, upsert: true }
    );
    res.json(doc);
  } catch (err) {
    console.error('[contact/put]', err);
    res.status(500).json({ error: 'Failed to save contact content' });
  }
});

export default router;
