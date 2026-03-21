// app/shop/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadProducts();
    loadCartCount();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const loadProducts = async () => {
    const response = await fetch('/api/shop/products');
    const data = await response.json();
    setProducts(data.products || []);
    setLoading(false);
  };

  const loadCartCount = async () => {
    const response = await fetch('/api/shop/cart/count');
    const data = await response.json();
    setCartCount(data.count || 0);
  };

  const addToCart = async (productId: string) => {
    if (!user) {
      alert('Please sign in to add items to cart');
      window.location.href = '/login';
      return;
    }
    
    const response = await fetch('/api/shop/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1 })
    });
    const data = await response.json();
    if (data.success) {
      loadCartCount();
      alert('Added to cart!');
    }
  };

  if (loading) return <div className="min-h-screen bg-black text-white p-8">Loading shop...</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-zinc-900 to-black py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1 border border-amber-500/30 rounded-full bg-amber-500/10">
            <span className="text-amber-500 text-sm">Digital Marketplace</span>
          </div>
          <h1 className="text-6xl font-black text-amber-500 mb-4">JobLink Shop</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Premium courses, AI tools, and resources to accelerate your career
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/shop/cart" className="relative inline-block">
              <span className="bg-amber-600 px-6 py-3 rounded-lg font-bold hover:bg-amber-500 transition">🛒 Cart ({cartCount})</span>
            </Link>
            <Link href="/lms" className="border border-amber-500 px-6 py-3 rounded-lg font-bold hover:bg-amber-500/10 transition">Browse Courses</Link>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div key={product.id} className="group border border-zinc-800 bg-zinc-900/50 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all hover:bg-zinc-900">
              <div className="aspect-square bg-zinc-800 relative">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">{product.icon || '📚'}</div>
                )}
                {product.discount && <div className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded text-xs">-{product.discount}%</div>}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">{product.name}</h3>
                <p className="text-zinc-400 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    {product.original_price && <span className="text-zinc-500 line-through text-sm mr-2">KES {product.original_price}</span>}
                    <span className="text-amber-500 font-bold text-xl">KES {product.price}</span>
                  </div>
                  <button onClick={() => addToCart(product.id)} className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-lg text-sm font-bold transition">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}