#!/bin/bash
# Set environment variables for Vercel deployment

echo "Setting up Vercel environment variables..."

# Set the variables (you'll be prompted for values)
vercel env add DEEPSEEK_API_KEY production
vercel env add OPENROUTER_API_KEY production  
vercel env add GEMINI_API_KEY production
vercel env add ODOO_API_KEY production

echo "Environment variables setup complete!"
echo "Now run: git add . && git commit -m 'fix: Environment variables' && git push origin main"
