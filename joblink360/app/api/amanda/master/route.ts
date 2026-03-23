// app/api/amanda/master/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: Request) {
    try {
        const { action, data, agent } = await request.json();
        
        switch(agent) {
            case 'Amanda-Finance':
                return await processFinanceAction(action, data);
            case 'Amanda-Lori':
                return await processLoriAction(action, data);
            case 'Amanda-Recruit':
                return await processRecruitmentAction(action, data);
            default:
                return await processGeneralAction(action, data, agent);
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

async function processFinanceAction(action: string, data: any) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer sk-49cf3d69f7e04c0cb5de5d6131b8e263',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{ role: 'system', content: 'You are Amanda-Finance.' }, { role: 'user', content: JSON.stringify(data) }]
        })
    });
    const result = await response.json();
    return NextResponse.json(result);
}

async function processLoriAction(action: string, data: any) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer sk-49cf3d69f7e04c0cb5de5d6131b8e263',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{ role: 'system', content: 'You are Amanda-Lori.' }, { role: 'user', content: JSON.stringify(data) }]
        })
    });
    const result = await response.json();
    return NextResponse.json(result);
}

async function processRecruitmentAction(action: string, data: any) {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'claude-3-sonnet',
            messages: [{ role: 'system', content: 'You are Amanda-Recruit.' }, { role: 'user', content: JSON.stringify(data) }]
        })
    });
    const result = await response.json();
    return NextResponse.json(result);
}

async function processGeneralAction(action: string, data: any, agent: string) {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': 'AIzaSyB9vgPx2y3z4A5B6C7D8E9F0G1H2I3J4K5L6M7N8'
        },
        body: JSON.stringify({ contents: [{ parts: [{ text: `You are ${agent}. Data: ${JSON.stringify(data)}` }] }] })
    });
    const result = await response.json();
    return NextResponse.json(result);
}
