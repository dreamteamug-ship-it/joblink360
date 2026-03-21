@echo off
echo 🚀 Starting clean build with mocks...
echo.

REM Clean previous build
if exist .next rmdir /s /q .next

REM Set environment to skip database checks
set NEXT_PHASE=phase-production-build
set SKIP_DB_CHECKS=true

REM Run build
call npm run build

echo.
if %errorlevel% equ 0 (
    echo ✅ Build successful!
) else (
    echo ❌ Build failed with error code %errorlevel%
)