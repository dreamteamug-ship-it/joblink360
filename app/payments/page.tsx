// app/payments/page.tsx
'use client';
import { useState } from 'react';
import { PAYMENT_CHANNELS } from '@/lib/payments/payment-config';

export default function PaymentsPage() {
  const [selectedChannel, setSelectedChannel] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  const handlePayment = async () => {
    const res = await fetch('/api/payments/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        channel: selectedChannel, 
        amount: parseFloat(amount),
        currency: 'KES'
      })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#C9A84C] mb-4">💰 Payment Hub</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#020202] p-6 rounded-lg">
            <select 
              className="w-full p-3 mb-4 bg-[#070F1A] rounded"
              onChange={(e) => setSelectedChannel(e.target.value)}
            >
              <option value="">Select Channel</option>
              {Object.keys(PAYMENT_CHANNELS).map(key => (
                <option key={key} value={key}>{PAYMENT_CHANNELS[key].name}</option>
              ))}
            </select>
            
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-3 mb-4 bg-[#070F1A] rounded"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            
            <button
              onClick={handlePayment}
              className="w-full py-3 bg-[#C9A84C] text-[#020202] rounded font-bold"
            >
              Process Payment
            </button>
          </div>

          {result && (
            <div className="bg-[#020202] p-6 rounded-lg">
              <p className="text-green-500">Reference: {result.reference}</p>
              <ul className="mt-4 space-y-2">
                {result.instructions?.map((i: string, idx: number) => (
                  <li key={idx} className="text-sm">• {i}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}