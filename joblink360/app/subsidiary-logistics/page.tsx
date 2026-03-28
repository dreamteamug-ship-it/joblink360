import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./LogisticsMap'), { ssr: false });

export default function LogisticsDashboard() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 font-sans">
      <header className="mb-8 border-b border-zinc-800 pb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Logistics & Weather Intelligence</h1>
          <p className="text-xs text-zinc-500 font-mono mt-1 uppercase">Sovereign Supply Chain | MAM 2026 Rainy Season</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-zinc-900 px-4 py-2 border border-zinc-800">
             <p className="text-[10px] text-zinc-500 uppercase">System Status</p>
             <p className="text-emerald-400 font-mono text-sm">AMANDA ACTIVE</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <Map />
        </div>
        
        <div className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/20 p-4">
            <h3 className="text-red-500 text-xs font-bold uppercase mb-2">Weather Alert: Rift Valley</h3>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              Heavy rainfall advisory (20mm/24hrs) active for Nakuru/Naivasha corridor. 
              Flash flood risk on A104 Highway. Expected delay: +6.5 Hours.
            </p>
          </div>

          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-6">Supply Chain Health</h3>
          <div className="space-y-2">
            <div className="bg-zinc-900 p-3 flex justify-between items-center">
              <span className="text-[10px] uppercase text-zinc-400">Battery Cells (Mombasa)</span>
              <span className="text-[10px] text-emerald-400 font-bold">ON TIME</span>
            </div>
            <div className="bg-zinc-900 p-3 flex justify-between items-center border-l-2 border-amber-500">
              <span className="text-[10px] uppercase text-zinc-400">Chassis Frames (Transit)</span>
              <span className="text-[10px] text-amber-500 font-bold">DELAYED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 0;

