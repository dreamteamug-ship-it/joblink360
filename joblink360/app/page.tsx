// app/page.tsx
import Link from 'next/link'

export default function HomePage() {
  const features = [
    { title: "M-Pesa Paybill", icon: "📱", desc: "Paybill: 400200", detail: "Account: 4045731", price: "KES 5,000" },
    { title: "Vulture-Eye", icon: "⚡", desc: "0.02s verification", detail: "Auto-hardened payments" },
    { title: "Amanda AI", icon: "🧠", desc: "24/7 career mentor", detail: "90-day income plan" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-800 bg-black/95 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-amber-500">JobLink 360</h1>
          <div className="flex gap-6 flex-wrap">
            <Link href="/lms" className="text-zinc-400 hover:text-amber-500">LMS</Link>
            <Link href="/funding" className="text-zinc-400 hover:text-amber-500">Funding</Link>
            <Link href="/tenders" className="text-zinc-400 hover:text-amber-500">Tenders</Link>
            <Link href="/titanium-erp" className="text-zinc-400 hover:text-amber-500">ERP</Link>
            <Link href="/admin" className="text-zinc-400 hover:text-amber-500">Admin</Link>
            <Link href="/pay" className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg font-bold">Pay KES 5,000</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-amber-500 mb-4">Transform Learners into Earners</h1>
        <p className="text-xl text-zinc-400 mb-8">90-Day Income Plan • 50+ AI Courses • 26-Country Funding</p>
        <div className="flex gap-4 justify-center">
          <Link href="/pay" className="bg-amber-600 hover:bg-amber-700 px-8 py-3 rounded-lg font-bold">💰 Pay KES 5,000</Link>
          <Link href="/api/ai/amanda" className="border border-amber-500 hover:bg-amber-500/10 px-8 py-3 rounded-lg font-bold">🧠 Talk to Amanda</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center hover:border-amber-500/50 transition">
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-zinc-400">{f.desc}</p>
            {f.detail && <p className="text-amber-500 font-mono mt-2">{f.detail}</p>}
            {f.price && <p className="text-2xl font-bold text-amber-500 mt-2">{f.price}</p>}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-green-600/10 to-transparent border border-green-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-green-400 mb-4">📱 M-Pesa Paybill</h2>
          <div className="flex justify-center gap-8 flex-wrap text-lg">
            <div><span className="text-zinc-400">Paybill:</span> <span className="font-mono text-white text-xl">400200</span></div>
            <div><span className="text-zinc-400">Account:</span> <span className="font-mono text-white text-xl">4045731</span></div>
            <div><span className="text-zinc-400">Amount:</span> <span className="text-amber-500 text-2xl font-bold">KES 5,000</span></div>
          </div>
          <p className="text-xs text-zinc-500 mt-4">⚡ Vulture-Eye | 0.02s Verification | NCBA Bank 8515130017</p>
        </div>
      </div>
    </div>
  )
}