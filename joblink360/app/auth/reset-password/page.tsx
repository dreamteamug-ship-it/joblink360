// app/auth/reset-password/page.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const { error } = await supabase.auth.updateUser({ password });
    
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#001F3F] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0A1A2F] rounded-xl shadow-lg p-8 border border-[#D4AF37]">
        <h1 className="text-2xl font-bold text-[#D4AF37] mb-2 text-center">Reset Password</h1>
        <p className="text-gray-400 text-center mb-6">Enter your new password</p>
        
        {success ? (
          <div className="bg-green-900 text-green-300 p-4 rounded-lg mb-4">
            Password reset successfully! Redirecting to login...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#001F3F] border border-[#D4AF37] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                required
                minLength={6}
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#001F3F] border border-[#D4AF37] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                required
              />
            </div>
            
            {error && (
              <div className="bg-red-900 text-red-300 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-[#001F3F] py-3 rounded-lg font-semibold hover:bg-[#FFD700] transition disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
        
        <div className="text-center mt-4">
          <Link href="/login" className="text-[#D4AF37] hover:underline text-sm">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
