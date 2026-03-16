'use client'

import { useState, useEffect } from 'react'
import { X, Check, Loader2, ArrowRight } from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  currency?: string
  jobTitle?: string
}

export default function PaymentModal({ isOpen, onClose, amount, currency = 'KES', jobTitle }: PaymentModalProps) {
  const [step, setStep] = useState<'amount' | 'method' | 'processing' | 'success'>('amount')
  const [paymentMethod] = useState<'mpesa' | 'card' | 'bank'>('mpesa')
  const [selectedCurrency] = useState(currency)
  const [customAmount] = useState(amount.toString())

  // Handle the processing transition safely
  useEffect(() => {
    if (step === 'processing') {
      const timer = setTimeout(() => setStep('success'), 2000)
      return () => clearTimeout(timer)
    }
  }, [step])

  if (!isOpen) return null

  const renderAmountStep = () => (
    <div className='space-y-6'>
       <div className='text-center py-6'>
          <p className='text-3xl font-bold text-white'>{selectedCurrency === 'KES' ? 'KSh' : '$'}{parseFloat(customAmount).toLocaleString()}</p>
       </div>
       <button onClick={() => setStep('method')} className='w-full py-4 rounded-xl bg-gradient-to-r from-[#800000] to-red-700 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all'>
         Continue <ArrowRight className='w-4 h-4' />
       </button>
    </div>
  )

  const renderMethodStep = () => (
    <div className='space-y-4'>
      <div className='p-4 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-4'>
        <p className='text-xs text-[#D4AF37] uppercase tracking-widest font-bold'>Payment For</p>
        <p className='text-white font-medium'>{jobTitle || 'Service Fee'}</p>
      </div>
      <button onClick={() => setStep('processing')} className='w-full p-4 rounded-xl border border-white/10 bg-white/5 text-white flex items-center justify-between hover:bg-white/10 transition-all'>
        <span>Pay with {paymentMethod.toUpperCase()}</span>
        <ArrowRight className='w-4 h-4 text-gray-500' />
      </button>
      <button onClick={() => setStep('amount')} className='w-full text-gray-400 text-sm hover:text-white transition-colors'>Back to amount</button>
    </div>
  )

  const renderProcessingStep = () => (
    <div className='py-12 text-center space-y-4'>
      <Loader2 className='w-10 h-10 text-[#D4AF37] animate-spin mx-auto' />
      <p className='text-white font-medium'>Securing Transaction...</p>
      <p className='text-gray-400 text-sm'>Please do not refresh this page</p>
    </div>
  )

  const renderSuccessStep = () => (
    <div className='py-12 text-center space-y-6'>
      <div className='w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center'>
        <Check className='w-10 h-10 text-green-500' />
      </div>
      <div>
        <h3 className='text-xl font-bold text-white'>Payment Successful!</h3>
        <p className='text-gray-400 text-sm mt-1'>Receipt has been sent to your email.</p>
      </div>
      <button onClick={onClose} className='w-full py-3 rounded-xl bg-gradient-to-r from-[#800000] to-red-700 text-white font-medium hover:opacity-90 transition-all'>
        Done
      </button>
    </div>
  )

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' onClick={onClose} />
      <div className='relative w-full max-w-md bg-gradient-to-b from-[#1a1a2e] to-[#16213e] rounded-2xl border border-white/10 shadow-2xl overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-[#800000]/5 via-transparent to-[#D4AF37]/5' />
        <div className='relative p-6 border-b border-white/10 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-white'>
            {step === 'amount' && 'Confirm Amount'}
            {step === 'method' && 'Select Method'}
            {step === 'processing' && 'Processing'}
            {step === 'success' && 'Complete'}
          </h2>
          <button onClick={onClose} className='text-gray-400 hover:text-white'>
            <X className='w-5 h-5' />
          </button>
        </div>
        <div className='relative p-6'>
          {step === 'amount' && renderAmountStep()}
          {step === 'method' && renderMethodStep()}
          {step === 'processing' && renderProcessingStep()}
          {step === 'success' && renderSuccessStep()}
        </div>
      </div>
    </div>
  )
}
