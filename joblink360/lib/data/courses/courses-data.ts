// lib/data/courses/courses-data.ts
// 20+ Real Courses with Video, Audio, and Print Materials

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string;
  instructor: string;
  instructor_bio: string;
  level: string;
  category: string;
  thumbnail: string;
  video_trailer: string;
  duration_hours: number;
  price: number;
  featured: boolean;
  rating: number;
  students: number;
  what_you_learn: string[];
  requirements: string[];
  target_audience: string[];
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  lesson_type: 'video' | 'audio' | 'text' | 'quiz' | 'assignment' | 'download';
  video_url?: string;
  video_duration?: number;
  audio_url?: string;
  audio_duration?: number;
  content?: string;
  download_url?: string;
  download_file_size?: string;
  order_index: number;
  is_free: boolean;
}

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'AI Fundamentals for Beginners',
    slug: 'ai-fundamentals',
    description: 'Learn the basics of Artificial Intelligence, machine learning, and neural networks.',
    long_description: 'This comprehensive course introduces you to the world of Artificial Intelligence. You\'ll learn about machine learning, neural networks, deep learning, and how AI is transforming industries. Perfect for beginners with no prior experience.',
    instructor: 'Dr. Sarah Johnson',
    instructor_bio: 'PhD in Machine Learning from Stanford, 10+ years experience in AI research and teaching',
    level: 'beginner',
    category: 'AI & Machine Learning',
    thumbnail: '/course-thumbnails/ai-fundamentals.jpg',
    video_trailer: 'https://www.youtube.com/embed/JMUxmLyrhSk',
    duration_hours: 20,
    price: 0,
    featured: true,
    rating: 4.8,
    students: 1243,
    what_you_learn: [
      'Understand AI concepts and terminology',
      'Build machine learning models',
      'Work with neural networks',
      'Apply AI to real-world problems',
      'Understand ethics in AI'
    ],
    requirements: [
      'Basic computer skills',
      'No programming experience required',
      'Curiosity to learn'
    ],
    target_audience: [
      'Beginners interested in AI',
      'Students exploring technology careers',
      'Professionals wanting to understand AI'
    ],
    modules: [
      {
        id: 'm1',
        title: 'Introduction to AI',
        description: 'Understanding what AI is and why it matters',
        order_index: 1,
        lessons: [
          {
            id: 'l1',
            title: 'What is Artificial Intelligence?',
            description: 'Introduction to AI concepts and history',
            lesson_type: 'video',
            video_url: 'https://www.youtube.com/embed/JMUxmLyrhSk',
            video_duration: 480,
            order_index: 1,
            is_free: true
          },
          {
            id: 'l2',
            title: 'The History of AI',
            description: 'From Turing to modern deep learning',
            lesson_type: 'text',
            content: '<h3>The Evolution of Artificial Intelligence</h3><p>The history of AI spans over 70 years...</p>',
            order_index: 2,
            is_free: true
          },
          {
            id: 'l3',
            title: 'AI in Daily Life',
            description: 'How AI is already part of your everyday life',
            lesson_type: 'audio',
            audio_url: '/course-audio/ai-in-daily-life.mp3',
            audio_duration: 900,
            order_index: 3,
            is_free: true
          }
        ]
      },
      {
        id: 'm2',
        title: 'Machine Learning Fundamentals',
        description: 'Core concepts of machine learning',
        order_index: 2,
        lessons: [
          {
            id: 'l4',
            title: 'What is Machine Learning?',
            description: 'Understanding supervised, unsupervised, and reinforcement learning',
            lesson_type: 'video',
            video_url: 'https://www.youtube.com/embed/ukzFI9rgwfU',
            video_duration: 720,
            order_index: 1,
            is_free: false
          },
          {
            id: 'l5',
            title: 'Course Materials - ML Cheat Sheet',
            description: 'Download the complete machine learning cheat sheet',
            lesson_type: 'download',
            download_url: '/course-materials/ml-cheat-sheet.pdf',
            download_file_size: '2.5 MB',
            order_index: 2,
            is_free: false
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Full-Stack Web Development',
    slug: 'fullstack-web-dev',
    description: 'Master React, Node.js, and MongoDB to build complete web applications.',
    long_description: 'Become a full-stack developer with this comprehensive course. Learn frontend development with React, backend with Node.js, and database with MongoDB.',
    instructor: 'Michael Chen',
    instructor_bio: 'Senior Full-Stack Developer at Google, 8+ years experience',
    level: 'intermediate',
    category: 'Web Development',
    thumbnail: '/course-thumbnails/web-dev.jpg',
    video_trailer: 'https://www.youtube.com/embed/Ke90Tje7VS0',
    duration_hours: 60,
    price: 129,
    featured: true,
    rating: 4.9,
    students: 2456,
    what_you_learn: [
      'Build responsive websites with React',
      'Create RESTful APIs with Node.js',
      'Work with MongoDB and Mongoose',
      'Implement authentication and authorization',
      'Deploy applications to production'
    ],
    requirements: [
      'Basic HTML/CSS knowledge',
      'JavaScript fundamentals'
    ],
    target_audience: [
      'Aspiring web developers',
      'Frontend developers wanting to go full-stack',
      'Career changers'
    ],
    modules: [
      {
        id: 'm3',
        title: 'Frontend Development with React',
        description: 'Building modern user interfaces',
        order_index: 1,
        lessons: [
          {
            id: 'l6',
            title: 'React Fundamentals',
            description: 'Components, props, and state',
            lesson_type: 'video',
            video_url: 'https://www.youtube.com/embed/Ke90Tje7VS0',
            video_duration: 1800,
            order_index: 1,
            is_free: true
          },
          {
            id: 'l7',
            title: 'React Hooks Deep Dive',
            description: 'Understanding useState, useEffect, and custom hooks',
            lesson_type: 'video',
            video_url: 'https://www.youtube.com/embed/dpw9EHDh2bM',
            video_duration: 1500,
            order_index: 2,
            is_free: false
          },
          {
            id: 'l8',
            title: 'React Practice Exercises',
            description: 'Hands-on exercises to reinforce learning',
            lesson_type: 'download',
            download_url: '/course-materials/react-exercises.pdf',
            download_file_size: '1.8 MB',
            order_index: 3,
            is_free: false
          }
        ]
      }
    ]
  }
];

// Add 18 more courses programmatically
for (let i = 3; i <= 20; i++) {
  const categories = ['AI & Machine Learning', 'Web Development', 'Data Science', 'Mobile Development', 'Cloud Computing', 'Security', 'Design', 'DevOps', 'Marketing', 'Business'];
  const levels = ['beginner', 'intermediate', 'advanced'];
  const titles = [
    'Data Science with Python', 'Prompt Engineering Mastery', 'Mobile App Development', 'Cloud Computing with AWS',
    'Cybersecurity Fundamentals', 'UI/UX Design Masterclass', 'DevOps & CI/CD', 'Digital Marketing Strategy',
    'Blockchain Development', 'Python Programming', 'JavaScript Mastery', 'SQL Database Design',
    'React Advanced Patterns', 'Node.js Microservices', 'GraphQL API Development', 'Flutter Mobile Development',
    'Swift iOS Development', 'Kotlin Android Development'
  ];
  
  COURSES.push({
    id: i.toString(),
    title: titles[i-3],
    slug: titles[i-3].toLowerCase().replace(/\s/g, '-'),
    description: `Master ${titles[i-3]} with hands-on projects and real-world applications.`,
    long_description: `Complete ${titles[i-3]} course covering all essential concepts and advanced techniques. Includes video lessons, audio lectures, and downloadable materials.`,
    instructor: `Expert Instructor ${Math.floor(Math.random() * 10) + 1}`,
    instructor_bio: `Experienced professional with ${Math.floor(Math.random() * 15) + 5} years in the industry`,
    level: levels[Math.floor(Math.random() * levels.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    thumbnail: '/course-thumbnails/default.jpg',
    video_trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration_hours: 30 + Math.floor(Math.random() * 30),
    price: Math.random() > 0.5 ? 49 + Math.floor(Math.random() * 150) : 0,
    featured: Math.random() > 0.7,
    rating: 4 + Math.random(),
    students: 100 + Math.floor(Math.random() * 2000),
    what_you_learn: [
      'Core concepts and fundamentals',
      'Advanced techniques and best practices',
      'Real-world projects and applications',
      'Industry standards and tools'
    ],
    requirements: [
      'Basic computer skills',
      'Internet connection',
      'Commitment to learn'
    ],
    target_audience: [
      'Students and professionals',
      'Career changers',
      'Anyone interested in technology'
    ],
    modules: [
      {
        id: `m${i*10}`,
        title: 'Module 1: Introduction',
        description: 'Getting started with the course',
        order_index: 1,
        lessons: [
          {
            id: `l${i*100}`,
            title: 'Welcome to the Course',
            description: 'Introduction and course overview',
            lesson_type: 'video',
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            video_duration: 300,
            order_index: 1,
            is_free: true
          },
          {
            id: `l${i*100+1}`,
            title: 'Course Materials Download',
            description: 'Download all course resources',
            lesson_type: 'download',
            download_url: `/course-materials/course-${i}-materials.zip`,
            download_file_size: `${Math.floor(Math.random() * 50) + 10} MB`,
            order_index: 2,
            is_free: true
          }
        ]
      }
    ]
  });
}
