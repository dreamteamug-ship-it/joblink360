'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/app/components/layout/Navbar';
import Link from 'next/link';
import { BookOpen, Clock, Award, Star, Users, PlayCircle } from 'lucide-react';

export default function LMSPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      // In a real app, this would fetch from your API
      // For now, we'll use mock data
      const mockCourses = [
        {
          id: 1,
          title: 'Sovereign Intelligence Masterclass',
          description: 'Complete AI training with 4K video lectures, PDF workbooks, and blockchain certification',
          instructor: 'Amanda AI + Expert Trainers',
          duration: '10 weeks',
          modules: 8,
          students: 1247,
          rating: 4.8,
          price: 38999,
          level: 'Advanced',
          category: 'ai',
          image: '/courses/ai-masterclass.jpg',
          features: ['4K Video Lectures', 'PDF Workbooks', 'Certificate', 'AI Agent Access']
        },
        {
          id: 2,
          title: 'AI Data Labeling Professional',
          description: 'Master image annotation, NLP tagging, and quality assurance for AI training data',
          instructor: 'Kwame AI',
          duration: '6 weeks',
          modules: 6,
          students: 892,
          rating: 4.7,
          price: 25999,
          level: 'Intermediate',
          category: 'data',
          image: '/courses/data-labeling.jpg',
          features: ['Hands-on Projects', 'QA Guidelines', 'Certification']
        },
        {
          id: 3,
          title: 'Business Japanese for AI',
          description: 'Technical Japanese for AI professionals with native speakers and business etiquette',
          instructor: 'Amara AI',
          duration: '8 weeks',
          modules: 8,
          students: 567,
          rating: 4.9,
          price: 32499,
          level: 'Intermediate',
          category: 'language',
          image: '/courses/japanese.jpg',
          features: ['Native Speakers', 'Technical Glossary', 'Business Etiquette']
        },
        {
          id: 4,
          title: 'B2B Lead Generation Mastery',
          description: 'Master modern lead generation strategies for African and global markets',
          instructor: 'Jabari AI',
          duration: '5 weeks',
          modules: 5,
          students: 423,
          rating: 4.6,
          price: 28999,
          level: 'Beginner',
          category: 'business',
          image: '/courses/leadgen.jpg',
          features: ['Prospecting', 'CRM Tools', 'Outreach Strategies']
        },
        {
          id: 5,
          title: 'Virtual Assistant Executive',
          description: 'Become a certified executive VA with advanced calendar, email, and travel management',
          instructor: 'Zuri AI',
          duration: '4 weeks',
          modules: 4,
          students: 789,
          rating: 4.8,
          price: 19999,
          level: 'Beginner',
          category: 'va',
          image: '/courses/va.jpg',
          features: ['Calendar Management', 'Email Mastery', 'Travel Booking']
        },
        {
          id: 6,
          title: 'Customer Support Excellence',
          description: 'Master Zendesk, communication skills, and problem-solving for global clients',
          instructor: 'Baraka AI',
          duration: '3 weeks',
          modules: 3,
          students: 634,
          rating: 4.7,
          price: 16999,
          level: 'Beginner',
          category: 'support',
          image: '/courses/support.jpg',
          features: ['Zendesk Training', 'Communication', 'Problem Solving']
        }
      ];
      
      setCourses(mockCourses);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = category === 'all' 
    ? courses 
    : courses.filter((c: any) => c.category === category);

  const categories = [
    { id: 'all', name: 'All Courses', icon: '📚' },
    { id: 'ai', name: 'AI & Machine Learning', icon: '🤖' },
    { id: 'data', name: 'Data Science', icon: '📊' },
    { id: 'language', name: 'Languages', icon: '🗣️' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'va', name: 'Virtual Assistant', icon: '📅' },
    { id: 'support', name: 'Customer Support', icon: '🎧' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-900 to-black pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-yellow-400">Titanium</span> Academy
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            AI-powered courses designed to launch your career in tech, business, and AI. 
            Learn from expert trainers and our AI agent swarm.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800/30 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-yellow-400">1,247+</div>
            <div className="text-sm text-gray-400">Active Students</div>
          </div>
          <div className="bg-gray-800/30 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-yellow-400">12</div>
            <div className="text-sm text-gray-400">AI-Powered Courses</div>
          </div>
          <div className="bg-gray-800/30 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-yellow-400">94%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </div>
          <div className="bg-gray-800/30 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-yellow-400">26</div>
            <div className="text-sm text-gray-400">Countries</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-full transition ${
                category === cat.id
                  ? 'bg-yellow-600 text-black'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-yellow-400 border-t-transparent"></div>
            <p className="mt-4 text-gray-400">Loading courses...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course: any) => (
              <div key={course.id} className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-400/50 transition group">
                <div className="h-48 bg-gradient-to-br from-yellow-600/20 to-purple-600/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-yellow-400 opacity-50 group-hover:opacity-100 transition" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-yellow-400">{course.title}</h3>
                    <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-xs">
                      {course.level}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" /> {course.modules} modules
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {course.students}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                    ))}
                    <span className="text-sm text-gray-400 ml-2">{course.rating}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.features.slice(0, 3).map((feature: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-yellow-400">KES {course.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">or KES 389/month</p>
                    </div>
                    <Link href={`/lms/course/${course.id}`}>
                      <button className="px-4 py-2 bg-yellow-600 text-black rounded-lg font-bold hover:bg-yellow-500 transition">
                        Enroll Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
