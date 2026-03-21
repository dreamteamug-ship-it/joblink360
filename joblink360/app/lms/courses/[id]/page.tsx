'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CourseDetail() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    fetch(`/api/courses/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-amber-500">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-amber-500 mb-4">Course Not Found</h1>
          <Link href="/lms" className="text-zinc-400 hover:text-amber-500">â† Back to Courses</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[60vh] bg-gradient-to-b from-zinc-900 to-black">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <span className="text-amber-500 text-sm uppercase tracking-wider">{course.Region}</span>
            <h1 className="text-5xl font-bold mt-2 mb-4">{course.Job_Title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full text-sm">
                Demand: {course.Demand_Score}%
              </span>
            </div>
            <p className="text-xl text-zinc-300 mb-8">{course.description}</p>
            <button className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-lg font-bold transition">
              Enroll Now â€” KES 1,500
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="bg-zinc-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-amber-500 mb-4">What You'll Learn</h2>
              <ul className="space-y-2">
                {course.skills?.map((skill, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-300">
                    <span className="text-amber-500">âœ“</span> {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6 sticky top-24">
            <h3 className="font-bold mb-4">Course Includes</h3>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>ðŸŽ¥ Video lessons</li>
              <li>ðŸ“ Quizzes & assignments</li>
              <li>ðŸŽ“ Certificate on completion</li>
              <li>ðŸ’¬ Amanda AI support</li>
            </ul>
            <hr className="my-4 border-zinc-800" />
            <p className="text-2xl font-bold text-amber-500 text-center">KES {course.price || 1500}</p>
            <button className="w-full mt-4 bg-amber-600 hover:bg-amber-500 py-2 rounded-lg font-bold transition">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

