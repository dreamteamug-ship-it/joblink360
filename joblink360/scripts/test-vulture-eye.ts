// scripts/test-vulture-eye.ts
// Test script for Vulture-Eye Reconciliation

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testVultureEye() {
  console.log('🦅 Testing Vulture-Eye Reconciliation Engine...\n');
  
  // Test 1: Valid M-Pesa code
  console.log('Test 1: Valid M-Pesa code');
  const validCode = 'TEST12345678';
  const isValid = /^[A-Z0-9]{10,12}$/i.test(validCode);
  console.log(`  Code: ${validCode} - Valid: ${isValid}\n`);
  
  // Test 2: Create test payment
  console.log('Test 2: Creating test payment');
  const { data: payment, error: paymentError } = await supabase
    .from('payments')
    .insert({
      transaction_id: `TEST-${Date.now()}`,
      amount: 5000,
      currency: 'KES',
      payment_method: 'mpesa',
      status: 'pending',
      metadata: { test: true }
    })
    .select()
    .single();
    
  if (paymentError) {
    console.error('  Failed to create payment:', paymentError.message);
  } else {
    console.log(`  ✅ Payment created: ${payment.id}`);
  }
  
  // Test 3: Create verification queue entry
  console.log('\nTest 3: Creating verification queue entry');
  const { data: verification, error: queueError } = await supabase
    .from('verification_queue')
    .insert({
      payment_id: payment?.id,
      mpesa_confirmation_code: validCode,
      sender_phone: '0712345678',
      sender_name: 'Test User',
      status: 'pending'
    })
    .select()
    .single();
    
  if (queueError) {
    console.error('  Failed to create verification:', queueError.message);
  } else {
    console.log(`  ✅ Verification created: ${verification.id}`);
  }
  
  // Test 4: Call reconciliation API
  console.log('\nTest 4: Calling reconciliation API');
  try {
    const response = await fetch('http://localhost:3000/api/reconcile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        confirmationCode: validCode,
        paymentId: payment?.id,
        verificationId: verification?.id
      })
    });
    
    const result = await response.json();
    console.log('  Result:', result);
    
    if (result.status === 'HARDENED') {
      console.log(`  ✅ Verified in ${result.latency.toFixed(2)}ms!`);
    } else {
      console.log(`  ⚠️ Status: ${result.status}`);
    }
  } catch (error) {
    console.error('  API call failed:', error.message);
  }
  
  console.log('\n✅ Vulture-Eye test completed!');
}

// Run the test
testVultureEye().catch(console.error);