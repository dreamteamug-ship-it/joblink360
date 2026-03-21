'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
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
      setSuccess('Password updated successfully! Redirecting...');
      setTimeout(() => router.push('/account'), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md border border-amber-500/30">
        <h1 className="text-2xl font-bold text-amber-500 mb-2 text-center">Update Password</h1>
        <p className="text-zinc-500 text-center mb-6">Enter your new password</p>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 p-3 rounded mb-4 text-red-500 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/20 border border-green-500 p-3 rounded mb-4 text-green-500 text-sm">
            {success}
          </div>
        )}
        
        <form onSubmit={handleUpdatePassword}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="New Password"
            className="w-full p-3 mb-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-amber-500"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="w-full p-3 mb-4 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-amber-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-500 p-3 rounded-lg font-bold transition disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

