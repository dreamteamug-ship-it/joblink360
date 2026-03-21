// app/page.tsx
export default function HomePage() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "LMS", href: "/lms" },
    { name: "Funding", href: "/funding" },
    { name: "Tenders", href: "/tenders" },
    { name: "Titanium ERP", href: "/titanium-erp" },
    { name: "Admin", href: "/admin" },
    { name: "Pay", href: "/pay" },
  ];
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 sticky top-0 bg-black/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-2xl font-bold text-amber-500">JobLink 360</h1>
            <div className="flex gap-4 flex-wrap">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} className="text-zinc-400 hover:text-amber-500 transition">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-amber-500 mb-4">Transform Learners into Earners</h1>
          <p className="text-xl text-zinc-400 mb-8">90-Day Income Plan • 50+ AI Courses • 26-Country Funding</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/pay" className="bg-amber-600 hover:bg-amber-700 px-8 py-3 rounded-lg font-bold transition">
              💰 Pay KES 5,000
            </a>
            <a href="/api/ai/amanda" className="border border-amber-500 hover:bg-amber-500/10 px-8 py-3 rounded-lg font-bold transition">
              🧠 Talk to Amanda
            </a>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 hover:border-amber-500/50 transition">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="text-xl font-bold mb-2">M-Pesa Paybill</h3>
            <p className="text-zinc-400">Paybill: <span className="text-white font-mono">400200</span></p>
            <p className="text-amber-500 font-mono">Account: 4045731</p>
            <p className="text-green-500 font-bold mt-2">KES 5,000</p>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 hover:border-amber-500/50 transition">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-bold mb-2">Vulture-Eye</h3>
            <p className="text-zinc-400">0.02s verification</p>
            <p className="text-green-500">Auto-hardened payments</p>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 hover:border-amber-500/50 transition">
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="text-xl font-bold mb-2">Amanda AI</h3>
            <p className="text-zinc-400">24/7 career mentor</p>
            <p className="text-amber-500">90-day income plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}