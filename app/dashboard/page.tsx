'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AmandaChat from '@/components/AmandaChat'
import PaymentModal from '@/components/PaymentModal'

interface User {
  id: string
  fullName: string
  email: string
  role: string
  program: string
}

const apps = [
  { id: 1, name: 'Registration', status: 'active', description: 'User onboarding & KYC' },
  { id: 2, name: 'Value Chain', status: 'active', description: 'Program assignment' },
  { id: 3, name: 'Team Profile', status: 'active', description: 'Household mapping' },
  { id: 4, name: 'Training Lab', status: 'active', description: 'Courses & job feeds' },
  { id: 5, name: 'Legal Lite', status: 'active', description: 'E-signatures & contracts' },
]

const recentJobs = [
  { title: 'AI Data Labeler (Japanese)', budget: '', platform: 'RemoteOK', matched: 85 },
  { title: 'Swahili NLP Dataset', budget: '', platform: 'Remotive', matched: 92 },
  { title: 'Python Developer (Remote)', budget: ',200', platform: 'Upwork', matched: 78 },
  { title: 'Content Moderator (EN/SW)', budget: '', platform: 'LinkedIn', matched: 88 },
]

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [showPayment, setShowPayment] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('joblink_user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  return (
    <main className='gradient-mesh min-h-screen'>
      <Navbar />
      <div className='pt-28 pb-20 px-6 md:px-12'>
        <div className='max-w-[1440px] mx-auto'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12'>
            <div>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-3 h-3 rounded-full bg-green-500 animate-pulse' />
                <span className='text-[10px] text-green-400 font-accent uppercase tracking-widest'>System Active</span>
              </div>
              <h1 className='font-display text-3xl md:text-4xl text-titan-cream'>
                {user ? \Welcome, \\ : 'Dashboard'}
              </h1>
              <p className='text-titan-silver mt-2'>
                {user?.program ? \\ Program\ : 'Titanium ERP Control Center'}
              </p>
            </div>
            <button 
              onClick={() => setShowPayment(true)}
              className='px-6 py-3 bg-titan-gold text-titan-dark text-xs font-accent font-bold uppercase tracking-widest hover:bg-titan-gold-light transition-all'>
              Fund Wallet
            </button>
          </div>

          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12'>
            {[
              { label: 'Wallet Balance', value: 'KES 0', change: '+0%' },
              { label: 'Jobs Matched', value: '0', change: 'New' },
              { label: 'Training Progress', value: '0%', change: 'Start' },
              { label: 'CSR Contribution', value: 'KES 0', change: 'Active' },
            ].map((stat, i) => (
              <div key={i} className='glass-panel border border-titan-gold/10 p-6'>
                <p className='text-[10px] text-titan-silver font-accent uppercase tracking-widest mb-2'>{stat.label}</p>
                <p className='font-display text-2xl text-titan-gold'>{stat.value}</p>
                <p className='text-[10px] text-green-400 mt-1'>{stat.change}</p>
              </div>
            ))}
          </div>

          <div className='grid lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-2 space-y-6'>
              <div className='glass-panel border border-titan-gold/10 p-6'>
                <h2 className='font-display text-lg text-titan-gold mb-6'>Your Apps</h2>
                <div className='grid md:grid-cols-2 gap-4'>
                  {apps.map((app) => (
                    <div key={app.id} className='border border-titan-gold/10 p-5 hover:border-titan-gold/30 transition-all cursor-pointer group'>
                      <div className='flex justify-between items-start mb-3'>
                        <div className='w-10 h-10 border border-titan-gold/30 rounded-full flex items-center justify-center text-titan-gold font-display'>
                          {app.id}
                        </div>
                        <span className='text-[9px] text-green-400 bg-green-500/10 px-2 py-1 border border-green-500/20 uppercase tracking-wider'>
                          {app.status}
                        </span>
                      </div>
                      <h3 className='font-display text-sm text-titan-cream group-hover:text-titan-gold transition-colors mb-1'>
                        {app.name}
                      </h3>
                      <p className='text-xs text-titan-silver'>{app.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className='glass-panel border border-titan-gold/10 p-6'>
                <div className='flex justify-between items-center mb-6'>
                  <h2 className='font-display text-lg text-titan-gold'>Matched Jobs</h2>
                  <span className='text-[10px] text-titan-silver font-accent uppercase tracking-widest'>Live Feed</span>
                </div>
                <div className='space-y-3'>
                  {recentJobs.map((job, i) => (
                    <div key={i} className='flex items-center justify-between p-4 border border-titan-gold/10 hover:border-titan-gold/30 transition-all'>
                      <div>
                        <h4 className='text-sm text-titan-cream'>{job.title}</h4>
                        <p className='text-[10px] text-titan-silver mt-1'>{job.platform}</p>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm font-bold text-titan-gold'>{job.budget}</p>
                        <p className='text-[10px] text-green-400'>{job.matched}% match</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='space-y-6'>
              <div className='glass-panel border border-titan-gold/20 p-6 bg-gradient-to-br from-titan-maroon/20 to-titan-blue/20'>
                <div className='flex justify-between items-center mb-4'>
                  <span className='text-[10px] text-titan-gold font-accent uppercase tracking-widest'>Wallet</span>
                  <span className='text-[10px] text-titan-silver'>KES / USD</span>
                </div>
                <p className='font-display text-4xl text-titan-cream mb-4'>0.00</p>
                <div className='flex gap-2'>
                  <button onClick={() => setShowPayment(true)}
                    className='flex-1 bg-titan-gold text-titan-dark py-2 text-[10px] font-accent font-bold uppercase tracking-widest hover:bg-titan-gold-light transition-all'>
                    Deposit
                  </button>
                  <button className='flex-1 border border-titan-gold/30 text-titan-gold py-2 text-[10px] font-accent uppercase tracking-widest hover:bg-titan-gold/10 transition-all'>
                    Withdraw
                  </button>
                </div>
              </div>

              <div className='glass-panel border border-titan-gold/10 p-6'>
                <h3 className='text-[10px] text-titan-gold font-accent uppercase tracking-widest mb-4'>CSR Distribution</h3>
                <div className='space-y-3'>
                  {[
                    { label: 'Trainees (50%)', pct: 50, color: 'bg-titan-gold' },
                    { label: 'Infrastructure (40%)', pct: 40, color: 'bg-titan-blue' },
                    { label: 'Community (10%)', pct: 10, color: 'bg-titan-maroon' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className='flex justify-between text-xs mb-1'>
                        <span className='text-titan-silver'>{item.label}</span>
                        <span className='text-titan-cream'>{item.pct}%</span>
                      </div>
                      <div className='h-2 bg-titan-dark/50 rounded'>
                        <div className={\h-full \ rounded\} style={{ width: \\%\ }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='glass-panel border border-titan-gold/10 p-6'>
                <h3 className='text-[10px] text-titan-gold font-accent uppercase tracking-widest mb-4'>Quick Actions</h3>
                <div className='space-y-2'>
                  {[
                    { label: 'Complete KYC' },
                    { label: 'Start Training' },
                    { label: 'View Contracts' },
                    { label: 'Invite Team' },
                  ].map((action, i) => (
                    <button key={i} className='w-full flex justify-between items-center p-3 border border-titan-gold/10 hover:border-titan-gold/30 hover:bg-titan-gold/5 transition-all text-left'>
                      <span className='text-sm text-titan-silver'>{action.label}</span>
                      <span className='text-titan-gold'>→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AmandaChat />
      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}
    </main>
  )
}
