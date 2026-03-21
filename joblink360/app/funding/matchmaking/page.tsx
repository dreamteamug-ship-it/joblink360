// app/funding/matchmaking/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function FundingMatchmaking() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [commissionSummary, setCommissionSummary] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadMatches();
    loadCommission();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) router.push('/login');
    setUser(user);
    
    const { data: sub } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();
    setSubscription(sub);
  };

  const loadMatches = async () => {
    setLoading(true);
    const response = await fetch('/api/funding/scanner');
    const data = await response.json();
    setMatches(data.opportunities || []);
    setLoading(false);
  };

  const loadCommission = async () => {
    const response = await fetch('/api/commission/summary');
    const data = await response.json();
    setCommissionSummary(data.summary);
  };

  const acceptMatch = async (match: any) => {
    const amountMax = parseInt(match.amount.split('-')[1]?.replace(/[^0-9]/g, '') || '500000');
    const response = await fetch('/api/funding/accept-match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        opportunity_id: match.id,
        funding_amount: amountMax
      })
    });
    
    const result = await response.json();
    if (result.success) {
      alert(`Match accepted! Commission: ${result.commission.breakdown.final}`);
      loadCommission();
    }
  };

  if (loading) return <div className="min-h-screen bg-black text-white p-8">Loading matches...</div>;

  const commissionRate = subscription?.tier === 'enterprise' ? 2 : subscription?.tier === 'premium' ? 2.5 : 3;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-gradient-to-b from-zinc-900 to-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-black text-amber-500 mb-4">Funding Matchmaking</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">{commissionRate}% finder's fee on successful funding matches</p>
          {subscription && (
            <div className="mt-4 inline-block px-4 py-2 bg-amber-500/20 rounded-full">
              <span className="text-amber-500">{subscription.tier.toUpperCase()} Tier | {commissionRate}% Commission</span>
            </div>
          )}
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
          {matches.map((match, idx) => {
            const estimatedCommission = (match.amount_max || 500000) * (commissionRate / 100);
            return (
              <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/50 transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-amber-500 text-sm font-bold">{match.provider}</span>
                      <span className="text-zinc-500 text-sm">{match.country}</span>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">{match.success_rate || 75}% Match</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{match.title}</h3>
                    <p className="text-zinc-400 mb-4">{match.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm mb-4">
                      <span>💰 Up to: {match.amount}</span>
                      <span>📅 Deadline: {new Date(match.deadline).toLocaleDateString()}</span>
                      <span>🎯 Your Commission: {commissionRate}% = KES {Math.round(estimatedCommission).toLocaleString()}</span>
                    </div>
                    <button onClick={() => acceptMatch(match)} className="bg-amber-600 hover:bg-amber-500 px-6 py-2 rounded-lg font-bold transition">Accept Match & Earn Commission</button>
                  </div>
                  <div className="ml-4 text-right"><div className="text-2xl font-bold text-amber-500">{match.success_rate || 75}%</div><div className="text-xs text-zinc-500 mt-1">Match Score</div></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}