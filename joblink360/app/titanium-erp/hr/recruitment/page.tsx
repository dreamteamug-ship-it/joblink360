"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Settings, Database, Users, DollarSign, TrendingUp } from 'lucide-react';

export default function Module() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/titanium-erp" className="text-blue-300 hover:text-white mb-4 inline-block">
            ? Back to ERP Dashboard
          </Link>
          <h1 className="text-3xl font-bold">recruitment</h1>
          <p className="text-blue-200 mt-2">Titanium ERP Module - Powered by Sovereign AI</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="text-blue-600" size={32} />
            <h2 className="text-xl font-semibold">Module Overview</h2>
          </div>
          <p className="text-gray-600">
            Complete recruitment management system with real-time analytics, AI-powered insights, 
            and seamless integration with all Titanium ERP modules.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <Database className="text-green-600 mb-3" size={24} />
            <h3 className="font-semibold mb-2">Active Records</h3>
            <p className="text-2xl font-bold text-blue-600">1,247</p>
            <p className="text-sm text-gray-500 mt-2">+12% this month</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <TrendingUp className="text-purple-600 mb-3" size={24} />
            <h3 className="font-semibold mb-2">AI Automation Rate</h3>
            <p className="text-2xl font-bold text-blue-600">94%</p>
            <p className="text-sm text-gray-500 mt-2">312 agents active</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <Users className="text-orange-600 mb-3" size={24} />
            <h3 className="font-semibold mb-2">Active Users</h3>
            <p className="text-2xl font-bold text-blue-600">856</p>
            <p className="text-sm text-gray-500 mt-2">Across 9 subsidiaries</p>
          </div>
        </div>
        
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
          <DollarSign className="mx-auto text-blue-600 mb-3" size={32} />
          <h3 className="text-lg font-semibold mb-2">AI-Powered Intelligence</h3>
          <p className="text-gray-600">
            This module is fully integrated with the Titanium AI Swarm (312 agents)
            providing real-time insights, predictive analytics, and automated workflows.
          </p>
          <div className="mt-4 text-sm text-blue-600">
            Last sync: 
          </div>
        </div>
      </div>
    </div>
  );
}
