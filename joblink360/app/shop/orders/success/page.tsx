// app/shop/orders/success/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle, ShoppingBag, Home } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Order Number: <span className="font-mono font-bold">DREAM-{Math.floor(Math.random() * 100000)}</span></p>
            <p className="text-sm text-gray-600">You will receive a confirmation email shortly.</p>
          </div>
          
          <div className="space-y-3">
            <Link href="/shop">
              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                <ShoppingBag size={18} />
                Continue Shopping
              </button>
            </Link>
            <Link href="/">
              <button className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <Home size={18} />
                Return Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
