import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import cloudinary from '../cloudinary.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
// Per-type size limits
const LIMITS = {
  image:    5  * 1024 * 1024, // 5 MB
  video:    50 * 1024 * 1024, // 50 MB
  document: 10 * 1024 * 1024, // 10 MB
};
const MAX_LIMIT = LIMITS.video; // multer hard cap — per-type check happens after

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
  limits: { fileSize: MAX_LIMIT },
  fileFilter: (req, file, cb) => {
    if (!isAllowedMime(file.mimetype)) {
      return cb(new Error('UNSUPPORTED_FILE_TYPE'));
    }
    cb(null, true);
  },
});

// Multer sends a specific error code when the file is too large (exceeds MAX_LIMIT)
function handleMulterError(err, res) {
  if (err?.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File exceeds the 50 MB limit. Please upload a smaller file.' });
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

      // Per-type size enforcement
      const typeKey = isVideo ? 'video' : isImage ? 'image' : 'document';
      const typeLimit = LIMITS[typeKey];
      if (req.file.size > typeLimit) {
        const limitMB = typeLimit / (1024 * 1024);
        return res.status(413).json({
          error: `${typeKey.charAt(0).toUpperCase() + typeKey.slice(1)} exceeds the ${limitMB} MB limit. Please upload a smaller file.`,
        });
      }
      // PDFs, XLSX, DOCX, etc. are uploaded as raw
      const resourceType = isVideo ? 'video' : isImage ? 'image' : 'raw';
      const section = sanitizeSection(req.body?.section);

      // All file types use the original filename as the Cloudinary public_id so
      // assets are identifiable in the media library by the name they were
      // uploaded with.  A short random suffix prevents two different files with
      // the same name from colliding/overwriting each other.
      let folder = `labourcodes/${section}`;
      const { safeBase, safeExt } = sanitizeFilename(req.file.originalname);
      const unique = crypto.randomBytes(4).toString('hex');
      let publicId;
      if (resourceType === 'raw') {
        // Raw files: uniqueness in a subfolder so the final path segment — the
        // part Cloudinary uses as the downloaded filename — stays clean.
        folder = `${folder}/${unique}`;
        publicId = `${safeBase}${safeExt}`;
      } else {
        // Images/videos: append the unique suffix to the filename itself so the
        // asset name in the media library matches what was uploaded.
        publicId = safeBase ? `${safeBase}_${unique}` : unique;
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

// DELETE  /api/upload  — remove a Cloudinary asset by its public_id.
// Called by the admin UI whenever an image/video is removed or replaced so
// orphaned assets don't accumulate in the media library.
router.delete('/', requireAuth, async (req, res) => {
  try {
    const publicId = String(req.body?.publicId || '').trim();
    if (!publicId) return res.status(400).json({ error: 'publicId is required' });

    // Derive resource_type from what the client sent, defaulting to 'image'.
    const raw = String(req.body?.resourceType || 'image').toLowerCase();
    const resourceType = ['image', 'video', 'raw'].includes(raw) ? raw : 'image';

    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    res.json({ ok: true });
  } catch (err) {
    console.error('[upload/delete]', err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
