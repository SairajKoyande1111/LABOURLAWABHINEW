import { useState } from 'react';
import { useNavigate, Navigate, Link, useLocation } from 'react-router-dom';
import { Lock, User, Loader2 } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const PP = 'Poppins, sans-serif';

export default function AdminLogin() {
  const { username, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [info] = useState((location.state as { message?: string })?.message || '');
  const [submitting, setSubmitting] = useState(false);

  if (username) return <Navigate to="/admin/home" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form.username, form.password);
      navigate('/admin/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
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
        <div className="text-center mb-8">
          <p className="font-bold text-lg" style={{ color: 'var(--primary)' }}>Maru Consultancy</p>
          <p className="text-gray-400 text-sm mt-1">Admin Panel Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#333' }}>Username</label>
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                autoFocus
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--primary)]"
                style={{ borderColor: '#e5e7eb' }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#333' }}>Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--primary)]"
                style={{ borderColor: '#e5e7eb' }}
              />
            </div>
          </div>

          {info && <p className="text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">{info}</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-md transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            {submitting && <Loader2 size={15} className="animate-spin" />}
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>

          <div className="text-center pt-1">
            <Link
              to="/admin/forgot-credentials"
              className="text-sm transition-colors hover:underline"
              style={{ color: 'var(--primary)', opacity: 0.7 }}
            >
              Forgot username or password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
