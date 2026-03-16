'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={ixed top-0 w-full z-50 transition-all duration-500 }>
      <div className='max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center'>
        <Link href='/' className='flex items-center gap-4 group'>
          <div className='w-12 h-12 border-2 border-titan-gold rounded-sm flex items-center justify-center rotate-45 group-hover:rotate-0 transition-all duration-500'>
            <span className='font-display text-titan-gold text-lg -rotate-45 group-hover:rotate-0 transition-all duration-500'>JL</span>
          </div>
          <div>
            <h1 className='font-display text-xl leading-none embossed-gold'>JOBLINK 360</h1>
            <p className='text-[9px] tracking-[4px] text-titan-silver uppercase mt-1'>Titanium Intelligence</p>
          </div>
        </Link>

        <div className='hidden lg:flex items-center gap-10 font-accent text-[11px] tracking-widest uppercase text-titan-silver'>
          <Link href='/#pipeline' className='hover:text-titan-gold transition-colors duration-300'>Job Pipeline</Link>
          <Link href='/#agents' className='hover:text-titan-gold transition-colors duration-300'>AI Agents</Link>
          <Link href='/training' className='hover:text-titan-gold transition-colors duration-300'>Training</Link>
          <Link href='/dashboard' className='text-titan-gold hover:text-titan-gold-light transition-colors duration-300'>Dashboard</Link>
        </div>

        <div className='flex items-center gap-4'>
          <Link 
            href='/register' 
            className='hidden md:block px-8 py-3 bg-titan-gold text-titan-dark font-accent font-bold text-[11px] uppercase tracking-widest hover:bg-titan-gold-light transition-all duration-300 shadow-lg shadow-titan-gold/20'
          >
            Get Started
          </Link>
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className='lg:hidden text-titan-gold p-2'
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              {mobileOpen ? (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className='lg:hidden glass-panel border-t border-titan-gold/10 mt-4'>
          <div className='px-6 py-6 space-y-4'>
            <Link href='/#pipeline' className='block text-titan-silver hover:text-titan-gold font-accent text-sm tracking-wider' onClick={() => setMobileOpen(false)}>Job Pipeline</Link>
            <Link href='/#agents' className='block text-titan-silver hover:text-titan-gold font-accent text-sm tracking-wider' onClick={() => setMobileOpen(false)}>AI Agents</Link>
            <Link href='/training' className='block text-titan-silver hover:text-titan-gold font-accent text-sm tracking-wider' onClick={() => setMobileOpen(false)}>Training</Link>
            <Link href='/dashboard' className='block text-titan-gold font-accent text-sm tracking-wider' onClick={() => setMobileOpen(false)}>Dashboard</Link>
            <Link href='/register' className='block text-titan-dark bg-titan-gold px-6 py-3 font-accent text-sm tracking-wider text-center' onClick={() => setMobileOpen(false)}>Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
