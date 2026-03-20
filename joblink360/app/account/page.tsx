'use client';
import { useEffect, useState } from 'react';
import { supabase, signOut, getCurrentUser } from '@/lib/auth/supabase';
import Link from 'next/link';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getCurrentUser().then(user => {
      setUser(user);
      setLoading(false);
    });
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-amber-500">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Sign In Required</h1>
          <Link href="/login" className="bg-amber-600 px-6 py-3 rounded-lg">Sign In</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-amber-500 mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            <p><strong>Name:</strong> {user.user_metadata?.full_name || user.email}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Member Since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
          </div>
          
          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">My Courses</h2>
            <p className="text-zinc-400">You haven't enrolled in any courses yet.</p>
            <Link href="/lms" className="inline-block mt-4 text-amber-500 hover:text-amber-400">Browse Courses ?</Link>
          </div>
          
          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Subscription</h2>
            <p className="text-zinc-400">No active subscription</p>
            <button className="mt-4 bg-amber-600 px-4 py-2 rounded">Subscribe Now</button>
          </div>
        </div>
        
        <button onClick={() => signOut()} className="mt-8 text-red-500 hover:text-red-400">Sign Out</button>
      </div>
    </div>
  );
}
