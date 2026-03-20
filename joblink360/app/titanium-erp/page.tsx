'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function TitaniumERP() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login');
      } else {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-amber-500">Loading Titanium ERP...</div>
      </div>
    );
  }

  const modules = [
    { name: 'Accounts', icon: '💰', path: '/titanium-erp/accounts', desc: 'Financial management' },
    { name: 'HR', icon: '👥', path: '/titanium-erp/hr', desc: 'Employee management' },
    { name: 'Sales', icon: '📈', path: '/titanium-erp/sales', desc: 'CRM & pipeline' },
    { name: 'Marketing', icon: '📧', path: '/titanium-erp/marketing', desc: 'Campaign management' },
    { name: 'Inventory', icon: '📦', path: '/titanium-erp/inventory', desc: 'Stock management' },
    { name: 'Projects', icon: '📋', path: '/titanium-erp/projects', desc: 'Task tracking' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-gradient-to-r from-zinc-900 to-black border-b border-amber-500/30 p-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-black text-amber-500 tracking-tighter">TITANIUM ERP</h1>
          <p className="text-zinc-500 text-sm mt-1">Sovereign Business Intelligence Suite</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <Link key={i} href={mod.path} className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition hover:bg-zinc-900">
              <div className="text-4xl mb-3">{mod.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">{mod.name}</h3>
              <p className="text-sm text-zinc-400">{mod.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}