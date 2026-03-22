// app/lms/courses/page.tsx
// Static Courses Page - All courses

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/courses')
            .then(res => res.json())
            .then(data => {
                if (data.success) setCourses(data.courses);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
            <header style={{ background: '#000', borderBottom: '1px solid #333', padding: '1rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
                    <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none' }}>JobLink 360</Link>
                    <div>
                        <Link href="/jobs/real" style={{ color: '#9ca3af', marginRight: '1rem', textDecoration: 'none' }}>Jobs</Link>
                        <Link href="/funding/real" style={{ color: '#9ca3af', textDecoration: 'none' }}>Funding</Link>
                    </div>
                </div>
            </header>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <h1 style={{ color: '#f59e0b' }}>📚 Our Courses</h1>
                <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>Learn AI, Digital Skills, and Business</p>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>Loading courses...</div>
                ) : courses.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>No courses available</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {courses.map((course, i) => (
                            <div key={i} style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #222' }}>
                                <h3 style={{ color: '#f59e0b' }}>{course.title}</h3>
                                <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem' }}>{course.description}</p>
                                <div style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.75rem' }}>
                                    <span>⏱️ {course.duration_hours} hours</span>
                                    <span style={{ marginLeft: '1rem' }}>📊 {course.level}</span>
                                </div>
                                <button 
                                    style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', marginTop: '1rem', cursor: 'pointer', width: '100%' }}
                                >
                                    Enroll Now →
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
