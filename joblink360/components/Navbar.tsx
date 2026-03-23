// components/Navbar.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { href: '/sovereign-dashboard', label: '🏛️ Sovereign', icon: '🏛️' },
    { href: '/general-opportunities', label: '📋 Opportunities', icon: '📋' },
    { href: '/funding-investment', label: '💰 Funding', icon: '💰' },
    { href: '/joblinks', label: '💼 JobLinks', icon: '💼' },
    { href: '/lms', label: '📚 Courses', icon: '📚' }
  ];
  
  return (
    <nav className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🏛️</span>
            <span className="font-bold text-xl">DreamTeQ</span>
            <span className="text-xs text-yellow-400 hidden sm:inline">Sovereign</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition"
              >
                {link.label}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <Link href="/dashboard" className="text-sm hover:text-yellow-400">
                  👤 {user.email?.split('@')[0]}
                </Link>
                <button
                  onClick={signOut}
                  className="bg-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-white/10 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/dashboard" className="block px-3 py-2 hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={signOut} className="block w-full text-left px-3 py-2 text-red-400 hover:bg-white/10">
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex space-x-2 px-3 pt-2">
                <Link href="/login" className="flex-1 text-center px-3 py-2 bg-white/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/signup" className="flex-1 text-center px-3 py-2 bg-yellow-500 text-gray-900 rounded-lg font-bold" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
