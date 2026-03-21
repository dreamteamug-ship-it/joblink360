// app/api/revenue/tracking/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  // Get today's revenue
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const { data: todaySales } = await supabase
    .from('payments')
    .select('amount')
    .gte('created_at', today.toISOString())
    .eq('status', 'completed');
  
  const dailyRevenue = todaySales?.reduce((sum, p) => sum + p.amount, 0) || 0;
  
  // Weekly revenue
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const { data: weekSales } = await supabase
    .from('payments')
    .select('amount')
    .gte('created_at', weekAgo.toISOString())
    .eq('status', 'completed');
  const weeklyRevenue = weekSales?.reduce((sum, p) => sum + p.amount, 0) || 0;
  
  // Monthly revenue
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  const { data: monthSales } = await supabase
    .from('payments')
    .select('amount')
    .gte('created_at', monthAgo.toISOString())
    .eq('status', 'completed');
  const monthlyRevenue = monthSales?.reduce((sum, p) => sum + p.amount, 0) || 0;
  
  return NextResponse.json({
    daily: dailyRevenue,
    weekly: weeklyRevenue,
    monthly: monthlyRevenue,
    target: 10000,
    conversionRate: 3.2,
    timestamp: new Date().toISOString()
  });
}