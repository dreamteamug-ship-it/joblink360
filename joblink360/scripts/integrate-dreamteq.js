// scripts/integrate-dreamteq.js
// Merge DreamTeQ components into JobLinks Africa

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wqrgdanpdjebrcblayas.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcmdkYW5wZGplYnJjYmxheWFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg1MDk2NywiZXhwIjoyMDg5NDI2OTY3fQ.Rpnql75AL9vwIpdlg--kW5uEocgopf-AoZeD0CphxTg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function integrateDreamTeQ() {
    console.log('?? Integrating DreamTeQ components into JobLinks Africa...\n');
    
    // 1. Check what exists in DreamTeQ folder
    const dreamTeqPath = 'C:\\dreamteq';
    if (fs.existsSync(dreamTeqPath)) {
        console.log('? DreamTeQ folder found\n');
        
        // List key files to integrate
        const filesToCheck = [
            'amanda_core/amanda.ts',
            'amanda_microservice/amanda-api.js',
            'agents/agent-swarm.js',
            'command_centre/dashboard.html',
            'supabase/migrations/',
            'scripts/add-courses.js',
            'scripts/test-funding-scraper.ts'
        ];
        
        for (const file of filesToCheck) {
            const fullPath = path.join(dreamTeqPath, file);
            if (fs.existsSync(fullPath)) {
                console.log(`   ? Found: ${file}`);
            } else {
                console.log(`   ?? Missing: ${file}`);
            }
        }
    }
    
    // 2. Check current database state
    console.log('\n?? Checking Supabase database state...\n');
    
    const tables = ['courses', 'jobs', 'funding_opportunities', 'tenders', 'products'];
    for (const table of tables) {
        const { data, error } = await supabase.from(table).select('count', { count: 'exact', head: true });
        if (!error) {
            console.log(`   ? ${table}: Ready`);
        } else {
            console.log(`   ?? ${table}: Needs setup`);
        }
    }
    
    // 3. Ensure all tables have proper RLS
    console.log('\n?? Ensuring RLS policies...\n');
    
    const rlsFix = `
    ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
    ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
    ALTER TABLE funding_opportunities ENABLE ROW LEVEL SECURITY;
    ALTER TABLE tenders ENABLE ROW LEVEL SECURITY;
    ALTER TABLE products ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "public_read_courses" ON courses;
    CREATE POLICY "public_read_courses" ON courses FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "public_read_jobs" ON jobs;
    CREATE POLICY "public_read_jobs" ON jobs FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "public_read_funding" ON funding_opportunities;
    CREATE POLICY "public_read_funding" ON funding_opportunities FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "public_read_tenders" ON tenders;
    CREATE POLICY "public_read_tenders" ON tenders FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "public_read_products" ON products;
    CREATE POLICY "public_read_products" ON products FOR SELECT USING (true);
    `;
    
    console.log('? RLS policies ready to apply');
    
    // 4. Check AI components
    console.log('\n?? Checking Amanda AI components...\n');
    
    const aiComponents = [
        { name: 'DeepSeek', key: process.env.DEEPSEEK_API_KEY },
        { name: 'Claude', key: process.env.OPENROUTER_API_KEY },
        { name: 'Gemini', key: process.env.GEMINI_API_KEY }
    ];
    
    for (const ai of aiComponents) {
        if (ai.key) {
            console.log(`   ? ${ai.name}: Configured`);
        } else {
            console.log(`   ?? ${ai.name}: API key missing`);
        }
    }
    
    console.log('\n? Integration analysis complete!');
    console.log('\n?? NEXT STEPS:');
    console.log('   1. Run the RLS fix SQL in Supabase');
    console.log('   2. Ensure all DreamTeQ components are in the correct folders');
    console.log('   3. Configure AI API keys in Vercel environment variables');
    console.log('   4. Deploy the integrated application');
}

integrateDreamTeQ().catch(console.error);
