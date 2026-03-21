// src/app/api/ai/amanda/grant-access/route.ts
// Amanda AI - Grant Course Access After Payment

import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { userId, paymentId, amount, timestamp } = await request.json();
    
    if (!userId || !paymentId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    console.log(`[Amanda] Granting access to user: ${userId} for payment: ${paymentId}`);
    
    const supabase = createRouteHandlerClient({ cookies });
    
    // Step 1: Get user's enrolled courses
    const { data: courses, error: coursesError } = await supabase
      .from('user_courses')
      .select('course_id')
      .eq('user_id', userId)
      .eq('status', 'pending');
      
    if (coursesError) throw coursesError;
    
    // Step 2: Activate all pending courses
    if (courses && courses.length > 0) {
      const { error: updateError } = await supabase
        .from('user_courses')
        .update({
          status: 'active',
          activated_at: new Date().toISOString(),
          payment_id: paymentId
        })
        .eq('user_id', userId)
        .eq('status', 'pending');
        
      if (updateError) throw updateError;
      
      console.log(`[Amanda] Activated ${courses.length} courses for user: ${userId}`);
    }
    
    // Step 3: Create access log table if it doesn't exist
    await supabase.query(`
      CREATE TABLE IF NOT EXISTS access_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES auth.users(id),
        payment_id UUID REFERENCES payments(id),
        action VARCHAR(100),
        metadata JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    
    // Step 4: Log the access grant
    await supabase
      .from('access_logs')
      .insert({
        user_id: userId,
        payment_id: paymentId,
        action: 'course_access_granted',
        metadata: { amount, timestamp }
      });
    
    return NextResponse.json({
      success: true,
      message: 'Course access granted',
      coursesActivated: courses?.length || 0,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('[Amanda] Grant access error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}