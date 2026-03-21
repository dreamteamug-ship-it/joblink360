// src/app/admin/settlements/page.tsx
// Admin Dashboard - Settlement & Payment Monitoring

'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { format } from 'date-fns';

export default function AdminSettlementsPage() {
  const [verificationQueue, setVerificationQueue] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      // Load verification queue
      const { data: queue } = await supabase
        .from('verification_queue')
        .select('*, payments:payment_id (*)')
        .in('status', ['pending', 'escalated'])
        .order('created_at', { ascending: false });
      
      if (queue) setVerificationQueue(queue);

      // Load settlements
      const { data: ledger } = await supabase
        .from('settlement_ledger')
        .select('*')
        .order('settlement_date', { ascending: false })
        .limit(30);
      
      if (ledger) setSettlements(ledger);

      // Load stats
      const { data: statsData } = await supabase.rpc('get_settlement_stats');
      if (statsData) setStats(statsData);

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (verificationId, paymentId, action) => {
    const { error } = await supabase.rpc('verify_manual_payment', {
      p_verification_id: verificationId,
      p_payment_id: paymentId,
      p_action: action
    });
    
    if (!error) {
      await loadAllData();
    } else {
      alert('Verification failed: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-amber-500">Loading settlement data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-500">Settlement Command Center</h1>
          <p className="text-zinc-500 mt-2">Manual verification | Settlement ledger | Real-time monitoring</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
              <p className="text-zinc-500 text-sm">Today's Settlements</p>
              <p className="text-2xl font-bold text-amber-500">
                KSh {stats.today_total?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
              <p className="text-zinc-500 text-sm">Pending Verification</p>
              <p className="text-2xl font-bold text-yellow-500">
                {stats.pending_verification || 0}
              </p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
              <p className="text-zinc-500 text-sm">Completed Today</p>
              <p className="text-2xl font-bold text-green-500">
                {stats.completed_today || 0}
              </p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
              <p className="text-zinc-500 text-sm">Weekly Growth</p>
              <p className={`text-2xl font-bold ${stats.weekly_growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stats.weekly_growth?.toFixed(1)}%
              </p>
            </div>
          </div>
        )}

        {/* Verification Queue */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">📋 Verification Queue</h2>
          {verificationQueue.length === 0 ? (
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-8 text-center">
              <p className="text-green-500">✓ All payments verified!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {verificationQueue.map((item) => (
                <div key={item.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-mono text-xs text-zinc-500">{item.payments.transaction_id}</p>
                      <p className="text-lg font-bold mt-1">
                        {item.payments.currency} {item.payments.amount?.toLocaleString()}
                      </p>
                      <p className="text-sm mt-1">
                        {item.sender_name} | {item.sender_phone}
                      </p>
                      {item.mpesa_confirmation_code && (
                        <p className="text-xs text-zinc-500 mt-1">Code: {item.mpesa_confirmation_code}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => verifyPayment(item.id, item.payment_id, 'verify')}
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-medium"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => verifyPayment(item.id, item.payment_id, 'reject')}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Settlement Ledger */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">📊 Settlement Ledger</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-zinc-800">
                <tr className="text-left text-zinc-500 text-sm">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Currency</th>
                  <th className="pb-3">Total Payments</th>
                  <th className="pb-3">Fees (30%)</th>
                  <th className="pb-3">Net Settlement</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {settlements.map((item) => (
                  <tr key={item.id} className="border-b border-zinc-800/50">
                    <td className="py-3">{format(new Date(item.settlement_date), 'MMM d, yyyy')}</td>
                    <td className="py-3 font-bold">{item.currency}</td>
                    <td className="py-3">{item.total_payments?.toLocaleString()}</td>
                    <td className="py-3 text-red-400">{item.total_fees?.toLocaleString()}</td>
                    <td className="py-3 text-green-400 font-bold">{item.total_settled?.toLocaleString()}</td>
                    <td className="py-3">
                      {item.reconciled_at ? (
                        <span className="text-green-500 text-sm">✓ Reconciled</span>
                      ) : (
                        <span className="text-yellow-500 text-sm">⏳ Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}