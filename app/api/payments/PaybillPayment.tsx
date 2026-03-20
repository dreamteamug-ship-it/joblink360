'use client';
import { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface PaybillPaymentProps {
  amount: number;
  onSuccess?: () => void;
}

export default function PaybillPayment({ amount, onSuccess }: PaybillPaymentProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [reference] = useState(`ALT-${Date.now()}`);
  
  const paymentDetails = {
    paybill: "400200",
    account: "40045731",
    amount: amount.toLocaleString(),
    reference
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/20">
      <h3 className="text-xl font-bold text-yellow-400 mb-4">💳 Pay via M-PESA Paybill</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
          <div>
            <p className="text-sm text-gray-400">Paybill Number</p>
            <p className="text-lg font-bold text-yellow-400">{paymentDetails.paybill}</p>
          </div>
          <button 
            onClick={() => copyToClipboard(paymentDetails.paybill, 'paybill')}
            className="p-2 hover:bg-gray-600 rounded-lg transition"
          >
            {copied === 'paybill' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
          </button>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
          <div>
            <p className="text-sm text-gray-400">Account Number</p>
            <p className="text-lg font-bold text-yellow-400">{paymentDetails.account}</p>
          </div>
          <button 
            onClick={() => copyToClipboard(paymentDetails.account, 'account')}
            className="p-2 hover:bg-gray-600 rounded-lg transition"
          >
            {copied === 'account' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
          </button>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
          <div>
            <p className="text-sm text-gray-400">Amount (KES)</p>
            <p className="text-lg font-bold text-green-400">{paymentDetails.amount}</p>
          </div>
          <button 
            onClick={() => copyToClipboard(paymentDetails.amount, 'amount')}
            className="p-2 hover:bg-gray-600 rounded-lg transition"
          >
            {copied === 'amount' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
          </button>
        </div>

        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
          <p className="text-sm text-blue-400 font-mono">Reference: {reference}</p>
          <p className="text-xs text-gray-400 mt-1">Use this reference when checking payment status</p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-300">
        <p className="font-bold text-yellow-400">📱 Instructions:</p>
        <p>1. Go to M-PESA on your phone</p>
        <p>2. Select "Lipa Na M-PESA"</p>
        <p>3. Select "Paybill"</p>
        <p>4. Enter Business No: <span className="text-yellow-400">{paymentDetails.paybill}</span></p>
        <p>5. Enter Account No: <span className="text-yellow-400">{paymentDetails.account}</span></p>
        <p>6. Enter Amount: <span className="text-green-400">KES {paymentDetails.amount}</span></p>
        <p>7. Enter your M-PESA PIN and confirm</p>
      </div>

      <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
        <p className="text-sm text-yellow-400 flex items-center gap-2">
          <span className="text-2xl">⏱️</span>
          Payment will be confirmed within 1 minute. The page will auto-refresh.
        </p>
      </div>
    </div>
  );
}