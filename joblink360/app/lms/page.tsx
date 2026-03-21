'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LMSPage() {
  const [mounted, setMounted] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setPulse(p => !p), 1000);
    
    // Check for admin bypass
    const adminBypass = localStorage.getItem('adminBypass');
    if (adminBypass === 'true') {
      setIsAdmin(true);
      // Auto-enroll all courses for admin
      const allCourses = courses.map(c => c.title);
      setEnrolled(allCourses);
    }
    
    return () => clearInterval(interval);
  }, []);

  const courses = [
    { id: 'virtual-assistant-elite', title: 'Virtual Assistant Elite', level: 'Beginner', duration: '2 weeks', modules: 8, income: '$400-800/mo', icon: '🎯', free: true },
    { id: 'ai-prompt-engineering', title: 'AI Prompt Engineering', level: 'Beginner', duration: '2 weeks', modules: 8, income: '$500-1,000/mo', icon: '🤖', free: true },
    { id: 'data-annotation-mastery', title: 'Data Annotation Mastery', level: 'Intermediate', duration: '3 weeks', modules: 12, income: '$800-1,500/mo', icon: '📊', free: false },
    { id: 'high-ticket-sales', title: 'High-Ticket Virtual Sales', level: 'Advanced', duration: '4 weeks', modules: 16, income: '$2,000-5,000/mo', icon: '💼', free: false },
    { id: 'sovereign-prompt', title: 'Sovereign Prompt Engineering', level: 'Advanced', duration: '4 weeks', modules: 16, income: '$1,500-3,000/mo', icon: '⚡', free: false },
    { id: 'pan-african-trade', title: 'Pan-African Trade AI', level: 'Expert', duration: '6 weeks', modules: 20, income: '$3,000-8,000/mo', icon: '🌍', free: false },
    { id: 'grant-writing-ai', title: 'Grant Writing with AI', level: 'Intermediate', duration: '3 weeks', modules: 10, income: '$1,000-3,000/mo', icon: '📝', free: false },
    { id: 'titanium-erp', title: 'Titanium ERP Operations', level: 'Advanced', duration: '4 weeks', modules: 14, income: '$2,000-5,000/mo', icon: '⚙️', free: false }
  ];

  const handleAdminBypass = () => {
    if (adminCode === 'CTO2025') {
      localStorage.setItem('adminBypass', 'true');
      setIsAdmin(true);
      setEnrolled(courses.map(c => c.title));
      setShowAdminPanel(false);
      alert('✅ Admin bypass activated! All courses unlocked.');
    } else {
      alert('❌ Invalid admin code');
    }
  };

  const handleEnroll = (course: any) => {
    if (isAdmin || course.free) {
      window.location.href = `/courses/${course.id}`;
    } else {
      window.location.href = '/pay';
    }
  };

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🦅</div>
          <p>Loading JobLink 360 LMS...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui' }}>
      {/* Navigation */}
      <nav style={{ borderBottom: '1px solid #333', background: '#000', padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 style={{ color: '#f59e0b', margin: 0, fontSize: '1.5rem' }}>🎓 JobLink 360</h1>
            {isAdmin && (
              <span style={{ background: '#10b981', color: '#000', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                ADMIN MODE
              </span>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: pulse ? '#10b981' : '#065f46', transition: '0.2s', boxShadow: pulse ? '0 0 8px #10b981' : 'none' }}></div>
              <span style={{ fontSize: '0.75rem', color: '#10b981' }}>VULTURE-EYE ACTIVE</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {!isAdmin && (
              <button
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                style={{ background: 'transparent', border: '1px solid #f59e0b', color: '#f59e0b', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}
              >
                🔓 Admin Bypass
              </button>
            )}
            <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
            <Link href="/pay" style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold' }}>Pay KES 5,000</Link>
          </div>
        </div>
      </nav>

      {/* Admin Panel */}
      {showAdminPanel && !isAdmin && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#111', padding: '2rem', borderRadius: '1rem', border: '2px solid #f59e0b', zIndex: 1000, width: '90%', maxWidth: '400px' }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Admin Bypass</h3>
          <p style={{ color: '#9ca3af', marginBottom: '1rem', fontSize: '0.875rem' }}>Enter admin code to unlock all courses without payment</p>
          <input
            type="password"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            placeholder="Enter admin code"
            style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', background: '#0a0a0a', border: '1px solid #333', borderRadius: '0.5rem', color: '#fff' }}
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleAdminBypass} style={{ flex: 1, background: '#f59e0b', color: '#000', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Unlock All</button>
            <button onClick={() => setShowAdminPanel(false)} style={{ flex: 1, background: '#333', color: '#fff', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#f59e0b', marginBottom: '0.5rem' }}>📚 AI Career Courses</h1>
          <p style={{ color: '#9ca3af' }}>8 comprehensive courses to transform your career in 90 days</p>
          <div style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', background: '#111', padding: '0.5rem 1rem', borderRadius: '2rem' }}>
            <span style={{ color: '#10b981' }}>✅ {enrolled.length}/8 Courses Available</span>
            <span style={{ color: '#f59e0b' }}>🎬 4K Video • 🎧 Audio • 📄 Print Materials</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ background: '#111', borderRadius: '1rem', padding: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Your Progress</span>
            <span style={{ color: '#f59e0b' }}>{Math.round((enrolled.length / courses.length) * 100)}% Complete</span>
          </div>
          <div style={{ background: '#222', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${(enrolled.length / courses.length) * 100}%`, background: '#f59e0b', height: '100%', transition: 'width 0.3s' }}></div>
          </div>
        </div>

        {/* Courses Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {courses.map(course => (
            <div key={course.id} style={{
              background: '#111',
              borderRadius: '1rem',
              border: (isAdmin || course.free) ? '2px solid #10b981' : '1px solid #222',
              padding: '1.5rem',
              transition: 'all 0.3s'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>{course.icon}</div>
                {(isAdmin || course.free) && <span style={{ color: '#10b981', fontSize: '1.5rem' }}>✓</span>}
              </div>
              <h3 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>{course.title}</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{course.level} • {course.duration} • {course.modules} modules</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '1rem' }}>💰 {course.income}</p>
              
              {(isAdmin || course.free) ? (
                <button onClick={() => handleEnroll(course)} style={{ background: '#10b981', color: '#000', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>
                  {isAdmin ? '▶ Start Learning (Admin)' : '▶ Start Free'}
                </button>
              ) : (
                <button onClick={() => handleEnroll(course)} style={{ background: '#f59e0b', color: '#000', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>
                  🔓 Enroll — KES 5,000
                </button>
              )}
            </div>
          ))}
        </div>

        {/* 90-Day Income Plan */}
        <div style={{ marginTop: '3rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, transparent 100%)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '1rem', padding: '2rem' }}>
          <h2 style={{ color: '#f59e0b', marginBottom: '1rem', textAlign: 'center' }}>🎯 Your 90-Day Income Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>📚</div>
              <p style={{ fontWeight: 'bold' }}>Week 1-2</p>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Complete 3 core courses</p>
            </div>
            <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>💼</div>
              <p style={{ fontWeight: 'bold' }}>Week 3-8</p>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Apply to 50+ jobs daily</p>
            </div>
            <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>💰</div>
              <p style={{ fontWeight: 'bold' }}>Week 9-12</p>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Scale to $1,000/month</p>
            </div>
            <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>🚀</div>
              <p style={{ fontWeight: 'bold' }}>90 Days</p>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Income earned!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
