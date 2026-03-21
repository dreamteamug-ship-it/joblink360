// app/funding/page.tsx
'use client';
import { useState } from 'react';

interface Opportunity {
  id: number;
  donor: string;
  title: string;
  amount: string;
  currency: string;
  country: string;
  deadline: string;
  probability: number;
  category: string;
}

export default function FundingPage() {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const opportunities: Opportunity[] = [
    { id: 1, donor: "World Bank", title: "Digital Transformation Grant", amount: "500,000", currency: "USD", country: "Kenya", deadline: "2025-06-30", probability: 85, category: "Technology" },
    { id: 2, donor: "African Development Bank", title: "Youth Employment Program", amount: "250,000", currency: "USD", country: "Kenya", deadline: "2025-07-15", probability: 78, category: "Employment" },
    { id: 3, donor: "USAID", title: "Health Systems Strengthening", amount: "1,200,000", currency: "USD", country: "Kenya", deadline: "2025-05-30", probability: 92, category: "Healthcare" },
    { id: 4, donor: "World Bank", title: "Agricultural Innovation", amount: "750,000", currency: "USD", country: "Nigeria", deadline: "2025-08-20", probability: 70, category: "Agriculture" },
    { id: 5, donor: "AfDB", title: "Digital Skills Initiative", amount: "300,000", currency: "USD", country: "Nigeria", deadline: "2025-07-01", probability: 88, category: "Education" },
    { id: 6, donor: "EU Grants", title: "Green Energy Fund", amount: "2,000,000", currency: "EUR", country: "Nigeria", deadline: "2025-09-15", probability: 65, category: "Energy" },
    { id: 7, donor: "Gates Foundation", title: "EdTech Innovation", amount: "400,000", currency: "USD", country: "South Africa", deadline: "2025-06-15", probability: 82, category: "Education" },
    { id: 8, donor: "Mastercard Foundation", title: "Young Africa Works", amount: "1,500,000", currency: "USD", country: "South Africa", deadline: "2025-10-01", probability: 91, category: "Employment" },
    { id: 9, donor: "Google.org", title: "AI for Social Good", amount: "500,000", currency: "USD", country: "South Africa", deadline: "2025-08-01", probability: 75, category: "Technology" },
    { id: 10, donor: "EU Grants", title: "Infrastructure Development", amount: "3,000,000", currency: "EUR", country: "Ghana", deadline: "2025-11-30", probability: 60, category: "Infrastructure" },
    { id: 11, donor: "World Bank", title: "Financial Inclusion", amount: "800,000", currency: "USD", country: "Ghana", deadline: "2025-07-30", probability: 84, category: "Finance" },
    { id: 12, donor: "DFID", title: "Women Entrepreneurship", amount: "350,000", currency: "USD", country: "Tanzania", deadline: "2025-06-20", probability: 79, category: "Gender Equality" },
    { id: 13, donor: "AfDB", title: "Tourism Development", amount: "600,000", currency: "USD", country: "Tanzania", deadline: "2025-09-01", probability: 73, category: "Tourism" },
    { id: 14, donor: "USAID", title: "Agricultural Extension", amount: "450,000", currency: "USD", country: "Uganda", deadline: "2025-08-15", probability: 77, category: "Agriculture" },
    { id: 15, donor: "Gates Foundation", title: "Public Health Initiative", amount: "900,000", currency: "USD", country: "Uganda", deadline: "2025-07-10", probability: 86, category: "Healthcare" },
  ];
  
  const countries = ["All", "Kenya", "Nigeria", "South Africa", "Ghana", "Tanzania", "Uganda"];
  const categories = ["All", "Technology", "Education", "Healthcare", "Agriculture", "Employment", "Energy"];
  
  const filtered = opportunities.filter(opp => 
    (selectedCountry === "All" || opp.country === selectedCountry) &&
    (selectedCategory === "All" || opp.category === selectedCategory)
  );
  
  const handleApply = (opp: Opportunity) => {
    alert(`📝 Application started for ${opp.title}\n\nWe'll help you craft a winning proposal. First, pay KES 5,000 to access our application toolkit?`);
    if (confirm("Pay KES 5,000 to get expert proposal writing help?")) {
      window.location.href = "/pay";
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-500">Funding Opportunities</h1>
            <p className="text-zinc-400 mt-2">Active grants across 26 African countries</p>
          </div>
          <a href="/pay" className="bg-amber-600 hover:bg-amber-700 px-6 py-2 rounded-lg font-bold transition">
            💰 Pay KES 5,000
          </a>
        </div>
        
        {/* Filters */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white"
          >
            {countries.map(c => <option key={c}>{c}</option>)}
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white"
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        
        {/* Opportunities Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-zinc-800">
              <tr className="text-left text-zinc-500">
                <th className="pb-4">Donor</th>
                <th className="pb-4">Title</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Country</th>
                <th className="pb-4">Deadline</th>
                <th className="pb-4">Success Rate</th>
                <th className="pb-4">Action</th>
               </tr>
            </thead>
            <tbody>
              {filtered.map(opp => (
                <tr key={opp.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/30">
                  <td className="py-4 font-medium">{opp.donor}</td>
                  <td className="py-4">{opp.title}</td>
                  <td className="py-4 text-amber-500">{opp.currency === 'USD' ? '$' : '€'}{opp.amount}</td>
                  <td className="py-4">🇰🇪 {opp.country}</td>
                  <td className="py-4 text-sm">{opp.deadline}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-zinc-800 rounded-full h-2">
                        <div className="bg-green-500 rounded-full h-2" style={{ width: `${opp.probability}%` }}></div>
                      </div>
                      <span className="text-sm">{opp.probability}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => handleApply(opp)}
                      className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg text-sm transition"
                    >
                      Apply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-12 text-zinc-500">No opportunities found</div>
        )}
      </div>
    </div>
  );
}