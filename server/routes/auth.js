import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import Admin from '../models/Admin.js';
import { signToken, setAuthCookie, clearAuthCookie, requireAuth } from '../middleware/auth.js';
import { sendMail, ADMIN_EMAIL } from '../mailer.js';

const router = express.Router();

// ── Login ─────────────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    const admin = await Admin.findOne({ username: String(username).toLowerCase().trim() });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken({ id: admin._id.toString(), username: admin.username });
    setAuthCookie(res, token);
    res.json({ username: admin.username });
  } catch (err) {
    console.error('[auth/login]', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ── Logout ────────────────────────────────────────────────────────────────────
router.post('/logout', (req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

// ── Me ────────────────────────────────────────────────────────────────────────
router.get('/me', requireAuth, (req, res) => {
  res.json({ username: req.admin.username });
});

// ── Forgot — send OTP ─────────────────────────────────────────────────────────
router.post('/forgot', async (req, res) => {
  try {
    const { username } = req.body || {};
    if (!username) return res.status(400).json({ error: 'Username is required.' });

    const admin = await Admin.findOne({ username: String(username).toLowerCase().trim() });
    if (!admin) return res.status(404).json({ error: 'No admin account found with that username.' });

    // Use stored email or fall back to env ADMIN_EMAIL
    const recipientEmail = admin.email || ADMIN_EMAIL;
    if (!recipientEmail) {
      return res.status(500).json({ error: 'No email address configured for this admin account.' });
    }

    // Generate a 6-digit OTP
    const otp = String(crypto.randomInt(100000, 999999));
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await Admin.findByIdAndUpdate(admin._id, { otpHash, otpExpiry });

    // Send OTP email
    await sendMail({
      to: recipientEmail,
      subject: 'Maru Admin — Your OTP for credential reset',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
          <h2 style="color:#1a2c4e;margin-top:0">Admin Credential Reset</h2>
          <p style="color:#555">Use the OTP below to reset your admin username and password. It expires in <strong>10 minutes</strong>.</p>
          <div style="text-align:center;margin:32px 0">
            <span style="font-size:36px;font-weight:700;letter-spacing:10px;color:#1a2c4e;font-family:monospace">${otp}</span>
          </div>
          <p style="color:#999;font-size:13px">If you did not request this, please ignore this email. Your credentials have not been changed.</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
          <p style="color:#bbb;font-size:12px">Maru Labour Laws — Admin Panel</p>
        </div>
      `,
      text: `Your OTP for Maru Admin credential reset is: ${otp}\n\nThis code expires in 10 minutes.\n\nIf you did not request this, ignore this email.`,
    });

    res.json({ message: `OTP sent to your registered email address.` });
  } catch (err) {
    console.error('[auth/forgot]', err);
    res.status(500).json({ error: 'Failed to send OTP.' });
  }
});

// ── Reset — verify OTP + update credentials ───────────────────────────────────
router.post('/reset', async (req, res) => {
  try {
    const { username, otp, newUsername, newPassword } = req.body || {};
    if (!username || !otp || !newUsername || !newPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    const admin = await Admin.findOne({ username: String(username).toLowerCase().trim() });
    if (!admin) return res.status(404).json({ error: 'Admin account not found.' });

    if (!admin.otpHash || !admin.otpExpiry) {
      return res.status(400).json({ error: 'No OTP was requested. Please start over.' });
    }
    if (new Date() > admin.otpExpiry) {
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    const inputHash = crypto.createHash('sha256').update(String(otp).trim()).digest('hex');
    if (inputHash !== admin.otpHash) {
      return res.status(400).json({ error: 'Invalid OTP. Please try again.' });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await Admin.findByIdAndUpdate(admin._id, {
      username: String(newUsername).toLowerCase().trim(),
      passwordHash,
      otpHash:   undefined,
      otpExpiry: undefined,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('[auth/reset]', err);
    res.status(500).json({ error: 'Failed to reset credentials.' });
  }
});

// ── Change password (when already logged in) ──────────────────────────────────
router.post('/change-password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Both current and new password are required.' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters.' });
    }
    const admin = await Admin.findById(req.admin.id);
    if (!admin) return res.status(404).json({ error: 'Admin not found.' });

    const ok = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Current password is incorrect.' });

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await Admin.findByIdAndUpdate(admin._id, { passwordHash });
    res.json({ ok: true });
  } catch (err) {
    console.error('[auth/change-password]', err);
    res.status(500).json({ error: 'Failed to change password.' });
  }
});

export default router;
