// app/shop/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Star, ShoppingCart, Heart, Search, Filter, TrendingUp, 
  Clock, Truck, Shield, Award, Crown, Sparkles, Diamond,
  Play, Users, Globe, ChevronRight, Infinity, Zap
} from 'lucide-react';
import { PRODUCTS, getFeaturedProducts, getBestsellers, getOnSale } from '@/lib/shop/products';

export default function LuxuryShopPage() {
  const [products, setProducts] = useState(PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [showLuxuryIntro, setShowLuxuryIntro] = useState(true);
  
  const categories = ['all', ...new Set(PRODUCTS.map(p => p.category))];
  const featuredProducts = getFeaturedProducts().slice(0, 4);
  const bestsellers = getBestsellers().slice(0, 4);
  const onSaleProducts = getOnSale().slice(0, 4);
  
  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);
  
  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('shop_cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        quantity: 1,
        image: product.images?.[0]
      });
    }
    
    localStorage.setItem('shop_cart', JSON.stringify(cart));
    
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-fade-in';
    toast.innerHTML = `<div class="flex items-center gap-2"><span class="text-xl">?</span> Added ${product.name} to your luxury cart</div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Luxury Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
              <Crown className="text-yellow-500" size={18} />
              <span className="text-sm font-medium">Sovereign African Luxury Collection</span>
              <Sparkles className="text-yellow-500" size={18} />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-purple-200 bg-clip-text text-transparent">
              The Pinnacle of<br />African Excellence
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Discover exclusive luxury products, AI-powered courses, and bespoke services crafted for the discerning sovereign
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#featured">
                <button className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold rounded-full hover:shadow-xl transition flex items-center gap-2">
                  Explore Collection <ChevronRight size={18} />
                </button>
              </Link>
              <Link href="/shop/categories">
                <button className="px-8 py-3 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition">
                  Bespoke Services
                </button>
              </Link>
            </div>
          </div>
          
          {/* Luxury Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">50+</div>
              <div className="text-sm text-gray-300">Luxury Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">26</div>
              <div className="text-sm text-gray-300">African Nations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">12</div>
              <div className="text-sm text-gray-300">Payment Methods</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">24/7</div>
              <div className="text-sm text-gray-300">White-Glove Service</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Collections */}
        <div id="featured" className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Collections</h2>
              <p className="text-gray-600">Curated selections for the modern African sovereign</p>
            </div>
            <Link href="/shop/all">
              <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View All <ChevronRight size={16} />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <LuxuryProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
        
        {/* Bestsellers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">? Bestsellers</h2>
          <p className="text-gray-600 mb-8">Our most coveted luxury items</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {bestsellers.map(product => (
              <LuxuryProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
        
        {/* Luxury Experience Banner */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-4">
                <Diamond size={16} />
                <span className="text-sm">White-Glove Service</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">Experience the Sovereign Difference</h3>
              <p className="text-gray-300 mb-6">Every purchase includes our signature white-glove service, priority shipping, and lifetime concierge support.</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="text-yellow-500" />
                  <span>Complimentary express delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="text-yellow-500" />
                  <span>Extended luxury warranty</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="text-yellow-500" />
                  <span>Personal shopping assistant</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">??</div>
                <div className="text-2xl font-bold text-white">Sovereign Elite</div>
                <div className="text-sm text-white/80 mt-2">Limited membership available</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* All Products with Filters */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">All Luxury Products</h2>
              <p className="text-gray-600 mt-1">Discover our complete collection</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search luxury items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 20).map(product => (
              <LuxuryProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">??</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No luxury items found</h3>
              <p className="text-gray-600">Try adjusting your search or browse our collections</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LuxuryProductCard({ product, onAddToCart }: { product: any; onAddToCart: (product: any) => void }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transform group-hover:scale-110 transition duration-500">
          <div className="text-6xl">
            {product.category === 'Courses' ? '??' : 
             product.category === 'Digital Products' ? '??' :
             product.category === 'Merchandise' ? '??' : '??'}
          </div>
        </div>
        {product.onSale && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            SALE
          </div>
        )}
        {product.bestseller && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Star size={12} fill="currentColor" /> BESTSELLER
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="text-yellow-500 fill-current" size={14} />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        
        <Link href={`/shop/products/${product.slug}`}>
          <h3 className="font-bold text-gray-900 mb-2 hover:text-blue-600 transition line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-blue-600">${product.price}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">${product.compareAtPrice}</span>
            )}
          </div>
          
          <button
            onClick={() => onAddToCart(product)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2"
          >
            <ShoppingCart size={16} />
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
