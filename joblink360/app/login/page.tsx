// app/login/page.tsx
'use client';
import { useState } from 'react';
import { signIn, signUp, signInWithMagicLink } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (useMagicLink) {
      const { error } = await signInWithMagicLink(email);
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Magic link sent! Check your email to log in.');
      }
      setLoading(false);
      return;
    }

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        router.push('/account');
      }
    } else {
      const { error } = await signUp(email, password);
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Account created! Please check your email to confirm.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md border border-amber-500/30">
        <h1 className="text-3xl font-bold text-amber-500 mb-2 text-center">JobLink 360</h1>
        <p className="text-zinc-500 text-center mb-6">Sovereign Career Platform</p>
        
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
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => { setUseMagicLink(false); setIsLogin(true); }}
            className={`flex-1 py-2 rounded ${!useMagicLink && isLogin ? 'bg-amber-600' : 'bg-zinc-800'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setUseMagicLink(false); setIsLogin(false); }}
            className={`flex-1 py-2 rounded ${!useMagicLink && !isLogin ? 'bg-amber-600' : 'bg-zinc-800'}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setUseMagicLink(true)}
            className={`flex-1 py-2 rounded ${useMagicLink ? 'bg-amber-600' : 'bg-zinc-800'}`}
          >
            Magic Link
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 mb-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-amber-500"
            required
          />
          
          {!useMagicLink && (
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 mb-4 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-amber-500"
              required={!useMagicLink}
            />
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-500 p-3 rounded-lg font-bold transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : (useMagicLink ? 'Send Magic Link' : (isLogin ? 'Sign In' : 'Create Account'))}
          </button>
        </form>
        
        {!useMagicLink && isLogin && (
          <button
            onClick={() => {
              const email = prompt('Enter your email to reset password:');
              if (email) {
                fetch('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ email }) });
                alert('Password reset email sent!');
              }
            }}
            className="w-full mt-4 text-zinc-500 text-sm hover:text-amber-500 transition"
          >
            Forgot password?
          </button>
        )}
      </div>
    </div>
  );
}