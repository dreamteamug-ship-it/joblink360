'use client';
import { useState } from 'react';
import { supabase, signIn, signUp } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = isLogin ? await signIn(email, password) : await signUp(email, password);
    
    if (result.error) setError(result.error.message);
    else router.push('/account');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md border border-amber-500/30">
        <h1 className="text-3xl font-bold text-amber-500 mb-2 text-center">JobLink 360</h1>
        <p className="text-zinc-500 text-center mb-6">Sovereign Career Platform</p>
        
        {error && <div className="bg-red-500/20 border border-red-500 p-3 rounded mb-4 text-red-500 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 mb-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-amber-500" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 mb-4 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-amber-500" required />
          <button type="submit" disabled={loading} className="w-full bg-amber-600 hover:bg-amber-500 p-3 rounded-lg font-bold transition disabled:opacity-50">
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>
        
        <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-4 text-zinc-500 text-sm hover:text-amber-500 transition">
          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  );
}
