/**
 * Server-side Cloudinary helpers.
 * Mirrors the parseCloudinaryUrl / deleteCloudinaryAsset logic in src/lib/api.ts
 * so server DELETE handlers can clean up assets without depending on the client.
 */
import cloudinary from './cloudinary.js';

/**
 * Extract public_id and resource_type from a Cloudinary secure_url.
 * Returns null for non-Cloudinary URLs (silently skip).
 */
export function parseCloudinaryUrl(url) {
  if (!url || typeof url !== 'string') return null;
  try {
    const u = new URL(url);
    if (!u.hostname.endsWith('cloudinary.com')) return null;
    // Path: /<cloud>/image|video|raw/upload/v<ver>/<public_id>.<ext>
    const match = u.pathname.match(/\/(image|video|raw)\/upload\/v\d+\/(.+)$/);
    if (!match) return null;
    const resourceType = match[1]; // 'image' | 'video' | 'raw'
    // raw assets (PDF/XLSX/DOCX) are uploaded with the extension as part of the
    // public_id; image and video assets are not. Strip only for image/video.
    const withExt = match[2];
    const publicId = resourceType === 'raw' ? withExt : withExt.replace(/\.[^./]+$/, '');
    return { publicId, resourceType };
  } catch {
    return null;
  }
}

/**
 * Delete a Cloudinary asset by URL. Silently no-ops for non-Cloudinary URLs.
 * Errors are logged but never thrown — a failed cleanup must never block an API response.
 */
export async function deleteCloudinaryAsset(url) {
  const info = parseCloudinaryUrl(url);
  if (!info) return;
  try {
    await cloudinary.uploader.destroy(info.publicId, { resource_type: info.resourceType });
  } catch (err) {
    console.error('[cloudinary] failed to delete asset', info.publicId, err?.message || err);
  }
}

/**
 * Delete multiple Cloudinary assets in parallel. Non-Cloudinary URLs are skipped.
 */
export async function deleteCloudinaryAssets(urls) {
  await Promise.all((urls || []).map(url => deleteCloudinaryAsset(url)));
}
