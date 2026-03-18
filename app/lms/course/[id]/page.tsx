'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/app/components/layout/Navbar';
import { useParams } from 'next/navigation';
import { BookOpen, Clock, Award, Star, Users, PlayCircle, CheckCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CoursePage() {
  const params = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(0);

  useEffect(() => {
    fetchCourse();
  }, [params.id]);

  const fetchCourse = async () => {
    try {
      const mockCourse = {
        id: params.id,
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
        learningObjectives: [
          'Master enterprise AI development',
          'Build production-ready AI systems',
          'Understand LLM architecture',
          'Deploy AI solutions in the cloud'
        ],
        curriculum: [
          { title: 'Introduction to Sovereign AI', duration: '45 min', topics: ['What is Sovereign AI?', 'The AI Landscape', 'Course Overview'] },
          { title: 'LLM Architecture Deep Dive', duration: '60 min', topics: ['Transformers explained', 'Attention mechanisms', 'Model architectures'] },
          { title: 'Prompt Engineering Mastery', duration: '55 min', topics: ['Zero-shot prompting', 'Chain-of-thought', 'Advanced techniques'] },
          { title: 'Building AI Applications', duration: '75 min', topics: ['API integration', 'Frontend development', 'Deployment strategies'] },
          { title: 'Enterprise Security', duration: '50 min', topics: ['Data privacy', 'Compliance', 'Security best practices'] },
          { title: 'Production Deployment', duration: '65 min', topics: ['Scaling', 'Monitoring', 'Cost optimization'] },
          { title: 'Case Studies', duration: '60 min', topics: ['Real-world examples', 'Success stories', 'Lessons learned'] },
          { title: 'Final Project', duration: '90 min', topics: ['Build your own AI app', 'Peer review', 'Certification'] }
        ]
      };
      setCourse(mockCourse);
    } catch (error) {
      console.error('Failed to fetch course:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-yellow-400 border-t-transparent"></div>
          <p className="mt-4 text-gray-400">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="bg-gradient-to-b from-gray-900 to-black pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/lms" className="hover:text-yellow-400">Courses</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-yellow-400">{course?.title}</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h1 className="text-4xl font-bold mb-4">{course?.title}</h1>
              <p className="text-gray-400 mb-6">{course?.description}</p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2"><Users className="w-5 h-5 text-yellow-400" /><span>{course?.students} students</span></div>
                <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-yellow-400" /><span>{course?.duration}</span></div>
                <div className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-yellow-400" /><span>{course?.modules} modules</span></div>
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(course?.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                  ))}
                </div>
                <span className="text-yellow-400 font-bold">{course?.rating}</span>
                <span className="text-gray-500">(1,247 reviews)</span>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-bold mb-4">What you'll learn</h3>
                <ul className="space-y-3">
                  {course?.learningObjectives.map((obj: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-3xl font-bold text-yellow-400">KES {course?.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">or KES 389/month</p>
                </div>
                <button className="px-8 py-4 bg-yellow-600 text-black rounded-lg font-bold hover:bg-yellow-500 transition flex-1">
                  Enroll Now
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-600/20 to-purple-600/20 rounded-xl aspect-video flex items-center justify-center">
              <PlayCircle className="w-20 h-20 text-yellow-400 opacity-70 hover:opacity-100 transition cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-8">Course Curriculum</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {course?.curriculum.map((module: any, i: number) => (
              <div key={i} className="bg-gray-800/30 border border-gray-700 rounded-lg overflow-hidden">
                <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-700/30 transition"
                     onClick={() => setActiveModule(activeModule === i ? -1 : i)}>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-yellow-600/20 rounded-full flex items-center justify-center text-yellow-400 font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-bold">{module.title}</h3>
                      <p className="text-sm text-gray-500">{module.duration}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition ${activeModule === i ? 'rotate-90' : ''}`} />
                </div>
                {activeModule === i && (
                  <div className="p-4 border-t border-gray-700 bg-gray-900/50">
                    <ul className="space-y-2">
                      {module.topics.map((topic: string, j: number) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                          <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 h-fit sticky top-24">
            <h3 className="text-lg font-bold mb-4">This course includes</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm"><PlayCircle className="w-5 h-5 text-yellow-400" /><span>8 hours on-demand video</span></li>
              <li className="flex items-center gap-3 text-sm"><BookOpen className="w-5 h-5 text-yellow-400" /><span>8 downloadable resources</span></li>
              <li className="flex items-center gap-3 text-sm"><Award className="w-5 h-5 text-yellow-400" /><span>Certificate of completion</span></li>
              <li className="flex items-center gap-3 text-sm"><Users className="w-5 h-5 text-yellow-400" /><span>Access on mobile and TV</span></li>
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-2">Taught by</p>
              <p className="font-bold">{course?.instructor}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}