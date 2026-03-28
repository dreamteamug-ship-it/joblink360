import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./LogisticsMap'), { 
  ssr: false,
  loading: () => <div className="h-[500px] bg-zinc-900 animate-pulse flex items-center justify-center text-zinc-500 font-mono uppercase text-xs">Initializing Global Positioning...</div>
});

export default function LogisticsDashboard() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 font-sans">
      <header className="mb-12 border-b border-zinc-800 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-emerald-500">Logistics Heatmap</h1>
          <p className="text-xs text-zinc-500 font-mono mt-1 uppercase">Corridor: Mombasa -> Naivasha -> Abim</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-zinc-500 uppercase">Active Shipments</p>
          <p className="text-xl font-mono text-blue-400">08</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Map />
        </div>
        
        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Live Manifest</h3>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-zinc-900 border-l-2 border-emerald-500 p-4">
              <p className="text-[10px] font-mono text-zinc-500 mb-1">TRK-00{i}-KE</p>
              <p className="text-xs font-bold uppercase">Consignment: Motors</p>
              <p className="text-[9px] text-zinc-400 mt-2 uppercase">Current Loc: Nakuru Transit</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
