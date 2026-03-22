// add-courses.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wqrgdanpdjebrcblayas.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcmdkYW5wZGplYnJjYmxheWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NTA5NjcsImV4cCI6MjA4OTQyNjk2N30.t3VE-NFGhJbLJJRJv0jrAwLJFn6Gm5Qngz328uTM4BM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const sampleCourses = [
    {
        title: "AI Fundamentals for Beginners",
        slug: "ai-fundamentals",
        description: "Learn the basics of Artificial Intelligence, machine learning, and neural networks.",
        long_description: "This comprehensive course introduces you to the world of AI, covering everything from basic concepts to practical applications in business and technology.",
        level: "beginner",
        duration_hours: 20,
        price: 0,
        is_published: true,
        featured: true,
        enrollment_count: 156,
        rating: 4.8
    },
    {
        title: "Prompt Engineering Mastery",
        slug: "prompt-engineering",
        description: "Master the art of crafting effective prompts for AI models like ChatGPT and Claude.",
        long_description: "Learn advanced techniques to get the best results from AI models. Perfect for content creators, developers, and business professionals.",
        level: "intermediate",
        duration_hours: 15,
        price: 99,
        is_published: true,
        featured: true,
        enrollment_count: 89,
        rating: 4.9
    },
    {
        title: "Digital Marketing for African SMEs",
        slug: "digital-marketing-africa",
        description: "Grow your business with social media, SEO, and content marketing tailored for Africa.",
        long_description: "Practical digital marketing strategies designed specifically for African small businesses. Learn from real case studies and success stories.",
        level: "beginner",
        duration_hours: 12,
        price: 0,
        is_published: true,
        featured: false,
        enrollment_count: 342,
        rating: 4.7
    },
    {
        title: "Data Analysis with Python",
        slug: "python-data-analysis",
        description: "Master data analysis using Python, pandas, and visualization libraries.",
        long_description: "Become proficient in data analysis with Python. Learn to clean, analyze, and visualize data for business insights.",
        level: "intermediate",
        duration_hours: 30,
        price: 199,
        is_published: true,
        featured: true,
        enrollment_count: 67,
        rating: 4.8
    },
    {
        title: "Freelancing Success Guide",
        slug: "freelancing-success",
        description: "Build a successful freelancing career, find clients, and deliver excellent work.",
        long_description: "Everything you need to know to start and grow your freelancing business. Learn how to find clients, set rates, and build a portfolio.",
        level: "beginner",
        duration_hours: 10,
        price: 0,
        is_published: true,
        featured: false,
        enrollment_count: 521,
        rating: 4.6
    }
];

async function addCourses() {
    console.log('📚 Adding sample courses to Supabase...\n');
    
    for (const course of sampleCourses) {
        const { data, error } = await supabase
            .from('courses')
            .upsert([course], { onConflict: 'slug' })
            .select();
        
        if (error) {
            console.error(`❌ Error adding ${course.title}:`, error.message);
        } else {
            console.log(`✅ Added: ${course.title}`);
        }
    }
    
    console.log('\n🎉 Sample courses added successfully!');
    console.log('\n📊 Check your LMS: https://deliteproductions.vercel.app/lms');
}

addCourses();
