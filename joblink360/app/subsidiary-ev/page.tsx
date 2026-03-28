'use client';
import { useState } from 'react';

export default function EVPlantTracker() {
  const [lineStatus, setLineStatus] = useState('OPERATIONAL');
  
  const assets = [
    { id: 'AST-NV-001', name: 'Lithium Battery Station', status: 'Active', health: 98 },
    { id: 'AST-NV-002', name: 'Chassis Welding Robot', status: 'Maintenance', health: 65 },
    { id: 'AST-NV-003', name: 'Final Assembly Conveyor', status: 'Active', health: 92 }
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 font-sans">
      <header className="mb-12 border-b border-zinc-800 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-blue-500">Naivasha EV Plant</h1>
          <p className="text-xs text-zinc-500 font-mono mt-1 uppercase">Subsidiary: DreamTeQ Mobility // Asset Tracking</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] text-zinc-500 uppercase">Line Throughput</p>
            <p className="text-xl font-mono">14 Units/Day</p>
          </div>
          <div className="w-px h-10 bg-zinc-800"></div>
          <div className="text-right">
            <p className="text-[10px] text-zinc-500 uppercase">System Status</p>
            <p className={	ext-xl font-mono }>{lineStatus}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Asset Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {assets.map((asset) => (
            <div key={asset.id} className="bg-zinc-900 border border-zinc-800 p-6 hover:border-blue-500/50 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono text-zinc-500">{asset.id}</span>
                <span className={	ext-[9px] px-2 py-0.5 rounded-full uppercase font-bold }>
                  {asset.status}
                </span>
              </div>
              <h3 className="text-sm font-bold uppercase mb-2">{asset.name}</h3>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={h-full } 
                  style={{ width: \\%\ }}
                ></div>
              </div>
              <p className="text-[10px] text-zinc-500 mt-2 italic text-right">Health: {asset.health}%</p>
            </div>
          ))}
        </div>

        {/* Component Inventory (The "Parts" Tracker) */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 border-l-4 border-l-blue-500">
          <h3 className="text-xs font-bold uppercase mb-6 tracking-widest">Inventory (ERP Sync)</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-[10px] uppercase mb-1">
                <span>Motor Controllers (72V)</span>
                <span className="text-blue-400">42 In Stock</span>
              </div>
              <div className="w-full bg-zinc-800 h-1"></div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] uppercase mb-1">
                <span>LFP Battery Cells</span>
                <span className="text-emerald-400">1,240 In Stock</span>
              </div>
              <div className="w-full bg-zinc-800 h-1"></div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] uppercase mb-1 text-red-400">
                <span>TukTuk Differential Gears</span>
                <span>LOW: 4 Units</span>
              </div>
              <div className="w-full bg-zinc-800 h-1"></div>
            </div>
          </div>
          <button className="w-full mt-8 py-2 border border-zinc-700 text-[10px] uppercase font-bold hover:bg-zinc-800 transition-colors">
            Generate Purchase Request
          </button>
        </div>
      </div>
    </div>
  );
}
