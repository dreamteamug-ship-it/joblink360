'use client';
import { useChat } from 'ai/react';

export default function AmandaChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="flex flex-col h-screen bg-black text-zinc-100 font-sans p-6">
      <header className="border-b border-zinc-800 pb-4 mb-6 flex justify-between items-center">
        <h1 className="text-xl font-light tracking-widest uppercase">Amanda Core</h1>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-500 uppercase tracking-tighter font-bold">Status:</span>
          <span className="text-emerald-500 text-xs italic">● {isLoading ? 'Processing' : 'Standby'}</span>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
        {messages.map((m) => (
          <div key={m.id} className={max-w-[85%] p-4 rounded-2xl }>
             <p className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">{m.role === 'assistant' ? 'Amanda' : 'Sande'}</p>
             <p className="text-sm leading-relaxed">{m.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input 
          value={input} 
          onChange={handleInputChange} 
          placeholder="Command Amanda..." 
          className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-4 px-6 pr-14 focus:outline-none focus:border-emerald-500 transition-all text-sm" 
        />
        <button type="submit" disabled={isLoading} className="absolute right-3 top-2.5 bg-emerald-600 hover:bg-emerald-500 p-2 rounded-full transition-colors disabled:opacity-50">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        </button>
      </form>
    </div>
  );
}
