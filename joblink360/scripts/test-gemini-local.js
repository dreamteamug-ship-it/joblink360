const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGeminiLocal() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.log("? GEMINI_API_KEY not found in environment");
        console.log("Please add GEMINI_API_KEY to .env.local file");
        return;
    }
    
    console.log("? Found GEMINI_API_KEY, testing connection...");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    try {
        const result = await model.generateContent("Say hello in Swahili and tell me about JobLink 360 in 2 sentences.");
        const response = await result.response;
        console.log("? Gemini is WORKING!");
        console.log("Response:", response.text());
    } catch (error) {
        console.log("? Gemini error:", error.message);
    }
}

testGeminiLocal();
