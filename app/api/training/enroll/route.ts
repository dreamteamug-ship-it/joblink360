// app/api/training/enroll/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const enrollment = await request.json();
    
    if (!enrollment.courseId || !enrollment.userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Mock course data
    const courses = {
      course_1: { title: 'AI Data Labeling Professional', price: 0 },
      course_2: { title: 'Business Japanese for AI', price: 10 },
      course_3: { title: 'Prompt Engineering Mastery', price: 15 }
    };
    
    const course = courses[enrollment.courseId as keyof typeof courses];
    
    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Generate enrollment record
    const enrollmentId = `ENR${Date.now()}`;
    
    return NextResponse.json({
      success: true,
      enrollmentId,
      courseId: enrollment.courseId,
      courseTitle: course.title,
      access: {
        dashboard: `/training/${enrollment.courseId}/dashboard`,
        materials: `/training/${enrollment.courseId}/materials`,
        assignments: `/training/${enrollment.courseId}/assignments`
      },
      progress: 0,
      startedAt: new Date().toISOString(),
      message: course.price === 0 
        ? 'Enrollment successful! Start learning now.'
        : 'Enrollment pending payment. Please complete payment to access course.'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to enroll' },
      { status: 500 }
    );
  }
}
