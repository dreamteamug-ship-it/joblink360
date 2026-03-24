"use client";

import Link from "next/link";
import { Crown, Brain, LayoutDashboard, FileText } from "lucide-react";

export default function Home() {
  const modules = [
    { name: "AMANDA Portal", icon: Brain, href: "/amanda-portal", desc: "Meet AMANDA AI - Voice & Text" },
    { name: "AMANDA Chat", icon: LayoutDashboard, href: "/amanda-chat", desc: "AI Assistant" },
    { name: "Dashboard", icon: FileText, href: "/dashboard", desc: "Coming Soon" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050B14] to-[#0A0F1A]">
      <div className="max-w-6xl mx-auto p-8 text-center">
        <div className="inline-block p-4 bg-[#D4AF37]/10 rounded-full mb-6">
          <Crown className="text-[#D4AF37]" size={64} />
        </div>
        <h1 className="text-5xl font-bold mb-4">AMANDA Command Center</h1>
        <p className="text-xl opacity-70 mb-12">AI-Powered Sovereign Ecosystem | 312 Agents | 90% Autonomy</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {modules.map((module) => (
            <Link key={module.name} href={module.href}>
              <div className="p-8 bg-[#0A0F1A] rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:scale-105 transition-all cursor-pointer">
                <module.icon size={48} className="text-[#D4AF37] mb-4 mx-auto" />
                <h2 className="text-xl font-bold mb-2">{module.name}</h2>
                <p className="text-sm opacity-70">{module.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 p-4 bg-[#D4AF37]/10 rounded-xl inline-block">
          <p className="text-sm">✨ AMANDA Active | Voice Enabled | 8K Ready</p>
        </div>
      </div>
    </div>
  );
}
