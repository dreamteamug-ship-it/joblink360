"use client";
import React from 'react';

export default function TitaniumDashboard() {
  return (
    <div className="min-h-screen bg-[#050B14] p-12 text-white">
      <h1 className="text-4xl font-bold text-[#D4AF37] mb-4">??? Titanium Executive Dashboard</h1>
      <p className="text-gray-400 mb-8">Sovereign Intelligence Brain | CTO: Mr. Allan</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0A0F1A] border border-[#D4AF37]/20 p-6 rounded-xl">
          <h3 className="text-silver uppercase text-sm font-bold">Automation Rate</h3>
          <div className="text-3xl font-bold text-green-400">90%</div>
        </div>
        <div className="bg-[#0A0F1A] border border-[#D4AF37]/20 p-6 rounded-xl">
          <h3 className="text-silver uppercase text-sm font-bold">Active Agents</h3>
          <div className="text-3xl font-bold text-blue-400">312</div>
        </div>
        <div className="bg-[#0A0F1A] border border-[#D4AF37]/20 p-6 rounded-xl">
          <h3 className="text-silver uppercase text-sm font-bold">Project Valuation</h3>
          <div className="text-3xl font-bold text-[#D4AF37]"> USD</div>
        </div>
      </div>
    </div>
  );
}
