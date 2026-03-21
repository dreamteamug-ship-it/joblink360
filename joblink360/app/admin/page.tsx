// app/admin/page.tsx
'use client';
import { useState, useEffect } from 'react';

interface Payment {
  id: number;
  transaction_id: string;
  amount: number;
  status: string;
  timestamp: string;
}

export default function AdminPage() {
  const [payments, setPayments] = useState<Payment[]>([
    { id: 1, transaction_id: "MPESA001", amount: 5000, status: "pending", timestamp: new Date().toISOString() }
  ]);
  
  const handleVerify = (id: number) => {
    setPayments(payments.map(p => 
      p.id === id ? { ...p, status: "verified" } : p
    ));
    alert("✅ Payment verified! Student access granted.");
  };
  
  const pendingCount = payments.filter(p => p.status === "pending").length;
  const totalRevenue = payments.filter(p => p.status === "verified").reduce((sum, p) => sum + p.amount, 0);
  const yourCommission = totalRevenue * 0.03 * 0.7;
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-500">Admin Dashboard</h1>
            <p className="text-zinc-400 mt-2">Settlement Command Center</p>
          </div>
          <a href="/pay" className="bg-amber-600 hover:bg-amber-700 px-6 py-2 rounded-lg font-bold transition">
            💰 Payment Page
          </a>
        </div>
        
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-400 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold text-green-500">KES {totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-400 text-sm">Pending Verification</p>
            <p className="text-2xl font-bold text-yellow-500">{pendingCount}</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-400 text-sm">Total Students</p>
            <p className="text-2xl font-bold text-white">{payments.filter(p => p.status === "verified").length}</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-400 text-sm">Your Commission</p>
            <p className="text-2xl font-bold text-amber-500">KES {yourCommission.toLocaleString()}</p>
          </div>
        </div>
        
        {/* Verification Queue */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-amber-500 mb-4">📋 Verification Queue</h3>
          {pendingCount === 0 ? (
            <p className="text-zinc-400 text-center py-8">All payments verified! 🎉</p>
          ) : (
            <div className="space-y-3">
              {payments.filter(p => p.status === "pending").map(payment => (
                <div key={payment.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-mono text-sm">{payment.transaction_id}</p>
                    <p className="text-amber-500 font-bold">KES {payment.amount.toLocaleString()}</p>
                    <p className="text-xs text-zinc-500">{new Date(payment.timestamp).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => handleVerify(payment.id)}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Verify Payment
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <a href="/api/reconcile" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center hover:border-amber-500/50 transition">
            <div className="text-2xl mb-2">⚡</div>
            <p className="font-bold">Vulture-Eye Status</p>
            <p className="text-xs text-zinc-500">Check verification API</p>
          </a>
          <a href="/api/ai/amanda" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center hover:border-amber-500/50 transition">
            <div className="text-2xl mb-2">🧠</div>
            <p className="font-bold">Amanda AI</p>
            <p className="text-xs text-zinc-500">Talk to your mentor</p>
          </a>
          <a href="/pay" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center hover:border-amber-500/50 transition">
            <div className="text-2xl mb-2">💰</div>
            <p className="font-bold">Payment Page</p>
            <p className="text-xs text-zinc-500">Share this link</p>
          </a>
        </div>
      </div>
    </div>
  );
}