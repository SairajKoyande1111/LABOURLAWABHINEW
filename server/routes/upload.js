import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import cloudinary from '../cloudinary.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const LIMIT = 1 * 1024 * 1024; // 1 MB

// Only file types the admin UI actually needs — blocks HTML/SVG/executables
// from being uploaded and served back as publicly linkable Cloudinary URLs.
// SVG is deliberately excluded even though it matches "image/*": it's XML that
// can embed <script>, making it an XSS vector when served back as a public URL.
const BLOCKED_IMAGE_MIME = new Set(['image/svg+xml']);
const ALLOWED_MIME_PREFIXES = ['image/', 'video/'];
const ALLOWED_MIME_EXACT = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);

function isAllowedMime(rawMime) {
  // Normalize: lowercase and strip any "; charset=..." style parameters so
  // variants like "IMAGE/SVG+XML; charset=utf-8" can't slip past the block.
  const mime = String(rawMime || '').toLowerCase().split(';')[0].trim();
  if (BLOCKED_IMAGE_MIME.has(mime)) return false;
  return ALLOWED_MIME_PREFIXES.some((p) => mime.startsWith(p)) || ALLOWED_MIME_EXACT.has(mime);
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: LIMIT },
  fileFilter: (req, file, cb) => {
    if (!isAllowedMime(file.mimetype)) {
      return cb(new Error('UNSUPPORTED_FILE_TYPE'));
    }
    cb(null, true);
  },
});

// Multer sends a specific error code when the file is too large
function handleMulterError(err, res) {
  if (err?.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File exceeds the 1 MB limit. Please upload a smaller file.' });
  }
  if (err?.message === 'UNSUPPORTED_FILE_TYPE') {
    return res.status(415).json({ error: 'Unsupported file type. Please upload an image, video, PDF, DOC/DOCX, or XLS/XLSX file.' });
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

// Derive a Cloudinary public_id from the uploaded file's original name so the
// asset is identifiable in the media library and — more importantly — so
// downloads on the site are served back with that same filename instead of a
// random Cloudinary-generated id (e.g. "ftwepllyjtjvm13mis2v").
function sanitizeFilename(originalName) {
  const name = String(originalName || 'file');
  const dot = name.lastIndexOf('.');
  const hasExt = dot > 0 && dot < name.length - 1;
  const base = hasExt ? name.slice(0, dot) : name;
  const ext = hasExt ? name.slice(dot) : '';
  const safeBase = base
    .replace(/[^a-zA-Z0-9-_ ]+/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 100) || 'file';
  const safeExt = ext.replace(/[^a-zA-Z0-9.]+/g, '').slice(0, 10);
  return { safeBase, safeExt };
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

      // Only raw files (PDF/DOC/XLSX etc.) need a filename-derived id — that's
      // what gets downloaded by end users and should show the original name.
      // Images/videos keep Cloudinary's auto-generated id (unaffected).
      let folder = `labourcodes/${section}`;
      let publicId;
      if (resourceType === 'raw') {
        const { safeBase, safeExt } = sanitizeFilename(req.file.originalname);
        // Uniqueness lives in a random subfolder, not the filename itself, so
        // two uploads named "form.pdf" never collide/overwrite each other,
        // while the final path segment — the one Cloudinary uses as the
        // downloaded filename — stays exactly the original name.
        const unique = crypto.randomBytes(4).toString('hex');
        folder = `${folder}/${unique}`;
        publicId = `${safeBase}${safeExt}`;
      }

      const b64 = req.file.buffer.toString('base64');
      const dataUri = `data:${mime};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder,
        resource_type: resourceType,
        ...(publicId ? { public_id: publicId } : {}),
      });
      res.json({ url: result.secure_url, publicId: result.public_id });
    } catch (err) {
      console.error('[upload]', err);
      res.status(500).json({ error: 'Upload failed' });
    }
  });
});

export default router;
