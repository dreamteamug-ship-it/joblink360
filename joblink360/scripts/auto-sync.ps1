# scripts/auto-sync.ps1
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = "C:\Users\25479\joblink360\joblink360"
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$action = {
    $path = $Event.SourceEventArgs.FullPath
    $changeType = $Event.SourceEventArgs.ChangeType
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Detected: $changeType on $path"
    Start-Sleep -Seconds 2
    cd "C:\Users\25479\joblink360\joblink360"
    git add .
    git commit -m "AUTO-SYNC: $changeType on $(Split-Path $path -Leaf)"
    git push origin main
}

Register-ObjectEvent $watcher "Changed" -Action $action
Register-ObjectEvent $watcher "Created" -Action $action
Write-Host "Auto-Sync Active. Changes will deploy to Vercel." -ForegroundColor Cyan
while ($true) { Start-Sleep -Seconds 60 }
