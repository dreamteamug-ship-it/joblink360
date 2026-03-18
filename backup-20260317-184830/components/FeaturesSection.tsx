'use client'

const features = [
  {
    title: 'AI Job Pipeline',
    description: '87+ active pipelines scraping RemoteOK, LinkedIn, Upwork. Real-time matching with 0.75+ confidence.',
    stats: '2,400+ jobs/week',
    icon: '⚡',
  },
  {
    title: 'M-Pesa Integration',
    description: 'Direct Daraja API for STK Push payments. KES/USD dual wallet with real-time exchange.',
    stats: 'Live Ready',
    icon: '💰',
  },
  {
    title: 'Legal Compliance',
    description: 'Kenya Law compliant contracts with AI signature processing and document generation.',
    stats: 'Phase 2',
    icon: '📜',
  },
  {
    title: 'CSR Fund Distribution',
    description: 'Automatic 50/40/10 revenue split: Trainees, Infrastructure, Community.',
    stats: 'Active',
    icon: '🤝',
  },
]

export default function FeaturesSection() {
  return (
    <section id='pipeline' className='py-24 px-6 md:px-12'>
      <div className='max-w-[1440px] mx-auto'>
        <div className='text-center mb-16'>
          <span className='text-[10px] tracking-[4px] text-titan-gold font-accent uppercase mb-4 block'>
            Platform Capabilities
          </span>
          <h2 className='font-display text-4xl md:text-5xl text-titan-cream'>
            Built for <span className='text-titan-gold italic'>Scale</span>
          </h2>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          {features.map((feature, i) => (
            <div 
              key={i}
              className='group relative p-10 border border-titan-gold/10 bg-titan-dark/30 hover:border-titan-gold/30 transition-all duration-500 overflow-hidden'
            >
              <div className='absolute top-0 right-0 w-64 h-64 bg-titan-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-titan-gold/10 transition-all duration-700' />
              
              <div className='relative z-10'>
                <div className='flex justify-between items-start mb-6'>
                  <span className='text-4xl'>{feature.icon}</span>
                  <span className='text-[9px] font-accent uppercase tracking-widest text-titan-gold bg-titan-gold/10 px-3 py-1 border border-titan-gold/20'>
                    {feature.stats}
                  </span>
                </div>
                
                <h3 className='font-display text-2xl mb-4 text-titan-cream group-hover:text-titan-gold transition-colors'>
                  {feature.title}
                </h3>
                <p className='text-titan-silver leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
