// src/app/pay/page.tsx
// Simple working payment page

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-500 mb-2">JOBLINK 360</h1>
          <p className="text-zinc-400">Pay KES 5,000 - Unlock Your Future</p>
        </div>

        {/* M-Pesa Instructions */}
        <div className="bg-zinc-900/50 border border-amber-500/30 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-amber-500 mb-4">📱 M-Pesa Paybill</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-400">Paybill:</span>
              <span className="font-mono text-white font-bold">400200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Account:</span>
              <span className="font-mono text-white font-bold">4045731</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Amount:</span>
              <span className="text-amber-500 font-bold text-xl">KES 5,000</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
          <form>
            <div className="mb-4">
              <label className="block text-sm text-zinc-400 mb-2">M-Pesa Phone Number</label>
              <input 
                type="tel" 
                placeholder="0712345678"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm text-zinc-400 mb-2">Confirmation Code</label>
              <input 
                type="text" 
                placeholder="QWERTY12345"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white font-mono"
              />
              <p className="text-xs text-zinc-500 mt-1">From your M-Pesa SMS</p>
            </div>
            <button 
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition"
            >
              Verify Payment
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-zinc-600">
          <p>⚡ Verified by Vulture-Eye | NCBA Bank 8515130017</p>
        </div>
      </div>
    </div>
  );
}