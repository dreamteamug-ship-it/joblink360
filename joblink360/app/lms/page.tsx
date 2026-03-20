'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLanguageOptions } from '@/lib/i18n/languages';

export default function LMSHome() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  
  const languages = getLanguageOptions();
  
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
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-amber-500">Loading Sovereign Courses...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Enhanced Language Selector with Regional Groups */}
      <div className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="text-xs text-zinc-500">
            ?? 26+ Languages • 16 Countries
          </div>
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition flex items-center gap-2"
            >
              <span>{languages.find(l => l.code === language)?.flag || '??'}</span>
              <span>{languages.find(l => l.code === language)?.name || 'English'}</span>
              <span>?</span>
            </button>
            
            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs text-zinc-500 px-3 py-2 border-b border-zinc-800">East Africa</div>
                  {languages.filter(l => ['sw','kik','lug','kin','run','amh','som','lin'].includes(l.code)).map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setShowLanguageMenu(false); }}
                      className={`w-full text-left px-3 py-2 rounded hover:bg-zinc-800 transition flex items-center gap-2 ${language === lang.code ? 'bg-zinc-800 text-amber-500' : ''}`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                      <span className="text-xs text-zinc-500 ml-auto">{lang.region}</span>
                    </button>
                  ))}
                  
                  <div className="text-xs text-zinc-500 px-3 py-2 border-t border-zinc-800 mt-2">Southern Africa</div>
                  {languages.filter(l => ['bem','nya','ndo','sna','tso','ven','ndb','loz'].includes(l.code)).map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setShowLanguageMenu(false); }}
                      className={`w-full text-left px-3 py-2 rounded hover:bg-zinc-800 transition flex items-center gap-2 ${language === lang.code ? 'bg-zinc-800 text-amber-500' : ''}`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                      <span className="text-xs text-zinc-500 ml-auto">{lang.region}</span>
                    </button>
                  ))}
                  
                  <div className="text-xs text-zinc-500 px-3 py-2 border-t border-zinc-800 mt-2">West & Central Africa</div>
                  {languages.filter(l => ['kng','sag','wo','ff','bm','tw'].includes(l.code)).map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setShowLanguageMenu(false); }}
                      className={`w-full text-left px-3 py-2 rounded hover:bg-zinc-800 transition flex items-center gap-2 ${language === lang.code ? 'bg-zinc-800 text-amber-500' : ''}`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                      <span className="text-xs text-zinc-500 ml-auto">{lang.region}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="border-b border-amber-500/30 pb-6 mb-8">
          <h1 className="text-5xl font-black text-amber-500 tracking-tighter">
            {translations.welcome || 'Sovereign'}
          </h1>
          <p className="text-zinc-500 text-sm tracking-widest mt-2">
            {translations.courses || 'CAREER ARCHITECTURE v1.0'} • 26 Countries • 16+ Languages
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
                <span className="text-amber-500 font-bold">{translations.currency || 'KES'} {course.price || 1500}</span>
                <Link href={`/lms/courses/${i}`} className="inline-flex items-center text-sm text-amber-500 hover:text-amber-400 transition">
                  {translations.learn_more || 'Enroll Now'} ?
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-sm text-zinc-600 border-t border-zinc-800 pt-8">
          <p>?? Serving 26 Countries Across Africa | ???? ???? ???? ???? ???? ???? ???? ???? ???? ???? ???? ???? ???? ???? ???? ???? ???? ???? ????</p>
          <p className="mt-2">Available in: English, Kiswahili, Gikuyu, Luganda, Kinyarwanda, Runyankole, Amharic, Soomaali, Lingala, ChiBemba, Chichewa, Oshiwambo, chiShona, Xitsonga, Tshivenda, isiNdebele, Silozi, Kikongo, Sango, Wolof, Fulfulde, Bamanankan, Twi</p>
        </div>
      </div>
    </div>
  );
}
