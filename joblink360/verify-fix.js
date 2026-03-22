const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wqrgdanpdjebrcblayas.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcmdkYW5wZGplYnJjYmxheWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NTA5NjcsImV4cCI6MjA4OTQyNjk2N30.t3VE-NFGhJbLJJRJv0jrAwLJFn6Gm5Qngz328uTM4BM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifyFix() {
    console.log('?? Verifying RLS fix...\n');

    // Test if we can access data without authentication
    console.log('Testing public data access:\n');

    const tests = [
        { name: 'Courses', table: 'courses', query: 'is_published=true' },
        { name: 'Jobs', table: 'jobs', query: '' },
        { name: 'Funding', table: 'funding_opportunities', query: '' },
        { name: 'Products', table: 'products', query: 'is_published=true' }
    ];

    for (const test of tests) {
        try {
            let query = supabase.from(test.table).select('*');
            if (test.query) {
                query = query.eq('is_published', true);
            }
            
            const { data, error } = await query.limit(3);

            if (error) {
                console.log(`? ${test.name}: ${error.message}`);
            } else {
                console.log(`? ${test.name}: ${data.length} records accessible`);
                if (data.length > 0) {
                    console.log(`   Sample: ${data[0].title || data[0].name}`);
                }
            }
        } catch (err) {
            console.log(`? ${test.name}: ${err.message}`);
        }
    }

    console.log('\n?? Testing live website endpoints:\n');

    // Test the actual website endpoints
    const endpoints = [
        { name: 'Courses Page', url: 'https://deliteproductions.vercel.app/lms' },
        { name: 'Jobs Page', url: 'https://deliteproductions.vercel.app/jobs' },
        { name: 'Funding Page', url: 'https://deliteproductions.vercel.app/funding' },
        { name: 'Shop Page', url: 'https://deliteproductions.vercel.app/shop' }
    ];

    for (const endpoint of endpoints) {
        try {
            const response = await fetch(endpoint.url);
            if (response.ok) {
                console.log(`? ${endpoint.name}: Accessible (${response.status})`);
            } else {
                console.log(`? ${endpoint.name}: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.log(`? ${endpoint.name}: ${error.message}`);
        }
    }
}

verifyFix();
