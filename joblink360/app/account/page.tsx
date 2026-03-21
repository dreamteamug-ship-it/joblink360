'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';

// Define User type
interface User {
  id: string;
  email: string;
  name?: string;
}

export default function AccountPage() {
  // Fix: Initialize with null, type as User | null
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user
    setTimeout(() => {
      setUser(null); // or set actual user data
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', padding: '2rem' }}>
      <h1 style={{ color: '#f59e0b' }}>Account</h1>
      {user ? (
        <p>Welcome, {user.name || user.email}</p>
      ) : (
        <p>Please log in to view your account</p>
      )}
      <a href="/pay" style={{ color: '#f59e0b' }}>Pay KES 5,000</a>
    </div>
  );
}

