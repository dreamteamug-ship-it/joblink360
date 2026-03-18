// app/components/layout/Navbar.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Briefcase, DollarSign, FileText, Home, LogIn } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Funding', href: '/funding', icon: DollarSign },
    { name: 'Tenders', href: '/tenders', icon: FileText },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
              <span className="text-black font-bold text-xl">JL</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">
              JobLink<span className="text-yellow-400">360</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors group"
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="hidden md:flex items-center space-x-2 px-4 py-2 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/10 transition"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5 text-yellow-400" />
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              href="/login"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-yellow-600 text-black font-bold hover:bg-yellow-500 transition mt-4"
              onClick={() => setIsOpen(false)}
            >
              <LogIn className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
