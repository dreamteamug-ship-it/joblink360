'use client'

import { useState, useEffect } from 'react'
import { X, CreditCard, Building2, Smartphone, Check, Loader2, ArrowRight } from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  currency?: string
  jobTitle?: string
}

export default function PaymentModal({ isOpen, onClose, amount, currency = 'KES', jobTitle }: PaymentModalProps) {
  const [step, setStep] = useState<'amount' | 'method' | 'processing' | 'success'>('amount')
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'bank'>('mpesa')
  const [selectedCurrency, setSelectedCurrency] = useState(currency)
  const [customAmount, setCustomAmount] = useState(amount.toString())

  // Move setTimeout to useEffect to avoid build issues
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
          <p className='text-3xl font-bold text-white'>{selectedCurrency === 'KES' ? 'KSh' : '$'}{customAmount}</p>
       </div>
       <button onClick={() => setStep('method')} className='w-full py-4 rounded-xl bg-gradient-to-r from-[#800000] to-red-700 text-white font-medium flex items-center justify-center gap-2'>
         Continue <ArrowRight className='w-4 h-4' />
       </button>
    </div>
  )

  const renderMethodStep = () => (
    <div className='space-y-4'>
      <button onClick={() => setStep('processing')} className='w-full p-4 rounded-xl border border-white/10 bg-white/5 text-white'>
        Pay with {paymentMethod.toUpperCase()}
      </button>
      <button onClick={() => setStep('amount')} className='w-full text-gray-400 text-sm'>Back</button>
    </div>
  )

  const renderProcessingStep = () => (
    <div className='py-12 text-center space-y-4'>
      <Loader2 className='w-10 h-10 text-[#800000] animate-spin mx-auto' />
      <p className='text-white'>Processing Payment...</p>
    </div>
  )

  const renderSuccessStep = () => (
    <div className='py-12 text-center space-y-6'>
      <div className='w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center'>
        <Check className='w-10 h-10 text-green-500' />
      </div>
      <h3 className='text-xl font-bold text-white'>Payment Successful!</h3>
      <button onClick={onClose} className='w-full py-3 rounded-xl bg-gradient-to-r from-[#800000] to-red-700 text-white font-medium'>Done</button>
    </div>
  )

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' onClick={onClose} />
      <div className='relative w-full max-w-md bg-[#1a1a2e] rounded-2xl border border-white/10 p-6'>
        <button onClick={onClose} className='absolute top-4 right-4 text-gray-400 hover:text-white'>
          <X className='w-5 h-5' />
        </button>
        {step === 'amount' && renderAmountStep()}
        {step === 'method' && renderMethodStep()}
        {step === 'processing' && renderProcessingStep()}
        {step === 'success' && renderSuccessStep()}
      </div>
    </div>
  )
}
