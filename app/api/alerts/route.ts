import { NextResponse } from 'next/server';

export async function GET() {
  const alerts = [
    {
      id: 'alert_1',
      type: 'job_match',
      title: 'New Job Match: Senior Developer',
      description: 'A new position matching your profile has been posted',
      priority: 'high',
      timestamp: new Date().toISOString(),
      read: false,
      action_url: '/jobs/123'
    },
    {
      id: 'alert_2',
      type: 'tender',
      title: 'Tender Deadline Approaching',
      description: 'Medical Equipment tender closes in 3 days',
      priority: 'medium',
      timestamp: new Date().toISOString(),
      read: false,
      action_url: '/tenders/456'
    },
    {
      id: 'alert_3',
      type: 'funding',
      title: 'New Grant Opportunity',
      description: 'Women in Tech grant applications now open',
      priority: 'low',
      timestamp: new Date().toISOString(),
      read: true,
      action_url: '/funding/789'
    }
  ];

  return NextResponse.json({
    success: true,
    alerts: alerts,
    unread_count: alerts.filter(a => !a.read).length
  });
}

export async function POST(request: Request) {
  try {
    const { alertId, action } = await request.json();
    
    // Handle alert actions (mark read, dismiss, etc.)
    return NextResponse.json({
      success: true,
      message: `Alert ${action} successful`,
      alertId: alertId
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process alert' },
      { status: 500 }
    );
  }
}
