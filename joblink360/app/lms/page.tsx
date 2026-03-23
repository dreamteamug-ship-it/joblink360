// app/lms/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, Clock, Users, Filter, Search } from 'lucide-react';
import { COURSES } from '@/lib/data/courses/courses-data';

export default function LMSDashboard() {
  const [courses, setCourses] = useState(COURSES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  
  const categories = ['all', ...new Set(COURSES.map(c => c.category))];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];
  
  const filteredCourses = courses.filter(course => {
    if (filterCategory !== 'all' && course.category !== filterCategory) return false;
    if (filterLevel !== 'all' && course.level !== filterLevel) return false;
    if (filterPrice === 'free' && course.price > 0) return false;
    if (filterPrice === 'paid' && course.price === 0) return false;
    if (searchTerm && !course.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
  
  const featuredCourses = courses.filter(c => c.featured).slice(0, 3);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">DreamTeQ Academy</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Master AI, Digital Skills, and Business with courses designed for African professionals
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>
            
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {levels.map(level => (
                <option key={level} value={level}>{level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}</option>
              ))}
            </select>
            
            <select
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Courses</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>
        
        {/* Featured Courses */}
        {featuredCourses.length > 0 && searchTerm === '' && filterCategory === 'all' && filterLevel === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCourses.map(course => (
                <Link key={course.id} href={`/lms/courses/${course.slug}`}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl">
                      📚
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{course.category}</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{course.level}</span>
                        {course.featured && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Featured</span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Star className="text-yellow-500" size={16} />
                          <span>{course.rating}</span>
                          <span className="text-gray-300">•</span>
                          <Users size={16} />
                          <span>{course.students}</span>
                          <span className="text-gray-300">•</span>
                          <Clock size={16} />
                          <span>{course.duration_hours}h</span>
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          {course.price === 0 ? 'Free' : `$${course.price}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* All Courses */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Courses</h2>
          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-600">No courses found. Try different filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <Link key={course.id} href={`/lms/courses/${course.slug}`}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl">
                      📘
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{course.category}</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{course.level}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Star className="text-yellow-500" size={14} />
                          <span>{course.rating}</span>
                          <span className="text-gray-300">•</span>
                          <Users size={14} />
                          <span>{course.students}</span>
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          {course.price === 0 ? 'Free' : `$${course.price}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
