// app/funding/page.tsx
// DYNAMIC Funding Page with filters

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FundingPage() {
    const [grants, setGrants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetch('/api/funding')
            .then(res => res.json())
            .then(data => {
                setGrants(data.opportunities || []);
                setLoading(false);
            });
    }, []);

    const filteredGrants = filter === 'all' ? grants : grants.filter((g: any) => g.category === filter);

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
            <header style={{ background: '#000', padding: '1rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
                    <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none' }}>JobLink 360</Link>
                    <div>
                        <Link href="/lms" style={{ color: '#9ca3af', marginRight: '1rem', textDecoration: 'none' }}>Courses</Link>
                        <Link href="/jobs" style={{ color: '#9ca3af', textDecoration: 'none' }}>Jobs</Link>
                    </div>
                </div>
            </header>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <h1 style={{ color: '#f59e0b' }}>?? Funding Opportunities</h1>
                
                <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
                    <button onClick={() => setFilter('all')} style={{ background: filter === 'all' ? '#f59e0b' : '#333', color: filter === 'all' ? '#000' : '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem' }}>All</button>
                    <button onClick={() => setFilter('Technology')} style={{ background: filter === 'Technology' ? '#f59e0b' : '#333', color: filter === 'Technology' ? '#000' : '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem' }}>Technology</button>
                    <button onClick={() => setFilter('Entrepreneurship')} style={{ background: filter === 'Entrepreneurship' ? '#f59e0b' : '#333', color: filter === 'Entrepreneurship' ? '#000' : '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem' }}>Entrepreneurship</button>
                </div>

                {loading ? <p>Loading grants...</p> : filteredGrants.map((grant: any, i) => (
                    <div key={i} style={{ background: '#111', padding: '1.5rem', margin: '1rem 0', borderRadius: '0.5rem' }}>
                        <h3 style={{ color: '#f59e0b' }}>{grant.title}</h3>
                        <p>{grant.donor} - {grant.amount}</p>
                        <p style={{ color: '#9ca3af' }}>{grant.description}</p>
                        <p>Deadline: {grant.deadline}</p>
                        <button onClick={() => window.open(grant.url, '_blank')} style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', marginTop: '1rem', cursor: 'pointer' }}>
                            Apply Now ?
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
