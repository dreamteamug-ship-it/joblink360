# deploy-vulture-eye.ps1
# Quick deployment script for Vulture-Eye

Write-Host "🦅 Deploying Vulture-Eye System..." -ForegroundColor Cyan

# Step 1: Clean build
Write-Host "`n1. Cleaning build cache..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Step 2: Install dependencies
Write-Host "`n2. Installing dependencies..." -ForegroundColor Yellow
npm install

# Step 3: Build project
Write-Host "`n3. Building project..." -ForegroundColor Yellow
npm run build

# Step 4: Deploy to Vercel
Write-Host "`n4. Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod --force --yes

Write-Host "`n✅ Vulture-Eye deployed successfully!" -ForegroundColor Green
Write-Host "📍 Visit: https://your-domain.com/pay to test" -ForegroundColor Cyan