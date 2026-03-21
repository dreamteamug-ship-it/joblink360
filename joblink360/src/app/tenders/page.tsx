// app/tenders/page.tsx
export default function TendersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-amber-500 mb-4">Tender Opportunities</h1>
        <p className="text-zinc-400 mb-8">Government and corporate tenders across Africa</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-amber-500 mb-2">Tender #{i}</h3>
              <p className="text-zinc-400 mb-4">ICT Infrastructure Development</p>
              <div className="flex justify-between text-sm">
                <span>🇰🇪 Kenya</span>
                <span>💰 KES 5M - 20M</span>
                <span>📅 June 2025</span>
              </div>
              <button className="mt-4 w-full bg-zinc-800 hover:bg-amber-600 py-2 rounded-lg transition">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}