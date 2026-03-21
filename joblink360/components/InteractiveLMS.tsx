'use client';
import React, { useState, useEffect } from 'react';

export function InteractiveLMS() {
  const [mounted, setMounted] = useState(false);
  const [activeCourse, setActiveCourse] = useState<number | null>(null);

  // Safe Hydration: Wait for the browser to mount before rendering interactivity
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ color: '#f59e0b', padding: '2rem', textAlign: 'center' }}>⚡ Initiating Sovereign Node...</div>;
  }

  const courses = ['AI Prompt Engineering', 'Data Annotation Mastery', 'High-Ticket Virtual Sales'];

  return (
    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
      {courses.map((course, i) => (
        <div key={i} style={{ background: '#111', padding: '1.5rem', borderRadius: '12px', border: activeCourse === i ? '2px solid #10b981' : '1px solid #222', transition: 'all 0.3s ease' }}>
          <h3 style={{ color: '#f59e0b', marginTop: 0 }}>{course}</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Module {i+1} of 12 • 3-Month Income Path</p>
          <button 
            onClick={() => {
                setActiveCourse(i);
                alert(`Vulture-Eye Verified: Accessing Secure Video Node for ${course}...`);
            }}
            style={{ width: '100%', background: activeCourse === i ? '#10b981' : '#f59e0b', color: '#000', border: 'none', padding: '0.8rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem', transition: 'all 0.3s ease' }}
          >
            {activeCourse === i ? '▶ Node Active' : '▶ Start Learning'}
          </button>
        </div>
      ))}
    </div>
  );
}
