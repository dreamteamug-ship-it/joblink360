// app/tenders/page.tsx
'use client';

export default function TendersPage() {
  const tenders = [
    { id: 1, title: "ICT Infrastructure Development", country: "Kenya", value: "KES 5M - 15M", deadline: "2025-05-30", category: "Technology" },
    { id: 2, title: "Solar Panel Installation", country: "Nigeria", value: "$200,000 - $500,000", deadline: "2025-06-15", category: "Energy" },
    { id: 3, title: "Road Construction", country: "Ghana", value: "GHS 2M - 5M", deadline: "2025-07-20", category: "Infrastructure" },
    { id: 4, title: "Healthcare Equipment Supply", country: "South Africa", value: "ZAR 1M - 3M", deadline: "2025-06-10", category: "Healthcare" },
    { id: 5, title: "Digital Marketing Services", country: "Kenya", value: "KES 500K - 2M", deadline: "2025-05-25", category: "Marketing" },
  ];
  
  const handleBid = (tender: any) => {
    alert(`📋 Bid preparation for ${tender.title}\n\nOur AI will help you craft a winning proposal. Pay KES 5,000 to access our tender toolkit?`);
    if (confirm("Pay KES 5,000 to get expert bidding help?")) {
      window.location.href = "/pay";
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-500">Tender Opportunities</h1>
            <p className="text-zinc-400 mt-2">Government and corporate tenders across Africa</p>
          </div>
          <a href="/pay" className="bg-amber-600 hover:bg-amber-700 px-6 py-2 rounded-lg font-bold transition">
            💰 Pay KES 5,000
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {tenders.map(tender => (
            <div key={tender.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-500 rounded-full">
                  {tender.category}
                </span>
                <span className="text-xs text-zinc-500">{tender.deadline}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{tender.title}</h3>
              <div className="flex justify-between text-sm mb-4">
                <span>🇰🇪 {tender.country}</span>
                <span className="text-amber-500">💰 {tender.value}</span>
              </div>
              <button
                onClick={() => handleBid(tender)}
                className="w-full bg-zinc-800 hover:bg-amber-600 py-2 rounded-lg transition"
              >
                Prepare Bid
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}