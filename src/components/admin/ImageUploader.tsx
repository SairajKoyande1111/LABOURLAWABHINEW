import { useRef, useState } from 'react';
import { Upload, Loader2, X, FileText } from 'lucide-react';
import { uploadFile, deleteCloudinaryAsset } from '../../lib/api';

const PP = 'Poppins, sans-serif';

const MAX_BYTES = 1 * 1024 * 1024; // 1 MB

function fileKind(accept: string): 'image' | 'video' | 'document' {
  if (accept.startsWith('image')) return 'image';
  if (accept.startsWith('video')) return 'video';
  return 'document';
}

function filenameFromUrl(url: string) {
  try { return decodeURIComponent(new URL(url).pathname.split('/').pop() || 'file'); }
  catch { return 'file'; }
}

export default function ImageUploader({
  label,
  value,
  onChange,
  accept = 'image/*',
  section = 'misc',
  hint,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  /** Cloudinary folder to organize this upload under, e.g. "about", "clientele", "team". */
  section?: string;
  /** Recommended dimensions / aspect ratio shown as a hint, e.g. "1200 × 675 px (16:9)". */
  hint?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const kind = fileKind(accept);

  const handleFile = async (file: File | null) => {
    if (!file) return;
    setError('');
    if (file.size > MAX_BYTES) {
      setError(`File is ${(file.size / 1024 / 1024).toFixed(1)} MB — maximum is 1 MB.`);
      return;
    }
    setUploading(true);
    const oldUrl = value;
    try {
      const { url } = await uploadFile(file, section);
      onChange(url);
      // Delete the old Cloudinary asset after the new one is confirmed uploaded
      if (oldUrl) deleteCloudinaryAsset(oldUrl).catch(() => {});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    if (value) deleteCloudinaryAsset(value).catch(() => {});
    onChange('');
  };

  const preview = value ? (
    <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-50 flex items-center justify-center">
      {kind === 'video' ? (
        <video src={value} className="w-full h-full object-cover" muted />
      ) : kind === 'image' ? (
        <img src={value} className="w-full h-full object-cover" alt="" />
      ) : (
        <div className="flex flex-col items-center gap-1 px-1 text-center">
          <FileText size={20} style={{ color: '#a83a00' }} />
          <span className="text-[9px] text-gray-500 leading-tight break-all line-clamp-2" style={{ fontFamily: PP }}>
            {filenameFromUrl(value)}
          </span>
        </div>
      )}
      <button
        type="button"
        onClick={handleClear}
        className="absolute top-0.5 right-0.5 bg-black/60 rounded-full p-0.5 text-white hover:bg-black/80"
      >
        <X size={11} />
      </button>
    </div>
  ) : (
    <div className="w-24 h-16 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-300 shrink-0">
      {kind === 'document' ? <FileText size={16} /> : <Upload size={16} />}
    </div>
  );

  return (
    <div>
      <label className="block text-sm font-semibold mb-1" style={{ fontFamily: PP, color: '#333' }}>
        {label}
        <span className="ml-2 text-xs font-normal text-gray-400">max 1 MB</span>
      </label>
      {hint && (
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mb-2 leading-snug" style={{ fontFamily: PP }}>
          Recommended: {hint}
        </p>
      )}
      <div className="flex items-center gap-3">
        {preview}
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] || null)}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors disabled:opacity-60"
            style={{ fontFamily: PP, color: '#a83a00', borderColor: '#a83a00' }}
          >
            {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            {uploading ? 'Uploading…' : value ? 'Replace' : 'Upload'}
          </button>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="or paste a URL"
            className="mt-2 w-full px-3 py-1.5 rounded-lg border text-xs outline-none"
            style={{ fontFamily: PP, borderColor: '#e5e7eb' }}
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
}
