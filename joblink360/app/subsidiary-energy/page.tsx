'use client';
import { useState, useEffect } from 'react';

export default function EnergyDashboard() {
  const [solarOutput, setSolarOutput] = useState(32);
  const [biogasStatus, setBiogasStatus] = useState('RAMPING UP');
  const [gridDraw, setGridDraw] = useState(12);

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 font-sans">
      <header className="mb-12 border-b border-zinc-800 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-amber-500">Energy Resilience</h1>
          <p className="text-xs text-zinc-500 font-mono mt-1 uppercase">Plant: Naivasha EV // Power Mix Logic</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2">
          <p className="text-[10px] text-amber-500 uppercase font-bold">Weather Warning</p>
          <p className="text-xs text-zinc-300">71% Cloud Cover - Solar Restricted</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-xs font-bold uppercase text-zinc-500">Solar Array PV</h3>
            <span className="text-[10px] font-mono text-amber-500">POOR YIELD</span>
          </div>
          <p className="text-5xl font-black mb-2">{solarOutput}%</p>
          <p className="text-[10px] text-zinc-500 uppercase">Current Irradiance: 340 W/m²</p>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-800">
            <div className="bg-amber-500 h-full transition-all duration-1000" style={{width: `${solarOutput}%`}}></div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 border-t-4 border-t-emerald-500">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-xs font-bold uppercase text-zinc-500">Biogas Cogeneration</h3>
            <span className="text-[10px] font-mono text-emerald-500 underline">{biogasStatus}</span>
          </div>
          <p className="text-5xl font-black mb-2 text-emerald-500">2.4 MW</p>
          <p className="text-[10px] text-zinc-500 uppercase">Feedstock: Maize Stalks / Flower Waste</p>
          <p className="text-[10px] text-emerald-600/70 mt-4 uppercase">Compensating for Solar Deficit</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-xs font-bold uppercase text-zinc-500">KPLC Grid Sync</h3>
            <span className="text-[10px] font-mono text-blue-500 font-bold">BACKUP ONLY</span>
          </div>
          <p className="text-5xl font-black mb-2">{gridDraw} kW</p>
          <p className="text-[10px] text-zinc-500 uppercase">Tariff Rate: $0.12 / kWh</p>
          <button className="mt-6 w-full py-2 bg-zinc-800 text-[10px] font-bold uppercase hover:bg-zinc-700 transition-all">Manual Grid Bypass</button>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';

