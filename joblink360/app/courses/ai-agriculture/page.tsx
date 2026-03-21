'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AIAgricultureCourse() {
  const [selectedModule, setSelectedModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('course_ai-agriculture_completed');
    if (saved) setCompletedModules(JSON.parse(saved));
  }, []);

  useEffect(() => {
    setProgress(Math.round((completedModules.length / course.modules.length) * 100));
    localStorage.setItem('course_ai-agriculture_completed', JSON.stringify(completedModules));
  }, [completedModules]);

  const course = {
    title: 'AI for African Agriculture',
    description: 'Master AI tools to transform agriculture across Africa',
    duration: '8 weeks',
    income: '$1,000-2,000/mo',
    modules: [
      { title: 'Module 1: Introduction to AI in African Agriculture', duration: '45 min', video: 'https://www.youtube.com/embed/2ePf9rue1Ao' },
      { title: 'Module 2: Crop Disease Detection and Diagnosis', duration: '50 min', video: 'https://www.youtube.com/embed/HcqpanDadyQ' },
      { title: 'Module 3: Weather Prediction and Climate Resilience', duration: '48 min', video: 'https://www.youtube.com/embed/0VjLRIAVXog' },
      { title: 'Module 4: Soil Health Monitoring and Optimization', duration: '52 min', video: 'https://www.youtube.com/embed/f5Tk1Xw6FVo' },
      { title: 'Module 5: Supply Chain and Market Access', duration: '55 min', video: 'https://www.youtube.com/embed/2ePf9rue1Ao' },
      { title: 'Module 6: Precision Farming Techniques', duration: '50 min', video: 'https://www.youtube.com/embed/HcqpanDadyQ' },
      { title: 'Module 7: Financial Services and Micro-insurance', duration: '45 min', video: 'https://www.youtube.com/embed/0VjLRIAVXog' },
      { title: 'Module 8: Scaling AI Solutions Across Africa', duration: '60 min', video: 'https://www.youtube.com/embed/f5Tk1Xw6FVo' }
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
      <nav style={{ borderBottom: '1px solid #333', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none' }}>🏠 Home</Link>
          <Link href="/lms" style={{ color: '#9ca3af', textDecoration: 'none' }}>← Back to Courses</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ color: '#f59e0b' }}>{course.title}</h1>
        <p>{course.description}</p>
        <p>💰 {course.income} | ⏱️ {course.duration}</p>
        
        <div style={{ background: '#111', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <div style={{ background: '#222', height: '8px', borderRadius: '4px' }}>
            <div style={{ width: `${progress}%`, background: '#f59e0b', height: '100%', borderRadius: '4px' }}></div>
          </div>
          <p>Progress: {progress}% ({completedModules.length}/{course.modules.length})</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', marginTop: '2rem' }}>
          <div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe src={currentModule.video} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} allowFullScreen />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h3>{currentModule.title}</h3>
              <button onClick={markComplete} style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
                {completedModules.includes(selectedModule) ? '✓ Completed' : 'Mark Complete'}
              </button>
            </div>
          </div>
          
          <div>
            <h3>Modules</h3>
            {course.modules.map((module, idx) => (
              <button key={idx} onClick={() => setSelectedModule(idx)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem', marginBottom: '0.5rem', background: selectedModule === idx ? '#f59e0b20' : '#111', border: '1px solid #222', borderRadius: '0.5rem', cursor: 'pointer', color: '#fff' }}>
                {module.title}
                {completedModules.includes(idx) && <span style={{ float: 'right', color: '#10b981' }}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
