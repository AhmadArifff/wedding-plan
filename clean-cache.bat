@echo off
title NikahPlan Studio - Clean Cache & Refresh Monorepo
color 0E
cls

echo ======================================================================
echo       NIKAHPLAN STUDIO - BERSIHKAN CACHE & REFRESH DEPENDENSI
echo ======================================================================
echo.
echo Script ini akan membersihkan cache .next, .turbo, dan menyegarkan
echo dependensi node_modules agar VSCode dan Next.js mendeteksi paket bersih.
echo.
pause

echo.
echo [1/4] Membersihkan cache Next.js (.next)...
if exist "apps\web\.next" rd /s /q "apps\web\.next"
if exist "apps\invite\.next" rd /s /q "apps\invite\.next"
echo [OK] Cache Next.js dibersihkan.

echo.
echo [2/4] Membersihkan cache Turborepo (.turbo)...
if exist ".turbo" rd /s /q ".turbo"
if exist "apps\web\.turbo" rd /s /q "apps\web\.turbo"
if exist "apps\invite\.turbo" rd /s /q "apps\invite\.turbo"
echo [OK] Cache Turborepo dibersihkan.

echo.
echo [3/4] Menyegarkan pnpm install (hoisted node_modules)...
call pnpm install
if %ERRORLEVEL% neq 0 (
    color 0C
    echo [ERROR] Gagal menjalankan pnpm install.
    pause
    exit /b 1
)
echo [OK] Dependensi tersinkronisasi.

echo.
echo [4/4] Memastikan seluruh aset vektor ter-generate...
node scripts/generate-assets.js

echo.
color 0A
echo ======================================================================
echo       CACHE BERHASIL DIBERSIHKAN DAN DEPENDENSI SIAP DIGUNAKAN!
echo ======================================================================
echo.
echo Anda dapat menjalankan 'start.bat' atau 'start-all.bat' sekarang.
echo.
pause
