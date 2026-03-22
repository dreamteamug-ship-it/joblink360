// app/lms/page.tsx
// LMS Dashboard

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LMSPage() {
    const [courses, setCourses] = useState([]);
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
            <header style={{ background: '#000', padding: '1rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
                    <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none' }}>JobLink 360</Link>
                    <div>
                        <Link href="/jobs" style={{ color: '#9ca3af', marginRight: '1rem', textDecoration: 'none' }}>Jobs</Link>
                        <Link href="/funding" style={{ color: '#9ca3af', textDecoration: 'none' }}>Funding</Link>
                    </div>
                </div>
            </header>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <h1 style={{ color: '#f59e0b' }}>?? Your Learning Journey</h1>
                {loading ? <p>Loading courses...</p> : courses.map((course: any, i) => (
                    <div key={i} style={{ background: '#111', padding: '1.5rem', margin: '1rem 0', borderRadius: '0.5rem' }}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <Link href={`/lms/courses/${course.slug}`}>
                            <button style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', marginTop: '1rem', cursor: 'pointer' }}>
                                Start Learning ?
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
