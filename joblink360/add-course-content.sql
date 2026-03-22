-- =====================================================
-- ADD ACTUAL COURSE CONTENT
-- =====================================================

-- Add video URLs, descriptions, and real content to courses
UPDATE courses SET 
    description = 'Learn AI and Machine Learning from scratch. This comprehensive course covers Python, TensorFlow, neural networks, and real-world projects. Includes hands-on exercises and certificate.',
    video_url = 'https://example.com/videos/ai-ml-course-intro.mp4',
    content = '[
        {"type": "video", "title": "Introduction to AI", "duration": "15:30", "url": "https://example.com/videos/ai-intro.mp4"},
        {"type": "video", "title": "Machine Learning Basics", "duration": "22:15", "url": "https://example.com/videos/ml-basics.mp4"},
        {"type": "reading", "title": "AI Fundamentals PDF", "duration": "30 min", "url": "https://example.com/resources/ai-fundamentals.pdf"},
        {"type": "quiz", "title": "Module 1 Quiz", "duration": "20 min", "url": "/quizzes/ai-module-1"}
    ]'
WHERE slug = 'ai-ml-fundamentals';

UPDATE courses SET 
    description = 'Become a full-stack developer with React, Node.js, and MongoDB. Build complete web applications from frontend to backend. Includes portfolio projects and deployment guidance.',
    video_url = 'https://example.com/videos/fullstack-intro.mp4',
    content = '[
        {"type": "video", "title": "React Fundamentals", "duration": "25:45", "url": "https://example.com/videos/react-fundamentals.mp4"},
        {"type": "video", "title": "Node.js Backend", "duration": "30:20", "url": "https://example.com/videos/nodejs-backend.mp4"},
        {"type": "project", "title": "Build a Todo App", "duration": "2 hours", "url": "/projects/todo-app"}
    ]'
WHERE slug = 'fullstack-web-dev';

-- Add more realistic content to other courses
UPDATE courses SET 
    description = 'Create cross-platform mobile apps with React Native. Learn to build for iOS and Android with a single codebase. Includes real app deployments.',
    video_url = 'https://example.com/videos/react-native-intro.mp4'
WHERE slug = 'react-native-mobile';

UPDATE courses SET 
    description = 'Master blockchain development with Solidity and Web3. Build smart contracts, DeFi applications, and understand cryptocurrency fundamentals.',
    video_url = 'https://example.com/videos/blockchain-intro.mp4'
WHERE slug = 'blockchain-web3';

-- Verify the updates
SELECT slug, title, description, video_url 
FROM courses 
WHERE video_url IS NOT NULL;
