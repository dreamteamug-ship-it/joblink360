// Test after RLS fix
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wqrgdanpdjebrcblayas.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcmdkYW5wZGplYnJjYmxheWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NTA5NjcsImV4cCI6MjA4OTQyNjk2N30.t3VE-NFGhJbLJJRJv0jrAwLJFn6Gm5Qngz328uTM4BM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAfterFix() {
    console.log('?? Testing after RLS fix...\n');
    
    // Test data access
    console.log('1. Testing direct database access:');
    const tables = ['courses', 'jobs', 'funding_opportunities', 'products'];
    
    for (const table of tables) {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .limit(2);
            
        if (error) {
            console.log(`? ${table}: ${error.message}`);
        } else {
            console.log(`? ${table}: ${data.length} records accessible`);
        }
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
            const data = await response.json();
            console.log(\`\${endpoint}: \${response.status} - \${data.length} items\`);
        } catch (error) {
            console.log(\`\${endpoint}: ERROR - \${error.message}\`);
        }
    }
    
    console.log('\n?? If both tests pass, your platform is fully fixed!');
}

testAfterFix();
