import express from 'express';
import multer from 'multer';
import cloudinary from '../cloudinary.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const LIMIT = 1 * 1024 * 1024; // 1 MB

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: LIMIT },
});

// Multer sends a specific error code when the file is too large
function handleMulterError(err, res) {
  if (err?.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File exceeds the 1 MB limit. Please upload a smaller file.' });
  }
  console.error('[upload]', err);
  return res.status(500).json({ error: 'Upload failed' });
}

// Only known section names may be used as folder segments — keeps the
// Cloudinary media library organized and prevents arbitrary folder injection.
const ALLOWED_SECTIONS = new Set([
  'home', 'about', 'clientele', 'services', 'resources', 'careers', 'team', 'misc',
]);

function sanitizeSection(raw) {
  const section = String(raw || 'misc').toLowerCase().replace(/[^a-z0-9-]/g, '');
  return ALLOWED_SECTIONS.has(section) ? section : 'misc';
}

router.post('/', requireAuth, (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) return handleMulterError(err, res);
    try {
      if (!req.file) return res.status(400).json({ error: 'No file provided' });

      const mime = req.file.mimetype;
      const isVideo = mime.startsWith('video/');
      const isImage = mime.startsWith('image/');
      // PDFs, XLSX, DOCX, etc. are uploaded as raw
      const resourceType = isVideo ? 'video' : isImage ? 'image' : 'raw';
      const section = sanitizeSection(req.body?.section);

      const b64 = req.file.buffer.toString('base64');
      const dataUri = `data:${mime};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: `labourcodes/${section}`,
        resource_type: resourceType,
      });
      res.json({ url: result.secure_url, publicId: result.public_id });
    } catch (err) {
      console.error('[upload]', err);
      res.status(500).json({ error: 'Upload failed' });
    }
  });
});

export default router;
