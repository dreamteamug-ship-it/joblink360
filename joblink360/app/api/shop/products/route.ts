// app/api/shop/products/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  const { data: products } = await supabase
    .from('shop_products')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  
  return NextResponse.json({ 
    products: products || [
      { id: 1, name: "AI Prompt Engineering Masterclass", description: "Learn advanced prompting techniques", price: 1500, icon: "🤖" },
      { id: 2, name: "Full Stack Development Bootcamp", description: "Become a professional developer", price: 2500, icon: "💻" },
      { id: 3, name: "Data Science & Analytics", description: "Master data-driven decision making", price: 2000, icon: "📊" },
      { id: 4, name: "Digital Marketing Pro", description: "Grow your online presence", price: 1800, icon: "📈" }
    ]
  });
}

export async function POST(request: Request) {
  const { name, description, price, category } = await request.json();
  
  const { data, error } = await supabase
    .from('shop_products')
    .insert([{ name, description, price, category, status: 'active' }])
    .select();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, product: data[0] });
}