'use client';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Mic, MicOff } from 'lucide-react';

export function AmandaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0 && mounted) {
      setMessages([{
        role: 'assistant',
        content: '👋 Habari! I\'m Amanda, your Sovereign AI mentor. I have complete knowledge of AI, careers, and the JobLink 360 platform. What would you like to know?'
      }]);
    }
  }, [isOpen, mounted]);

  const sendMessage = async (messageText) => {
    const userMessage = messageText || input;
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/amanda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Samahani, I\'m having trouble connecting.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) return;
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.onresult = (e) => sendMessage(e.results[0][0].transcript);
    recognition.start();
    setIsListening(true);
    recognition.onend = () => setIsListening(false);
  };

  if (!mounted) return null;

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg z-50">
          <MessageCircle size={24} />
        </button>
      )}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[450px] h-[650px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col z-50 border border-amber-500/30 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <div>
                <h3 className="font-semibold">Amanda AI</h3>
                <p className="text-xs opacity-90">Claude 3.5 Sonnet</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full"><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  <div className="text-sm">{msg.content}</div>
                </div>
              </div>
            ))}
            {isLoading && <div className="flex justify-start"><div className="bg-gray-200 p-3 rounded-lg">Thinking...</div></div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <button onClick={startVoiceInput} className="bg-gray-200 dark:bg-gray-800 p-3 rounded-lg">{isListening ? '🎙️' : '🎤'}</button>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} placeholder="Ask Amanda..." className="flex-1 p-3 border rounded-lg" />
              <button onClick={() => sendMessage()} className="bg-blue-600 text-white p-3 rounded-lg">Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}