// scripts/stress-test.ts
async function testAllCountries() {
  const countries = ['KE', 'UG', 'TZ', 'RW', 'ZA', 'ZM', 'ZW'];
  const results = {};

  for (const country of countries) {
    console.log(`Testing ${country}...`);
    
    // Test jobs API
    const jobsRes = await fetch(`https://joblink360-gamma.vercel.app/api/jobs/unified?country=${country}`);
    results[country] = await jobsRes.json();
    
    console.log(`✅ ${country} - ${results[country].total} jobs`);
  }

  console.log('All countries tested successfully!');
}

testAllCountries();
