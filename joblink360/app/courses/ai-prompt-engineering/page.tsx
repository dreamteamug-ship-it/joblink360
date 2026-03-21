'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CoursePage() {
  const params = useParams();
  const courseId = params.id;
  const [selectedModule, setSelectedModule] = useState(0);
  const [activeTab, setActiveTab] = useState<'video' | 'audio' | 'print'>('video');
  const [showTranscript, setShowTranscript] = useState(false);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [enrolled, setEnrolled] = useState(false);
  
  // Course data based on ID
  const getCourseData = () => {
    const courses: Record<string, any> = {
      'virtual-assistant-elite': {
        title: 'Virtual Assistant Elite',
        description: 'Become a certified Virtual Assistant and earn $400-800/month',
        modules: [
          { title: 'VA Foundations', videoId: 'VA1', transcript: 'Learn the fundamentals of being a Virtual Assistant...', duration: '45 min' },
          { title: 'Email & Calendar Management', videoId: 'VA2', transcript: 'Master inbox zero and calendar optimization...', duration: '50 min' },
          { title: 'Research Skills', videoId: 'VA3', transcript: 'Advanced research techniques for VAs...', duration: '40 min' },
          { title: 'Social Media Management', videoId: 'VA4', transcript: 'Manage social media accounts professionally...', duration: '55 min' },
          { title: 'Tools — Notion, Asana, Slack', videoId: 'VA5', transcript: 'Master the essential VA tools...', duration: '60 min' },
          { title: 'Client Communication', videoId: 'VA6', transcript: 'Professional communication skills...', duration: '45 min' },
          { title: 'Finding Clients — Fiverr & Upwork', videoId: 'VA7', transcript: 'Land your first clients on freelance platforms...', duration: '50 min' },
          { title: 'First $800/month', videoId: 'VA8', transcript: 'Scaling to consistent monthly income...', duration: '55 min' }
        ]
      },
      'ai-prompt-engineering': {
        title: 'AI Prompt Engineering',
        description: 'Master the art of prompting AI for maximum results',
        modules: [
          { title: 'Prompt Basics', videoId: 'PE1', transcript: 'Understanding how prompts work...', duration: '45 min' },
          { title: 'Zero-Shot Prompting', videoId: 'PE2', transcript: 'Get results without examples...', duration: '50 min' },
          { title: 'Few-Shot Prompting', videoId: 'PE3', transcript: 'Using examples to guide AI...', duration: '55 min' },
          { title: 'Chain-of-Thought', videoId: 'PE4', transcript: 'Guide AI through reasoning steps...', duration: '60 min' },
          { title: 'Role-Based Prompts', videoId: 'PE5', transcript: 'Make AI act as experts...', duration: '45 min' },
          { title: 'Advanced Techniques', videoId: 'PE6', transcript: 'Complex prompting strategies...', duration: '55 min' },
          { title: 'Real-World Applications', videoId: 'PE7', transcript: 'Apply prompting to real tasks...', duration: '50 min' },
          { title: 'Monetizing Skills', videoId: 'PE8', transcript: 'Turn prompting into income...', duration: '45 min' }
        ]
      },
      'data-annotation-mastery': {
        title: 'Data Annotation Mastery',
        description: 'Become a certified data annotator',
        modules: Array(12).fill(null).map((_, i) => ({ title: `Module ${i+1}: Data Annotation Skills`, videoId: `DA${i+1}`, transcript: `Learn data annotation techniques...`, duration: '45 min' }))
      },
      'high-ticket-sales': {
        title: 'High-Ticket Virtual Sales',
        description: 'Close $2,000-5,000/month deals',
        modules: Array(16).fill(null).map((_, i) => ({ title: `Module ${i+1}: Sales Mastery`, videoId: `HS${i+1}`, transcript: `High-ticket sales techniques...`, duration: '45 min' }))
      },
      'sovereign-prompt': {
        title: 'Sovereign Prompt Engineering',
        description: 'Elite prompting for expert results',
        modules: Array(16).fill(null).map((_, i) => ({ title: `Module ${i+1}: Elite Prompting`, videoId: `SP${i+1}`, transcript: `Advanced prompting...`, duration: '50 min' }))
      },
      'pan-african-trade': {
        title: 'Pan-African Trade AI',
        description: 'Master AI for African trade',
        modules: Array(20).fill(null).map((_, i) => ({ title: `Module ${i+1}: Trade AI`, videoId: `PT${i+1}`, transcript: `African trade with AI...`, duration: '45 min' }))
      },
      'grant-writing-ai': {
        title: 'Grant Writing with AI',
        description: 'Win grants using AI tools',
        modules: Array(10).fill(null).map((_, i) => ({ title: `Module ${i+1}: Grant Writing`, videoId: `GW${i+1}`, transcript: `Grant writing techniques...`, duration: '50 min' }))
      },
      'titanium-erp': {
        title: 'Titanium ERP Operations',
        description: 'Master business operations',
        modules: Array(14).fill(null).map((_, i) => ({ title: `Module ${i+1}: ERP Skills`, videoId: `TE${i+1}`, transcript: `ERP system mastery...`, duration: '55 min' }))
      }
    };
    return courses[courseId] || courses['virtual-assistant-elite'];
  };
  
  const course = getCourseData();
  const currentModule = course.modules[selectedModule];
  
  const markComplete = () => {
    if (!completedModules.includes(selectedModule)) {
      setCompletedModules([...completedModules, selectedModule]);
    }
  };
  
  const progress = Math.round((completedModules.length / course.modules.length) * 100);
  
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui' }}>
      <nav style={{ borderBottom: '1px solid #333', padding: '1rem 2rem', background: '#000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/lms" style={{ color: '#f59e0b', textDecoration: 'none' }}>← Back to Courses</Link>
          <div>
            <span style={{ color: '#10b981', marginRight: '1rem' }}>Progress: {progress}%</span>
            <Link href="/pay" style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none' }}>Pay KES 5,000</Link>
          </div>
        </div>
      </nav>
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>{course.title}</h1>
        <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>{course.description}</p>
        <p style={{ color: '#10b981', marginBottom: '2rem' }}>💰 Income Potential: {courseId === 'virtual-assistant-elite' ? '$400-800/mo' : courseId === 'ai-prompt-engineering' ? '$500-1,000/mo' : '$1,000-5,000/mo'}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
          {/* Video Player */}
          <div>
            <div style={{ background: '#111', borderRadius: '1rem', padding: '1rem' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '0.5rem' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${currentModule.videoId === 'VA1' ? 'dQw4w9WgXcQ' : currentModule.videoId === 'VA2' ? 'jNQXAC9IVRw' : 'Z1dFbCkXFkE'}?autoplay=0&rel=0&modestbranding=1&hd=1`}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ color: '#f59e0b' }}>{currentModule.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Duration: {currentModule.duration}</p>
                <div style={{ marginTop: '1rem' }}>
                  <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    style={{ background: '#222', color: '#fff', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', marginRight: '1rem', cursor: 'pointer' }}
                  >
                    {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
                  </button>
                  <button
                    onClick={markComplete}
                    style={{ background: completedModules.includes(selectedModule) ? '#10b981' : '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
                  >
                    {completedModules.includes(selectedModule) ? '✓ Completed' : 'Mark Complete'}
                  </button>
                </div>
                {showTranscript && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: '#0a0a0a', borderRadius: '0.5rem' }}>
                    <p style={{ color: '#9ca3af' }}>{currentModule.transcript}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Module List */}
          <div style={{ background: '#111', borderRadius: '1rem', padding: '1rem' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Course Modules ({course.modules.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '500px', overflow: 'auto' }}>
              {course.modules.map((module: any, idx: number) => (
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
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: selectedModule === idx ? 'bold' : 'normal' }}>{module.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{module.duration}</div>
                  </div>
                  {completedModules.includes(idx) && <span style={{ color: '#10b981' }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {progress === 100 && (
          <div style={{ marginTop: '2rem', background: '#10b98120', border: '1px solid #10b981', borderRadius: '1rem', padding: '1rem', textAlign: 'center' }}>
            <h3 style={{ color: '#10b981' }}>🎉 Congratulations! You've completed the course!</h3>
            <p>You're now ready to start earning. Apply to jobs and start your income journey.</p>
          </div>
        )}
      </div>
    </div>
  );
}
