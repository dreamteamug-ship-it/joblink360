'use client';
import { useState } from 'react';
import { ventures } from '@/lib/projects-data';

export default function SovereignReport() {
  const [isLong, setIsLong] = useState(true);
  const [includeImages, setIncludeImages] = useState(true);
  const [content, setContent] = useState("Click to edit this project brief...");

  const activeProject = ventures[0]; // Defaulting to Abim & Nyanza for the template

  return (
    <div className="min-h-screen bg-zinc-900 p-4 md:p-8 flex flex-col items-center font-sans">
      {/* Control Bar - Non-Printing */}
      <div className="w-full max-w-[210mm] mb-6 bg-black border border-zinc-800 p-4 flex flex-wrap gap-4 justify-between items-center no-print">
        <div className="flex gap-2">
          <button onClick={() => setIsLong(!isLong)} className="px-3 py-1 border border-emerald-500 text-emerald-500 text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all">
            Mode: {isLong ? 'Deep-Delve' : 'Summary'}
          </button>
          <button onClick={() => setIncludeImages(!includeImages)} className="px-3 py-1 border border-zinc-700 text-zinc-400 text-xs uppercase tracking-widest">
            Images: {includeImages ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="bg-emerald-600 text-white px-4 py-1 text-xs uppercase font-bold hover:bg-emerald-500">Export PDF / Print</button>
        </div>
      </div>

      {/* A4 Portrait Page Container */}
      <div id="report-content" className="w-[210mm] min-h-[297mm] bg-white text-black p-[20mm] shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Header */}
        <header className="border-b-2 border-black pb-4 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter">{activeProject.name}</h1>
            <p className="text-sm font-mono text-zinc-500">Ref: DTQ-SOV-2026-001 // {activeProject.location}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase">Sovereign Project Report</p>
            <p className="text-[10px] uppercase">{new Date().toLocaleDateString()}</p>
          </div>
        </header>

        {/* Content Section */}
        <main className="flex-1">
          <section className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-l-4 border-black pl-2">Executive Overview</h2>
            <div 
              contentEditable 
              suppressContentEditableWarning
              className="text-sm leading-relaxed outline-none focus:bg-zinc-50 p-2"
              onBlur={(e) => setContent(e.currentTarget.textContent || "")}
            >
              {isLong ? (
                <div className="space-y-4">
                  <p>This deep-delve analysis covers the strategic rollout of {activeProject.metrics} across the {activeProject.location} corridor. Current deployment stands at {activeProject.progress}%, targeting full operational hardening by Q4 2026.</p>
                  <p>The technical architecture leverages ERPNext integration for supply chain transparency and AI-driven predictive maintenance for agricultural assets.</p>
                </div>
              ) : (
                <p>Summary: {activeProject.name} is currently {activeProject.progress}% deployed in {activeProject.location}. Focus remains on {activeProject.metrics}.</p>
              )}
            </div>
          </section>

          {includeImages && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="aspect-video bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[10px] text-zinc-400 uppercase">
                Primary Asset View (Drone/CAD)
              </div>
              <div className="aspect-video bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[10px] text-zinc-400 uppercase">
                Secondary Site Analytics
              </div>
            </div>
          )}
        </main>

        {/* Footer / Page Limit Warning Area */}
        <footer className="mt-auto pt-8 border-t border-zinc-200 flex justify-between items-center text-[9px] uppercase tracking-widest text-zinc-400">
          <p>© 2026 DreamTeQ Consulting | Nairobi, Kenya</p>
          <p>Page 1 of 1</p>
        </footer>
      </div>

      {/* Continuity Summary Block - Hidden from print */}
      <div className="w-full max-w-[210mm] mt-12 p-6 bg-zinc-800 border border-emerald-500/30 no-print">
        <h3 className="text-emerald-500 text-xs font-bold uppercase mb-2">Project Continuity Summary (Copy to Next Chat)</h3>
        <pre className="text-[10px] text-zinc-300 bg-black p-4 overflow-x-auto">
          PROJECT: {activeProject.id} | STATUS: {activeProject.status} | DEPLOYMENT: {activeProject.progress}% | ORIENTATION: PORTRAIT
        </pre>
      </div>
    </div>
  );
}
