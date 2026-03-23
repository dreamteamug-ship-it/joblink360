#!/bin/bash
# JobLinks Africa - Final Deployment Script

echo "?? Deploying JobLinks Africa to Production..."

# 1. Push to GitHub
git add .
git commit -m "feat: JobLinks Africa - Final Production Ready"
git push origin main

# 2. Deploy to Vercel
vercel --prod --yes

echo "? Deployment Complete!"
echo "?? Live at: https://deliteproductions.vercel.app"
