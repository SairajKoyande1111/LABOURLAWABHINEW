import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import cloudinary from '../cloudinary.js';
import { requireAuth } from '../middleware/auth.js';
import JobApplication from '../models/JobApplication.js';
import Career from '../models/Career.js';

const router = express.Router();

const ALLOWED_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new Error('UNSUPPORTED_FILE_TYPE'));
    }
    cb(null, true);
  },
});

// POST /api/applications — public, candidates submit their application
router.post('/', (req, res) => {
  upload.single('resume')(req, res, async (err) => {
    if (err?.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'Resume must be smaller than 5 MB.' });
    }
    if (err?.message === 'UNSUPPORTED_FILE_TYPE') {
      return res.status(415).json({ error: 'Only PDF or Word documents are accepted.' });
    }
    if (err) {
      console.error('[applications POST]', err);
      return res.status(500).json({ error: 'Upload failed' });
    }

    try {
      const { name, email, phone, coverNote, careerId } = req.body;
      if (!name || !email || !phone) {
        return res.status(400).json({ error: 'name, email and phone are required.' });
      }
      if (!req.file) {
        return res.status(400).json({ error: 'A resume file is required.' });
      }

      // Resolve career details
      let careerTitle = req.body.careerTitle || '';
      let careerSlug = req.body.careerSlug || '';
      let careerCategory = req.body.careerCategory || 'internal';
      if (careerId) {
        const job = await Career.findById(careerId).lean().catch(() => null);
        if (job) {
          careerTitle = job.title;
          careerSlug = job.slug;
          careerCategory = job.category;
        }
      }

      // Upload resume to Cloudinary under labourcodes/applications
      const mime = req.file.mimetype;
      const originalName = req.file.originalname || 'resume';
      const dot = originalName.lastIndexOf('.');
      const base = (dot > 0 ? originalName.slice(0, dot) : originalName)
        .replace(/[^a-zA-Z0-9-_ ]+/g, '').trim().replace(/\s+/g, '_').slice(0, 80) || 'resume';
      const ext = dot > 0 ? originalName.slice(dot).replace(/[^a-zA-Z0-9.]+/g, '').slice(0, 10) : '';
      const unique = crypto.randomBytes(4).toString('hex');
      const folder = `labourcodes/applications/${unique}`;
      const publicId = `${base}${ext}`;

      const b64 = req.file.buffer.toString('base64');
      const dataUri = `data:${mime};base64,${b64}`;
      const uploaded = await cloudinary.uploader.upload(dataUri, {
        folder,
        resource_type: 'raw',
        public_id: publicId,
      });

      const application = await JobApplication.create({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        coverNote: (coverNote || '').trim(),
        resumeUrl: uploaded.secure_url,
        resumePublicId: uploaded.public_id,
        resumeName: originalName,
        careerId: careerId || null,
        careerTitle,
        careerSlug,
        careerCategory,
      });

      res.status(201).json({ ok: true, id: application._id });
    } catch (e) {
      console.error('[applications POST]', e);
      res.status(500).json({ error: 'Failed to save application.' });
    }
  });
});

// GET /api/applications — admin only, list all applications (optionally filtered by careerId)
router.get('/', requireAuth, async (req, res) => {
  try {
    const filter = {};
    if (req.query.careerId) filter.careerId = req.query.careerId;
    if (req.query.category) filter.careerCategory = req.query.category;
    const apps = await JobApplication.find(filter).sort({ createdAt: -1 }).lean();
    res.json(apps);
  } catch (e) {
    console.error('[applications GET]', e);
    res.status(500).json({ error: 'Failed to fetch applications.' });
  }
});

// PATCH /api/applications/:id — admin only, update status or read flag
router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const allowed = ['status'];
    const update = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) update[key] = req.body[key];
    }
    const app = await JobApplication.findByIdAndUpdate(req.params.id, update, { new: true }).lean();
    if (!app) return res.status(404).json({ error: 'Application not found.' });
    res.json(app);
  } catch (e) {
    console.error('[applications PATCH]', e);
    res.status(500).json({ error: 'Failed to update application.' });
  }
});

// DELETE /api/applications/:id — admin only
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const app = await JobApplication.findById(req.params.id).lean();
    if (!app) return res.status(404).json({ error: 'Not found.' });

    // Remove resume from Cloudinary
    if (app.resumePublicId) {
      cloudinary.uploader.destroy(app.resumePublicId, { resource_type: 'raw' })
        .then(() => {
          const slash = app.resumePublicId.lastIndexOf('/');
          if (slash > 0) {
            const parent = app.resumePublicId.slice(0, slash);
            const depth = (parent.match(/\//g) || []).length;
            if (depth >= 2) cloudinary.api.delete_folder(parent).catch(() => {});
          }
        })
        .catch(() => {});
    }

    await JobApplication.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    console.error('[applications DELETE]', e);
    res.status(500).json({ error: 'Failed to delete application.' });
  }
});

export default router;
