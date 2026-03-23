"use client";

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Building2, Users, Truck, ShoppingCart, 
  BookOpen, Cpu, Globe, Leaf, Car, Battery, Sprout, 
  City, TrendingUp, Shield, Award, Settings 
} from 'lucide-react';

export default function TitaniumERPComplete() {
  const modules = {
    'Finance & Accounting': {
      icon: <DollarSign className="text-green-600" size={24} />,
      modules: ['Accounting', 'Invoicing', 'Expenses', 'BI Analytics', 'Documents', 'Digital Sign'],
      path: 'finance'
    },
    'Sales & CRM': {
      icon: <TrendingUp className="text-blue-600" size={24} />,
      modules: ['CRM', 'Sales Orders', 'Point of Sale', 'Subscriptions', 'Rental', 'Website'],
      path: 'sales'
    },
    'Supply Chain': {
      icon: <Truck className="text-orange-600" size={24} />,
      modules: ['Inventory', 'Manufacturing', 'Procurement', 'Maintenance', 'Quality', 'PLM'],
      path: 'supply-chain'
    },
    'Human Resources': {
      icon: <Users className="text-purple-600" size={24} />,
      modules: ['Employees', 'Recruitment', 'Time Off', 'Appraisals', 'Fleet'],
      path: 'hr'
    },
    'Marketing & Services': {
      icon: <Globe className="text-pink-600" size={24} />,
      modules: ['Marketing Automation', 'Projects', 'Field Service', 'Helpdesk', 'Appointments', 'WhatsApp'],
      path: 'marketing'
    },
    'E-commerce': {
      icon: <ShoppingCart className="text-teal-600" size={24} />,
      modules: ['Website Builder', 'eCommerce', 'Blog', 'Forum', 'Live Chat'],
      path: 'ecommerce'
    },
    'Education & eLearning': {
      icon: <BookOpen className="text-indigo-600" size={24} />,
      modules: ['eLearning Platform', 'Certifications', 'Assessments'],
      path: 'education'
    },
    'IoT & Technology': {
      icon: <Cpu className="text-cyan-600" size={24} />,
      modules: ['IoT Devices', 'Telematics', 'Fleet Analytics'],
      path: 'iot'
    },
    'Logistics & Transport': {
      icon: <Truck className="text-amber-600" size={24} />,
      modules: ['Lori Matchmaker', 'Cross-Border Trade', 'Fleet Management'],
      path: 'logistics'
    },
    'Energy & EV': {
      icon: <Battery className="text-yellow-600" size={24} />,
      modules: ['EV Fleet Management', 'Carbon Credit Trading', 'Charging Network'],
      path: 'energy'
    },
    'Agriculture': {
      icon: <Sprout className="text-lime-600" size={24} />,
      modules: ['Farm Management', 'AgriTech Solutions', 'Farmer Loan Scoring'],
      path: 'agriculture'
    },
    'Urban & Smart City': {
      icon: <City className="text-rose-600" size={24} />,
      modules: ['Smart Parking', 'Landscaping', 'Irrigation Systems'],
      path: 'urban'
    }
  };

  const subsidiaries = [
    { name: 'JobLinks Africa', icon: '??', sector: 'Recruitment', valuation: '$25M' },
    { name: 'Altovex Global', icon: '??', sector: 'Logistics', valuation: '$18M' },
    { name: 'DreamTeQ 360', icon: '??', sector: 'AgriTech', valuation: '$15M' },
    { name: 'SinoAfric EV', icon: '?', sector: 'EV Mobility', valuation: '$12M' },
    { name: 'Urbanis Parks', icon: '???', sector: 'Smart Parking', valuation: '$8M' },
    { name: 'JetPro Powerwash', icon: '??', sector: 'Services', valuation: '$6M' },
    { name: 'Lori Matchmaker', icon: '??', sector: 'Logistics Tech', valuation: '$5M' },
    { name: 'Carbon Credit Exchange', icon: '??', sector: 'Green Tech', valuation: '$4M' },
    { name: 'Digital Den IoT', icon: '??', sector: 'IoT', valuation: '$7M' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Building2 size={40} />
            <h1 className="text-4xl font-bold">Titanium ERP Suite</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-3xl">
            Complete Enterprise Resource Planning System • 50+ AI-Powered Modules • 312 Intelligent Agents
          </p>
          <div className="mt-6 flex gap-3">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">$100M</div>
              <div className="text-sm">Valuation Goal</div>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">90%</div>
              <div className="text-sm">Automation Rate</div>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">9</div>
              <div className="text-sm">Subsidiaries</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Executive Dashboard Link */}
        <div className="mb-8">
          <Link href="/titanium-dashboard">
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition">
              ??? Launch Executive Dashboard
            </button>
          </Link>
        </div>

        {/* Module Categories */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">?? AI-Powered Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.entries(modules).map(([category, data]) => (
            <div key={category} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6">
              <div className="flex items-center gap-3 mb-4">
                {data.icon}
                <h3 className="text-lg font-bold text-gray-900">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {data.modules.map((mod, i) => (
                  <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {mod}
                  </span>
                ))}
              </div>
              <Link href={`/titanium-erp/${data.path}`}>
                <button className="w-full mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm">
                  View Module ?
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Subsidiary Integration */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">?? Subsidiary Companies</h2>
          <p className="text-gray-600 mb-6">Fully integrated with Titanium ERP for unified operations</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {subsidiaries.map(sub => (
              <div key={sub.name} className="bg-white rounded-lg p-4 text-center shadow">
                <div className="text-3xl mb-2">{sub.icon}</div>
                <div className="font-semibold text-gray-900 text-sm">{sub.name}</div>
                <div className="text-xs text-gray-500">{sub.sector}</div>
                <div className="text-xs font-bold text-green-600 mt-1">{sub.valuation}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Swarm Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">?? AI Swarm Intelligence</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Active Agents</span>
                  <span className="font-bold text-blue-600">312/312</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Automation Coverage</span>
                  <span className="font-bold text-blue-600">90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="pt-2 text-sm text-gray-600">
                <Shield className="inline mr-1" size={14} /> Sovereign Intelligence • Real-time Processing • 24/7 Operations
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">? Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                Generate Report
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                Sync All Modules
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
                AI Insights
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm">
                Deploy Agent
              </button>
            </div>
          </div>
        </div>
        
        {/* Odoo Integration Status */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">?? Odoo Backend Integration</h3>
              <p className="text-sm text-gray-600 mt-1">Real-time sync with JetPro Powerwash Odoo instance</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600">Connected</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <a href="https://jetpro-powerwash.odoo.com" target="_blank" rel="noopener noreferrer">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Access Odoo Backend ?
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
