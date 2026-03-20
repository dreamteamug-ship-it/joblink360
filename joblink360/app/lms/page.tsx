'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LMSHome() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <div className="relative bg-gradient-to-b from-zinc-900 to-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-black text-amber-500 mb-4">Sovereign Academy</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Master high-income skills for the African market. 512 verified career tracks.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 12).map((course, i) => (
            <div key={i} className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs text-amber-500 font-bold uppercase tracking-wider">{course.Region}</span>
                <span className="text-xs text-zinc-500">Demand {course.Demand_Score}%</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">{course.Job_Title}</h3>
              <div className="w-full bg-zinc-800 h-1 rounded-full mb-4">
                <div className="bg-amber-500 h-1 rounded-full" style={{ width: `${course.Demand_Score}%` }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-500 font-bold">KES {course.price || 1500}</span>
                <Link href={`/lms/courses/${i}`} className="text-sm text-amber-500 hover:text-amber-400">Enroll →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}