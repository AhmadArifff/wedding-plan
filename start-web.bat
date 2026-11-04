@echo off
title NikahPlan Studio - Planner Web (Port 3000)
color 0B
cls

echo ======================================================================
echo             MEMULAI NIKAHPLAN PLANNER STUDIO (WEB)
echo ======================================================================
echo.
echo URL: http://localhost:3000
echo.
start http://localhost:3000
call pnpm dev:web
pause
