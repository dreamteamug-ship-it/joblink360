'use client'
import { useState } from 'react';
import { useChat } from 'ai/react';

export default function CVGenerator() {
  const { messages, append } = useChat({ api: '/api/chat' });
  
  return (
    <div className="min-h-screen bg-black text-white p-10 font-sans">
      <h1 className="text-3xl font-bold text-gold mb-6">Amanda CV Architect</h1>
      <div className="border border-maroon p-6 bg-[#111] rounded-lg">
        <p className="mb-4 text-gray-400">Amanda is ready to build your industry-grade CV via a 5-minute interview.</p>
        {/* CV Q&A Interface */}
      </div>
    </div>
  );
}
