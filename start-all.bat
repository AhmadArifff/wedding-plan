@echo off
title NikahPlan Studio - Start All Dev Servers
color 0A
cls

echo ======================================================================
echo          MEMULAI NIKAHPLAN STUDIO & UNDANGAN DIGITAL
echo ======================================================================
echo.

echo [1/2] Menjalankan Planner Studio (apps/web di Port 3000)...
start "NikahPlan - Planner Studio (Port 3000)" cmd /k "pnpm dev:web"
timeout /t 3 >nul

echo [2/2] Menjalankan Undangan Digital (apps/invite di Port 3001)...
start "NikahPlan - Undangan Digital (Port 3001)" cmd /k "pnpm dev:invite"
timeout /t 2 >nul

echo Membuka browser:
echo   - Planner Studio   : http://localhost:3000
echo   - Undangan Tamu    : http://localhost:3001/v/arif-windi
echo.
start http://localhost:3000
start http://localhost:3001/v/arif-windi

echo Server dev sedang aktif di jendela Command Prompt terpisah.
echo Anda dapat menutup jendela ini kapan saja.
pause

