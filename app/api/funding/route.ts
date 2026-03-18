import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  const funding = [
    {
      id: 1,
      name: 'SME Growth Fund',
      provider: 'KCB Bank',
      amount: 'KES 100K - 5M',
      type: 'Loan',
      interest: '12% p.a.',
      match: 94,
      deadline: '2026-05-30'
    },
    {
      id: 2,
      name: 'Women in Tech Grant',
      provider: 'UN Women',
      amount: 'KES 500K - 2M',
      type: 'Grant',
      interest: '0%',
      match: 67,
      deadline: '2026-04-15'
    },
    {
      id: 3,
      name: 'Youth Enterprise Fund',
      provider: 'Government of Kenya',
      amount: 'KES 50K - 500K',
      type: 'Loan',
      interest: '8% p.a.',
      match: 88,
      deadline: '2026-06-01'
    }
  ];

  return NextResponse.json({ funding });
}
