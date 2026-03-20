Write-Host "--- JOBLINK 360: AMANDA CONTEXT INJECTION ---" -ForegroundColor Cyan

$KnowledgeDir = "C:\JobLink360_Assets\Knowledge_Base"
$ContextFile = "C:\JobLink360_Assets\current_context.tmp"

# 1. Scrape all local knowledge files
Write-Host "Scanning Knowledge Base..." -ForegroundColor Yellow
$KnowledgeContent = ""
Get-ChildItem -Path $KnowledgeDir -Filter *.txt | ForEach-Object {
    $KnowledgeContent += "`n[SOURCE: $($_.Name)]`n" + (Get-Content $_.FullName -Raw)
}

# 2. Save the compiled context for the PHP Bridge
$KnowledgeContent | Set-Content -Path $ContextFile -Encoding UTF8
Write-Host "✅ Context Compiled: $(($KnowledgeContent.Length / 1KB).ToString('F2')) KB of knowledge ready." -ForegroundColor Green

# 3. Create the specialized 'Amanda-Executive' model in Ollama
Write-Host "Hardening Amanda's Executive Model..." -ForegroundColor Yellow
ollama create amanda-executive -f C:\JobLink360_Assets\Amanda_Executive.Modelfile

Write-Host "`nAMANDA IS NOW FULLY TRAINED ON YOUR DOCTRINE." -ForegroundColor Green
Pause
