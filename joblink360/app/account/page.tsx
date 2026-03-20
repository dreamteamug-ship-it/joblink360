'use client';
import { useEffect, useState } from 'react';
import { supabase, signOut, getCurrentUser } from '@/lib/auth/supabase';
import Link from 'next/link';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    getCurrentUser().then(setUser);
    // Load enrolled courses
    fetch('/api/user/courses').then(res => res.json()).then(setCourses);
    // Load subscription
    fetch('/api/subscription/status').then(res => res.json()).then(setSubscription);
  }, []);
  
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
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
        <div className="grid grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="col-span-1">
            <div className="bg-zinc-900 rounded-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">{user.email?.[0].toUpperCase()}</span>
                </div>
                <h3 className="font-bold">{user.user_metadata?.full_name || user.email}</h3>
                <p className="text-xs text-zinc-500">{user.email}</p>
              </div>
              <nav className="space-y-2">
                <Link href="/account" className="block py-2 px-3 bg-amber-500/20 text-amber-500 rounded">Dashboard</Link>
                <Link href="/account/courses" className="block py-2 px-3 hover:bg-zinc-800 rounded">My Courses</Link>
                <Link href="/account/certificates" className="block py-2 px-3 hover:bg-zinc-800 rounded">Certificates</Link>
                <Link href="/account/subscription" className="block py-2 px-3 hover:bg-zinc-800 rounded">Subscription</Link>
                <button onClick={() => signOut()} className="w-full text-left py-2 px-3 text-red-500 hover:bg-zinc-800 rounded mt-4">
                  Sign Out
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="col-span-3">
            <div className="bg-zinc-900 rounded-lg p-6 mb-8">
              <h1 className="text-3xl font-bold text-amber-500 mb-2">Welcome Back, {user.user_metadata?.full_name || user.email}</h1>
              <p className="text-zinc-400">Continue your journey toward sovereignty.</p>
            </div>
            
            {/* Subscription Status */}
            <div className="bg-zinc-900 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Subscription Status</h2>
              {subscription?.active ? (
                <div className="bg-green-500/10 border border-green-500 rounded-lg p-4">
                  <p className="text-green-500 font-bold">? Active</p>
                  <p className="text-sm text-zinc-400">Plan: {subscription.plan}</p>
                  <p className="text-sm text-zinc-400">Next billing: {subscription.next_billing}</p>
                </div>
              ) : (
                <div className="bg-amber-500/10 border border-amber-500 rounded-lg p-4">
                  <p className="text-amber-500 font-bold">?? No Active Subscription</p>
                  <Link href="/pricing" className="inline-block mt-2 bg-amber-600 px-4 py-2 rounded text-sm">Subscribe Now</Link>
                </div>
              )}
            </div>
            
            {/* Enrolled Courses */}
            <div className="bg-zinc-900 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">My Courses</h2>
              {courses.length === 0 ? (
                <p className="text-zinc-500">You haven't enrolled in any courses yet.</p>
              ) : (
                <div className="space-y-3">
                  {courses.map(course => (
                    <div key={course.id} className="border border-zinc-800 rounded-lg p-4 hover:border-amber-500/50 transition">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold">{course.Job_Title}</h3>
                          <p className="text-sm text-zinc-500">{course.Region}</p>
                        </div>
                        <Link href={`/lms/courses/${course.id}`} className="text-amber-500 text-sm hover:underline">Continue ?</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
