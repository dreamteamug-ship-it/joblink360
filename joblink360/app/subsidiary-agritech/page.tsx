'use client';
import { useState } from 'react';
import { ventures } from '@/lib/projects-data';

export default function AgritechForecaster() {
  const [cropType, setCropType] = useState('Maize');

  const yieldData = {
    Maize: { yield: '4.2 Tons/Ha', roi: '185%', risk: 'Low' },
    Soybeans: { yield: '2.1 Tons/Ha', roi: '142%', risk: 'Moderate' },
    Sunflower: { yield: '1.8 Tons/Ha', roi: '120%', risk: 'Low' }
  };

  const activeStats = yieldData[cropType as keyof typeof yieldData];

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 font-sans">
      <header className="mb-12 border-b border-zinc-800 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-emerald-500">Abim Agritech Hub</h1>
          <p className="text-xs text-zinc-500 font-mono mt-1 uppercase">Region: Western Uganda // Yield Forecasting</p>
        </div>
        <div className="flex gap-2">
          {Object.keys(yieldData).map((crop) => (
            <button
              key={crop}
              onClick={() => setCropType(crop)}
              className={`px-4 py-1 text-[10px] font-bold uppercase border transition-all ${
                cropType === crop 
                  ? 'bg-emerald-600 border-emerald-500 text-white' 
                  : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-center items-center text-center">
          <h3 className="text-[10px] font-mono text-zinc-500 uppercase mb-4 tracking-[0.2em]">Projected Yield (H1 2026)</h3>
          <p className="text-6xl font-black text-white tracking-tighter mb-2">{activeStats.yield}</p>
          <p className="text-xs text-emerald-500 uppercase font-bold tracking-widest">Precision Irrigated</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8">
          <h3 className="text-[10px] font-mono text-zinc-500 uppercase mb-6 tracking-[0.2em]">Financial ROI Analysis</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Direct Return on Input</p>
              <p className="text-3xl font-black text-white">{activeStats.roi}</p>
            </div>
            <div className="w-full bg-zinc-800 h-1">
              <div className="bg-emerald-500 h-full" style={{ width: activeStats.roi }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-zinc-500 uppercase">Risk Assessment</span>
              <span className={`text-[10px] font-bold uppercase ${activeStats.risk === 'Low' ? 'text-emerald-500' : 'text-amber-500'}`}>
                {activeStats.risk}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 border-l-4 border-l-emerald-500">
          <h3 className="text-[10px] font-mono text-zinc-500 uppercase mb-6 tracking-[0.2em]">Drone / NDVI Insight</h3>
          <div className="aspect-square bg-zinc-950 border border-zinc-800 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-emerald-500 via-green-800 to-amber-900 animate-pulse"></div>
            <p className="z-10 text-[9px] font-mono text-zinc-400 uppercase text-center px-4 leading-relaxed">
              Vegetation Health: 0.82 (Excellent)<br/>
              Nitrogen Saturation: Optimal<br/>
              Moisture: Field Capacity Met
            </p>
          </div>
          <p className="text-[9px] text-zinc-600 mt-4 italic">Updated via Digital Den Drone Wing // Abim Sector 4</p>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';

