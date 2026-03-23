// app/funding-investment/page.tsx
"use client";

import React, { useState, useEffect } from 'react';

interface FundingOpportunity {
  id: number;
  title: string;
  category: string;
  provider: string;
  amount_min: number;
  amount_max: number;
  currency: string;
  deadline: string;
  description: string;
  eligibility: string[];
  focus_sectors: string[];
  countries: string[];
  website: string;
  stage: string;
}

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '💰', color: 'gray' },
  { id: 'grant', label: 'Grants', icon: '🎁', color: 'green' },
  { id: 'vc', label: 'Equity/VC', icon: '📈', color: 'blue' },
  { id: 'trade-finance', label: 'Trade Finance', icon: '🚢', color: 'orange' },
  { id: 'partnership', label: 'Partnerships', icon: '🤝', color: 'purple' },
  { id: 'debt', label: 'Debt', icon: '🏦', color: 'red' }
];

const SECTORS = [
  'All', 'Agriculture', 'Health', 'Education', 'Technology', 'Climate Change',
  'Renewable Energy', 'Financial Inclusion', 'Women Empowerment', 'Youth Employment',
  'EdTech', 'AgriTech', 'FinTech', 'Clean Energy', 'Logistics', 'E-commerce'
];

const STAGES = ['All', 'seed', 'early', 'growth', 'series-a', 'series-b', 'any'];

const formatCurrency = (amount: number, currency: string) => {
  if (amount >= 1000000) {
    return `${currency} ${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${currency} ${(amount / 1000).toFixed(0)}K`;
  }
  return `${currency} ${amount}`;
};

const formatDeadline = (date: string) => {
  const deadline = new Date(date);
  const today = new Date();
  const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysLeft < 0) return 'Expired';
  if (daysLeft === 0) return 'Today';
  if (daysLeft < 7) return `${daysLeft} days left - URGENT!`;
  if (daysLeft < 30) return `${daysLeft} days left`;
  return `${Math.ceil(daysLeft / 30)} months left`;
};

const getCategoryColor = (category: string) => {
  switch(category) {
    case 'grant': return 'bg-green-100 text-green-800 border-green-200';
    case 'vc': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'trade-finance': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'partnership': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'debt': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getCategoryIcon = (category: string) => {
  switch(category) {
    case 'grant': return '🎁';
    case 'vc': return '📈';
    case 'trade-finance': return '🚢';
    case 'partnership': return '🤝';
    case 'debt': return '🏦';
    default: return '💰';
  }
};

export default function FundingInvestmentPortal() {
  const [opportunities, setOpportunities] = useState<FundingOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSector, setFilterSector] = useState('All');
  const [filterStage, setFilterStage] = useState('All');
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(10000000);
  
  useEffect(() => {
    loadOpportunities();
  }, [currentPage, filterCategory, filterSector, filterStage, minAmount, maxAmount]);
  
  async function loadOpportunities() {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        category: filterCategory,
        sector: filterSector !== 'All' ? filterSector : 'all',
        stage: filterStage !== 'All' ? filterStage : 'all',
        minAmount: minAmount.toString(),
        maxAmount: maxAmount.toString()
      });
      
      const response = await fetch(`/api/funding-investment?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setOpportunities(data.opportunities);
        setTotalPages(data.pagination.pages);
        setTotalItems(data.pagination.total);
      }
    } catch (error) {
      console.error('Error loading opportunities:', error);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            💰 Funding & Investment Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Grants, Equity, Venture Capital, Trade Finance, and Partnerships
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {totalItems} opportunities available
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setFilterCategory(cat.id); setCurrentPage(1); }}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                filterCategory === cat.id
                  ? `bg-${cat.color}-600 text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
        
        {/* Additional Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
              <select
                value={filterSector}
                onChange={(e) => { setFilterSector(e.target.value); setCurrentPage(1); }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {SECTORS.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
              <select
                value={filterStage}
                onChange={(e) => { setFilterStage(e.target.value); setCurrentPage(1); }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {STAGES.map(stage => (
                  <option key={stage} value={stage}>{stage === 'any' ? 'Any Stage' : stage.toUpperCase()}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount Range (USD)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minAmount}
                  onChange={(e) => setMinAmount(Number(e.target.value))}
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(Number(e.target.value))}
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-right">
            <button
              onClick={() => { setCurrentPage(1); loadOpportunities(); }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
            <div key={cat.id} className="bg-white rounded-lg shadow p-3 text-center">
              <div className="text-2xl">{cat.icon}</div>
              <div className="text-sm text-gray-600">{cat.label}</div>
              <div className="text-lg font-bold text-blue-600">
                {opportunities.filter(o => o.category === cat.id).length}
              </div>
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
            <p className="text-gray-600">No opportunities found. Try different filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {opportunities.map((opp) => (
              <div key={opp.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(opp.category)}`}>
                          {getCategoryIcon(opp.category)} {opp.category === 'vc' ? 'Equity/VC' : opp.category === 'trade-finance' ? 'Trade Finance' : opp.category}
                        </span>
                        {opp.stage !== 'any' && (
                          <span className="text-xs text-gray-500">{opp.stage.toUpperCase()}</span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{opp.title}</h3>
                      <p className="text-gray-600 mb-2">{opp.provider}</p>
                      <p className="text-gray-700 line-clamp-2">{opp.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(opp.amount_min, opp.currency)} - {formatCurrency(opp.amount_max, opp.currency)}
                      </div>
                      <div className="text-sm font-medium text-gray-500 mb-1">Deadline</div>
                      <div className={`font-bold ${formatDeadline(opp.deadline).includes('URGENT') ? 'text-red-600' : 'text-orange-600'}`}>
                        {formatDeadline(opp.deadline)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {opp.focus_sectors.slice(0, 3).map(sector => (
                      <span key={sector} className="bg-gray-100 px-2 py-1 rounded text-xs">📁 {sector}</span>
                    ))}
                    {opp.countries.slice(0, 2).map(country => (
                      <span key={country} className="bg-gray-100 px-2 py-1 rounded text-xs">📍 {country}</span>
                    ))}
                    {opp.eligibility && opp.eligibility.length > 0 && (
                      <details className="inline-block">
                        <summary className="text-xs text-blue-600 cursor-pointer">Eligibility</summary>
                        <ul className="absolute bg-white shadow-lg rounded-lg p-2 mt-1 text-xs list-disc list-inside z-10">
                          {opp.eligibility.slice(0, 4).map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                  
                  <a
                    href={opp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
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
            
            <div className="flex space-x-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
        
        <div className="text-center mt-8 text-sm text-gray-500">
          Showing {opportunities.length} of {totalItems} funding opportunities
        </div>
      </div>
    </div>
  );
}
