// app/payments/page.tsx
'use client';
import { useState } from 'react';
import { PAYMENT_CHANNELS } from '@/lib/payments/payment-config';

export default function PaymentsPage() {
  const [selectedChannel, setSelectedChannel] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('KES');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const channels = Object.entries(PAYMENT_CHANNELS);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payments/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          channel: selectedChannel, 
          amount: parseFloat(amount),
          currency,
          country: 'KE'
        })
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-[#C9A84C] mb-4">💰 Payment Hub</h1>
        <p className="text-xl mb-8">Multiple payment channels across Africa & Global</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#020202] p-4 rounded-lg">
            <h3 className="font-bold text-[#C9A84C]">Mobile Money</h3>
            <p>M-PESA, TigoPesa</p>
          </div>
          <div className="bg-[#020202] p-4 rounded-lg">
            <h3 className="font-bold text-[#C9A84C]">Bank Transfer</h3>
            <p>NCBA KES/USD, SWIFT</p>
          </div>
          <div className="bg-[#020202] p-4 rounded-lg">
            <h3 className="font-bold text-[#C9A84C]">International</h3>
            <p>China Silk Road</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#020202] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-[#C9A84C] mb-4">Make Payment</h2>
            
            <div className="space-y-4">
              <select 
                className="w-full p-3 bg-[#070F1A] rounded-lg border border-[#C9A84C]/30"
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
              >
                <option value="">Select Payment Channel</option>
                {channels.map(([key, channel]) => (
                  <option key={key} value={key}>
                    {channel.name} - {channel.currencies.join('/')}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Amount"
                  className="p-3 bg-[#070F1A] rounded-lg border border-[#C9A84C]/30"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <select
                  className="p-3 bg-[#070F1A] rounded-lg border border-[#C9A84C]/30"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="KES">KES</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="CNY">CNY</option>
                </select>
              </div>

              <button
                onClick={handlePayment}
                disabled={!selectedChannel || !amount || loading}
                className="w-full py-3 bg-[#C9A84C] text-[#020202] rounded-lg font-bold hover:bg-[#C9A84C]/80 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Process Payment'}
              </button>
            </div>
          </div>

          {result && (
            <div className="bg-[#020202] p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-[#C9A84C] mb-4">Payment Instructions</h2>
              <p className="text-green-500 mb-2">Reference: {result.reference}</p>
              {result.qrCode && (
                <img src={result.qrCode} alt="Payment QR" className="mx-auto mb-4 w-48 h-48" />
              )}
              <ul className="space-y-2">
                {result.instructions?.map((inst: string, i: number) => (
                  <li key={i} className="text-sm bg-[#070F1A] p-2 rounded">• {inst}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
