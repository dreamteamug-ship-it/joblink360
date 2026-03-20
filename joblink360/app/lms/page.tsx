'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LMSHome() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  
  useEffect(() => {
    fetch(`/api/language?lang=${language}`)
      .then(res => res.json())
      .then(data => setTranslations(data));
      
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      });
  }, [language]);
  
  const languages = [
    { code: 'en', name: 'English', flag: '????' },
    { code: 'sw', name: 'Kiswahili', flag: '????' },
    { code: 'yo', name: 'Yorùbá', flag: '????' },
    { code: 'ha', name: 'Hausa', flag: '????' },
    { code: 'zu', name: 'isiZulu', flag: '????' },
    { code: 'xh', name: 'isiXhosa', flag: '????' }
  ];
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-amber-500">Loading Sovereign Courses...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Language Selector */}
      <div className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2 flex justify-end gap-2">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-3 py-1 rounded text-sm transition ${
                language === lang.code 
                  ? 'bg-amber-500 text-black' 
                  : 'hover:bg-zinc-800'
              }`}
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="border-b border-amber-500/30 pb-6 mb-8">
          <h1 className="text-5xl font-black text-amber-500 tracking-tighter">
            {translations.welcome || 'Sovereign'}
          </h1>
          <p className="text-zinc-500 text-sm tracking-widest mt-2">
            {translations.courses || 'CAREER ARCHITECTURE v1.0'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <div key={i} className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg hover:border-amber-500/50 transition-all duration-300 hover:bg-zinc-900">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs text-amber-500 font-bold uppercase tracking-wider">
                  {translations.enroll || 'Enroll'}
                </span>
                <span className="text-xs text-zinc-500">{course.Region}</span>
              </div>
              <h2 className="text-xl font-bold mb-4 group-hover:text-amber-500 transition">
                {course.Job_Title}
              </h2>
              <div className="w-full bg-zinc-800 h-1 rounded-full mb-4">
                <div className="bg-amber-500 h-1 rounded-full" style={{ width: `${course.Demand_Score}%` }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-500 font-bold">KES {course.price || 1500}</span>
                <Link href={`/lms/courses/${i}`} className="inline-flex items-center text-sm text-amber-500 hover:text-amber-400 transition">
                  {translations.learn_more || 'Enroll Now'} ?
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
