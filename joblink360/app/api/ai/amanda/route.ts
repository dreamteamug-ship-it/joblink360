// app/api/ai/amanda/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'Amanda',
    role: 'Sovereign Intelligence',
    status: 'ACTIVE',
    mission: 'Transform learners into earners in 90 days',
    paybill: '400200',
    account: '4045731',
    bank: 'NCBA 8515130017'
  });
}

export async function POST(request: Request) {
  const { message } = await request.json();
  const msg = message?.toLowerCase() || '';
  
  let response = '';
  
  if (msg.includes('earn') || msg.includes('income') || msg.includes('money')) {
    response = `🎯 THE 3-MONTH INCOME TEST

Week 1: Complete AI Fundamentals (free)
Week 2-3: Master one high-income skill
Week 4-8: Apply to 50+ jobs daily
Week 9-12: Scale to $1,000/month

Your first action TODAY:
→ Pay KES 5,000 via Paybill 400200, Account 4045731
→ Get instant access to all courses
→ I'll create your personalized 90-day plan

The market rewards action, not intention. Start now.`;
  } 
  else if (msg.includes('pay') || msg.includes('mpesa') || msg.includes('verify')) {
    response = `💰 M-Pesa PAYMENT DETAILS

Paybill: 400200
Account: 4045731
Amount: KES 5,000

After payment:
1. Enter your confirmation code at /pay
2. Vulture-Eye verifies in <20ms
3. Your courses unlock instantly
4. I'll interview you for your 90-day plan

What's your confirmation code? I'll verify it now.`;
  }
  else if (msg.includes('funding') || msg.includes('grant')) {
    response = `🌍 ACTIVE FUNDING OPPORTUNITIES ACROSS AFRICA

🇰🇪 Kenya: World Bank Digital Grant ($500,000)
🇳🇬 Nigeria: AfDB Digital Skills Initiative ($300,000)
🇿🇦 South Africa: Mastercard Foundation ($1.5M)
🇬🇭 Ghana: EU Infrastructure Grant ($3,000,000)

Your success probability: 85% for tech opportunities

Visit /funding/matchmaking to apply. Share your industry for personalized matching.`;
  }
  else {
    response = `🧠 AMANDA - Your Ruthless Mentor

I can help you with:
• "earn" → 90-day income plan
• "pay" → M-Pesa payment details (Paybill 400200)
• "funding" → Active grants across 26 African countries
• "commission" → Your earning structure

What would you like to know?

Remember: I'm here to transform learners into earners. Let's go! 💪`;
  }
  
  return NextResponse.json({ 
    response,
    timestamp: new Date().toISOString(),
    agent: 'Amanda'
  });
}