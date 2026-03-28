'use client';
import { useState } from 'react';
import { config } from '@/lib/amanda-config';

export default function AmandaChat() {
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Sovereign System Online. How can I assist your development today?' }]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    // Logic link to the upcoming Gemini Stream API
    console.log("System Status:", config.isProd ? "Production" : "Development");
  };

  return (
    <div className="flex flex-col h-screen bg-black text-zinc-100 font-sans p-6">
      <header className="border-b border-zinc-800 pb-4 mb-6">
        <h1 className="text-xl font-light tracking-widest uppercase">Amanda Core <span className="text-emerald-500 text-xs ml-2 italic">● Active</span></h1>
      </header>
      <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
        {messages.map((m, i) => (
          <div key={i} className={max-w-[85%] p-4 rounded-2xl }>
            <p className="text-sm leading-relaxed">{m.text}</p>
          </div>
        ))}
      </div>
      <div className="relative">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Command Amanda..." className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-4 px-6 focus:outline-none focus:border-emerald-500 transition-all text-sm" />
        <button onClick={handleSend} className="absolute right-3 top-2.5 bg-emerald-600 hover:bg-emerald-500 p-2 rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        </button>
      </div>
    </div>
  );
}
