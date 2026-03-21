'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminSitemap() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allPages = [
      { name: 'Home', url: '/', status: 'checking' },
      { name: 'LMS - All Courses', url: '/lms', status: 'checking' },
      { name: 'Payment Page', url: '/pay', status: 'checking' },
      { name: 'Sign Up', url: '/signup', status: 'checking' },
      { name: 'Login', url: '/login', status: 'checking' },
      { name: 'Forgot Password', url: '/forgot-password', status: 'checking' },
      { name: 'Funding', url: '/funding', status: 'checking' },
      { name: 'Funding Matchmaking', url: '/funding/matchmaking', status: 'checking' },
      { name: 'Tenders', url: '/tenders', status: 'checking' },
      { name: 'Tenders Process', url: '/tenders/process', status: 'checking' },
      { name: 'Titanium ERP', url: '/titanium-erp', status: 'checking' },
      { name: 'Admin Dashboard', url: '/admin', status: 'checking' },
      { name: 'Admin Revenue', url: '/admin/revenue', status: 'checking' },
      { name: 'Admin Legal', url: '/admin/legal', status: 'checking' },
      { name: 'Shop', url: '/shop', status: 'checking' },
      { name: 'Shop Checkout', url: '/shop/checkout', status: 'checking' },
      { name: 'Deal Room', url: '/deal-room', status: 'checking' },
      { name: 'Contact', url: '/contact', status: 'checking' },
      { name: 'Amanda AI API', url: '/api/ai/amanda', status: 'checking' },
      { name: 'Vulture-Eye API', url: '/api/reconcile', status: 'checking' }
    ];
    
    setPages(allPages);
    
    // Check each page
    allPages.forEach(async (page, index) => {
      try {
        const res = await fetch(page.url);
        setPages(prev => {
          const newPages = [...prev];
          newPages[index].status = res.ok ? '✅ Working' : '❌ Failed';
          newPages[index].code = res.status;
          return newPages;
        });
      } catch {
        setPages(prev => {
          const newPages = [...prev];
          newPages[index].status = '❌ Error';
          newPages[index].code = 'Network Error';
          return newPages;
        });
      }
    });
  }, []);

  const workingCount = pages.filter(p => p.status === '✅ Working').length;
  const failedCount = pages.filter(p => p.status !== '✅ Working' && p.status !== 'checking').length;

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#f59e0b' }}>🗺️ Admin Sitemap - End to End Testing</h1>
          <div>
            <span style={{ background: '#10b981', padding: '0.5rem 1rem', borderRadius: '0.5rem', marginRight: '0.5rem' }}>
              ✅ {workingCount} Working
            </span>
            {failedCount > 0 && (
              <span style={{ background: '#ef4444', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                ❌ {failedCount} Failed
              </span>
            )}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem' }}>
          {pages.map((page, i) => (
            <div key={i} style={{ 
              background: page.status === '✅ Working' ? '#0a0a0a' : page.status === '❌ Failed' ? '#2d1a1a' : '#111', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              border: page.status === '✅ Working' ? '1px solid #10b981' : '1px solid #333' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Link href={page.url} target="_blank" style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: 'bold' }}>
                    {page.name}
                  </Link>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>{page.url}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: page.status === '✅ Working' ? '#10b981' : '#ef4444' }}>
                    {page.status}
                  </div>
                  {page.code && <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Status: {page.code}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: '2rem', background: '#111', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
          <p style={{ color: '#10b981' }}>🦅 Vulture-Eye Active | 0.02s Verification | NCBA Bank 8515130017</p>
          <p style={{ marginTop: '0.5rem' }}>🔓 Admin Bypass Code: <strong style={{ color: '#f59e0b' }}>CTO2025</strong> - Unlocks all courses without payment</p>
        </div>
      </div>
    </div>
  );
}
