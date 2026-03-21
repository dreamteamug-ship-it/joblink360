'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LocalAIDashboard() {
  const [ollamaStatus, setOllamaStatus] = useState('checking');
  const [models, setModels] = useState<any[]>([]);
  const [selectedModel, setSelectedModel] = useState('deepseek-r1:7b');
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [action, setAction] = useState('chat');

  useEffect(() => {
    checkOllama();
  }, []);

  const checkOllama = async () => {
    try {
      const res = await fetch('http://localhost:11434/api/tags');
      const data = await res.json();
      setOllamaStatus('running');
      setModels(data.models || []);
    } catch {
      setOllamaStatus('not-running');
    }
  };

  const generate = async () => {
    if (!prompt) return;
    setGenerating(true);
    setResult('');
    
    try {
      const res = await fetch('/api/local-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: selectedModel,
          prompt,
          action
        })
      });
      const data = await res.json();
      setResult(data.result || data.error);
    } catch (error) {
      setResult('Error: ' + error.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui' }}>
      <nav style={{ borderBottom: '1px solid #333', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ color: '#f59e0b', margin: 0 }}>🤖 Local AI Control Center</h1>
          <Link href="/admin" style={{ color: '#9ca3af', textDecoration: 'none' }}>← Back</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Status Card */}
        <div style={{ background: ollamaStatus === 'running' ? '#14532d' : '#7f1a1a', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: ollamaStatus === 'running' ? '#10b981' : '#ef4444' }}></div>
          <span>Ollama: {ollamaStatus === 'running' ? 'RUNNING' : 'NOT RUNNING'}</span>
          {ollamaStatus !== 'running' && (
            <button onClick={checkOllama} style={{ background: '#f59e0b', color: '#000', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', border: 'none' }}>Refresh</button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Left Panel - Controls */}
          <div style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>🎮 Controls</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af' }}>Model</label>
              <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: '#0a0a0a', border: '1px solid #333', borderRadius: '0.5rem', color: '#fff' }}>
                <option value="deepseek-r1:7b">DeepSeek R1 (7b) - Best Reasoning</option>
                <option value="deepseek-r1:1.5b">DeepSeek R1 (1.5b) - Fast</option>
                <option value="mistral">Mistral - Code/General</option>
                <option value="llama3.2">Llama 3.2 - Balanced</option>
                <option value="kimi-k2.5:cloud">Kimi K2.5 - Cloud (if available)</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af' }}>Action</label>
              <select value={action} onChange={(e) => setAction(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: '#0a0a0a', border: '1px solid #333', borderRadius: '0.5rem', color: '#fff' }}>
                <option value="chat">Chat / General Query</option>
                <option value="generate-course-content">Generate Course Content</option>
                <option value="generate-video-script">Generate Video Script</option>
                <option value="generate-audio-script">Generate Audio Script</option>
                <option value="refine-content">Refine Existing Content</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af' }}>Prompt / Topic</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                placeholder="Enter your prompt or topic..."
                style={{ width: '100%', padding: '0.75rem', background: '#0a0a0a', border: '1px solid #333', borderRadius: '0.5rem', color: '#fff', fontFamily: 'monospace' }}
              />
            </div>

            <button
              onClick={generate}
              disabled={generating || !prompt}
              style={{ width: '100%', background: '#f59e0b', color: '#000', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {generating ? '⚡ Generating...' : '🎬 Generate Content'}
            </button>
          </div>

          {/* Right Panel - Output */}
          <div style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>📄 Generated Content</h3>
            {result ? (
              <div style={{ maxHeight: '500px', overflow: 'auto', background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem' }}>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.875rem', margin: 0 }}>{result}</pre>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                Generated content will appear here
              </div>
            )}
          </div>
        </div>

        {/* Available Models */}
        <div style={{ marginTop: '2rem', background: '#111', borderRadius: '1rem', padding: '1rem' }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>📦 Available Models</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {models.map((model: any) => (
              <div key={model.name} style={{ background: '#0a0a0a', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                <span style={{ color: '#10b981' }}>●</span> {model.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
