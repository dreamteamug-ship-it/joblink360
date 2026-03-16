'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AmandaChat from '@/components/AmandaChat'

const courses = [
  { id: 1, title: 'AI Data Labeling Fundamentals', duration: '4 weeks', level: 'Beginner', language: ['EN', 'SW'], enrolled: 2340, description: 'Learn to annotate, classify, and label datasets for ML models.' },
  { id: 2, title: 'Swahili NLP Annotation', duration: '6 weeks', level: 'Intermediate', language: ['SW', 'EN'], enrolled: 890, description: 'Specialized Swahili language data processing for NLP models.' },
  { id: 3, title: 'Python for Data Workers', duration: '8 weeks', level: 'Beginner', language: ['EN'], enrolled: 1560, description: 'Foundation Python for data manipulation and automation.' },
  { id: 4, title: 'Japanese Market Services', duration: '12 weeks', level: 'Advanced', language: ['JA', 'EN'], enrolled: 340, description: 'Training for serving Japanese clients with cultural awareness.' },
  { id: 5, title: 'Remote Work Professional', duration: '3 weeks', level: 'Beginner', language: ['EN', 'SW'], enrolled: 3200, description: 'Master remote work tools and productivity for freelancing.' },
  { id: 6, title: 'Content Moderation & Safety', duration: '5 weeks', level: 'Intermediate', language: ['EN', 'SW'], enrolled: 780, description: 'Content moderation standards and AI-assisted workflows.' },
]

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner': return 'bg-green-500/10 text-green-400 border-green-500/30'
    case 'Intermediate': return 'bg-titan-gold/10 text-titan-gold border-titan-gold/30'
    case 'Advanced': return 'bg-titan-maroon/20 text-red-400 border-red-500/30'
    default: return 'bg-titan-silver/10 text-titan-silver border-titan-silver/30'
  }
}

export default function TrainingPage() {
  return (
    <main className='gradient-mesh min-h-screen'>
      <Navbar />
      <div className='pt-28 pb-20 px-6 md:px-12'>
        <div className='max-w-[1440px] mx-auto'>
          <div className='mb-12'>
            <span className='text-[10px] text-titan-gold font-accent uppercase tracking-widest mb-4 block'>Joblink Academy</span>
            <h1 className='font-display text-4xl md:text-5xl text-titan-cream mb-4'>
              Training <span className='text-titan-gold'>Portal</span>
            </h1>
            <p className='text-titan-silver text-lg max-w-2xl'>
              Build skills that connect you to real opportunities. All courses designed for the African digital workforce.
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-12'>
            {[
              { label: 'Active Courses', value: '24' },
              { label: 'Total Enrolled', value: '12,400+' },
              { label: 'Languages', value: '4' },
              { label: 'Job Placement', value: '78%' },
            ].map((stat, i) => (
              <div key={i} className='glass-panel border border-titan-gold/10 p-5 text-center'>
                <p className='font-display text-2xl text-titan-gold'>{stat.value}</p>
                <p className='text-[10px] text-titan-silver font-accent uppercase tracking-widest mt-1'>{stat.label}</p>
              </div>
            ))}
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {courses.map((course) => (
              <div key={course.id} className='glass-panel border border-titan-gold/10 hover:border-titan-gold/30 transition-all duration-300 group'>
                <div className='p-6'>
                  <div className='flex justify-between items-start mb-4'>
                    <span className={\	ext-[9px] font-accent uppercase tracking-widest px-3 py-1 border \\}>
                      {course.level}
                    </span>
                    <span className='text-[10px] text-titan-silver'>{course.duration}</span>
                  </div>

                  <h3 className='font-display text-lg text-titan-cream group-hover:text-titan-gold transition-colors mb-2'>
                    {course.title}
                  </h3>
                  <p className='text-sm text-titan-silver leading-relaxed mb-4'>{course.description}</p>

                  <div className='flex items-center gap-2 mb-4'>
                    {course.language.map((lang) => (
                      <span key={lang} className='text-[9px] bg-titan-dark/50 text-titan-silver px-2 py-1 border border-titan-gold/10'>
                        {lang}
                      </span>
                    ))}
                    <span className='text-[10px] text-titan-silver ml-auto'>
                      {course.enrolled.toLocaleString()} enrolled
                    </span>
                  </div>

                  <button className='w-full bg-titan-gold/10 border border-titan-gold/30 text-titan-gold py-3 text-[10px] font-accent uppercase tracking-widest hover:bg-titan-gold hover:text-titan-dark transition-all'>
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <AmandaChat />
    </main>
  )
}
