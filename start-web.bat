@echo off
title NikahPlan Studio - Planner Web (Port 3000)
color 0B
cls

echo ======================================================================
echo             MEMULAI NIKAHPLAN PLANNER STUDIO (WEB)
echo ======================================================================
echo.

:: Tutup proses lama yang masih menempel di Port 3000 jika ada
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING 2^>nul') do (
    echo [INFO] Menutup proses lama di Port 3000 (PID %%a)...
    taskkill /f /pid %%a >nul 2>nul
)

echo URL: http://localhost:3000
echo.
start http://localhost:3000
call pnpm dev:web
pause
