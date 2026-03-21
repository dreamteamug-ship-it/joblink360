export default function FundingPage() {
  return (
    <div className="p-10 bg-[#030507] min-h-screen text-white">
      <h1 className="text-4xl font-bold text-[#d4af37] mb-8">26-Country Funding Mesh</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-[#d4af37]/20 rounded-xl bg-white/5">
          <h2 className="text-xl font-bold">World Bank Digital Grant</h2>
          <p className="text-zinc-400">Kenya | $500,000 | Status: ACTIVE</p>
        </div>
        <div className="p-6 border border-[#d4af37]/20 rounded-xl bg-white/5">
          <h2 className="text-xl font-bold">Mastercard Foundation</h2>
          <p className="text-zinc-400">South Africa | $1.5M | Status: ACTIVE</p>
        </div>
      </div>
      <p className="mt-10 text-xs text-emerald-500 font-mono">🔍 Vulture-Eye: Scanning 26 countries... Node Green</p>
    </div>
  );
}
