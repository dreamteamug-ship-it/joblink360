'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AccountsModule() {
  const [invoices, setInvoices] = useState([]);
  const [aiInsights, setAiInsights] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/titanium-erp/accounts')
      .then(res => res.json())
      .then(data => {
        setInvoices(data.invoices || []);
        setAiInsights(data.aiInsights || 'Analyzing financial patterns...');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-amber-500">Loading financial data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-500">Accounts & Finance</h1>
            <p className="text-zinc-500 text-sm mt-1">AI-Powered Financial Intelligence</p>
          </div>
          <Link href="/titanium-erp" className="text-zinc-400 hover:text-amber-500">? Back to Dashboard</Link>
        </div>

        {/* AI Insights Card */}
        <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="text-2xl">??</div>
            <div>
              <h3 className="font-bold text-amber-500 mb-1">Amanda Financial Insights</h3>
              <p className="text-sm text-zinc-300">{aiInsights}</p>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <p className="text-sm text-zinc-400">Total Revenue (MTD)</p>
            <p className="text-2xl font-bold text-amber-500">KES 124,500</p>
            <p className="text-xs text-green-500 mt-2">? 23% vs last month</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <p className="text-sm text-zinc-400">Outstanding Invoices</p>
            <p className="text-2xl font-bold text-amber-500">KES 45,200</p>
            <p className="text-xs text-yellow-500 mt-2">8 invoices pending</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <p className="text-sm text-zinc-400">AI Forecast (Next 30d)</p>
            <p className="text-2xl font-bold text-amber-500">KES 210,000</p>
            <p className="text-xs text-green-500 mt-2">? 68% growth projected</p>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Invoices</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-zinc-800">
                <tr>
                  <th className="pb-2">Invoice #</th>
                  <th className="pb-2">Student</th>
                  <th className="pb-2">Course</th>
                  <th className="pb-2">Amount (KES)</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, i) => (
                  <tr key={i} className="border-b border-zinc-800">
                    <td className="py-3">INV-{inv.id || i+1}</td>
                    <td className="py-3">{inv.student || 'Student ' + (i+1)}</td>
                    <td className="py-3">{inv.course || 'AI Career Track'}</td>
                    <td className="py-3">{inv.amount || 1500}</td>
                    <td className="py-3 text-green-500">{inv.status || 'Paid'}</td>
                    <td className="py-3">{inv.date || '2026-03-20'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-lg text-left transition">
            <div className="text-amber-500 mb-1">?? Generate Financial Report</div>
            <p className="text-xs text-zinc-400">Ask Amanda to create a comprehensive financial report</p>
          </button>
          <button className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-lg text-left transition">
            <div className="text-amber-500 mb-1">?? Forecast Revenue</div>
            <p className="text-xs text-zinc-400">AI-powered revenue predictions for next quarter</p>
          </button>
        </div>
      </div>
    </div>
  );
}
