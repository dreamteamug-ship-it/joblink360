'use client';

import Link from 'next/link';

export default function SovereignEcosystem() {
  return (
    <div className="min-h-screen bg-[#050B14] text-white">
      {/* Luxury Header */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-lg border-b border-[#D4AF37]/30 py-5">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gradient-to-br from-[#D4AF37] to-amber-600 rounded-2xl flex items-center justify-center text-black font-black text-2xl">D</div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-[#D4AF37]">DreamTeq Sovereign</h1>
              <p className="text-[10px] text-zinc-500 -mt-1">TITANIUM INTELLIGENCE MATRIX</p>
            </div>
          </div>

          <div className="flex gap-8 text-sm">
            <Link href="/mother-architecture" className="hover:text-[#D4AF37] transition">Architecture</Link>
            <Link href="/command-center" className="hover:text-[#D4AF37] transition">Command Center</Link>
            <Link href="/amanda-chat" className="hover:text-[#D4AF37] transition">Amanda AI</Link>
            <Link href="/sovereign" className="text-[#D4AF37] font-medium">Ecosystem</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 text-center">
        <h1 className="text-7xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white to-[#D4AF37] bg-clip-text text-transparent">
          African Solutions<br />for African Problems
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-zinc-400">
          One unified ecosystem. Ten sovereign subsidiaries.<br />
          312 AI agents serving East Africa.
        </p>
      </section>

      {/* Quick Access Cards */}
      <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-3 gap-8 pb-24">
        <Link href="/command-center" className="bg-zinc-900 border border-zinc-700 p-10 rounded-3xl hover:border-[#D4AF37] transition group">
          <h3 className="text-2xl font-bold mb-3 group-hover:text-[#D4AF37]">Sovereign Command</h3>
          <p className="text-zinc-400">CEO-level oversight with live margins and AI briefings</p>
        </Link>

        <Link href="/amanda-chat" className="bg-zinc-900 border border-zinc-700 p-10 rounded-3xl hover:border-[#D4AF37] transition group">
          <h3 className="text-2xl font-bold mb-3 group-hover:text-[#D4AF37]">Amanda AI Core</h3>
          <p className="text-zinc-400">Strategic intelligence and operational guidance</p>
        </Link>

        <Link href="/mother-architecture" className="bg-zinc-900 border border-zinc-700 p-10 rounded-3xl hover:border-[#D4AF37] transition group">
          <h3 className="text-2xl font-bold mb-3 group-hover:text-[#D4AF37]">6-Tier Architecture</h3>
          <p className="text-zinc-400">View the full sovereign blueprint</p>
        </Link>
      </div>

      <div className="text-center text-xs text-zinc-500 pb-12">
        DreamTeq Sovereign Ecosystem • v1 Complete • March 2026
      </div>
    </div>
  );
}
