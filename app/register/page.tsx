'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    education: '',
    experience: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="gradient-mesh min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 px-6 md:px-12 min-h-screen flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-titan-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-titan-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-display font-bold text-titan-cream mb-4">Registration Complete!</h1>
            <p className="text-titan-cream/60 mb-8">Welcome to JobLink360. Start exploring opportunities and building your future.</p>
            <Link href="/" className="inline-block px-8 py-3 bg-titan-gold text-titan-dark font-semibold rounded-lg hover:bg-titan-gold/90 transition-colors">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="gradient-mesh min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20 px-6 md:px-12 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-titan-cream">Create Your Profile</h1>
            <p className="text-titan-cream/60 mt-3">Start your journey to meaningful work</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-titan-dark/60 backdrop-blur-sm border border-titan-gold/10 rounded-xl p-8 space-y-6">
            <div>
              <label className="block text-titan-cream/80 text-sm font-mono mb-2">Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full bg-titan-deep/50 border border-titan-gold/20 rounded-lg px-4 py-3 text-titan-cream placeholder:text-titan-cream/40 focus:outline-none focus:border-titan-gold/50" placeholder="Enter your full name" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-titan-cream/80 text-sm font-mono mb-2">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-titan-deep/50 border border-titan-gold/20 rounded-lg px-4 py-3 text-titan-cream placeholder:text-titan-cream/40 focus:outline-none focus:border-titan-gold/50" placeholder="07XX XXX XXX" />
              </div>
              <div>
                <label className="block text-titan-cream/80 text-sm font-mono mb-2">Email (optional)</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-titan-deep/50 border border-titan-gold/20 rounded-lg px-4 py-3 text-titan-cream placeholder:text-titan-cream/40 focus:outline-none focus:border-titan-gold/50" placeholder="your@email.com" />
              </div>
            </div>

            <div>
              <label className="block text-titan-cream/80 text-sm font-mono mb-2">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full bg-titan-deep/50 border border-titan-gold/20 rounded-lg px-4 py-3 text-titan-cream placeholder:text-titan-cream/40 focus:outline-none focus:border-titan-gold/50" placeholder="City, County" />
            </div>

            <div>
              <label className="block text-titan-cream/80 text-sm font-mono mb-2">Highest Education</label>
              <select name="education" value={formData.education} onChange={handleChange} required className="w-full bg-titan-deep/50 border border-titan-gold/20 rounded-lg px-4 py-3 text-titan-cream focus:outline-none focus:border-titan-gold/50">
                <option value="">Select your education level</option>
                <option value="primary">Primary School</option>
                <option value="secondary">Secondary School (Form 4)</option>
                <option value="diploma">Diploma</option>
                <option value="degree">Bachelor&apos;s Degree</option>
                <option value="masters">Master&apos;s Degree</option>
              </select>
            </div>

            <div>
              <label className="block text-titan-cream/80 text-sm font-mono mb-2">Work Experience</label>
              <select name="experience" value={formData.experience} onChange={handleChange} required className="w-full bg-titan-deep/50 border border-titan-gold/20 rounded-lg px-4 py-3 text-titan-cream focus:outline-none focus:border-titan-gold/50">
                <option value="">Select experience level</option>
                <option value="none">No experience</option>
                <option value="entry">Entry level (0-1 years)</option>
                <option value="mid">Mid level (2-5 years)</option>
                <option value="senior">Senior level (5+ years)</option>
              </select>
            </div>

            <button type="submit" className="w-full py-4 bg-gradient-to-r from-titan-maroon to-titan-blue text-titan-cream font-semibold rounded-lg hover:opacity-90 transition-opacity">
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
