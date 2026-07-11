const BASE = '/api';

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      /* ignore */
    }
    throw new ApiError(message, res.status);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body !== undefined ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PUT', body: body !== undefined ? JSON.stringify(body) : undefined }),
  del: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

/** Extract Cloudinary public_id and resource_type from a secure_url, or null if not a Cloudinary URL. */
export function parseCloudinaryUrl(url: string): { publicId: string; resourceType: 'image' | 'video' | 'raw' } | null {
  try {
    const u = new URL(url);
    if (!u.hostname.endsWith('cloudinary.com')) return null;
    // Path: /{cloud}/image|video|raw/upload/v{ver}/{public_id}.{ext}
    const match = u.pathname.match(/\/(image|video|raw)\/upload\/v\d+\/(.+)$/);
    if (!match) return null;
    const resourceType = match[1] as 'image' | 'video' | 'raw';
    // raw assets (PDF/XLSX/DOCX) are uploaded with the extension as part of the
    // public_id; image and video assets are not. Strip only for image/video.
    const withExt = match[2];
    const publicId = resourceType === 'raw' ? withExt : withExt.replace(/\.[^./]+$/, '');
    return { publicId, resourceType };
  } catch {
    return null;
  }
}

/** Delete a Cloudinary asset by its secure_url. Silently no-ops for non-Cloudinary URLs. */
export async function deleteCloudinaryAsset(url: string): Promise<void> {
  const info = parseCloudinaryUrl(url);
  if (!info) return; // external URL — nothing to delete from our Cloudinary
  await request<void>(`/upload`, {
    method: 'DELETE',
    body: JSON.stringify({ publicId: info.publicId, resourceType: info.resourceType }),
  });
}

export async function uploadFile(file: File, section: string = 'misc'): Promise<{ url: string; publicId: string }> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('section', section);
  const res = await fetch(`${BASE}/upload`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  if (!res.ok) {
    let message = 'Upload failed';
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      /* ignore */
    }
    throw new ApiError(message, res.status);
  }
  return res.json();
}

export { ApiError };
