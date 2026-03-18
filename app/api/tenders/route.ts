import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  const tenders = [
    {
      id: 1,
      title: 'Supply of Medical Equipment',
      organization: 'Ministry of Health',
      value: 'KES 50M',
      deadline: '2026-04-15',
      category: 'Health',
      match: 92
    },
    {
      id: 2,
      title: 'Road Construction - Phase 3',
      organization: 'KURA',
      value: 'KES 120M',
      deadline: '2026-05-20',
      category: 'Infrastructure',
      match: 78
    },
    {
      id: 3,
      title: 'IT Security Audit',
      organization: 'Central Bank',
      value: 'KES 15M',
      deadline: '2026-04-30',
      category: 'Technology',
      match: 88
    }
  ];

  return NextResponse.json({ tenders });
}
