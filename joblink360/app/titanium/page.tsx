// app/titanium/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { TITANIUM_CONFIG, TOTAL_MODULES } from '@/lib/titanium/config';

export default function TitaniumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">🏛️ Titanium ERP</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            The Sovereign Intelligence Brain - Powering 9 Subsidiaries with 50+ AI Modules
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/titanium-dashboard">
              <button className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 transition">
                Launch Dashboard
              </button>
            </Link>
            <a href="https://jetpro-powerwash.odoo.com" target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition">
                Access Odoo Backend
              </button>
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-2">⚙️</div>
            <div className="text-3xl font-bold text-blue-600">{TOTAL_MODULES}</div>
            <div className="text-gray-600">AI-Powered Modules</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-2">🤖</div>
            <div className="text-3xl font-bold text-blue-600">312</div>
            <div className="text-gray-600">Intelligent Agents</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-2">🏢</div>
            <div className="text-3xl font-bold text-blue-600">9</div>
            <div className="text-gray-600">Subsidiary Companies</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-2">📊</div>
            <div className="text-3xl font-bold text-blue-600">90%</div>
            <div className="text-gray-600">AI Automation</div>
          </div>
        </div>
        
        {/* Module Categories */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Module Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TITANIUM_CONFIG.categories.map(cat => (
            <div key={cat.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <div className={`text-3xl bg-${cat.color}-100 p-2 rounded-lg`}>{cat.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{cat.name}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {getModuleDescription(cat.id)}
              </p>
              <div className="flex flex-wrap gap-2">
                {getModuleList(cat.id).map((module, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {module}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Subsidiary Integration */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🏢 Connected Subsidiaries</h2>
          <p className="text-gray-600 mb-6">Titanium ERP powers all 9 subsidiary companies with unified data and AI intelligence</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {subsidiaries.map(sub => (
              <div key={sub.name} className="bg-white rounded-lg p-4 text-center shadow">
                <div className="text-2xl mb-2">{sub.icon}</div>
                <div className="font-semibold text-gray-900 text-sm">{sub.name}</div>
                <div className="text-xs text-gray-500">{sub.agents} AI Agents</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getModuleDescription(categoryId: string): string {
  const descriptions: Record<string, string> = {
    finance: 'Complete financial management, accounting, and BI analytics',
    sales: 'AI-powered CRM, sales automation, and customer engagement',
    supplyChain: 'Inventory, manufacturing, procurement, and quality control',
    hr: 'Talent management, recruitment, fleet, and performance',
    marketing: 'Marketing automation, project management, helpdesk',
    ecommerce: 'Website builder, e-commerce, blog, and live chat',
    education: 'eLearning platform, certifications, and assessments',
    iot: 'IoT device management, telematics, and fleet tracking',
    logistics: 'Lori matchmaker, cross-border trade, fleet management',
    energy: 'EV mobility, carbon credit trading, charging network',
    agriculture: 'Farm management, agritech, and farmer loan scoring',
    urban: 'Smart parking, landscaping, and irrigation systems'
  };
  return descriptions[categoryId] || 'Integrated AI-powered business management';
}

function getModuleList(categoryId: string): string[] {
  const modules: Record<string, string[]> = {
    finance: ['Accounting', 'Invoicing', 'Expenses', 'BI', 'Documents', 'Sign'],
    sales: ['CRM', 'Sales', 'POS', 'Subscriptions', 'Rental', 'Website'],
    supplyChain: ['Inventory', 'Manufacturing', 'Procurement', 'Maintenance', 'Quality', 'PLM'],
    hr: ['Employees', 'Recruitment', 'Time Off', 'Appraisals', 'Fleet'],
    marketing: ['Marketing', 'Projects', 'Field Service', 'Helpdesk', 'Appointments', 'WhatsApp'],
    ecommerce: ['Website', 'eCommerce', 'Blog', 'Forum', 'LiveChat'],
    education: ['eLearning', 'Certifications', 'Assessments'],
    iot: ['IoT Devices', 'Telematics', 'Fleet Analytics'],
    logistics: ['Lori Matchmaker', 'Cross-Border', 'Fleet Management'],
    energy: ['EV Fleet', 'Carbon Trading', 'Charging Network'],
    agriculture: ['Farm Management', 'AgriTech', 'Loan Scoring'],
    urban: ['Smart Parking', 'Landscaping', 'Irrigation']
  };
  return modules[categoryId] || [];
}

const subsidiaries = [
  { name: 'JobLinks Africa', icon: '💼', agents: 84 },
  { name: 'Altovex Global', icon: '🚚', agents: 52 },
  { name: 'DreamTeQ 360', icon: '🌾', agents: 48 },
  { name: 'SinoAfric EV', icon: '⚡', agents: 32 },
  { name: 'Urbanis Parks', icon: '🅿️', agents: 28 },
  { name: 'JetPro Powerwash', icon: '🧼', agents: 24 },
  { name: 'Lori Matchmaker', icon: '🚛', agents: 18 },
  { name: 'Carbon Credit Exchange', icon: '🌱', agents: 14 },
  { name: 'Digital Den IoT', icon: '📡', agents: 12 }
];
