'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

export default function ERPDashboard() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      // Check if user has admin role (you can implement this)
      setIsAdmin(true); // Temporary: all logged-in users see ERP
    });
  }, []);
  
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Admin Access Required</h1>
          <Link href="/login" className="bg-amber-600 px-6 py-3 rounded-lg">Sign In</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-amber-500">JobLink 360 ERP</h1>
          <Link href="/" className="text-zinc-400 hover:text-amber-500">? Back to Site</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/erp/accounts" className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition">
            <div className="text-3xl mb-3">??</div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">Accounts</h2>
            <p className="text-sm text-zinc-400">Invoices, expenses, financial reports</p>
          </Link>
          
          <Link href="/erp/hr" className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition">
            <div className="text-3xl mb-3">??</div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">HR</h2>
            <p className="text-sm text-zinc-400">Employees, payroll, attendance</p>
          </Link>
          
          <Link href="/erp/sales" className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition">
            <div className="text-3xl mb-3">??</div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">Sales</h2>
            <p className="text-sm text-zinc-400">CRM, pipeline, deals</p>
          </Link>
          
          <Link href="/erp/marketing" className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition">
            <div className="text-3xl mb-3">??</div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">Marketing</h2>
            <p className="text-sm text-zinc-400">Campaigns, email, analytics</p>
          </Link>
        </div>
        
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold text-amber-500 mb-4">Financial Snapshot (March 2026)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/50 p-4 rounded-lg">
              <p className="text-sm text-zinc-400">Total Revenue</p>
              <p className="text-2xl font-bold text-amber-500">KES 0</p>
            </div>
            <div className="bg-black/50 p-4 rounded-lg">
              <p className="text-sm text-zinc-400">Active Students</p>
              <p className="text-2xl font-bold text-amber-500">1,247</p>
            </div>
            <div className="bg-black/50 p-4 rounded-lg">
              <p className="text-sm text-zinc-400">Courses Sold</p>
              <p className="text-2xl font-bold text-amber-500">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
