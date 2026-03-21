"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingVerifications: 0,
    totalStudents: 0,
    yourCommission: 0
  });

  useEffect(() => {
    // Mock data - replace with real API
    setStats({
      totalRevenue: 0,
      pendingVerifications: 0,
      totalStudents: 0,
      yourCommission: 0
    });
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui' }}>
      <nav style={{ borderBottom: '1px solid #333', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ color: '#f59e0b', margin: 0 }}>👑 Admin Dashboard</h1>
          <Link href="/pay" style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none' }}>Pay KES 5,000</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#111', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>💰</div>
            <div style={{ color: '#9ca3af' }}>Total Revenue</div>
            <div style={{ fontSize: '1.5rem', color: '#10b981' }}>KES {stats.totalRevenue.toLocaleString()}</div>
          </div>
          <div style={{ background: '#111', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>⏳</div>
            <div style={{ color: '#9ca3af' }}>Pending Verifications</div>
            <div style={{ fontSize: '1.5rem', color: '#f59e0b' }}>{stats.pendingVerifications}</div>
          </div>
          <div style={{ background: '#111', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>👥</div>
            <div style={{ color: '#9ca3af' }}>Total Students</div>
            <div style={{ fontSize: '1.5rem' }}>{stats.totalStudents}</div>
          </div>
          <div style={{ background: '#111', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>💸</div>
            <div style={{ color: '#9ca3af' }}>Your Commission (70%)</div>
            <div style={{ fontSize: '1.5rem', color: '#f59e0b' }}>KES {stats.yourCommission.toLocaleString()}</div>
          </div>
        </div>

        <div style={{ background: '#111', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
          <p style={{ color: '#10b981', marginBottom: '1rem' }}>✅ Vulture-Eye Active | 0.02s Verification</p>
          <p>📱 M-Pesa Paybill: <strong style={{ color: '#f59e0b' }}>400200</strong> | Account: <strong style={{ color: '#f59e0b' }}>4045731</strong></p>
          <Link href="/pay" style={{ color: '#f59e0b', display: 'inline-block', marginTop: '1rem' }}>→ Share Payment Link</Link>
        </div>
      </div>
    </div>
  );
}