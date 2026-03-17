'use client'
import { useState } from 'react';

export default function EmeraldRoom() {
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState("Amanda");

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans border-8 border-double border-[#800000]">
      <header className="flex justify-between items-center mb-8 border-b border-gold/30 pb-4">
        <h1 className="text-2xl font-bold tracking-widest text-gold uppercase">Emerald Executive Suite</h1>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono">AMANDA VOICE:</span>
          <button 
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${voiceEnabled ? 'bg-green-600' : 'bg-red-900'}`}
          >
            {voiceEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-4 h-[70vh]">
        {/* Main Video/AI Display */}
        <div className="col-span-3 bg-gradient-to-br from-[#111] to-[#000] rounded-xl border border-gold/20 flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_100px_rgba(128,0,0,0.3)]">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full border-4 border-gold mx-auto mb-4 animate-pulse bg-maroon/20" />
            <h2 className="text-gold text-2xl uppercase tracking-widest">Amanda Intelligence</h2>
            <p className="text-gray-500 font-mono text-sm">Status: Listening...</p>
          </div>
        </div>

        {/* Sidebar: C-Suite Bots */}
        <div className="bg-[#0a0a0a] p-4 border border-maroon/30 rounded-xl overflow-y-auto">
          <h3 className="text-maroon text-xs font-bold mb-4 uppercase">Executive Board</h3>
          {['CEO', 'CFO', 'COO', 'CMO', 'CIO'].map(pos => (
            <div key={pos} className="mb-4 p-3 bg-black border-l-2 border-gold/50">
              <p className="text-gold text-xs font-bold">{pos} BOT</p>
              <p className="text-[10px] text-gray-500 italic">Analyzing Telemetry...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
