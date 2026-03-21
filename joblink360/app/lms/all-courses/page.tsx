'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => { setCourses(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);
  
  const filtered = courses.filter(c => 
    c.Job_Title?.toLowerCase().includes(search.toLowerCase()) ||
    c.Region?.toLowerCase().includes(search.toLowerCase())
  );
  
  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading 512 courses...</div>;
  
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-amber-500">All Courses</h1>
          <Link href="/lms" className="text-zinc-400 hover:text-amber-500">? Back</Link>
        </div>
        <input type="text" placeholder="Search by job title or region..." value={search} onChange={(e) => setSearch(e.target.value)} 
               className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white mb-6 focus:outline-none focus:border-amber-500" />
        <div className="text-sm text-zinc-500 mb-4">{filtered.length} of {courses.length} courses</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course, i) => (
            <div key={i} className="border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs text-amber-500 font-bold">{course.Region}</span>
                <span className="text-xs text-zinc-500">Demand {course.Demand_Score}%</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{course.Job_Title}</h3>
              <div className="flex items-center justify-between mt-4">
                <span className="text-amber-500 font-bold">KES {course.price || 1500}</span>
                <Link href={`/lms/courses/${i}`} className="text-sm text-amber-500 hover:text-amber-400">Enroll ?</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


