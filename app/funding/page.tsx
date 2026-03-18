'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/app/components/layout/Navbar';

export default function FundingPage() {
  const [funding, setFunding] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFunding();
  }, []);

  const fetchFunding = async () => {
    try {
      const res = await fetch('/api/funding');
      const data = await res.json();
      setFunding(data.funding || []);
    } catch (error) {
      console.error('Failed to fetch funding:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Funding Opportunities</h1>
        
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funding.map((item: any) => (
              <div key={item.id} className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">{item.name}</h3>
                <p className="text-gray-300 mb-2">{item.provider}</p>
                <p className="text-2xl font-bold text-green-400 mb-2">{item.amount}</p>
                <p className="text-sm text-gray-400">{item.type} • {item.interest}</p>
                <p className="text-xs text-gray-500 mt-2">Match: {item.match}% • Deadline: {item.deadline}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
