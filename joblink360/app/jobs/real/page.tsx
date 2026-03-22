// app/jobs/real/page.tsx
// REAL JOBS PAGE

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    salary: string;
    job_type: string;
    category: string;
    source_url: string;
    posted_date: string;
}

export default function RealJobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/jobs/scrape');
            const data = await res.json();
            if (data.success) setJobs(data.jobs);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredJobs = filter === 'all' ? jobs : jobs.filter(j => j.job_type === filter);

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
            <header style={{ background: '#000', borderBottom: '1px solid #333', padding: '1rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
                    <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none' }}>JobLink 360</Link>
                    <div>
                        <Link href="/lms" style={{ color: '#9ca3af', marginRight: '1rem', textDecoration: 'none' }}>Courses</Link>
                        <Link href="/funding/real" style={{ color: '#9ca3af', textDecoration: 'none' }}>Funding</Link>
                    </div>
                </div>
            </header>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <h1 style={{ color: '#f59e0b' }}>💼 Real Jobs</h1>
                <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>Live opportunities from RemoteOK, Indeed, BrighterMonday</p>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    {['all', 'remote', 'full-time'].map(type => (
                        <button key={type}
                            onClick={() => setFilter(type)}
                            style={{
                                background: filter === type ? '#f59e0b' : '#333',
                                color: filter === type ? '#000' : '#fff',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {type === 'all' ? 'All Jobs' : type === 'remote' ? 'Remote' : 'Full Time'}
                        </button>
                    ))}
                    <button onClick={fetchJobs} style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', marginLeft: 'auto' }}>
                        🔄 Refresh
                    </button>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>Loading jobs...</div>
                ) : filteredJobs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>No jobs found</div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {filteredJobs.map((job, i) => (
                            <div key={i} style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #222' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div>
                                        <span style={{ color: '#f59e0b', fontSize: '0.75rem', background: '#1a1a1a', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>{job.company}</span>
                                        <h3 style={{ marginTop: '0.5rem' }}>{job.title}</h3>
                                        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem' }}>{job.description}</p>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', marginTop: '1rem', color: '#6b7280' }}>
                                            <span>📍 {job.location}</span>
                                            <span>💰 {job.salary}</span>
                                            <span>📅 {job.posted_date}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => window.open(job.source_url, '_blank')} style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
                                        Apply →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
