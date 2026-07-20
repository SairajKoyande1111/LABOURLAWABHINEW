import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  username:   { type: String, required: true, unique: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true },
  email:      { type: String, trim: true, lowercase: true },
  // OTP fields for password/username reset
  otpHash:    { type: String },
  otpExpiry:  { type: Date },
}, { timestamps: true });

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
