'use client';
// app/shop/checkout/page.tsx
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const response = await fetch('/api/shop/cart');
    const data = await response.json();
    setCart(data);
    setLoading(false);
  };

  const processPayment = async () => {
    setProcessing(true);
    
    const response = await fetch('/api/shop/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart: cart.items,
        total: cart.total,
        paymentMethod,
        phone: paymentMethod === 'mpesa' ? phone : null
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert('Order placed successfully! Check your phone for payment confirmation.');
      router.push('/shop/orders');
    } else {
      alert('Payment failed: ' + data.error);
    }
    setProcessing(false);
  };

  if (loading) return <div className="min-h-screen bg-black text-white p-8">Loading...</div>;
  if (cart.items.length === 0) return (
    <div className="min-h-screen bg-black text-white p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
      <Link href="/shop" className="bg-amber-600 px-6 py-3 rounded-lg">Continue Shopping</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-500 mb-8">Checkout</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-zinc-900 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            {cart.items.map((item: any) => (
              <div key={item.id} className="flex justify-between py-2 border-b border-zinc-800">
                <span>{item.products?.name} x {item.quantity}</span>
                <span>KES {item.products?.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between pt-4 font-bold">
              <span>Total</span>
              <span className="text-amber-500">KES {cart.total}</span>
            </div>
          </div>
          
          {/* Payment Section */}
          <div className="bg-zinc-900 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg cursor-pointer">
                <input type="radio" name="payment" value="mpesa" checked={paymentMethod === 'mpesa'} onChange={() => setPaymentMethod('mpesa')} />
                <span>ðŸ‡°ðŸ‡ª M-PESA</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg cursor-pointer">
                <input type="radio" name="payment" value="stripe" checked={paymentMethod === 'stripe'} onChange={() => setPaymentMethod('stripe')} />
                <span>ðŸ’³ Credit/Debit Card (Stripe)</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg cursor-pointer">
                <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} />
                <span>ðŸ“± PayPal</span>
              </label>
            </div>
            
            {paymentMethod === 'mpesa' && (
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number (e.g., 254718554383)" className="w-full p-3 mb-4 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-amber-500 outline-none" />
            )}
            
            <button onClick={processPayment} disabled={processing} className="w-full bg-amber-600 hover:bg-amber-500 p-3 rounded-lg font-bold transition disabled:opacity-50">
              {processing ? 'Processing...' : `Pay KES ${cart.total}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

