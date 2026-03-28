export const config = {
  geminiKey: process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  openaiKey: process.env.OPENAI_API_KEY,
  isProd: process.env.NODE_ENV === 'production',
};

if (typeof window === 'undefined' && !config.geminiKey && !config.isProd) {
  console.warn("⚠️ Amanda is running without a Gemini API Key. Check .env.local");
}
