const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wqrgdanpdjebrcblayas.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcmdkYW5wZGplYnJjYmxheWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NTA5NjcsImV4cCI6MjA4OTQyNjk2N30.t3VE-NFGhJbLJJRJv0jrAwLJFn6Gm5Qngz328uTM4BM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifyData() {
    console.log('?? Verifying data population...\n');
    
    const tables = [
        { name: 'courses', display: '?? Courses' },
        { name: 'jobs', display: '?? Jobs' },
        { name: 'funding_opportunities', display: '?? Funding' },
        { name: 'tenders', display: '?? Tenders' }
    ];
    
    for (const table of tables) {
        const { data, error, count } = await supabase
            .from(table.name)
            .select('*', { count: 'exact' });
        
        if (error) {
            console.log(`? ${table.display}: ${error.message}`);
        } else {
            console.log(`? ${table.display}: ${data?.length || 0} records`);
            if (data && data.length > 0) {
                console.log(`   Example: ${data[0].title.substring(0, 50)}...`);
            }
        }
    }
    
    console.log('\n?? If all tables show data, your portals are ready!');
    console.log('?? Visit: https://deliteproductions.vercel.app');
}

verifyData();
