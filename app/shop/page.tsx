'use client';
import { useState } from 'react';
import Navbar from '@/app/components/layout/Navbar';
import { ShoppingCart, Star, Users } from 'lucide-react';

export default function ShopPage() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState('all');

  const products = {
    courses: [
      { id: 'c1', name: 'Sovereign Intelligence Masterclass', description: 'Complete AI training with 4K video', price: 38999, originalPrice: 49999, category: 'courses', rating: 4.8, sales: 1247, features: ['4K Video', 'Certificate', 'Lifetime Access'] },
      { id: 'c2', name: 'AI Data Labeling Professional', description: 'Master image annotation and NLP tagging', price: 25999, originalPrice: 34999, category: 'courses', rating: 4.7, sales: 892, features: ['Hands-on Projects', 'QA Guidelines', 'Certification'] },
      { id: 'c3', name: 'Business Japanese for AI', description: 'Technical Japanese for AI professionals', price: 32499, originalPrice: 39999, category: 'courses', rating: 4.9, sales: 567, features: ['Native Speakers', 'Technical Glossary', 'Business Etiquette'] }
    ],
    certificates: [
      { id: 'cert1', name: '3D Embossed Golden Certificate', description: 'Physical certificate with gold foil', price: 6499, category: 'certificates', features: ['Gold Foil', 'QR Verification', 'Worldwide Shipping'] },
      { id: 'cert2', name: 'Certificate Frame - Premium', description: 'Elegant wooden frame with gold trim', price: 3999, category: 'certificates', features: ['Solid Wood', 'Gold Trim', 'Glass Front'] }
    ],
    services: [
      { id: 's1', name: '1-on-1 Mentorship Session', description: '60-minute session with industry expert', price: 14999, category: 'services', features: ['60-min Video Call', 'Career Planning', 'Portfolio Review'] },
      { id: 's2', name: 'CV Optimization Pro', description: 'Professional CV review by AI + human expert', price: 6499, category: 'services', features: ['AI Analysis', 'Human Review', 'Unlimited Revisions'] }
    ],
    merch: [
      { id: 'm1', name: 'Titanium Starter Box', description: 'Branded notebook, metal pen, titanium pin', price: 8999, category: 'merch', features: ['Branded Notebook', 'Metal Pen', 'Titanium Pin'] },
      { id: 'm2', name: 'Titanium Hoodie', description: 'Premium hoodie with embroidered logo', price: 5499, category: 'merch', features: ['Premium Cotton', 'Embroidered Logo', 'Unisex'] },
      { id: 'm3', name: 'Titanium Mug', description: 'Ceramic mug with gold logo', price: 1299, category: 'merch', features: ['Ceramic', 'Gold Logo', 'Dishwasher Safe'] }
    ]
  };

  const allProducts = [...products.courses, ...products.certificates, ...products.services, ...products.merch];
  const filteredProducts = category === 'all' ? allProducts : 
    category === 'courses' ? products.courses :
    category === 'certificates' ? products.certificates :
    category === 'services' ? products.services : products.merch;

  const addToCart = (product: any) => setCart([...cart, { ...product, cartId: Date.now() }]);
  const removeFromCart = (cartId: number) => setCart(cart.filter((item: any) => item.cartId !== cartId));
  const cartTotal = cart.reduce((sum: number, item: any) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-gray-800 z-50 transform transition-transform ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Cart ({cart.length})</h2>
            <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-white">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4">
            {cart.map((item: any) => (
              <div key={item.cartId} className="bg-gray-700/50 p-4 rounded-lg flex gap-3">
                <div className="w-16 h-16 bg-yellow-600/20 rounded flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-yellow-400 font-bold">KES {item.price.toLocaleString()}</p>
                  <button onClick={() => removeFromCart(item.cartId)} className="text-xs text-red-400 hover:text-red-300 mt-1">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-4 mt-4">
            <div className="flex justify-between mb-4">
              <span>Subtotal:</span>
              <span className="font-bold text-yellow-400">KES {cartTotal.toLocaleString()}</span>
            </div>
            <button className="w-full py-3 bg-yellow-600 text-black rounded-lg font-bold hover:bg-yellow-500 transition">
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-b from-gray-900 to-black pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4"><span className="text-yellow-400">Titanium</span> Shop</h1>
              <p className="text-xl text-gray-400">Premium courses, certificates, services, and merchandise</p>
            </div>
            <button onClick={() => setCartOpen(true)} className="relative p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-600 rounded-full text-xs flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3">
          {['all', 'courses', 'certificates', 'services', 'merch'].map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full capitalize transition ${
                category === cat ? 'bg-yellow-600 text-black' : 'bg-gray-800 hover:bg-gray-700'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product: any) => (
            <div key={product.id} className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-400/50 transition">
              <div className="h-48 bg-gradient-to-br from-yellow-600/20 to-purple-600/20 relative flex items-center justify-center">
                <span className="text-4xl">
                  {product.category === 'courses' ? '📚' : product.category === 'certificates' ? '🎓' : product.category === 'services' ? '💼' : '🛍️'}
                </span>
                {product.originalPrice && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    Save {Math.round((1 - product.price/product.originalPrice)*100)}%
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  {product.rating && (
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {product.rating}</span>
                  )}
                  {product.sales && (
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {product.sales}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.slice(0, 2).map((feature: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-gray-700 rounded text-xs">{feature}</span>
                  ))}
                  {product.features.length > 2 && (
                    <span className="px-2 py-1 bg-gray-700 rounded text-xs">+{product.features.length - 2} more</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    {product.originalPrice ? (
                      <>
                        <p className="text-2xl font-bold text-yellow-400">KES {product.price.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 line-through">KES {product.originalPrice.toLocaleString()}</p>
                      </>
                    ) : (
                      <p className="text-2xl font-bold text-yellow-400">KES {product.price.toLocaleString()}</p>
                    )}
                  </div>
                  <button onClick={() => addToCart(product)} className="px-4 py-2 bg-yellow-600 text-black rounded-lg font-bold hover:bg-yellow-500 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
