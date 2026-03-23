// app/jetpro/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, BarChart3, Users, Settings, TrendingUp } from 'lucide-react';

export default function JetProPowerwashPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-900 to-sky-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-6xl mb-4">??</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">JetPro Powerwash</h1>
          <p className="text-xl text-sky-200 max-w-2xl">
            Powered by Titanium ERP | Amanda AI Integration | 26 African Countries
          </p>
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-white text-sky-900 rounded-lg font-semibold hover:shadow-lg transition">
              Get Started
            </button>
            <Link href="/titanium-dashboard">
              <button className="px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition">
                View Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">??</div>
            <div className="text-2xl font-bold text-sky-600">Coming Soon</div>
            <div className="text-sm text-gray-600 mt-1">Active Operations</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">??</div>
            <div className="text-2xl font-bold text-sky-600">AI-Powered</div>
            <div className="text-sm text-gray-600 mt-1">Intelligent Automation</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">??</div>
            <div className="text-2xl font-bold text-sky-600">26</div>
            <div className="text-sm text-gray-600 mt-1">Countries Covered</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">?</div>
            <div className="text-2xl font-bold text-sky-600">24/7</div>
            <div className="text-sm text-gray-600 mt-1">Amanda AI Support</div>
          </div>
        </div>
        
        {/* Features Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-sky-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Operations</h3>
            <p className="text-gray-600">Leverage Amanda AI for intelligent decision-making and automation</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="text-sky-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
            <p className="text-gray-600">Monitor performance with live dashboards and insights</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="text-sky-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">30% Profit Margin</h3>
            <p className="text-gray-600">Optimized operations for maximum profitability</p>
          </div>
        </div>
        
        {/* Integration Status */}
        <div className="bg-gradient-to-r from-sky-50 to-sky-100 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Titanium ERP Integration</h2>
          <p className="text-gray-600 mb-6">Fully integrated with the Sovereign Intelligence Brain</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Finance Module</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">HR Module</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Inventory Module</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">CRM Module</span>
            </div>
          </div>
        </div>
        
        {/* Coming Soon Banner */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full">
            <span className="font-semibold">?? Full Platform Launching Soon</span>
            <span className="mx-2">•</span>
            <span>Enhanced features with Amanda AI integration</span>
          </div>
        </div>
      </div>
    </div>
  );
}
