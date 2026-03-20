export class GeminiService {
  async getAmandaResponse(message: string) {
    const apiKey = (process.env.GEMINI_API_KEY || "").trim();
    if (!apiKey) return "Error: API Key missing.";

    // The Fallback Chain: From fastest/cheapest to older/most stable
    const models = [
      "gemini-1.5-flash",      // Priority 1 (Fastest)
      "gemini-1.5-flash-8b",   // Priority 2 (Smallest)
      "gemini-1.5-pro",        // Priority 3 (Smartest)
      "gemini-1.0-pro",        // Priority 4 (Old Reliable)
      "gemini-pro"             // Priority 5 (Legacy)
    ];

    let lastError = "";

    for (const modelName of models) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Wewe ni Amanda, mwalimu wa Joblink 360. Jibu: ${message}` }] }]
          })
        });

        const data = await res.json();

        // If this model works, RETURN IMMEDIATELY and stop the loop
        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
          console.log(`Success using model: ${modelName}`);
          return data.candidates[0].content.parts[0].text;
        }

        // If it failed, log why and try the next model in the list
        lastError = data.error?.message || "Unknown error";
        console.warn(`Model ${modelName} failed: ${lastError}`);
        
      } catch (err: any) {
        lastError = err.message;
        continue;
      }
    }

    return `All models failed. Last error: ${lastError}`;
  }
}
export const geminiService = new GeminiService();