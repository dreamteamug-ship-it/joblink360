Write-Host "--- JOBLINK 360: INTELLIGENCE GAP ANALYSIS ---" -ForegroundColor Cyan

$Jobs = Import-Csv "C:\Users\25479\joblink360\joblink360\local\amanda\assets\knowledge_base\Continental_Demand.csv"
$Manuals = Get-ChildItem "C:\Users\25479\joblink360\joblink360\local\amanda\assets\knowledge_base\Refined_Manuals" -Filter "*.html"

# Group jobs by Category/Title
$JobGroups = $Jobs | Group-Object -Property "Category"

foreach ($Group in $JobGroups) {
    $Category = $Group.Name
    $Match = $Manuals | Where-Object { $_.Name -like "*$Category*" }
    
    if (!$Match) {
        $Count = $Group.Count
        Write-Host "⚠️ ALERT: Missing Intelligence for '$Category' ($Count Jobs found)." -ForegroundColor Red
        
        # Log to the Admin Alert Table
        $Alert = "[March 2026] BOUNTY: Need training for $Category. Value: KES 25,000"
        $Alert | Out-File "C:\Users\25479\joblink360\joblink360\local\amanda\assets\knowledge_base\active_bounties.txt" -Append
    }
}
Write-Host "--- GAP ANALYSIS COMPLETE ---" -ForegroundColor Green
