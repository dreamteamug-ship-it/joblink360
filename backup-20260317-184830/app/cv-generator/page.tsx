// app/cv-generator/page.tsx
'use client';
import { useState } from 'react';
import CountrySelector from '@/components/CountrySelector';

export default function CVGenerator() {
  const [country, setCountry] = useState('');
  const [targetCountry, setTargetCountry] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/agents/amanda/ultimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, country, targetCountry })
      });
      
      const data = await res.json();
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.synthesis || 'No response'
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, an error occurred.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const internationalTargets = [
    { value: '', label: 'Local Opportunities' },
    { value: 'UAE', label: '🇦🇪 UAE / Dubai' },
    { value: 'UK', label: '🇬🇧 United Kingdom' },
    { value: 'USA', label: '🇺🇸 USA' },
    { value: 'Canada', label: '🇨🇦 Canada' },
    { value: 'Remote', label: '🌐 Remote Global' }
  ];

  return (
    <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#C9A84C] mb-2">Amanda CV Architect</h1>
        <p className="text-[#F5F5DC]/80 mb-6">
          AI advisor for 26 African countries + Global Opportunities
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <CountrySelector selectedCountry={country} onCountryChange={setCountry} />
          
          <div>
            <label className="block text-[#F5F5DC] text-sm font-bold mb-2">
              Target Market
            </label>
            <select
              value={targetCountry}
              onChange={(e) => setTargetCountry(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#020202] text-[#F5F5DC] border border-[#C9A84C]/30"
            >
              {internationalTargets.map((target) => (
                <option key={target.value} value={target.value}>
                  {target.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={`p-4 rounded-lg ${m.role === 'user' ? 'bg-blue-900/20' : 'bg-gray-800/20'}`}>
              <strong className="text-[#C9A84C]">{m.role === 'user' ? 'You' : 'Amanda'}:</strong>
              <p className="mt-2">{m.content}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Amanda about your CV..."
            className="flex-1 p-4 rounded-lg bg-[#020202] text-[#F5F5DC] border border-[#C9A84C]/30"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-4 bg-[#C9A84C] text-[#020202] rounded-lg font-bold hover:bg-[#C9A84C]/80"
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
