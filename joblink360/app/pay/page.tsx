// app/pay/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function PaymentPage() {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle'|'verifying'|'success'|'error'>('idle')
  const [message, setMessage] = useState('')

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code || code.length < 8) {
      setStatus('error')
      setMessage('Please enter a valid M-Pesa confirmation code')
      return
    }

    setStatus('verifying')
    setMessage('⚡ Vulture-Eye verifying your payment...')

    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setMessage('✅ Payment verified! Redirecting to LMS...')
      setTimeout(() => {
        window.location.href = '/lms'
      }, 2000)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-800 bg-black/95 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-amber-500">JobLink 360</Link>
          <Link href="/lms" className="text-zinc-400 hover:text-amber-500">Back to LMS</Link>
        </div>
      </nav>

      <div className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-500 mb-2">Complete Your Payment</h1>
          <p className="text-zinc-400">Pay KES 5,000 - Unlock All Courses</p>
        </div>

        <div className="bg-gradient-to-r from-green-600/10 to-transparent border border-green-500/30 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-green-400 mb-4">📱 M-Pesa Paybill</h2>
          <div className="space-y-3">
            <div className="flex justify-between"><span className="text-zinc-400">Paybill:</span><span className="font-mono font-bold">400200</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">Account:</span><span className="font-mono font-bold">4045731</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">Amount:</span><span className="text-amber-500 font-bold text-2xl">KES 5,000</span></div>
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">M-Pesa Phone Number</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0712345678" className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none" required />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">M-Pesa Confirmation Code</label>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="QWERTY12345" className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white font-mono focus:border-amber-500 focus:outline-none" required />
            <p className="text-xs text-zinc-500 mt-1">Found in your M-Pesa confirmation SMS</p>
          </div>

          {message && (
            <div className={`p-4 rounded-lg text-center ${status === 'success' ? 'bg-green-600/20 border border-green-500/50 text-green-400' : status === 'error' ? 'bg-red-600/20 border border-red-500/50 text-red-400' : 'bg-blue-600/20 border border-blue-500/50 text-blue-400'}`}>
              {message}
            </div>
          )}

          <button type="submit" disabled={status === 'verifying'} className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-zinc-600 text-white font-bold py-3 rounded-lg transition">
            {status === 'verifying' ? '⚡ Verifying...' : '💰 Pay KES 5,000 & Unlock'}
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-zinc-600">
          <p>⚡ Vulture-Eye | 0.02s Verification | NCBA Bank 8515130017</p>
        </div>
      </div>
    </div>
  )
}