'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CoursePage() {
  const params = useParams();
  const courseId = params.id;
  const [selectedModule, setSelectedModule] = useState(0);
  const [activeTab, setActiveTab] = useState<'video' | 'audio' | 'print'>('video');
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem('adminBypass') === 'true';
    setIsAdmin(admin);
    
    const saved = localStorage.getItem(`course_${courseId}_completed`);
    if (saved) {
      setCompletedModules(JSON.parse(saved));
    }
  }, [courseId]);

  useEffect(() => {
    const prog = Math.round((completedModules.length / course.modules.length) * 100);
    setProgress(prog);
    localStorage.setItem(`course_${courseId}_completed`, JSON.stringify(completedModules));
  }, [completedModules, courseId]);

  const courses: Record<string, any> = {
    'ai-fundamentals': {
      title: 'AI Fundamentals for Africa',
      description: 'Master AI concepts and applications for the African market',
      duration: '4 weeks',
      income: '$500-1,000/mo',
      modules: [
        { title: 'Module 1: What is AI?', content: 'Introduction to Artificial Intelligence, its history, and how it works. Learn about machine learning, neural networks, and deep learning.', video: 'https://www.youtube.com/embed/2ePf9rue1Ao?autoplay=0&rel=0&modestbranding=1', duration: '45 min' },
        { title: 'Module 2: Machine Learning Basics', content: 'Understand supervised, unsupervised, and reinforcement learning. Real-world examples from African businesses.', video: 'https://www.youtube.com/embed/HcqpanDadyQ?autoplay=0&rel=0&modestbranding=1', duration: '52 min' },
        { title: 'Module 3: AI in African Context', content: 'How AI is transforming agriculture, healthcare, finance, and education across Africa.', video: 'https://www.youtube.com/embed/0VjLRIAVXog?autoplay=0&rel=0&modestbranding=1', duration: '48 min' },
        { title: 'Module 4: Natural Language Processing', content: 'Understanding how AI understands and generates human language. Applications in Swahili and local languages.', video: 'https://www.youtube.com/embed/f5Tk1Xw6FVo?autoplay=0&rel=0&modestbranding=1', duration: '55 min' },
        { title: 'Module 5: Computer Vision', content: 'How AI sees and understands images. Applications in security, agriculture, and healthcare.', video: 'https://www.youtube.com/embed/2ePf9rue1Ao?autoplay=0&rel=0&modestbranding=1', duration: '50 min' },
        { title: 'Module 6: AI Ethics & Bias', content: 'Understanding AI bias, ethical considerations, and responsible AI development for Africa.', video: 'https://www.youtube.com/embed/HcqpanDadyQ?autoplay=0&rel=0&modestbranding=1', duration: '45 min' },
        { title: 'Module 7: Building AI Applications', content: 'Practical guide to building simple AI applications using no-code tools.', video: 'https://www.youtube.com/embed/0VjLRIAVXog?autoplay=0&rel=0&modestbranding=1', duration: '60 min' },
        { title: 'Module 8: AI Career Paths', content: 'Job opportunities in AI, required skills, and how to start your AI career in Africa.', video: 'https://www.youtube.com/embed/f5Tk1Xw6FVo?autoplay=0&rel=0&modestbranding=1', duration: '40 min' }
      ]
    },
    'ai-prompt-engineering': {
      title: 'AI Prompt Engineering',
      description: 'Master the art of crafting effective prompts for AI models',
      duration: '2 weeks',
      income: '$500-1,000/mo',
      modules: [
        { title: 'Prompt Basics', content: 'Understanding what prompts are and how they work with AI models.', video: 'https://www.youtube.com/embed/jv_2CvVK_3s?autoplay=0&rel=0&modestbranding=1', duration: '45 min' },
        { title: 'Zero-Shot Prompting', content: 'Getting results without providing examples to the AI.', video: 'https://www.youtube.com/embed/_ZvnD73m40o?autoplay=0&rel=0&modestbranding=1', duration: '50 min' },
        { title: 'Few-Shot Prompting', content: 'Using examples to guide AI responses.', video: 'https://www.youtube.com/embed/jpB8bXa5Khw?autoplay=0&rel=0&modestbranding=1', duration: '55 min' },
        { title: 'Chain-of-Thought', content: 'Guiding AI through step-by-step reasoning.', video: 'https://www.youtube.com/embed/1O5BgP4TZ6c?autoplay=0&rel=0&modestbranding=1', duration: '60 min' },
        { title: 'Role-Based Prompts', content: 'Making AI act as specific experts or personas.', video: 'https://www.youtube.com/embed/jv_2CvVK_3s?autoplay=0&rel=0&modestbranding=1', duration: '45 min' },
        { title: 'Advanced Techniques', content: 'Complex prompting strategies for specialized tasks.', video: 'https://www.youtube.com/embed/_ZvnD73m40o?autoplay=0&rel=0&modestbranding=1', duration: '55 min' },
        { title: 'Real-World Applications', content: 'Applying prompting to real business tasks.', video: 'https://www.youtube.com/embed/jpB8bXa5Khw?autoplay=0&rel=0&modestbranding=1', duration: '50 min' },
        { title: 'Monetizing Skills', content: 'Turning prompt engineering into income.', video: 'https://www.youtube.com/embed/1O5BgP4TZ6c?autoplay=0&rel=0&modestbranding=1', duration: '45 min' }
      ]
    },
    'virtual-assistant-elite': {
      title: 'Virtual Assistant Elite',
      description: 'Become a certified Virtual Assistant and earn $400-800/month',
      duration: '2 weeks',
      income: '$400-800/mo',
      modules: [
        { title: 'VA Foundations', content: 'Learn the fundamentals of being a Virtual Assistant.', video: 'https://www.youtube.com/embed/videoseries?list=PL8fY9K5u_WJo5L2V1KqMYS6HZ5qWgkP_B', duration: '45 min' },
        { title: 'Email & Calendar Management', content: 'Master inbox zero and calendar optimization.', video: 'https://www.youtube.com/embed/videoseries?list=PL8fY9K5u_WJo5L2V1KqMYS6HZ5qWgkP_B', duration: '50 min' },
        { title: 'Research Skills', content: 'Advanced research techniques for VAs.', video: 'https://www.youtube.com/embed/videoseries?list=PL8fY9K5u_WJo5L2V1KqMYS6HZ5qWgkP_B', duration: '40 min' },
        { title: 'Social Media Management', content: 'Manage social media accounts professionally.', video: 'https://www.youtube.com/embed/videoseries?list=PL8fY9K5u_WJo5L2V1KqMYS6HZ5qWgkP_B', duration: '55 min' },
        { title: 'Tools — Notion, Asana, Slack', content: 'Master the essential VA tools.', video: 'https://www.youtube.com/embed/videoseries?list=PL8fY9K5u_WJo5L2V1KqMYS6HZ5qWgkP_B', duration: '60 min' },
        { title: 'Client Communication', content: 'Professional communication skills.', video: 'https://www.youtube.com/embed/videoseries?list=PL8fY9K5u_WJo5L2V1KqMYS6HZ5qWgkP_B', duration: '45 min' },
        { title: 'Finding Clients', content: 'Land your first clients on freelance platforms.', video: 'https://www.youtube.com/embed/videoseries?list=PL8fY9K5u_WJo5L2V1KqMYS6HZ5qWgkP_B', duration: '50 min' },
        { title: 'First $800/month', content: 'Scaling to consistent monthly income.', video: 'https://www.youtube.com/embed/videoseries?list=PL8fY9K5u_WJo5L2V1KqMYS6HZ5qWgkP_B', duration: '55 min' }
      ]
    },
    'data-annotation-mastery': {
      title: 'Data Annotation Mastery',
      description: 'Become a certified data annotator',
      duration: '3 weeks',
      income: '$800-1,500/mo',
      modules: Array(12).fill(null).map((_, i) => ({ title: `Module ${i+1}: Data Annotation Skills`, content: `Learn professional data annotation techniques for AI training.`, video: 'https://www.youtube.com/embed/videoseries?list=PL8fY9K5u_WJo5L2V1KqMYS6HZ5qWgkP_B', duration: '45 min' }))
    },
    'high-ticket-sales': {
      title: 'High-Ticket Virtual Sales',
      description: 'Close $2,000-5,000/month deals',
      duration: '4 weeks',
      income: '$2,000-5,000/mo',
      modules: Array(16).fill(null).map((_, i) => ({ title: `Module ${i+1}: Sales Mastery`, content: `Master high-ticket sales techniques for African and global markets.`, video: 'https://www.youtube.com/embed/videoseries?list=PL8fY9K5u_WJo5L2V1KqMYS6HZ5qWgkP_B', duration: '45 min' }))
    },
    'sovereign-prompt': {
      title: 'Sovereign Prompt Engineering',
      description: 'Elite prompting for expert results',
      duration: '4 weeks',
      income: '$1,500-3,000/mo',
      modules: Array(16).fill(null).map((_, i) => ({ title: `Module ${i+1}: Elite Prompting`, content: `Advanced prompting techniques for expert-level results.`, video: 'https://www.youtube.com/embed/videoseries?list=PL8fY9K5u_WJo5L2V1KqMYS6HZ5qWgkP_B', duration: '50 min' }))
    },
    'pan-african-trade': {
      title: 'Pan-African Trade AI',
      description: 'Master AI for African trade',
      duration: '6 weeks',
      income: '$3,000-8,000/mo',
      modules: Array(20).fill(null).map((_, i) => ({ title: `Module ${i+1}: Trade AI`, content: `Apply AI to African trade and commerce.`, video: 'https://www.youtube.com/embed/videoseries?list=PL8fY9K5u_WJo5L2V1KqMYS6HZ5qWgkP_B', duration: '45 min' }))
    },
    'grant-writing-ai': {
      title: 'Grant Writing with AI',
      description: 'Win grants using AI tools',
      duration: '3 weeks',
      income: '$1,000-3,000/mo',
      modules: Array(10).fill(null).map((_, i) => ({ title: `Module ${i+1}: Grant Writing`, content: `Master grant writing techniques using AI assistance.`, video: 'https://www.youtube.com/embed/videoseries?list=PL8fY9K5u_WJo5L2V1KqMYS6HZ5qWgkP_B', duration: '50 min' }))
    },
    'titanium-erp': {
      title: 'Titanium ERP Operations',
      description: 'Master business operations',
      duration: '4 weeks',
      income: '$2,000-5,000/mo',
      modules: Array(14).fill(null).map((_, i) => ({ title: `Module ${i+1}: ERP Skills`, content: `Learn enterprise resource planning systems.`, video: 'https://www.youtube.com/embed/videoseries?list=PL8fY9K5u_WJo5L2V1KqMYS6HZ5qWgkP_B', duration: '55 min' }))
    }
  };

  const course = courses[courseId] || courses['ai-fundamentals'];
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
            <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} style={{ background: '#333', color: '#fff', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
              🚪 Logout
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>{course.title}</h1>
            <p style={{ color: '#9ca3af' }}>{course.description}</p>
            <p style={{ color: '#10b981', marginTop: '0.5rem' }}>💰 Income Potential: {course.income}</p>
          </div>
          <div>
            <span style={{ background: '#111', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
              Progress: {progress}% ({completedModules.length}/{course.modules.length})
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
          {/* Main Content */}
          <div>
            <div style={{ background: '#111', borderRadius: '1rem', padding: '1rem' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '0.5rem', background: '#000' }}>
                <iframe
                  src={currentModule.video}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={currentModule.title}
                />
              </div>
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ color: '#f59e0b' }}>{currentModule.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>Duration: {currentModule.duration}</p>
                <p style={{ color: '#fff', marginBottom: '1rem', lineHeight: '1.6' }}>{currentModule.content}</p>
                <button
                  onClick={markComplete}
                  style={{ background: completedModules.includes(selectedModule) ? '#10b981' : '#f59e0b', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {completedModules.includes(selectedModule) ? '✓ Completed' : 'Mark as Complete'}
                </button>
              </div>
            </div>
          </div>

          {/* Module List */}
          <div style={{ background: '#111', borderRadius: '1rem', padding: '1rem', maxHeight: '600px', overflow: 'auto' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Course Modules ({course.modules.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
            <p>You're now ready to start earning. Download your certificate and apply to jobs.</p>
            <button style={{ background: '#f59e0b', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', marginTop: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
              📜 Download Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
