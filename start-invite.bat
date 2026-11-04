@echo off
title NikahPlan Studio - Digital Invitation (Port 3001)
color 0D
cls

echo ======================================================================
echo             MEMULAI NIKAHPLAN DIGITAL INVITATION (TAMU)
echo ======================================================================
echo.

:: Tutup proses lama yang masih menempel di Port 3001 jika ada
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3001 ^| findstr LISTENING 2^>nul') do (
    echo [INFO] Menutup proses lama di Port 3001 (PID %%a)...
    taskkill /f /pid %%a >nul 2>nul
)

echo URL: http://localhost:3001/v/arif-windi
echo.
start http://localhost:3001/v/arif-windi
call pnpm dev:invite
pause
