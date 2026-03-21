export const dynamic = 'force-dynamic'

// app/api/funding/response/route.ts
// Funding Response API Route

import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ResponseHandler from '@/lib/documents/response/response-handler';

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { responseText, documentId } = body;

    if (!responseText && !documentId) {
      return NextResponse.json({ error: 'Response text or document ID required' }, { status: 400 });
    }

    const handler = new ResponseHandler();

    if (responseText) {
      const result = await handler.processResponse(responseText);
      return NextResponse.json({ success: true, data: result });
    } else if (documentId) {
      const result = await handler.getResponse(documentId);
      return NextResponse.json({ success: true, data: result });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

  } catch (error: any) {
    console.error('Funding response error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { documentId, updates } = await request.json();

    if (!documentId || !updates) {
      return NextResponse.json({ error: 'Document ID and updates required' }, { status: 400 });
    }

    const handler = new ResponseHandler();
    const result = await handler.updateResponse(documentId, updates);

    return NextResponse.json({ success: true, data: result });

  } catch (error: any) {
    console.error('Funding response update error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
