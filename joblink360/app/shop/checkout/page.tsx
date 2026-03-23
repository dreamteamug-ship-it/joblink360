// app/shop/checkout/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CreditCard, Lock, ArrowLeft, Smartphone, Globe, DollarSign, Shield, CheckCircle } from 'lucide-react';
import { AFRICAN_COUNTRIES, formatPrice, getExchangeRate } from '@/lib/shop/countries';
import { paymentProcessor, PAYMENT_PROVIDERS } from '@/lib/shop/payments';

export default function EnhancedCheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('KE');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('mpesa');
  const [processing, setProcessing] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [displayCurrency, setDisplayCurrency] = useState('USD');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  
  useEffect(() => {
    const savedCart = localStorage.getItem('shop_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      router.push('/shop');
    }
  }, [router]);
  
  useEffect(() => {
    // Update currency when country changes
    const country = AFRICAN_COUNTRIES.find(c => c.code === selectedCountry);
    if (country) {
      setDisplayCurrency(country.currencyCode);
      const usdAmount = 1;
      const converted = getExchangeRate('USD', country.currencyCode, usdAmount);
      setExchangeRate(converted);
    }
  }, [selectedCountry]);
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const totalUSD = subtotal + shipping + tax;
  
  // Convert to selected currency
  const country = AFRICAN_COUNTRIES.find(c => c.code === selectedCountry);
  const exchangeRateValue = country ? country.exchangeRate : 1;
  const totalLocal = totalUSD * exchangeRateValue;
  
  const getPaymentMethodsForCountry = () => {
    const countryData = AFRICAN_COUNTRIES.find(c => c.code === selectedCountry);
    if (!countryData) return [];
    
    const methods = [];
    if (countryData.paymentMethods.includes('mpesa')) methods.push({ id: 'mpesa', name: 'M-Pesa', icon: '??' });
    if (countryData.paymentMethods.includes('mobile_money')) methods.push({ id: 'mobile_money', name: 'Mobile Money', icon: '??' });
    if (countryData.paymentMethods.includes('cards')) methods.push({ id: 'cards', name: 'Card Payment', icon: '??' });
    if (countryData.paymentMethods.includes('paypal')) methods.push({ id: 'paypal', name: 'PayPal', icon: '??' });
    if (countryData.paymentMethods.includes('stripe')) methods.push({ id: 'stripe', name: 'Stripe', icon: '?' });
    
    // Add African-specific methods
    if (selectedCountry === 'KE' || selectedCountry === 'UG' || selectedCountry === 'TZ') {
      methods.push({ id: 'afripesa', name: 'AfriPesa', icon: '??' });
    }
    if (selectedCountry === 'ZW') {
      methods.push({ id: 'ecocash', name: 'EcoCash', icon: '??' });
    }
    if (selectedCountry === 'NG') {
      methods.push({ id: 'flutterwave', name: 'Flutterwave', icon: '??' });
    }
    
    return methods;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    const paymentRequest = {
      amount: totalLocal,
      currency: displayCurrency,
      country: selectedCountry,
      paymentMethod: selectedPaymentMethod,
      orderId: `ORD-${Date.now()}`,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      callbackUrl: `${window.location.origin}/shop/orders/success`
    };
    
    const result = await paymentProcessor.processPayment(paymentRequest);
    
    if (result.success) {
      localStorage.removeItem('shop_cart');
      router.push(`/shop/orders/success?txn=${result.transactionId}`);
    } else {
      alert('Payment failed. Please try again.');
    }
    
    setProcessing(false);
  };
  
  if (cart.length === 0) return null;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/shop/cart" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Country Selection */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe size={20} /> Select Country
                </h2>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {AFRICAN_COUNTRIES.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name} - {country.currencySymbol}{country.currencyCode}
                    </option>
                  ))}
                </select>
                {country && (
                  <div className="mt-3 text-sm text-green-600 bg-green-50 p-2 rounded">
                    ?? Exchange Rate: 1 USD = {country.currencySymbol}{exchangeRate.toFixed(2)} {country.currencyCode}
                  </div>
                )}
              </div>
              
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+254 700 000000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard size={20} /> Select Payment Method
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {getPaymentMethodsForCountry().map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`p-3 border rounded-lg text-center transition ${
                        selectedPaymentMethod === method.id
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{method.icon}</div>
                      <div className="text-sm font-medium">{method.name}</div>
                    </button>
                  ))}
                </div>
                
                {selectedPaymentMethod === 'mpesa' && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800 flex items-center gap-2">
                      <Smartphone size={16} /> You will receive a prompt on your phone to enter M-Pesa PIN
                    </p>
                  </div>
                )}
                
                {selectedPaymentMethod === 'paypal' && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">You will be redirected to PayPal to complete payment securely</p>
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={processing}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Pay {formatPrice(totalLocal, displayCurrency)}
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {cart.slice(0, 3).map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)} USD</span>
                </div>
              ))}
              {cart.length > 3 && (
                <div className="text-sm text-gray-500">+ {cart.length - 3} more items</div>
              )}
            </div>
            <div className="border-t border-gray-200 pt-2 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal (USD)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total (USD)</span>
                  <span className="text-blue-600">${totalUSD.toFixed(2)}</span>
                </div>
                {country && (
                  <div className="flex justify-between text-sm mt-2 text-green-600">
                    <span>Total ({country.currencyCode})</span>
                    <span className="font-bold">{formatPrice(totalLocal, displayCurrency)}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield size={14} />
                <span>Your payment is secured with 256-bit encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
