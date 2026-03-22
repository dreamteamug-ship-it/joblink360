// app/jobs/real/page.tsx
// REAL JOBS PAGE - Shows live job opportunities

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
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');

    const fetchJobs = async () => {
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch('/api/jobs/scrape');
            const data = await response.json();
            
            if (data.success) {
                setJobs(data.jobs);
            } else {
                setError(data.error || 'Failed to load jobs');
            }
        } catch (err) {
            setError('Network error. Please refresh.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const filteredJobs = filter === 'all' ? jobs : jobs.filter(job => job.job_type === filter);

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
            <header style={{ background: '#000', borderBottom: '1px solid #333', padding: '1rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        JobLink 360
                    </Link>
                    <div>
                        <Link href="/lms" style={{ color: '#9ca3af', textDecoration: 'none', marginRight: '1rem' }}>Courses</Link>
                        <Link href="/funding/real" style={{ color: '#9ca3af', textDecoration: 'none', marginRight: '1rem' }}>Funding</Link>
                    </div>
                </div>
            </header>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>💼 Real Job Opportunities</h1>
                    <p style={{ color: '#9ca3af' }}>
                        Live jobs from RemoteOK, WeWorkRemotely, Indeed, BrighterMonday
                    </p>
                </div>

                {/* Simple Filter */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <button
                        onClick={() => setFilter('all')}
                        style={{
                            background: filter === 'all' ? '#f59e0b' : '#333',
                            color: filter === 'all' ? '#000' : '#fff',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        All Jobs
                    </button>
                    <button
                        onClick={() => setFilter('remote')}
                        style={{
                            background: filter === 'remote' ? '#f59e0b' : '#333',
                            color: filter === 'remote' ? '#000' : '#fff',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Remote
                    </button>
                    <button
                        onClick={() => setFilter('full-time')}
                        style={{
                            background: filter === 'full-time' ? '#f59e0b' : '#333',
                            color: filter === 'full-time' ? '#000' : '#fff',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Full Time
                    </button>
                    <button
                        onClick={fetchJobs}
                        style={{
                            background: '#f59e0b',
                            color: '#000',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            cursor: 'pointer',
                            marginLeft: 'auto'
                        }}
                    >
                        🔄 Refresh
                    </button>
                </div>

                {/* Results */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💼</div>
                        <p>Fetching real job opportunities...</p>
                    </div>
                ) : error ? (
                    <div style={{ background: '#7f1a1a', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                        ❌ {error}
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
                        No jobs found. Try refreshing.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {filteredJobs.map((job, index) => (
                            <div key={index} style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #222' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                                            <span style={{ color: '#f59e0b', fontSize: '0.75rem', background: '#1a1a1a', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                                                {job.company}
                                            </span>
                                            <span style={{ color: '#10b981', fontSize: '0.75rem', background: '#1a1a1a', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                                                {job.job_type.toUpperCase()}
                                            </span>
                                        </div>
                                        <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>{job.title}</h3>
                                        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>{job.description}</p>
                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.75rem' }}>
                                            <span>📍 {job.location}</span>
                                            <span>💰 {job.salary}</span>
                                            <span>📅 {job.posted_date}</span>
                                            <span>🏷️ {job.category}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => window.open(job.source_url, '_blank')}
                                        style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        Apply Now →
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
