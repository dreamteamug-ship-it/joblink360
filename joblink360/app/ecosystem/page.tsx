// app/ecosystem/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Building2, Briefcase, Truck, Car, Sprout, 
  ParkingSquare, Landmark, Cpu, Droplets, 
  Factory, TrendingUp, Users, Globe, Crown,
  ArrowRight, Activity, Zap, Shield, Award,
  BookOpen, Brain, Command, Settings, DollarSign
} from 'lucide-react';

export default function EcosystemDashboard() {
  const subsidiaries = [
    { name: "JobLinks Africa", path: "joblinks-africa", icon: <Briefcase size={24} />, color: "blue", status: "active", description: "AI-Powered Recruitment | 84 Agents" },
    { name: "Altovex Logistics", path: "altovex", icon: <Truck size={24} />, color: "orange", status: "active", description: "Lori Matchmaker | 52 Agents" },
    { name: "SinoAfric EV", path: "sinoafric-ev", icon: <Car size={24} />, color: "green", status: "coming", description: "EV Mobility | 32 Agents" },
    { name: "DreamTeQ 360 Farmer", path: "dreamteq-farmer", icon: <Sprout size={24} />, color: "lime", status: "coming", description: "Agri-Tech | 48 Agents" },
    { name: "Urbanis Parking", path: "urbanis-parking", icon: <ParkingSquare size={24} />, color: "blue", status: "coming", description: "Smart Parking | 28 Agents" },
    { name: "Urban Edge", path: "urban-edge", icon: <Landmark size={24} />, color: "emerald", status: "coming", description: "Landscaping | 24 Agents" },
    { name: "Digital Den", path: "digital-den", icon: <Cpu size={24} />, color: "cyan", status: "coming", description: "IoT Hub | 32 Agents" },
    { name: "JetPro Powerwash", path: "jetpro", icon: <Droplets size={24} />, color: "sky", status: "coming", description: "Auto Detailing | 28 Agents" },
    { name: "Balaji Hygiene", path: "balaji", icon: <Factory size={24} />, color: "pink", status: "coming", description: "Manufacturing | 36 Agents" }
  ];
  
  const metrics = {
    totalUsers: 1247,
    activeAgents: 312,
    automationRate: 90,
    valuation: "100M",
    countries: 26,
    profitMargin: 30,
    tasksCompleted: 1247
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
            <Crown className="text-yellow-500" size={18} />
            <span className="text-sm">Sovereign Intelligence Ecosystem</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">DreamTeQ Sovereign</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The Complete Intelligence Brain Powering 9 Subsidiaries Across 26 African Countries
          </p>
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Link href="/titanium-dashboard">
              <button className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 transition">
                Launch Command Center
              </button>
            </Link>
            <Link href="/amanda-dashboard">
              <button className="px-6 py-3 border border-white/30 rounded-lg hover:bg-white/10 transition">
                Meet Amanda AI
              </button>
            </Link>
            <Link href="/resource-library">
              <button className="px-6 py-3 border border-white/30 rounded-lg hover:bg-white/10 transition">
                Resource Library
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Global Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-12">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <Users className="mx-auto text-blue-600 mb-2" size={24} />
            <div className="text-xl font-bold">{metrics.totalUsers.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Active Users</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <Brain className="mx-auto text-purple-600 mb-2" size={24} />
            <div className="text-xl font-bold">{metrics.activeAgents}</div>
            <div className="text-xs text-gray-600">AI Agents</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <Zap className="mx-auto text-yellow-600 mb-2" size={24} />
            <div className="text-xl font-bold">{metrics.automationRate}%</div>
            <div className="text-xs text-gray-600">Automation</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <DollarSign className="mx-auto text-green-600 mb-2" size={24} />
            <div className="text-xl font-bold">${metrics.valuation}</div>
            <div className="text-xs text-gray-600">Valuation</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <Globe className="mx-auto text-indigo-600 mb-2" size={24} />
            <div className="text-xl font-bold">{metrics.countries}</div>
            <div className="text-xs text-gray-600">Countries</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <Award className="mx-auto text-orange-600 mb-2" size={24} />
            <div className="text-xl font-bold">{metrics.profitMargin}%</div>
            <div className="text-xs text-gray-600">Min Profit</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <Activity className="mx-auto text-red-600 mb-2" size={24} />
            <div className="text-xl font-bold">{metrics.tasksCompleted.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Tasks Today</div>
          </div>
        </div>
        
        {/* Subsidiaries Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Building2 size={24} /> Our Ecosystem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {subsidiaries.map((sub, idx) => (
            <Link key={idx} href={`/${sub.path}`}>
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6 cursor-pointer border-l-4 border-blue-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    {sub.icon}
                  </div>
                  {sub.status === 'active' ? (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                  ) : (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Coming Soon</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{sub.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{sub.description}</p>
                <div className="flex items-center text-sm text-blue-600">
                  <span>Explore</span>
                  <ArrowRight size={14} className="ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Quick Actions */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <QuickActionCard 
            title="Amanda AI" 
            description="Chat with your AI assistant" 
            href="/amanda-dashboard"
            icon="??"
          />
          <QuickActionCard 
            title="Resource Library" 
            description="Access all documents & training" 
            href="/resource-library"
            icon="??"
          />
          <QuickActionCard 
            title="Titanium ERP" 
            description="Manage operations & finances" 
            href="/titanium-dashboard"
            icon="??"
          />
          <QuickActionCard 
            title="Command Center" 
            description="CTO oversight dashboard" 
            href="/command-center"
            icon="???"
          />
        </div>
        
        {/* AI Swarm Status */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Brain size={24} /> AI Swarm Intelligence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">Active Agents</div>
              <div className="text-2xl font-bold text-purple-600">312/312</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Automation Coverage</div>
              <div className="text-2xl font-bold text-green-600">90%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Learning Rate</div>
              <div className="text-2xl font-bold text-blue-600">94%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-gray-600">DeepSeek v3</span>
              <span className="text-gray-600">Claude Code</span>
              <span className="text-gray-600">Gemini Ultra</span>
              <span className="text-gray-600">Ollama</span>
              <span className="text-gray-600">Kimi K2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ title, description, href, icon }: any) {
  return (
    <Link href={href}>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border hover:shadow-lg transition cursor-pointer">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
