const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wqrgdanpdjebrcblayas.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcmdkYW5wZGplYnJjYmxheWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NTA5NjcsImV4cCI6MjA4OTQyNjk2N30.t3VE-NFGhJbLJJRJv0jrAwLJFn6Gm5Qngz328uTM4BM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTables() {
    console.log('?? Checking existing tables...\n');
    
    // Test access to each table we expect
    const expectedTables = [
        'courses', 'jobs', 'funding_opportunities', 'products', 'tenders',
        'opportunities', 'enrollments', 'orders', 'cart_items', 'order_items'
    ];
    
    for (const table of expectedTables) {
        try {
            // Simple select to see if table exists
            const { data, error } = await supabase
                .from(table)
                .select('count', { count: 'exact', head: true })
                .limit(1);

            if (error) {
                if (error.message.includes('does not exist')) {
                    console.log(`? Table "${table}": DOES NOT EXIST`);
                } else {
                    console.log(`?? Table "${table}": ${error.message}`);
                }
            } else {
                console.log(`? Table "${table}": EXISTS and accessible`);
            }
        } catch (err) {
            console.log(`? Error checking "${table}": ${err.message}`);
        }
    }
    
    console.log('\n?? Based on this, I\'ll create the correct RLS fix.');
}

checkTables();
