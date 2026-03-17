// app/international/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InternationalPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/international/opportunities')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOpportunities(data.opportunities);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] flex items-center justify-center">
        <div className="text-2xl text-[#C9A84C]">Loading global opportunities...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-[#C9A84C] mb-4">🌍 International Opportunities</h1>
        <p className="text-xl mb-8 text-[#F5F5DC]/80">
          Global careers for African professionals
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp: any) => (
            <div key={opp.id} className="bg-[#020202] p-6 rounded-lg border border-[#C9A84C]/20">
              <h3 className="text-2xl font-bold text-[#C9A84C] mb-2">{opp.id}</h3>
              <p className="text-sm mb-2">Region: {opp.region}</p>
              <div className="mb-4">
                <p className="text-sm font-semibold">Visa Options:</p>
                <p className="text-sm">{opp.visaTypes.slice(0, 3).join(", ")}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-semibold">Popular Sectors:</p>
                <p className="text-sm">{opp.popularSectors.slice(0, 3).join(", ")}</p>
              </div>
              <p className="text-[#C9A84C] font-bold">{opp.averageSalary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
