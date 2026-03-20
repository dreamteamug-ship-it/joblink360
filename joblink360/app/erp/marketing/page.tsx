'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function MarketingModule() {
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: "March 2026 Launch", status: "Active", reach: 1247, conversions: 0 }
  ]);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-amber-500">Marketing</h1>
          <Link href="/erp" className="text-zinc-400 hover:text-amber-500">? Back to ERP</Link>
        </div>
        
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Campaigns</h2>
          <table className="w-full text-left">
            <thead className="border-b border-zinc-800">
              <tr>
                <th className="pb-2">Campaign</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Reach</th>
                <th className="pb-2">Conversions</th>
                <th className="pb-2">Conversion Rate</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(c => (
                <tr key={c.id} className="border-b border-zinc-800">
                  <td className="py-2">{c.name}</td>
                  <td className="py-2 text-green-500">{c.status}</td>
                  <td className="py-2">{c.reach}</td>
                  <td className="py-2">{c.conversions}</td>
                  <td className="py-2">0%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
