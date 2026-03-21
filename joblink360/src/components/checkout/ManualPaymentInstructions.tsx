import React from "react"

export default function ManualPaymentInstructions() {
  return (
    <div className="bg-gray-50 border border-savanna-gold/30 rounded-lg p-6 mt-4">
      <h3 className="font-display text-lg text-night-black mb-4">
        Complete Your Payment via M-Pesa or Bank Transfer
      </h3>
      
      <div className="space-y-4 text-sm text-gray-700">
        <div className="bg-white p-4 rounded border border-gray-200">
          <strong className="text-maasai-red block mb-1">Option 1: M-Pesa Paybill (Kenya)</strong>
          <p>Business Number: <span className="font-mono font-bold text-lg text-night-blue">123456</span></p>
          <p>Account Number: <span className="font-mono font-bold text-night-blue">JOBLINKS</span></p>
        </div>

        <div className="bg-white p-4 rounded border border-gray-200">
          <strong className="text-maasai-red block mb-1">Option 2: Direct Bank Transfer</strong>
          <p>Bank: <span className="font-bold">Equity Bank Kenya</span></p>
          <p>Account Name: <span className="font-bold">JobLinks Africa</span></p>
          <p>Account Number: <span className="font-mono font-bold text-night-blue">0123456789012</span></p>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-savanna-gold text-yellow-800">
          <strong>Next Step:</strong> Click "Place Order" below. Then, reply to your confirmation email with your M-Pesa transaction code or bank receipt. Your courses/products will be unlocked within 5 minutes of verification!
        </div>
      </div>
    </div>
  )
}
