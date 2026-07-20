import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, KeyRound, Loader2, ArrowLeft, Mail } from 'lucide-react';

const PP = 'Poppins, sans-serif';

type Step = 'request' | 'reset';

export default function ForgotCredentials() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('request');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      setNewUsername(username);
      setInfo(data.message || 'OTP sent to your registered email.');
      setStep('reset');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, otp, newUsername, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Reset failed');
      navigate('/admin/login', { state: { message: 'Credentials updated. Please log in with your new details.' } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ fontFamily: PP, backgroundColor: '#f8fafb' }}
    >
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <button
          onClick={() => navigate('/admin/login')}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Login
        </button>

        {step === 'request' ? (
          <>
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(var(--primary-rgb, 26 54 93), 0.08)' }}>
                <Mail size={22} style={{ color: 'var(--primary)' }} />
              </div>
              <p className="font-bold text-lg" style={{ color: 'var(--primary)' }}>Reset Credentials</p>
              <p className="text-gray-400 text-sm mt-1">We'll send an OTP to your registered email</p>
            </div>

            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#333' }}>Your Username</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter your current username"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--primary)]"
                    style={{ borderColor: '#e5e7eb' }}
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-md transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {submitting && <Loader2 size={15} className="animate-spin" />}
                {submitting ? 'Sending OTP…' : 'Send OTP'}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(var(--primary-rgb, 26 54 93), 0.08)' }}>
                <KeyRound size={22} style={{ color: 'var(--primary)' }} />
              </div>
              <p className="font-bold text-lg" style={{ color: 'var(--primary)' }}>Enter OTP</p>
              {info && <p className="text-gray-500 text-sm mt-1">{info}</p>}
            </div>

            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#333' }}>OTP Code</label>
                <div className="relative">
                  <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    autoFocus
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    placeholder="6-digit OTP"
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--primary)] tracking-widest font-mono"
                    style={{ borderColor: '#e5e7eb' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#333' }}>New Username</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--primary)]"
                    style={{ borderColor: '#e5e7eb' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#333' }}>New Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                    placeholder="Min. 8 characters"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--primary)]"
                    style={{ borderColor: '#e5e7eb' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#333' }}>Confirm Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Repeat new password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--primary)]"
                    style={{ borderColor: '#e5e7eb' }}
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-md transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {submitting && <Loader2 size={15} className="animate-spin" />}
                {submitting ? 'Updating…' : 'Update Credentials'}
              </button>

              <button
                type="button"
                onClick={() => { setStep('request'); setError(''); setOtp(''); }}
                className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors pt-1"
              >
                Resend OTP
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
