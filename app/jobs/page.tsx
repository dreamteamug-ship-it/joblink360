'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/app/components/layout/Navbar';
import { Search, MapPin, Briefcase, DollarSign, ExternalLink, Filter, RefreshCw } from 'lucide-react';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [sources, setSources] = useState({});
  const [stats, setStats] = useState({ total: 0, avgSalary: 0 });

  const fetchJobs = async (refresh = false) => {
    setLoading(true);
    try {
      // Use the unified API to get jobs from ALL sources
      const url = `/api/jobs/unified?q=${encodeURIComponent(searchTerm || 'developer')}&location=${encodeURIComponent(location || 'Remote')}${refresh ? '&refresh=true' : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      
      setJobs(data.jobs || []);
      setSources(data.sources || {});
      
      // Calculate stats
      const total = data.jobs?.length || 0;
      const avgSalary = data.jobs?.reduce((acc: number, job: any) => {
        const salary = parseInt(job.salary?.replace(/[^0-9]/g, '') || '0');
        return acc + salary;
      }, 0) / total || 0;
      
      setStats({ total, avgSalary });
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(true);
  };

  const handleRefresh = () => {
    fetchJobs(true);
  };

  // Get unique locations for filter
  const locations = ['all', ...new Set(jobs.map((j: any) => j.location))];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">🔍 Live Job Search</h1>
            <p className="text-gray-400">
              Real-time jobs from LinkedIn, Indeed, Upwork, Glassdoor, and remote sources
            </p>
          </div>
          
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/30 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-gray-400">Live Jobs</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/30 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {stats.avgSalary > 0 ? `$${Math.round(stats.avgSalary).toLocaleString()}` : 'N/A'}
                </div>
                <div className="text-sm text-gray-400">Avg. Salary</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/30 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Filter className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {Object.keys(sources).filter(k => sources[k]).length}
                </div>
                <div className="text-sm text-gray-400">Active Sources</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-gray-800/30 p-6 rounded-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Job title, skills, or company"
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-xl border border-gray-700 focus:border-yellow-400 focus:outline-none text-white"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-xl border border-gray-700 focus:border-yellow-400 focus:outline-none text-white"
              />
            </div>
            
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/20 transition-all"
            >
              Search Jobs
            </button>
          </div>
          
          {/* Source indicators */}
          <div className="flex flex-wrap gap-4 mt-4">
            {Object.entries(sources).map(([key, value]: [string, any]) => (
              value && (
                <div key={key} className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-400 capitalize">{key}</span>
                </div>
              )
            ))}
          </div>
        </form>

        {/* Job Listings */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="bg-gray-800/30 p-6 rounded-2xl animate-pulse">
                <div className="h-6 w-48 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 w-32 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-24 bg-gray-700 rounded mb-4"></div>
                <div className="h-3 w-full bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {jobs.map((job: any, index: number) => (
              <div key={index} className="bg-gray-800/30 p-6 rounded-2xl hover:bg-gray-800/50 transition border border-gray-700 hover:border-yellow-400/30">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-yellow-400">{job.title}</h3>
                      {job.source && (
                        <span className="px-3 py-1 bg-gray-700 rounded-full text-xs capitalize">
                          {job.source}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-300 mb-2">{job.company}</p>
                    
                    <div className="flex flex-wrap gap-4 mb-3">
                      <span className="flex items-center gap-1 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {job.location || 'Remote'}
                      </span>
                      {job.salary && (
                        <span className="flex items-center gap-1 text-sm text-green-400">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                      {job.description}
                    </p>
                    
                    {job.match && (
                      <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                        {job.match}% Match
                      </span>
                    )}
                    
                    <div className="text-xs text-gray-500 mt-2">
                      Posted: {job.postedDate || 'Recently'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end">
                    <a
                      href={job.applyUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-yellow-600 text-black rounded-lg font-bold hover:bg-yellow-500 transition inline-flex items-center gap-2 whitespace-nowrap"
                    >
                      Apply <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
            
            {jobs.length === 0 && (
              <div className="text-center py-12 bg-gray-800/30 rounded-2xl">
                <p className="text-gray-400">No jobs found. Try different search terms.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}