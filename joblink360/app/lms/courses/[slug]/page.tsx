// app/lms/courses/[slug]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Course, Enrollment } from '@/lib/supabase/client';

export default function CoursePlayerPage() {
    const params = useParams();
    const slug = params.slug as string;
    
    const [course, setCourse] = useState<Course | null>(null);
    const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentModule, setCurrentModule] = useState(0);
    const [modules, setModules] = useState([
        { id: 1, title: "Introduction to the Course", duration: "15 min", completed: true },
        { id: 2, title: "Getting Started", duration: "30 min", completed: true },
        { id: 3, title: "Core Concepts", duration: "45 min", completed: false },
        { id: 4, title: "Advanced Topics", duration: "60 min", completed: false },
        { id: 5, title: "Final Project", duration: "90 min", completed: false }
    ]);

    useEffect(() => {
        loadCourseData();
    }, [slug]);

    async function loadCourseData() {
        try {
            // Fetch course by slug
            const { data: courseData, error: courseError } = await supabase
                .from('courses')
                .select('*')
                .eq('slug', slug)
                .single();

            if (courseError) throw courseError;
            setCourse(courseData);

            // Check if user is enrolled
            const { data: session } = await supabase.auth.getSession();
            if (session.session) {
                const { data: enrollmentData, error: enrollmentError } = await supabase
                    .from('enrollments')
                    .select('*')
                    .eq('user_id', session.session.user.id)
                    .eq('course_id', courseData.id)
                    .single();

                if (!enrollmentError && enrollmentData) {
                    setEnrollment(enrollmentData);
                    setProgress(enrollmentData.progress_percent);
                }
            }
        } catch (error) {
            console.error('Error loading course:', error);
        } finally {
            setLoading(false);
        }
    }

    async function enrollInCourse() {
        const { data: session } = await supabase.auth.getSession();
        if (!session.session) {
            alert('Please login to enroll in this course');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('enrollments')
                .insert([
                    {
                        user_id: session.session.user.id,
                        course_id: course?.id,
                        progress_percent: 0,
                        certificate_issued: false
                    }
                ])
                .select()
                .single();

            if (error) throw error;
            setEnrollment(data);
            alert('Successfully enrolled in the course!');
        } catch (error) {
            console.error('Error enrolling:', error);
            alert('Error enrolling in course');
        }
    }

    function markModuleComplete(moduleId: number) {
        const updatedModules = modules.map(module => 
            module.id === moduleId ? { ...module, completed: true } : module
        );
        setModules(updatedModules);
        
        // Calculate new progress
        const completedCount = updatedModules.filter(m => m.completed).length;
        const newProgress = Math.round((completedCount / modules.length) * 100);
        setProgress(newProgress);

        // Update enrollment progress in database
        if (enrollment) {
            supabase
                .from('enrollments')
                .update({ progress_percent: newProgress })
                .eq('id', enrollment.id)
                .then(({ error }) => {
                    if (error) console.error('Error updating progress:', error);
                });
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading course...</p>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h1>
                    <p className="text-gray-600">The course you're looking for doesn't exist.</p>
                    <a href="/lms" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
                        ← Back to Courses
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Course Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                            <p className="text-blue-100">{course.description}</p>
                            <div className="flex items-center gap-4 mt-4">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                    Level: {course.level}
                                </span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                    Duration: {course.duration_hours} hours
                                </span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                    {course.enrollment_count} students enrolled
                                </span>
                            </div>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
                            <div className="text-center">
                                <div className="text-2xl font-bold mb-2">{progress}%</div>
                                <div className="text-sm text-blue-100">Course Progress</div>
                                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                                    <div 
                                        className="bg-green-400 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Course Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Content</h2>
                            
                            <div className="space-y-3">
                                {modules.map((module) => (
                                    <div 
                                        key={module.id}
                                        className={`p-4 rounded-lg border ${module.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'} hover:bg-gray-50 cursor-pointer transition-all ${module.id === currentModule ? 'ring-2 ring-blue-500' : ''}`}
                                        onClick={() => setCurrentModule(module.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${module.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                                    {module.completed ? '✓' : module.id}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800">{module.title}</h3>
                                                    <p className="text-sm text-gray-500">{module.duration}</p>
                                                </div>
                                            </div>
                                            {module.completed ? (
                                                <span className="text-green-600 text-sm font-medium">Completed</span>
                                            ) : (
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        markModuleComplete(module.id);
                                                    }}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                                                >
                                                    Mark Complete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Video Player Area */}
                        <div className="bg-black rounded-xl overflow-hidden shadow-lg mb-6">
                            <div className="aspect-video bg-gray-900 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="text-6xl mb-4">▶️</div>
                                    <p className="text-xl">Course Video Player</p>
                                    <p className="text-gray-400 mt-2">Currently playing: Module {currentModule}</p>
                                </div>
                            </div>
                        </div>

                        {/* Course Description */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Course</h2>
                            <div className="prose max-w-none">
                                <p className="text-gray-600">{course.description}</p>
                                <p className="text-gray-600 mt-4">
                                    This course is designed to take you from beginner to advanced level. 
                                    You'll learn practical skills that you can apply immediately in your work.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Enrollment Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            {enrollment ? (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Your Enrollment</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Enrolled on:</span>
                                            <span className="font-medium">{new Date(enrollment.enrolled_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Progress:</span>
                                            <span className="font-medium">{progress}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Certificate:</span>
                                            <span className={`font-medium ${enrollment.certificate_issued ? 'text-green-600' : 'text-yellow-600'}`}>
                                                {enrollment.certificate_issued ? 'Issued' : 'Not yet'}
                                            </span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            if (progress === 100 && !enrollment.certificate_issued) {
                                                alert('Congratulations! Certificate issued!');
                                                // Update certificate status in database
                                                supabase
                                                    .from('enrollments')
                                                    .update({ certificate_issued: true })
                                                    .eq('id', enrollment.id);
                                            } else if (progress < 100) {
                                                alert('Complete all modules to get your certificate!');
                                            }
                                        }}
                                        className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 font-medium"
                                    >
                                        {progress === 100 ? 'Download Certificate' : 'Continue Learning'}
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Enroll in this Course</h3>
                                    <p className="text-gray-600 mb-6">Get lifetime access to all course materials, exercises, and certificate.</p>
                                    <div className="text-3xl font-bold text-gray-800 mb-2">
                                        ${course.price}
                                        <span className="text-sm text-gray-500 font-normal"> / one-time payment</span>
                                    </div>
                                    <button 
                                        onClick={enrollInCourse}
                                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 font-medium"
                                    >
                                        Enroll Now
                                    </button>
                                    <p className="text-sm text-gray-500 mt-4 text-center">30-day money-back guarantee</p>
                                </div>
                            )}
                        </div>

                        {/* Course Stats */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Course Statistics</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-gray-600">Average Rating</span>
                                        <span className="font-medium">{course.rating}/5</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(course.rating / 5) * 100}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-gray-600">Students Enrolled</span>
                                        <span className="font-medium">{course.enrollment_count}</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-gray-600">Course Level</span>
                                        <span className="font-medium">{course.level}</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-gray-600">Duration</span>
                                        <span className="font-medium">{course.duration_hours} hours</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Instructor */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Instructor</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                    JD
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">John Doe</h4>
                                    <p className="text-sm text-gray-600">Senior Developer & Instructor</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">
                                With over 10 years of experience in software development and teaching, 
                                John has helped thousands of students launch their tech careers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}