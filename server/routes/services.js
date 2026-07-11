import express from 'express';
import Service from '../models/Service.js';
import { requireAuth } from '../middleware/auth.js';
import { deleteCloudinaryAssets } from '../cloudinaryUtils.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    res.json(services);
  } catch (err) {
    console.error('[services/list]', err);
    res.status(500).json({ error: 'Failed to load services' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    console.error('[services/get]', err);
    res.status(500).json({ error: 'Failed to load service' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Slug already exists' });
    console.error('[services/create]', err);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const update = { ...req.body };
    delete update._id;
    const service = await Service.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Slug already exists' });
    console.error('[services/update]', err);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    // Clean up Cloudinary assets after the DB record is gone so a DB failure
    // never leaves the record alive with a deleted asset.
    await deleteCloudinaryAssets([service.img]);
    res.json({ ok: true });
  } catch (err) {
    console.error('[services/delete]', err);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

export default router;
