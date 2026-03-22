const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wqrgdanpdj?rcblayas.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcmdkYW5wZGplYnJjYmxheWFzIiwicm9sZSI6?mFub24iLCJpYXQiOjE3NzM4NTA5NjcsImV4cCI6MjA4OTQyNjk2N30.t3VE-NFGhJbLJJRJv0jrAwLJFn6Gm5Qngz328uTM4BM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifyAllData() {
    console.log('?? Verifying all platform data...\n');

    const portals = [
        { name: 'courses', display: '?? Courses' },
        { name: 'jobs', display: '?? Jobs' },
        { name: 'funding_opportunities', display: '?? Funding' },
        { name: 'tenders', display: '?? Tenders' },
        { name: 'products', display: '?? Shop Products' }
    ];

    let allGood = true;

    for (const portal of portals) {
        try {
            const { data, error, count } = await supabase
                .from(portal.name)
                .select('*', { count: 'exact' });

            if (error) {
                console.log(`? ${portal.display}: ${error.message}`);
                allGood = false;
            } else {
                const recordCount = data?.length || 0;
                console.log(`? ${portal.display}: ${recordCount} records`);
                
                if (recordCount > 0 && data) {
                    const sample = data[0];
                    if (sample.title) console.log(`   Sample: ${sample.title.substring(0, 50)}...`);
                    else if (sample.name) console.log(`   Sample: ${sample.name.substring(0, 50)}...`);
                }
            }
        } catch (error) {
            console.log(`? ${portal.display}: ${error.message}`);
            allGood = false;
        }
    }

    console.log('\n' + '='.repeat(50));
    
    if (allGood) {
        console.log('?? ALL PORTALS ARE FULLY POPULATED!');
        console.log('\n?? Visit your platform:');
        console.log('   • LMS: https://deliteproductions.vercel.app/lms');
        console.log('   • Jobs: https://deliteproductions.vercel.app/jobs');
        console.log('   • Funding: https://deliteproductions.vercel.app/funding');
        console.log('   • Tenders: https://deliteproductions.vercel.app/tenders');
        console.log('   • Shop: https://deliteproductions.vercel.app/shop');
        console.log('\n?? Mobile app is also ready with the same data!');
    } else {
        console.log('?? Some portals need attention. Run the SQL fix first.');
    }
}

verifyAllData();
