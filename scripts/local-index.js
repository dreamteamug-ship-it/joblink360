const fs = require('fs');
const path = require('path');

async function indexLibrary() {
    const docsPath = path.join(process.cwd(), 'library_inbox');
    const files = fs.readdirSync(docsPath).filter(f => f.endsWith('.txt'));
    
    console.log(`🚀 Amanda is studying ${files.length} guides...`);
    
    for (const file of files) {
        const content = fs.readFileSync(path.join(docsPath, file), 'utf-8');
        console.log(`📖 Reading: ${file}`);
        
        // This sends the text to your local Ollama mxbai model
        try {
            const response = await fetch('http://localhost:11434/api/embeddings', {
                method: 'POST',
                body: JSON.stringify({
                    model: 'mxbai-embed-large',
                    prompt: content
                })
            });
            const data = await response.json();
            console.log(`✅ Indexed ${file} (Vector Size: ${data.embedding.length})`);
        } catch (e) {
            console.error(`❌ Failed to index ${file}: Ollama might be overloaded.`);
        }
    }
}
indexLibrary();
