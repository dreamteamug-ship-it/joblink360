// scripts/test-payment.js
// Run with: node scripts/test-payment.js

async function testPayment() {
  console.log('🧪 Testing payment API...\n');

  const testCases = [
    {
      name: 'M-PESA Kenya Payment',
      payload: {
        packageId: 'basic-job-seeker',
        country: 'KE',
        currency: 'KES',
        provider: 'mpesa-ke'
      }
    },
    {
      name: 'Stripe International Payment',
      payload: {
        packageId: 'titanium-enterprise',
        country: 'ZA',
        currency: 'USD',
        provider: 'stripe-global'
      }
    },
    {
      name: 'PayPal Business Payment',
      payload: {
        packageId: 'business-premium',
        country: 'UG',
        currency: 'USD',
        provider: 'paypal-international'
      }
    }
  ];

  for (const test of testCases) {
    console.log(`📋 Testing: ${test.name}`);
    try {
      const response = await fetch('https://joblink360-gamma.vercel.app/api/payments/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(test.payload)
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('  ✅ Success!');
        console.log(`  📎 Reference: ${data.payment.reference}`);
        console.log(`  💰 Amount: ${data.payment.amount} ${data.payment.currency}`);
      } else {
        console.log('  ❌ Failed:', data.error);
      }
    } catch (error) {
      console.log('  ❌ Error:', error.message);
    }
    console.log('');
  }
}

testPayment();
