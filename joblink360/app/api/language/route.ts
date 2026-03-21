export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en';
  const langPath = path.join(process.cwd(), 'lib/i18n', `${lang}.json`);
  
  try {
    const content = fs.readFileSync(langPath, 'utf-8');
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json({ welcome: "Welcome", courses: "Courses", enroll: "Enroll" });
  }
}
