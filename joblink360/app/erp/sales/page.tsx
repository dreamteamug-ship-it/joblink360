'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SalesModule() {
  const [deals, setDeals] = useState([
    { id: 1, customer: "Tech Corp", value: 15000, stage: "Negotiation", probability: "60%" }
  ]);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-amber-500">Sales CRM</h1>
          <Link href="/erp" className="text-zinc-400 hover:text-amber-500">? Back to ERP</Link>
        </div>
        
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Active Deals</h2>
          <table className="w-full text-left">
            <thead className="border-b border-zinc-800">
              <tr>
                <th className="pb-2">Deal</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Value (KES)</th>
                <th className="pb-2">Stage</th>
                <th className="pb-2">Probability</th>
              </tr>
            </thead>
            <tbody>
              {deals.map(deal => (
                <tr key={deal.id} className="border-b border-zinc-800">
                  <td className="py-2">{deal.id}</td>
                  <td className="py-2">{deal.customer}</td>
                  <td className="py-2">{deal.value}</td>
                  <td className="py-2">{deal.stage}</td>
                  <td className="py-2">{deal.probability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
