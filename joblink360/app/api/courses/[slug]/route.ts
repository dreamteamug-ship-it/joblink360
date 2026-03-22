// app/api/courses/[slug]/route.ts
import { NextResponse } from "next/server";

const courses: Record<string, any> = {
    "ai-fundamentals": {
        id: "1",
        slug: "ai-fundamentals",
        title: "AI Fundamentals for Beginners",
        description: "Learn the basics of Artificial Intelligence, including machine learning, neural networks, and real-world applications.",
        level: "beginner",
        duration_hours: 20,
        price: 0
    },
    "prompt-engineering": {
        id: "2",
        slug: "prompt-engineering",
        title: "Prompt Engineering Mastery",
        description: "Master the art of crafting effective prompts for AI models like ChatGPT, Claude, and DeepSeek.",
        level: "intermediate",
        duration_hours: 15,
        price: 99
    },
    "digital-marketing": {
        id: "3",
        slug: "digital-marketing",
        title: "Digital Marketing for African SMEs",
        description: "Learn how to grow your business using social media, SEO, and content marketing strategies tailored for Africa.",
        level: "beginner",
        duration_hours: 12,
        price: 0
    }
};

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const course = courses[params.slug];
    
    if (course) {
        return NextResponse.json({ success: true, course });
    }
    
    return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
    );
}