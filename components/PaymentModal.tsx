'use client'

import { useState } from 'react'
import { X, CreditCard, Building2, Smartphone, Check, Loader2, ArrowRight } from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  currency?: string
  jobId?: string
  jobTitle?: string
}

type PaymentMethod = 'mpesa' | 'card' | 'bank'
type Currency = 'KES' | 'USD'

export default function PaymentModal({ isOpen, onClose, amount, currency = 'KES', jobId, jobTitle }: PaymentModalProps) {
  const [step, setStep] = useState<'amount' | 'method' | 'processing' | 'success'>('amount')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa')
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currency as Currency)
  const [customAmount, setCustomAmount] = useState(amount.toString())

  if (!isOpen) return null

  const presetAmounts = selectedCurrency === 'KES' ? [500, 1000, 2500, 5000, 10000] : [5, 10, 25, 50, 100]

  const paymentMethods = [
    { id: 'mpesa' as PaymentMethod, name: 'M-PESA', icon: Smartphone, description: 'Pay via M-PESA STK Push', color: 'bg-green-500' },
    { id: 'card' as PaymentMethod, name: 'Card Payment', icon: CreditCard, description: 'Visa, Mastercard, Amex', color: 'bg-blue-500' },
    { id: 'bank' as PaymentMethod, name: 'Bank Transfer', icon: Building2, description: 'Direct bank transfer', color: 'bg-purple-500' },
  ]

  const renderAmountStep = () => (
    <div className='space-y-6'>
      <div className='flex gap-2'>
        {(['KES', 'USD'] as const).map((curr) => (
          <button key={curr} onClick={() => setSelectedCurrency(curr)}
            className={`flex-1 py-2 px-4 rounded-lg font-mono text-sm font-medium transition-all ${selectedCurrency === curr ? 'bg-gradient-to-r from-[#800000] to-red-700 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
            {curr}
          </button>
        ))}
      </div>
      <div className='text-center py-6'>
        <p className='text-sm text-gray-400 mb-2'>Amount</p>
        <div className='flex items-center justify-center gap-2'>
          <span className='text-3xl font-mono text-gray-500'>{selectedCurrency === 'KES' ? 'KSh' : '$'}</span>
          <input type='number' value={customAmount} onChange={(e) => setCustomAmount(e.target.value)}
            className='text-5xl font-bold bg-transparent text-white text-center w-48 focus:outline-none' />
        </div>
      </div>
      <div className='flex flex-wrap gap-2'>
        {presetAmounts.map((preset) => (
          <button key={preset} onClick={() => setCustomAmount(preset.toString())}
            className='px-4 py-2 rounded-lg bg-white/5 text-gray-300 font-mono text-sm hover:bg-white/10 transition-all border border-white/10'>
            {selectedCurrency === 'KES' ? 'KSh' : '$'}{preset}
          </button>
        ))}
      </div>
      {jobTitle && (
        <div className='p-4 rounded-xl bg-white/5 border border-white/10'>
          <p className='text-xs text-gray-500 mb-1'>Paying for</p>
          <p className='text-sm text-white font-medium truncate'>{jobTitle}</p>
        </div>
      )}
      <button onClick={() => setStep('method')} disabled={!customAmount || parseFloat(customAmount) <= 0}
        className='w-full py-4 rounded-xl bg-gradient-to-r from-[#800000] to-red-700 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
        Continue <ArrowRight className='w-4 h-4' />
      </button>
    </div>
  )

  const renderMethodStep = () => (
    <div className='space-y-4'>
      <div className='text-center mb-6'>
        <p className='text-3xl font-bold text-white'>{selectedCurrency === 'KES' ? 'KSh' : '$'}{parseFloat(customAmount).toLocaleString()}</p>
        <p className='text-sm text-gray-400 mt-1'>Select payment method</p>
      </div>
      <div className='space-y-3'>
        {paymentMethods.map((method) => {
          const Icon = method.icon
          return (
            <button key={method.id} onClick={() => setPaymentMethod(method.id)}
              className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 ${paymentMethod === method.id ? 'border-[#800000] bg-[#800000]/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
              <div className={`w-10 h-10 rounded-lg ${method.color} flex items-center justify-center`}>
                <Icon className='w-5 h-5 text-white' />
              </div>
              <div className='flex-1 text-left'>
                <p className='text-white font-medium'>{method.name}</p>
                <p className='text-xs text-gray-400'>{method.description}</p>
              </div>
              {paymentMethod === method.id && <Check className='w-5 h-5 text-[#800000]' />}
            </button>
          )
        })}
      </div>
      <div className='flex gap-3 mt-6'>
        <button onClick={() => setStep('amount')} className='flex-1 py-3 rounded-xl bg-white/5 text-gray-300 font-medium hover:bg-white/10 transition-all'>Back</button>
        <button onClick={() => { setStep('processing'); setTimeout(() => setStep('success'), 2000); }} className='flex-1 py-3 rounded-xl bg-gradient-to-r from-[#800000] to-red-700 text-white font-medium hover:opacity-90 transition-all'>Pay Now</button>
      </div>
    </div>
  )

  const renderProcessingStep = () => (
    <div className='py-12 text-center space-y-6'>
      <div className='w-20 h-20 mx-auto rounded-full bg-[#800000]/20 flex items-center justify-center'>
        <Loader2 className='w-10 h-10 text-[#800000] animate-spin' />
      </div>
      <div>
        <h3 className='text-xl font-bold text-white mb-2'>Processing Payment</h3>
        <p className='text-gray-400 text-sm'>
          {paymentMethod === 'mpesa' && 'Waiting for M-PESA confirmation...'}
          {paymentMethod === 'card' && 'Processing card payment...'}
          {paymentMethod === 'bank' && 'Verifying bank transfer...'}
        </p>
      </div>
    </div>
  )

  const renderSuccessStep = () => (
    <div className='py-12 text-center space-y-6'>
      <div className='w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center'>
        <Check className='w-10 h-10 text-green-500' />
      </div>
      <div>
        <h3 className='text-xl font-bold text-white mb-2'>Payment Successful!</h3>
        <p className='text-gray-400 text-sm'>Your payment has been processed successfully.</p>
      </div>
      <div className='p-4 rounded-xl bg-white/5 border border-white/10 max-w-xs mx-auto'>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-400'>Amount</span>
          <span className='text-white font-mono'>{selectedCurrency} {parseFloat(customAmount).toLocaleString()}</span>
        </div>
        <div className='flex justify-between text-sm mt-2'>
          <span className='text-gray-400'>Reference</span>
          <span className='text-white font-mono'>TXN{Date.now().toString(36).toUpperCase()}</span>
        </div>
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
        <div className='relative p-6 border-b border-white/10'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-white'>
              {step === 'amount' && 'Enter Amount'}
              {step === 'method' && 'Payment Method'}
              {step === 'processing' && 'Processing'}
              {step === 'success' && 'Complete'}
            </h2>
            <button onClick={onClose} className='w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all'>
              <X className='w-4 h-4 text-gray-400' />
            </button>
          </div>
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
