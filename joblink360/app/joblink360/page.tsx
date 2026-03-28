'use client';

export default function JobLinksAfrica() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-b border-emerald-500 pb-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-emerald-500 text-sm font-bold tracking-widest">DELITE PRODUCTIONS</span>
              <h1 className="text-4xl font-black tracking-tighter">JobLinks Africa</h1>
              <p className="text-zinc-500">Talent Acquisition • AI Scoring • Sovereign Workforce Platform</p>
            </div>
            <div className="text-right">
              <span className="text-emerald-400 text-sm">9th Company under DreamTeam Consulting</span>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-900 border border-emerald-500/30 p-8 rounded-3xl">
            <h3 className="text-xl font-semibold mb-6">Live Talent Pipeline</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-zinc-800 rounded-2xl">
                <div>
                  <p className="font-medium">Irrigation Engineer – Abim Rollout</p>
                  <p className="text-xs text-emerald-400">AI Score: 94%</p>
                </div>
                <button className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm">Review</button>
              </div>
              <div className="flex justify-between items-center p-4 bg-zinc-800 rounded-2xl">
                <div>
                  <p className="font-medium">EV Assembly Technician – Naivasha</p>
                  <p className="text-xs text-emerald-400">AI Score: 87%</p>
                </div>
                <button className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm">Review</button>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 p-8 rounded-3xl">
            <h3 className="text-xl font-semibold mb-4">Delite Productions Mandate</h3>
            <p className="text-zinc-400 leading-relaxed">
              As the official talent arm of DreamTeam Consulting, JobLinks Africa sources, vets, and deploys high-caliber professionals across all 9 sovereign subsidiaries.
            </p>
            <div className="mt-8 text-xs uppercase tracking-widest text-emerald-400">
              Currently powering recruitment for:<br/>
              Naivasha EV • Abim Agritech • Altovex Logistics • Digital Den
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
