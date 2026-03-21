'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CourseOverview() {
  const [llmModules, setLlmModules] = useState([
    { id: 1, name: 'ChatGPT', icon: '🤖', description: 'OpenAI GPT-4 / GPT-4o - Conversational AI, Code Generation', status: 'free' },
    { id: 2, name: 'Claude', icon: '🧠', description: 'Anthropic Claude 3.5 - 200K Context, Document Analysis', status: 'free' },
    { id: 3, name: 'Gemini', icon: '🌟', description: 'Google Gemini 1.5 - Multimodal, 1M Token Context', status: 'free' },
    { id: 4, name: 'DeepSeek', icon: '🔍', description: 'DeepSeek-V3/R1 - 671B Parameters, Reasoning Models', status: 'free' },
    { id: 5, name: 'Llama', icon: '🦙', description: 'Meta Llama 3 - Open Source, Local Deployment', status: 'free' },
    { id: 6, name: 'Mistral', icon: '🌪️', description: 'Mistral Large/Mixtral - Mixtral of Experts', status: 'free' },
    { id: 7, name: 'Cohere', icon: '🔷', description: 'Cohere Command - RAG, Embeddings, Enterprise', status: 'free' },
    { id: 8, name: 'Perplexity', icon: '🔎', description: 'Perplexity Pro - AI-Powered Search, Real-Time Info', status: 'free' }
  ]);

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui' }}>
      <nav style={{ borderBottom: '1px solid #333', padding: '1rem 2rem', background: '#000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold' }}>🏠 JobLink 360</Link>
          <Link href="/lms" style={{ color: '#9ca3af', textDecoration: 'none' }}>← Back to Courses</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '3rem', color: '#f59e0b', marginBottom: '0.5rem' }}>🤖 Mastering LLMs</h1>
          <p style={{ fontSize: '1.2rem', color: '#9ca3af', marginBottom: '1rem' }}>From ChatGPT to Claude - Complete Training on All Major Language Models</p>
          <div style={{ display: 'inline-flex', gap: '1rem', background: '#111', padding: '0.5rem 1rem', borderRadius: '2rem' }}>
            <span style={{ color: '#10b981' }}>🎓 FREE COURSE</span>
            <span style={{ color: '#f59e0b' }}>8 Modules</span>
            <span style={{ color: '#f59e0b' }}>8 Weeks</span>
            <span style={{ color: '#10b981' }}>💰 $1,000-3,000/mo Potential</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {llmModules.map(module => (
            <div key={module.id} style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #222', transition: 'all 0.3s' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{module.icon}</div>
              <h3 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>{module.name}</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{module.description}</p>
              <span style={{ background: '#10b98120', color: '#10b981', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>FREE</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111', borderRadius: '1rem', padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
          <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>🎯 8-Week Learning Path</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            <div><span style={{ color: '#f59e0b' }}>Week 1-2</span><br />ChatGPT + Claude</div>
            <div><span style={{ color: '#f59e0b' }}>Week 3-4</span><br />Gemini + DeepSeek</div>
            <div><span style={{ color: '#f59e0b' }}>Week 5-6</span><br />Llama + Mistral</div>
            <div><span style={{ color: '#f59e0b' }}>Week 7-8</span><br />Cohere + Perplexity</div>
          </div>
          <Link href="/courses/mastering-llms">
            <button style={{ background: '#f59e0b', color: '#000', padding: '1rem 2rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
              Start Learning Now - FREE →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
