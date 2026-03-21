// app/pay/page.tsx
'use client';
import { useState } from 'react';

export default function PaymentPage() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: string; message: string } | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    try {
      const res = await fetch('/api/reconcile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmationCode: code, phoneNumber: phone })
      });
      const data = await res.json();
      
      if (data.status === 'HARDENED') {
        setResult({ type: 'success', message: `✅ Payment verified in ${data.latency?.toFixed(2) || '0'}ms! Redirecting...` });
        setTimeout(() => { window.location.href = '/lms'; }, 2000);
      } else if (data.status === 'PENDING') {
        setResult({ type: 'info', message: '⏳ Payment pending verification. You will be notified shortly.' });
      } else {
        setResult({ type: 'error', message: '❌ Verification failed. Please try again.' });
      }
    } catch (error) {
      setResult({ type: 'error', message: '❌ Network error. Please check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-night-black text-white">
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-savanna-gold mb-2">JobLink 360</h1>
          <p className="text-zinc-400">Pay KES 5,000 - Unlock Your Future</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-600/10 to-transparent border border-green-500/30 rounded-2xl p-6 mb-6 animate-fade-in">
          <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
            📱 M-Pesa Paybill
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <span className="text-zinc-400">Paybill Number:</span>
              <span className="font-mono font-bold text-white text-lg">400200</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <span className="text-zinc-400">Account Number:</span>
              <span className="font-mono font-bold text-white text-lg">4045731</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-zinc-400">Amount:</span>
              <span className="text-savanna-gold font-bold text-2xl">KES 5,000</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleVerify} className="space-y-4 animate-fade-in">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">M-Pesa Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0712345678"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-savanna-gold focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">M-Pesa Confirmation Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="QWERTY12345"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white font-mono focus:border-savanna-gold focus:outline-none transition"
              required
            />
            <p className="text-xs text-zinc-500 mt-1">Found in your M-Pesa confirmation SMS</p>
          </div>
          
          {result && (
            <div className={`p-4 rounded-lg text-center ${
              result.type === 'success' ? 'bg-green-600/20 border border-green-500/50 text-green-400' :
              result.type === 'error' ? 'bg-red-600/20 border border-red-500/50 text-red-400' :
              'bg-blue-600/20 border border-blue-500/50 text-blue-400'
            }`}>
              {result.message}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-savanna-gold to-amber-600 hover:from-amber-600 hover:to-savanna-gold disabled:from-zinc-600 disabled:to-zinc-700 text-night-black font-bold py-3 rounded-lg transition transform hover:scale-[1.02] disabled:transform-none"
          >
            {loading ? '⚡ Verifying with Vulture-Eye...' : '💰 Pay KES 5,000 & Unlock Access'}
          </button>
        </form>
        
        <div className="text-center mt-6 text-xs text-zinc-600">
          <p>⚡ Powered by Vulture-Eye | 0.02s Target Latency</p>
          <p>🏦 NCBA Bank Account: 8515130017</p>
          <p className="mt-2">🇰🇪 Kenya | 🇳🇬 Nigeria | 🇿🇦 South Africa | 🇬🇭 Ghana | +22 Countries</p>
        </div>
      </div>
    </div>
  );
}