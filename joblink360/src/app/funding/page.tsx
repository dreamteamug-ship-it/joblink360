// app/funding/page.tsx
export default function FundingPage() {
  const opportunities = [
    { donor: "World Bank", amount: "$500,000", country: "Kenya", probability: "85%" },
    { donor: "African Development Bank", amount: "$300,000", country: "Nigeria", probability: "78%" },
    { donor: "Mastercard Foundation", amount: "$1.5M", country: "South Africa", probability: "91%" },
    { donor: "EU Grants", amount: "$3M", country: "Ghana", probability: "60%" },
    { donor: "USAID", amount: "$1.2M", country: "Kenya", probability: "92%" },
    { donor: "Gates Foundation", amount: "$900,000", country: "Uganda", probability: "86%" },
  ];
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-amber-500 mb-4">Funding Opportunities</h1>
        <p className="text-zinc-400 mb-8">Active grants across 26 African countries</p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-zinc-800">
              <tr className="text-left text-zinc-500">
                <th className="pb-4">Donor</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Country</th>
                <th className="pb-4">Success Rate</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp, i) => (
                <tr key={i} className="border-b border-zinc-800/50">
                  <td className="py-4 font-medium">{opp.donor}</td>
                  <td className="py-4 text-amber-500">{opp.amount}</td>
                  <td className="py-4">{opp.country}</td>
                  <td className="py-4 text-green-500">{opp.probability}</td>
                  <td className="py-4">
                    <button className="bg-amber-600 px-4 py-2 rounded-lg text-sm">Apply</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}