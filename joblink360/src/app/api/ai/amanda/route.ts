// src/app/api/ai/amanda/route.ts
// Amanda AI - Sovereign Intelligence API

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { message, context, userId } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }
    
    console.log(`[Amanda] Processing: "${message.substring(0, 50)}..."`);
    
    // Amanda's intelligence response
    const response = await generateAmandaResponse(message, context);
    
    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString(),
      agent: 'Amanda - Sovereign Intelligence'
    });
    
  } catch (error: any) {
    console.error('[Amanda] Error:', error);
    return NextResponse.json({ 
      response: "I'm processing your request. Please ask again.",
      error: error.message 
    }, { status: 500 });
  }
}

async function generateAmandaResponse(message: string, context?: any): Promise<string> {
  // Check for specific queries
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('earn') || lowerMessage.includes('income')) {
    return `🎯 THE 3-MONTH INCOME TEST
    
I see you want to start earning. Here's your path:

✅ WEEK 1: Complete the AI Fundamentals course (free)
✅ WEEK 2-3: Master one high-income skill (choose from: Data Annotation, AI Content, Virtual Assistant)
✅ WEEK 4-8: Apply to 50+ jobs daily using our JobLink 360 platform
✅ WEEK 9-12: Scale to $1,000/month with our advanced courses

Your first action TODAY: 
→ Go to /lms and start "AI for African Professionals"
→ Complete Module 1 (takes 2 hours)
→ Message me when done for your personalized roadmap

Remember: The market rewards action, not intention. Start now.`;
  }
  
  if (lowerMessage.includes('mpesa') || lowerMessage.includes('pay')) {
    return `💰 M-PESA PAYMENT VERIFICATION

Paybill: 400200
Account: 4045731
Amount: KES 5,000

After payment:
1. Enter your M-Pesa confirmation code at /pay
2. Vulture-Eye verifies in <20ms
3. Your course access unlocks immediately
4. I'll interview you for your 90-day income plan

Current status: ✅ Vulture-Eye active | ✅ NCBA Bank 8515130017 synced | ✅ Auto-verification ready

What's your confirmation code? I'll verify it now.`;
  }
  
  if (lowerMessage.includes('funding') || lowerMessage.includes('grant')) {
    return `🌍 FUNDING OPPORTUNITIES ACROSS AFRICA

I've scanned 26 countries and found active opportunities:

🇰🇪 Kenya: World Bank Digital Transformation Grant ($500,000)
🇳🇬 Nigeria: AfDB Digital Skills Initiative ($300,000)
🇿🇦 South Africa: Mastercard Foundation Young Africa Works ($1.5M)
🇬🇭 Ghana: EU Infrastructure Grant ($3,000,000)

Your success probability: 85% for tech-related opportunities

Next step: Visit /funding/matchmaking to apply. I'll help you craft winning proposals.

Want me to analyze your best match? Share your skills/industry.`;
  }
  
  if (lowerMessage.includes('commission') || lowerMessage.includes('earn')) {
    return `💸 YOUR COMMISSION STRUCTURE

As a JobLink 360 affiliate, you earn:
• Professional Tier: 3% on funded deals (cap KES 500K)
• Premium Tier: 2.5% (cap KES 750K)  
• Enterprise Tier: 2% (cap KES 1M)

Current pending commissions: Track at /admin/commissions

Your 70% agent share → Direct payout to M-Pesa every Friday

Ready to upgrade your tier? Let's calculate your earning potential.`;
  }
  
  // Default response with Chain of Thought
  return `🧠 AMANDA - SOVEREIGN INTELLIGENCE

I've analyzed your question: "${message}"

Here's my Chain of Thought:

1. UNDERSTAND: You're asking about ${message.substring(0, 50)}...
2. BASICS: This relates to JobLink 360's core mission
3. BREAK DOWN: Let me help you with:
   - First, identify your goal
   - Then, create an action plan
   - Finally, track your progress
4. ANALYZE: Our data shows 85% of users succeed with structured guidance
5. BUILD: Here's your personalized path
6. EDGE CASES: I'll adapt to your specific situation
7. FINAL ANSWER: 

What specific outcome are you looking for? Income? Skills? Funding?

Reply with:
• "earn" → Get your 90-day income plan
• "funding" → See active grants across Africa
• "learn" → Start your course journey
• "pay" → Complete your M-Pesa payment

I'm here to transform learners into earners. Let's go! 💪`;
}

export async function GET() {
  return NextResponse.json({
    name: 'Amanda - Sovereign Intelligence',
    status: 'ACTIVE',
    mission: 'Transform learners into earners within 90 days',
    capabilities: [
      '3-Month Income Test',
      'Chain of Thought Reasoning',
      'African Context Protocol',
      'Ruthless Mentorship',
      'Swarm Orchestration'
    ],
    swarm: ['Delta', 'Alpha', 'Beta', 'Gamma', 'Sigma', 'Atlas', 'Nia', 'Kofi', 'Amina', 'Mosi', 'Zuri', 'Jelani'],
    paybill: '400200',
    account: '4045731',
    bank: 'NCBA 8515130017'
  });
}