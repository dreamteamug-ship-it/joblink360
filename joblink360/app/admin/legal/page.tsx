// app/admin/legal/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function LegalDashboard() {
  const [contracts, setContracts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: contractsData } = await supabase
      .from('legal_contracts')
      .select('*')
      .order('created_at', { ascending: false });
    
    const { data: paymentsData } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });
    
    setContracts(contractsData || []);
    setPayments(paymentsData || []);
    setLoading(false);
  };

  if (loading) return <div className="min-h-screen bg-black text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-500 mb-2">Legal & Compliance Dashboard</h1>
        <p className="text-zinc-400 mb-8">Watertight contracts, tax compliance, and financial tracking across 7+ countries</p>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h3 className="text-zinc-400 text-sm">Active Contracts</h3>
            <p className="text-3xl font-bold text-amber-500">{contracts.filter(c => c.status === 'active').length}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h3 className="text-zinc-400 text-sm">Total Processed</h3>
            <p className="text-3xl font-bold text-amber-500">${payments.reduce((sum, p) => sum + p.gross_amount, 0).toLocaleString()}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h3 className="text-zinc-400 text-sm">Agency Fees Collected</h3>
            <p className="text-3xl font-bold text-amber-500">${payments.reduce((sum, p) => sum + p.agency_fee, 0).toLocaleString()}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h3 className="text-zinc-400 text-sm">Taxes Withheld</h3>
            <p className="text-3xl font-bold text-amber-500">${payments.reduce((sum, p) => sum + p.tax_amount, 0).toLocaleString()}</p>
          </div>
        </div>

        {/* Recent Contracts */}
        <h2 className="text-2xl font-bold mb-4">Recent Contracts</h2>
        <div className="bg-zinc-900 rounded-2xl overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr><th className="p-4 text-left">Contract ID</th><th className="p-4 text-left">Worker</th><th className="p-4 text-left">Country</th><th className="p-4 text-left">Amount</th><th className="p-4 text-left">Status</th></tr>
            </thead>
            <tbody>
              {contracts.slice(0, 10).map(c => (
                <tr key={c.id} className="border-t border-zinc-800">
                  <td className="p-4 font-mono text-sm">{c.contract_id}</td>
                  <td className="p-4">{c.worker_id?.slice(0, 8)}...</td>
                  <td className="p-4">{c.country_code}</td>
                  <td className="p-4">${c.amount?.toLocaleString()}</td>
                  <td className="p-4"><span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Payments */}
        <h2 className="text-2xl font-bold mb-4">Recent Payments</h2>
        <div className="bg-zinc-900 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr><th className="p-4 text-left">Date</th><th className="p-4 text-left">Worker</th><th className="p-4 text-left">Gross</th><th className="p-4 text-left">Agency Fee</th><th className="p-4 text-left">Tax</th><th className="p-4 text-left">Net</th></tr>
            </thead>
            <tbody>
              {payments.slice(0, 10).map(p => (
                <tr key={p.id} className="border-t border-zinc-800">
                  <td className="p-4">{new Date(p.created_at).toLocaleDateString()}</td>
                  <td className="p-4">{p.worker_id?.slice(0, 8)}...</td>
                  <td className="p-4 text-amber-500">${p.gross_amount?.toLocaleString()}</td>
                  <td className="p-4">${p.agency_fee?.toLocaleString()}</td>
                  <td className="p-4">${p.tax_amount?.toLocaleString()}</td>
                  <td className="p-4 text-green-500">${p.net_amount?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}