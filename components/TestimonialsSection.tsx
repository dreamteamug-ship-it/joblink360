'use client';

import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Wanjiku",
    role: "Software Developer",
    location: "Nairobi, Kenya",
    image: "SW",
    quote: "JobLink360 connected me with my dream tech job in just 2 weeks. The AI matching was spot-on!",
    rating: 5,
  },
  {
    id: 2,
    name: "James Okonkwo",
    role: "Project Manager",
    location: "Lagos, Nigeria",
    image: "JO",
    quote: "As an employer, finding qualified candidates used to take months. JobLink360 cut our hiring time by 70%.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amina Hassan",
    role: "Marketing Specialist",
    location: "Dar es Salaam, Tanzania",
    image: "AH",
    quote: "The training resources helped me upskill while job hunting. Landed a role that matched my new skills perfectly!",
    rating: 5,
  },
  {
    id: 4,
    name: "David Mugisha",
    role: "Financial Analyst",
    location: "Kampala, Uganda",
    image: "DM",
    quote: "Finally, a platform that understands the East African job market. Highly recommend to both job seekers and employers.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[activeIndex];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-purple-400 font-medium tracking-wider uppercase text-sm">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            What Our Users Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of professionals who found their perfect match through JobLink360
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          {/* Background decoration */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl"></div>
          
          {/* Card */}
          <div className={`relative glass rounded-2xl p-8 md:p-12 transition-all duration-300 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            {/* Quote icon */}
            <div className="absolute top-6 right-8 text-purple-500/30 text-6xl font-serif">
              &ldquo;
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote text */}
            <blockquote className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8">
              {testimonial.quote}
            </blockquote>

            {/* Author info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                {testimonial.image}
              </div>
              <div>
                <div className="text-white font-semibold text-lg">{testimonial.name}</div>
                <div className="text-gray-400">{testimonial.role}</div>
                <div className="text-purple-400 text-sm">{testimonial.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setActiveIndex(index);
                  setIsAnimating(false);
                }, 300);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-purple-500 w-8'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
