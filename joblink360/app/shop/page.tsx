// app/shop/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Star, ShoppingCart, Heart, TrendingUp, Clock, Truck, Shield, Award } from 'lucide-react';
import { PRODUCTS, getFeaturedProducts, getBestsellers, getOnSale } from '@/lib/shop/products';

export default function ShopPage() {
  const [products, setProducts] = useState(PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  
  const categories = ['all', ...new Set(PRODUCTS.map(p => p.category))];
  const featuredProducts = getFeaturedProducts();
  const bestsellers = getBestsellers();
  const onSaleProducts = getOnSale();
  
  useEffect(() => {
    let filtered = products;
    
    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Filter by price
    if (priceRange !== 'all') {
      if (priceRange === 'under50') filtered = filtered.filter(p => p.price < 50);
      else if (priceRange === '50to100') filtered = filtered.filter(p => p.price >= 50 && p.price <= 100);
      else if (priceRange === '100to200') filtered = filtered.filter(p => p.price > 100 && p.price <= 200);
      else if (priceRange === 'over200') filtered = filtered.filter(p => p.price > 200);
    }
    
    // Sort
    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'bestseller') filtered.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, priceRange, products]);
  
  const addToCart = (product: any) => {
    // Add to cart logic
    console.log('Added to cart:', product.name);
    alert(`Added ${product.name} to cart!`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">DreamTeQ Sovereign Shop</h1>
          <p className="text-xl text-purple-200 max-w-2xl">
            Premium AI-powered products, courses, and merchandise for the sovereign mind
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Features Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
            <Truck className="text-blue-600" size={24} />
            <div>
              <div className="font-semibold">Free Shipping</div>
              <div className="text-sm text-gray-600">On orders over $100</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
            <Shield className="text-green-600" size={24} />
            <div>
              <div className="font-semibold">Secure Payment</div>
              <div className="text-sm text-gray-600">256-bit encryption</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
            <Award className="text-purple-600" size={24} />
            <div>
              <div className="font-semibold">Premium Quality</div>
              <div className="text-sm text-gray-600">Satisfaction guaranteed</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
            <Clock className="text-orange-600" size={24} />
            <div>
              <div className="font-semibold">24/7 Support</div>
              <div className="text-sm text-gray-600">AI-powered assistance</div>
            </div>
          </div>
        </div>
        
        {/* Featured Sections */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🔥 Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">⭐ Bestsellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏷️ On Sale</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {onSaleProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
        
        {/* All Products with Filters */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="featured">Featured</option>
                <option value="bestseller">Bestseller</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter size={18} /> Filters
                </h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="all">All Prices</option>
                    <option value="under50">Under $50</option>
                    <option value="50to100">$50 - $100</option>
                    <option value="100to200">$100 - $200</option>
                    <option value="over200">Over $200</option>
                  </select>
                </div>
                
                <div className="text-sm text-gray-600">
                  {filteredProducts.length} products found
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart }: { product: any; onAddToCart: (product: any) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group">
      <Link href={`/shop/products/${product.slug}`}>
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          {product.onSale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              SALE
            </div>
          )}
          {product.bestseller && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
              BESTSELLER
            </div>
          )}
          <div className="text-6xl">📦</div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="text-yellow-500" size={14} fill="currentColor" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
        </div>
        
        <Link href={`/shop/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition line-clamp-2">
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
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-1"
          >
            <ShoppingCart size={16} />
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
