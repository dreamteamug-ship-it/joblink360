# Install yt-dlp for YouTube downloads
Write-Host "Installing yt-dlp..." -ForegroundColor Cyan
winget install yt-dlp.yt-dlp

# Install ffmpeg for media processing
Write-Host "Installing ffmpeg..." -ForegroundColor Cyan
winget install ffmpeg

Write-Host "✅ All tools installed!" -ForegroundColor Green
Write-Host "`nTo use:"
Write-Host "  - yt-dlp: Download YouTube videos/audio"
Write-Host "  - ffmpeg: Convert/process media files"
