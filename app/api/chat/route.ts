import { NextRequest, NextResponse } from 'next/server'

const getAmandaResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('job') || lowerMessage.includes('work') || lowerMessage.includes('opportunity')) {
    return "I've scanned our active pipelines and found several matches. We have 87+ active job feeds including AI Data Labeling (Tokyo), Swahili NLP datasets, and remote Python roles. Would you like me to show top matches?"
  }

  if (lowerMessage.includes('training') || lowerMessage.includes('course') || lowerMessage.includes('learn')) {
    return "Joblink Academy offers 24 courses including AI Data Labeling, Python, Swahili NLP, and Remote Work skills. I recommend starting with 'AI Data Labeling Fundamentals' — it's the fastest path to earning. Shall I enroll you?"
  }

  if (lowerMessage.includes('payment') || lowerMessage.includes('wallet') || lowerMessage.includes('mpesa') || lowerMessage.includes('money')) {
    return "Your wallet supports M-Pesa (KES) and Stripe (USD). Click 'Fund Wallet' in dashboard. Minimum is KES 100 or . 10% automatically goes to community CSR fund."
  }

  if (lowerMessage.includes('register') || lowerMessage.includes('sign up') || lowerMessage.includes('account')) {
    return "Registration is simple! Click 'Get Started' — 3 steps: 1) Personal details, 2) Select program and role, 3) Confirm. You'll get instant access to 5 core apps."
  }

  if (lowerMessage.includes('csr') || lowerMessage.includes('community')) {
    return "Our CSR fund follows transparent 50/40/10: 50% to trainees, 40% to infrastructure, 10% to community projects. Every transaction is logged and traceable."
  }

  if (lowerMessage.includes('legal') || lowerMessage.includes('contract') || lowerMessage.includes('sign')) {
    return "Legal Lite handles e-signatures and contracts compliant with Kenya Law. Sign freelancer agreements and training certificates directly through the platform."
  }

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm Amanda AI, powered by Titanium ERP. I can help with jobs, training, payments, or platform questions. What would you like to do?"
  }

  return "I can help with jobs, training, payments, legal documents, or CSR information. What specifically would you like to know?"
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
    const reply = getAmandaResponse(message)

    return NextResponse.json({
      reply,
      timestamp: new Date().toISOString(),
      agent: 'Amanda AI',
      version: '2.1.0'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
