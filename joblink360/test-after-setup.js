// test-after-setup.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('? Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testTables() {
    console.log('Testing database tables...\n');
    
    const tables = ['courses', 'jobs', 'funding_opportunities'];
    
    for (const table of tables) {
        try {
            const { data, error } = await supabase
                .from(table)
                .select('count')
                .limit(1);
            
            if (error) {
                console.log(`? Table ${table}: ${error.message}`);
            } else {
                console.log(`? Table ${table} exists and is accessible`);
            }
        } catch (err) {
            console.log(`? Error accessing ${table}: ${err.message}`);
        }
    }
    
    console.log('\n?? If all tables show as accessible, your database is ready!');
}

testTables();
