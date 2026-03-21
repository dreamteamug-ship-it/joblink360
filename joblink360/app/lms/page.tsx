// app/lms/page.tsx
'use client';
import { useState, useEffect } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  enrolled: boolean;
}

export default function LMSPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, title: "AI Fundamentals for Africans", description: "Learn AI basics with African context", category: "AI", duration: "4 weeks", level: "Beginner", enrolled: false },
    { id: 2, title: "Data Annotation & Labeling", description: "Earn $10-20/hour from home", category: "AI", duration: "2 weeks", level: "Beginner", enrolled: false },
    { id: 3, title: "AI Content Creation", description: "Create content using AI tools", category: "Content", duration: "3 weeks", level: "Intermediate", enrolled: false },
    { id: 4, title: "Virtual Assistant Mastery", description: "Become a high-earning VA", category: "Business", duration: "4 weeks", level: "Beginner", enrolled: false },
    { id: 5, title: "Grant Writing for Africa", description: "Win funding opportunities", category: "Funding", duration: "3 weeks", level: "Intermediate", enrolled: false },
    { id: 6, title: "AI Prompt Engineering", description: "Master ChatGPT and Claude", category: "AI", duration: "2 weeks", level: "Advanced", enrolled: false },
    { id: 7, title: "Digital Marketing with AI", description: "Automate marketing campaigns", category: "Marketing", duration: "4 weeks", level: "Intermediate", enrolled: false },
    { id: 8, title: "Freelancing Success", description: "Build your Upwork/Fiverr career", category: "Business", duration: "3 weeks", level: "Beginner", enrolled: false },
  ]);
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [enrolling, setEnrolling] = useState<number | null>(null);
  
  const categories = ["All", "AI", "Content", "Business", "Funding", "Marketing"];
  
  const filteredCourses = selectedCategory === "All" 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);
  
  const handleEnroll = async (courseId: number) => {
    setEnrolling(courseId);
    
    // Check if user has paid
    const hasPaid = confirm("Have you paid KES 5,000 via M-Pesa Paybill 400200, Account 4045731?");
    
    if (hasPaid) {
      // Update course as enrolled
      setCourses(courses.map(c => 
        c.id === courseId ? { ...c, enrolled: true } : c
      ));
      alert("✅ Course enrolled! Amanda will contact you with your 90-day plan.");
    } else {
      alert("❌ Please pay KES 5,000 via M-Pesa Paybill 400200, Account 4045731 to unlock courses.");
      window.location.href = "/pay";
    }
    
    setEnrolling(null);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-500">Learning Management System</h1>
            <p className="text-zinc-400 mt-2">50+ AI-powered courses to transform your career</p>
          </div>
          <a href="/pay" className="bg-amber-600 hover:bg-amber-700 px-6 py-2 rounded-lg font-bold transition">
            💰 Pay KES 5,000
          </a>
        </div>
        
        {/* Category Filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === cat 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-500 rounded-full">
                  {course.category}
                </span>
                <span className="text-xs text-zinc-500">{course.duration}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-zinc-400 text-sm mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500">{course.level}</span>
                {course.enrolled ? (
                  <span className="text-green-500 text-sm">✓ Enrolled</span>
                ) : (
                  <button
                    onClick={() => handleEnroll(course.id)}
                    disabled={enrolling === course.id}
                    className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg text-sm transition disabled:opacity-50"
                  >
                    {enrolling === course.id ? 'Processing...' : 'Enroll Now'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Income Plan */}
        <div className="mt-12 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-amber-500 mb-4">🎯 Your 90-Day Income Plan</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-black/50 p-4 rounded-lg">
              <div className="text-2xl mb-2">📚</div>
              <p className="font-bold">Week 1-2</p>
              <p className="text-sm text-zinc-400">Complete 3 core courses</p>
            </div>
            <div className="bg-black/50 p-4 rounded-lg">
              <div className="text-2xl mb-2">💼</div>
              <p className="font-bold">Week 3-8</p>
              <p className="text-sm text-zinc-400">Apply to 50+ jobs daily</p>
            </div>
            <div className="bg-black/50 p-4 rounded-lg">
              <div className="text-2xl mb-2">💰</div>
              <p className="font-bold">Week 9-12</p>
              <p className="text-sm text-zinc-400">Scale to $1,000/month</p>
            </div>
            <div className="bg-black/50 p-4 rounded-lg">
              <div className="text-2xl mb-2">🚀</div>
              <p className="font-bold">90 Days</p>
              <p className="text-sm text-zinc-400">Income earned!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}