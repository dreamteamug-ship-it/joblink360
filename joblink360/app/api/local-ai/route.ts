export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

// Local AI Models available
const MODELS = {
    deepseek_r1: "deepseek-r1:7b",
    deepseek_r1_small: "deepseek-r1:1.5b",
    kimi_k2: "kimi-k2.5:cloud",
    deepseek_v3: "deepseek-v3.1:671b-cloud",
    qwen_coder: "qwen3-coder:480b-cloud",
    gpt_oss: "gpt-oss:120b-cloud",
    mistral: "mistral",
    llama3: "llama3.2"
};

// Generate content with local AI
async function generateWithOllama(model: string, prompt: string, system?: string) {
    const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: model,
            prompt: prompt,
            system: system || "You are an expert AI assistant for JobLink 360, helping create premium educational content.",
            stream: false,
            options: {
                temperature: 0.7,
                top_p: 0.9,
                max_tokens: 4096
            }
        })
    });
    
    const data = await response.json();
    return data.response;
}

export async function POST(request: Request) {
    try {
        const { model, prompt, action, url, courseId, moduleId } = await request.json();
        
        let result = "";
        let usedModel = model || "deepseek-r1:7b";
        
        // Route to appropriate action
        switch(action) {
            case "generate-course-content":
                const coursePrompt = `Create comprehensive educational content for a course module on: ${prompt}
                
                Structure:
                1. Module Title
                2. Learning Objectives (3-5 points)
                3. Core Content (detailed explanation)
                4. Key Takeaways
                5. Practical Exercise
                6. Quiz Questions (3-5)
                7. Resources for Further Learning
                
                Make it engaging, practical, and tailored for African learners.`;
                
                result = await generateWithOllama(usedModel, coursePrompt);
                break;
                
            case "generate-video-script":
                const videoScriptPrompt = `Create a professional video script for a training video on: ${prompt}
                
                Format:
                - Duration: 10-15 minutes
                - Opening hook (30 seconds)
                - Main content sections (with timestamps)
                - Visual suggestions
                - Call to action
                - Closing
                
                Make it engaging and suitable for 4K production.`;
                
                result = await generateWithOllama(usedModel, videoScriptPrompt);
                break;
                
            case "generate-audio-script":
                const audioPrompt = `Create an audio narration script for a podcast-style lesson on: ${prompt}
                
                Format:
                - Introduction (30 seconds)
                - Main content (engaging, conversational)
                - Key takeaways
                - Call to action
                
                Write for natural voice delivery.`;
                
                result = await generateWithOllama(usedModel, audioPrompt);
                break;
                
            case "transcribe-youtube":
                // For YouTube transcript - would use actual YouTube API
                result = `[YouTube Transcript for ${url}]
                
                To get actual transcripts, we'll need:
                1. YouTube Data API key
                2. Or use yt-dlp to download captions
                
                For now, this is a placeholder. The transcript will contain:
                - Full video transcript
                - Timestamps
                - Speaker labels
                - Key moments`;
                break;
                
            case "refine-content":
                const refinePrompt = `Refine and improve this educational content:
                
                Original: ${prompt}
                
                Make it:
                - More engaging
                - Better structured
                - Include African context
                - Add practical examples
                - Fix any grammar issues
                
                Return the refined version.`;
                
                result = await generateWithOllama(usedModel, refinePrompt);
                break;
                
            default:
                // Default chat completion
                result = await generateWithOllama(usedModel, prompt);
        }
        
        return NextResponse.json({
            success: true,
            model: usedModel,
            action: action || "chat",
            result: result,
            timestamp: new Date().toISOString()
        });
        
    } catch (error: any) {
        console.error("Local AI error:", error);
        return NextResponse.json({ 
            success: false, 
            error: error.message,
            suggestion: "Make sure Ollama is running: ollama serve"
        }, { status: 500 });
    }
}

export async function GET() {
    // Check if Ollama is running
    let ollamaStatus = "unknown";
    let models = [];
    
    try {
        const response = await fetch('http://localhost:11434/api/tags');
        const data = await response.json();
        ollamaStatus = "running";
        models = data.models || [];
    } catch {
        ollamaStatus = "not running";
    }
    
    return NextResponse.json({
        name: "Local AI Stack - JobLink 360",
        ollama_status: ollamaStatus,
        available_models: models.map((m: any) => ({ name: m.name, size: m.size })),
        models_config: MODELS,
        capabilities: [
            "Course content generation",
            "Video script creation",
            "Audio script creation",
            "Content refinement",
            "YouTube transcript processing",
            "DeepSeek R1 reasoning",
            "Kimi K2 analysis",
            "Code generation (Mistral)"
        ],
        usage: {
            chat: "POST /api/local-ai with { model, prompt }",
            generate_course: "POST with { action: 'generate-course-content', prompt: 'topic' }",
            generate_video: "POST with { action: 'generate-video-script', prompt: 'topic' }"
        }
    });
}
