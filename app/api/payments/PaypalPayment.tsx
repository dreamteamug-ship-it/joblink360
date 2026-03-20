'use client';
import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PaypalPaymentProps {
  amount: number;
  currency?: string;
  onSuccess?: (details: any) => void;
}

export default function PaypalPayment({ amount, currency = 'USD', onSuccess }: PaypalPaymentProps) {
  const [error, setError] = useState<string | null>(null);

  // Convert KES to USD (approximate - use real exchange rate in production)
  const usdAmount = currency === 'KES' ? (amount / 130).toFixed(2) : amount;

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/20">
      <h3 className="text-xl font-bold text-yellow-400 mb-4">💳 Pay with PayPal</h3>
      
      <PayPalScriptProvider options={{ 
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb',
        currency: 'USD'
      }}>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: usdAmount.toString(),
                  currency_code: 'USD'
                },
                description: `JobLink360 Payment`
              }]
            });
          }}
          onApprove={async (data, actions) => {
            if (actions.order) {
              const details = await actions.order.capture();
              onSuccess?.(details);
            }
          }}
          onError={(err) => {
            setError('Payment failed. Please try again.');
            console.error('PayPal error:', err);
          }}
        />
      </PayPalScriptProvider>

      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}