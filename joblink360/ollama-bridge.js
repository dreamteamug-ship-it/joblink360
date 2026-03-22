#!/usr/bin/env node
// Ollama Bridge for Claude Code
// Allows Claude Code to use local Ollama models

const http = require('http');

const OLLAMA_URL = 'http://localhost:11434';

const server = http.createServer(async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    if (req.method === 'GET' && req.url === '/health') {
        res.writeHead(200);
        res.end(JSON.stringify({ status: 'ok', ollama: 'connected' }));
        return;
    }
    
    if (req.method === 'POST' && req.url === '/chat') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const { model, messages, prompt } = JSON.parse(body);
                
                // Determine which Ollama model to use
                let ollamaModel = 'deepseek-r1:7b';
                if (model === 'code') ollamaModel = 'qwen2.5-coder:7b';
                if (model === 'fast') ollamaModel = 'deepseek-r1:1.5b';
                if (model === 'reasoning') ollamaModel = 'deepseek-r1:7b';
                
                // Format messages for Ollama
                const lastMessage = messages?.[messages.length - 1]?.content || prompt;
                
                const ollamaResponse = await fetch(`${OLLAMA_URL}/api/generate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: ollamaModel,
                        prompt: lastMessage,
                        stream: false,
                        options: {
                            temperature: 0.7,
                            top_p: 0.9,
                            max_tokens: 4096
                        }
                    })
                });
                
                const data = await ollamaResponse.json();
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    response: data.response,
                    model: ollamaModel,
                    provider: 'ollama'
                }));
                
            } catch (error) {
                console.error('Ollama bridge error:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ error: error.message }));
            }
        });
        return;
    }
    
    res.writeHead(404);
    res.end('Not found');
});

const PORT = 3456;
server.listen(PORT, () => {
    console.log(`🤖 Ollama Bridge running on http://localhost:${PORT}`);
    console.log(`   Use this URL in Claude Code: http://localhost:${PORT}/chat`);
    console.log(`   Models available: deepseek-r1:7b, qwen2.5-coder:7b, llama3.2`);
});

// Handle shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Ollama Bridge shutting down...');
    server.close();
    process.exit(0);
});
