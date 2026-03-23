// app/command-center/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Shield, Activity, Users, ShoppingBag, BookOpen, 
  Settings, AlertTriangle, CheckCircle, Clock, Zap,
  TrendingUp, Award, Globe, Database, Cpu, Target,
  ChevronRight, RefreshCw, Bell, Eye
} from 'lucide-react';

export default function CommandCenter() {
  const [metrics, setMetrics] = useState<any>({});
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [systemStatus, setSystemStatus] = useState<any>({});
  
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);
  
  const loadData = async () => {
    // Load real-time metrics
    setMetrics({
      activeUsers: 1247,
      activeAgents: 312,
      tasksToday: 894,
      revenue: 12450,
      conversionRate: 3.2,
      satisfaction: 4.8
    });
    
    setPendingApprovals([
      { id: 1, type: 'Marketing Campaign', title: 'Luxury AI Course Launch', status: 'pending', submitted: '2 hours ago' },
      { id: 2, type: 'Social Media', title: 'Weekly Content Calendar', status: 'pending', submitted: '4 hours ago' },
      { id: 3, type: 'PR Release', title: 'Sovereign African Tech Initiative', status: 'pending', submitted: '1 day ago' },
      { id: 4, type: 'Product Launch', title: 'New AI Mastery Series', status: 'pending', submitted: '2 days ago' }
    ]);
    
    setSystemStatus({
      amanda: 'operational',
      jobPortal: 'operational',
      lms: 'operational',
      erp: 'operational',
      shop: 'operational',
      agents: 'all_active'
    });
  };
  
  const approveCampaign = (id: number) => {
    setPendingApprovals(prev => prev.filter(item => item.id !== id));
    alert('Campaign approved and scheduled for execution!');
  };
  
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={32} className="text-yellow-500" />
              <div>
                <h1 className="text-2xl font-bold text-white">CTO Command Center</h1>
                <p className="text-gray-400 text-sm">Sovereign Intelligence Oversight</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-500/10 rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">All Systems Operational</span>
              </div>
              <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                <RefreshCw size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            icon={<Users className="text-blue-500" />}
            title="Active Users"
            value={metrics.activeUsers?.toLocaleString() || '0'}
            trend="+12%"
          />
          <MetricCard 
            icon={<Cpu className="text-purple-500" />}
            title="Active AI Agents"
            value={metrics.activeAgents || '0'}
            trend="312 Total"
          />
          <MetricCard 
            icon={<Zap className="text-yellow-500" />}
            title="Tasks Today"
            value={metrics.tasksToday?.toLocaleString() || '0'}
            trend="+89"
          />
          <MetricCard 
            icon={<TrendingUp className="text-green-500" />}
            title="Revenue (24h)"
            value={`$${metrics.revenue?.toLocaleString() || '0'}`}
            trend="+23%"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System Status */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Activity size={18} /> System Status
            </h2>
            <div className="space-y-3">
              {Object.entries(systemStatus).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-400 capitalize">{key}</span>
                  <div className="flex items-center gap-2">
                    {value === 'operational' && (
                      <>
                        <CheckCircle size={14} className="text-green-500" />
                        <span className="text-green-500 text-sm">Operational</span>
                      </>
                    )}
                    {value === 'all_active' && (
                      <>
                        <CheckCircle size={14} className="text-green-500" />
                        <span className="text-green-500 text-sm">All Active</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pending Approvals */}
          <div className="bg-gray-800 rounded-xl p-6 lg:col-span-2">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Bell size={18} /> Pending Approvals
            </h2>
            <div className="space-y-3">
              {pendingApprovals.map(approval => (
                <div key={approval.id} className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">
                      {approval.type}
                    </span>
                    <span className="text-xs text-gray-400">{approval.submitted}</span>
                  </div>
                  <p className="text-white font-medium mb-3">{approval.title}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => approveCampaign(approval.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                      Reject
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <QuickAction icon={<Eye />} title="Monitor Amanda" description="View AI performance" href="/amanda-dashboard" />
          <QuickAction icon={<Settings />} title="Agent Configuration" description="Manage AI agents" href="/command-center/agents" />
          <QuickAction icon={<TrendingUp />} title="Analytics" description="View metrics" href="/command-center/metrics" />
          <QuickAction icon={<Shield />} title="Security Audit" description="System security" href="/command-center/security" />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, title, value, trend }: any) {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-3">
        {icon}
        <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">{trend}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-400 mt-1">{title}</div>
    </div>
  );
}

function QuickAction({ icon, title, description, href }: any) {
  return (
    <a href={href}>
      <div className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition cursor-pointer">
        <div className="text-yellow-500 mb-2">{icon}</div>
        <div className="font-medium text-white">{title}</div>
        <div className="text-xs text-gray-400 mt-1">{description}</div>
      </div>
    </a>
  );
}
