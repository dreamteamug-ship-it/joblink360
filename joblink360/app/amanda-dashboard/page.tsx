// app/amanda-dashboard/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Brain, MessageSquare, BookOpen, BarChart3, Settings, 
  Send, TrendingUp, Award, Clock, Zap, Target, Users,
  FileText, ShoppingBag, Globe, Heart, ChevronRight,
  Activity, Cpu, Database, Sparkles, Crown, Star
} from 'lucide-react';
import { amanda } from '@/lib/amanda/core';

export default function AmandaDashboard() {
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>({});
  const [instructions, setInstructions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [trainingMode, setTrainingMode] = useState(false);
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    const perf = await amanda.getPerformanceMetrics();
    setMetrics(perf);
    const inst = await amanda.getInstructions();
    setInstructions(inst);
  };
  
  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    const response = await amanda.chat(message, 'cto-allan');
    setConversations(prev => [response, ...prev]);
    setMessage('');
    setLoading(false);
  };
  
  const sendInstruction = async (type: string, title: string, content: string) => {
    const instruction = {
      id: `inst-${Date.now()}`,
      type: type as any,
      title,
      content,
      priority: 'high',
      status: 'pending',
      createdAt: new Date()
    };
    const result = await amanda.processInstruction(instruction);
    if (result.success) {
      await loadData();
      alert(`Instruction sent: ${result.message}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                <Brain size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Amanda AI Dashboard</h1>
                <p className="text-purple-200">Your Sovereign Intelligence Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Active & Learning</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            icon={<Brain className="text-purple-600" size={24} />}
            title="Learning Progress"
            value={`${(metrics.learningRate * 100).toFixed(1)}%`}
            change="+2.3%"
            color="purple"
          />
          <MetricCard 
            icon={<Zap className="text-yellow-600" size={24} />}
            title="Tasks Completed"
            value={metrics.tasksCompleted?.toLocaleString() || '1,247'}
            change="+156"
            color="yellow"
          />
          <MetricCard 
            icon={<Target className="text-green-600" size={24} />}
            title="Accuracy Rate"
            value={`${(metrics.accuracy * 100).toFixed(1)}%`}
            change="+4.2%"
            color="green"
          />
          <MetricCard 
            icon={<Star className="text-blue-600" size={24} />}
            title="User Satisfaction"
            value={`${metrics.satisfaction}/5.0`}
            change="+0.3"
            color="blue"
          />
        </div>
        
        {/* Main Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {[
                { id: 'chat', icon: <MessageSquare size={18} />, label: 'Chat with Amanda' },
                { id: 'training', icon: <BookOpen size={18} />, label: 'Training & Learning' },
                { id: 'instructions', icon: <Settings size={18} />, label: 'Instructions' },
                { id: 'reports', icon: <BarChart3 size={18} />, label: 'Reports' },
                { id: 'intelligence', icon: <Brain size={18} />, label: 'Intelligence' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'chat' && (
              <ChatInterface 
                conversations={conversations}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
                loading={loading}
              />
            )}
            
            {activeTab === 'training' && (
              <TrainingInterface 
                sendInstruction={sendInstruction}
                metrics={metrics}
                trainingMode={trainingMode}
                setTrainingMode={setTrainingMode}
              />
            )}
            
            {activeTab === 'instructions' && (
              <InstructionsInterface 
                instructions={instructions}
                sendInstruction={sendInstruction}
              />
            )}
            
            {activeTab === 'reports' && (
              <ReportsInterface />
            )}
            
            {activeTab === 'intelligence' && (
              <IntelligenceInterface />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, title, value, change, color }: any) {
  const colors: any = {
    purple: 'from-purple-50 to-purple-100',
    yellow: 'from-yellow-50 to-yellow-100',
    green: 'from-green-50 to-green-100',
    blue: 'from-blue-50 to-blue-100'
  };
  
  return (
    <div className={`bg-gradient-to-br ${colors[color]} rounded-xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-3">
        {icon}
        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-600 mt-1">{title}</p>
    </div>
  );
}

function ChatInterface({ conversations, message, setMessage, sendMessage, loading }: any) {
  return (
    <div className="space-y-4">
      <div className="h-96 overflow-y-auto space-y-4 mb-4">
        {conversations.map((conv: any, i: number) => (
          <div key={i} className={`flex ${conv.user === 'cto-allan' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-2xl p-4 ${
              conv.user === 'cto-allan' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              <p className="text-sm">{conv.message}</p>
              <p className={`text-xs mt-1 ${conv.user === 'cto-allan' ? 'text-blue-200' : 'text-gray-500'}`}>
                {new Date(conv.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl p-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask Amanda anything..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

function TrainingInterface({ sendInstruction, metrics, trainingMode, setTrainingMode }: any) {
  const [trainingData, setTrainingData] = useState('');
  const [skillName, setSkillName] = useState('');
  
  const handleTrain = () => {
    sendInstruction('training', 'AI Training', trainingData);
    setTrainingData('');
  };
  
  const handleAddSkill = () => {
    sendInstruction('skill', 'Add New Skill', skillName);
    setSkillName('');
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Training Mode</h3>
            <p className="text-sm text-gray-600">Teach Amanda new skills and knowledge</p>
          </div>
          <button
            onClick={() => setTrainingMode(!trainingMode)}
            className={`px-4 py-2 rounded-lg font-medium ${
              trainingMode 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {trainingMode ? 'Active' : 'Inactive'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Training Data
            </label>
            <textarea
              value={trainingData}
              onChange={(e) => setTrainingData(e.target.value)}
              placeholder="Paste training data, knowledge, or examples..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg h-32"
            />
            <button
              onClick={handleTrain}
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Train Amanda
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add New Skill
            </label>
            <input
              type="text"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="e.g., Advanced Data Analysis"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleAddSkill}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Skill
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-purple-600">{metrics.skills || 12}</div>
          <div className="text-sm text-gray-600">Active Skills</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-600">{metrics.knowledgeEntries || 156}</div>
          <div className="text-sm text-gray-600">Knowledge Entries</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-green-600">{metrics.trainingIterations || 89}</div>
          <div className="text-sm text-gray-600">Training Iterations</div>
        </div>
      </div>
    </div>
  );
}

function InstructionsInterface({ instructions, sendInstruction }: any) {
  const [instructionType, setInstructionType] = useState('task');
  const [instructionTitle, setInstructionTitle] = useState('');
  const [instructionContent, setInstructionContent] = useState('');
  
  const handleSend = () => {
    sendInstruction(instructionType, instructionTitle, instructionContent);
    setInstructionTitle('');
    setInstructionContent('');
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Send New Instruction</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instruction Type
            </label>
            <select
              value={instructionType}
              onChange={(e) => setInstructionType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="task">Task</option>
              <option value="training">Training</option>
              <option value="behavior">Behavior</option>
              <option value="knowledge">Knowledge</option>
              <option value="skill">Skill</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instruction Title
            </label>
            <input
              type="text"
              value={instructionTitle}
              onChange={(e) => setInstructionTitle(e.target.value)}
              placeholder="e.g., Scrape Luxury Products"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instruction Content
          </label>
          <textarea
            value={instructionContent}
            onChange={(e) => setInstructionContent(e.target.value)}
            placeholder="Detailed instructions for Amanda..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg h-32"
          />
        </div>
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send Instruction
        </button>
      </div>
      
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Instructions</h3>
        <div className="space-y-3">
          {instructions.slice(0, 5).map((inst: any, i: number) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  inst.priority === 'high' ? 'bg-red-100 text-red-800' :
                  inst.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {inst.type}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(inst.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="font-medium text-gray-900">{inst.title}</p>
              <p className="text-sm text-gray-600 mt-1">{inst.content}</p>
              <span className={`inline-block mt-2 text-xs ${
                inst.status === 'completed' ? 'text-green-600' :
                inst.status === 'processing' ? 'text-yellow-600' :
                'text-gray-500'
              }`}>
                Status: {inst.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportsInterface() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="bg-white border border-gray-200 rounded-xl p-6 text-left hover:shadow-lg transition">
          <FileText className="text-blue-600 mb-3" size={24} />
          <h3 className="font-bold text-gray-900 mb-1">Weekly Performance Report</h3>
          <p className="text-sm text-gray-600">Comprehensive AI performance metrics</p>
          <span className="text-xs text-gray-400 mt-2 block">Generated: Today</span>
        </button>
        
        <button className="bg-white border border-gray-200 rounded-xl p-6 text-left hover:shadow-lg transition">
          <TrendingUp className="text-green-600 mb-3" size={24} />
          <h3 className="font-bold text-gray-900 mb-1">Learning Progress Report</h3>
          <p className="text-sm text-gray-600">Training effectiveness analysis</p>
          <span className="text-xs text-gray-400 mt-2 block">Generated: Yesterday</span>
        </button>
        
        <button className="bg-white border border-gray-200 rounded-xl p-6 text-left hover:shadow-lg transition">
          <Users className="text-purple-600 mb-3" size={24} />
          <h3 className="font-bold text-gray-900 mb-1">User Interaction Report</h3>
          <p className="text-sm text-gray-600">Engagement and satisfaction metrics</p>
          <span className="text-xs text-gray-400 mt-2 block">Generated: 2 days ago</span>
        </button>
        
        <button className="bg-white border border-gray-200 rounded-xl p-6 text-left hover:shadow-lg transition">
          <ShoppingBag className="text-orange-600 mb-3" size={24} />
          <h3 className="font-bold text-gray-900 mb-1">E-commerce Intelligence</h3>
          <p className="text-sm text-gray-600">Product and market insights</p>
          <span className="text-xs text-gray-400 mt-2 block">Generated: Today</span>
        </button>
      </div>
    </div>
  );
}

function IntelligenceInterface() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Amanda's Intelligence Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <Cpu className="mx-auto text-purple-600 mb-2" size={32} />
            <div className="text-2xl font-bold">94%</div>
            <div className="text-sm text-gray-600">Cognitive Processing</div>
          </div>
          <div className="text-center">
            <Database className="mx-auto text-blue-600 mb-2" size={32} />
            <div className="text-2xl font-bold">1.2s</div>
            <div className="text-sm text-gray-600">Response Time</div>
          </div>
          <div className="text-center">
            <Activity className="mx-auto text-green-600 mb-2" size={32} />
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-sm text-gray-600">Active Learning</div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Active Knowledge Domains</h3>
        <div className="flex flex-wrap gap-2">
          {['E-commerce', 'Job Market', 'LMS', 'ERP', 'Marketing', 'SEO', 'Social Media', 'PR', 'Analytics', 'Customer Service', 'Product Management', 'Supply Chain'].map(domain => (
            <span key={domain} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {domain}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
