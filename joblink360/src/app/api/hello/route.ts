// src/app/api/hello/route.ts
export async function GET() {
  return new Response(JSON.stringify({ 
    message: "JobLink 360 API is working!",
    status: "active",
    time: new Date().toISOString()
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}