'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const roles = [
  { value: 'student', label: 'Student / Trainee' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'professional', label: 'Professional' },
  { value: 'organization', label: 'Organization' },
]

const programs = [
  { value: 'ai_training', label: 'AI Training Program' },
  { value: 'language', label: 'Language Services' },
  { value: 'tech', label: 'Technology & Development' },
  { value: 'enterprise', label: 'Enterprise Solutions' },
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    program: '',
    country: '',
    preferredLanguage: 'en',
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}
    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
      if (!formData.password) newErrors.password = 'Password is required'
      else if (formData.password.length < 8) newErrors.password = 'Min 8 characters'
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    }
    if (currentStep === 2) {
      if (!formData.role) newErrors.role = 'Select a role'
      if (!formData.program) newErrors.program = 'Select a program'
      if (!formData.country) newErrors.country = 'Select your country'
    }
    if (currentStep === 3) {
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) setStep(step + 1)
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    localStorage.setItem('joblink_user', JSON.stringify({
      ...formData,
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }))
    router.push('/dashboard')
  }

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  return (
    <main className='gradient-mesh min-h-screen'>
      <Navbar />
      <div className='pt-32 pb-20 px-6 md:px-12 min-h-screen'>
        <div className='max-w-2xl mx-auto'>
          <div className='text-center mb-12'>
            <Link href='/' className='inline-flex items-center gap-2 text-titan-silver hover:text-titan-gold transition-colors mb-8'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
              </svg>
              <span className='text-xs font-accent uppercase tracking-widest'>Back to Home</span>
            </Link>
            <h1 className='font-display text-4xl md:text-5xl text-titan-cream mb-4'>
              Join <span className='text-titan-gold'>Joblink 360</span>
            </h1>
            <p className='text-titan-silver'>Create your account and start your journey.</p>
          </div>

          <div className='flex items-center justify-center gap-4 mb-12'>
            {[1, 2, 3].map((s) => (
              <div key={s} className='flex items-center'>
                <div className={\w-10 h-10 rounded-full flex items-center justify-center font-accent text-sm transition-all \\}>
                  {s < step ? '✓' : s}
                </div>
                {s < 3 && <div className={\w-16 h-0.5 mx-2 \\} />}
              </div>
            ))}
          </div>

          <div className='glass-panel border border-titan-gold/20 p-8 md:p-10'>
            {step === 1 && (
              <div className='space-y-6'>
                <h2 className='font-display text-xl text-titan-gold mb-6'>Personal Information</h2>
                
                <div>
                  <label className='block text-xs font-accent uppercase tracking-wider text-titan-silver mb-2'>Full Name</label>
                  <input type='text' value={formData.fullName} onChange={(e) => updateField('fullName', e.target.value)}
                    className='w-full bg-titan-dark/50 border border-titan-gold/20 rounded px-4 py-3 text-titan-cream placeholder-titan-silver/40 focus:outline-none focus:border-titan-gold/50 transition-colors'
                    placeholder='Enter your full name' />
                  {errors.fullName && <p className='text-red-400 text-xs mt-1'>{errors.fullName}</p>}
                </div>

                <div>
                  <label className='block text-xs font-accent uppercase tracking-wider text-titan-silver mb-2'>Email Address</label>
                  <input type='email' value={formData.email} onChange={(e) => updateField('email', e.target.value)}
                    className='w-full bg-titan-dark/50 border border-titan-gold/20 rounded px-4 py-3 text-titan-cream placeholder-titan-silver/40 focus:outline-none focus:border-titan-gold/50 transition-colors'
                    placeholder='your@email.com' />
                  {errors.email && <p className='text-red-400 text-xs mt-1'>{errors.email}</p>}
                </div>

                <div>
                  <label className='block text-xs font-accent uppercase tracking-wider text-titan-silver mb-2'>Phone Number</label>
                  <input type='tel' value={formData.phone} onChange={(e) => updateField('phone', e.target.value)}
                    className='w-full bg-titan-dark/50 border border-titan-gold/20 rounded px-4 py-3 text-titan-cream placeholder-titan-silver/40 focus:outline-none focus:border-titan-gold/50 transition-colors'
                    placeholder='+254 7XX XXX XXX' />
                  {errors.phone && <p className='text-red-400 text-xs mt-1'>{errors.phone}</p>}
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-xs font-accent uppercase tracking-wider text-titan-silver mb-2'>Password</label>
                    <input type='password' value={formData.password} onChange={(e) => updateField('password', e.target.value)}
                      className='w-full bg-titan-dark/50 border border-titan-gold/20 rounded px-4 py-3 text-titan-cream placeholder-titan-silver/40 focus:outline-none focus:border-titan-gold/50 transition-colors'
                      placeholder='••••••••' />
                    {errors.password && <p className='text-red-400 text-xs mt-1'>{errors.password}</p>}
                  </div>
                  <div>
                    <label className='block text-xs font-accent uppercase tracking-wider text-titan-silver mb-2'>Confirm Password</label>
                    <input type='password' value={formData.confirmPassword} onChange={(e) => updateField('confirmPassword', e.target.value)}
                      className='w-full bg-titan-dark/50 border border-titan-gold/20 rounded px-4 py-3 text-titan-cream placeholder-titan-silver/40 focus:outline-none focus:border-titan-gold/50 transition-colors'
                      placeholder='••••••••' />
                    {errors.confirmPassword && <p className='text-red-400 text-xs mt-1'>{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className='space-y-6'>
                <h2 className='font-display text-xl text-titan-gold mb-6'>Program Selection</h2>

                <div>
                  <label className='block text-xs font-accent uppercase tracking-wider text-titan-silver mb-3'>Your Role</label>
                  <div className='grid grid-cols-2 gap-3'>
                    {roles.map((role) => (
                      <button key={role.value} type='button' onClick={() => updateField('role', role.value)}
                        className={\p-4 border text-left transition-all \\}>
                        <span className='text-sm'>{role.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.role && <p className='text-red-400 text-xs mt-1'>{errors.role}</p>}
                </div>

                <div>
                  <label className='block text-xs font-accent uppercase tracking-wider text-titan-silver mb-3'>Training Program</label>
                  <div className='grid grid-cols-2 gap-3'>
                    {programs.map((prog) => (
                      <button key={prog.value} type='button' onClick={() => updateField('program', prog.value)}
                        className={\p-4 border text-left transition-all \\}>
                        <span className='text-sm'>{prog.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.program && <p className='text-red-400 text-xs mt-1'>{errors.program}</p>}
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-xs font-accent uppercase tracking-wider text-titan-silver mb-2'>Country</label>
                    <select value={formData.country} onChange={(e) => updateField('country', e.target.value)}
                      className='w-full bg-titan-dark/50 border border-titan-gold/20 rounded px-4 py-3 text-titan-cream focus:outline-none focus:border-titan-gold/50 transition-colors'>
                      <option value=''>Select country</option>
                      <option value='KE'>Kenya</option>
                      <option value='UG'>Uganda</option>
                      <option value='TZ'>Tanzania</option>
                      <option value='RW'>Rwanda</option>
                      <option value='NG'>Nigeria</option>
                      <option value='OTHER'>Other</option>
                    </select>
                    {errors.country && <p className='text-red-400 text-xs mt-1'>{errors.country}</p>}
                  </div>
                  <div>
                    <label className='block text-xs font-accent uppercase tracking-wider text-titan-silver mb-2'>Preferred Language</label>
                    <select value={formData.preferredLanguage} onChange={(e) => updateField('preferredLanguage', e.target.value)}
                      className='w-full bg-titan-dark/50 border border-titan-gold/20 rounded px-4 py-3 text-titan-cream focus:outline-none focus:border-titan-gold/50 transition-colors'>
                      <option value='en'>English</option>
                      <option value='sw'>Swahili</option>
                      <option value='fr'>French</option>
                      <option value='ja'>Japanese</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className='space-y-6'>
                <h2 className='font-display text-xl text-titan-gold mb-6'>Confirm Registration</h2>

                <div className='bg-titan-dark/50 border border-titan-gold/10 p-6 space-y-4'>
                  <div className='flex justify-between'>
                    <span className='text-titan-silver text-sm'>Full Name</span>
                    <span className='text-titan-cream'>{formData.fullName}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-titan-silver text-sm'>Email</span>
                    <span className='text-titan-cream'>{formData.email}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-titan-silver text-sm'>Role</span>
                    <span className='text-titan-gold'>{roles.find(r => r.value === formData.role)?.label}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-titan-silver text-sm'>Program</span>
                    <span className='text-titan-gold'>{programs.find(p => p.value === formData.program)?.label}</span>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <input type='checkbox' id='terms' checked={formData.agreeTerms}
                    onChange={(e) => updateField('agreeTerms', e.target.checked)}
                    className='mt-1 w-4 h-4 bg-titan-dark border-titan-gold/30 rounded' />
                  <label htmlFor='terms' className='text-sm text-titan-silver'>
                    I agree to the <span className='text-titan-gold cursor-pointer'>Terms of Service</span> and{' '}
                    <span className='text-titan-gold cursor-pointer'>Privacy Policy</span>.
                  </label>
                </div>
                {errors.agreeTerms && <p className='text-red-400 text-xs'>{errors.agreeTerms}</p>}
              </div>
            )}

            <div className='flex justify-between mt-8 pt-6 border-t border-titan-gold/10'>
              {step > 1 ? (
                <button type='button' onClick={() => setStep(step - 1)}
                  className='px-6 py-3 border border-titan-gold/30 text-titan-gold text-xs font-accent uppercase tracking-widest hover:bg-titan-gold/10 transition-all'>
                  Back
                </button>
              ) : <div />}

              {step < 3 ? (
                <button type='button' onClick={handleNext}
                  className='px-8 py-3 bg-titan-gold text-titan-dark text-xs font-accent font-bold uppercase tracking-widest hover:bg-titan-gold-light transition-all'>
                  Continue
                </button>
              ) : (
                <button type='button' onClick={handleSubmit} disabled={isSubmitting}
                  className='px-8 py-3 bg-titan-gold text-titan-dark text-xs font-accent font-bold uppercase tracking-widest hover:bg-titan-gold-light transition-all disabled:opacity-50 flex items-center gap-2'>
                  {isSubmitting ? (
                    <>
                      <svg className='animate-spin w-4 h-4' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
                      </svg>
                      Creating...
                    </>
                  ) : 'Create Account'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
