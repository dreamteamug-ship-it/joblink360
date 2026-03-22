// app/api/courses/route.ts
// Courses API

import { NextResponse } from "next/server";

export async function GET() {
    const courses = [
        {
            id: "1",
            title: "AI Fundamentals for Beginners",
            description: "Learn the basics of Artificial Intelligence",
            level: "beginner",
            duration_hours: 20,
            price: 0,
            is_published: true
        },
        {
            id: "2",
            title: "Prompt Engineering Mastery",
            description: "Master the art of crafting effective AI prompts",
            level: "intermediate",
            duration_hours: 15,
            price: 99,
            is_published: true
        },
        {
            id: "3",
            title: "Digital Marketing for African SMEs",
            description: "Grow your business with digital marketing",
            level: "beginner",
            duration_hours: 12,
            price: 0,
            is_published: true
        },
        {
            id: "4",
            title: "Data Analysis with Python",
            description: "Learn data analysis using Python",
            level: "intermediate",
            duration_hours: 30,
            price: 199,
            is_published: true
        },
        {
            id: "5",
            title: "Freelancing Success Guide",
            description: "Build a successful freelancing career",
            level: "beginner",
            duration_hours: 10,
            price: 0,
            is_published: true
        }
    ];

    return NextResponse.json({
        success: true,
        count: courses.length,
        courses
    });
}
