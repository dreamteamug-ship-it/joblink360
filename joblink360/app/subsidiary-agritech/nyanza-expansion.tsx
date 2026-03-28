'use client';

export default function NyanzaExpansion() {
  const roadmap = [
    { phase: 'Phase 1', task: 'Soil/Striga Mapping', status: 'READY', tool: 'Digital Den Drones' },
    { phase: 'Phase 2', task: 'Solar Pump Install', status: 'PLANNING', tool: 'Naivasha Energy' },
    { phase: 'Phase 3', task: 'Rice SRI Rollout', status: 'PENDING', tool: 'Abim Logic' }
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm mt-10">
      <h2 className="text-sm font-black uppercase tracking-widest text-blue-500 mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
        Expansion: Nyanza Lake Basin
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-black/50 p-4 border border-zinc-800">
           <p className="text-[10px] text-zinc-500 uppercase">Target Market</p>
           <p className="text-xl font-bold">Rice Deficit</p>
           <p className="text-[10px] text-blue-400 mt-1">Gap: 700k MT/Year</p>
        </div>
        <div className="bg-black/50 p-4 border border-zinc-800">
           <p className="text-[10px] text-zinc-500 uppercase">Current Retail (Kisumu)</p>
           <p className="text-xl font-bold">KSh 175/kg</p>
           <p className="text-[10px] text-emerald-400 mt-1">Margin: >60%</p>
        </div>
        <div className="bg-black/50 p-4 border border-zinc-800">
           <p className="text-[10px] text-zinc-500 uppercase">Logistics Hub</p>
           <p className="text-xl font-bold">Katito / Ahero</p>
           <p className="text-[10px] text-amber-500 mt-1">Route: A104 Corridor</p>
        </div>
      </div>

      <div className="space-y-2">
        {roadmap.map((item) => (
          <div key={item.phase} className="flex justify-between items-center p-3 border-b border-zinc-800 text-[11px] font-mono">
            <span className="text-zinc-500">{item.phase}</span>
            <span className="text-white font-bold">{item.task}</span>
            <span className="text-zinc-600 italic">{item.tool}</span>
            <span className="bg-zinc-800 px-2 py-0.5 text-[9px] text-blue-400 uppercase">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
