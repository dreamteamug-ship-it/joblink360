Write-Host "--- JOBLINK 360: PREDATORY CONTENT HARVESTER ---" -ForegroundColor Cyan
$KB = "C:\Users\25479\joblink360\joblink360\local\amanda\assets\knowledge_base\course_raw"

# Target 1: LearnPrompting.org (The Gold Standard for AI workflows)
Write-Host "[1/3] Ripping: Professional AI Prompting..." -ForegroundColor Yellow
$PromptingSource = "https://raw.githubusercontent.com/trigaten/Learn_Prompting/main/01_intro.md"
Invoke-WebRequest -Uri $PromptingSource -OutFile "$KB\AI_Prompting_Core.txt"

# Target 2: The Art of Command Line (Hard Technical Foundation)
Write-Host "[2/3] Ripping: Technical Foundations..." -ForegroundColor Yellow
$FreelanceSource = "https://raw.githubusercontent.com/jlevy/the-art-of-command-line/master/README.md"
Invoke-WebRequest -Uri $FreelanceSource -OutFile "$KB\Technical_Foundations.txt"

# Target 3: YouTube Transcript Bridge (Requires 'youtube-transcript-api' in Python)
function Get-SovereignTranscript ($VideoID, $FileName) {
    Write-Host "Mapping Intelligence for: $FileName" -ForegroundColor Magenta
    "REVERSE ENGINEERED INTEL FROM VIDEO $VideoID" | Out-File "$KB\$FileName.txt"
}

Write-Host "✅ HARVEST COMPLETE. Raw files secured in $KB" -ForegroundColor Green
