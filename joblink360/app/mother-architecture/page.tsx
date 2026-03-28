'use client';

export default function MotherArchitecture() {
  const tiers = [
    {
      level: "LEVEL 1",
      title: "Executive Command & Shared Services",
      color: "text-[#D4AF37]",
      items: [
        { name: "DreamTeq Consulting Hub (Mother Platform)", desc: "Central command aggregating real-time data from all subsidiaries. Hosts LMS and group-wide procurement." },
        { name: "Sovereign Command Center", desc: "Live CEO/CTO dashboard with margin tracking, AI briefings, and ecosystem oversight." }
      ]
    },
    {
      level: "LEVEL 2",
      title: "The Smart ERP Nervous System",
      color: "text-blue-400",
      items: [
        { name: "Titanium ERP Ledger", desc: "Unified data backbone managing payments, inventory, compliance, and 13 core modules across the ecosystem." }
      ]
    },
    {
      level: "LEVEL 3",
      title: "Integrated Operational Platforms",
      color: "text-emerald-400",
      items: [
        { name: "JobLink 360", desc: "AI-powered Talent Acquisition & Scoring" },
        { name: "Naivasha EV Plant", desc: "Electric Mobility, Asset Tracking & Fleet Optimization" },
        { name: "Abim Agritech Hub", desc: "Precision Farming, Yield Forecasting & NDVI Analytics" },
        { name: "Altovex Logistics", desc: "Cross-border transport, routing & last-mile optimization" },
        { name: "Digital Den", desc: "E-commerce platform and 100+ mobile applications" },
        { name: "Urban Edge", desc: "Smart City, Landscaping & Infrastructure solutions" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050B14] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold tracking-tighter mb-4 text-[#D4AF37]">Sovereign Enterprise Ecosystem</h1>
          <p className="text-2xl text-zinc-400">6-Tier Architecture • DreamTeq Sovereign 2026</p>
        </div>

        <div className="space-y-28">
          {tiers.map((tier, idx) => (
            <div key={idx}>
              <div className="text-center mb-10">
                <div className={`inline-block px-8 py-3 border border-[#D4AF37]/40 rounded-full text-sm tracking-[3px] mb-4 ${tier.color}`}>
                  {tier.level}
                </div>
                <h2 className="text-4xl font-bold tracking-tight">{tier.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {tier.items.map((item, i) => (
                  <div key={i} className="bg-zinc-900/80 border border-[#D4AF37]/20 p-10 rounded-3xl hover:border-[#D4AF37]/60 transition-all group">
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-[#D4AF37] transition-colors">{item.name}</h3>
                    <p className="text-zinc-400 leading-relaxed text-lg">{item.desc}</p>
                  </div>
                ))}
              </div>

              {idx < tiers.length - 1 && (
                <div className="flex justify-center my-16 text-5xl text-[#D4AF37]/30">↓</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-24 text-center text-zinc-500 text-sm">
          This living architecture connects every subsidiary into one unified Sovereign Intelligence Matrix.
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
