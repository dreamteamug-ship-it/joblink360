// app/api/training/route.ts
import { NextResponse } from 'next/server';

const courses = [
  {
    id: 'course_1',
    title: 'AI Data Labeling Professional',
    description: 'Master image annotation, NLP tagging, and dataset preparation',
    category: 'AI',
    level: 'beginner',
    duration: 40,
    languages: ['English', 'Swahili'],
    price: 0,
    enrolled: 12450,
    rating: 4.7,
    modules: [
      'Introduction to Data Labeling',
      'Image Annotation Techniques',
      'Text Classification',
      'Quality Assurance',
      'Project Work'
    ]
  },
  {
    id: 'course_2',
    title: 'Business Japanese for AI',
    description: 'Learn technical Japanese for AI translation jobs',
    category: 'Language',
    level: 'intermediate',
    duration: 60,
    languages: ['English', 'Japanese'],
    price: 10,
    enrolled: 3200,
    rating: 4.9,
    modules: [
      'Japanese Business Etiquette',
      'Technical Vocabulary',
      'Translation Practice',
      'Client Communication',
      'Freelance Setup'
    ]
  },
  {
    id: 'course_3',
    title: 'Prompt Engineering Mastery',
    description: 'Learn to craft effective prompts for AI systems',
    category: 'AI',
    level: 'intermediate',
    duration: 30,
    languages: ['English'],
    price: 15,
    enrolled: 8900,
    rating: 4.8,
    modules: [
      'Understanding LLMs',
      'Prompt Patterns',
      'Advanced Techniques',
      'Business Applications',
      'Ethics & Safety'
    ]
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || '';
    const level = searchParams.get('level') || '';
    
    let filtered = courses;
    
    if (category) {
      filtered = filtered.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }
    
    if (level) {
      filtered = filtered.filter(c => c.level === level);
    }
    
    return NextResponse.json({
      success: true,
      total: filtered.length,
      courses: filtered,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
