'use client'
import { useState } from 'react'

const agents = [
  {
    id: 1,
    name: 'Amanda',
    role: 'Career Guidance Agent',
    specialty: 'Job matching, CV reviews, career advice',
    icon: '👩🏾‍💼',
    color: 'from-[#8B0000] to-[#1a365d]',
    available: true
  },
  {
    id: 2,
    name: 'Kwame',
    role: 'Skills Development Agent',
    specialty: 'Training programs, certifications, upskilling',
    icon: '👨🏾‍🏫',
    color: 'from-[#1a365d] to-[#2d5a3d]',
    available: true
  },
  {
    id: 3,
    name: 'Amara',
    role: 'Entrepreneurship Agent',
    specialty: 'Business planning, funding, mentorship',
    icon: '👩🏾‍💼',
    color: 'from-[#2d5a3d] to-[#8B0000]',
    available: true
  },
  {
    id: 4,
    name: 'Jabari',
    role: 'Financial Wellness Agent',
    specialty: 'Budgeting, savings, salary advances',
    icon: '👨🏾‍💼',
    color: 'from-[#1a365d] to-[#8B0000]',
    available: true
  }
]

export default function AgentCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="agents" className="py-24 px-6 md:px-12 bg-titan-deep/50">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-titan-gold font-mono text-sm tracking-widest uppercase">AI-Powered Support</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-titan-cream mt-3 leading-tight">
              Meet Your Career Agents
            </h2>
            <p className="text-titan-cream/60 mt-4 text-lg">
              Four specialized AI agents working together to accelerate your career journey.
            </p>
          </div>
          <div className="flex items-center gap-2 text-titan-cream/60">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-mono">All agents online</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative bg-titan-dark/60 backdrop-blur-sm border border-titan-gold/10 rounded-xl p-6 h-full transition-all duration-300 hover:border-titan-gold/30 hover:shadow-2xl hover:shadow-titan-gold/5">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" style={{ backgroundImage: `linear-gradient(135deg, var(--titan-maroon), var(--titan-blue))` }}></div>
                
                <div className="relative">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-2xl mb-5 shadow-lg`}>
                    {agent.icon}
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-titan-cream">{agent.name}</h3>
                  <p className="text-titan-gold text-sm font-mono mt-1">{agent.role}</p>
                  <p className="text-titan-cream/50 text-sm mt-4 leading-relaxed">{agent.specialty}</p>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${agent.available ? 'bg-emerald-400' : 'bg-gray-500'}`}></span>
                      <span className="text-xs text-titan-cream/40 font-mono">{agent.available ? 'Available' : 'Busy'}</span>
                    </div>
                    <button className="text-titan-gold text-sm font-medium hover:text-titan-cream transition-colors flex items-center gap-1">
                      Chat
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
