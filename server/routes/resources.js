import express from 'express';
import Resource from '../models/Resource.js';
import { requireAuth } from '../middleware/auth.js';
import { deleteCloudinaryAssets } from '../cloudinaryUtils.js';

const router = express.Router();

// GET /api/resources — list all (optionally filter by ?tab=articles|downloads)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.tab) filter.tab = req.query.tab;
    if (req.query.category) filter.category = req.query.category;
    const resources = await Resource.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(resources);
  } catch (err) {
    console.error('[resources/list]', err);
    res.status(500).json({ error: 'Failed to load resources' });
  }
});

// GET /api/resources/slug/:slug — find article by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const resource = await Resource.findOne({ slug: req.params.slug, tab: 'articles' });
    if (!resource) return res.status(404).json({ error: 'Article not found' });
    res.json(resource);
  } catch (err) {
    console.error('[resources/slug]', err);
    res.status(500).json({ error: 'Failed to load article' });
  }
});

// GET /api/resources/:id — get by id
router.get('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Resource not found' });
    res.json(resource);
  } catch (err) {
    console.error('[resources/get]', err);
    res.status(500).json({ error: 'Failed to load resource' });
  }
});

// POST /api/resources — create
router.post('/', requireAuth, async (req, res) => {
  try {
    const data = { ...req.body };
    // Blank slug should be omitted so the sparse unique index doesn't collide
    if (!data.slug) delete data.slug;
    const resource = await Resource.create(data);
    res.status(201).json(resource);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Slug already exists — choose a different one.' });
    if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
    console.error('[resources/create]', err);
    res.status(500).json({ error: 'Failed to create resource' });
  }
});

// PUT /api/resources/:id — update
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const update = { ...req.body };
    delete update._id;
    // Blank slug should be unset so the sparse unique index doesn't collide
    if (!update.slug) update.slug = undefined;
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true, context: 'query' }
    );
    if (!resource) return res.status(404).json({ error: 'Resource not found' });
    res.json(resource);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Slug already exists — choose a different one.' });
    if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
    console.error('[resources/update]', err);
    res.status(500).json({ error: 'Failed to update resource' });
  }
});

// DELETE /api/resources/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Resource not found' });
    // Clean up both the cover image and the downloadable file from Cloudinary.
    await deleteCloudinaryAssets([resource.img, resource.fileUrl]);
    res.json({ ok: true });
  } catch (err) {
    console.error('[resources/delete]', err);
    res.status(500).json({ error: 'Failed to delete resource' });
  }
});

export default router;
