// app/api/shop/cart/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: Request) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ items: [] });
  
  const { data: cart } = await supabase
    .from('shop_cart')
    .select('*, products(*)')
    .eq('user_id', user.id)
    .eq('status', 'active');
  
  const total = cart?.reduce((sum, item) => sum + (item.products?.price * item.quantity), 0) || 0;
  
  return NextResponse.json({ items: cart || [], total });
}

export async function POST(request: Request) {
  const { productId, quantity } = await request.json();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { data: existing } = await supabase
    .from('shop_cart')
    .select('*')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .eq('status', 'active')
    .single();
  
  if (existing) {
    const { error } = await supabase
      .from('shop_cart')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { error } = await supabase
      .from('shop_cart')
      .insert([{ user_id: user.id, product_id: productId, quantity }]);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true });
}