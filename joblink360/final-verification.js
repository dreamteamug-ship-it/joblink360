// Final verification after fixes
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wqrgdanpdjebrcblayas.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcmdkYW5wZGplYnJjYmxheWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NTA5NjcsImV4cCI6MjA4OTQyNjk2N30.t3VE-NFGhJbLJJRJv0jrAwLJFn6Gm5Qngz328uTM4BM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function finalVerification() {
    console.log('?? Final verification after fixes...\n');

    // Test data access
    console.log('1. Testing data access via Supabase:');
    const { data: courses, error } = await supabase
        .from('courses')
        .select('*')
        .limit(3);

    if (error) {
        console.log('? Data access still blocked:', error.message);
    } else {
        console.log(`? Data accessible: ${courses.length} courses`);
        courses.forEach(course => {
            console.log(`   - ${course.title} (${course.video_url ? 'has video' : 'no video'})`);
        });
    }

    // Test API endpoints
    console.log('\n2. Testing API endpoints:');
    const endpoints = [
        '/api/courses',
        '/api/jobs',
        '/api/funding',
        '/api/shop/products'
    ];

    for (const endpoint of endpoints) {
        try {
            const response = await fetch(\`https://deliteproductions.vercel.app\${endpoint}\`);
            console.log(\`\${endpoint}: \${response.status} \${response.statusText}\`);
        } catch (error) {
            console.log(\`\${endpoint}: ERROR - \${error.message}\`);
        }
    }

    console.log('\n3. ? If data is accessible and APIs return 200, your platform is fixed!');
}

finalVerification();
