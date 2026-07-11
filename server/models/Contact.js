import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  singleton: { type: String, default: 'contact', unique: true },

  // Hero
  heroEyebrow: String,
  heroHeading:  String,
  heroSubtext:  String,

  // Form card
  formTitle:   String,
  formSubtext: String,

  // Quick-strip + contact details
  phone1: String,
  phone2: String,
  email1: String,
  email2: String,
  addressLine1: String,
  addressLine2: String,
  addressLine3: String,
  hoursWeekdays: String,
  hoursWeekend:  String,

  // Service dropdown options on the enquiry form
  serviceOptions: [String],

  // Google Maps embed URL
  mapEmbedUrl: String,
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
