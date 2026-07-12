import mongoose from 'mongoose';

const ContactEnquirySchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  email:   { type: String, required: true, trim: true },
  phone:   { type: String, required: true, trim: true },
  company: { type: String, default: '' },
  service: { type: String, default: '' },
  message: { type: String, default: '' },

  // Admin read-status
  read: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.ContactEnquiry
  || mongoose.model('ContactEnquiry', ContactEnquirySchema, 'contact_enquiries');
