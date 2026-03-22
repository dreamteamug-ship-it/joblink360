// app/api/jobs/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    const jobs = [
        { 
            id: 1, 
            title: "Frontend Developer", 
            company: "Tech Corp", 
            location: "Nairobi, Kenya", 
            type: "full-time",
            description: "Join our team building modern web applications with React and Next.js",
            url: "https://example.com/job/1"
        },
        { 
            id: 2, 
            title: "Data Analyst", 
            company: "Data Solutions", 
            location: "Remote", 
            type: "remote",
            description: "Analyze data and provide insights for African businesses",
            url: "https://example.com/job/2"
        },
        { 
            id: 3, 
            title: "AI Engineer", 
            company: "AI Africa", 
            location: "Nairobi, Kenya", 
            type: "full-time",
            description: "Build AI solutions for healthcare and agriculture",
            url: "https://example.com/job/3"
        }
    ];
    return NextResponse.json({ success: true, jobs });
}
