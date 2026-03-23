// app/api/shop/cart/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Get cart from cookies/localStorage
  const cart = request.headers.get('cookie')?.split(';')
    .find(c => c.trim().startsWith('cart='))
    ?.split('=')[1];
  
  return NextResponse.json({ cart: cart ? JSON.parse(decodeURIComponent(cart)) : [] });
}

export async function POST(request: Request) {
  const { productId, quantity, variantId } = await request.json();
  
  // Create response with cart cookie
  const response = NextResponse.json({ success: true });
  
  // Set cart cookie (in production, use proper session management)
  response.headers.set('Set-Cookie', `cart=${encodeURIComponent(JSON.stringify({ productId, quantity, variantId }))}; Path=/; HttpOnly`);
  
  return response;
}
