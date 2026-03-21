// app/titanium-erp/page.tsx
export default function TitaniumERPage() {
  const modules = ["Accounts", "HR", "Sales", "Marketing", "Inventory", "Projects"];
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-amber-500 mb-4">Titanium ERP</h1>
        <p className="text-zinc-400 mb-8">Sovereign Business Intelligence with AI Agents</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((module, i) => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-xl font-bold mb-2">{module}</h3>
              <p className="text-zinc-400 text-sm">AI-powered {module.toLowerCase()} management</p>
              <button className="mt-4 w-full bg-zinc-800 hover:bg-amber-600 py-2 rounded-lg transition">Open {module}</button>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 rounded-xl p-6">
          <h3 className="text-lg font-bold text-amber-500 mb-2">🧠 Amanda AI Insights</h3>
          <p className="text-sm text-zinc-300">Real-time intelligence from your ERP data</p>
          <p className="text-xs text-zinc-400 mt-2">• Revenue up 23% this month</p>
          <p className="text-xs text-zinc-400">• 3 candidates match open positions</p>
        </div>
      </div>
    </div>
  );
}