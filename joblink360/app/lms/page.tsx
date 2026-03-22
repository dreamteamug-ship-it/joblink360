// app/lms/page.tsx
// Static LMS Page - All courses with details

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LMSPage() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/courses')
            .then(res => res.json())
            .then(data => {
                setCourses(data.courses || []);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
            <header style={{ background: '#000', padding: '1rem', borderBottom: '1px solid #333' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
                    <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none' }}>JobLink 360</Link>
                    <div>
                        <Link href="/jobs" style={{ color: '#9ca3af', marginRight: '1rem', textDecoration: 'none' }}>Jobs</Link>
                        <Link href="/funding" style={{ color: '#9ca3af', textDecoration: 'none' }}>Funding</Link>
                    </div>
                </div>
            </header>
            
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <h1 style={{ color: '#f59e0b', fontSize: '2rem' }}>?? DreamTeQ Academy</h1>
                <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>Master AI, Digital Skills, and Business</p>
                
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>Loading courses...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {courses.map((course: any, i) => (
                            <div key={i} style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #222' }}>
                                <h3 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>{course.title}</h3>
                                <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{course.description}</p>
                                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>?? {course.duration_hours}h</span>
                                        <span style={{ color: '#6b7280', fontSize: '0.75rem', marginLeft: '1rem' }}>?? {course.level}</span>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedCourse(course)}
                                        style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
                                    >
                                        View Details ?
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Course Modal */}
                {selectedCourse && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                        <div style={{ background: '#111', borderRadius: '1rem', padding: '2rem', maxWidth: '500px', width: '90%', border: '1px solid #f59e0b' }}>
                            <h2 style={{ color: '#f59e0b' }}>{selectedCourse.title}</h2>
                            <p style={{ color: '#9ca3af', marginTop: '1rem' }}>{selectedCourse.description}</p>
                            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0a0a0a', borderRadius: '0.5rem' }}>
                                <p><strong style={{ color: '#f59e0b' }}>Duration:</strong> {selectedCourse.duration_hours} hours</p>
                                <p><strong style={{ color: '#f59e0b' }}>Level:</strong> {selectedCourse.level}</p>
                                <p><strong style={{ color: '#f59e0b' }}>Price:</strong> {selectedCourse.price === 0 ? 'Free' : `$${selectedCourse.price}`}</p>
                            </div>
                            <button 
                                onClick={() => alert('Enrollment coming soon!')}
                                style={{ background: '#f59e0b', color: '#000', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', marginTop: '1rem', width: '100%', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                Enroll Now ?
                            </button>
                            <button 
                                onClick={() => setSelectedCourse(null)}
                                style={{ background: '#333', color: '#fff', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', marginTop: '0.5rem', width: '100%', cursor: 'pointer' }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
