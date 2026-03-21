Set-Location C:\dreamteq

# Stage and commit changes
git add .
$commitMessage = "Auto-deploy update: " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
git commit -m $commitMessage
git pull origin main --rebase
git push -u origin main

# Deploy current project to Vercel (production)
vercel --prod

# Sync environment variables locally
vercel env pull .env.local
