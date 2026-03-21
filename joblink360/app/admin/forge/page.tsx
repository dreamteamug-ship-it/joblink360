'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ContentForgePage() {
  const [url, setUrl] = useState('');
  const [courseId, setCourseId] = useState('');
  const [moduleNumber, setModuleNumber] = useState(1);
  const [customTitle, setCustomTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const courses = [
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

  const handleForge = async () => {
    if (!url || !courseId) {
      setError('Please enter a YouTube URL and select a course');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/forge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          courseId,
          moduleNumber,
          title: customTitle
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Processing failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui' }}>
      {/* Navigation */}
      <nav style={{ borderBottom: '1px solid #333', padding: '1rem 2rem', background: '#000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ color: '#f59e0b', margin: 0 }}>🦅 Sovereign Content Forge</h1>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.25rem' }}>4-Agent Mesh: Harvester → Processor → Synthesizer → Deployer</p>
          </div>
          <Link href="/admin" style={{ color: '#9ca3af', textDecoration: 'none' }}>← Back to Admin</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Input Section */}
        <div style={{ background: '#111', borderRadius: '1rem', padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>📥 Ingest Content</h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af' }}>YouTube URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              style={{ width: '100%', padding: '0.75rem', background: '#0a0a0a', border: '1px solid #333', borderRadius: '0.5rem', color: '#fff' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af' }}>Select Course</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: '#0a0a0a', border: '1px solid #333', borderRadius: '0.5rem', color: '#fff' }}
              >
                <option value="">Select a course...</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title} ({course.modules} modules)</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af' }}>Module Number</label>
              <input
                type="number"
                value={moduleNumber}
                onChange={(e) => setModuleNumber(parseInt(e.target.value))}
                min="1"
                max="20"
                style={{ width: '100%', padding: '0.75rem', background: '#0a0a0a', border: '1px solid #333', borderRadius: '0.5rem', color: '#fff' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af' }}>Custom Title (Optional)</label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Leave blank to auto-detect from YouTube"
              style={{ width: '100%', padding: '0.75rem', background: '#0a0a0a', border: '1px solid #333', borderRadius: '0.5rem', color: '#fff' }}
            />
          </div>

          {error && (
            <div style={{ background: '#7f1a1a', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', color: '#f87171' }}>
              ❌ {error}
            </div>
          )}

          <button
            onClick={handleForge}
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#333' : '#f59e0b',
              color: '#000',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem'
            }}
          >
            {loading ? '⚡ Forging Content...' : '🦅 Forge Module'}
          </button>
        </div>

        {/* Pipeline Status */}
        {result && (
          <div style={{ background: '#111', borderRadius: '1rem', padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ color: '#10b981', marginBottom: '1rem' }}>✅ Forge Complete!</h2>
            <p style={{ marginBottom: '1rem' }}>Processed in: <strong>{result.pipeline_duration_ms}ms</strong></p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🕷️</div>
                <div style={{ fontWeight: 'bold' }}>Harvester</div>
                <div style={{ fontSize: '0.75rem', color: '#10b981' }}>{result.agents?.harvester?.status}</div>
              </div>
              <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧠</div>
                <div style={{ fontWeight: 'bold' }}>Processor</div>
                <div style={{ fontSize: '0.75rem', color: '#10b981' }}>{result.agents?.cognitive_processor?.status}</div>
              </div>
              <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎙️</div>
                <div style={{ fontWeight: 'bold' }}>Synthesizer</div>
                <div style={{ fontSize: '0.75rem', color: '#10b981' }}>{result.agents?.multi_modal_synthesizer?.status}</div>
              </div>
              <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚀</div>
                <div style={{ fontWeight: 'bold' }}>Deployer</div>
                <div style={{ fontSize: '0.75rem', color: '#10b981' }}>{result.agents?.sovereign_deployer?.status}</div>
              </div>
            </div>

            <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
              <h3 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>📦 Module Details</h3>
              <p><strong>Title:</strong> {result.module?.title}</p>
              <p><strong>Course ID:</strong> {result.module?.course_id}</p>
              <p><strong>Module:</strong> {result.module?.module_number}</p>
              <p><strong>Status:</strong> <span style={{ color: '#10b981' }}>{result.module?.status}</span></p>
              <p><strong>Formats:</strong> {result.agents?.multi_modal_synthesizer?.formats?.join(', ')}</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href={`/courses/${result.module?.course_id}`} target="_blank" style={{ background: '#f59e0b', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold' }}>
                View in LMS →
              </a>
              <button onClick={() => setResult(null)} style={{ background: '#333', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
                Forge Another
              </button>
            </div>
          </div>
        )}

        {/* Pipeline Flow Visualization */}
        <div style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem' }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>🦅 Sovereign Content Forge - 4-Agent Mesh</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🕷️</div>
              <div style={{ fontWeight: 'bold' }}>Agent 1: Harvester</div>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Scrape & Extract</div>
              <div style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>YouTube Transcript + Metadata</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧠</div>
              <div style={{ fontWeight: 'bold' }}>Agent 2: Processor</div>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Analyze & Refine</div>
              <div style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>Gemini 1.5 Pro → Markdown</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎙️</div>
              <div style={{ fontWeight: 'bold' }}>Agent 3: Synthesizer</div>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Multi-Modal</div>
              <div style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>Video + Audio + Print</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
              <div style={{ fontWeight: 'bold' }}>Agent 4: Deployer</div>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Database Sync</div>
              <div style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>Supabase + Revalidate</div>
            </div>
          </div>
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#0a0a0a', borderRadius: '0.5rem', textAlign: 'center' }}>
            <p style={{ color: '#10b981' }}>⚡ Pipeline Ready - Paste any YouTube URL, get premium 4K course content in 60 seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
}
