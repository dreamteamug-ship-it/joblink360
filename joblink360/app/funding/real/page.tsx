// app/funding/real/page.tsx
// REAL FUNDING PAGE - Shows actual grant opportunities

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Grant {
    title: string;
    donor: string;
    amount: string;
    deadline: string;
    country: string;
    description: string;
    category: string;
    probability: string;
    source_url: string;
    requirements: string;
}

export default function RealFundingPage() {
    const [grants, setGrants] = useState<Grant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showHighOnly, setShowHighOnly] = useState(false);

    const countries = ["All", "Kenya", "Nigeria", "South Africa", "Uganda", "Tanzania", "Rwanda", "Ghana", "Ethiopia"];
    const categories = ["All", "Technology", "Entrepreneurship", "Employment", "Finance"];

    const fetchGrants = async () => {
        setLoading(true);
        setError('');
        
        try {
            let url = '/api/funding/real';
            const params = new URLSearchParams();
            if (selectedCountry && selectedCountry !== 'All') params.append('country', selectedCountry);
            if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
            if (showHighOnly) params.append('high', 'true');
            if (params.toString()) url += `?${params.toString()}`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.success) {
                setGrants(data.opportunities);
            } else {
                setError(data.error || 'Failed to load grants');
            }
        } catch (err) {
            setError('Network error. Please refresh.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGrants();
    }, [selectedCountry, selectedCategory, showHighOnly]);

    const getProbabilityColor = (prob: string) => {
        if (prob.includes('High')) return '#10b981';
        if (prob.includes('Medium')) return '#f59e0b';
        return '#ef4444';
    };

    const formatDeadline = (date: string) => {
        const deadline = new Date(date);
        const today = new Date();
        const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysLeft < 0) return 'Expired';
        if (daysLeft < 7) return `${daysLeft} days left ⚠️`;
        if (daysLeft < 30) return `${daysLeft} days left`;
        return `${Math.ceil(daysLeft / 30)} months left`;
    };

    const handleApply = (grant: Grant) => {
        if (confirm(`Apply for: ${grant.title}\n\nWe'll help you prepare a winning proposal. Continue?`)) {
            window.open(grant.source_url, '_blank');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
            {/* Header */}
            <header style={{ background: '#000', borderBottom: '1px solid #333', padding: '1rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        JobLink 360
                    </Link>
                    <div>
                        <Link href="/lms" style={{ color: '#9ca3af', textDecoration: 'none', marginRight: '1rem' }}>Courses</Link>
                        <Link href="/pay" style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none' }}>
                            Pay KES 5,000
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>💰 Real Funding Opportunities</h1>
                    <p style={{ color: '#9ca3af' }}>
                        Live grants from World Bank, African Development Bank, EU, USAID, Mastercard Foundation, and Gates Foundation
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
                    
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af' }}>
                        <input 
                            type="checkbox" 
                            checked={showHighOnly}
                            onChange={(e) => setShowHighOnly(e.target.checked)}
                        />
                        High Probability Only
                    </label>
                    
                    <button 
                        onClick={fetchGrants}
                        style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
                    >
                        🔄 Refresh
                    </button>
                </div>

                {/* Results */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🕷️</div>
                        <p>Fetching real funding opportunities...</p>
                    </div>
                ) : error ? (
                    <div style={{ background: '#7f1a1a', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                        ❌ {error}
                    </div>
                ) : grants.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
                        No opportunities match your filters. Try changing criteria.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {grants.map((grant, i) => (
                            <div key={i} style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #222' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                                            <span style={{ color: '#f59e0b', fontSize: '0.75rem', background: '#1a1a1a', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                                                {grant.donor}
                                            </span>
                                            <span style={{ color: getProbabilityColor(grant.probability), fontSize: '0.75rem', background: '#1a1a1a', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                                                {grant.probability} Probability
                                            </span>
                                        </div>
                                        <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>{grant.title}</h3>
                                        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>{grant.description}</p>
                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.75rem' }}>
                                            <span style={{ color: '#f59e0b' }}>💰 {grant.amount}</span>
                                            <span>🌍 {grant.country}</span>
                                            <span>📅 {formatDeadline(grant.deadline)}</span>
                                            <span>🏷️ {grant.category}</span>
                                        </div>
                                        <details style={{ marginTop: '0.5rem' }}>
                                            <summary style={{ color: '#9ca3af', fontSize: '0.75rem', cursor: 'pointer' }}>Requirements</summary>
                                            <p style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.5rem' }}>{grant.requirements}</p>
                                        </details>
                                    </div>
                                    <button
                                        onClick={() => handleApply(grant)}
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
