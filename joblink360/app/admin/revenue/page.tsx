// app/admin/revenue/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function RevenueDashboard() {
  const [revenue, setRevenue] = useState({ daily: 0, weekly: 0, monthly: 0, target: 10000 });
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenue();
    const interval = setInterval(fetchRevenue, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchRevenue = async () => {
    const response = await fetch('/api/revenue/tracking');
    const data = await response.json();
    setRevenue(data);
    setLoading(false);
  };

  const getProgressColor = (current: number, target: number) => {
    const percent = (current / target) * 100;
    if (percent >= 100) return 'bg-green-500';
    if (percent >= 75) return 'bg-amber-500';
    if (percent >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) return <div className="min-h-screen bg-black text-white p-8">Loading revenue data...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-500 mb-2">Revenue Command Center</h1>
        <p className="text-zinc-400 mb-8">Target: $10,000 USD per day | 26 Countries | 24/7 Tracking</p>

        {/* Daily Revenue Card */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-900 rounded-2xl p-6 border border-amber-500/30">
            <h3 className="text-zinc-400 text-sm mb-2">DAILY REVENUE</h3>
            <div className="text-3xl font-bold text-amber-500">${revenue.daily.toLocaleString()}</div>
            <div className="mt-2 text-sm text-zinc-500">Target: ${revenue.target.toLocaleString()}</div>
            <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className={`h-full ${getProgressColor(revenue.daily, revenue.target)}`} style={{ width: `${(revenue.daily / revenue.target) * 100}%` }}></div>
            </div>
          </div>
          
          <div className="bg-zinc-900 rounded-2xl p-6 border border-amber-500/30">
            <h3 className="text-zinc-400 text-sm mb-2">WEEKLY REVENUE</h3>
            <div className="text-3xl font-bold text-amber-500">${revenue.weekly.toLocaleString()}</div>
            <div className="mt-2 text-sm text-zinc-500">Target: $70,000</div>
          </div>
          
          <div className="bg-zinc-900 rounded-2xl p-6 border border-amber-500/30">
            <h3 className="text-zinc-400 text-sm mb-2">MONTHLY REVENUE</h3>
            <div className="text-3xl font-bold text-amber-500">${revenue.monthly.toLocaleString()}</div>
            <div className="mt-2 text-sm text-zinc-500">Target: $300,000</div>
          </div>
          
          <div className="bg-zinc-900 rounded-2xl p-6 border border-amber-500/30">
            <h3 className="text-zinc-400 text-sm mb-2">CONVERSION RATE</h3>
            <div className="text-3xl font-bold text-amber-500">{(revenue.conversionRate || 3.2)}%</div>
            <div className="mt-2 text-sm text-zinc-500">Goal: 5%</div>
          </div>
        </div>

        {/* Country Performance */}
        <h2 className="text-2xl font-bold mb-4">Country Performance</h2>
        <div className="bg-zinc-900 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="p-4 text-left">Country</th>
                <th className="p-4 text-left">Revenue (USD)</th>
                <th className="p-4 text-left">Conversion</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((c: any) => (
                <tr key={c.code} className="border-t border-zinc-800">
                  <td className="p-4">{c.name}</td>
                  <td className="p-4 text-amber-500">${c.revenue.toLocaleString()}</td>
                  <td className="p-4">{c.conversion}%</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs ${c.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>{c.status}</span></td>
                  <td className="p-4"><button className="text-amber-500 hover:text-amber-400">Boost Campaign →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Live Revenue Feed */}
        <div className="mt-8 bg-black/50 border border-amber-500/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">🎯 Live Revenue Feed</h3>
          <div className="space-y-2 font-mono text-sm">
            <div className="text-green-500">✓ +$245.32 from Kenya - Course Purchase</div>
            <div className="text-green-500">✓ +$189.00 from South Africa - Premium Subscription</div>
            <div className="text-green-500">✓ +$67.50 from Tanzania - Course Bundle</div>
            <div className="text-amber-500 animate-pulse">⚡ +$1,234.00 from Nigeria - Enterprise Plan</div>
          </div>
        </div>
      </div>
    </div>
  );
}