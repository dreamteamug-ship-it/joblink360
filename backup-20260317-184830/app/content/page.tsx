// app/content/page.tsx
'use client';
import { useState } from 'react';

export default function ContentDashboard() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('linkedin');
  const [tone, setTone] = useState('professional');
  const [generatedContent, setGeneratedContent] = useState('');
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seoKeywords, setSeoKeywords] = useState([]);

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'twitter', name: 'X (Twitter)', icon: '🐦' },
    { id: 'facebook', name: 'Facebook', icon: '📘' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'blog', name: 'Company Blog', icon: '📝' }
  ];

  const tones = [
    { id: 'professional', name: 'Professional', icon: '👔' },
    { id: 'casual', name: 'Casual', icon: '😊' },
    { id: 'inspirational', name: 'Inspirational', icon: '✨' },
    { id: 'educational', name: 'Educational', icon: '📚' },
    { id: 'promotional', name: 'Promotional', icon: '🎯' }
  ];

  const generateContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic, 
          platform: platforms.find(p => p.id === platform)?.name || platform,
          tone: tones.find(t => t.id === tone)?.name || tone,
          length: 300 
        })
      });
      const data = await res.json();
      setGeneratedContent(data.content);
      
      // Simulate SEO keyword generation
      setSeoKeywords([
        { keyword: topic, volume: 2400, difficulty: 45 },
        { keyword: `${topic} opportunities`, volume: 1800, difficulty: 35 },
        { keyword: `best ${topic}`, volume: 3200, difficulty: 55 }
      ]);
    } catch (error) {
      console.error('Generation failed:', error);
      setGeneratedContent('⚠️ Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const schedulePost = async () => {
    const newPost = {
      id: `post-${Date.now()}`,
      content: generatedContent.substring(0, 100) + '...',
      platform: platforms.find(p => p.id === platform)?.name,
      scheduledFor: new Date(Date.now() + 24*60*60*1000).toLocaleString(),
      status: 'scheduled'
    };
    setScheduledPosts([newPost, ...scheduledPosts]);
    setGeneratedContent('');
    setTopic('');
  };

  return (
    <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold text-[#C9A84C] mb-2">📝 AI Content Engine</h1>
            <p className="text-[#F5F5DC]/70">
              Generate, optimize, and schedule content across all platforms with DeepSeek AI
            </p>
          </div>
          <div className="bg-[#800000] px-6 py-3 rounded-lg">
            <span className="text-[#C9A84C] font-bold">⚡ 26 COUNTRIES</span>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-[#020202] p-4 rounded-lg border-l-4 border-[#C9A84C]">
            <p className="text-sm text-[#F5F5DC]/60">Content Generated</p>
            <p className="text-2xl font-bold">247</p>
          </div>
          <div className="bg-[#020202] p-4 rounded-lg">
            <p className="text-sm text-[#F5F5DC]/60">Scheduled Posts</p>
            <p className="text-2xl font-bold">18</p>
          </div>
          <div className="bg-[#020202] p-4 rounded-lg">
            <p className="text-sm text-[#F5F5DC]/60">Platforms Active</p>
            <p className="text-2xl font-bold">6</p>
          </div>
          <div className="bg-[#020202] p-4 rounded-lg">
            <p className="text-sm text-[#F5F5DC]/60">SEO Keywords</p>
            <p className="text-2xl font-bold">156</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Left Column - Content Generator */}
          <div className="bg-[#020202] p-6 rounded-lg border border-[#C9A84C]/20">
            <h2 className="text-2xl font-bold text-[#C9A84C] mb-4">🎨 Content Generator</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Topic / Keyword</label>
                <input
                  type="text"
                  placeholder="e.g., AI jobs in Kenya, Women in Tech, Agribusiness funding"
                  className="w-full p-3 bg-[#070F1A] rounded-lg border border-[#C9A84C]/30 focus:border-[#C9A84C] focus:outline-none"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Platform</label>
                  <select
                    className="w-full p-3 bg-[#070F1A] rounded-lg border border-[#C9A84C]/30"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    {platforms.map(p => (
                      <option key={p.id} value={p.id}>{p.icon} {p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tone</label>
                  <select
                    className="w-full p-3 bg-[#070F1A] rounded-lg border border-[#C9A84C]/30"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  >
                    {tones.map(t => (
                      <option key={t.id} value={t.id}>{t.icon} {t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={generateContent}
                disabled={loading || !topic}
                className="w-full py-3 bg-[#C9A84C] text-[#020202] rounded-lg font-bold hover:bg-[#C9A84C]/80 transition disabled:opacity-50"
              >
                {loading ? 'Generating with DeepSeek AI...' : '✨ Generate Content'}
              </button>

              {seoKeywords.length > 0 && (
                <div className="mt-4 p-3 bg-[#070F1A] rounded-lg">
                  <p className="text-sm font-medium mb-2">🔍 SEO Keywords Found</p>
                  <div className="flex flex-wrap gap-2">
                    {seoKeywords.map((kw, i) => (
                      <span key={i} className="bg-[#C9A84C]/10 text-[#C9A84C] px-2 py-1 rounded-full text-xs">
                        {kw.keyword} ({kw.volume}/mo)
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Content Preview */}
          <div className="bg-[#020202] p-6 rounded-lg border border-[#C9A84C]/20">
            <h2 className="text-2xl font-bold text-[#C9A84C] mb-4">📄 Content Preview</h2>
            
            <div className="bg-[#070F1A] p-4 rounded-lg min-h-[250px] mb-4 whitespace-pre-wrap text-sm">
              {generatedContent || (
                <span className="text-[#F5F5DC]/40">
                  Generated content will appear here. Click generate to create AI-powered posts for your audience across 26 African countries.
                </span>
              )}
            </div>

            {generatedContent && (
              <div className="flex gap-3">
                <button
                  onClick={schedulePost}
                  className="flex-1 py-2 bg-[#C9A84C] text-[#020202] rounded font-bold hover:bg-[#C9A84C]/80 transition"
                >
                  📅 Schedule Post
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedContent)}
                  className="px-4 py-2 border border-[#C9A84C] text-[#C9A84C] rounded hover:bg-[#C9A84C]/10 transition"
                >
                  📋 Copy
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Scheduled Posts */}
        <div className="bg-[#020202] p-6 rounded-lg border border-[#C9A84C]/20 mb-8">
          <h2 className="text-2xl font-bold text-[#C9A84C] mb-4">📅 Scheduled Content</h2>
          
          {scheduledPosts.length === 0 ? (
            <p className="text-[#F5F5DC]/40 text-center py-8">No scheduled posts. Generate and schedule your first post!</p>
          ) : (
            <div className="space-y-3">
              {scheduledPosts.map((post) => (
                <div key={post.id} className="bg-[#070F1A] p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">{post.content}</p>
                    <p className="text-xs text-[#F5F5DC]/60 mt-1">
                      {post.platform} • {post.scheduledFor}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-xs">
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Multi-Channel Injection Panel */}
        <div className="bg-gradient-to-r from-[#800000] to-[#020202] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-[#C9A84C] mb-4">🚀 Multi-Channel Injection</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#070F1A] p-4 rounded-lg text-center">
              <p className="text-2xl mb-2">💼</p>
              <p className="font-bold">LinkedIn</p>
              <p className="text-xs text-green-500">Connected</p>
            </div>
            <div className="bg-[#070F1A] p-4 rounded-lg text-center">
              <p className="text-2xl mb-2">🐦</p>
              <p className="font-bold">X (Twitter)</p>
              <p className="text-xs text-yellow-500">Connect</p>
            </div>
            <div className="bg-[#070F1A] p-4 rounded-lg text-center">
              <p className="text-2xl mb-2">📘</p>
              <p className="font-bold">Facebook</p>
              <p className="text-xs text-yellow-500">Connect</p>
            </div>
            <div className="bg-[#070F1A] p-4 rounded-lg text-center">
              <p className="text-2xl mb-2">📸</p>
              <p className="font-bold">Instagram</p>
              <p className="text-xs text-yellow-500">Connect</p>
            </div>
            <div className="bg-[#070F1A] p-4 rounded-lg text-center">
              <p className="text-2xl mb-2">🎵</p>
              <p className="font-bold">TikTok</p>
              <p className="text-xs text-yellow-500">Connect</p>
            </div>
            <div className="bg-[#070F1A] p-4 rounded-lg text-center">
              <p className="text-2xl mb-2">📝</p>
              <p className="font-bold">Blog</p>
              <p className="text-xs text-green-500">WordPress</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <button className="bg-[#020202] p-4 rounded-lg hover:bg-[#C9A84C]/10 transition">
            <span className="text-2xl mb-2 block">📊</span>
            <span className="text-sm">Analytics</span>
          </button>
          <button className="bg-[#020202] p-4 rounded-lg hover:bg-[#C9A84C]/10 transition">
            <span className="text-2xl mb-2 block">🔍</span>
            <span className="text-sm">SEO Research</span>
          </button>
          <button className="bg-[#020202] p-4 rounded-lg hover:bg-[#C9A84C]/10 transition">
            <span className="text-2xl mb-2 block">📅</span>
            <span className="text-sm">Content Calendar</span>
          </button>
          <button className="bg-[#020202] p-4 rounded-lg hover:bg-[#C9A84C]/10 transition">
            <span className="text-2xl mb-2 block">📈</span>
            <span className="text-sm">Performance</span>
          </button>
        </div>
      </div>
    </div>
  );
}
