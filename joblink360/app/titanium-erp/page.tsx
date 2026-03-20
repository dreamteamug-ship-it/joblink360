'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function TitaniumERPDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    revenue: 0,
    students: 1247,
    activeProjects: 0,
    aiTasks: 0
  });
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login');
      } else {
        setUser(data.user);
        fetchMetrics();
      }
      setLoading(false);
    });
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/titanium-erp/metrics');
      const data = await res.json();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-amber-500">Loading Titanium ERP...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-black border-b border-amber-500/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black text-amber-500 tracking-tighter">TITANIUM ERP</h1>
              <p className="text-zinc-500 text-sm mt-1">Sovereign Business Intelligence Suite</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-zinc-400">{user.user_metadata?.full_name || user.email}</p>
                <p className="text-xs text-amber-500">System Architect</p>
              </div>
              <button
                onClick={() => supabase.auth.signOut()}
                className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Status Bar */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-amber-500 font-mono text-xs">AMANDA AI: ACTIVE</span>
              <span className="text-zinc-500 text-xs">| Swarm Agents: 12 Online</span>
            </div>
            <div className="text-zinc-500 text-xs">
              OpenRouter Intelligence • Claude 3.5 • DeepSeek R1
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:border-amber-500/50 transition">
            <div className="text-3xl mb-2">??</div>
            <p className="text-sm text-zinc-400">Total Revenue</p>
            <p className="text-2xl font-bold text-amber-500">KES {metrics.revenue.toLocaleString()}</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:border-amber-500/50 transition">
            <div className="text-3xl mb-2">??</div>
            <p className="text-sm text-zinc-400">Active Students</p>
            <p className="text-2xl font-bold text-amber-500">{metrics.students.toLocaleString()}</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:border-amber-500/50 transition">
            <div className="text-3xl mb-2">??</div>
            <p className="text-sm text-zinc-400">Active Projects</p>
            <p className="text-2xl font-bold text-amber-500">{metrics.activeProjects}</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:border-amber-500/50 transition">
            <div className="text-3xl mb-2">??</div>
            <p className="text-sm text-zinc-400">AI Tasks Completed</p>
            <p className="text-2xl font-bold text-amber-500">{metrics.aiTasks}</p>
          </div>
        </div>

        {/* Module Grid */}
        <h2 className="text-2xl font-bold text-amber-500 mb-6">Sovereign Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/titanium-erp/accounts" className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition hover:bg-zinc-900">
            <div className="text-3xl mb-3">??</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">Accounts & Finance</h3>
            <p className="text-sm text-zinc-400">Invoices, payments, financial analytics, AI-powered forecasting</p>
            <div className="mt-4 text-xs text-amber-500/70">Amanda Agent: Financial Analyst</div>
          </Link>

          <Link href="/titanium-erp/hr" className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition hover:bg-zinc-900">
            <div className="text-3xl mb-3">??</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">Human Resources</h3>
            <p className="text-sm text-zinc-400">Employee management, payroll, recruitment, performance reviews</p>
            <div className="mt-4 text-xs text-amber-500/70">Amanda Agent: HR Strategist</div>
          </Link>

          <Link href="/titanium-erp/sales" className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition hover:bg-zinc-900">
            <div className="text-3xl mb-3">??</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">Sales & CRM</h3>
            <p className="text-sm text-zinc-400">Lead tracking, pipeline, deal management, AI-powered insights</p>
            <div className="mt-4 text-xs text-amber-500/70">Amanda Agent: Sales Strategist</div>
          </Link>

          <Link href="/titanium-erp/marketing" className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition hover:bg-zinc-900">
            <div className="text-3xl mb-3">??</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">Marketing Automation</h3>
            <p className="text-sm text-zinc-400">Campaigns, email sequences, analytics, content generation</p>
            <div className="mt-4 text-xs text-amber-500/70">Amanda Agent: Marketing Director</div>
          </Link>

          <Link href="/titanium-erp/inventory" className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition hover:bg-zinc-900">
            <div className="text-3xl mb-3">??</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">Inventory & Supply Chain</h3>
            <p className="text-sm text-zinc-400">Stock management, orders, suppliers, AI demand forecasting</p>
            <div className="mt-4 text-xs text-amber-500/70">Amanda Agent: Supply Chain Optimizer</div>
          </Link>

          <Link href="/titanium-erp/projects" className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition hover:bg-zinc-900">
            <div className="text-3xl mb-3">??</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">Project Management</h3>
            <p className="text-sm text-zinc-400">Tasks, milestones, resources, AI project insights</p>
            <div className="mt-4 text-xs text-amber-500/70">Amanda Agent: Project Director</div>
          </Link>

          <Link href="/titanium-erp/reports" className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition hover:bg-zinc-900">
            <div className="text-3xl mb-3">??</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">Analytics & Reports</h3>
            <p className="text-sm text-zinc-400">Custom reports, dashboards, AI insights, forecasting</p>
            <div className="mt-4 text-xs text-amber-500/70">Amanda Agent: Data Analyst</div>
          </Link>

          <Link href="/titanium-erp/settings" className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition hover:bg-zinc-900">
            <div className="text-3xl mb-3">??</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">System Settings</h3>
            <p className="text-sm text-zinc-400">User roles, permissions, integrations, AI configuration</p>
            <div className="mt-4 text-xs text-amber-500/70">Amanda Agent: System Administrator</div>
          </Link>
        </div>

        {/* AI Assistant Panel */}
        <div className="mt-12 bg-zinc-900/30 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-amber-500">Amanda AI - Executive Assistant</h2>
            <div className="flex gap-2">
              <button className="bg-amber-600/20 hover:bg-amber-600/30 px-3 py-1 rounded text-xs text-amber-500 transition">
                Voice Command
              </button>
              <button className="bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded text-xs transition">
                Chat History
              </button>
            </div>
          </div>
          <div className="bg-black/50 rounded-lg p-4 h-32 overflow-y-auto mb-4">
            <p className="text-zinc-400 text-sm">?? Amanda suggests: Review Q1 financial projections. Sales pipeline shows 40% growth potential in East African market.</p>
            <p className="text-zinc-500 text-xs mt-2 mt-2">?? HR Alert: 3 new applicants for AI Engineer position. Skills match: 87%</p>
            <p className="text-zinc-500 text-xs mt-1">?? Marketing: Campaign engagement up 23% this week. Recommended to increase budget for Nigerian market.</p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask Amanda about ERP metrics, forecasts, or tasks..."
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500"
            />
            <button className="bg-amber-600 hover:bg-amber-500 px-6 py-2 rounded-lg font-bold transition">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
