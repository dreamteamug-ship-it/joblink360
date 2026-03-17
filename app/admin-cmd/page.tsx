'use client'
import { useState, useEffect } from 'react';

export default function CommandCentre() {
  const [healthStatus, setHealthStatus] = useState("Initializing Sentinel...");
  const [activeAgents, setActiveAgents] = useState(0);

  useEffect(() => {
    // Military-grade health check simulation
    const timer = setTimeout(() => {
      setHealthStatus("SENTINEL: Swarm Integrity 100%. Encryption Active. KES 12M Volume Stable.");
      setActiveAgents(75);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#FFD700] p-8 font-sans" style={{ border: '4px solid #800000' }}>
      <header className="flex justify-between items-center border-b border-[#800000] pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold uppercase tracking-tighter">Titanium Command Centre</h1>
          <p className="text-maroon font-mono text-sm mt-1">CTO ACCESS: SANDE ALLAN // PROJECT EMERALD</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase opacity-60">System Health</p>
          <p className="text-green-500 font-mono font-bold">OPTIMAL</p>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Swarm Heartbeat */}
        <div className="md:col-span-2 bg-[#111] p-6 rounded border border-[#800000] shadow-[0_0_30px_rgba(128,0,0,0.2)]">
          <h2 className="text-xl font-bold mb-4 uppercase">Swarm Heartbeat (75 Units)</h2>
          <div className="grid grid-cols-15 gap-1">
            {[...Array(75)].map((_, i) => (
              <div 
                key={i} 
                className={`h-3 w-3 rounded-full animate-pulse ${i < activeAgents ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-gray-800'}`}
                title={`Agent ${i + 1} Operational`}
              />
            ))}
          </div>
          <p className="mt-4 text-xs font-mono text-gray-500">
            20 Scouts | 30 Guardians | 25 Creators - ALL SYSTEMS NOMINAL
          </p>
        </div>

        {/* Financial Heartbeat */}
        <div className="bg-[#111] p-6 rounded border border-[#FFD700]/30">
          <h2 className="text-xl font-bold mb-4 uppercase">Financial Flow</h2>
          <p className="text-xs text-gray-400">Weekly Business Volume</p>
          <p className="text-3xl font-bold text-white mt-2">KES 12,000,000</p>
          <div className="w-full bg-gray-800 h-2 mt-4 rounded-full overflow-hidden">
            <div className="bg-[#FFD700] h-full w-[85%] animate-pulse" />
          </div>
        </div>
      </main>

      <footer className="mt-8 p-4 bg-maroon/10 border border-maroon/30 rounded">
        <p className="text-sm font-mono text-maroon italic">{healthStatus}</p>
      </footer>
    </div>
  );
}
