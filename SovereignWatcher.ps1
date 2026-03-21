# --- DreamTeQ Sovereign Watcher v2.3 (Auto-Acknowledgement + Signature) ---
$DtcUser = "dtc@dreamteamconsult.net"
$DtcPass = "adjxejtjzibklwlf"
$SleepTime = 300 
$LogPath = "C:\dreamteq\logs"
$PathToFiles = "C:\dreamteq\incoming"
$SigPath = "C:\dreamteq\official_signature.html"

# 1. Load Libraries & Signature
$PackageRoot = "C:\Program Files\PackageManagement\NuGet\Packages"
$Dlls = Get-ChildItem -Path $PackageRoot -Include "*.dll" -Recurse | Where-Object { $_.FullName -match "netstandard2.0|net461|net462|net48" }
foreach ($Dll in $Dlls) { try { [System.Reflection.Assembly]::LoadFrom($Dll.FullName) | Out-Null } catch { } }

$Signature = if (Test-Path $SigPath) { Get-Content $SigPath -Raw } else { "" }

Write-Host "--- DreamTeQ Sovereign Watcher v2.3 Active ---" -ForegroundColor Cyan

while($true) {
    $ImapClient = New-Object MailKit.Net.Imap.ImapClient
    $SmtpClient = New-Object MailKit.Net.Smtp.SmtpClient
    try {
        $ImapClient.Connect("imap.gmail.com", 993, $true)
        $ImapClient.Authenticate($DtcUser, $DtcPass)
        $Inbox = $ImapClient.Inbox
        $Inbox.Open([MailKit.FolderAccess]::ReadWrite)

        $Results = $Inbox.Search([MailKit.Search.SearchQuery]::NotSeen)

        foreach ($Uid in $Results) {
            $Msg = $Inbox.GetMessage($Uid)
            $Sender = $Msg.From[0].Address
            Write-Host "[$((Get-Date).ToString('HH:mm'))] From: $Sender | Sub: $($Msg.Subject)" -ForegroundColor Yellow

            # Action: Save PDFs
            $HasPdf = $false
            foreach ($at in $Msg.Attachments) {
                if ($at.FileName -match "\.pdf$") {
                    $at.Content.DecodeTo([System.IO.File]::Create((Join-Path $PathToFiles $at.FileName))).Close()
                    $HasPdf = $true
                }
            }

            # Action: Auto-Reply Logic
            if ($HasPdf -or $Msg.Subject -match "Sovereign") {
                $Reply = New-Object MimeKit.MimeMessage
                $Reply.From.Add((New-Object MimeKit.MailboxAddress("Office of the Executive Director", $DtcUser)))
                $Reply.To.Add((New-Object MimeKit.MailboxAddress($Sender, $Sender)))
                $Reply.Subject = "RE: " + $Msg.Subject
                
                $Body = New-Object MimeKit.BodyBuilder
                $Body.HtmlBody = "Dear Colleague,<br><br>This is an automated confirmation that your document/update regarding <b>$($Msg.Subject)</b> has been successfully received and logged into the <b>DreamTeQ Sovereign Project</b> system for review by the Executive Director.<br><br>Regards,"
                $Body.HtmlBody += $Signature
                $Reply.Body = $Body.ToMessageBody()

                $SmtpClient.Connect("smtp.gmail.com", 465, $true)
                $SmtpClient.Authenticate($DtcUser, $DtcPass)
                $SmtpClient.Send($Reply)
                $SmtpClient.Disconnect($true)
                Write-Host " -> Auto-Acknowledgement Sent to $Sender" -ForegroundColor Green
            }

            $Inbox.AddFlags($Uid, [MailKit.MessageFlags]::Seen, $true)
        }
    }
    catch { Write-Host "Status: $($_.Exception.Message)" -ForegroundColor Gray }
    finally {
        if ($ImapClient.IsConnected) { $ImapClient.Disconnect($true) }
        $ImapClient.Dispose(); $SmtpClient.Dispose()
    }
    Start-Sleep -Seconds $SleepTime
}
