'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

export default function SovereignLMS() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    
    // Load courses from your 512-job dataset
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-amber-500">Loading Sovereign Courses...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-zinc-900 to-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-black text-amber-500 mb-4">Sovereign Academy</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Master high-income skills for the African market. 
            512 verified career tracks. Real jobs. Real results.
          </p>
          {!user && (
            <div className="mt-8 flex gap-4 justify-center">
              <Link href="/login" className="bg-amber-600 hover:bg-amber-500 px-6 py-3 rounded-lg font-bold transition">
                Get Started Free
              </Link>
              <Link href="/pricing" className="border border-amber-500 hover:bg-amber-500/10 px-6 py-3 rounded-lg font-bold transition">
                View Pricing
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Stats Bar */}
      <div className="bg-zinc-900 border-y border-zinc-800 py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-amber-500">512+</div>
              <div className="text-xs text-zinc-500">Active Courses</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-500">26</div>
              <div className="text-xs text-zinc-500">Countries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-500">16</div>
              <div className="text-xs text-zinc-500">Languages</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-500">KES 5K+</div>
              <div className="text-xs text-zinc-500">Average Income</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Career Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 12).map((course, i) => (
            <div key={i} className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition-all duration-300 hover:bg-zinc-900">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs text-amber-500 font-bold uppercase tracking-wider">
                  {course.Region}
                </span>
                <span className="text-xs text-zinc-500">Demand {course.Demand_Score}%</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">{course.Job_Title}</h3>
              <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                Master {course.Primary_Skill || 'AI skills'} for the {course.Region} market.
              </p>
              <div className="w-full bg-zinc-800 h-1 rounded-full mb-4">
                <div className="bg-amber-500 h-1 rounded-full" style={{ width: `${course.Demand_Score}%` }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-500 font-bold">KES {course.price || 1500}</span>
                <Link href={`/lms/courses/${i}`} className="inline-flex items-center text-sm text-amber-500 hover:text-amber-400 transition">
                  Enroll Now ?
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Link */}
        <div className="text-center mt-12">
          <Link href="/lms/all-courses" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 border border-amber-500/30 px-6 py-3 rounded-lg transition">
            View All 512 Courses ?
          </Link>
        </div>
      </div>
      
      {/* Language Section */}
      <div className="bg-zinc-900 py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Available in Your Language</h2>
          <p className="text-zinc-400 mb-6">All courses available in 16+ African languages</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['English', 'Kiswahili', 'Yorùbá', 'Hausa', 'isiZulu', 'isiXhosa', 'Luganda', 'Kinyarwanda', 'Amharic', 'Soomaali', 'chiShona'].map(lang => (
              <span key={lang} className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">{lang}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
