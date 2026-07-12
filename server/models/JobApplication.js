import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
  // Applicant details
  name:       { type: String, required: true, trim: true },
  email:      { type: String, required: true, trim: true },
  phone:      { type: String, required: true, trim: true },
  coverNote:  { type: String, default: '' },

  // Resume stored in Cloudinary
  resumeUrl:      { type: String, required: true },
  resumePublicId: { type: String, default: '' },
  resumeName:     { type: String, default: '' },

  // Which job they applied for
  careerId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Career', default: null },
  careerTitle:    { type: String, default: '' },
  careerSlug:     { type: String, default: '' },
  careerCategory: { type: String, enum: ['internal', 'client'], default: 'internal' },

  // Simple status flag for admin
  status: { type: String, enum: ['new', 'reviewed', 'shortlisted', 'rejected'], default: 'new' },
}, { timestamps: true });

export default mongoose.models.JobApplication
  || mongoose.model('JobApplication', JobApplicationSchema, 'job_applications');
