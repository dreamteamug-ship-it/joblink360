// scripts/test-gemini.js
const fetch = require('node-fetch');

async function testGemini() {
  console.log('🧪 TESTING GEMINI API...\n');
  
  // Test 1: Basic API Test
  console.log('📡 Test 1: Basic Gemini API Connection');
  try {
    const res = await fetch('https://joblink360-gamma.vercel.app/api/test/gemini');
    const data = await res.json();
    
    if (data.success) {
      console.log('✅ Gemini API is WORKING!');
      console.log(`   Response: ${data.response.substring(0, 150)}...\n`);
    } else {
      console.log('❌ Gemini API FAILED:', data.error);
      console.log('   Solution:', data.solution);
      return;
    }
  } catch (error) {
    console.log('❌ Cannot reach API:', error.message);
    return;
  }
  
  // Test 2: Generate Social Media Content
  console.log('📡 Test 2: Generate Social Media Content with Gemini');
  try {
    const res = await fetch('https://joblink360-gamma.vercel.app/api/social/generate-gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        platforms: ['LinkedIn', 'Twitter'], 
        testMode: true 
      })
    });
    const data = await res.json();
    
    if (data.success) {
      console.log('✅ Social Media Generation WORKING!');
      console.log(`   Generated ${data.generated_content?.length || 0} sample posts`);
      console.log('\n📝 SAMPLE POST:');
      if (data.generated_content && data.generated_content[0]) {
        const post = data.generated_content[0];
        console.log(`   Platform: ${post.platform}`);
        console.log(`   Headline: ${post.headline}`);
        console.log(`   Content: ${post.content?.substring(0, 100)}...`);
        console.log(`   Hashtags: ${post.hashtags?.join(', ')}`);
      }
      console.log('\n✅ GEMINI IS FULLY INTEGRATED AND WORKING!');
    } else {
      console.log('❌ Generation FAILED:', data.error);
    }
  } catch (error) {
    console.log('❌ Generation error:', error.message);
  }
}

testGemini();