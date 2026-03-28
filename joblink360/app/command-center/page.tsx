'use client';
import { useState, useEffect } from 'react';

export default function SovereignCommand() {
  const [agri, setAgri] = useState<any>(null);
  const [ev, setEv] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/agritech-logic').then(r => r.json()),
      fetch('/api/ev-logic').then(r => r.json())
    ]).then(([agriData, evData]) => {
      setAgri(agriData);
      setEv(evData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500">Loading Sovereign Command...</div>;

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 font-sans">
      <header className="mb-12 border-l-4 border-emerald-500 pl-6">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Sovereign Command</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900 p-8 border border-zinc-800 rounded">
          <p className="text-xs uppercase tracking-widest text-zinc-500">Total Margin</p>
          <p className="text-6xl font-black text-emerald-500">
            {(parseFloat(agri?.metrics?.potential_margin_percent || 0) + 
              parseFloat(ev?.metrics?.sovereign_margin_boost || 0)).toFixed(1)}%
          </p>
        </div>

        <div className="bg-zinc-900 p-6 border border-zinc-800 rounded">
          <p className="text-xs text-zinc-500">EV Savings</p>
          <p className="text-2xl font-bold">KSh {ev?.metrics?.daily_savings_ksh || '—'}</p>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
