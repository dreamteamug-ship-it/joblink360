'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-black text-amber-500 mb-4">JobLink 360</h1>
        <p className="text-xl text-zinc-400 mb-8">Africa's first AI-powered career platform</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/lms" className="bg-amber-600 px-6 py-3 rounded-lg font-bold hover:bg-amber-500 transition">
            Start Learning
          </Link>
          <Link href="/deal-room" className="border border-amber-500 px-6 py-3 rounded-lg font-bold hover:bg-amber-500/10 transition">
            Deal Room
          </Link>
          <Link href="/login" className="border border-zinc-700 px-6 py-3 rounded-lg font-bold hover:bg-zinc-800 transition">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}