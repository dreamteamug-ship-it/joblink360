// app/jobs/page.tsx
"use client";

import React, { useState, useEffect } from 'react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  description: string;
  requirements: string[];
  source_name: string;
  source_url: string;
  posted_date: string;
  deadline: string;
  is_remote: boolean;
  skills: string[];
  experience_level: string;
  sovereign_score: number;
}

const JOB_SOURCES = [
  { id: 'all', name: 'All Sources', icon: '🌐' },
  { id: 'Upwork', name: 'Upwork', icon: '💼' },
  { id: 'Indeed', name: 'Indeed', icon: '🔍' },
  { id: 'LinkedIn', name: 'LinkedIn', icon: '📱' },
  { id: 'Glassdoor', name: 'Glassdoor', icon: '🏢' },
  { id: 'RemoteOK', name: 'RemoteOK', icon: '🌍' },
  { id: 'WeWorkRemotely', name: 'WeWorkRemotely', icon: '🏠' },
  { id: 'Stack Overflow', name: 'Stack Overflow', icon: '📚' }
];

const JOB_TYPES = ['all', 'full-time', 'remote', 'contract', 'part-time'];
const EXPERIENCE_LEVELS = ['all', 'entry', 'mid', 'senior', 'lead'];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filterSource, setFilterSource] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterExp, setFilterExp] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    loadJobs();
  }, [currentPage, filterSource, filterType, filterExp, searchTerm]);
  
  async function loadJobs() {
    setLoading(true);
    try {
      let url = '/api/jobs/scrape?action=recent&limit=50';
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        let filtered = data.jobs;
        
        if (filterSource !== 'all') {
          filtered = filtered.filter(j => j.source_name === filterSource);
        }
        
        if (filterType !== 'all') {
          filtered = filtered.filter(j => j.job_type === filterType);
        }
        
        if (filterExp !== 'all') {
          filtered = filtered.filter(j => j.experience_level === filterExp);
        }
        
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filtered = filtered.filter(j => 
            j.title.toLowerCase().includes(term) ||
            j.company.toLowerCase().includes(term) ||
            j.description.toLowerCase().includes(term)
          );
        }
        
        setTotalItems(filtered.length);
        setTotalPages(Math.ceil(filtered.length / 10));
        const start = (currentPage - 1) * 10;
        setJobs(filtered.slice(start, start + 10));
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  }
  
  async function triggerScrape() {
    setScraping(true);
    try {
      const response = await fetch('/api/jobs/scrape', {
        method: 'POST',
        body: JSON.stringify({ action: 'scrape' })
      });
      const data = await response.json();
      alert(data.message);
      loadJobs();
    } catch (error) {
      console.error('Error scraping:', error);
      alert('Failed to scrape jobs');
    } finally {
      setScraping(false);
    }
  }
  
  const formatSalary = (min: number, max: number, currency: string) => {
    const formatNum = (num: number) => {
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
      return num.toString();
    };
    return `${currency} ${formatNum(min)} - ${formatNum(max)}`;
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
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'remote': return 'bg-green-100 text-green-800';
      case 'full-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-orange-100 text-orange-800';
      case 'part-time': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            💼 Live Job Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time jobs from Upwork, Indeed, LinkedIn, Glassdoor, RemoteOK, and more
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={triggerScrape}
              disabled={scraping}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {scraping ? '🔄 Scraping...' : '🕷️ Scrape Latest Jobs'}
            </button>
            <div className="text-sm text-gray-500 self-center">
              {totalItems} jobs available
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs by title, company, or description..."
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
              <select
                value={filterSource}
                onChange={(e) => { setFilterSource(e.target.value); setCurrentPage(1); }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {JOB_SOURCES.map(source => (
                  <option key={source.id} value={source.id}>{source.icon} {source.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
              <select
                value={filterType}
                onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {JOB_TYPES.map(type => (
                  <option key={type} value={type}>{type === 'all' ? 'All Types' : type.toUpperCase()}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <select
                value={filterExp}
                onChange={(e) => { setFilterExp(e.target.value); setCurrentPage(1); }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {EXPERIENCE_LEVELS.map(level => (
                  <option key={level} value={level}>{level === 'all' ? 'All Levels' : level.toUpperCase()}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => { setCurrentPage(1); loadJobs(); }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Jobs Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-600">No jobs found. Try a different filter or scrape new jobs.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(job.job_type)}`}>
                          {job.job_type === 'remote' ? '🌍' : '💼'} {job.job_type}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(job.sovereign_score)}`}>
                          🎯 Score: {job.sovereign_score}
                        </span>
                        <span className="text-xs text-gray-500">{job.source_name}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
                      <p className="text-gray-700 line-clamp-2">{job.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {formatSalary(job.salary_min, job.salary_max, job.currency)}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Posted: {formatDate(job.posted_date)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills && job.skills.slice(0, 5).map(skill => (
                      <span key={skill} className="bg-gray-100 px-2 py-1 rounded text-xs">💡 {skill}</span>
                    ))}
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">📊 {job.experience_level}</span>
                    {job.requirements && job.requirements.length > 0 && (
                      <details className="inline-block">
                        <summary className="text-xs text-blue-600 cursor-pointer">Requirements</summary>
                        <ul className="absolute bg-white shadow-lg rounded-lg p-2 mt-1 text-xs list-disc list-inside z-10">
                          {job.requirements.slice(0, 4).map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                  
                  <a
                    href={job.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Apply Now →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
        
        <div className="text-center mt-4 text-sm text-gray-500">
          Showing {jobs.length} of {totalItems} jobs
        </div>
      </div>
    </div>
  );
}
