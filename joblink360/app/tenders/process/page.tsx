'use client';
// app/tenders/process/page.tsx
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function TenderProcessing() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [commissionSummary, setCommissionSummary] = useState(null);
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadTenders();
    loadCommission();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) router.push('/login');
    setUser(user);
    const { data: sub } = await supabase.from('user_subscriptions').select('*').eq('user_id', user.id).eq('status', 'active').single();
    setSubscription(sub);
  };

  const loadTenders = async () => {
    const response = await fetch('/api/tenders/scanner');
    const data = await response.json();
    setTenders(data.tenders || []);
    setLoading(false);
  };

  const loadCommission = async () => {
    const response = await fetch('/api/commission/summary');
    const data = await response.json();
    setCommissionSummary(data.summary);
  };

  const closeTender = async (tender: any) => {
    const tenderValue = parseInt(tender.budget.split('-')[1]?.replace(/[^0-9]/g, '') || '500000');
    const response = await fetch('/api/tenders/close', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tender_id: tender.id, tender_value: tenderValue })
    });
    const result = await response.json();
    if (result.success) { alert(`Tender closed! Commission earned: ${result.commission.breakdown.final}`); loadCommission(); }
  };

  if (loading) return <div className="min-h-screen bg-black text-white p-8">Loading...</div>;

  const commissionRate = subscription?.tier === 'enterprise' ? 2 : subscription?.tier === 'premium' ? 2.5 : 3;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-gradient-to-b from-zinc-900 to-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-black text-amber-500 mb-4">Tender Processing</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">{commissionRate}% closure fee on successful tender wins</p>
          {subscription && <div className="mt-4 inline-block px-4 py-2 bg-amber-500/20 rounded-full"><span className="text-amber-500">{subscription.tier.toUpperCase()} Tier | {commissionRate}% Commission</span></div>}
        </div>
      </div>

      {commissionSummary && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-amber-500 mb-4">Your Earnings</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-zinc-800/50 rounded-lg p-4 text-center"><p className="text-sm text-zinc-400">Pending</p><p className="text-2xl font-bold text-yellow-500">KES {commissionSummary.total_pending.toLocaleString()}</p></div>
              <div className="bg-zinc-800/50 rounded-lg p-4 text-center"><p className="text-sm text-zinc-400">Paid</p><p className="text-2xl font-bold text-green-500">KES {commissionSummary.total_paid.toLocaleString()}</p></div>
              <div className="bg-zinc-800/50 rounded-lg p-4 text-center"><p className="text-sm text-zinc-400">Total</p><p className="text-2xl font-bold text-amber-500">KES {commissionSummary.total_earned.toLocaleString()}</p></div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {tenders.map((tender, idx) => {
            const tenderValue = parseInt(tender.budget.split('-')[1]?.replace(/[^0-9]/g, '') || '500000');
            const estimatedCommission = tenderValue * (commissionRate / 100);
            return (
              <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/50 transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-amber-500 text-sm font-bold">{tender.organization}</span>
                      <span className="text-zinc-500 text-sm">{tender.country}</span>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">{tender.success_rate || 70}% Success Rate</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{tender.title}</h3>
                    <p className="text-zinc-400 mb-4">{tender.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm mb-4">
                      <span>ðŸ’° Budget: {tender.budget}</span>
                      <span>ðŸ“… Deadline: {new Date(tender.deadline).toLocaleDateString()}</span>
                      <span>ðŸ“ {tender.location}</span>
                      <span>ðŸŽ¯ Your Commission: {commissionRate}% = KES {Math.round(estimatedCommission).toLocaleString()}</span>
                    </div>
                    <button onClick={() => closeTender(tender)} className="bg-amber-600 hover:bg-amber-500 px-6 py-2 rounded-lg font-bold transition">Close Tender & Earn Commission</button>
                  </div>
                  <div className="ml-4 text-right"><div className="text-2xl font-bold text-amber-500">{tender.success_rate || 70}%</div><div className="text-xs text-zinc-500 mt-1">Success Rate</div></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

