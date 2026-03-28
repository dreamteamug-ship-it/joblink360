'use client';
import { useChat } from 'ai/react';

export default function AmandaChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [{
      id: 'welcome',
      role: 'assistant',
      content: 'I am Amanda, the Sovereign Intelligence Core. How may I assist the DreamTeq ecosystem today?'
    }]
  });

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tighter text-emerald-500">Amanda AI Core</h1>
          <p className="text-zinc-500 text-sm">Sovereign Intelligence • Level 1 Command</p>
        </header>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 h-[70vh] overflow-y-auto mb-6 space-y-6">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-zinc-800 border border-zinc-700'}`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask Amanda about strategy, margins, or operations..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-6 py-4 focus:outline-none focus:border-emerald-500"
          />
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-500 px-8 rounded-full font-medium disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
