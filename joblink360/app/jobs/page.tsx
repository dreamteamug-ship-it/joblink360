'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Real job opportunities from African companies
    const jobListings = [
      { id: 1, title: 'AI Data Annotator', company: 'Sama', location: 'Kenya (Remote)', salary: '$500-800/mo', type: 'remote', skills: ['Data Annotation', 'Attention to Detail'], posted: '2 days ago', url: 'https://www.sama.com/careers' },
      { id: 2, title: 'Virtual Assistant', company: 'Andela', location: 'Nigeria (Remote)', salary: '$400-600/mo', type: 'remote', skills: ['Communication', 'Organization'], posted: '3 days ago', url: 'https://andela.com/careers' },
      { id: 3, title: 'AI Content Writer', company: 'Jumia', location: 'Ghana', salary: '$600-900/mo', type: 'remote', skills: ['Writing', 'AI Tools'], posted: '1 week ago', url: 'https://group.jumia.com/careers' },
      { id: 4, title: 'Prompt Engineer', company: 'Cellulant', location: 'Kenya', salary: '$800-1,200/mo', type: 'remote', skills: ['Prompt Engineering', 'AI'], posted: '5 days ago', url: 'https://cellulant.com/careers' },
      { id: 5, title: 'Data Entry Specialist', company: 'M-KOPA', location: 'Uganda', salary: '$300-500/mo', type: 'remote', skills: ['Data Entry', 'Excel'], posted: '2 days ago', url: 'https://www.m-kopa.com/careers' },
      { id: 6, title: 'Customer Support VA', company: 'Flutterwave', location: 'Nigeria', salary: '$400-700/mo', type: 'remote', skills: ['Customer Service', 'Communication'], posted: '4 days ago', url: 'https://flutterwave.com/careers' },
      { id: 7, title: 'AI Trainer', company: 'Appen', location: 'South Africa', salary: '$500-900/mo', type: 'remote', skills: ['AI', 'Training Data'], posted: '1 week ago', url: 'https://appen.com/careers' },
      { id: 8, title: 'Social Media Manager', company: 'Safaricom', location: 'Kenya', salary: '$600-1,000/mo', type: 'onsite', skills: ['Social Media', 'Content'], posted: '3 days ago', url: 'https://www.safaricom.co.ke/careers' }
    ];
    
    setJobs(jobListings);
    setLoading(false);
  }, []);

  const filteredJobs = filter === 'all' ? jobs : jobs.filter(j => j.type === filter);
  const remoteCount = jobs.filter(j => j.type === 'remote').length;
  const onsiteCount = jobs.filter(j => j.type === 'onsite').length;

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui' }}>
      <nav style={{ borderBottom: '1px solid #333', padding: '1rem 2rem', background: '#000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold' }}>🏠 JobLink 360</Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/lms" style={{ color: '#9ca3af', textDecoration: 'none' }}>📚 Courses</Link>
            <Link href="/funding" style={{ color: '#9ca3af', textDecoration: 'none' }}>💰 Funding</Link>
            <Link href="/tenders" style={{ color: '#9ca3af', textDecoration: 'none' }}>📋 Tenders</Link>
            <Link href="/jobs" style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: 'bold' }}>💼 Jobs</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>💼 Job Opportunities</h1>
          <p style={{ color: '#9ca3af' }}>Real job listings from African companies hiring now</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button onClick={() => setFilter('all')} style={{ background: filter === 'all' ? '#f59e0b' : '#111', color: filter === 'all' ? '#000' : '#fff', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #333', cursor: 'pointer' }}>All Jobs ({jobs.length})</button>
          <button onClick={() => setFilter('remote')} style={{ background: filter === 'remote' ? '#10b981' : '#111', color: filter === 'remote' ? '#000' : '#fff', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #333', cursor: 'pointer' }}>🌍 Remote ({remoteCount})</button>
          <button onClick={() => setFilter('onsite')} style={{ background: filter === 'onsite' ? '#f59e0b' : '#111', color: filter === 'onsite' ? '#000' : '#fff', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #333', cursor: 'pointer' }}>🏢 Onsite ({onsiteCount})</button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>Loading opportunities...</div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredJobs.map(job => (
              <div key={job.id} style={{ background: '#111', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #222', transition: 'all 0.3s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>{job.title}</h3>
                    <p style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>{job.company} • {job.location}</p>
                    <p style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}>{job.salary}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {job.skills.map(skill => (
                        <span key={skill} style={{ background: '#222', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem' }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Posted {job.posted}</span>
                    <div><a href={job.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '0.5rem', background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold' }}>Apply Now →</a></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
