// app/resource-library/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, Video, BookOpen, Download, Search, 
  FolderOpen, Users, Briefcase, Eye, Clock, ArrowLeft,
  PlayCircle, Truck, Car, Sprout, DollarSign, Bookmark,
  Brain, TrendingUp, Award, Crown, Star, Share2
} from 'lucide-react';

export default function ResourceLibrary() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const resources = {
    documents: [
      { id: 1, title: 'Titanium ERP User Manual', type: 'PDF', size: '2.4 MB', category: 'erp', downloads: 1247, date: '2026-03-15' },
      { id: 2, title: 'Sovereign Intelligence Framework', type: 'PDF', size: '1.8 MB', category: 'ai', downloads: 892, date: '2026-03-10' },
      { id: 3, title: 'Altovex Logistics SOP', type: 'DOCX', size: '856 KB', category: 'logistics', downloads: 567, date: '2026-03-05' },
      { id: 4, title: 'JobLinks Africa Recruitment Guide', type: 'PDF', size: '1.2 MB', category: 'hr', downloads: 2341, date: '2026-03-01' },
      { id: 5, title: 'SinoAfric EV Technical Manual', type: 'PDF', size: '3.1 MB', category: 'ev', downloads: 445, date: '2026-02-28' },
      { id: 6, title: 'DreamTeQ 360 Farmer Playbook', type: 'PDF', size: '2.2 MB', category: 'agriculture', downloads: 678, date: '2026-02-25' }
    ],
    videos: [
      { id: 101, title: 'Amanda AI Tutorial - Getting Started', duration: '15:23', category: 'ai', views: 3456, date: '2026-03-12' },
      { id: 102, title: 'Titanium ERP Walkthrough', duration: '32:15', category: 'erp', views: 2341, date: '2026-03-08' },
      { id: 103, title: 'Altovex Lori Matchmaker Demo', duration: '18:42', category: 'logistics', views: 1234, date: '2026-03-03' }
    ],
    templates: [
      { id: 301, title: 'Sovereign Pitch Deck Template', type: 'PPTX', size: '4.2 MB', category: 'business', downloads: 1234, date: '2026-03-14' },
      { id: 302, title: 'Business Plan Template', type: 'DOCX', size: '245 KB', category: 'business', downloads: 2341, date: '2026-03-09' },
      { id: 303, title: 'Financial Model Template', type: 'XLSX', size: '1.1 MB', category: 'finance', downloads: 1567, date: '2026-02-28' }
    ]
  };
  
  const categories = [
    { id: 'all', name: 'All', icon: <FolderOpen size={16} />, count: 12 },
    { id: 'erp', name: 'ERP', icon: <Briefcase size={16} />, count: 2 },
    { id: 'ai', name: 'AI', icon: <Brain size={16} />, count: 2 },
    { id: 'logistics', name: 'Logistics', icon: <Truck size={16} />, count: 2 },
    { id: 'hr', name: 'HR', icon: <Users size={16} />, count: 1 },
    { id: 'ev', name: 'EV', icon: <Car size={16} />, count: 1 },
    { id: 'agriculture', name: 'Agri', icon: <Sprout size={16} />, count: 1 },
    { id: 'business', name: 'Business', icon: <Briefcase size={16} />, count: 2 },
    { id: 'finance', name: 'Finance', icon: <DollarSign size={16} />, count: 1 }
  ];
  
  const filteredDocs = resources.documents.filter(doc => 
    (activeTab === 'all' || doc.category === activeTab) &&
    (searchTerm === '' || doc.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const filteredVideos = resources.videos.filter(video => 
    (activeTab === 'all' || video.category === activeTab) &&
    (searchTerm === '' || video.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const filteredTemplates = resources.templates.filter(template => 
    (activeTab === 'all' || template.category === activeTab) &&
    (searchTerm === '' || template.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/ecosystem" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-4">
            <ArrowLeft size={18} /> Back to Ecosystem
          </Link>
          <h1 className="text-4xl font-bold mb-4">Sovereign Resource Library</h1>
          <p className="text-xl text-blue-200">Access all documentation, training materials, and templates</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Category Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`p-3 rounded-xl text-center transition ${
                activeTab === cat.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              <div className="flex justify-center mb-1">{cat.icon}</div>
              <div className="text-xs font-medium">{cat.name}</div>
              <div className="text-xs mt-0.5 opacity-75">{cat.count}</div>
            </button>
          ))}
        </div>
        
        {/* Documents Section */}
        {filteredDocs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="text-blue-600" /> Documents & Manuals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocs.map(doc => (
                <div key={doc.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText className="text-blue-600" size={24} />
                    </div>
                    <span className="text-xs text-gray-500">{doc.date}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{doc.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span>{doc.type}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Download size={14} />
                      <span>{doc.downloads} downloads</span>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Videos Section */}
        {filteredVideos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Video className="text-red-600" /> Video Training
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map(video => (
                <div key={video.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <PlayCircle size={48} className="text-white opacity-80" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Clock size={14} />
                      <span>{video.duration}</span>
                      <span>•</span>
                      <Eye size={14} />
                      <span>{video.views} views</span>
                    </div>
                    <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                      Watch Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Templates Section */}
        {filteredTemplates.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="text-green-600" /> Templates & Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map(template => (
                <div key={template.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Bookmark className="text-green-600" size={20} />
                    </div>
                    <h3 className="font-semibold text-gray-900 flex-1">{template.title}</h3>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{template.type}</span>
                    <span>{template.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Download size={14} />
                      <span>{template.downloads} downloads</span>
                    </div>
                    <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                      Use Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {filteredDocs.length === 0 && filteredVideos.length === 0 && filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">??</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
