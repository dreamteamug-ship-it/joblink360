'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-titan-dark/95 backdrop-blur-md border-b border-titan-gold/10' : 'bg-transparent'}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 border-2 border-titan-gold rounded-sm flex items-center justify-center rotate-45 group-hover:rotate-0 transition-all duration-500">
            <span className="text-titan-gold font-display font-bold text-xl -rotate-45 group-hover:rotate-0 transition-all duration-500">J</span>
          </div>
          <div>
            <span className="text-titan-cream font-display font-bold text-xl tracking-tight">JobLink360</span>
            <span className="text-titan-gold/60 text-[10px] font-mono block tracking-widest">CAREER PLATFORM</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-titan-cream/70 hover:text-titan-cream transition-colors text-sm font-mono">Home</Link>
          <Link href="/jobs" className="text-titan-cream/70 hover:text-titan-cream transition-colors text-sm font-mono">Jobs</Link>
          <Link href="/training" className="text-titan-cream/70 hover:text-titan-cream transition-colors text-sm font-mono">Training</Link>
          <Link href="/dashboard" className="text-titan-cream/70 hover:text-titan-cream transition-colors text-sm font-mono">Dashboard</Link>
          <Link href="/register" className="px-6 py-2 bg-gradient-to-r from-titan-maroon to-titan-blue text-titan-cream text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Get Started
          </Link>
        </div>

        <button className="md:hidden text-titan-cream" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-titan-dark/95 backdrop-blur-md border-t border-titan-gold/10 p-6 space-y-4">
          <Link href="/" className="block text-titan-cream/70 hover:text-titan-cream transition-colors">Home</Link>
          <Link href="/jobs" className="block text-titan-cream/70 hover:text-titan-cream transition-colors">Jobs</Link>
          <Link href="/training" className="block text-titan-cream/70 hover:text-titan-cream transition-colors">Training</Link>
          <Link href="/dashboard" className="block text-titan-cream/70 hover:text-titan-cream transition-colors">Dashboard</Link>
          <Link href="/register" className="block px-6 py-2 bg-gradient-to-r from-titan-maroon to-titan-blue text-titan-cream text-center font-semibold rounded-lg">Get Started</Link>
        </div>
      )}
    </nav>
  )
}
