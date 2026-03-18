// app/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    training: 0,
    projects: 0,
    funding: 0,
    tenders: 0,
    matches: 0
  });

  useEffect(() => {
    // Fetch stats
    fetch('/api/core/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const sectors = [
    { name: 'Community Empowerment', icon: '🤝', count: 234, link: '/community' },
    { name: 'Environment & Climate', icon: '🌍', count: 156, link: '/climate' },
    { name: 'Health Projects', icon: '⚕️', count: 189, link: '/health' },
    { name: 'Agriculture', icon: '🌾', count: 267, link: '/agriculture' },
    { name: 'Youth Empowerment', icon: '👥', count: 312, link: '/youth' },
    { name: 'Women Empowerment', icon: '👩🏾', count: 278, link: '/women' },
    { name: 'AI/IT Projects', icon: '💻', count: 145, link: '/ai' },
  ];

  return (
    <div className="min-h-screen bg-titan-dark text-titan-cream p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-titan-gold mb-4">Titanium Core Engine</h1>
        <p className="text-xl text-titan-cream/80">AI-Powered Matchmaking for Impact</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-12">
        <div className="bg-titan-deep p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-titan-gold">{stats.jobs}</div>
          <div className="text-sm">Jobs</div>
        </div>
        <div className="bg-titan-deep p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-titan-gold">{stats.training}</div>
          <div className="text-sm">Training</div>
        </div>
        <div className="bg-titan-deep p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-titan-gold">{stats.projects}</div>
          <div className="text-sm">Projects</div>
        </div>
        <div className="bg-titan-deep p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-titan-gold">{stats.funding}</div>
          <div className="text-sm">Funders</div>
        </div>
        <div className="bg-titan-deep p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-titan-gold">{stats.tenders}</div>
          <div className="text-sm">Tenders</div>
        </div>
        <div className="bg-titan-deep p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-titan-gold">{stats.matches}</div>
          <div className="text-sm">Matches</div>
        </div>
      </div>

      {/* Main Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Opportunities */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-titan-gold">Active Opportunities</h2>
          
          <div className="bg-titan-deep p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Jobs & Internships</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-titan-dark/50 rounded">
                <div>
                  <p className="font-medium">Senior AI Developer</p>
                  <p className="text-sm text-titan-cream/60">TechCorp • Nairobi</p>
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">94% match</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-titan-dark/50 rounded">
                <div>
                  <p className="font-medium">Project Manager - Climate</p>
                  <p className="text-sm text-titan-cream/60">UNDP • Kisumu</p>
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">87% match</span>
              </div>
            </div>
          </div>

          <div className="bg-titan-deep p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Training Programs</h3>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-titan-dark/50 rounded">
                <div>
                  <p className="font-medium">AI for Social Impact</p>
                  <p className="text-sm text-titan-cream/60">iHub • 6 weeks</p>
                </div>
                <span className="text-titan-gold">92% recommended</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Matchmaking */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-titan-gold">AI Matchmaking</h2>
          
          <div className="bg-titan-deep p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Document Processor</h3>
            <div className="border-2 border-dashed border-titan-gold/30 rounded-lg p-8 text-center">
              <p className="mb-2">📄 Drag & drop your proposal</p>
              <p className="text-sm text-titan-cream/60">AI will scan and match with funders</p>
              <button className="mt-4 px-6 py-2 bg-titan-gold text-titan-dark rounded-lg font-semibold hover:bg-titan-gold-light transition">
                Upload Document
              </button>
            </div>
          </div>

          <div className="bg-titan-deep p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Active Matches</h3>
            <div className="space-y-3">
              <div className="p-3 bg-titan-dark/50 rounded">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Community Health Project</span>
                  <span className="text-green-500">95%</span>
                </div>
                <p className="text-sm text-titan-cream/60">Matched with Global Fund • KES 15M</p>
              </div>
              <div className="p-3 bg-titan-dark/50 rounded">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Youth Agribusiness</span>
                  <span className="text-green-500">88%</span>
                </div>
                <p className="text-sm text-titan-cream/60">Matched with UNDP • KES 8M</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sector Grid */}
      <div>
        <h2 className="text-2xl font-bold text-titan-gold mb-6">Focus Sectors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {sectors.map((sector, i) => (
            <Link key={i} href={sector.link}>
              <div className="bg-titan-deep p-4 rounded-lg text-center hover:border-titan-gold border border-transparent transition cursor-pointer">
                <div className="text-3xl mb-2">{sector.icon}</div>
                <div className="text-sm font-medium">{sector.name}</div>
                <div className="text-titan-gold text-xs mt-1">{sector.count} opportunities</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* C-Suite Actions */}
      <div className="mt-12 bg-gradient-to-r from-titan-maroon to-titan-deep p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-titan-gold mb-4">Executive Command Center</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition">
            <div className="text-lg mb-1">📊</div>
            <div className="text-sm">Review Matches</div>
          </button>
          <button className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition">
            <div className="text-lg mb-1">🤖</div>
            <div className="text-sm">AI Analysis</div>
          </button>
          <button className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition">
            <div className="text-lg mb-1">📝</div>
            <div className="text-sm">Generate Reports</div>
          </button>
          <button className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition">
            <div className="text-lg mb-1">⚡</div>
            <div className="text-sm">Quick Actions</div>
          </button>
        </div>
      </div>
    </div>
  );
}
