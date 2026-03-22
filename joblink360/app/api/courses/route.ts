// app/api/courses/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    const courses = [
        {
            id: "1",
            title: "AI Fundamentals for Beginners",
            description: "Learn the basics of Artificial Intelligence, including machine learning, neural networks, and real-world applications across Africa.",
            level: "beginner",
            duration_hours: 20,
            price: 0,
            modules: 5,
            students: 1243
        },
        {
            id: "2",
            title: "Prompt Engineering Mastery",
            description: "Master the art of crafting effective prompts for AI models like ChatGPT, Claude, and DeepSeek to get the best results.",
            level: "intermediate",
            duration_hours: 15,
            price: 99,
            modules: 4,
            students: 856
        },
        {
            id: "3",
            title: "Digital Marketing for African SMEs",
            description: "Learn how to grow your business using social media, SEO, and content marketing strategies tailored for African markets.",
            level: "beginner",
            duration_hours: 12,
            price: 0,
            modules: 6,
            students: 2104
        },
        {
            id: "4",
            title: "Data Analysis with Python",
            description: "Master data analysis using Python, pandas, numpy, and visualization libraries for real-world business problems.",
            level: "intermediate",
            duration_hours: 30,
            price: 199,
            modules: 8,
            students: 567
        },
        {
            id: "5",
            title: "Freelancing Success Guide",
            description: "Build a successful freelancing career, find clients, set rates, and deliver excellent work that gets you repeat business.",
            level: "beginner",
            duration_hours: 10,
            price: 0,
            modules: 4,
            students: 3421
        }
    ];

    return NextResponse.json({
        success: true,
        count: courses.length,
        courses
    });
}
