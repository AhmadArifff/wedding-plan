@echo off
title NikahPlan Studio - Digital Invitation (Port 3001)
color 0D
cls

echo ======================================================================
echo             MEMULAI NIKAHPLAN DIGITAL INVITATION (TAMU)
echo ======================================================================
echo.
echo URL: http://localhost:3001/v/arif-windi
echo.
start http://localhost:3001/v/arif-windi
call pnpm dev:invite
pause

