'use client';
import { ventures } from '@/lib/projects-data';

export default function SovereignDashboard() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans p-8">
      <header className="mb-12 flex justify-between items-end border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-light tracking-[0.2em] uppercase">Sovereign Command</h1>
          <p className="text-zinc-500 text-sm mt-2 font-mono">Project Portfolio // 2026.Q1</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-zinc-600 block uppercase tracking-widest">Global Status</span>
          <span className="text-emerald-500 font-mono">SYSTEMS_OPTIMAL</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ventures.map((v) => (
          <div key={v.id} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-sm hover:border-emerald-500/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-medium tracking-tight uppercase">{v.name}</h2>
              <span className={	ext-[10px] uppercase font-bold px-2 py-1 border border-current }>{v.status}</span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Location</p>
                <p className="text-sm font-mono">{v.location}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Key Metrics</p>
                <p className="text-sm">{v.metrics}</p>
              </div>
              <div className="pt-4">
                <div className="w-full bg-zinc-800 h-[2px]">
                  <div className="bg-emerald-500 h-[2px] transition-all duration-1000" style={{ width: \\%\ }}></div>
                </div>
                <p className="text-right text-[10px] text-zinc-600 mt-2 font-mono">{v.progress}% DEPLOYED</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
