// app/jobs/categories/page.tsx
'use client';
import { JobCategories, CredibleEmployers } from '@/lib/jobs/categories';

export default function JobCategoriesPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-500 mb-4">Job Categories</h1>
        <p className="text-zinc-400 mb-8">Explore 10+ job categories with 50+ credible employers worldwide</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(JobCategories).map(cat => (
            <div key={cat.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/50 transition">
              <h3 className="text-xl font-bold text-amber-500 mb-2">{cat.name}</h3>
              <p className="text-zinc-400 text-sm mb-3">{cat.description}</p>
              <p className="text-sm text-zinc-500">💰 {cat.salary_range.currency} {cat.salary_range.min} - {cat.salary_range.max}</p>
              <p className="text-sm text-zinc-500">🏢 {cat.typical_clients.slice(0, 3).join(', ')}</p>
            </div>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold mt-12 mb-4">Credible Employers</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CredibleEmployers.map(emp => (
            <div key={emp.name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{emp.tier === 'PREMIUM' ? '⭐' : emp.tier === 'ENTERPRISE' ? '🏢' : '🌍'}</span>
                <h4 className="font-bold">{emp.name}</h4>
              </div>
              <p className="text-xs text-zinc-500">Active Jobs: {emp.active_jobs}</p>
              <p className="text-xs text-amber-500">Rating: {emp.rating} ★</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}