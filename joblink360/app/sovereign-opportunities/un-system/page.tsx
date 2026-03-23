// app/sovereign-opportunities/un-system/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Opportunity {
  id: string;
  title: string;
  opportunity_type: string;
  organization: string;
  country: string;
  sector: string;
  deadline: string;
  description: string;
  sovereign_score: number;
  url: string;
  budget?: string;
  requirements?: string[];
}

export default function UNSystemPortal() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState('all');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterSector, setFilterSector] = useState('');
  const [scraping, setScraping] = useState(false);
  
  const opportunityTypes = ['all', 'job', 'internship', 'tender', 'supply', 'prequalification'];
  const countries = ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia', 'Nigeria', 'South Africa', 'Global'];
  const sectors = ['Technology', 'Health', 'Education', 'Environment', 'Humanitarian', 'Development', 'Administration'];
  
  useEffect(() => {
    loadOpportunities();
  }, [currentPage, filterType, filterCountry, filterSector]);
  
  async function loadOpportunities() {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        type: filterType,
        ...(filterCountry && { country: filterCountry }),
        ...(filterSector && { sector: filterSector })
      });
      
      const response = await fetch(`/api/sovereign/un-system?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setOpportunities(data.opportunities);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error('Error loading opportunities:', error);
    } finally {
      setLoading(false);
    }
  }
  
  async function triggerScrape() {
    setScraping(true);
    try {
      const response = await fetch('/api/sovereign/un-system', {
        method: 'POST',
        body: JSON.stringify({ action: 'scrape' })
      });
      const data = await response.json();
      alert(data.message);
      loadOpportunities();
    } catch (error) {
      console.error('Error scraping:', error);
      alert('Failed to scrape opportunities');
    } finally {
      setScraping(false);
    }
  }
  
  const getTypeBadgeColor = (type: string) => {
    switch(type) {
      case 'job': return 'bg-blue-100 text-blue-800';
      case 'internship': return 'bg-green-100 text-green-800';
      case 'tender': return 'bg-purple-100 text-purple-800';
      case 'supply': return 'bg-orange-100 text-orange-800';
      case 'prequalification': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDeadline = (date: string) => {
    const deadline = new Date(date);
    const today = new Date();
    const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return 'Expired';
    if (daysLeft < 7) return `${daysLeft} days left - URGENT!`;
    if (daysLeft < 30) return `${daysLeft} days left`;
    return `${Math.ceil(daysLeft / 30)} months left`;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏛️ UN System Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access high-value opportunities from United Nations agencies across Africa and globally
          </p>
          <button
            onClick={triggerScrape}
            disabled={scraping}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {scraping ? '🔄 Scraping...' : '🕷️ Scrape Latest Opportunities'}
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={filterType}
            onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {opportunityTypes.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
          
          <select
            value={filterCountry}
            onChange={(e) => { setFilterCountry(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          
          <select
            value={filterSector}
            onChange={(e) => { setFilterSector(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Sectors</option>
            {sectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {opportunityTypes.filter(t => t !== 'all').map(type => (
            <div key={type} className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {opportunities.filter(o => o.opportunity_type === type).length}
              </div>
              <div className="text-sm text-gray-600 capitalize">{type}s</div>
            </div>
          ))}
        </div>
        
        {/* Opportunities Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading opportunities...</p>
          </div>
        ) : opportunities.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-600">No opportunities found. Try a different filter or scrape new data.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {opportunities.map((opp) => (
              <div key={opp.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(opp.opportunity_type)}`}>
                        {opp.opportunity_type}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2">{opp.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{opp.organization}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{opp.sovereign_score}</div>
                      <div className="text-xs text-gray-500">Sovereign Score</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-3">{opp.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">📍 {opp.country}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">📂 {opp.sector}</span>
                    {opp.budget && (
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">💰 {opp.budget}</span>
                    )}
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">📅 {formatDeadline(opp.deadline)}</span>
                  </div>
                  
                  {opp.requirements && opp.requirements.length > 0 && (
                    <details className="mt-2 mb-4">
                      <summary className="text-sm text-blue-600 cursor-pointer">Requirements</summary>
                      <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                        {opp.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                  
                  <a
                    href={opp.url}
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
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            
            <span className="px-4 py-2 text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
