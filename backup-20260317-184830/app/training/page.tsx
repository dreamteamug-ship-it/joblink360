'use client'
import Navbar from '@/components/Navbar'

const courses = [
  { title: 'Digital Literacy Basics', duration: '2 weeks', level: 'Beginner', icon: '💻' },
  { title: 'Customer Service Excellence', duration: '3 weeks', level: 'Beginner', icon: '📞' },
  { title: 'Financial Literacy', duration: '4 weeks', level: 'Beginner', icon: '💰' },
  { title: 'Entrepreneurship 101', duration: '6 weeks', level: 'Intermediate', icon: '🚀' },
  { title: 'CV Writing Workshop', duration: '1 week', level: 'Beginner', icon: '📝' },
  { title: 'Interview Skills', duration: '2 weeks', level: 'Intermediate', icon: '🎤' }
]

export default function TrainingPage() {
  return (
    <main className="gradient-mesh min-h-screen">
      <Navbar />
      <div className="pt-28 pb-20 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12">
            <span className="text-titan-gold font-mono text-sm tracking-widest uppercase">Skill Up</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-titan-cream mt-3">Training Programs</h1>
            <p className="text-titan-cream/60 mt-4 text-lg max-w-2xl">Free courses designed to prepare you for the modern workforce. Learn at your own pace.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <div key={i} className="bg-titan-dark/60 backdrop-blur-sm border border-titan-gold/10 rounded-xl p-6 hover:border-titan-gold/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-titan-maroon to-titan-blue flex items-center justify-center text-2xl mb-5">{course.icon}</div>
                <h3 className="text-xl font-display font-bold text-titan-cream">{course.title}</h3>
                <div className="flex items-center gap-4 mt-3 text-sm text-titan-cream/50 font-mono">
                  <span>{course.duration}</span>
                  <span className="w-1 h-1 bg-titan-gold/40 rounded-full"></span>
                  <span>{course.level}</span>
                </div>
                <button className="mt-6 w-full py-3 border border-titan-gold/30 text-titan-gold rounded-lg hover:bg-titan-gold/10 transition-colors font-medium">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
