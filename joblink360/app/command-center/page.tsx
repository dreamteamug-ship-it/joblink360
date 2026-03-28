'use client';
import { ventures } from '@/lib/projects-data';

export default function SovereignCommand() {
  const date = new Date().toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6 md:p-12 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Header */}
      <header className="mb-16 border-b border-zinc-900 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Sovereign Command</h1>
          <p className="text-xs text-zinc-500 font-mono mt-2 uppercase tracking-widest">{date} // Nairobi, Kenya</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 px-6 py-3 rounded-sm">
          <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1">Amanda AI Core Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <p className="text-xs font-mono text-zinc-300">FULLY OPERATIONAL // ALL SUBSIDIARIES SYNCED</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* The "Ruthless" AI Briefing */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-6 border-l-2 border-emerald-500 pl-4">Priority CEO Briefing</h2>
            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-sm backdrop-blur-sm">
              <p className="text-sm leading-relaxed text-zinc-300 mb-6">
                Good evening, Sande. <b className="text-white underline decoration-emerald-500">Naivasha</b> is your primary bottleneck today. Rift Valley thunderstorms have dropped solar yield to 32%, forcing a Biogas ramp-up. <b className="text-white underline decoration-emerald-500">Abim</b> is showing a record 0.82 NDVI health, but logistics delays on the A104 are threatening the fertilizer arrival window.
              </p>
              <div className="grid grid-cols-2 gap-4 text-[10px] uppercase font-bold">
                <div className="p-3 bg-zinc-950 border border-zinc-800 text-amber-500">Action Required: Naivasha Energy Log</div>
                <div className="p-3 bg-zinc-950 border border-zinc-800 text-emerald-500">Stable: Abim Yield Forecast</div>
              </div>
            </div>
          </section>

          {/* Subsidiary Rapid Glance */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-6 border-l-2 border-zinc-800 pl-4">Global Subsidiary Health</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {ventures.map((v) => (
                 <div key={v.id} className="bg-zinc-900 p-4 border border-zinc-800 hover:border-zinc-700 transition-all">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-[9px] font-mono text-zinc-500 uppercase">{v.id}</span>
                     <span className="text-[9px] font-bold text-emerald-500">{v.progress}%</span>
                   </div>
                   <h3 className="text-xs font-bold uppercase tracking-tighter">{v.name}</h3>
                   <div className="w-full bg-zinc-950 h-1 mt-3">
                     <div className="bg-emerald-500 h-full" style={{ width: \\%\ }}></div>
                   </div>
                 </div>
               ))}
            </div>
          </section>
        </div>

        {/* Real-Time KPIs & Risk (Right Rail) */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-zinc-900 border border-zinc-800 p-8 h-full">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-8 text-center">Titanium ERP Live Feed</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase mb-1">Projected ROI (Abim)</p>
                  <p className="text-2xl font-black text-white">185%</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-emerald-500 uppercase font-bold">Yield: 4.2 T/Ha</p>
                </div>
              </div>

              <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase mb-1">EV Assembly Throughput</p>
                  <p className="text-2xl font-black text-white text-amber-500">11/14</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-amber-500 uppercase font-bold">Impact: Weather Delay</p>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase mb-1">JobLink Candidate Score</p>
                  <p className="text-2xl font-black text-white">92.4%</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-zinc-500 uppercase">Lead: Irrigation Eng.</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
               <button className="w-full py-4 bg-emerald-600 text-black text-xs font-black uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all rounded-sm shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                 Initialize Global Audit
               </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
