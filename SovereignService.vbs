Set WinScriptHost = CreateObject("WScript.Shell")
WinScriptHost.Run "powershell.exe -ExecutionPolicy Bypass -File ""C:\dreamteq\SovereignWatcher.ps1""", 0
Set WinScriptHost = Nothing
