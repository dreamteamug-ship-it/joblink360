import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { method, amount, currency, phone, userId } = body

    if (!method || !amount || !currency) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (currency === 'KES' && amount < 100) {
      return NextResponse.json({ error: 'Minimum KES 100' }, { status: 400 })
    }

    if (currency === 'USD' && amount < 1) {
      return NextResponse.json({ error: 'Minimum ' }, { status: 400 })
    }

    // Simulate payment processing
    const transaction = {
      id: 'txn_' + Date.now(),
      userId: userId || 'anonymous',
      method,
      amount,
      currency,
      status: 'completed',
      createdAt: new Date().toISOString(),
    }

    // CSR calculation (10%)
    const csrAmount = amount * 0.1

    return NextResponse.json({
      success: true,
      transaction,
      csr: {
        amount: csrAmount,
        allocation: {
          trainees: csrAmount * 0.5,
          infrastructure: csrAmount * 0.4,
          community: csrAmount * 0.1
        }
      },
      message: 'Payment successful'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
