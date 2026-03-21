'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MasteringLLMsCourse() {
  const params = useParams();
  const [selectedModule, setSelectedModule] = useState(0);
  const [activeTab, setActiveTab] = useState<'video' | 'audio' | 'print'>('video');
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('course_mastering-llms_completed');
    if (saved) {
      setCompletedModules(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const prog = Math.round((completedModules.length / course.modules.length) * 100);
    setProgress(prog);
    localStorage.setItem('course_mastering-llms_completed', JSON.stringify(completedModules));
  }, [completedModules]);

  const course = {
    title: 'Mastering LLMs: From ChatGPT to Claude',
    description: 'Complete training on all major Language Models - ChatGPT, Claude, Gemini, DeepSeek, Llama, Mistral, Cohere, and Perplexity',
    duration: '8 weeks',
    income: '$1,000-3,000/mo',
    modules: [
      { 
        title: 'Module 1: ChatGPT Mastery', 
        model: 'OpenAI GPT-4 / GPT-4o',
        content: 'Complete guide to ChatGPT - from basics to advanced. Learn prompt engineering, API usage, custom GPTs, and real-world applications. Master conversational AI, code generation, content creation, and business automation.',
        video: 'https://www.youtube.com/embed/2ePf9rue1Ao?autoplay=0&rel=0&modestbranding=1',
        duration: '60 min',
        keyTopics: ['Prompt Engineering', 'API Integration', 'Custom GPTs', 'Code Generation', 'Content Creation']
      },
      { 
        title: 'Module 2: Claude AI Mastery', 
        model: 'Anthropic Claude 3.5 Sonnet',
        content: 'Deep dive into Claude - Anthropic\'s most capable AI. Learn constitutional AI, large context windows (200K tokens), document analysis, and advanced reasoning. Perfect for complex tasks and enterprise applications.',
        video: 'https://www.youtube.com/embed/HcqpanDadyQ?autoplay=0&rel=0&modestbranding=1',
        duration: '55 min',
        keyTopics: ['Constitutional AI', '200K Context Window', 'Document Analysis', 'Advanced Reasoning', 'Enterprise Applications']
      },
      { 
        title: 'Module 3: Google Gemini', 
        model: 'Google Gemini 1.5 Pro',
        content: 'Master Google\'s multimodal AI. Learn text, image, audio, and video understanding. Explore 1M token context, native multimodality, and integration with Google ecosystem.',
        video: 'https://www.youtube.com/embed/0VjLRIAVXog?autoplay=0&rel=0&modestbranding=1',
        duration: '50 min',
        keyTopics: ['Multimodal AI', '1M Token Context', 'Image Understanding', 'Google Integration', 'YouTube Analysis']
      },
      { 
        title: 'Module 4: DeepSeek Mastery', 
        model: 'DeepSeek-V3 / DeepSeek-R1',
        content: 'Master China\'s most powerful open-source model. Learn DeepSeek\'s reasoning capabilities, 671B parameter architecture, and cost-effective API. Perfect for developers and researchers.',
        video: 'https://www.youtube.com/embed/f5Tk1Xw6FVo?autoplay=0&rel=0&modestbranding=1',
        duration: '45 min',
        keyTopics: ['Open Source AI', '671B Parameters', 'Reasoning Models', 'Cost-Effective API', 'Developer Tools']
      },
      { 
        title: 'Module 5: Meta Llama', 
        model: 'Llama 3 / Llama 3.1',
        content: 'Master Meta\'s open-source Llama family. Learn local deployment, fine-tuning, and customization. Perfect for privacy-focused applications and on-device AI.',
        video: 'https://www.youtube.com/embed/2ePf9rue1Ao?autoplay=0&rel=0&modestbranding=1',
        duration: '50 min',
        keyTopics: ['Open Source Models', 'Local Deployment', 'Fine-Tuning', 'Privacy-First AI', 'On-Device AI']
      },
      { 
        title: 'Module 6: Mistral AI', 
        model: 'Mistral Large / Mixtral',
        content: 'Master Europe\'s leading AI lab. Learn Mistral\'s efficient architecture, Mixtral of Experts, and commercial deployment. Perfect for production applications.',
        video: 'https://www.youtube.com/embed/HcqpanDadyQ?autoplay=0&rel=0&modestbranding=1',
        duration: '45 min',
        keyTopics: ['Mixtral of Experts', 'Efficient Architecture', 'Production Deployment', 'European AI', 'Commercial Applications']
      },
      { 
        title: 'Module 7: Cohere', 
        model: 'Cohere Command / Embed',
        content: 'Master Cohere\'s enterprise-focused models. Learn RAG (Retrieval-Augmented Generation), embeddings, and business applications. Perfect for enterprise AI.',
        video: 'https://www.youtube.com/embed/0VjLRIAVXog?autoplay=0&rel=0&modestbranding=1',
        duration: '50 min',
        keyTopics: ['RAG Systems', 'Embeddings', 'Enterprise AI', 'Business Applications', 'Search & Retrieval']
      },
      { 
        title: 'Module 8: Perplexity AI', 
        model: 'Perplexity Pro / Sonar',
        content: 'Master the AI search revolution. Learn Perplexity\'s real-time search, citation-based answers, and research capabilities. Perfect for researchers and knowledge workers.',
        video: 'https://www.youtube.com/embed/f5Tk1Xw6FVo?autoplay=0&rel=0&modestbranding=1',
        duration: '40 min',
        keyTopics: ['AI-Powered Search', 'Real-Time Information', 'Citation-Based Answers', 'Research Tools', 'Knowledge Discovery']
      }
    ]
  };

  const currentModule = course.modules[selectedModule];

  const markComplete = () => {
    if (!completedModules.includes(selectedModule)) {
      setCompletedModules([...completedModules, selectedModule]);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui' }}>
      {/* Navigation */}
      <nav style={{ borderBottom: '1px solid #333', padding: '1rem 2rem', background: '#000', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold' }}>🏠 Home</Link>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/lms" style={{ color: '#9ca3af', textDecoration: 'none' }}>📚 Courses</Link>
            <Link href="/funding" style={{ color: '#9ca3af', textDecoration: 'none' }}>💰 Funding</Link>
            <Link href="/tenders" style={{ color: '#9ca3af', textDecoration: 'none' }}>📋 Tenders</Link>
            <Link href="/jobs" style={{ color: '#9ca3af', textDecoration: 'none' }}>💼 Jobs</Link>
            <span style={{ background: '#10b981', color: '#000', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold' }}>FREE COURSE</span>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>🤖 {course.title}</h1>
            <p style={{ color: '#9ca3af' }}>{course.description}</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ background: '#10b98120', color: '#10b981', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem' }}>🎓 FREE</span>
              <span style={{ background: '#f59e0b20', color: '#f59e0b', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem' }}>💰 {course.income}</span>
              <span style={{ background: '#333', color: '#9ca3af', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem' }}>⏱️ {course.duration}</span>
            </div>
          </div>
          <div>
            <span style={{ background: '#111', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
              Progress: {progress}% ({completedModules.length}/{course.modules.length})
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}>
          {/* Main Content */}
          <div>
            <div style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '0.5rem', background: '#000' }}>
                <iframe
                  src={currentModule.video}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={currentModule.title}
                />
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ color: '#f59e0b', marginBottom: '0.25rem' }}>{currentModule.title}</h3>
                    <p style={{ color: '#10b981', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Model: {currentModule.model}</p>
                    <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>Duration: {currentModule.duration}</p>
                  </div>
                  <button
                    onClick={markComplete}
                    style={{ background: completedModules.includes(selectedModule) ? '#10b981' : '#f59e0b', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    {completedModules.includes(selectedModule) ? '✓ Completed' : 'Mark Complete'}
                  </button>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>📖 What You'll Learn</h4>
                  <p style={{ lineHeight: '1.6', color: '#fff' }}>{currentModule.content}</p>
                </div>

                <div>
                  <h4 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>🎯 Key Topics</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {currentModule.keyTopics.map((topic, i) => (
                      <span key={i} style={{ background: '#0a0a0a', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', color: '#9ca3af' }}>{topic}</span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  style={{ marginTop: '1rem', background: '#222', color: '#fff', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
                >
                  {showTranscript ? 'Hide Transcript' : 'Show Full Transcript'}
                </button>

                {showTranscript && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: '#0a0a0a', borderRadius: '0.5rem', maxHeight: '300px', overflow: 'auto' }}>
                    <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: '1.6' }}>
                      {currentModule.content} This comprehensive module covers all aspects of {currentModule.model}, including architecture, best practices, API integration, and real-world applications. You'll learn through hands-on exercises and practical examples.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Module List */}
          <div style={{ background: '#111', borderRadius: '1rem', padding: '1rem', maxHeight: '600px', overflow: 'auto' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Course Modules ({course.modules.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {course.modules.map((module, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedModule(idx)}
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem',
                    background: selectedModule === idx ? '#f59e0b20' : 'transparent',
                    border: selectedModule === idx ? '1px solid #f59e0b' : '1px solid #222',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    color: '#fff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: selectedModule === idx ? 'bold' : 'normal', fontSize: '0.875rem' }}>{module.title}</div>
                      <div style={{ fontSize: '0.7rem', color: '#10b981' }}>{module.model.split(' ')[0]}</div>
                    </div>
                    {completedModules.includes(idx) && <span style={{ color: '#10b981' }}>✓</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {progress === 100 && (
          <div style={{ marginTop: '2rem', background: '#10b98120', border: '1px solid #10b981', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
            <h3 style={{ color: '#10b981' }}>🎉 Congratulations! You've mastered all 8 LLMs!</h3>
            <p>You are now proficient in ChatGPT, Claude, Gemini, DeepSeek, Llama, Mistral, Cohere, and Perplexity.</p>
            <button style={{ background: '#f59e0b', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', marginTop: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
              📜 Download Master Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
