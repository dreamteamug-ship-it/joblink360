'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const logs = [
  { time: '10:42:01', text: 'Scraper: Found 12 AI Data Labeling roles (Tokyo)', color: 'text-green-400' },
  { time: '10:42:05', text: 'Titanium: Matchmaking 4 candidates for Mityana Project', color: 'text-titan-gold' },
  { time: '10:42:12', text: 'Amanda Agent: Updating Swahili training modules', color: 'text-titan-silver' },
  { time: '10:42:18', text: 'Pipeline:  gig verified and queued', color: 'text-green-400' },
  { time: '10:42:25', text: 'Wallet: KES 45,200 deposited to community fund', color: 'text-titan-gold' },
]

const stats = [
  { value: '87+', label: 'Job Pipelines Active' },
  { value: '45.2M', label: 'Pipeline Value (KES)' },
  { value: '12,400+', label: 'Trainees Matched' },
]

export default function HeroSection() {
  const [currentLog, setCurrentLog] = useState(0)
  const [syncProgress, setSyncProgress] = useState(0)

  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentLog(prev => (prev + 1) % logs.length)
    }, 3000)

    const syncInterval = setInterval(() => {
      setSyncProgress(prev => prev >= 100 ? 0 : prev + 2)
    }, 50)

    return () => {
      clearInterval(logInterval)
      clearInterval(syncInterval)
    }
  }, [])

  return (
    <section className='pt-32 pb-20 px-6 md:px-12 min-h-screen flex items-center'>
      <div className='fixed top-0 left-0 w-full h-1 bg-titan-dark z-[100]'>
        <div 
          className='h-full bg-gradient-to-r from-titan-gold via-titan-gold-light to-titan-gold transition-all duration-100'
          style={{ width: ${syncProgress}% }}
        />
      </div>

      <div className='max-w-[1440px] mx-auto w-full grid lg:grid-cols-12 gap-16 items-center'>
        <div className='lg:col-span-7'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-titan-maroon/20 border border-titan-maroon/50 mb-8'>
            <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
            <span className='text-[10px] tracking-[3px] text-titan-gold font-accent uppercase'>
              System Active — Titanium ERP Core v2.1
            </span>
          </div>

          <h2 className='font-display text-5xl md:text-7xl xl:text-8xl mb-8 leading-[1.05]'>
            Empowering the{' '}
            <span className='text-titan-gold italic relative'>
              African
              <span className='absolute -bottom-2 left-0 w-full h-1 bg-titan-gold/30' />
            </span>{' '}
            Digital Workforce.
          </h2>

          <p className='text-titan-silver text-lg md:text-xl max-w-2xl leading-relaxed mb-10'>
            Matchmaking community development with high-fidelity AI job pipelines. 
            Real-time scraping, autonomous funding discovery, and professional 
            matchmaking — powered by Titanium ERP intelligence.
          </p>

          <div className='flex flex-wrap gap-4 mb-12'>
            <Link 
              href='/register'
              className='bg-titan-gold text-titan-dark px-10 py-4 font-accent font-bold text-xs uppercase tracking-widest hover:bg-titan-gold-light transition-all duration-300 shadow-xl shadow-titan-gold/20 hover:shadow-titan-gold/40'
            >
              Deploy My Agent
            </Link>
            <Link 
              href='/dashboard'
              className='border border-titan-gold/30 text-titan-gold px-10 py-4 font-accent text-xs uppercase tracking-widest hover:bg-titan-gold/10 transition-all duration-300'
            >
              View Dashboard
            </Link>
          </div>

          <div className='grid grid-cols-3 gap-6'>
            {stats.map((stat, i) => (
              <div key={i} className='border-l-2 border-titan-gold/30 pl-4'>
                <div className='font-display text-2xl md:text-3xl text-titan-gold'>{stat.value}</div>
                <div className='text-[10px] text-titan-silver uppercase tracking-wider mt-1'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='lg:col-span-5'>
          <div className='glass-panel border border-titan-gold/20 rounded-lg overflow-hidden gold-glow'>
            <div className='bg-gradient-to-r from-titan-maroon/50 to-titan-blue/50 px-6 py-4 border-b border-titan-gold/20'>
              <div className='flex justify-between items-center'>
                <div>
                  <h3 className='font-display text-sm text-titan-gold tracking-wider'>OPERATIONAL LOGS</h3>
                  <p className='text-[9px] text-titan-silver uppercase tracking-widest mt-1'>Live Pipeline Monitor</p>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                  <span className='text-[10px] text-green-400 font-mono'>LIVE</span>
                </div>
              </div>
            </div>

            <div className='p-6 space-y-3 h-[200px] overflow-hidden'>
              {logs.map((log, i) => (
                <div 
                  key={i} 
                  className={	ext-[11px] font-mono flex gap-3 transition-all duration-500  }
                >
                  <span className='text-titan-silver/50'>[{log.time}]</span>
                  <span>{log.text}</span>
                </div>
              ))}
            </div>

            <div className='px-6 pb-6'>
              <div className='h-[120px] bg-titan-blue/10 rounded border border-titan-gold/10 relative overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-t from-titan-maroon/20 to-transparent' />
                <div className='flex items-end h-full gap-1 p-3'>
                  {[40, 65, 85, 45, 70, 90, 55, 75, 60, 80, 45, 95].map((h, i) => (
                    <div 
                      key={i}
                      className='flex-1 bg-titan-gold/60 rounded-t transition-all duration-500 hover:bg-titan-gold'
                      style={{ height: ${h}% }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
