"use client";
import React from 'react';
import { TITANIUM_CONFIG } from '@/lib/titanium/config';

export default function ExecutiveBriefing() {
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  
  const stats = [
    { label: 'Ecosystem Valuation', value: '$100M', trend: '+2.4%', color: '#D4AF37' },
    { label: 'Swarm Intelligence', value: '312 Agents', trend: 'Optimal', color: '#C0C0C0' },
    { label: 'Automation Rate', value: '92%', trend: 'Eyes-On', color: '#4ADE80' },
    { label: 'Total Revenue', value: '$428k', trend: 'Live Sync', color: '#D4AF37' }
  ];

  return (
    <div className="min-h-screen bg-[#050B14] p-10 text-[#F5F5F5] font-serif">
      <header className="border-b border-[#D4AF37]/30 pb-8 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-[#D4AF37] tracking-[0.4em] uppercase text-sm mb-2">Sovereign Intelligence Report</h2>
          <h1 className="text-5xl font-bold italic">Executive Daily Briefing</h1>
          <p className="text-silver mt-2">Attention: Mr. Allan (CTO / Sovereign)</p>
        </div>
        <div className="text-right">
            <p className="text-3xl font-bold text-[#D4AF37]">{date}</p>
            <p className="text-xs uppercase tracking-widest text-silver">Titanium ERP Sync: Active</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#0A0F1A] border border-[#D4AF37]/20 p-6 rounded-xl shadow-2xl">
            <p className="text-xs uppercase tracking-tighter text-silver mb-2">{s.label}</p>
            <p className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-green-400 mt-2">? {s.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-[#FDF5E6] text-[#050B14] p-8 rounded-2xl shadow-inner border-l-8 border-[#D4AF37]">
          <h3 className="text-2xl font-bold mb-6 uppercase">The 10% Required Effort (To-Do)</h3>
          <ul className="space-y-4 font-semibold">
            <li className="flex items-center gap-3 border-b border-black/10 pb-2">
                <span className="bg-[#D4AF37] text-white p-1 rounded italic text-xs">VETO</span>
                Review UN System Tender #294 (Sovereign Score: 98/100)
            </li>
            <li className="flex items-center gap-3 border-b border-black/10 pb-2">
                <span className="bg-[#D4AF37] text-white p-1 rounded italic text-xs">AUTH</span>
                Authorize M-Pesa Settlement Batch: $12,400 (Altovex)
            </li>
            <li className="flex items-center gap-3 border-b border-black/10 pb-2">
                <span className="bg-[#D4AF37] text-white p-1 rounded italic text-xs">VET</span>
                Meeting with Regional Director: East African Community
            </li>
          </ul>
        </div>

        <div className="bg-[#0A0F1A] border border-white/5 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-[#D4AF37] mb-6 uppercase">Subsidiary Health Swarm</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
                <span>JobLinks Africa (Talent)</span>
                <span className="text-green-400">84 Agents / Ingesting</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span>Altovex Global (Logistics)</span>
                <span className="text-blue-400">52 Agents / Matching</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span>DreamTeQ 360 (Agri)</span>
                <span className="text-[#D4AF37]">48 Agents / Scoring</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center animate-pulse">
            <p className="text-xs text-silver">Amanda-Finance is currently auto-reconciling Odoo ledgers...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
