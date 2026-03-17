// app/payments/success/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    if (reference) {
      setTimeout(() => {
        setStatus('success');
      }, 2000);
    }
  }, [reference]);

  if (status === 'verifying') {
    return (
      <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-[#020202] p-8 rounded-lg">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-[#C9A84C] mb-2">Payment Successful!</h1>
          <p className="text-[#F5F5DC]/60">Thank you for your purchase</p>
        </div>

        <div className="bg-[#070F1A]/50 p-4 rounded-lg mb-6">
          <div className="flex justify-between py-2 border-b border-[#C9A84C]/20">
            <span>Reference</span>
            <span className="font-mono text-sm">{reference}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link href="/dashboard">
            <button className="w-full py-3 bg-[#C9A84C] text-[#020202] rounded-lg font-bold hover:bg-[#C9A84C]/80 transition">
              Go to Dashboard
            </button>
          </Link>
          <Link href="/payments">
            <button className="w-full py-3 border border-[#C9A84C]/30 text-[#C9A84C] rounded-lg font-bold hover:bg-[#C9A84C]/10 transition">
              Make Another Payment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}