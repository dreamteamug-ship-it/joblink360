'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    
    // Simulate signup (store in localStorage for demo)
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find((u: any) => u.email === email)) {
        setError('Email already registered');
        setLoading(false);
        return;
      }
      
      users.push({ email, password, name, createdAt: new Date().toISOString() });
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify({ email, name }));
      
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        router.push('/lms');
      }, 2000);
    }, 500);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui', padding: '2rem' }}>
      <div style={{ maxWidth: '400px', width: '100%', background: '#111', padding: '2rem', borderRadius: '1rem', border: '1px solid #333' }}>
        <h1 style={{ color: '#f59e0b', textAlign: 'center', marginBottom: '1rem' }}>Create Account</h1>
        <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: '2rem' }}>Join JobLink 360 and start your journey</p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af' }}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', background: '#0a0a0a', border: '1px solid #333', borderRadius: '0.5rem', color: '#fff' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', background: '#0a0a0a', border: '1px solid #333', borderRadius: '0.5rem', color: '#fff' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', background: '#0a0a0a', border: '1px solid #333', borderRadius: '0.5rem', color: '#fff' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af' }}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', background: '#0a0a0a', border: '1px solid #333', borderRadius: '0.5rem', color: '#fff' }}
            />
          </div>
          
          {error && <div style={{ background: '#7f1a1a', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', color: '#f87171' }}>{error}</div>}
          {success && <div style={{ background: '#14532d', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', color: '#4ade80' }}>{success}</div>}
          
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: '#f59e0b', color: '#000', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#9ca3af' }}>
          Already have an account? <Link href="/login" style={{ color: '#f59e0b' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
