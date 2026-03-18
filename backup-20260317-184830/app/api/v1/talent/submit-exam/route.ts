// app/api/v1/talent/submit-exam/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { studentId, module, answers } = await req.json();
    
    const score = Math.floor(Math.random() * 30) + 70; // Simulated score
    const passed = score >= 85;

    const result = {
      success: true,
      examId: `EXM-${Date.now()}`,
      studentId,
      module,
      score,
      passed,
      certificate: passed ? `CERT-${Date.now()}` : null,
      message: passed 
        ? '🎉 Congratulations! You are now a Sovereign AI Strategist.' 
        : `📚 Score: ${score}% - Keep studying!`
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Exam submission failed' }, { status: 500 });
  }
}