// app/titanium-erp/page.tsx
'use client';
import { useState, useEffect } from 'react';

interface Metric {
  title: string;
  value: string;
  change: number;
  icon: string;
}

export default function TitaniumERPage() {
  const [metrics] = useState<Metric[]>([
    { title: "Revenue", value: "KES 0", change: 0, icon: "💰" },
    { title: "Students", value: "0", change: 0, icon: "👥" },
    { title: "Commission", value: "KES 0", change: 0, icon: "💸" },
    { title: "Active Courses", value: "50+", change: 100, icon: "📚" },
  ]);
  
  const modules = [
    { name: "Accounts", icon: "💰", description: "AI-powered financial tracking", insight: "Revenue up 0% this month" },
    { name: "HR", icon: "👥", description: "Talent management", insight: "0 candidates in pipeline" },
    { name: "Sales", icon: "📈", description: "Lead scoring", insight: "Top lead: Pending payment" },
    { name: "Marketing", icon: "📧", description: "Campaign analytics", insight: "Post your payment link!" },
    { name: "Inventory", icon: "📦", description: "Course inventory", insight: "50+ courses available" },
    { name: "Projects", icon: "📋", description: "Task tracking", insight: "Complete your 90-day plan" },
  ];
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-500">Titanium ERP</h1>
            <p className="text-zinc-400 mt-2">Sovereign Business Intelligence with AI Agents</p>
          </div>
          <a href="/pay" className="bg-amber-600 hover:bg-amber-700 px-6 py-2 rounded-lg font-bold transition">
            💰 Pay KES 5,000
          </a>
        </div>
        
        {/* Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {metrics.map(metric => (
            <div key={metric.title} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
              <div className="flex justify-between items-start">
                <span className="text-2xl">{metric.icon}</span>
                <span className={`text-sm ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change > 0 ? `+${metric.change}%` : ''}
                </span>
              </div>
              <p className="text-2xl font-bold mt-2">{metric.value}</p>
              <p className="text-zinc-400 text-sm">{metric.title}</p>
            </div>
          ))}
        </div>
        
        {/* AI Insights */}
        <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🧠</div>
            <div>
              <h3 className="font-bold text-amber-500 mb-1">Amanda AI Insights</h3>
              <p className="text-sm text-zinc-300">Real-time intelligence from your ERP data</p>
              <div className="mt-3 space-y-1">
                <p className="text-xs text-zinc-400">• Share your payment link to start earning</p>
                <p className="text-xs text-zinc-400">• 50+ courses ready for students</p>
                <p className="text-xs text-zinc-400">• Funding opportunities across 26 countries</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modules Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition">
              <div className="text-4xl mb-3">{mod.icon}</div>
              <h3 className="text-xl font-bold mb-2">{mod.name}</h3>
              <p className="text-zinc-400 text-sm mb-3">{mod.description}</p>
              <div className="bg-black/50 rounded-lg p-2 text-xs text-amber-500/80">
                💡 {mod.insight}
              </div>
              <button className="mt-4 w-full bg-zinc-800 hover:bg-amber-600 py-2 rounded-lg text-sm font-bold transition">
                Open {mod.name}
              </button>
            </div>
          ))}
        </div>
        
        {/* Swarm Status */}
        <div className="mt-12 bg-zinc-900/30 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-lg font-bold text-amber-500 mb-4">🤖 AI Swarm Status</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <div className="text-center"><span className="text-green-500">●</span> Alpha (Content)</div>
            <div className="text-center"><span className="text-green-500">●</span> Beta (Jobs)</div>
            <div className="text-center"><span className="text-green-500">●</span> Gamma (Funding)</div>
            <div className="text-center"><span className="text-green-500">●</span> Delta (Marketing)</div>
            <div className="text-center"><span className="text-green-500">●</span> Sigma (Tenders)</div>
            <div className="text-center"><span className="text-green-500">●</span> Atlas (Finance)</div>
          </div>
        </div>
      </div>
    </div>
  );
}