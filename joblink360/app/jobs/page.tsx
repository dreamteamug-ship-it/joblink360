// app/jobs/page.tsx
// DYNAMIC Jobs Page with filters

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetch('/api/jobs')
            .then(res => res.json())
            .then(data => {
                setJobs(data.jobs || []);
                setLoading(false);
            });
    }, []);

    const filteredJobs = filter === 'all' ? jobs : jobs.filter((j: any) => j.type === filter);

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
            <header style={{ background: '#000', padding: '1rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
                    <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none' }}>JobLink 360</Link>
                    <div>
                        <Link href="/lms" style={{ color: '#9ca3af', marginRight: '1rem', textDecoration: 'none' }}>Courses</Link>
                        <Link href="/funding" style={{ color: '#9ca3af', textDecoration: 'none' }}>Funding</Link>
                    </div>
                </div>
            </header>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <h1 style={{ color: '#f59e0b' }}>?? Job Opportunities</h1>
                
                <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
                    <button onClick={() => setFilter('all')} style={{ background: filter === 'all' ? '#f59e0b' : '#333', color: filter === 'all' ? '#000' : '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem' }}>All</button>
                    <button onClick={() => setFilter('remote')} style={{ background: filter === 'remote' ? '#f59e0b' : '#333', color: filter === 'remote' ? '#000' : '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem' }}>Remote</button>
                    <button onClick={() => setFilter('full-time')} style={{ background: filter === 'full-time' ? '#f59e0b' : '#333', color: filter === 'full-time' ? '#000' : '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem' }}>Full Time</button>
                </div>

                {loading ? <p>Loading jobs...</p> : filteredJobs.map((job: any, i) => (
                    <div key={i} style={{ background: '#111', padding: '1.5rem', margin: '1rem 0', borderRadius: '0.5rem' }}>
                        <h3 style={{ color: '#f59e0b' }}>{job.title}</h3>
                        <p>{job.company} - {job.location}</p>
                        <p style={{ color: '#9ca3af' }}>{job.description}</p>
                        <button onClick={() => window.open(job.url, '_blank')} style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', marginTop: '1rem', cursor: 'pointer' }}>
                            Apply Now ?
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
