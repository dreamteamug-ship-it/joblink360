'use client'

import { useState } from 'react'
import Link from 'next/link'

const agents = [
  {
    name: 'Amanda AI',
    role: 'Matchmaking Specialist',
    description: 'Scans live job pipelines to pair certified trainees with verified opportunities.',
    status: 'Deployed',
    icon: '🤖',
  },
  {
    name: 'Scout Agents',
    role: 'Job Pipeline Harvesters',
    description: '24/7 autonomous scraping across RemoteOK, LinkedIn, Upwork, and regional boards.',
    status: 'Active',
    icon: '🔍',
  },
  {
    name: 'Guardian Agents',
    role: 'Quality & Compliance',
    description: 'Validates job listings for legitimacy, payment verification, and employer reputation.',
    status: 'Active',
    icon: '🛡️',
  },
  {
    name: 'Creator Agents',
    role: 'Content & Training',
    description: 'Generates localized training materials in English, Swahili, French, and Japanese.',
    status: 'Beta',
    icon: '📝',
  },
  {
    name: 'Notary Agent',
    role: 'Contract Verification',
    description: 'AI-powered signature processing and compliance checking against Kenya Law.',
    status: 'Phase 2',
    icon: '📜',
  },
  {
    name: 'Analyst Agent',
    role: 'Revenue & CSR Monitor',
    description: 'Tracks fund distribution, CSR allocations, and platform economics in real-time.',
    status: 'Phase 2',
    icon: '📊',
  },
]

export default function AgentCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id='agents' className='py-24 px-6 md:px-12 bg-titan-deep/50'>
      <div className='max-w-[1440px] mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6'>
          <div className='max-w-2xl'>
            <span className='text-[10px] tracking-[4px] text-titan-gold font-accent uppercase mb-4 block'>
              Titanium Agent Network
            </span>
            <h2 className='font-display text-4xl md:text-5xl mb-4 text-titan-cream'>
              Trained Intelligence.
            </h2>
            <p className='text-titan-silver text-lg leading-relaxed'>
              Not chatbots — a trained workforce. Each agent handles a verified function autonomously.
            </p>
          </div>
          <Link 
            href='/dashboard'
            className='border border-titan-silver/30 text-titan-silver px-8 py-3 text-[10px] font-accent uppercase tracking-widest hover:border-titan-gold hover:text-titan-gold transition-all duration-300'
          >
            Open ERP Dashboard
          </Link>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {agents.map((agent, i) => (
            <div 
              key={i}
              className={group relative p-8 border transition-all duration-500 cursor-pointer }
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className='absolute top-6 right-6'>
                <span className={	ext-[9px] font-accent uppercase tracking-widest px-3 py-1 }>
                  {agent.status}
                </span>
              </div>

              <div className='w-16 h-16 border border-titan-gold/30 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:border-titan-gold group-hover:shadow-lg group-hover:shadow-titan-gold/20 transition-all duration-500'>
                {agent.icon}
              </div>

              <h3 className='font-display text-xl mb-2 text-titan-cream group-hover:text-titan-gold transition-colors'>
                {agent.name}
              </h3>
              <p className='text-[10px] text-titan-gold font-accent uppercase tracking-widest mb-4'>
                {agent.role}
              </p>
              <p className='text-sm text-titan-silver leading-relaxed'>
                {agent.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
