// app/api/test/gemini/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        success: false, 
        error: 'GEMINI_API_KEY is not set in environment variables',
        solution: 'Add GEMINI_API_KEY to Vercel environment variables'
      }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const testPrompt = 'Say hello in Swahili and tell me about JobLink 360 in 2 sentences.';
    const result = await model.generateContent(testPrompt);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Gemini API is working!',
      response: text,
      apiKeyPresent: true,
      model: 'gemini-1.5-flash'
    });
  } catch (error) {
    console.error('Gemini test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      solution: 'Check your GEMINI_API_KEY and ensure Generative Language API is enabled'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY missing' }, { status: 500 });
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ success: true, response: text });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}