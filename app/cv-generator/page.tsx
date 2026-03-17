'use client'
import { useChat } from 'ai/react';

export default function CVGenerator() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat'
  });

  return (
    <div className="min-h-screen bg-black text-white p-10 font-sans">
      <h1 className="text-3xl font-bold text-gold mb-6">Amanda CV Architect</h1>
      
      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded ${m.role === 'user' ? 'bg-blue-900/50' : 'bg-gray-800/50'}`}>
            <strong className="text-gold">{m.role === 'user' ? 'You' : 'Amanda'}:</strong>
            <p className="mt-1">{m.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask Amanda about your CV..."
          className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gold/30 focus:border-gold focus:outline-none"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="px-6 py-3 bg-gold text-black rounded-lg font-bold hover:bg-gold/80 transition disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
