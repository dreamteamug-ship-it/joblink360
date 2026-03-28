'use client';
import { ventures } from '@/lib/projects-data';

export default function SovereignCommand() {
  const date = new Date().toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6 md:p-12 font-sans">
      <header className="mb-16 border-b border-zinc-900 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Sovereign Command</h1>
          <p className="text-xs text-zinc-500 font-mono mt-2 uppercase tracking-widest">{date} // Nairobi, Kenya</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 px-6 py-3 rounded-sm">
          <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1">Amanda AI Core Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <p className="text-xs font-mono text-zinc-300">FULLY OPERATIONAL</p>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-sm">
           <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-6 border-l-2 border-emerald-500 pl-4">Priority Briefing</h2>
           <p className="text-sm leading-relaxed text-zinc-300">
             System status: Green. Abim and Naivasha nodes are currently syncing telemetry. 
             Logistics corridor A104 monitoring active.
           </p>
        </section>
        <section className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-sm">
           <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-6 border-l-2 border-zinc-800 pl-4">Global Health</h2>
           <div className="space-y-4">
             {ventures.map((v) => (
               <div key={v.id} className="flex justify-between items-center border-b border-zinc-800 pb-2">
                 <span className="text-xs uppercase font-bold">{v.name}</span>
                 <span className="text-xs font-mono text-emerald-500">{v.progress}%</span>
               </div>
             ))}
           </div>
        </section>
      </div>
    </div>
  );
}