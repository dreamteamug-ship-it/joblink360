'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ContentDashboard() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [contentStatus, setContentStatus] = useState<any>(null);

  const courseList = [
    { id: 'ai-fundamentals', title: 'AI Fundamentals for Africa', modules: 8 },
    { id: 'ai-prompt-engineering', title: 'AI Prompt Engineering', modules: 8 },
    { id: 'virtual-assistant-elite', title: 'Virtual Assistant Elite', modules: 8 },
    { id: 'data-annotation-mastery', title: 'Data Annotation Mastery', modules: 12 },
    { id: 'high-ticket-sales', title: 'High-Ticket Virtual Sales', modules: 16 },
    { id: 'sovereign-prompt', title: 'Sovereign Prompt Engineering', modules: 16 },
    { id: 'pan-african-trade', title: 'Pan-African Trade AI', modules: 20 },
    { id: 'grant-writing-ai', title: 'Grant Writing with AI', modules: 10 },
    { id: 'titanium-erp', title: 'Titanium ERP Operations', modules: 14 }
  ];

  const handleScan = async () => {
    if (!selectedCourse) return;
    setLoading(true);
    try {
      const res = await fetch('/api/youtube/scanner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: selectedCourse, action: 'scan' })
      });
      const data = await res.json();
      setContentStatus(data);
    } catch (error) {
      console.error('Scan error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = async () => {
    if (!selectedCourse) return;
    setLoading(true);
    try {
      const res = await fetch('/api/youtube/scanner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: selectedCourse, action: 'process' })
      });
      const data = await res.json();
      setContentStatus(data);
    } catch (error) {
      console.error('Process error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui' }}>
      <nav style={{ borderBottom: '1px solid #333', padding: '1rem 2rem', background: '#000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#f59e0b', margin: 0 }}>📚 Content Management System</h1>
          <Link href="/admin" style={{ color: '#9ca3af', textDecoration: 'none' }}>← Back to Admin</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>🎬 YouTube Content Pipeline</h2>
          <p style={{ color: '#9ca3af' }}>Scanner → Scraper → Analyzer → Processor → Generator → Refiner → Dispatcher</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Left Panel - Course Selection */}
          <div style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Select Course</h3>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', background: '#0a0a0a', border: '1px solid #333', borderRadius: '0.5rem', color: '#fff', marginBottom: '1rem' }}
            >
              <option value="">Select a course...</option>
              {courseList.map(course => (
                <option key={course.id} value={course.id}>{course.title} ({course.modules} modules)</option>
              ))}
            </select>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={handleScan} disabled={loading || !selectedCourse} style={{ background: '#f59e0b', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                🔍 Scan YouTube Content
              </button>
              <button onClick={handleProcess} disabled={loading || !selectedCourse} style={{ background: '#10b981', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                ⚙️ Process & Generate
              </button>
            </div>
          </div>

          {/* Right Panel - Status */}
          <div style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Pipeline Status</h3>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                <p>Processing content...</p>
              </div>
            ) : contentStatus ? (
              <div>
                <div style={{ marginBottom: '1rem', padding: '1rem', background: '#0a0a0a', borderRadius: '0.5rem' }}>
                  <p><strong style={{ color: '#10b981' }}>✅ Success:</strong> {contentStatus.message}</p>
                  {contentStatus.videos_found !== undefined && (
                    <p>📹 Videos Found: {contentStatus.videos_found}</p>
                  )}
                  {contentStatus.processed && (
                    <p>📦 Processed: {contentStatus.processed} videos</p>
                  )}
                </div>
                {contentStatus.videos && (
                  <div style={{ marginTop: '1rem' }}>
                    <h4 style={{ color: '#f59e0b' }}>Content Preview:</h4>
                    {contentStatus.videos.slice(0, 3).map((video: any, i: number) => (
                      <div key={i} style={{ padding: '0.5rem', borderBottom: '1px solid #222' }}>
                        <p><strong>{video.title}</strong></p>
                        <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Duration: {video.duration} • {video.quality}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                Select a course and click Scan to start
              </div>
            )}
          </div>
        </div>

        {/* Pipeline Flow Visualization */}
        <div style={{ marginTop: '2rem', background: '#111', borderRadius: '1rem', padding: '1.5rem' }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Content Pipeline Flow</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center', fontSize: '0.75rem' }}>
            <div><span style={{ fontSize: '1.5rem', display: 'block' }}>🔍</span>Scanner</div>
            <div><span style={{ fontSize: '1.5rem', display: 'block' }}>🕷️</span>Scraper</div>
            <div><span style={{ fontSize: '1.5rem', display: 'block' }}>📊</span>Analyzer</div>
            <div><span style={{ fontSize: '1.5rem', display: 'block' }}>⚙️</span>Processor</div>
            <div><span style={{ fontSize: '1.5rem', display: 'block' }}>🎬</span>Generator</div>
            <div><span style={{ fontSize: '1.5rem', display: 'block' }}>✨</span>Refiner</div>
            <div><span style={{ fontSize: '1.5rem', display: 'block' }}>📡</span>Dispatcher</div>
          </div>
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#0a0a0a', borderRadius: '0.5rem', textAlign: 'center' }}>
            <p style={{ color: '#10b981' }}>✅ Pipeline Ready - YouTube content will be processed into 4K Video + Audio + Transcript + Notes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
