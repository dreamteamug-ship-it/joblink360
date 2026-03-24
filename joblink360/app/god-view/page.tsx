"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Activity, Lock, Layers } from 'lucide-react';

export default function GodView() {
  const [subsidiaries] = useState([
    { name: "JobLinks Africa", status: "Optimal", score: 98, realm: "Media/Talent" },
    { name: "Altovex Global", status: "Active", score: 94, realm: "Logistics" },
    { name: "Balaji Hygiene", status: "Idle", score: 0, realm: "Manufacturing" },
    { name: "SinoAfric EV", status: "Active", score: 88, realm: "Mobility" },
    { name: "DreamTeQ 360", status: "Active", score: 91, realm: "Agri-Fintech" },
    { name: "Urbanis Parks", status: "Active", score: 92, realm: "Smart City" },
    { name: "Urban Edge", status: "Idle", score: 0, realm: "Infrastructure" },
    { name: "Digital Den", status: "Active", score: 96, realm: "IoT Hub" },
    { name: "Jetpro Powerwash", status: "Active", score: 89, realm: "Services" },
    { name: "Delite Productions", status: "Active", score: 99, realm: "Media" }
  ]);

  return (
    <div className="min-h-screen bg-[#050B14] p-8 text-white font-serif selection:bg-[#D4AF37]">
      <header className="flex justify-between items-end border-b border-[#D4AF37]/30 pb-6 mb-10">
        <div>
          <h2 className="text-[#D4AF37] tracking-[0.6em] uppercase text-xs mb-2">Sovereign Command Center</h2>
          <h1 className="text-5xl font-bold tracking-tighter">TITANIUM MATRIX 360</h1>
        </div>
        <div className="text-right">
          <p className="text-[#D4AF37] text-2xl font-bold italic">$100M VALUATION PATH</p>
          <p className="text-xs text-silver uppercase tracking-widest">90% Autonomous Swarm Active</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {subsidiaries.map((sub) => (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            key={sub.name} 
            className="p-4 rounded-lg bg-[#0A0F1A] border border-[#D4AF37]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[8px] uppercase font-bold">
              {sub.realm}
            </div>
            <h3 className="text-sm font-bold mb-1">{sub.name}</h3>
            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#D4AF37]" style={{ width: `${sub.score}%` }}></div>
              </div>
              <span className="text-[10px] font-mono">{sub.score}%</span>
            </div>
            <p className={`text-[9px] mt-2 ${sub.status === 'Idle' ? 'text-red-500' : 'text-green-500'}`}>
              ? {sub.status} {sub.status === 'Idle' ? '(90-Day Rollout Active)' : ''}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
