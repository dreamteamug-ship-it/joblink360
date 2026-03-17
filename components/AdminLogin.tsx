// components/AdminLogin.tsx
'use client';
import { useState } from 'react';

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate authentication - in production, call your API
    if (email === 'sande.allan@dreamteamconsult.net' && password === 'Titanium2026!') {
      setTimeout(() => {
        onLogin();
        setLoading(false);
      }, 1000);
    } else {
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070F1A] flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-[#020202] p-8 rounded-lg border border-[#D4AF37]/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#D4AF37] mb-2">CIO ACCESS</h1>
          <p className="text-[#F5F5DC]/60">Titanium Command Center</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#070F1A] rounded-lg border border-[#D4AF37]/30 focus:border-[#D4AF37] focus:outline-none text-[#F5F5DC]"
              placeholder="sande.allan@dreamteamconsult.net"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#070F1A] rounded-lg border border-[#D4AF37]/30 focus:border-[#D4AF37] focus:outline-none text-[#F5F5DC]"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#D4AF37] text-[#020202] rounded-lg font-bold hover:bg-[#D4AF37]/80 transition disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Access Command Center'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#F5F5DC]/40">
          ⚡ Titanium Level Clearance Required
        </div>
      </div>
    </div>
  );
}