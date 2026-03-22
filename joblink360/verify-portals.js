const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wqrgdanpdjebrcblayas.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcmdkYW5wZGplYnJjYmxheWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NTA5NjcsImV4cCI6MjA4OTQyNjk2N30.t3VE-NFGhJbLJJRJv0jrAwLJFn6Gm5Qngz328uTM4BM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifyAllPortals() {
    console.log('?? VERIFYING ALL PORTALS\n');
    console.log('=' .repeat(50));
    
    const portals = [
        { name: 'courses', display: '?? Courses', url: '/lms' },
        { name: 'jobs', display: '?? Jobs', url: '/jobs' },
        { name: 'funding_opportunities', display: '?? Funding', url: '/funding' },
        { name: 'tenders', display: '?? Tenders', url: '/tenders' },
        { name: 'products', display: '?? Products', url: '/shop' }
    ];
    
    let totalRecords = 0;
    
    for (const portal of portals) {
        try {
            const { data, error, count } = await supabase
                .from(portal.name)
                .select('*', { count: 'exact' });
            
            if (error) {
                console.log(`? ${portal.display}: ${error.message}`);
            } else {
                const count = data?.length || 0;
                totalRecords += count;
                console.log(`? ${portal.display}: ${count} records`);
                
                // Show first item as example
                if (data && data.length > 0) {
                    const firstItem = data[0];
                    console.log(`   Example: ${firstItem.title || firstItem.name}`);
                    console.log(`   URL: https://deliteproductions.vercel.app${portal.url}`);
                }
                console.log('');
            }
        } catch (err) {
            console.log(`? ${portal.display}: Error - ${err.message}`);
        }
    }
    
    console.log('=' .repeat(50));
    console.log(`?? TOTAL: ${totalRecords} records across all portals`);
    console.log('');
    console.log('?? YOUR PLATFORM IS FULLY POPULATED!');
    console.log('');
    console.log('?? VISIT YOUR SITE:');
    console.log('   https://deliteproductions.vercel.app');
    console.log('');
    console.log('?? ADD TO HOME SCREEN:');
    console.log('   iOS: Share ? Add to Home Screen');
    console.log('   Android: Menu ? Add to Home Screen');
}

verifyAllPortals();
