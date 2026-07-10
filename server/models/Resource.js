import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  heading: String,
  body: String,
}, { _id: false });

const ResourceSchema = new mongoose.Schema({
  // 'articles' = Articles & Insights tab  |  'downloads' = Downloads & Templates tab
  tab: { type: String, enum: ['articles', 'downloads'], required: true },

  title: { type: String, required: true },
  category: String,   // e.g. 'New Labour Codes', 'Compliance', 'POSH' …
  order: { type: Number, default: 0 },

  // ── Article-only fields ──────────────────────────────
  slug: { type: String },
  excerpt: String,
  date: String,
  readTime: String,
  author: String,
  img: String,           // Cloudinary URL
  sections: [SectionSchema],
  keyTakeaways: [String],

  // ── Download-only fields ─────────────────────────────
  desc: String,
  size: String,
  format: String,
  downloadType: { type: String, enum: ['Download', 'Resource'] },
  fileUrl: String,       // Cloudinary URL for the actual file
}, { timestamps: true });

// Slug must be unique among articles (sparse lets downloads have no slug)
ResourceSchema.index({ slug: 1 }, { unique: true, sparse: true });

export default mongoose.models.Resource || mongoose.model('Resource', ResourceSchema);
