// app/swarm/page.tsx
'use client';
import { useState, useEffect } from 'react';

export default function SwarmPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/swarm/status')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAgents(data.agents);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] flex items-center justify-center">
        <div className="text-2xl text-[#C9A84C]">Initializing AI Swarm...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-[#C9A84C] mb-4">Titanium AI Swarm</h1>
        <p className="text-xl mb-8 text-[#F5F5DC]/80">
          {agents.length} Specialized Agents | DeepSeek Powered | Real-time Coordination
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent: any) => (
            <div key={agent.name} className="bg-[#020202] p-6 rounded-lg border border-[#C9A84C]/20 hover:border-[#C9A84C] transition">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-[#C9A84C] capitalize">{agent.name}</h3>
                <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-xs">● Active</span>
              </div>
              <p className="text-sm font-semibold mb-2">{agent.role}</p>
              <div className="flex flex-wrap gap-1">
                {agent.focus.map((f: string, i: number) => (
                  <span key={i} className="inline-block bg-[#C9A84C]/10 text-[#C9A84C] text-xs px-2 py-1 rounded">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
