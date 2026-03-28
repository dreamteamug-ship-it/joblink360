'use client';
import { useState, useEffect } from 'react';

export default function SovereignCommand() {
  const [agri, setAgri] = useState<any>(null);
  const [ev, setEv] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/agritech-logic').then(res => res.json()),
      fetch('/api/ev-logic').then(res => res.json())
    ]).then(([agriData, evData]) => {
      setAgri(agriData);
      setEv(evData);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-20 text-zinc-500 font-mono animate-pulse">INITIATING SOVEREIGN_COMMAND...</div>;

  const totalMargin = parseFloat(agri.metrics.potential_margin_percent) + parseFloat(ev.metrics.sovereign_margin_boost);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 p-10 font-sans">
      <header className="mb-12 border-l-4 border-emerald-500 pl-6">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Sovereign Command</h1>
        <p className="text-zinc-500 text-xs tracking-widest uppercase mt-2">DreamTeQ Consulting // Strategic Asset Monitor</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* BIG AGGREGATE STAT */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-between">
          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Total Ecosystem Margin</p>
          <h2 className="text-7xl font-black text-emerald-500">{totalMargin.toFixed(2)}%</h2>
          <p className="text-zinc-600 text-[10px] mt-4 uppercase italic">Optimized via Naivasha-Abim Corridor</p>
        </div>

        {/* LOGISTICS CARD */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6">
          <p className="text-zinc-500 text-[10px] uppercase mb-4 tracking-widest">EV Efficiency</p>
          <div className="text-2xl font-bold">{ev.metrics.ev_efficiency_gain}</div>
          <p className="text-zinc-600 text-[9px] mt-2 leading-tight">Daily Fuel Savings: KSh {ev.metrics.daily_savings_ksh}</p>
        </div>

        {/* LANDED COST CARD */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6">
          <p className="text-zinc-500 text-[10px] uppercase mb-4 tracking-widest">Rice Landed Cost</p>
          <div className="text-2xl font-bold">KSh {agri.metrics.landed_cost}/kg</div>
          <p className="text-zinc-600 text-[9px] mt-2 leading-tight">Current Target: {agri.metrics.market_wholesale} Wholesale</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-950/10 border border-emerald-900/50 p-6">
          <h3 className="text-xs font-bold uppercase text-emerald-500 mb-2">Agritech Intel</h3>
          <p className="text-sm text-zinc-400">{agri.intel}</p>
        </div>
        <div className="bg-blue-950/10 border border-blue-900/50 p-6">
          <h3 className="text-xs font-bold uppercase text-blue-500 mb-2">EV Fleet Intel</h3>
          <p className="text-sm text-zinc-400">{ev.intel}</p>
        </div>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
