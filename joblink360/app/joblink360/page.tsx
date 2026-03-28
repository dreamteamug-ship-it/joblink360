'use client';
import { useState } from 'react';

export default function JobLinkCore() {
  const [scoring, setScoring] = useState<string | null>(null);

  const runAIScore = async () => {
    setScoring("Analyzing...");
    const res = await fetch('/api/score-candidate', {
      method: 'POST',
      body: JSON.stringify({ 
        candidateData: "5 years experience in center-pivot irrigation systems, Nairobi based.",
        jobRequirements: "Irrigation Engineer for Abim District rollout." 
      })
    });
    const data = await res.json();
    setScoring(data.analysis);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 font-sans">
      <header className="mb-12 border-b border-zinc-800 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-emerald-500">JobLink 360</h1>
          <p className="text-xs text-zinc-500 font-mono mt-1 uppercase">Talent Subsidiary // AI Scoring Active</p>
        </div>
        <button onClick={runAIScore} className="bg-emerald-600 px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500 transition-all">
          Trigger Global AI Audit
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-6">Candidate Pipeline</h2>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold uppercase">Lead Irrigation Specialist</p>
                <p className="text-xs text-zinc-500 mt-1">Status: Applied via Titanium Portal</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-zinc-500 uppercase">AI Sovereign Score</p>
                <p className="text-xl font-mono text-emerald-500">{scoring || '--'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 p-6">
          <h3 className="text-xs font-bold uppercase mb-4 text-zinc-500">Subsidiary Health</h3>
          <div className="space-y-3 font-mono text-[10px]">
            <div className="flex justify-between border-b border-zinc-800 pb-2"><span>Agri-Talent:</span> <span className="text-emerald-500">92% Match</span></div>
            <div className="flex justify-between border-b border-zinc-800 pb-2"><span>EV-Talent:</span> <span className="text-blue-500">45% Match</span></div>
            <div className="flex justify-between"><span>Logistics:</span> <span className="text-zinc-500">Idle</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';

