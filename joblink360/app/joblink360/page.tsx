'use client';
import { ventures } from '@/lib/projects-data';

export default function JobLinkCore() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 font-sans">
      <header className="mb-12 border-b border-zinc-800 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-emerald-500">JobLink 360</h1>
          <p className="text-xs text-zinc-500 font-mono mt-1 uppercase">Talent Acquisition Subsidiary // Titanium ERP Sync</p>
        </div>
        <div className="bg-emerald-900/20 border border-emerald-500/50 px-4 py-2 rounded-sm text-[10px] uppercase font-bold text-emerald-400">
          Live: 242 Open Positions
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Candidate Pipeline */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">Active Talent Pipeline</h2>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 p-4 hover:border-zinc-700 transition-all flex justify-between items-center">
              <div>
                <p className="text-sm font-bold uppercase">Candidate ID: JL-00{i}</p>
                <p className="text-xs text-zinc-500">Matched to: Naivasha EV Assembly Plant</p>
              </div>
              <button className="text-[10px] uppercase bg-zinc-800 px-3 py-1 hover:bg-emerald-600 transition-colors">Review AI Score</button>
            </div>
          ))}
        </div>

        {/* ERP Stats Sidebar */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 h-fit">
          <h3 className="text-xs font-bold uppercase mb-4">ERP Integration Status</h3>
          <div className="space-y-4 font-mono text-[10px]">
            <div className="flex justify-between"><span>Sync Status:</span> <span className="text-emerald-500">ACTIVE</span></div>
            <div className="flex justify-between"><span>Database:</span> <span>Titanium_ERP_01</span></div>
            <div className="flex justify-between"><span>Subsidiary:</span> <span>JobLink_Talent</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
