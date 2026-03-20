// components/Navbar.tsx - Add Deal Room link
'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return (
    <nav className="bg-black/95 backdrop-blur-sm border-b border-amber-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-amber-500 tracking-tighter">
            JOBLINK 360
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/lms" className="text-zinc-400 hover:text-amber-500 transition">Academy</Link>
            <Link href="/titanium-erp" className="text-zinc-400 hover:text-amber-500 transition">ERP</Link>
            <Link href="/deal-room" className="text-amber-500 hover:text-amber-400 transition font-bold">Deal Room</Link>
            {user ? (
              <Link href="/account" className="bg-amber-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-500 transition">
                My Account
              </Link>
            ) : (
              <Link href="/login" className="bg-amber-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-500 transition">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
