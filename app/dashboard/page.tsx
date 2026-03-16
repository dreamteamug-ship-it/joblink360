'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="gradient-mesh min-h-screen">
      <Navbar />
      <div className="pt-28 pb-20 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-titan-cream">Dashboard</h1>
            <p className="text-titan-cream/60 mt-2">Welcome back! Here is your job search overview.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-titan-dark/60 backdrop-blur-sm border border-titan-gold/10 rounded-xl p-6">
              <h3 className="text-titan-cream/60 text-sm font-mono">Applications Sent</h3>
              <p className="text-3xl font-display font-bold text-titan-cream mt-2">12</p>
            </div>
            <div className="bg-titan-dark/60 backdrop-blur-sm border border-titan-gold/10 rounded-xl p-6">
              <h3 className="text-titan-cream/60 text-sm font-mono">Interviews Scheduled</h3>
              <p className="text-3xl font-display font-bold text-titan-gold mt-2">3</p>
            </div>
            <div className="bg-titan-dark/60 backdrop-blur-sm border border-titan-gold/10 rounded-xl p-6">
              <h3 className="text-titan-cream/60 text-sm font-mono">Profile Views</h3>
              <p className="text-3xl font-display font-bold text-titan-cream mt-2">47</p>
            </div>
          </div>

          <div className="mt-10 bg-titan-dark/60 backdrop-blur-sm border border-titan-gold/10 rounded-xl p-6">
            <h2 className="text-xl font-display font-bold text-titan-cream mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {['Applied to Customer Service Rep at Safaricom', 'Applied to Data Entry at KCB', 'Profile viewed by recruiter'].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-b border-titan-gold/10 last:border-0">
                  <div className="w-2 h-2 bg-titan-gold rounded-full"></div>
                  <span className="text-titan-cream/80">{activity}</span>
                  <span className="ml-auto text-titan-cream/40 text-sm font-mono">{i === 0 ? '2h ago' : i === 1 ? '5h ago' : '1d ago'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
