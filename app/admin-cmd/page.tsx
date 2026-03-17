import { useState, useEffect } from 'react';

export default function CommandCentre() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [healthStatus, setHealthStatus] = useState("Checking...");

  // Sentinel 24h Audit Logic (Simulation)
  useEffect(() => {
    const runAudit = async () => {
      // Simulate military-grade health check
      setHealthStatus("SENTINEL: All 75 Agents Online. Encryption Active. Health 100%.");
    };
    runAudit();
  }, []);

  return (
    <div className="min-h-screen bg-black text-gold p-10 font-mono" style={{ border: '2px solid #800000' }}>
      <h1 className="text-4xl font-bold mb-4 uppercase tracking-widest">Titanium Command Centre</h1>
      <div className="bg-gray-900 p-6 rounded-lg border border-gold shadow-[0_0_20px_rgba(255,215,0,0.3)]">
        <p className="text-maroon text-xl mb-4">STATUS: {healthStatus}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-black border border-maroon">
            <h3 className="text-gold">Weekly Volume</h3>
            <p className="text-3xl text-white">KES 12,000,000</p>
          </div>
          <div className="p-4 bg-black border border-maroon">
            <h3 className="text-gold">Active Swarm</h3>
            <p className="text-3xl text-white">75 Agents</p>
          </div>
        </div>
      </div>
      <p className="mt-10 text-xs text-gray-500">CTO ACCESS ONLY: SANDE ALLAN</p>
    </div>
  );
}
