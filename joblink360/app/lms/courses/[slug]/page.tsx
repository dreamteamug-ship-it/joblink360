// app/lms/courses/[slug]/page.tsx
// DYNAMIC Course Player

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CoursePlayer() {
    const params = useParams();
    const slug = params.slug;
    
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            fetch(`/api/courses/${slug}`)
                .then(res => res.json())
                .then(data => {
                    setCourse(data.course);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [slug]);

    if (loading) {
        return (
            <div style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
                Loading course...
            </div>
        );
    }

    if (!course) {
        return (
            <div style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
                Course not found
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
            <header style={{ background: '#000', padding: '1rem', borderBottom: '1px solid #333' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
                    <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none' }}>JobLink 360</Link>
                    <div>
                        <Link href="/lms" style={{ color: '#9ca3af', marginRight: '1rem', textDecoration: 'none' }}>Courses</Link>
                        <Link href="/jobs" style={{ color: '#9ca3af', marginRight: '1rem', textDecoration: 'none' }}>Jobs</Link>
                        <Link href="/funding" style={{ color: '#9ca3af', textDecoration: 'none' }}>Funding</Link>
                    </div>
                </div>
            </header>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <h1 style={{ color: '#f59e0b', fontSize: '2rem' }}>{course.title}</h1>
                <div style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem', marginTop: '1rem' }}>
                    <p style={{ color: '#9ca3af' }}>{course.description}</p>
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #333' }}>
                        <p><strong style={{ color: '#f59e0b' }}>Duration:</strong> {course.duration_hours} hours</p>
                        <p><strong style={{ color: '#f59e0b' }}>Level:</strong> {course.level}</p>
                        <p><strong style={{ color: '#f59e0b' }}>Price:</strong> {course.price === 0 ? 'Free' : `$${course.price}`}</p>
                    </div>
                    <button style={{ background: '#f59e0b', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', marginTop: '1.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
                        Start Learning →
                    </button>
                </div>
            </div>
        </div>
    );
}