'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.find((u: any) => u.email === email);
      
      if (userExists) {
        setMessage('Password reset link has been sent to your email. Check your inbox.');
        // In a real app, this would send an actual email
      } else {
        setError('No account found with this email address');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui', padding: '2rem' }}>
      <div style={{ maxWidth: '400px', width: '100%', background: '#111', padding: '2rem', borderRadius: '1rem', border: '1px solid #333' }}>
        <h1 style={{ color: '#f59e0b', textAlign: 'center', marginBottom: '1rem' }}>Reset Password</h1>
        <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: '2rem' }}>Enter your email to receive a reset link</p>
        
        <form onSubmit={handleSubmit}>
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
          
          {error && <div style={{ background: '#7f1a1a', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', color: '#f87171' }}>{error}</div>}
          {message && <div style={{ background: '#14532d', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', color: '#4ade80' }}>{message}</div>}
          
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: '#f59e0b', color: '#000', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#9ca3af' }}>
          Remember your password? <Link href="/login" style={{ color: '#f59e0b' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
