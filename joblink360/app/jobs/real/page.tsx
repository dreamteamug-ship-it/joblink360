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
    country: string;
    description: string;
    requirements: string[];
    salary_min?: number;
    salary_max?: number;
    salary_currency: string;
    job_type: string;
    experience_level: string;
    category: string;
    source_url: string;
    source_name: string;
    posted_date: string;
    is_featured?: boolean;
}

export default function RealJobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [showFeatured, setShowFeatured] = useState(false);

    const countries = ["All", "Kenya", "Remote", "Global"];
    const categories = ["All", "Technology", "AI/ML", "Marketing", "Sales", "Data", "Product"];
    const jobTypes = ["All", "full-time", "remote", "contract", "internship"];

    const fetchJobs = async () => {
        setLoading(true);
        setError('');
        
        try {
            let url = '/api/jobs/scrape';
            const params = new URLSearchParams();
            if (selectedCountry && selectedCountry !== 'All') params.append('country', selectedCountry);
            if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
            if (selectedType && selectedType !== 'All') {
                if (selectedType === 'remote') params.append('remote', 'true');
                else params.append('job_type', selectedType);
            }
            if (showFeatured) params.append('featured', 'true');
            if (params.toString()) url += `?${params.toString()}`;
            
            const response = await fetch(url);
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
    }, [selectedCountry, selectedCategory, selectedType, showFeatured]);

    const formatSalary = (min?: number, max?: number, currency?: string) => {
        if (!min && !max) return 'Salary not specified';
        const cur = currency === 'KES' ? 'KES' : '$';
        if (min && max) return `${cur} ${min.toLocaleString()} - ${cur} ${max.toLocaleString()}`;
        if (min) return `${cur} ${min.toLocaleString()}+`;
        if (max) return `Up to ${cur} ${max.toLocaleString()}`;
        return 'Salary not specified';
    };

    const getTypeColor = (type: string) => {
        switch(type) {
            case 'remote': return '#10b981';
            case 'full-time': return '#f59e0b';
            case 'contract': return '#8b5cf6';
            case 'internship': return '#ec489a';
            default: return '#6b7280';
        }
    };

    const formatDate = (date: string) => {
        const posted = new Date(date);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return posted.toLocaleDateString();
    };

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
                        <Link href="/pay" style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none' }}>
                            Pay KES 5,000
                        </Link>
                    </div>
                </div>
            </header>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>💼 Real Job Opportunities</h1>
                    <p style={{ color: '#9ca3af' }}>
                        Live jobs from RemoteOK, WeWorkRemotely, Indeed, BrighterMonday, and LinkedIn
                    </p>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        style={{ background: '#111', border: '1px solid #333', borderRadius: '0.5rem', padding: '0.5rem 1rem', color: '#fff' }}
                    >
                        {countries.map(c => <option key={c}>{c}</option>)}
                    </select>
                    
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ background: '#111', border: '1px solid #333', borderRadius: '0.5rem', padding: '0.5rem 1rem', color: '#fff' }}
                    >
                        {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                    
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        style={{ background: '#111', border: '1px solid #333', borderRadius: '0.5rem', padding: '0.5rem 1rem', color: '#fff' }}
                    >
                        {jobTypes.map(t => <option key={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                    </select>
                    
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af' }}>
                        <input 
                            type="checkbox" 
                            checked={showFeatured}
                            onChange={(e) => setShowFeatured(e.target.checked)}
                        />
                        Featured Jobs Only
                    </label>
                    
                    <button 
                        onClick={fetchJobs}
                        style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
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
                ) : jobs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
                        No jobs match your filters. Try changing criteria.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {jobs.map((job) => (
                            <div key={job.id} style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #222' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                                            <span style={{ color: '#f59e0b', fontSize: '0.75rem', background: '#1a1a1a', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                                                {job.company}
                                            </span>
                                            <span style={{ color: getTypeColor(job.job_type), fontSize: '0.75rem', background: '#1a1a1a', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                                                {job.job_type.toUpperCase()}
                                            </span>
                                            {job.is_featured && (
                                                <span style={{ color: '#f59e0b', fontSize: '0.75rem', background: '#1a1a1a', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                                                    ⭐ Featured
                                                </span>
                                            )}
                                        </div>
                                        <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>{job.title}</h3>
                                        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>{job.description}</p>
                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.75rem' }}>
                                            <span>📍 {job.location}</span>
                                            <span>💰 {formatSalary(job.salary_min, job.salary_max, job.salary_currency)}</span>
                                            <span>📅 {formatDate(job.posted_date)}</span>
                                            <span>🏷️ {job.category}</span>
                                        </div>
                                        {job.requirements && job.requirements.length > 0 && (
                                            <details style={{ marginTop: '0.5rem' }}>
                                                <summary style={{ color: '#9ca3af', fontSize: '0.75rem', cursor: 'pointer' }}>Requirements</summary>
                                                <ul style={{ marginTop: '0.5rem', marginLeft: '1rem', color: '#6b7280', fontSize: '0.75rem' }}>
                                                    {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                                                </ul>
                                            </details>
                                        )}
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
