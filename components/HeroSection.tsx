'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const progress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  return (
    <section className="pt-32 pb-20 px-6 md:px-12 min-h-screen flex items-center">
      <div className="fixed top-0 left-0 w-full h-1 bg-titan-dark z-[100]">
        <div
          className="h-full bg-gradient-to-r from-titan-gold via-titan-gold-light to-titan-gold transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <span className="text-titan-gold font-mono text-sm tracking-widest uppercase">East Africa&apos;s Career Platform</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-titan-cream mt-6 leading-[1.1]">
              Your Future<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-titan-gold to-titan-gold-light">Starts Here</span>
            </h1>
            <p className="text-titan-cream/60 text-lg md:text-xl mt-8 max-w-xl leading-relaxed">
              Connecting talented individuals with meaningful opportunities across Kenya. 
              AI-powered job matching, free training, and career support.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/register" className="px-8 py-4 bg-gradient-to-r from-titan-maroon to-titan-blue text-titan-cream font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-titan-maroon/20">
                Create Your Profile
              </Link>
              <Link href="/jobs" className="px-8 py-4 border-2 border-titan-gold/30 text-titan-cream font-semibold rounded-lg hover:bg-titan-gold/10 transition-colors">
                Browse Jobs
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-titan-gold/10">
              <div>
                <span className="text-3xl font-display font-bold text-titan-gold">50K+</span>
                <span className="text-titan-cream/40 text-sm block">Active Users</span>
              </div>
              <div className="w-px h-12 bg-titan-gold/20"></div>
              <div>
                <span className="text-3xl font-display font-bold text-titan-gold">2,500+</span>
                <span className="text-titan-cream/40 text-sm block">Job Listings</span>
              </div>
              <div className="w-px h-12 bg-titan-gold/20"></div>
              <div>
                <span className="text-3xl font-display font-bold text-titan-gold">95%</span>
                <span className="text-titan-cream/40 text-sm block">Success Rate</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-br from-titan-maroon/20 to-titan-blue/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-titan-dark/40 backdrop-blur-sm border border-titan-gold/10 rounded-3xl p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-titan-gold/5 rounded-xl border border-titan-gold/10">
                  <div className="w-12 h-12 bg-titan-gold/20 rounded-lg flex items-center justify-center text-2xl">🎯</div>
                  <div>
                    <h4 className="text-titan-cream font-semibold">Smart Job Matching</h4>
                    <p className="text-titan-cream/50 text-sm">AI finds roles that fit your skills</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-titan-gold/5 rounded-xl border border-titan-gold/10">
                  <div className="w-12 h-12 bg-titan-gold/20 rounded-lg flex items-center justify-center text-2xl">📚</div>
                  <div>
                    <h4 className="text-titan-cream font-semibold">Free Training</h4>
                    <p className="text-titan-cream/50 text-sm">Upskill with certified courses</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-titan-gold/5 rounded-xl border border-titan-gold/10">
                  <div className="w-12 h-12 bg-titan-gold/20 rounded-lg flex items-center justify-center text-2xl">💰</div>
                  <div>
                    <h4 className="text-titan-cream font-semibold">Salary Advances</h4>
                    <p className="text-titan-cream/50 text-sm">Access earned wages early</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
