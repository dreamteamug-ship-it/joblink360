'use client'

import { useState } from 'react'

interface PaymentModalProps {
  onClose: () => void
}

const paymentMethods = [
  { id: 'mpesa', name: 'M-Pesa', icon: '📱', currencies: ['KES'] },
  { id: 'stripe', name: 'Stripe', icon: '💳', currencies: ['USD', 'KES'] },
  { id: 'crypto', name: 'Crypto', icon: '₿', currencies: ['USD'] },
]

export default function PaymentModal({ onClose }: PaymentModalProps) {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES')
  const [method, setMethod] = useState('mpesa')
  const [phone, setPhone] = useState('')
  const [step, setStep] = useState<'amount' | 'details' | 'processing' | 'success'>('amount')
  const [error, setError] = useState('')

  const handleAmountSubmit = () => {
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount')
      return
    }
    setError('')
    setStep('details')
  }

  const handlePayment = async () => {
    if (method === 'mpesa' && !phone) {
      setError('Please enter your M-Pesa phone number')
      return
    }
    setError('')
    setStep('processing')
    await new Promise(resolve => setTimeout(resolve, 3000))
    setStep('success')
  }

  return (
    <div className='fixed inset-0 z-[80] flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/70 backdrop-blur-sm' onClick={onClose} />

      <div className='relative w-full max-w-md glass-panel border border-titan-gold/30 rounded-lg overflow-hidden'>
        <div className='bg-gradient-to-r from-titan-maroon/60 to-titan-blue/60 px-6 py-4 border-b border-titan-gold/20'>
          <div className='flex justify-between items-center'>
            <h2 className='font-display text-lg text-titan-gold'>Fund Wallet</h2>
            <button onClick={onClose} className='text-titan-silver hover:text-titan-gold transition-colors'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>

        <div className='p-6'>
          {step === 'amount' && (
            <div className='space-y-6'>
              <div className='flex gap-2'>
                {(['KES', 'USD'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={\lex-1 py-3 text-sm font-accent uppercase tracking-wider transition-all \\}
                  >
                    {curr}
                  </button>
                ))}
              </div>

              <div>
                <label className='block text-xs font-accent uppercase tracking-wider text-titan-silver mb-2'>
                  Enter Amount
                </label>
                <div className='relative'>
                  <span className='absolute left-4 top-1/2 -translate-y-1/2 text-titan-gold'>
                    {currency === 'KES' ? 'KES' : '$'}
                  </span>
                  <input
                    type='number'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={currency === 'KES' ? '1,000' : '50.00'}
                    className='w-full bg-titan-dark/50 border border-titan-gold/20 rounded pl-16 pr-4 py-4 text-xl text-titan-cream placeholder-titan-silver/40 focus:outline-none focus:border-titan-gold/50 transition-colors'
                  />
                </div>
              </div>

              <div className='flex gap-2'>
                {currency === 'KES' 
                  ? [500, 1000, 2500, 5000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt.toString())}
                        className={\lex-1 py-2 text-sm border transition-all \\}
                      >
                        {amt.toLocaleString()}
                      </button>
                    ))
                  : [10, 25, 50, 100].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt.toString())}
                        className={\lex-1 py-2 text-sm border transition-all \\}
                      >
                        \
                      </button>
                    ))
                }
              </div>

              <div>
                <label className='block text-xs font-accent uppercase tracking-wider text-titan-silver mb-3'>
                  Payment Method
                </label>
                <div className='space-y-2'>
                  {paymentMethods.map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setMethod(pm.id)}
                      className={\w-full flex items-center gap-4 p-4 border transition-all \\}
                    >
                      <span className='text-xl'>{pm.icon}</span>
                      <span className='text-sm text-titan-cream'>{pm.name}</span>
                      <span className='ml-auto text-[10px] text-titan-silver'>
                        {pm.currencies.join(' / ')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className='text-red-400 text-sm'>{error}</p>}

              <button
                onClick={handleAmountSubmit}
                className='w-full bg-titan-gold text-titan-dark py-4 font-accent font-bold text-xs uppercase tracking-widest hover:bg-titan-gold-light transition-all'
              >
                Continue
              </button>
            </div>
          )}

          {step === 'details' && (
            <div className='space-y-6'>
              <div className='bg-titan-dark/50 border border-titan-gold/10 p-4 space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-titan-silver text-sm'>Amount</span>
                  <span className='text-titan-gold font-display text-lg'>
                    {currency === 'KES' ? \KES \\ : \$\\}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-titan-silver text-sm'>Method</span>
                  <span className='text-titan-cream'>{paymentMethods.find(p => p.id === method)?.name}</span>
                </div>
              </div>

              {method === 'mpesa' && (
                <div>
                  <label className='block text-xs font-accent uppercase tracking-wider text-titan-silver mb-2'>
                    M-Pesa Phone Number
                  </label>
                  <input
                    type='tel'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='+254 7XX XXX XXX'
                    className='w-full bg-titan-dark/50 border border-titan-gold/20 rounded px-4 py-3 text-titan-cream placeholder-titan-silver/40 focus:outline-none focus:border-titan-gold/50 transition-colors'
                  />
                </div>
              )}

              {error && <p className='text-red-400 text-sm'>{error}</p>}

              <div className='flex gap-3'>
                <button
                  onClick={() => setStep('amount')}
                  className='flex-1 border border-titan-gold/30 text-titan-gold py-3 text-xs font-accent uppercase tracking-widest hover:bg-titan-gold/10 transition-all'
                >
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  className='flex-1 bg-titan-gold text-titan-dark py-3 text-xs font-accent font-bold uppercase tracking-widest hover:bg-titan-gold-light transition-all'
                >
                  Pay Now
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className='py-12 text-center'>
              <div className='w-16 h-16 border-4 border-titan-gold/20 border-t-titan-gold rounded-full animate-spin mx-auto mb-6' />
              <h3 className='font-display text-xl text-titan-gold mb-2'>Processing Payment</h3>
              <p className='text-titan-silver text-sm'>
                {method === 'mpesa' ? 'Check your phone for M-Pesa prompt...' : 'Processing...'}
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className='py-12 text-center'>
              <div className='w-20 h-20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <svg className='w-10 h-10 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
              </div>
              <h3 className='font-display text-xl text-titan-gold mb-2'>Payment Successful!</h3>
              <p className='text-titan-silver text-sm mb-6'>
                {currency === 'KES' ? \KES \\ : \$\\} has been added to your wallet
              </p>
              <button
                onClick={onClose}
                className='bg-titan-gold text-titan-dark px-8 py-3 text-xs font-accent font-bold uppercase tracking-widest hover:bg-titan-gold-light transition-all'
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
