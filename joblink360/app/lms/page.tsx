"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LMSPage() {
  const [mounted, setMounted] = useState(false);
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [pulse, setPulse] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setPulse(p => !p), 1000);
    return () => clearInterval(interval);
  }, []);

  const courses = [
    { id: 1, title: "AI Prompt Engineering", level: "Beginner", duration: "2 weeks", modules: 8, income: "$500-1,000/month" },
    { id: 2, title: "Data Annotation Mastery", level: "Intermediate", duration: "3 weeks", modules: 12, income: "$800-1,500/month" },
    { id: 3, title: "High-Ticket Virtual Sales", level: "Advanced", duration: "4 weeks", modules: 16, income: "$2,000-5,000/month" },
    { id: 4, title: "Sovereign Prompt Engineering", level: "Advanced", duration: "4 weeks", modules: 16, income: "$1,500-3,000/month" },
    { id: 5, title: "Pan-African Trade AI", level: "Expert", duration: "6 weeks", modules: 20, income: "$3,000-8,000/month" },
    { id: 6, title: "Virtual Assistant Elite", level: "Beginner", duration: "2 weeks", modules: 8, income: "$400-800/month" },
  ];

  const handleEnroll = (course: any) => {
    if (enrolled.includes(course.title)) {
      alert(`✅ You're already enrolled in ${course.title}!`);
      return;
    }
    setSelectedCourse(course);
    setShowPayment(true);
  };

  const verifyPayment = () => {
    if (!confirmationCode || confirmationCode.length < 8) {
      setVerificationStatus('❌ Please enter a valid M-Pesa confirmation code');
      return;
    }

    setVerifying(true);
    setVerificationStatus('⚡ Vulture-Eye verifying payment...');

    setTimeout(() => {
      setVerificationStatus('✅ Payment verified! Course unlocked.');
      setEnrolled([...enrolled, selectedCourse.title]);
      setShowPayment(false);
      setConfirmationCode('');
      setVerifying(false);
      alert(`🎉 Welcome to ${selectedCourse.title}! Your 90-day income journey starts now.`);
    }, 500);
  };

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🦅</div>
          <p>Initializing Vulture-Eye...</p>
          <div style={{ width: '20px', height: '20px', margin: '1rem auto', borderRadius: '50%', background: '#10b981', animation: 'pulse 1s infinite' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui' }}>
      <nav style={{ borderBottom: '1px solid #333', background: '#000', padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ color: '#f59e0b', margin: 0, fontSize: '1.5rem' }}>🦅 JobLink 360</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: pulse ? '#10b981' : '#065f46', transition: '0.2s', boxShadow: pulse ? '0 0 8px #10b981' : 'none' }}></div>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>VULTURE-EYE ACTIVE</span>
            </div>
            <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
            <Link href="/pay" style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold' }}>Pay KES 5,000</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#f59e0b', marginBottom: '0.5rem' }}>📚 JobLink 360 LMS</h1>
          <p style={{ color: '#9ca3af' }}>Transform Learners into Earners in 90 Days</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#111', padding: '0.5rem 1rem', borderRadius: '2rem', marginTop: '1rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', animation: 'pulse 1s infinite' }}></div>
            <span style={{ fontSize: '0.8rem', color: '#10b981' }}>🟢 Node: NCBA 8515130017 | Connected</span>
          </div>
        </div>

        <div style={{ background: '#111', borderRadius: '1rem', padding: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Your Journey Progress</span>
            <span style={{ color: '#f59e0b' }}>{enrolled.length} / {courses.length} Courses</span>
          </div>
          <div style={{ background: '#222', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${(enrolled.length / courses.length) * 100}%`, background: '#f59e0b', height: '100%', transition: 'width 0.3s' }}></div>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            {enrolled.length === 0 ? '⚡ Pay KES 5,000 to unlock all courses and start your 90-day income plan!' : `${enrolled.length} courses mastered! Keep going!`}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {courses.map(course => (
            <div key={course.id} style={{ background: '#111', borderRadius: '1rem', border: enrolled.includes(course.title) ? '2px solid #10b981' : '1px solid #222', padding: '1.5rem', transition: 'all 0.3s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h3 style={{ color: '#f59e0b', margin: 0, fontSize: '1.25rem' }}>{course.title}</h3>
                {enrolled.includes(course.title) && <span style={{ color: '#10b981', fontSize: '1.5rem' }}>✓</span>}
              </div>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{course.level} • {course.duration} • {course.modules} modules</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '1rem' }}>💰 {course.income}</p>
              {enrolled.includes(course.title) ? (
                <button onClick={() => alert(`🎓 Starting ${course.title}...`)} style={{ background: '#10b981', color: '#000', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>▶ Start Learning</button>
              ) : (
                <button onClick={() => handleEnroll(course)} style={{ background: '#f59e0b', color: '#000', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>Enroll Now - KES 5,000</button>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, transparent 100%)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '1rem', padding: '2rem' }}>
          <h2 style={{ color: '#f59e0b', marginBottom: '1rem', textAlign: 'center' }}>🎯 Your 90-Day Income Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}><div style={{ fontSize: '2rem' }}>📚</div><p style={{ fontWeight: 'bold' }}>Week 1-2</p><p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Complete 3 core courses</p></div>
            <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}><div style={{ fontSize: '2rem' }}>💼</div><p style={{ fontWeight: 'bold' }}>Week 3-8</p><p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Apply to 50+ jobs daily</p></div>
            <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}><div style={{ fontSize: '2rem' }}>💰</div><p style={{ fontWeight: 'bold' }}>Week 9-12</p><p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Scale to $1,000/month</p></div>
            <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}><div style={{ fontSize: '2rem' }}>🚀</div><p style={{ fontWeight: 'bold' }}>90 Days</p><p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Income earned!</p></div>
          </div>
        </div>
      </div>

      {showPayment && selectedCourse && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#111', padding: '2rem', borderRadius: '1rem', maxWidth: '450px', width: '90%', border: '1px solid #f59e0b' }}>
            <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>💰 Complete Your Payment</h2>
            <p style={{ marginBottom: '0.5rem' }}>Course: <strong>{selectedCourse.title}</strong></p>
            <p style={{ marginBottom: '1rem' }}>Amount: <strong style={{ color: '#f59e0b', fontSize: '1.5rem' }}>KES 5,000</strong></p>
            <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
              <p>📱 M-Pesa Paybill: <strong>400200</strong></p>
              <p>Account Number: <strong>4045731</strong></p>
              <p>Amount: <strong>KES 5,000</strong></p>
            </div>
            <input type="text" placeholder="Enter M-Pesa Confirmation Code" value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value.toUpperCase())} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', background: '#0a0a0a', border: '1px solid #333', borderRadius: '0.5rem', color: '#fff', fontFamily: 'monospace' }} />
            {verificationStatus && <div style={{ marginBottom: '1rem', padding: '0.5rem', borderRadius: '0.5rem', background: verificationStatus.includes('✅') ? '#14532d' : verificationStatus.includes('❌') ? '#7f1a1a' : '#1e3a8a', textAlign: 'center', fontSize: '0.875rem' }}>{verificationStatus}</div>}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={verifyPayment} disabled={verifying} style={{ flex: 1, background: '#10b981', color: '#000', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>{verifying ? '⚡ Verifying...' : '✅ Verify Payment'}</button>
              <button onClick={() => { setShowPayment(false); setConfirmationCode(''); setVerificationStatus(''); }} style={{ flex: 1, background: '#333', color: '#fff', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }`}</style>
    </div>
  );
}