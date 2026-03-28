'use client';
import { useState, useRef, ChangeEvent } from 'react';
import { ventures } from '@/lib/projects-data';

export default function SovereignReport() {
  const [isLong, setIsLong] = useState(true);
  const [images, setMessages] = useState<string[]>([
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=640', // Placeholder 1
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=640'  // Placeholder 2
  ]);
  const [captions, setCaptions] = useState(['Primary Asset (Edit)', 'Secondary Analytics (Edit)']);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const activeProject = ventures[0]; // Template Project

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMessages(prev => {
          const newImgs = [...prev];
          newImgs[index] = reader.result as string;
          return newImgs;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaptionChange = (index: number, value: string) => {
    setCaptions(prev => {
      const newCaps = [...prev];
      newCaps[index] = value;
      return newCaps;
    });
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-4 md:p-8 flex flex-col items-center font-sans">
      {/* Control Bar - Non-Printing */}
      <div className="w-full max-w-[210mm] mb-6 bg-black border border-zinc-800 p-4 flex flex-wrap gap-4 justify-between items-center no-print rounded-sm">
        <div className="flex gap-2">
          <button onClick={() => setIsLong(!isLong)} className="px-3 py-1 border border-emerald-500 text-emerald-500 text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all">
            Mode: {isLong ? 'Deep-Delve' : 'Summary'}
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="bg-emerald-600 text-white px-4 py-1 text-xs uppercase font-bold hover:bg-emerald-500 rounded-full">Export PDF / Print</button>
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
            <div className="text-sm leading-relaxed outline-none focus:bg-zinc-50 p-2">
              {isLong ? (
                <div className="space-y-4">
                  <p>Deployment stands at {activeProject.progress}% within the {activeProject.location} corridor. The technical rollout is focused on integrating {activeProject.metrics} into existing Odoo workflows.</p>
                </div>
              ) : (
                <p>Summary: {activeProject.name} is {activeProject.progress}% deployed in {activeProject.location}, utilizing {activeProject.metrics}.</p>
              )}
            </div>
          </section>

          {/* AI Image & Upload Section */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            {[0, 1].map((index) => (
              <div key={index} className="relative group">
                {/* Upload Button - Hidden on Print */}
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute top-2 right-2 z-10 bg-emerald-600/90 text-white text-[10px] uppercase px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity no-print"
                >
                  Upload AI Site Photo
                </button>
                <div className="aspect-video bg-zinc-50 border border-zinc-100 mb-2 overflow-hidden flex items-center justify-center">
                  <img src={images[index]} alt="Project Asset" className="w-full h-full object-cover" />
                </div>
                {/* Edit Caption - Content Editable */}
                <p 
                  contentEditable 
                  suppressContentEditableWarning
                  className="text-[10px] text-zinc-600 italic outline-none focus:bg-zinc-50"
                  onBlur={(e) => handleCaptionChange(index, e.currentTarget.textContent || "")}
                >
                  {captions[index]}
                }
                </p>
              </div>
            ))}
          </div>
        </main>

        {/* Hidden File Input */}
        <input type="file" ref={fileInputRef} onChange={(e) => handleImageUpload(e, 0)} accept="image/*" className="hidden" />

        {/* Footer */}
        <footer className="mt-auto pt-8 border-t border-zinc-200 flex justify-between items-center text-[9px] uppercase tracking-widest text-zinc-400">
          <p>© 2026 DreamTeQ Consulting | Nairobi, Kenya</p>
          <p>Page 1 of 1</p>
        </footer>
      </div>
    </div>
  );
}
