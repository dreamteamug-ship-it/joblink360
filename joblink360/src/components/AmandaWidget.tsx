// src/components/AmandaWidget.tsx
// Floating Amanda AI Assistant Widget

'use client';

import { useState, useEffect } from 'react';

export function AmandaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{role: string, content: string}>>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = { role: 'user', content: message };
    setConversation(prev => [...prev, userMessage]);
    setLoading(true);
    
    try {
      const response = await fetch('/api/ai/amanda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      
      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.response };
      setConversation(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Amanda error:', error);
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: 'I\'m processing. Please try again.' 
      }]);
    } finally {
      setLoading(false);
      setMessage('');
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg hover:shadow-amber-500/30 transition-all z-50 flex items-center justify-center"
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-midnight-blue/95 backdrop-blur-xl border border-savanna-gold/30 rounded-2xl shadow-2xl z-50 flex flex-col animate-fade-in">
          {/* Header */}
          <div className="p-4 border-b border-savanna-gold/30 bg-gradient-to-r from-maasai-red/20 to-transparent rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                <span className="text-xl">🧠</span>
              </div>
              <div>
                <h3 className="font-bold text-white">Amanda</h3>
                <p className="text-xs text-amber-500">Sovereign Intelligence • Always Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {conversation.length === 0 && (
              <div className="text-center text-zinc-500 mt-8">
                <p className="text-amber-500 mb-2">✨ AMANDA ✨</p>
                <p className="text-sm">Your ruthless mentor is here.</p>
                <p className="text-xs mt-2">Ask me about:<br/>• Earning with AI in 90 days<br/>• Funding opportunities across Africa<br/>• M-Pesa payments (Paybill 400200)</p>
              </div>
            )}
            {conversation.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-savanna-gold text-night-black' 
                    : 'bg-night-black/80 border border-savanna-gold/30 text-white'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-night-black/80 border border-savanna-gold/30 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-savanna-gold/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask Amanda anything..."
                className="flex-1 bg-night-black border border-savanna-gold/30 rounded-lg px-4 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-night-black font-bold rounded-lg hover:shadow-lg transition disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}