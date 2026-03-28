'use client';
import { useState, useEffect } from 'react';

export default function AgritechHub() {
  const [logic, setLogic] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/agritech-logic')
      .then(res => res.json())
      .then(data => {
        setLogic(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 font-sans">
      <header className="mb-12 border-b border-zinc-800 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-emerald-500">Abim Agritech Hub</h1>
          <p className="text-[10px] text-zinc-500 font-mono mt-1">LOGIC ENGINE: ACTIVE // CROSS-BORDER CORRIDOR</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-zinc-500 uppercase">Regional Focus</p>
          <p className="text-sm font-bold">Nyanza Lake Basin (2026)</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-zinc-900/50 p-6 border border-zinc-800">
          <p className="text-[10px] text-zinc-500 uppercase">Target Market</p>
          <p className="text-xl font-bold text-white">Rice Deficit (KE)</p>
          <p className="text-[9px] text-zinc-600 mt-2 italic">
            Landed Cost: {loading ? '...' : 'KSh ' + (logic?.metrics?.landed_cost || '—') + '/kg'}
          </p>
        </div>

        <div className="bg-emerald-950/20 p-6 border border-emerald-500/30">
          <p className="text-[10px] text-emerald-500 uppercase font-bold">Projected Margin</p>
          <p className="text-3xl font-black text-white">
            {loading ? '...' : logic?.metrics?.potential_margin_percent || '—'}
          </p>
        </div>

        <div className="bg-zinc-900/50 p-6 border border-zinc-800">
          <p className="text-[10px] text-zinc-500 uppercase">Logistics Hub</p>
          <p className="text-xl font-bold text-white">Katito / Ahero</p>
        </div>
      </div>

      <section className="bg-zinc-900/20 border border-zinc-800 p-8 rounded-sm">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-6">Market Intelligence Brief</h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          {logic?.summary || 'Loading corridor analysis...'}: The price arbitrage between Abim production and Nyanza retail remains stable.
        </p>
      </section>
    </div>
  );
}

export const dynamic = 'force-dynamic';
