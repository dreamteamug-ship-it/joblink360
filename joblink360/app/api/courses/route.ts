// app/api/courses/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    const courses = [
        {
            id: "1",
            slug: "ai-fundamentals",
            title: "AI Fundamentals for Beginners",
            description: "Learn the basics of Artificial Intelligence",
            level: "beginner",
            duration_hours: 20,
            price: 0
        },
        {
            id: "2",
            slug: "prompt-engineering",
            title: "Prompt Engineering Mastery",
            description: "Master the art of crafting effective AI prompts",
            level: "intermediate",
            duration_hours: 15,
            price: 99
        },
        {
            id: "3",
            slug: "digital-marketing",
            title: "Digital Marketing for African SMEs",
            description: "Grow your business with digital marketing",
            level: "beginner",
            duration_hours: 12,
            price: 0
        }
    ];

    return NextResponse.json({
        success: true,
        count: courses.length,
        courses
    });
}
