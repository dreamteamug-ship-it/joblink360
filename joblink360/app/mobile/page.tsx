// app/mobile/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Home, Search, ShoppingBag, BookOpen, Briefcase, 
  User, Bell, Settings, Heart, Star, Crown, Zap
} from 'lucide-react';

export default function MobileApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Viewport */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        {/* Status Bar */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white px-4 py-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-white/80 rounded-full"></div>
              <div className="w-4 h-4 bg-white/80 rounded-full"></div>
              <div className="w-4 h-4 bg-white/80 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Sovereign</h1>
              <p className="text-purple-200 text-sm">African Marketplace</p>
            </div>
            <div className="flex gap-3">
              <Bell size={20} />
              <User size={20} />
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="px-4 py-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-blue-600">1247</div>
              <div className="text-xs text-gray-600">Active Jobs</div>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-green-600">52</div>
              <div className="text-xs text-gray-600">AI Courses</div>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <AppFeature icon={<Briefcase />} title="Jobs" href="/mobile/jobs" color="blue" />
            <AppFeature icon={<BookOpen />} title="Courses" href="/mobile/courses" color="purple" />
            <AppFeature icon={<ShoppingBag />} title="Shop" href="/mobile/shop" color="orange" />
            <AppFeature icon={<Crown />} title="Amanda AI" href="/amanda-dashboard" color="yellow" />
          </div>
          
          {/* Recent Activity */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Recent Activity</h3>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Zap size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New job alert</p>
                      <p className="text-xs text-gray-500">5 new AI positions available</p>
                    </div>
                    <Heart size={14} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 max-w-md w-full bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around">
            <NavIcon icon={<Home size={20} />} label="Home" active />
            <NavIcon icon={<Search size={20} />} label="Search" />
            <NavIcon icon={<ShoppingBag size={20} />} label="Shop" />
            <NavIcon icon={<User size={20} />} label="Profile" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AppFeature({ icon, title, href, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    yellow: 'bg-yellow-50 text-yellow-600'
  };
  
  return (
    <Link href={href}>
      <div className={`${colors[color]} rounded-xl p-4 text-center hover:shadow-lg transition`}>
        <div className="flex justify-center mb-2">{icon}</div>
        <span className="text-sm font-medium">{title}</span>
      </div>
    </Link>
  );
}

function NavIcon({ icon, label, active }: any) {
  return (
    <button className={`flex flex-col items-center gap-1 ${active ? 'text-blue-600' : 'text-gray-400'}`}>
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}
